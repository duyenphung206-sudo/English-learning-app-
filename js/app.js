'use strict';
/* ================== GIỌNG NÓI (Web Speech API) ================== */
let voices=[];
function loadVoices(){ voices=window.speechSynthesis?speechSynthesis.getVoices():[]; fillVoiceSel(); }
if(window.speechSynthesis){ loadVoices(); speechSynthesis.onvoiceschanged=loadVoices; }
function langVoices(lang){
  return voices.filter(v=>v.lang&&v.lang.toLowerCase().replace('_','-').startsWith(lang));
}
function pickVI(){
  const list=langVoices('vi');
  if(!list.length) return null;
  if(P.set.voice){ const f=list.find(v=>v.name===P.set.voice); if(f) return f; }
  return list.find(v=>/hoaimy/i.test(v.name))||list.find(v=>/namminh/i.test(v.name))
    ||list.find(v=>/google/i.test(v.name))||list[0];
}
function pickEN(){
  const list=langVoices('en-us').length?langVoices('en-us'):langVoices('en');
  if(!list.length) return null;
  return list.find(v=>/ana/i.test(v.name))||list.find(v=>/google us english/i.test(v.name))
    ||list.find(v=>/female|aria|jenny|zira|samantha/i.test(v.name))||list[0];
}
function speak(text,lang,cb){
  if(!window.speechSynthesis){ if(cb)cb(); return; }
  if(!voices.length) loadVoices();
  const u=new SpeechSynthesisUtterance(text);
  u.lang=lang;
  if(lang==='vi-VN'){ const v=pickVI(); if(v)u.voice=v; u.pitch=P.set.pitch||1.35; u.rate=1.0; }
  else { const v=pickEN(); if(v)u.voice=v; u.pitch=1.3; u.rate=0.8; }
  if(cb)u.onend=cb;
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}
const sayVI=(t,cb)=>speak(t,'vi-VN',cb);
const sayEN=(t,cb)=>speak(t,'en-US',cb);
/* ==== GIỌNG VIỆT BẢN XỨ TỪ FILE THU SẴN (audio/vi.mp3 + vi.json) ====
   Nếu có 2 file này (tạo bằng tools/TAO_GIONG_VIET.bat), mọi câu tiếng Việt
   dùng giọng Hoài My bản xứ — không phụ thuộc giọng của trình duyệt.
   Không có file thì tự rơi về giọng trình duyệt (sayVI). */
const VN={map:null,audio:null,timer:null,tried:false};
function initVN(){
  if(VN.tried) return; VN.tried=true;
  fetch('audio/vi.json').then(r=>r.ok?r.json():null).then(m=>{
    if(!m) return;
    VN.map=m;
    VN.audio=new Audio('audio/vi.mp3');
    VN.audio.preload='auto';
    const w=document.getElementById('voiceWarn'); if(w)w.classList.remove('show');
  }).catch(()=>{});
}
function playVI(key,fallback,cb){
  const seg=VN.map&&VN.map[key];
  if(!seg||!VN.audio){ sayVI(fallback,cb); return; }
  if(window.speechSynthesis)speechSynthesis.cancel();
  clearTimeout(VN.timer);
  const a=VN.audio;
  a.pause(); a.currentTime=seg[0];
  a.play().then(()=>{
    VN.timer=setTimeout(()=>{ a.pause(); if(cb)cb(); },Math.max(60,(seg[1]-0.06)*1000));
  }).catch(()=>{ sayVI(fallback,cb); });
}
/* cảnh báo khi trình duyệt không có giọng tiếng Việt (nguyên nhân giọng đọc "lơ lớ") */
function checkViVoice(){
  const w=document.getElementById('voiceWarn'); if(!w) return;
  if(VN.map){ w.classList.remove('show'); return; }
  if(langVoices('vi').length===0) w.classList.add('show');
  else w.classList.remove('show');
}

/* ================== TÀI KHOẢN (Firebase - auth.js) + ĐỒNG BỘ ĐÁM MÂY ================== */
const AUTH={user:null,profile:null,syncT:null};
function authReady(){ return !!window.Auth; }
function mergeP(loc,cld){
  if(!cld||!cld.days) return loc;
  const out={days:{},words:{},set:loc.set};
  const dk={}; Object.keys(loc.days).concat(Object.keys(cld.days)).forEach(k=>dk[k]=1);
  Object.keys(dk).forEach(k=>{
    const a=loc.days[k]||{}, b=cld.days[k]||{}, m={};
    ['stars','words','correct','total','sec'].forEach(f=>m[f]=Math.max(a[f]||0,b[f]||0));
    out.days[k]=m;
  });
  Object.assign(out.words,cld.words||{},loc.words||{});
  return out;
}
function cloudPush(){
  if(!AUTH.user||!authReady()) return;
  clearTimeout(AUTH.syncT);
  AUTH.syncT=setTimeout(()=>{ window.Auth.saveProgress(AUTH.user.uid,{appData:P}).catch(()=>{}); },1500);
}
function initAuth(){
  if(initAuth.done) return;
  if(!authReady()){ setTimeout(initAuth,400); return; } /* đợi module auth.js nạp xong */
  initAuth.done=true;
  window.Auth.onAuthStateChanged(async u=>{
    AUTH.user=u||null;
    if(u){
      try{
        AUTH.profile=await window.Auth.loadProfile(u.uid);
        if(AUTH.profile&&AUTH.profile.appData){ P=mergeP(P,AUTH.profile.appData); save(); refreshStars(); }
        else cloudPush();
      }catch(e){}
      const lg=document.getElementById('scr-login');
      if(lg&&lg.classList.contains('active')) goHome();
    } else { AUTH.profile=null; }
    updateAuthUI();
  });
}
function childName(){ return (AUTH.profile&&AUTH.profile.childName)||''; }
function updateAuthUI(){
  const box=document.getElementById('acctBox');
  if(box){
    if(!authReady()){
      box.innerHTML='<span style="color:var(--sub)">Tính năng tài khoản hoạt động khi web chạy qua GitHub Pages (không chạy khi mở file trực tiếp).</span>';
    } else if(AUTH.user){
      box.innerHTML='Đang đăng nhập: <b>'+AUTH.user.email+'</b>'+(childName()?' — Bé: <b>'+childName()+'</b>':'')+
        '<br>Tiến độ của bé được tự động lưu lên đám mây.<br>'+
        '<button class="btn pink" style="font-size:15px;padding:9px 20px" onclick="doLogout()">Đăng xuất</button>';
    } else {
      box.innerHTML='Chưa đăng nhập — tiến độ chỉ lưu trên máy này.<br>'+
        '<button class="btn blue" style="font-size:15px;padding:9px 20px" onclick="showScreen(&quot;scr-login&quot;)">Đăng nhập / Đăng ký</button>';
    }
  }
  const tg=document.querySelector('#scr-home .tagline');
  if(tg) tg.textContent=childName()?('Chào bé '+childName()+'! Bé chọn trò nhé! 👇'):'Bé chọn trò nhé! 👇';
}
function aMsg(t,ok){ const m=document.getElementById('aMsg'); if(m){ m.textContent=t||''; m.className=ok?'ok':''; } }
async function doLogin(){
  if(!authReady()){ aMsg('Không kết nối được dịch vụ tài khoản.'); return; }
  const e=document.getElementById('aEmail').value.trim(), p=document.getElementById('aPass').value;
  if(!e||!p){ aMsg('Nhập email và mật khẩu nhé.'); return; }
  aMsg('Đang đăng nhập...',1);
  try{ await window.Auth.login(e,p); aMsg(''); }
  catch(err){ aMsg(window.Auth.friendlyError(err.code)); }
}
async function doRegister(){
  if(!authReady()){ aMsg('Không kết nối được dịch vụ tài khoản.'); return; }
  const e=document.getElementById('aEmail').value.trim(), p=document.getElementById('aPass').value,
        n=document.getElementById('aName').value.trim();
  if(!e||!p){ aMsg('Nhập email và mật khẩu nhé.'); return; }
  aMsg('Đang tạo tài khoản...',1);
  try{ await window.Auth.register(e,p,n); aMsg(''); }
  catch(err){ aMsg(window.Auth.friendlyError(err.code)); }
}
async function doForgot(){
  if(!authReady()) return;
  const e=document.getElementById('aEmail').value.trim();
  if(!e){ aMsg('Nhập email trước nhé.'); return; }
  try{ await window.Auth.resetPassword(e); aMsg('Đã gửi email đặt lại mật khẩu!',1); }
  catch(err){ aMsg(window.Auth.friendlyError(err.code)); }
}
function skipLogin(){ P.set.skipLogin=1; save(); goHome(); }
function doLogout(){ if(authReady()) window.Auth.logout(); AUTH.user=null; AUTH.profile=null; updateAuthUI(); }

/* ================== LƯU TIẾN ĐỘ (localStorage) ================== */
const KEY='beHocTiengAnh_v1';
let P;
try{ P=JSON.parse(localStorage.getItem(KEY))||null; }catch(e){ P=null; }
if(!P||!P.days) P={days:{},words:{}};
if(!P.set) P.set={voice:'',pitch:1.35};
function save(){ try{ localStorage.setItem(KEY,JSON.stringify(P)); }catch(e){} cloudPush(); }
function dkey(d){ d=d||new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function day(){ const k=dkey(); if(!P.days[k])P.days[k]={stars:0,words:0,correct:0,total:0,sec:0}; return P.days[k]; }
function addStar(n){ day().stars+=n; save(); refreshStars(); }
function learnWord(en){ if(!P.words[en]){ P.words[en]=dkey(); day().words++; save(); } }
function totalStars(){ return Object.values(P.days).reduce((s,d)=>s+(d.stars||0),0); }
function refreshStars(){ const s=totalStars();
  document.getElementById('starLearn').textContent=s;
  document.getElementById('starQuiz').textContent=s; }
setInterval(()=>{ const sc=document.querySelector('.screen.active');
  if(sc&&(sc.id==='scr-learn'||sc.id==='scr-quiz'||sc.id==='scr-play')&&!document.hidden){ day().sec+=5; save(); } },5000);

/* ================== CHUYỂN MÀN HÌNH ================== */
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('homeMonsters').style.display=(id==='scr-home')?'flex':'none';
  if(id==='scr-play') startMusic(); else stopMusic();
  sfx.swipe();
}
function goHome(){ showScreen('scr-home'); if(window.speechSynthesis)speechSynthesis.cancel(); }
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

/* ================== DỰNG TRANG CHỦ ================== */
document.getElementById('startMonster').innerHTML=monsterSVG('#8cc63f','#55831f','bob');
document.getElementById('homeMonsters').innerHTML=
  M_COLORS.slice(0,4).map(c=>monsterSVG(c[0],c[1],'bob')).join('');
document.querySelectorAll('#homeMonsters .monster').forEach((m,i)=>m.style.animationDelay=(i*0.35)+'s');
document.getElementById('learnMascot').innerHTML=monsterSVG('#f7941d','#c26a0a','bob');
document.getElementById('qMascot').innerHTML=monsterSVG('#9b59d0','#6e35a0','');
const _lm=document.getElementById('loginMonster');
if(_lm)_lm.innerHTML=monsterSVG('#f0629a','#bb3a6e','bob');
document.getElementById('rewardMonster').innerHTML=monsterSVG('#3b9ee8','#1f6cb0','open jump');
const grid=document.getElementById('topicGrid');
const playCard=document.createElement('button');
playCard.className='topic c5';
playCard.innerHTML='<span class="em">🏡</span>Khu vui chơi<span class="cnt">Chạm & khám phá '+PLAY_ITEMS.length+' vật</span>';
playCard.onclick=openPlay;
grid.appendChild(playCard);
Object.keys(TOPICS).forEach(k=>{
  const t=TOPICS[k], b=document.createElement('button');
  b.className='topic '+t.cls;
  b.innerHTML='<span class="em">'+t.icon+'</span>'+t.title+'<span class="cnt">'+t.items.length+' từ vựng</span>';
  b.onclick=()=>openTopic(k);
  grid.appendChild(b);
});

/* ================== KHU VUI CHƠI (sprite SVG tự vẽ) ================== */
let playBuilt=false, playFound={};
function buildPlay(){
  if(playBuilt) return; playBuilt=true;
  const sc=document.getElementById('playScene');
  PLAY_ITEMS.forEach((it,i)=>{
    const b=document.createElement('button');
    b.className='pItem'+(it.fly?' flying':'');
    b.innerHTML=SPR[it.spr]();
    b.style.setProperty('--w',(it.w||11)+'%');
    if(!it.fly){ b.style.left=it.x+'%'; b.style.top=it.y+'%'; }
    b.style.animationDelay=(it.delay!=null?it.delay:i*0.25)+'s';
    b.onclick=()=>tapItem(b,it);
    sc.appendChild(b);
  });
}
function sparkle(el,host){
  const sc=document.getElementById(host||'playScene');
  const r=el.getBoundingClientRect(), rs=sc.getBoundingClientRect();
  const cx=r.left-rs.left+r.width/2, cy=r.top-rs.top+r.height/2;
  const ems=['✨','⭐','💫'];
  for(let i=0;i<6;i++){
    const s=document.createElement('div'); s.className='spark';
    s.textContent=ems[i%3];
    s.style.left=cx+'px'; s.style.top=cy+'px';
    s.style.setProperty('--dx',(Math.random()*120-60)+'px');
    s.style.setProperty('--dy',(Math.random()*-90-20)+'px');
    sc.appendChild(s);
    setTimeout(()=>s.remove(),800);
  }
}
function showWord(t){
  const w=document.getElementById('playWord');
  w.textContent=t; w.classList.add('show');
  clearTimeout(w._t); w._t=setTimeout(()=>w.classList.remove('show'),1900);
}
function tapItem(el,it){
  if(!it.fly){ el.classList.remove('tapped'); void el.offsetWidth; el.classList.add('tapped'); }
  sparkle(el);
  if(window.speechSynthesis)speechSynthesis.cancel();
  let d=0;
  if(it.snd&&ANIMAL[it.snd]){ ANIMAL[it.snd](); d=1000; }
  else if(it.obj&&OBJ[it.obj]){ OBJ[it.obj](); d=600; }
  showWord(it.en+' — '+it.vi);
  setTimeout(()=>{ sayEN(it.en,()=>playVI('w:'+it.en,it.vi)); },d);
  if(!playFound[it.en]){ playFound[it.en]=1; learnWord(it.en); updatePlayCount(); }
}
function updatePlayCount(){
  const n=Object.keys(playFound).length;
  document.getElementById('playCount').textContent=
    n>=PLAY_ITEMS.length?'🎉 Bé đã khám phá hết khu vui chơi rồi!':'✨ Bé đã khám phá '+n+'/'+PLAY_ITEMS.length+'. Chạm tiếp nhé!';
  if(n>=PLAY_ITEMS.length){ sfx.fanfare(); confetti(30); }
}
function openPlay(){
  buildPlay();
  showScreen('scr-play');
  playVI('p:play','Chào mừng bé đến khu vui chơi! Bé chạm vào mọi thứ để khám phá nhé!');
}

/* ================== HỌC TỪ VỰNG ================== */
let curTopic='animals', curIdx=0;
function openTopic(k){
  curTopic=k; curIdx=0;
  document.getElementById('learnTitle').textContent=TOPICS[k].icon+' '+TOPICS[k].title;
  renderCard();
  showScreen('scr-learn'); refreshStars();
  playVI('p:topic_'+k,'Chủ đề '+TOPICS[k].title+'. Bé bấm vào loa để nghe nhé!');
}
function renderCard(){
  const items=TOPICS[curTopic].items, it=items[curIdx];
  document.getElementById('cEmoji').textContent=it.e;
  document.getElementById('cEn').textContent=it.en;
  document.getElementById('cVi').textContent=it.vi;
  document.getElementById('animalBtn').style.display=(it.snd&&ANIMAL[it.snd])?'inline-block':'none';
  document.getElementById('cardCount').textContent=(curIdx+1)+' / '+items.length;
}
function moveCard(dir){
  const items=TOPICS[curTopic].items;
  const card=document.getElementById('card');
  card.classList.add(dir>0?'out-l':'out-r');
  setTimeout(()=>{
    curIdx=(curIdx+dir+items.length)%items.length;
    renderCard();
    card.classList.remove('out-l','out-r');
    card.style.transition='none';
    card.style.transform=dir>0?'translateX(125%) rotate(8deg)':'translateX(-125%) rotate(-8deg)';
    card.style.opacity='0';
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      card.style.transition=''; card.style.transform=''; card.style.opacity='';
    }));
  },380);
}
function hearEN(){ const it=TOPICS[curTopic].items[curIdx]; sayEN(it.en); learnWord(it.en); }
function hearVI(){ const it=TOPICS[curTopic].items[curIdx]; playVI('w:'+it.en,it.vi); }
function hearAnimal(){ const it=TOPICS[curTopic].items[curIdx];
  if(it.snd&&ANIMAL[it.snd]){ if(window.speechSynthesis)speechSynthesis.cancel(); ANIMAL[it.snd](); } }

/* ================== TRÒ CHƠI "TÌM TRONG CẢNH" (Where is the pig?) ================== */
const Q_TOTAL=20, POS9=[
  {x:15,y:22},{x:50,y:16},{x:84,y:22},
  {x:14,y:52},{x:50,y:47},{x:85,y:52},
  {x:17,y:81},{x:50,y:84},{x:83,y:80}
];
let quiz=[], qIdx=0, qStarsEarned=0, qLock=false, firstTry=true, qTarget=null;
function qMood(m){
  const el=document.querySelector('#qMascot .monster'); if(!el)return;
  el.classList.remove('open','sad','jump');
  if(m==='happy'){ el.classList.add('open'); void el.offsetWidth; el.classList.add('jump'); }
  if(m==='sad') el.classList.add('sad');
}
function updateBar(){
  document.getElementById('quizBar').style.width=Math.round(qIdx/Q_TOTAL*100)+'%';
}
function startQuiz(){
  const items=TOPICS[curTopic].items;
  quiz=shuffle(items).slice(0,Math.min(Q_TOTAL,items.length));
  qIdx=0; qStarsEarned=0; updateBar();
  showScreen('scr-quiz'); refreshStars(); qMood('idle');
  setTimeout(showQuestion,500);
}
function qTextEN(it){ return 'Where is the '+it.en.toLowerCase()+'?'; }
function qTextVI(it){ return 'Đâu là '+it.vi.charAt(0).toLowerCase()+it.vi.slice(1)+'?'; }
function showQuestion(){
  qLock=false; firstTry=true; qMood('idle');
  const it=quiz[qIdx]; qTarget=it;
  document.getElementById('quizQ').innerHTML=
    '❓ '+qTextEN(it)+'<span class="viSub">'+qTextVI(it)+'</span>';
  const others=shuffle(TOPICS[curTopic].items.filter(x=>x.en!==it.en)).slice(0,8);
  const opts=shuffle([it].concat(others));
  const sc=document.getElementById('findScene');
  sc.querySelectorAll('.fItem').forEach(n=>n.remove());
  opts.forEach((o,i)=>{
    const p=POS9[i];
    const b=document.createElement('button'); b.className='fItem'; b.textContent=o.e;
    b.style.left=(p.x+(Math.random()*6-3))+'%';
    b.style.top=(p.y+(Math.random()*6-3))+'%';
    b.style.animationDelay=(i*0.2)+'s';
    b.onclick=()=>pickFind(b,o);
    sc.appendChild(b);
  });
  askAgain();
}
function askAgain(){ if(qTarget) sayEN(qTextEN(qTarget),()=>playVI('q:'+qTarget.en,qTextVI(qTarget))); }
function pickFind(btn,o){
  if(qLock) return;
  if(o.en===qTarget.en){
    qLock=true; btn.classList.add('ok'); sfx.correct(); sparkle(btn,'findScene'); qMood('happy');
    learnWord(qTarget.en);
    if(firstTry){ qStarsEarned++; addStar(1); }
    playVI('p:correct','Đúng rồi! Giỏi quá!',()=>{ sayEN(qTarget.en); });
    if(qTarget.snd&&ANIMAL[qTarget.snd]) setTimeout(()=>ANIMAL[qTarget.snd](),1500);
    setTimeout(()=>{ qIdx++; updateBar(); day().total++; day().correct++; save();
      if(qIdx<quiz.length) showQuestion(); else endQuiz(); },2300);
  } else {
    firstTry=false; btn.classList.add('no'); sfx.wrong(); qMood('sad');
    day().total++; save();
    playVI('p:wrong','Chưa đúng, bé tìm lại nhé!');
    setTimeout(()=>{ btn.classList.remove('no'); qMood('idle'); },700);
  }
}
function endQuiz(){
  document.getElementById('rewardStars').textContent='⭐ '+qStarsEarned+' / '+quiz.length+' sao';
  const msgs=qStarsEarned>=quiz.length?['Xuất sắc! Bé đúng hết luôn!']:
    qStarsEarned>=quiz.length/2?['Bé giỏi quá!']:['Cố lên bé nhé!'];
  document.getElementById('rewardMsg').textContent=msgs[0];
  const rm=document.querySelector('#rewardMonster .monster');
  if(rm){ rm.classList.remove('jump'); void rm.offsetWidth; rm.classList.add('jump'); }
  showScreen('scr-reward'); sfx.fanfare(); confetti(40);
  const mk=qStarsEarned>=quiz.length?'p:excellent':qStarsEarned>=quiz.length/2?'p:good':'p:try';
  playVI(mk,msgs[0]+' Bé được '+qStarsEarned+' ngôi sao!');
}
function confetti(n){
  const ems=['🎉','⭐','🌟','🎈','💛','💚','💙','🧡'];
  for(let i=0;i<n;i++){
    const d=document.createElement('div'); d.className='confetti';
    d.textContent=ems[Math.floor(Math.random()*ems.length)];
    d.style.left=Math.random()*100+'vw';
    d.style.animationDuration=(1.6+Math.random()*1.6)+'s';
    d.style.fontSize=(18+Math.random()*22)+'px';
    document.body.appendChild(d);
    setTimeout(()=>d.remove(),3500);
  }
}

/* ================== TRANG BA MẸ ================== */
let gateAns=0, range='week', metric='stars';
function openGate(){
  const a=Math.floor(Math.random()*8)+2, b=Math.floor(Math.random()*8)+2; gateAns=a+b;
  document.getElementById('gateQ').textContent=a+' + '+b+' = ?';
  document.getElementById('gateA').value='';
  document.getElementById('gateModal').classList.add('show');
  setTimeout(()=>document.getElementById('gateA').focus(),100);
}
function closeGate(){ document.getElementById('gateModal').classList.remove('show'); }
function checkGate(){
  if(parseInt(document.getElementById('gateA').value,10)===gateAns){
    closeGate(); renderParent(); showScreen('scr-parent');
  } else { sfx.wrong(); openGate(); }
}
function setRange(r){ range=r;
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('on',t.dataset.r===r));
  renderChart(); }
function setMetric(m){ metric=m;
  document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('on',c.dataset.m===m));
  renderChart(); }
function getVal(d){ if(!d)return 0;
  return metric==='stars'?(d.stars||0):metric==='words'?(d.words||0):Math.round((d.sec||0)/60); }
function streak(){
  let s=0, d=new Date();
  if(!P.days[dkey(d)]) d.setDate(d.getDate()-1);
  while(P.days[dkey(d)]){ s++; d.setDate(d.getDate()-1); }
  return s;
}
function fillVoiceSel(){
  const sel=document.getElementById('voiceSel'); if(!sel) return;
  const list=langVoices('vi');
  sel.innerHTML='';
  if(!list.length){ sel.innerHTML='<option>Chưa tìm thấy giọng tiếng Việt — hãy dùng Edge/Chrome và có mạng</option>'; return; }
  list.forEach(v=>{
    const o=document.createElement('option');
    o.value=v.name; o.textContent=v.name;
    sel.appendChild(o);
  });
  const cur=pickVI(); if(cur) sel.value=cur.name;
  const sl=document.getElementById('pitchSl');
  if(sl){ sl.value=P.set.pitch||1.35;
    document.getElementById('pitchV').textContent='×'+(P.set.pitch||1.35); }
}
function saveVoice(){ P.set.voice=document.getElementById('voiceSel').value; save(); }
function savePitch(){ P.set.pitch=parseFloat(document.getElementById('pitchSl').value); save();
  document.getElementById('pitchV').textContent='×'+P.set.pitch; }
function testVoice(){ playVI('p:test','Xin chào! Bé cùng học tiếng Anh thật vui nhé!'); }
function renderParent(){
  const tSec=Object.values(P.days).reduce((s,d)=>s+(d.sec||0),0);
  const tCor=Object.values(P.days).reduce((s,d)=>s+(d.correct||0),0);
  const tTot=Object.values(P.days).reduce((s,d)=>s+(d.total||0),0);
  const stats=[
    ['⭐ '+totalStars(),'Tổng ngôi sao'],
    [Object.keys(P.words).length,'Từ đã học'],
    [streak()+' 🔥','Ngày học liên tiếp'],
    [Math.round(tSec/60)+' phút','Tổng thời gian'],
    [tTot?Math.round(tCor/tTot*100)+'%':'—','Trả lời đúng']
  ];
  document.getElementById('statGrid').innerHTML=stats.map(s=>
    '<div class="stat"><div class="v">'+s[0]+'</div><div class="l">'+s[1]+'</div></div>').join('');
  let rows=Object.keys(TOPICS).map(k=>{
    const t=TOPICS[k], done=t.items.filter(i=>P.words[i.en]).length;
    const pc=Math.round(done/t.items.length*100);
    return '<div class="tRow">'+t.icon+' <b>'+t.title+'</b> — '+done+'/'+t.items.length+' từ'+
      '<div class="prog"><div style="width:'+pc+'%"></div></div></div>';
  }).join('');
  const pd=PLAY_ITEMS.filter(i=>P.words[i.en]).length;
  rows+='<div class="tRow">🏡 <b>Khu vui chơi</b> — '+pd+'/'+PLAY_ITEMS.length+
    '<div class="prog"><div style="width:'+Math.round(pd/PLAY_ITEMS.length*100)+'%"></div></div></div>';
  document.getElementById('topicProg').innerHTML=rows;
  updateAuthUI();
  fillVoiceSel();
  renderChart();
}
function renderChart(){
  const bars=[]; const now=new Date();
  const dayNames=['CN','T2','T3','T4','T5','T6','T7'];
  if(range==='week'){
    for(let i=6;i>=0;i--){ const d=new Date(); d.setDate(now.getDate()-i);
      bars.push({label:i===0?'Hôm nay':dayNames[d.getDay()], val:getVal(P.days[dkey(d)]), today:i===0}); }
  } else if(range==='month'){
    for(let w=3;w>=0;w--){ let v=0;
      for(let i=0;i<7;i++){ const d=new Date(); d.setDate(now.getDate()-(w*7+i)); v+=getVal(P.days[dkey(d)]); }
      bars.push({label:w===0?'Tuần này':w+' tuần trước', val:v, today:w===0}); }
  } else {
    for(let m=0;m<12;m++){ let v=0;
      Object.keys(P.days).forEach(k=>{ const p=k.split('-');
        if(parseInt(p[0],10)===now.getFullYear()&&parseInt(p[1],10)===m+1) v+=getVal(P.days[k]); });
      bars.push({label:'Th'+(m+1), val:v, today:m===now.getMonth()}); }
  }
  const max=Math.max(1,...bars.map(b=>b.val));
  document.getElementById('chart').innerHTML=bars.map(b=>
    '<div class="barCol"><div class="barV">'+(b.val||'')+'</div>'+
    '<div class="bar'+(b.today?' today':'')+'" style="height:'+Math.round(b.val/max*100)+'%"></div>'+
    '<div class="barL">'+b.label+'</div></div>').join('');
}
function resetData(){
  if(confirm('Xóa toàn bộ dữ liệu học của bé?')){
    const set=P.set; P={days:{},words:{},set:set}; playFound={}; save(); renderParent(); refreshStars();
  }
}

/* ================== KHỞI ĐỘNG ================== */
document.getElementById('homeMonsters').style.display='none';
initAuth();
document.getElementById('startOverlay').addEventListener('click',function(){
  ac(); loadVoices(); initVN();
  this.classList.add('hide');
  if(authReady()&&!AUTH.user&&!P.set.skipLogin) showScreen('scr-login');
  else showScreen('scr-home');
  refreshStars();
  setTimeout(()=>{ checkViVoice(); playVI('p:hello','Chào bé! Cùng các bạn quái vật học tiếng Anh nào!'); },900);
});
document.addEventListener('pointerdown',e=>{
  if(e.target.closest('button')&&AC&&!e.target.closest('.pItem')&&!e.target.closest('.fItem')) sfx.click();
});
document.getElementById('gateA').addEventListener('keydown',e=>{ if(e.key==='Enter')checkGate(); });
/* v4: sprite SVG tu ve, 400+ tu vung, tro choi tim trong canh, am thanh chan thuc hon */
