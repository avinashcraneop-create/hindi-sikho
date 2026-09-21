import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pg from "pg";
import "dotenv/config";

const { Pool } = pg;
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || "CHANGE_THIS_IN_RAILWAY";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      native_language TEXT NOT NULL DEFAULT 'English',
      hindi_level TEXT NOT NULL DEFAULT 'Beginner',
      xp INTEGER NOT NULL DEFAULT 0,
      streak INTEGER NOT NULL DEFAULT 0,
      premium BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS lesson_progress (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      lesson_id INTEGER NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT FALSE,
      quiz_score INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(user_id, lesson_id)
    );
  `);
}

function auth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Login required" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, service: "hindi-sikho-backend", database: "connected" });
  } catch {
    res.status(503).json({ ok: false, database: "unavailable" });
  }
});

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password, nativeLanguage = "English", hindiLevel = "Beginner" } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Name, email and password are required" });
    if (password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters" });

    const hash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      `INSERT INTO users (name,email,password_hash,native_language,hindi_level)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING id,name,email,native_language,hindi_level,xp,streak,premium,created_at`,
      [name.trim(), email.trim().toLowerCase(), hash, nativeLanguage, hindiLevel]
    );

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "30d" });
    res.status(201).json({ token, user });
  } catch (e) {
    if (e.code === "23505") return res.status(409).json({ error: "Email already registered" });
    res.status(500).json({ error: "Signup failed" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email?.trim().toLowerCase()]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password || "", user.password_hash))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "30d" });
    delete user.password_hash;
    res.json({ token, user });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
});

app.get("/api/me", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT id,name,email,native_language,hindi_level,xp,streak,premium,created_at FROM users WHERE id=$1",
    [req.user.userId]
  );
  if (!result.rows[0]) return res.status(404).json({ error: "User not found" });
  res.json({ user: result.rows[0] });
});

app.patch("/api/me", auth, async (req, res) => {
  const { name, nativeLanguage, hindiLevel } = req.body;
  const result = await pool.query(
    `UPDATE users SET
      name=COALESCE($1,name),
      native_language=COALESCE($2,native_language),
      hindi_level=COALESCE($3,hindi_level)
     WHERE id=$4
     RETURNING id,name,email,native_language,hindi_level,xp,streak,premium,created_at`,
    [name || null, nativeLanguage || null, hindiLevel || null, req.user.userId]
  );
  res.json({ user: result.rows[0] });
});

app.get("/api/progress", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT lesson_id,completed,quiz_score,updated_at FROM lesson_progress WHERE user_id=$1 ORDER BY lesson_id",
    [req.user.userId]
  );
  res.json({ progress: result.rows });
});

app.post("/api/progress", auth, async (req, res) => {
  const { lessonId, completed = false, quizScore = 0, xp = 0 } = req.body;
  if (!Number.isInteger(Number(lessonId))) return res.status(400).json({ error: "Invalid lessonId" });

  await pool.query(
    `INSERT INTO lesson_progress (user_id,lesson_id,completed,quiz_score)
     VALUES ($1,$2,$3,$4)
     ON CONFLICT (user_id,lesson_id)
     DO UPDATE SET completed=$3, quiz_score=$4, updated_at=NOW()`,
    [req.user.userId, Number(lessonId), !!completed, Number(quizScore)]
  );

  if (Number(xp) > 0) {
    await pool.query("UPDATE users SET xp=xp+$1 WHERE id=$2", [Number(xp), req.user.userId]);
  }
  res.json({ ok: true });
});

app.get("/", (_req, res) => res.json({
  name: "Hindi Sikho Backend",
  status: "running",
  endpoints: ["/health", "/api/auth/signup", "/api/auth/login", "/api/me", "/api/progress"]
}));

initDb()
  .then(() => app.listen(PORT, "0.0.0.0", () => console.log(`Hindi Sikho backend listening on ${PORT}`)))
  .catch((err) => {
    console.error("Database initialization failed:", err);
    process.exit(1);
  });
