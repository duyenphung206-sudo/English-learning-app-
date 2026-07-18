# 🏗️ Kiến trúc & Kế hoạch hiện thực

## 1. Quyết định kiến trúc

**Web tĩnh thuần (HTML/CSS/JS), không framework, không asset ngoài.** Từ phiên bản 4, mã nguồn tách thành các module: `index.html` (khung màn hình), `css/style.css` (giao diện + hoạt ảnh), `js/data.js` (408 từ vựng), `js/sprites.js` (nhân vật SVG vẽ tay), `js/audio.js` (bộ máy âm thanh), `js/app.js` (luồng logic). Lý do:

- Đối tượng dùng là phụ huynh không rành kỹ thuật: nhấp đúp là chạy, không cần cài Node/server
- Triển khai GitHub Pages tức thì, không cần bước build
- Không phụ thuộc file hình/âm thanh ⇒ không lo vỡ đường dẫn, tải nhanh, chạy offline
- Đồ họa: SVG tự vẽ (nhân vật, sân chơi) + emoji hệ thống (từ vựng) — nhẹ và tránh vấn đề bản quyền hình ảnh

## 2. Sơ đồ module

```
index.html                    — khung 6 màn hình + cảnh nền + cảnh báo giọng đọc
css/style.css                 — giao diện, chuyển cảnh, hoạt ảnh sprite (blink/tail/wing/sway)
js/data.js                    — RAW → TOPICS (408 từ, 4 chủ đề) + PLAY_ITEMS (17 vật thể)
js/sprites.js                 — SPR{dog,cat,...} 17 sprite SVG vẽ tay + monsterSVG() linh vật
js/audio.js                   — syn()/nz() (formant + vibrato + AM), sfx{}, ANIMAL{} 22 tiếng kêu,
                                OBJ{} âm đồ vật, nhạc nền MELO/musicTick()
js/app.js
    ├── TTS                   — loadVoices(), pickVI/pickEN(), speak(), checkViVoice()
    ├── Storage               — P{days,words,set}, save(), learnWord(), addStar()
    ├── Screens               — showScreen(), goHome()
    ├── Learn                 — openTopic(), renderCard() (bộ đếm x/100), moveCard()
    ├── Find Game             — startQuiz() 20 câu, showQuestion(), pickFind(), endQuiz()
    ├── Playground            — buildPlay() (sprite), tapItem(), sparkle(), updatePlayCount()
    └── Parent Dashboard      — gate, renderParent(), renderChart(), cài đặt giọng
```

## 3. Luồng người dùng

```
Chạm bắt đầu ──▶ Trang chủ ──┬──▶ Khu vui chơi (chạm vật ▶ âm thanh + từ)
                             ├──▶ Chủ đề ▶ Thẻ học ▶ Trò chơi đố ▶ Khen thưởng ─┐
                             │        ▲                                          │
                             │        └──────────── Học tiếp / Chơi lại ◀────────┘
                             └──▶ Khóa toán ▶ Trang Ba Mẹ (biểu đồ, cài giọng)
```

## 4. Chi tiết hiện thực đáng chú ý

### 4.1 Chuyển cảnh mượt
Tất cả màn hình là các `div.screen` chồng lên nhau; màn hình hoạt động mang lớp `.active`. CSS transition trên `opacity` và `transform: translateX + scale` với bezier `(.22,1,.36,1)` tạo cảm giác "bật vào" mềm mại. Thẻ từ vựng dùng kỹ thuật hai bước: bay ra một phía, đổi nội dung, rồi bay vào từ phía kia (double requestAnimationFrame để reset transition).

### 4.2 Âm thanh tổng hợp
Hai hàm nguyên thủy: `tone(f0,f1,dur,type,vol,delay,vib,vibF)` — oscillator có lướt tần số và rung (vibrato bằng LFO), và `noise(dur,vol,delay,freq)` — buffer nhiễu trắng qua lọc bandpass. Mỗi tiếng kêu động vật là một "công thức" phối hai hàm này, ví dụ tiếng chó = 2 nhịp sawtooth 340→140Hz + nhiễu 900Hz; tiếng mèo = sine lượn 420→850→320Hz có vibrato.

### 4.3 Nhạc nền
Giai điệu 16 nốt quãng trưởng (Sol-La-Đô-Rê-Mi...) phát bằng `setInterval` 310ms: nốt chính triangle âm lượng 0.06, thêm bass (nốt/2) mỗi 4 nhịp và láy (nốt×1.5) mỗi 8 nhịp. Âm lượng cố ý rất nhỏ để không át giọng đọc. Chỉ chạy trong khu vui chơi, tự tắt khi rời màn.

### 4.4 Giọng đọc trẻ em
Web Speech API không có sẵn giọng trẻ em tiếng Việt, nên giải pháp là: (1) ưu tiên giọng tự nhiên nhất (HoaiMy trên Edge → Google trên Chrome), (2) nâng `pitch` mặc định 1.35 cho non trẻ hơn, (3) cho phụ huynh tự chọn giọng + chỉnh pitch trong trang Ba Mẹ, lưu vào localStorage. Hạn chế này ghi rõ trong kế hoạch rủi ro; bản nâng cấp tương lai có thể dùng file thu âm hoặc dịch vụ TTS thương mại.

### 4.5 Khu vui chơi
Nền là một `<svg>` viewBox 1000×640 (trời, mặt trời có mặt cười, đồi, hồ, cây táo, cờ dây). Vật thể là các `<button.pItem>` định vị theo % nên tự co giãn theo màn hình. Chạm vào: animation `ptap` (nhảy + xoay), 6 hạt pháo sáng bay theo hướng ngẫu nhiên qua CSS custom property `--dx/--dy`, chuỗi âm thanh: hiệu ứng riêng → phát âm EN → nghĩa VI (chờ bằng callback `onend` của SpeechSynthesis).

### 4.6 Thống kê tuần/tháng/năm
Mỗi ngày là một bản ghi `{stars, words, correct, total, sec}` với khóa `YYYY-MM-DD`. Biểu đồ cột dựng bằng div thuần: Tuần = 7 ngày gần nhất; Tháng = 4 cửa sổ 7 ngày; Năm = cộng dồn theo 12 tháng của năm hiện tại. Chiều cao cột chuẩn hóa theo giá trị lớn nhất.

## 5. Khả năng mở rộng

| Hướng | Cách làm |
|---|---|
| Thêm chủ đề | Thêm 1 khóa vào `TOPICS` — mọi màn hình tự sinh theo dữ liệu |
| Thêm vật vào sân chơi | Thêm phần tử vào `PLAY_ITEMS` với tọa độ %, gắn `snd` hoặc `obj` |
| Thêm tiếng kêu mới | Viết công thức mới trong `ANIMAL{}` từ tone()/noise() |
| Nhiều bé một máy | Thêm lớp chọn hồ sơ, đổi KEY localStorage theo tên bé |
| Giọng thu âm sẵn | Thay speak() bằng phát file .mp3 theo từ (cần thêm assets) |
