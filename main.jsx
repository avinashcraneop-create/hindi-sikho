import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BookOpen, Home, Trophy, User, Volume2, ChevronRight, Check,
  Flame, Target, Play, Languages, Sparkles, ShoppingBag, Plane,
  Utensils, Users, Palette, Hash, MessageCircle, Headphones,
  Mic, Lock, RotateCcw
} from "lucide-react";
import "./styles.css";

const lessons = [
  { id:1, title:"Greetings", hi:"अभिवादन", icon:MessageCircle, words:[
    ["Hello","नमस्ते","Namaste","Greeting","नमस्ते! आप कैसे हैं?"],
    ["Good morning","सुप्रभात","Suprabhat","Morning greeting","सुप्रभात!"],
    ["Thank you","धन्यवाद","Dhanyavaad","Thanks","धन्यवाद, आपका बहुत धन्यवाद।"],
    ["Please","कृपया","Kripya","Polite request","कृपया बैठिए।"],
    ["Sorry","माफ़ कीजिए","Maaf kijiye","Apology","माफ़ कीजिए, मुझे देर हो गई।"]
  ]},
  { id:2, title:"Introduction", hi:"परिचय", icon:Users, words:[
    ["My name is...","मेरा नाम ... है","Mera naam ... hai","Introducing yourself","मेरा नाम राहुल है।"],
    ["What is your name?","आपका नाम क्या है?","Aapka naam kya hai?","Asking a name","आपका नाम क्या है?"],
    ["I am from India.","मैं भारत से हूँ।","Main Bharat se hoon.","Origin","मैं भारत से हूँ।"],
    ["Nice to meet you.","आपसे मिलकर खुशी हुई।","Aapse milkar khushi hui.","Meeting someone","आपसे मिलकर खुशी हुई।"],
    ["I am learning Hindi.","मैं हिंदी सीख रहा हूँ।","Main Hindi seekh raha hoon.","Learning","मैं हिंदी सीख रहा हूँ।"]
  ]},
  { id:3, title:"Numbers", hi:"गिनती", icon:Hash, words:[
    ["One","एक","Ek","Number 1","एक किताब"],
    ["Two","दो","Do","Number 2","दो लोग"],
    ["Three","तीन","Teen","Number 3","तीन सेब"],
    ["Ten","दस","Das","Number 10","दस रुपये"],
    ["Hundred","सौ","Sau","Number 100","सौ रुपये"]
  ]},
  { id:4, title:"Family", hi:"परिवार", icon:Users, words:[
    ["Mother","माँ","Maa","Family","मेरी माँ घर पर हैं।"],
    ["Father","पिता","Pita","Family","मेरे पिता काम करते हैं।"],
    ["Brother","भाई","Bhai","Family","मेरा भाई पढ़ता है।"],
    ["Sister","बहन","Behen","Family","मेरी बहन स्कूल जाती है।"],
    ["Family","परिवार","Parivaar","Family group","मेरा परिवार बड़ा है।"]
  ]},
  { id:5, title:"Food", hi:"खाना", icon:Utensils, words:[
    ["Water","पानी","Paani","Drink","मुझे पानी चाहिए।"],
    ["Food","खाना","Khaana","Meal/food","खाना तैयार है।"],
    ["Rice","चावल","Chaawal","Food","मुझे चावल पसंद हैं।"],
    ["Tea","चाय","Chaay","Drink","एक कप चाय, कृपया।"],
    ["Delicious","स्वादिष्ट","Swaadisht","Tasty","खाना बहुत स्वादिष्ट है।"]
  ]},
  { id:6, title:"Colors", hi:"रंग", icon:Palette, words:[
    ["Red","लाल","Laal","Color","लाल रंग सुंदर है।"],
    ["Blue","नीला","Neela","Color","आसमान नीला है।"],
    ["Green","हरा","Hara","Color","पेड़ हरा है।"],
    ["White","सफेद","Safed","Color","यह सफेद कपड़ा है।"],
    ["Black","काला","Kaala","Color","यह काला बैग है।"]
  ]},
  { id:7, title:"Daily Objects", hi:"रोज़मर्रा की चीज़ें", icon:BookOpen, words:[
    ["Book","किताब","Kitaab","Object","मेरी किताब कहाँ है?"],
    ["Phone","फ़ोन","Phone","Object","मेरा फ़ोन यहाँ है।"],
    ["Door","दरवाज़ा","Darwaaza","Object","दरवाज़ा बंद है।"],
    ["Chair","कुर्सी","Kursi","Object","कुर्सी पर बैठिए।"],
    ["Bag","बैग","Bag","Object","मेरा बैग नया है।"]
  ]},
  { id:8, title:"Shopping", hi:"खरीदारी", icon:ShoppingBag, words:[
    ["How much?","कितने का है?","Kitne ka hai?","Price question","यह कितने का है?"],
    ["Expensive","महँगा","Mehnga","High price","यह बहुत महँगा है।"],
    ["Cheap","सस्ता","Sasta","Low price","यह सस्ता है।"],
    ["Give me this.","यह मुझे दीजिए।","Yeh mujhe dijiye.","Request","यह मुझे दीजिए।"],
    ["Bill","बिल","Bill","Payment","बिल दीजिए।"]
  ]},
  { id:9, title:"Travel", hi:"यात्रा", icon:Plane, words:[
    ["Where?","कहाँ?","Kahan?","Place question","स्टेशन कहाँ है?"],
    ["Station","स्टेशन","Station","Travel place","स्टेशन पास है।"],
    ["Airport","हवाई अड्डा","Hawai adda","Travel place","हवाई अड्डा कहाँ है?"],
    ["Ticket","टिकट","Ticket","Travel document","मुझे एक टिकट चाहिए।"],
    ["Help","मदद","Madad","Assistance","मुझे मदद चाहिए।"]
  ]},
  { id:10, title:"Daily Conversation", hi:"रोज़ की बातचीत", icon:MessageCircle, words:[
    ["How are you?","आप कैसे हैं?","Aap kaise hain?","Greeting","आप कैसे हैं?"],
    ["I am fine.","मैं ठीक हूँ।","Main theek hoon.","Response","मैं ठीक हूँ।"],
    ["Where are you going?","आप कहाँ जा रहे हैं?","Aap kahan ja rahe hain?","Question","आप कहाँ जा रहे हैं?"],
    ["I don't understand.","मुझे समझ नहीं आया।","Mujhe samajh nahi aaya.","Useful phrase","मुझे समझ नहीं आया।"],
    ["See you tomorrow.","कल मिलते हैं।","Kal milte hain.","Farewell","कल मिलते हैं।"]
  ]}
];

const quizBank = [
  ["What is “Hello” in Hindi?","नमस्ते",["धन्यवाद","नमस्ते","माफ़ कीजिए","कृपया"]],
  ["What is “Water” in Hindi?","पानी",["चाय","पानी","खाना","दूध"]],
  ["What is “Mother” in Hindi?","माँ",["बहन","माँ","भाई","पिता"]],
  ["What is “One” in Hindi?","एक",["दस","दो","एक","तीन"]],
  ["What is “Book” in Hindi?","किताब",["बैग","फ़ोन","किताब","कुर्सी"]],
  ["What is “Red” in Hindi?","लाल",["हरा","नीला","लाल","सफेद"]],
  ["What is “Ticket” in Hindi?","टिकट",["स्टेशन","टिकट","मदद","बिल"]],
  ["What is “Thank you” in Hindi?","धन्यवाद",["नमस्ते","धन्यवाद","कृपया","सुप्रभात"]],
  ["What is “Family” in Hindi?","परिवार",["परिवार","दोस्त","घर","स्कूल"]],
  ["What is “How are you?” in Hindi?","आप कैसे हैं?",["आप कहाँ हैं?","आप कैसे हैं?","आपका नाम क्या है?","कल मिलते हैं।"]],
  ["What is “Father” in Hindi?","पिता",["माँ","पिता","भाई","बहन"]],
  ["What is “Blue” in Hindi?","नीला",["काला","नीला","लाल","हरा"]],
  ["What is “Airport” in Hindi?","हवाई अड्डा",["स्टेशन","बाज़ार","हवाई अड्डा","घर"]],
  ["What is “Please” in Hindi?","कृपया",["कृपया","माफ़ कीजिए","धन्यवाद","सुप्रभात"]],
  ["What is “I am fine” in Hindi?","मैं ठीक हूँ।",["मैं ठीक हूँ।","मैं जा रहा हूँ।","मुझे पानी चाहिए।","मैं भारत से हूँ।"]],
  ["What is “How much?” in Hindi?","कितने का है?",["कहाँ?","कितने का है?","कौन?","कब?"]],
  ["What is “Help” in Hindi?","मदद",["मदद","खाना","टिकट","बिल"]],
  ["What is “Good morning” in Hindi?","सुप्रभात",["शुभ रात्रि","सुप्रभात","धन्यवाद","नमस्ते"]],
  ["What is “See you tomorrow” in Hindi?","कल मिलते हैं।",["आज मिलते हैं।","कल मिलते हैं।","फिर मिलेंगे।","शुभ रात्रि।"]],
  ["What is “I am from India” in Hindi?","मैं भारत से हूँ।",["मैं हिंदी सीख रहा हूँ।","मैं भारत से हूँ।","मेरा नाम ... है।","मैं ठीक हूँ।"]],
  ["What is “Expensive” in Hindi?","महँगा",["सस्ता","महँगा","नया","पुराना"]],
  ["What is “Cheap” in Hindi?","सस्ता",["महँगा","सस्ता","अच्छा","बड़ा"]],
  ["What is “Door” in Hindi?","दरवाज़ा",["किताब","दरवाज़ा","कुर्सी","बैग"]],
  ["What is “Nice to meet you” in Hindi?","आपसे मिलकर खुशी हुई।",["आप कैसे हैं?","आपसे मिलकर खुशी हुई।","धन्यवाद।","मुझे समझ नहीं आया।"]],
  ["What is “I don't understand” in Hindi?","मुझे समझ नहीं आया।",["मुझे मदद चाहिए।","मुझे समझ नहीं आया।","मुझे पानी चाहिए।","मुझे हिंदी आती है।"]]
];

const defaultState = {
  screen:"welcome", name:"Learner", level:"Beginner", goal:10, xp:0,
  completed:[], streak:1, quizBest:0, dailyDone:0, currentLesson:1
};

function loadState(){ try { return {...defaultState, ...(JSON.parse(localStorage.getItem("hindiSikhoState"))||{})}; } catch { return defaultState; } }
function saveState(s){ localStorage.setItem("hindiSikhoState", JSON.stringify(s)); }
function speak(text){
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "hi-IN"; u.rate = .82;
    window.speechSynthesis.speak(u);
  }
}

function App(){
  const [state,setState] = useState(loadState);
  const [screen,setScreen] = useState(state.screen || "welcome");
  const [selectedLesson,setSelectedLesson] = useState(state.currentLesson || 1);
  const [showAllWords,setShowAllWords] = useState(false);

  useEffect(()=>{ saveState({...state,screen}); },[state,screen]);

  const update = patch => setState(s=>({...s,...patch}));
  const go = s => { setScreen(s); window.scrollTo({top:0,behavior:"smooth"}); };

  if(screen==="welcome") return <Welcome onStart={()=>go("language")} />;
  if(screen==="language") return <Language onNext={()=>go("level")} />;
  if(screen==="level") return <Level onNext={v=>{update({level:v});go("goal")}} />;
  if(screen==="goal") return <Goal onNext={v=>{update({goal:v});go("profileSetup")}} />;
  if(screen==="profileSetup") return <ProfileSetup onNext={name=>{update({name:name||"Learner"});go("home")}} />;
  if(screen==="lesson") return <Lesson lesson={lessons.find(x=>x.id===selectedLesson)} state={state} update={update} go={go} />;
  if(screen==="quiz") return <Quiz state={state} update={update} go={go} />;
  if(screen==="vocabulary") return <Vocabulary state={state} go={go} />;
  if(screen==="progress") return <Progress state={state} go={go} />;
  if(screen==="profile") return <Profile state={state} update={update} go={go} />;

  return <Home state={state} go={go} lessons={lessons} selectedLesson={selectedLesson} setSelectedLesson={setSelectedLesson} showAllWords={showAllWords} setShowAllWords={setShowAllWords} />;
}

function Shell({children,state,go,active="home"}){
  return <div className="app-shell">
    <header className="topbar">
      <div className="brand" onClick={()=>go("home")}><span className="brand-mark">हि</span><div><b>Hindi Sikho</b><small>Apni Language Se Hindi Sikho</small></div></div>
      <button className="icon-btn" onClick={()=>go("profile")}><User size={19}/></button>
    </header>
    <main>{children}</main>
    <nav className="bottom-nav">
      {[[Home,"Home","home"],[BookOpen,"Learn","home"],[Trophy,"Quiz","quiz"],[Target,"Progress","progress"],[User,"Profile","profile"]].map(([I,l,s])=>
        <button key={l} className={active===s? "nav-active":""} onClick={()=>go(s)}><I size={20}/><span>{l}</span></button>
      )}
    </nav>
  </div>
}

function Welcome({onStart}){ return <div className="onboard">
  <div className="hero-logo">हि</div><h1>Hindi Sikho</h1><p>Apni Language Se Hindi Sikho</p>
  <div className="welcome-card"><Languages size={28}/><h2>Hindi सीखना अब आसान!</h2><p>English से Hindi सीखें — vocabulary, sentences और quizzes के साथ।</p></div>
  <button className="primary wide" onClick={onStart}>Start Learning <ChevronRight/></button>
  <small className="muted">Phase 1 • English → Hindi</small>
</div> }

function Language({onNext}){ return <div className="onboard"><div className="step">1 / 3</div><h1>Choose your language</h1><p className="muted">आप किस language से Hindi सीखना चाहते हैं?</p><button className="lang selected"><span>🇬🇧</span><div><b>English</b><small>English → Hindi</small></div><Check/></button><button className="lang disabled"><span>🌍</span><div><b>More languages</b><small>Coming Soon</small></div><Lock/></button><button className="primary wide" onClick={onNext}>Continue <ChevronRight/></button></div>}

function Level({onNext}){ const [v,setV]=useState("Beginner"); return <div className="onboard"><div className="step">2 / 3</div><h1>Your Hindi level?</h1><p className="muted">अपने current level के अनुसार course चुनें।</p>{["Beginner","Intermediate","Advanced"].map(x=><button key={x} className={"choice "+(v===x?"selected":"")} onClick={()=>setV(x)}><div><b>{x}</b><small>{x==="Beginner"?"बिल्कुल शुरुआत से":x==="Intermediate"?"थोड़ी Hindi आती है":"Hindi अच्छी तरह आती है"}</small></div>{v===x&&<Check/>}</button>)}<button className="primary wide" onClick={()=>onNext(v)}>Continue <ChevronRight/></button></div>}

function Goal({onNext}){ const [v,setV]=useState(10); return <div className="onboard"><div className="step">3 / 3</div><h1>Set your daily goal</h1><p className="muted">हर दिन कितने मिनट सीखना चाहते हैं?</p>{[5,10,15,20].map(x=><button key={x} className={"goal "+(v===x?"selected":"")} onClick={()=>setV(x)}><b>{x}</b><span>minutes/day</span></button>)}<button className="primary wide" onClick={()=>onNext(v)}>Continue <ChevronRight/></button></div>}

function ProfileSetup({onNext}){ const [n,setN]=useState(""); return <div className="onboard"><div className="hero-logo small">हि</div><h1>Welcome!</h1><p className="muted">आपको किस नाम से बुलाएँ?</p><input className="input" value={n} onChange={e=>setN(e.target.value)} placeholder="Your name" maxLength={30}/><button className="primary wide" onClick={()=>onNext(n)}>Start Hindi Journey <Play size={18}/></button></div>}

function Home({state,go,lessons,selectedLesson,setSelectedLesson}){
 const completed=state.completed.length; const next=lessons.find(x=>!state.completed.includes(x.id)) || lessons[lessons.length-1];
 return <Shell state={state} go={go}>
  <section className="container">
   <div className="greeting"><div><span className="muted">Namaste 👋</span><h2>{state.name}</h2></div><div className="streak"><Flame size={18}/><b>{state.streak}</b><small>day</small></div></div>
   <div className="stats"><div><Sparkles/><b>{state.xp}</b><small>XP</small></div><div><Flame/><b>{state.streak}</b><small>Streak</small></div><div><Trophy/><b>{state.quizBest}%</b><small>Quiz Best</small></div></div>
   <div className="goal-card"><div><b>Daily Goal</b><span>{Math.min(state.dailyDone,state.goal)} / {state.goal} min</span></div><div className="progress"><i style={{width:`${Math.min(100,(state.dailyDone/state.goal)*100)}%`}}/></div></div>
   <div className="section-head"><h3>Continue Learning</h3><button onClick={()=>go("home")}>See all</button></div>
   <div className="continue-card" onClick={()=>{setSelectedLesson(next.id);go("lesson")}}><div className="lesson-icon"><next.icon size={25}/></div><div className="grow"><small>Lesson {next.id}</small><b>{next.title}</b><span>{next.hi} • {next.words.length} words</span></div><ChevronRight/></div>
   <div className="section-head"><h3>Your Course</h3><span className="muted">{completed}/{lessons.length}</span></div>
   <div className="course-list">{lessons.map(l=>{const done=state.completed.includes(l.id); return <button key={l.id} className={"lesson-row "+(done?"done":"")} onClick={()=>{setSelectedLesson(l.id);go("lesson")}}><span className="mini-icon"><l.icon size={18}/></span><div className="grow"><b>{l.id}. {l.title}</b><small>{l.hi}</small></div>{done?<span className="check"><Check size={15}/></span>:<ChevronRight size={18}/>}</button>})}</div>
   <div className="feature-grid"><button onClick={()=>go("vocabulary")}><BookOpen/><b>Vocabulary</b><small>50+ words</small></button><button onClick={()=>go("quiz")}><Trophy/><b>Quick Quiz</b><small>25 questions</small></button><button><Headphones/><b>Listening</b><small>Coming Soon</small></button><button><Mic/><b>Speaking</b><small>Coming Soon</small></button></div>
  </section>
 </Shell>
}

function Lesson({lesson,state,update,go}){ const [idx,setIdx]=useState(0); const [done,setDone]=useState(false); const w=lesson.words[idx]; const completed=state.completed.includes(lesson.id);
 const finish=()=>{if(!completed) update({completed:[...state.completed,lesson.id],xp:state.xp+20,dailyDone:state.dailyDone+5,currentLesson:Math.min(10,lesson.id+1)});setDone(true)};
 return <Shell state={state} go={go}><section className="container">
  <button className="back" onClick={()=>go("home")}>← Back to course</button>
  <div className="lesson-header"><span>Lesson {lesson.id}</span><h2>{lesson.title}</h2><p>{lesson.hi}</p></div>
  <div className="word-card"><div className="word-top"><span className="tag">Vocabulary {idx+1}/{lesson.words.length}</span><button className="sound" onClick={()=>speak(w[1])}><Volume2/></button></div><h1>{w[1]}</h1><h3>{w[2]}</h3><p>{w[0]} • {w[3]}</p><div className="example"><small>Example</small><b>{w[4]}</b><button onClick={()=>speak(w[4])}><Volume2 size={17}/></button></div></div>
  <div className="dots">{lesson.words.map((_,i)=><i key={i} className={i===idx?"active":""}/>)}</div>
  <div className="lesson-actions">{idx>0&&<button className="secondary" onClick={()=>setIdx(idx-1)}>Previous</button>}{idx<lesson.words.length-1?<button className="primary grow" onClick={()=>setIdx(idx+1)}>Next <ChevronRight/></button>:<button className="primary grow" onClick={finish}>{completed||done?<><Check/> Completed</>:<>Complete Lesson <Check/></>}</button>}</div>
  {done&&<div className="success"><Sparkles/> +20 XP earned! Lesson completed.</div>}
  <button className="outline wide" onClick={()=>go("quiz")}>Take a Quiz <Trophy size={18}/></button>
 </section></Shell> }

function Vocabulary({state,go}){ const all=lessons.flatMap(l=>l.words.map(w=>({l:l.id,w}))); return <Shell state={state} go={go} active="home"><section className="container"><div className="page-title"><div><h2>Vocabulary</h2><p>Learn 50+ useful Hindi words</p></div><BookOpen/></div><div className="vocab-list">{all.map((x,i)=><div className="vocab" key={i}><div className="grow"><b>{x.w[1]}</b><strong>{x.w[2]}</strong><small>{x.w[0]} • {x.w[3]}</small><span>{x.w[4]}</span></div><button className="sound" onClick={()=>speak(x.w[1])}><Volume2 size={18}/></button></div>)}</div></section></Shell> }

function Quiz({state,update,go}){ const [q,setQ]=useState(0),[score,setScore]=useState(0),[selected,setSelected]=useState(null),[finished,setFinished]=useState(false);
 const item=quizBank[q];
 const choose=v=>{if(selected)return;setSelected(v);if(v===item[1])setScore(s=>s+1)};
 const next=()=>{if(q===quizBank.length-1){const final=score+(selected===item[1]?0:0);const pct=Math.round((final/quizBank.length)*100);update({quizBest:Math.max(state.quizBest,pct),xp:state.xp+Math.round(pct/5)});setFinished(true)}else{setQ(q+1);setSelected(null)}};
 if(finished)return <Shell state={state} go={go} active="quiz"><section className="container center"><div className="result-icon"><Trophy/></div><h1>Quiz Complete!</h1><p className="muted">आपने {quizBank.length} questions पूरे किए।</p><div className="score"><b>{Math.round((score/quizBank.length)*100)}%</b><span>{score}/{quizBank.length} correct</span></div><button className="primary wide" onClick={()=>{setQ(0);setScore(0);setSelected(null);setFinished(false)}}><RotateCcw/> Try Again</button><button className="outline wide" onClick={()=>go("home")}>Back Home</button></section></Shell>;
 return <Shell state={state} go={go} active="quiz"><section className="container"><button className="back" onClick={()=>go("home")}>← Home</button><div className="quiz-progress"><span>Question {q+1} / {quizBank.length}</span><div className="progress"><i style={{width:`${((q+1)/quizBank.length)*100}%`}}/></div></div><div className="quiz-card"><span className="tag">English → Hindi</span><h2>{item[0]}</h2><div className="answers">{item[2].map(a=><button key={a} className={selected?(a===item[1]?"correct":a===selected?"wrong":""):""} onClick={()=>choose(a)}>{a}{selected&&a===item[1]&&<Check/>}</button>)}</div></div>{selected&&<div className={"feedback "+(selected===item[1]?"good":"bad")}>{selected===item[1]?"Correct! 🎉":"Not quite. सही answer: "+item[1]}</div>}<button className="primary wide" disabled={!selected} onClick={next}>{q===quizBank.length-1?"Finish":"Next"} <ChevronRight/></button></section></Shell> }

function Progress({state,go}){const pct=Math.round((state.completed.length/10)*100);return <Shell state={state} go={go} active="progress"><section className="container"><div className="page-title"><div><h2>Your Progress</h2><p>Keep going — रोज़ थोड़ा सीखें!</p></div><Target/></div><div className="big-progress"><div className="ring"><b>{pct}%</b></div><div><b>Course Progress</b><span>{state.completed.length} of 10 lessons completed</span></div></div><div className="progress-grid"><div><Sparkles/><b>{state.xp}</b><small>Total XP</small></div><div><Flame/><b>{state.streak}</b><small>Day Streak</small></div><div><Trophy/><b>{state.quizBest}%</b><small>Best Quiz</small></div><div><Check/><b>{state.completed.length}</b><small>Lessons</small></div></div><div className="tip"><Sparkles/><div><b>Learning Tip</b><p>हर दिन 5–10 नए words बोलकर practice करें। आवाज़ सुनने के लिए 🔊 button दबाएँ।</p></div></div></section></Shell>}

function Profile({state,update,go}){const reset=()=>{if(confirm("क्या आप पूरा progress reset करना चाहते हैं?")){localStorage.removeItem("hindiSikhoState");location.reload()}};return <Shell state={state} go={go} active="profile"><section className="container"><div className="profile-head"><div className="avatar">{state.name.slice(0,1).toUpperCase()}</div><h2>{state.name}</h2><p>Beginner • English → Hindi</p></div><div className="profile-card"><div><b>Daily Goal</b><span>{state.goal} minutes</span></div><div><b>Course</b><span>Hindi for Beginners</span></div><div><b>Language</b><span>English → Hindi</span></div></div><button className="outline wide" onClick={()=>go("home")}>Continue Learning</button><button className="danger wide" onClick={reset}>Reset Progress</button><p className="muted center small">Hindi Sikho Phase 1 MVP • More languages, AI Teacher, speaking and login are Coming Soon.</p></section></Shell>}

createRoot(document.getElementById("root")).render(<App/>);