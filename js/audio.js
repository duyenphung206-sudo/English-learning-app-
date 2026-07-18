'use strict';
/* ================== BỘ MÁY ÂM THANH (Web Audio API - tự tổng hợp) ================== */
let AC=null;
function ac(){ if(!AC) AC=new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==='suspended')AC.resume(); return AC; }

/* syn: bộ tổng hợp giọng thú — dao động + bộ lọc "cổ họng" (formant) + rung cao độ (vibrato)
   + rung âm lượng (AM) để giả nhịp rung của thanh quản động vật */
function syn(p){
  const c=ac(), t=c.currentTime+(p.delay||0), dur=p.dur;
  const o=c.createOscillator(); o.type=p.type||'sawtooth';
  o.frequency.setValueAtTime(p.f0,t);
  o.frequency.exponentialRampToValueAtTime(Math.max(p.f1||p.f0,20),t+dur);
  if(p.vib){ const lo=c.createOscillator(), lg=c.createGain();
    lo.frequency.value=p.vibF||6; lg.gain.value=p.vib;
    lo.connect(lg); lg.connect(o.frequency); lo.start(t); lo.stop(t+dur); }
  let node=o;
  if(p.filt){ const f=c.createBiquadFilter(); f.type='bandpass';
    f.frequency.setValueAtTime(p.filt,t);
    if(p.filt2) f.frequency.exponentialRampToValueAtTime(p.filt2,t+dur);
    f.Q.value=p.q||2; o.connect(f); node=f; }
  const g=c.createGain(); const v=p.vol||0.3;
  g.gain.setValueAtTime(0.0001,t);
  g.gain.exponentialRampToValueAtTime(v,t+(p.atk||0.03));
  g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  if(p.am){ const ao=c.createOscillator(), ag=c.createGain();
    ao.frequency.value=p.amF||20; ag.gain.value=v*0.6;
    ao.connect(ag); ag.connect(g.gain); ao.start(t); ao.stop(t+dur); }
  node.connect(g); g.connect(c.destination);
  o.start(t); o.stop(t+dur+0.05);
}
/* nz: nhiễu trắng qua bộ lọc — hơi thở, tiếng gió, tiếng sủa khàn */
function nz(p){
  const c=ac(), t=c.currentTime+(p.delay||0), n=Math.max(1,c.sampleRate*p.dur);
  const buf=c.createBuffer(1,n,c.sampleRate), d=buf.getChannelData(0);
  for(let i=0;i<n;i++) d[i]=Math.random()*2-1;
  const s=c.createBufferSource(); s.buffer=buf;
  const f=c.createBiquadFilter(); f.type=p.ftype||'bandpass';
  f.frequency.value=p.freq||800; f.Q.value=p.q||1;
  const g=c.createGain(); const v=p.vol||0.3;
  g.gain.setValueAtTime(0.0001,t);
  g.gain.exponentialRampToValueAtTime(v,t+(p.atk||0.02));
  g.gain.exponentialRampToValueAtTime(0.0001,t+p.dur);
  if(p.am){ const ao=c.createOscillator(), ag=c.createGain();
    ao.frequency.value=p.amF||20; ag.gain.value=v*0.6;
    ao.connect(ag); ag.connect(g.gain); ao.start(t); ao.stop(t+p.dur); }
  s.connect(f); f.connect(g); g.connect(c.destination);
  s.start(t); s.stop(t+p.dur+0.05);
}
/* tone/noise: giữ cho hiệu ứng giao diện + nhạc nền */
function tone(f0,f1,dur,type,vol,delay,vib,vibF){
  syn({f0:f0,f1:f1,dur:dur,type:type||'sine',vol:vol,delay:delay,vib:vib,vibF:vibF,atk:0.02});
}
function noise(dur,vol,delay,freq){ nz({dur:dur,vol:vol,delay:delay,freq:freq}); }

const sfx = {
  click(){ tone(650,900,0.09,'sine',0.22); },
  correct(){ [523,659,784,1047].forEach((f,i)=>tone(f,f,0.16,'triangle',0.3,i*0.1)); },
  wrong(){ tone(280,180,0.3,'sine',0.25); },
  fanfare(){ [523,659,784,1047,784,1047,1319].forEach((f,i)=>tone(f,f,0.2,'triangle',0.3,i*0.13)); nz({dur:0.7,vol:0.12,delay:0.9,freq:3500}); },
  swipe(){ tone(400,700,0.14,'sine',0.12); }
};

/* ================== TIẾNG KÊU ĐỘNG VẬT (phiên bản chân thật hơn) ================== */
const ANIMAL = {
  dog(){ [0,0.32].forEach(d=>{
    nz({dur:0.07,vol:0.5,delay:d,freq:1100,q:0.8,atk:0.005});
    syn({f0:420,f1:130,dur:0.18,vol:0.5,delay:d,filt:800,filt2:500,q:1.6,atk:0.008}); }); },
  cat(){
    syn({f0:460,f1:900,dur:0.35,vol:0.3,filt:1200,filt2:1600,q:3,vib:18,vibF:6,atk:0.06});
    syn({f0:900,f1:340,dur:0.5,vol:0.28,delay:0.35,filt:1400,filt2:800,q:3,vib:22,vibF:6}); },
  cow(){
    syn({f0:170,f1:105,dur:1.4,vol:0.42,filt:340,filt2:240,q:1.3,vib:9,vibF:3.2,atk:0.15});
    syn({f0:340,f1:210,dur:1.4,vol:0.14,filt:700,q:2,vib:9,vibF:3.2,atk:0.15}); },
  duck(){ [0,0.3,0.6].forEach(d=>{
    syn({f0:310,f1:240,dur:0.17,type:'square',vol:0.22,delay:d,am:1,amF:42,filt:1100,q:2,atk:0.01}); }); },
  chicken(){
    [0,0.16,0.32].forEach(d=>syn({f0:520,f1:390,dur:0.1,vol:0.22,delay:d,filt:1400,q:2,atk:0.01}));
    syn({f0:560,f1:980,dur:0.3,vol:0.3,delay:0.52,filt:1600,q:2,atk:0.02});
    syn({f0:980,f1:480,dur:0.24,vol:0.26,delay:0.82,filt:1400,q:2}); },
  chick(){ [0,0.16,0.32,0.48].forEach(d=>{
    syn({f0:2600,f1:3400,dur:0.07,type:'sine',vol:0.2,delay:d,atk:0.01});
    syn({f0:3400,f1:2700,dur:0.06,type:'sine',vol:0.16,delay:d+0.07}); }); },
  pig(){ [0,0.34].forEach(d=>{
    nz({dur:0.24,vol:0.42,delay:d,freq:380,q:1,am:1,amF:26,atk:0.02});
    syn({f0:150,f1:100,dur:0.24,vol:0.26,delay:d,am:1,amF:26,filt:500,q:1.5}); }); },
  sheep(){
    syn({f0:350,f1:300,dur:0.95,vol:0.32,filt:1000,q:2.5,vib:42,vibF:9,am:1,amF:9,atk:0.05}); },
  horse(){
    syn({f0:1150,f1:400,dur:1.15,vol:0.26,filt:1400,filt2:700,q:2,vib:85,vibF:13,atk:0.04});
    nz({dur:0.45,vol:0.2,delay:1.05,freq:600,q:0.7,am:1,amF:24}); },
  bird(){ [0,0.16,0.34,0.5].forEach((d,i)=>{
    syn({f0:2300+i*180,f1:3300,dur:0.09,type:'sine',vol:0.2,delay:d,atk:0.01});
    syn({f0:3300,f1:2500,dur:0.07,type:'sine',vol:0.16,delay:d+0.09}); }); },
  frog(){ [0,0.42].forEach(d=>{
    syn({f0:115,f1:230,dur:0.28,vol:0.36,delay:d,am:1,amF:24,filt:600,q:1.5,atk:0.02}); }); },
  lion(){
    nz({dur:1.7,vol:0.38,freq:300,q:0.7,am:1,amF:16,atk:0.25});
    syn({f0:115,f1:62,dur:1.7,vol:0.46,vib:11,vibF:4.2,filt:260,q:1.2,atk:0.25}); },
  elephant(){
    syn({f0:290,f1:640,dur:0.5,vol:0.36,filt:1100,filt2:1500,q:2,vib:22,vibF:6,atk:0.06});
    syn({f0:640,f1:330,dur:0.6,vol:0.32,delay:0.5,filt:1400,filt2:900,q:2,vib:26,vibF:6}); },
  bee(){ syn({f0:180,f1:165,dur:1.5,vol:0.24,am:1,amF:23,vib:12,vibF:2.3}); },
  monkey(){ [0,0.2,0.4,0.6,0.8].forEach((d,i)=>{
    syn({f0:i%2?820:460,f1:i%2?1250:820,dur:0.15,type:'square',vol:0.2,delay:d,filt:1400,q:2,atk:0.01}); }); },
  mouse(){ [0,0.14,0.28].forEach(d=>{
    syn({f0:2900,f1:3700,dur:0.07,type:'sine',vol:0.18,delay:d,atk:0.008}); }); },
  wolf(){
    syn({f0:340,f1:720,dur:0.7,type:'sine',vol:0.3,atk:0.12});
    syn({f0:720,f1:270,dur:1.2,type:'sine',vol:0.3,delay:0.7,vib:9,vibF:4.5}); },
  owl(){ [0,0.42].forEach(d=>{
    syn({f0:430,f1:380,dur:0.3,type:'sine',vol:0.32,delay:d,filt:600,q:2,atk:0.05}); }); },
  snake(){ nz({dur:1.2,vol:0.28,freq:4600,q:0.7,atk:0.1}); },
  cricket(){ [0,0.09,0.18,0.35,0.44,0.53].forEach(d=>{
    syn({f0:4200,f1:4200,dur:0.05,type:'square',vol:0.12,delay:d,atk:0.005}); }); },
  dolphin(){ [0,0.12,0.24,0.36].forEach(d=>{
    syn({f0:3000,f1:4600,dur:0.09,type:'sine',vol:0.18,delay:d,atk:0.008}); }); },
  whale(){ syn({f0:210,f1:540,dur:1.7,type:'sine',vol:0.3,vib:7,vibF:1.4,atk:0.3}); }
};
/* âm đồ vật trong khu vui chơi */
const OBJ = {
  guitar(){ [262,330,392,523].forEach((f,i)=>tone(f,f,0.32,'triangle',0.22,i*0.07)); },
  ball(){ tone(180,420,0.14,'sine',0.3); tone(420,170,0.22,'sine',0.24,0.15); },
  flower(){ [1047,1319,1568].forEach((f,i)=>tone(f,f,0.26,'sine',0.15,i*0.09)); },
  house(){ nz({dur:0.06,vol:0.35,freq:300}); nz({dur:0.06,vol:0.35,delay:0.2,freq:300}); },
  butterfly(){ [1568,1760,1568,1976].forEach((f,i)=>tone(f,f,0.08,'sine',0.13,i*0.09)); },
  apple(){ nz({dur:0.12,vol:0.35,freq:1800}); nz({dur:0.1,vol:0.25,delay:0.15,freq:1500}); }
};

/* ================== NHẠC NỀN (sequencer ngũ cung, nhẹ nhàng) ================== */
let musicOn=true, musicTimer=null, mstep=0;
const MELO=[392,440,523,587,659,587,523,440,392,440,523,659,784,659,587,523];
function musicTick(){
  const f=MELO[mstep%MELO.length];
  tone(f,f,0.24,'triangle',0.06);
  if(mstep%4===0) tone(f/2,f/2,0.5,'sine',0.05);
  if(mstep%8===6) tone(f*1.5,f*1.5,0.18,'sine',0.03);
  mstep++;
}
function startMusic(){ if(musicTimer||!musicOn) return; musicTimer=setInterval(musicTick,310); }
function stopMusic(){ if(musicTimer){ clearInterval(musicTimer); musicTimer=null; } }
function toggleMusic(){
  musicOn=!musicOn;
  const b=document.getElementById('musicBtn'); if(b) b.textContent=musicOn?'🎵':'🔇';
  if(musicOn) startMusic(); else stopMusic();
}
