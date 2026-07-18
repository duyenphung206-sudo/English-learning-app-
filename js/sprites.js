'use strict';
/* ============ BỘ NHÂN VẬT SVG TỰ VẼ (phong cách phẳng, tròn trịa cho bé) ============
   Mỗi sprite có bộ phận chuyển động: .blink (nháy mắt), .tail (vẫy đuôi),
   .wing (đập cánh), .earWig (vẫy tai), .sway (đung đưa) — định nghĩa trong style.css */
function _eyes(x1,x2,y,r){
  r=r||4.2;
  return '<g class="blink">'
   +'<circle cx="'+x1+'" cy="'+y+'" r="'+r+'" fill="#33323d"/>'
   +'<circle cx="'+x2+'" cy="'+y+'" r="'+r+'" fill="#33323d"/>'
   +'<circle cx="'+(x1+1.5)+'" cy="'+(y-1.5)+'" r="1.3" fill="#fff"/>'
   +'<circle cx="'+(x2+1.5)+'" cy="'+(y-1.5)+'" r="1.3" fill="#fff"/></g>';
}
function _svg(inner,vb){ return '<svg viewBox="'+(vb||'0 0 100 100')+'" xmlns="http://www.w3.org/2000/svg">'+inner+'</svg>'; }

const SPR = {
dog(){ return _svg(
  '<path class="tail" d="M18 62 Q6 54 10 42 Q13 50 22 55 Z" fill="#c67635"/>'
 +'<rect x="24" y="48" width="52" height="36" rx="18" fill="#e8974f"/>'
 +'<rect x="30" y="76" width="10" height="12" rx="5" fill="#c67635"/>'
 +'<rect x="60" y="76" width="10" height="12" rx="5" fill="#c67635"/>'
 +'<circle cx="50" cy="32" r="24" fill="#e8974f"/>'
 +'<path class="earWig" d="M28 16 Q20 30 28 42 Q36 34 36 22 Q33 15 28 16 Z" fill="#c67635"/>'
 +'<path d="M72 16 Q80 30 72 42 Q64 34 64 22 Q67 15 72 16 Z" fill="#c67635"/>'
 +'<ellipse cx="50" cy="41" rx="13" ry="9.5" fill="#f9dcae"/>'
 +'<ellipse cx="50" cy="36" rx="4.5" ry="3.5" fill="#4a3226"/>'
 +'<path d="M50 39 L50 44 M44 46 Q50 50 56 46" stroke="#4a3226" stroke-width="2.2" fill="none" stroke-linecap="round"/>'
 +_eyes(40,60,28)
 +'<path d="M38 66 Q40 62 44 64" stroke="#c67635" stroke-width="0" fill="none"/>'
 +'<ellipse cx="50" cy="60" rx="9" ry="6" fill="#c8102e"/>'
 +'<circle cx="50" cy="63" r="3.4" fill="#ffd23f"/>'); },
cat(){ return _svg(
  '<path class="tail" d="M20 70 Q2 66 8 50 Q10 60 24 63 Z" fill="#8595a8"/>'
 +'<rect x="26" y="50" width="48" height="34" rx="17" fill="#a7b6c6"/>'
 +'<rect x="32" y="76" width="9" height="11" rx="4.5" fill="#8595a8"/>'
 +'<rect x="59" y="76" width="9" height="11" rx="4.5" fill="#8595a8"/>'
 +'<circle cx="50" cy="34" r="23" fill="#a7b6c6"/>'
 +'<path d="M31 20 L27 4 L42 13 Z" fill="#a7b6c6"/><path d="M32 17 L30 8 L39 13 Z" fill="#f0a8be"/>'
 +'<path d="M69 20 L73 4 L58 13 Z" fill="#a7b6c6"/><path d="M68 17 L70 8 L61 13 Z" fill="#f0a8be"/>'
 +'<ellipse cx="50" cy="42" rx="11" ry="8" fill="#e6edf4"/>'
 +'<path d="M47 37 L53 37 L50 41 Z" fill="#f0629a"/>'
 +'<path d="M50 41 L50 44 M45 46 Q50 49 55 46" stroke="#4a5563" stroke-width="2" fill="none" stroke-linecap="round"/>'
 +'<path d="M28 38 L14 35 M28 42 L15 44 M72 38 L86 35 M72 42 L85 44" stroke="#8595a8" stroke-width="1.6" stroke-linecap="round"/>'
 +_eyes(41,59,30)); },
chicken(){ return _svg(
  '<ellipse cx="50" cy="58" rx="26" ry="24" fill="#fdfdf8"/>'
 +'<path class="wing" d="M28 56 Q16 62 22 72 Q32 72 36 62 Z" fill="#e8e4da"/>'
 +'<circle cx="50" cy="30" r="17" fill="#fdfdf8"/>'
 +'<path d="M42 15 Q43 6 49 12 Q51 4 56 11 Q61 6 61 15 Z" fill="#e0483e"/>'
 +'<path d="M46 32 L38 36 L46 39 Z" fill="#f7941d"/>'
 +'<path d="M43 40 Q46 44 49 40" stroke="#e0483e" stroke-width="3" fill="none" stroke-linecap="round"/>'
 +_eyes(46,58,27,3.6)
 +'<path d="M42 82 L42 90 M38 90 L46 90 M58 82 L58 90 M54 90 L62 90" stroke="#f7941d" stroke-width="3" stroke-linecap="round"/>'); },
duck(){ return _svg(
  '<ellipse cx="50" cy="88" rx="38" ry="9" fill="#6fc9e8"/>'
 +'<path d="M24 62 Q22 84 50 84 Q78 84 76 60 Q70 44 50 46 Q30 44 24 62 Z" fill="#ffd23f"/>'
 +'<path class="wing" d="M32 62 Q22 68 28 76 Q38 76 42 66 Z" fill="#f5b820"/>'
 +'<circle cx="62" cy="36" r="16" fill="#ffd23f"/>'
 +'<path d="M74 36 Q88 34 86 40 Q84 45 72 42 Z" fill="#f7941d"/>'
 +_eyes(58,68,32,3.4)
 +'<path d="M56 20 Q60 14 64 20" stroke="#f5b820" stroke-width="0" fill="none"/>'); },
cow(){ return _svg(
  '<path class="tail" d="M14 60 Q6 68 10 78 Q14 70 20 66 Z" fill="#8a8f98"/>'
 +'<rect x="16" y="46" width="60" height="38" rx="19" fill="#fdfdf8"/>'
 +'<path d="M30 50 Q24 62 34 64 Q42 58 36 50 Z" fill="#33323d"/>'
 +'<path d="M60 70 Q56 80 66 82 Q72 74 68 68 Z" fill="#33323d"/>'
 +'<rect x="24" y="78" width="9" height="11" rx="4.5" fill="#8a8f98"/>'
 +'<rect x="58" y="78" width="9" height="11" rx="4.5" fill="#8a8f98"/>'
 +'<circle cx="66" cy="34" r="21" fill="#fdfdf8"/>'
 +'<path d="M48 22 Q40 18 42 26 Q45 30 50 28 Z" fill="#e6c9a8"/>'
 +'<path d="M84 22 Q92 18 90 26 Q87 30 82 28 Z" fill="#e6c9a8"/>'
 +'<ellipse cx="45" cy="30" rx="7" ry="4.5" fill="#fdfdf8" transform="rotate(-20 45 30)"/>'
 +'<ellipse cx="87" cy="30" rx="7" ry="4.5" fill="#fdfdf8" transform="rotate(20 87 30)"/>'
 +'<ellipse cx="66" cy="44" rx="12" ry="8.5" fill="#f0a8be"/>'
 +'<circle cx="61" cy="43" r="2.2" fill="#c9748f"/><circle cx="71" cy="43" r="2.2" fill="#c9748f"/>'
 +_eyes(58,74,29,3.8)); },
pig(){ return _svg(
  '<path class="tail" d="M20 62 Q10 60 12 54 Q18 52 20 57" stroke="#e58ca8" stroke-width="4" fill="none" stroke-linecap="round"/>'
 +'<ellipse cx="52" cy="58" rx="32" ry="28" fill="#f7a8be"/>'
 +'<path d="M30 34 L24 20 L40 26 Z" fill="#f7a8be"/><path d="M32 31 L29 24 L37 27 Z" fill="#e58ca8"/>'
 +'<path d="M74 34 L80 20 L64 26 Z" fill="#f7a8be"/><path d="M72 31 L75 24 L67 27 Z" fill="#e58ca8"/>'
 +'<rect x="34" y="80" width="10" height="10" rx="5" fill="#e58ca8"/>'
 +'<rect x="60" y="80" width="10" height="10" rx="5" fill="#e58ca8"/>'
 +'<ellipse cx="52" cy="58" rx="12" ry="9" fill="#e58ca8"/>'
 +'<circle cx="47" cy="58" r="2.6" fill="#b55d7c"/><circle cx="57" cy="58" r="2.6" fill="#b55d7c"/>'
 +'<path d="M40 70 Q52 76 64 70" stroke="#b55d7c" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
 +_eyes(40,64,44)); },
rabbit(){ return _svg(
  '<path class="earWig" d="M36 30 Q30 2 42 4 Q48 8 44 30 Z" fill="#efe9f7"/>'
 +'<path d="M40 26 Q37 8 42 8 Q45 10 43 26 Z" fill="#f0a8be"/>'
 +'<path d="M64 30 Q70 2 58 4 Q52 8 56 30 Z" fill="#efe9f7"/>'
 +'<path d="M60 26 Q63 8 58 8 Q55 10 57 26 Z" fill="#f0a8be"/>'
 +'<circle cx="50" cy="44" r="20" fill="#efe9f7"/>'
 +'<ellipse cx="50" cy="74" rx="22" ry="17" fill="#efe9f7"/>'
 +'<ellipse cx="50" cy="78" rx="12" ry="9" fill="#fff"/>'
 +'<path d="M47 48 L53 48 L50 52 Z" fill="#f0629a"/>'
 +'<path d="M50 52 L50 55 M46 57 Q50 60 54 57" stroke="#8b7f9e" stroke-width="2" fill="none" stroke-linecap="round"/>'
 +'<rect x="47" y="55" width="6" height="6" rx="1.5" fill="#fff" stroke="#d8cfe8" stroke-width="1"/>'
 +_eyes(42,58,42,3.6)); },
frog(){ return _svg(
  '<circle cx="34" cy="26" r="11" fill="#6fc24b"/><circle cx="66" cy="26" r="11" fill="#6fc24b"/>'
 +'<g class="blink"><circle cx="34" cy="25" r="5.5" fill="#fff"/><circle cx="35" cy="26" r="3" fill="#33323d"/>'
 +'<circle cx="66" cy="25" r="5.5" fill="#fff"/><circle cx="67" cy="26" r="3" fill="#33323d"/></g>'
 +'<path d="M16 52 Q16 26 50 26 Q84 26 84 52 Q84 76 50 76 Q16 76 16 52 Z" fill="#6fc24b"/>'
 +'<ellipse cx="50" cy="62" rx="20" ry="12" fill="#c9e8a8"/>'
 +'<path d="M32 48 Q50 62 68 48" stroke="#3f7d2e" stroke-width="3" fill="none" stroke-linecap="round"/>'
 +'<circle cx="28" cy="42" r="3.4" fill="#f0a8be" opacity=".7"/><circle cx="72" cy="42" r="3.4" fill="#f0a8be" opacity=".7"/>'
 +'<path d="M30 76 Q24 86 34 86 M70 76 Q76 86 66 86" stroke="#4f9e3f" stroke-width="6" fill="none" stroke-linecap="round"/>'); },
bird(){ return _svg(
  '<path class="tail" d="M22 56 Q8 50 10 62 Q16 66 24 62 Z" fill="#2f86cc"/>'
 +'<ellipse cx="52" cy="52" rx="28" ry="24" fill="#4cc3f0"/>'
 +'<path class="wing" d="M42 50 Q28 58 36 70 Q50 68 52 56 Z" fill="#2f86cc"/>'
 +'<path d="M78 48 L92 52 L78 57 Z" fill="#f7941d"/>'
 +'<ellipse cx="52" cy="62" rx="13" ry="8" fill="#cdeffb"/>'
 +_eyes(56,70,42,3.6)
 +'<path d="M46 76 L46 84 M58 76 L58 84" stroke="#f7941d" stroke-width="3" stroke-linecap="round"/>'
 +'<path d="M40 24 Q44 16 50 24" stroke="#2f86cc" stroke-width="0" fill="none"/>'); },
bee(){ return _svg(
  '<path class="wing" d="M36 26 Q22 6 12 18 Q10 32 34 34 Z" fill="#dff2fb" opacity=".9"/>'
 +'<path class="wing" style="animation-delay:.1s" d="M60 26 Q74 6 84 18 Q86 32 62 34 Z" fill="#dff2fb" opacity=".9"/>'
 +'<ellipse cx="48" cy="55" rx="30" ry="24" fill="#ffd23f"/>'
 +'<path d="M32 33 Q28 55 32 76 L44 78 L44 32 Z" fill="#33323d" opacity="0"/>'
 +'<path d="M38 32 L38 78 M54 34 L54 78" stroke="#33323d" stroke-width="9" stroke-linecap="round"/>'
 +'<path d="M78 55 L92 55" stroke="#33323d" stroke-width="5" stroke-linecap="round"/>'
 +'<path d="M24 30 Q20 20 12 22 M32 26 Q30 16 24 14" stroke="#33323d" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
 +'<circle cx="12" cy="22" r="2.8" fill="#33323d"/><circle cx="24" cy="14" r="2.8" fill="#33323d"/>'
 +_eyes(26,40,50,3.4)
 +'<path d="M26 62 Q33 67 40 62" stroke="#33323d" stroke-width="2.2" fill="none" stroke-linecap="round"/>'); },
butterfly(){ return _svg(
  '<g class="wing"><path d="M46 50 Q18 16 10 36 Q6 52 44 56 Z" fill="#b07de0"/>'
 +'<path d="M46 56 Q14 58 18 76 Q26 88 46 62 Z" fill="#f086b8"/>'
 +'<circle cx="26" cy="40" r="5" fill="#ffd23f"/><circle cx="28" cy="68" r="4" fill="#fff" opacity=".7"/></g>'
 +'<g class="wing" style="animation-delay:.12s"><path d="M54 50 Q82 16 90 36 Q94 52 56 56 Z" fill="#b07de0"/>'
 +'<path d="M54 56 Q86 58 82 76 Q74 88 54 62 Z" fill="#f086b8"/>'
 +'<circle cx="74" cy="40" r="5" fill="#ffd23f"/><circle cx="72" cy="68" r="4" fill="#fff" opacity=".7"/></g>'
 +'<ellipse cx="50" cy="56" rx="6" ry="20" fill="#33323d"/>'
 +'<circle cx="50" cy="34" r="7" fill="#33323d"/>'
 +'<path d="M46 28 Q42 18 36 18 M54 28 Q58 18 64 18" stroke="#33323d" stroke-width="2.2" fill="none" stroke-linecap="round"/>'); },
tree(){ return _svg(
  '<rect x="44" y="58" width="12" height="34" rx="5" fill="#8a5a35"/>'
 +'<g class="sway"><circle cx="50" cy="34" r="28" fill="#4f9e3f"/>'
 +'<circle cx="28" cy="44" r="17" fill="#5cad4a"/><circle cx="72" cy="44" r="17" fill="#5cad4a"/>'
 +'<circle cx="38" cy="28" r="5" fill="#e0483e"/><circle cx="62" cy="36" r="5" fill="#e0483e"/>'
 +'<circle cx="50" cy="48" r="5" fill="#e0483e"/></g>'); },
flower(){ return _svg(
  '<g class="sway"><rect x="47" y="48" width="6" height="44" rx="3" fill="#4f9e3f"/>'
 +'<path d="M50 66 Q34 60 32 50 Q46 52 50 60 Z" fill="#5cad4a"/>'
 +'<ellipse cx="50" cy="16" rx="9" ry="12" fill="#f0629a"/>'
 +'<ellipse cx="35" cy="26" rx="9" ry="12" fill="#f0629a" transform="rotate(-65 35 26)"/>'
 +'<ellipse cx="65" cy="26" rx="9" ry="12" fill="#f0629a" transform="rotate(65 65 26)"/>'
 +'<ellipse cx="40" cy="42" rx="9" ry="12" fill="#f0629a" transform="rotate(-130 40 42)"/>'
 +'<ellipse cx="60" cy="42" rx="9" ry="12" fill="#f0629a" transform="rotate(130 60 42)"/>'
 +'<circle cx="50" cy="30" r="9" fill="#ffd23f"/></g>'); },
apple(){ return _svg(
  '<circle cx="42" cy="58" r="26" fill="#e0483e"/><circle cx="60" cy="58" r="26" fill="#e0483e"/>'
 +'<ellipse cx="40" cy="48" rx="7" ry="10" fill="#fff" opacity=".25" transform="rotate(-20 40 48)"/>'
 +'<path d="M51 34 Q49 22 54 16" stroke="#8a5a35" stroke-width="4" fill="none" stroke-linecap="round"/>'
 +'<path d="M54 24 Q68 14 72 26 Q60 32 54 24 Z" fill="#5cad4a"/>'); },
guitar(){ return _svg(
  '<rect x="46" y="4" width="8" height="40" rx="3" fill="#8a5a35"/>'
 +'<rect x="43" y="4" width="14" height="8" rx="3" fill="#5c3a20"/>'
 +'<circle cx="50" cy="58" r="17" fill="#e8974f"/><circle cx="50" cy="76" r="21" fill="#e8974f"/>'
 +'<circle cx="50" cy="66" r="8" fill="#5c3a20"/>'
 +'<path d="M47 12 L47 84 M53 12 L53 84" stroke="#fdf6e3" stroke-width="1.4"/>'
 +'<rect x="42" y="84" width="16" height="4" rx="2" fill="#5c3a20"/>'); },
ball(){ return _svg(
  '<circle cx="50" cy="50" r="34" fill="#fdfdf8" stroke="#d8dee6" stroke-width="2"/>'
 +'<path d="M50 38 L61 46 L57 59 L43 59 L39 46 Z" fill="#33323d"/>'
 +'<path d="M50 16 L50 38 M61 46 L80 40 M57 59 L66 76 M43 59 L34 76 M39 46 L20 40" stroke="#33323d" stroke-width="2.4"/>'
 +'<ellipse cx="38" cy="32" rx="8" ry="5" fill="#fff" opacity=".7" transform="rotate(-30 38 32)"/>'); },
house(){ return _svg(
  '<rect x="20" y="44" width="60" height="44" rx="6" fill="#fdf1dc"/>'
 +'<path d="M12 48 Q50 8 88 48 L80 48 Q50 20 20 48 Z" fill="#e0483e"/>'
 +'<path d="M16 46 Q50 12 84 46 L76 46 Q50 22 24 46 Z" fill="#e0483e"/>'
 +'<rect x="64" y="18" width="9" height="16" rx="3" fill="#c9302b"/>'
 +'<rect x="42" y="60" width="16" height="28" rx="8" fill="#3b9ee8"/>'
 +'<circle cx="54" cy="74" r="1.8" fill="#ffd23f"/>'
 +'<rect x="26" y="54" width="12" height="12" rx="4" fill="#9fdcf5" stroke="#e8d8ba" stroke-width="2"/>'
 +'<rect x="62" y="54" width="12" height="12" rx="4" fill="#9fdcf5" stroke="#e8d8ba" stroke-width="2"/>'
 +'<circle cx="50" cy="36" r="5" fill="#9fdcf5" stroke="#c9302b" stroke-width="2"/>'); }
};
/* nhân vật quái vật dẫn chuyện (giữ từ bản trước, có tay + má hồng + nháy mắt) */
function monsterSVG(c1,c2,extra){
  return '<svg class="monster '+(extra||'')+'" viewBox="0 0 120 132" xmlns="http://www.w3.org/2000/svg">'
  +'<path d="M40 24 Q34 4 18 8 Q32 14 42 32 Z" fill="'+c2+'"/>'
  +'<path d="M80 24 Q86 4 102 8 Q88 14 78 32 Z" fill="'+c2+'"/>'
  +'<path d="M16 86 Q2 78 7 62" stroke="'+c1+'" stroke-width="9" fill="none" stroke-linecap="round"/>'
  +'<path d="M104 86 Q118 78 113 62" stroke="'+c1+'" stroke-width="9" fill="none" stroke-linecap="round"/>'
  +'<path d="M60 12 C94 12 108 40 108 72 C108 104 90 124 60 124 C30 124 12 104 12 72 C12 40 26 12 60 12 Z" fill="'+c1+'"/>'
  +'<ellipse cx="60" cy="94" rx="27" ry="19" fill="rgba(255,255,255,.35)"/>'
  +'<g class="eyes">'
  +'<circle cx="43" cy="52" r="13.5" fill="#fff"/><circle cx="45.5" cy="54" r="6" fill="#33323d"/>'
  +'<circle cx="77" cy="52" r="13.5" fill="#fff"/><circle cx="79.5" cy="54" r="6" fill="#33323d"/>'
  +'<circle cx="47.5" cy="52" r="2" fill="#fff"/><circle cx="81.5" cy="52" r="2" fill="#fff"/>'
  +'</g>'
  +'<ellipse cx="33" cy="67" rx="6.5" ry="4" fill="rgba(240,98,154,.4)"/>'
  +'<ellipse cx="87" cy="67" rx="6.5" ry="4" fill="rgba(240,98,154,.4)"/>'
  +'<path class="m-happy" d="M44 76 Q60 91 76 76" stroke="#33323d" stroke-width="4.5" fill="none" stroke-linecap="round"/>'
  +'<path class="m-open" d="M45 73 Q60 100 75 73 Q60 81 45 73 Z" fill="#8a4040"/>'
  +'<path class="m-sad" d="M46 86 Q60 74 74 86" stroke="#33323d" stroke-width="4.5" fill="none" stroke-linecap="round"/>'
  +'<ellipse cx="41" cy="125" rx="13" ry="6" fill="'+c2+'"/>'
  +'<ellipse cx="79" cy="125" rx="13" ry="6" fill="'+c2+'"/>'
  +'</svg>';
}
const M_COLORS=[['#f7941d','#c26a0a'],['#9b59d0','#6e35a0'],['#3b9ee8','#1f6cb0'],['#f0629a','#bb3a6e'],['#8cc63f','#55831f']];
