/* ============================================================
   app.js  —  Bộ não điều khiển toàn bộ app.
   Đọc kèm phần chú thích (dòng bắt đầu bằng //) để hiểu.
   ============================================================ */

/* ---------- 1) CHUYỂN MÀN HÌNH ---------- */
function go(name) {
  // Tắt mọi màn hình, chỉ bật màn hình được chọn
  if (window.speechSynthesis) window.speechSynthesis.cancel();

  // Tắt mọi màn hình, chỉ bật màn hình được chọn
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
  window.scrollTo(0, 0);

  if (name === 'videos') renderVideos();
  if (name === 'vocab') startVocab(ALL_WORDS);   // mở từ vựng: học tất cả
  if (name === 'chat') openChat();
  if (name === 'quiz') newQuiz();
}

/* Gom tất cả từ trong từ điển thành 1 danh sách để học chung */
const ALL_WORDS = Object.keys(DICTIONARY);

/* ---------- 2) ĐỌC TIẾNG (Text-To-Speech) ---------- */
/* Trình duyệt có sẵn giọng đọc miễn phí. lang='en' đọc giọng Anh,
   lang='vi' đọc giọng Việt.                                    */
function speakText(text, lang) {
  if (!('speechSynthesis' in window)) { return; }
  // XÓA DÒNG cancel() Ở ĐÂY để cho phép xếp hàng âm thanh
  const u = new SpeechSynthesisUtterance(text);
  u.lang = (lang === 'vi') ? 'vi-VN' : 'en-US';
  u.rate = 0.9;
  u.pitch = 1.15;
  window.speechSynthesis.speak(u);
}

/* ---------- 3) MÀN HÌNH VIDEO ---------- */
function renderVideos() {
  const box = document.getElementById('video-list');
  box.innerHTML = '';
  VIDEOS.forEach(v => {
    const card = document.createElement('button');
    card.className = 'video-card';
    card.innerHTML =
      `<div class="vemoji">${v.thumbEmoji}</div>
       <div class="vtitle">${v.title}</div>
       <div class="vtitle-en">${v.titleEn}</div>`;
    card.onclick = () => playVideo(v.id);
    box.appendChild(card);
  });
}

let currentVideo = null;
function playVideo(id) {
  currentVideo = VIDEOS.find(v => v.id === id);
  document.getElementById('player-title').innerText = currentVideo.title;
  // Nhúng video YouTube
  document.getElementById('player-frame').innerHTML =
    `<div class="player-wrap"><iframe
        src="https://www.youtube.com/embed/${currentVideo.youtubeId}?rel=0"
        title="${currentVideo.title}"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe></div>`;
  go('player');
}

/* Khi bấm "Xem xong - học từ vựng": lấy đúng các từ của video đó */
function startLessonFromVideo() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  startVocab(currentVideo.words, 'Từ vựng từ video: ' + currentVideo.title);
}

/* ---------- 4) THẺ TỪ VỰNG (FLASHCARD) ---------- */
let deck = [];        // bộ thẻ đang học
let cardIndex = 0;

function startVocab(words, heading) {
  deck = words.slice();
  cardIndex = 0;
  document.getElementById('vocab-heading').innerText = heading || '🃏 Thẻ từ vựng';
  showCard();
  go('vocab');
}

function showCard() {
  const w = deck[cardIndex];
  const d = DICTIONARY[w];
  document.getElementById('fc-emoji').innerText = d.emoji;
  document.getElementById('fc-word').innerText = w;
  document.getElementById('fc-vi').innerText = d.vi;
  document.getElementById('fc-phrase').innerText = d.phrase;
  document.getElementById('vocab-count').innerText =
    `Thẻ ${cardIndex + 1} / ${deck.length}`;
  speakCurrentWord();           // tự đọc khi mở thẻ mới
}

function speakCurrentWord() {
  // Thêm lệnh cancel() ở đây để ngắt âm thanh của thẻ cũ khi chuyển sang thẻ mới
  if (window.speechSynthesis) window.speechSynthesis.cancel();

  const w = deck[cardIndex];

  // Trình duyệt sẽ tự động xếp hàng: Đọc xong từ tiếng Anh...
  speakText(w, 'en');
  // ...sẽ tự động đọc tiếp câu ví dụ ngay sau đó (không cần setTimeout)
  speakText(DICTIONARY[w].phrase, 'en');
}

function nextCard() { cardIndex = (cardIndex + 1) % deck.length; showCard(); }
function prevCard() { cardIndex = (cardIndex - 1 + deck.length) % deck.length; showCard(); }

/* ---------- 5) TRÒ CHUYỆN VỚI THỎ (giọng nói) ---------- */
let recognition = null;     // bộ nhận diện giọng nói
let listening = false;

function openChat() {
  const log = document.getElementById('chat-log');
  log.innerHTML = '';
  bunnySay(BUNNY_BRAIN.opening);     // Thỏ chào trước
  // Kiểm tra trình duyệt có nghe được giọng nói không
  const note = document.getElementById('chat-note');
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    note.innerText = '⚠️ Trình duyệt này chưa hỗ trợ nghe giọng nói. Hãy dùng Google Chrome nhé!';
  } else {
    note.innerText = 'Mẹo: dùng Chrome và cho phép micro khi được hỏi.';
  }
}

/* Thỏ "nói": hiện bong bóng chat + đọc thành tiếng + nhún nhảy */
function bunnySay(text) {
  addBubble(text, 'bunny');
  const bunny = document.getElementById('big-bunny');
  bunny.classList.add('talking');

  // Dừng câu đang nói dở (nếu có) trước khi Thỏ nói câu mới
  if (window.speechSynthesis) window.speechSynthesis.cancel();

  // SỬA 'en' THÀNH 'vi' ĐỂ ĐỌC ĐƯỢC TIẾNG VIỆT
  speakText(text, 'vi');

  const ms = Math.min(7000, 1200 + text.length * 55);
  setTimeout(() => bunny.classList.remove('talking'), ms);
}

function addBubble(text, who) {
  const log = document.getElementById('chat-log');
  const b = document.createElement('div');
  b.className = 'bubble ' + who;
  b.innerText = (who === 'bunny' ? '🐰 ' : '🧒 ') + text;
  log.appendChild(b);
  log.scrollTop = log.scrollHeight;
}

/* Bật/tắt micro */
function toggleMic() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    bunnySay("Trình duyệt này chưa nghe được. Bé hãy mở bằng Google Chrome nhé!");
    return;
  }
  if (listening) { stopChat(); return; }

  recognition = new SR();
  recognition.lang = 'en-US';               // ưu tiên nghe tiếng Anh
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    listening = true;
    document.getElementById('mic-btn').classList.add('listening');
    document.getElementById('mic-hint').innerText = '🎙️ Thỏ đang nghe... bé nói đi!';
  };
  recognition.onresult = (e) => {
    const said = e.results[0][0].transcript;   // câu bé vừa nói
    addBubble(said, 'child');
    const reply = bunnyThink(said);            // Thỏ nghĩ câu trả lời
    setTimeout(() => bunnySay(reply), 500);
  };
  recognition.onerror = () => {
    document.getElementById('mic-hint').innerText = 'Thỏ chưa nghe rõ, bé thử lại nhé!';
  };
  recognition.onend = () => {
    listening = false;
    document.getElementById('mic-btn').classList.remove('listening');
    document.getElementById('mic-hint').innerText = 'Nhấn nút micro rồi nói nhé!';
  };
  recognition.start();
}

function stopChat() {
  if (recognition) { recognition.stop(); }
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  listening = false;
  const mic = document.getElementById('mic-btn');
  if (mic) mic.classList.remove('listening');
}

/* "Bộ não" của Thỏ: tìm từ khoá trong câu bé nói để chọn câu trả lời */
function bunnyThink(text) {
  const low = text.toLowerCase();
  for (const rule of BUNNY_BRAIN.rules) {
    if (rule.keywords.some(k => low.includes(k))) {
      return rule.reply;
    }
  }
  // Không trúng từ khoá nào -> chọn ngẫu nhiên 1 câu mặc định
  const d = BUNNY_BRAIN.default;
  return d[Math.floor(Math.random() * d.length)];
}

/* ---------- 6) ĐỐ VUI (nghe từ, chọn đúng hình) ---------- */
let quizScore = 0, quizTotal = 0, quizAnswer = '';

function newQuiz() {
  document.getElementById('quiz-result').innerText = '';
  // Chọn ngẫu nhiên 1 từ làm đáp án
  quizAnswer = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
  document.getElementById('quiz-word').innerText = quizAnswer;

  // Tạo 4 lựa chọn: 1 đúng + 3 sai
  const options = [quizAnswer];
  while (options.length < 4) {
    const r = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
    if (!options.includes(r)) options.push(r);
  }
  shuffle(options);

  const box = document.getElementById('quiz-options');
  box.innerHTML = '';
  options.forEach(w => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.innerText = DICTIONARY[w].emoji;
    btn.onclick = () => checkQuiz(btn, w);
    box.appendChild(btn);
  });
  // Đọc to từ cần tìm cho bé nghe
  setTimeout(() => speakText(quizAnswer, 'en'), 300);
}

function checkQuiz(btn, word) {
  quizTotal++;
  const res = document.getElementById('quiz-result');
  if (word === quizAnswer) {
    btn.classList.add('correct');
    quizScore++;
    res.innerText = '🎉 Giỏi quá! Đúng rồi!';
    speakText('Great job!', 'en');
    setTimeout(newQuiz, 1500);
  } else {
    btn.classList.add('wrong');
    res.innerText = '💪 Gần đúng rồi, thử lại nhé!';
    speakText('Try again!', 'en');
  }
  document.getElementById('quiz-score').innerText =
    `Điểm: ${quizScore} / ${quizTotal}`;
}

/* Hàm phụ: xáo trộn 1 mảng */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/* Khi rời màn hình bằng cách khác, vẫn dừng giọng đọc */
window.addEventListener('beforeunload', stopChat);
