# 🐰 Thỏ Bông – Ứng dụng học tiếng Anh cho bé 3–5 tuổi

Đồ án môn **Công nghệ phần mềm cho Trí tuệ nhân tạo**.

Ứng dụng web giúp bé 3–5 tuổi học tiếng Anh qua **video hoạt hình**, **thẻ từ vựng có phát âm**, **trò chuyện bằng giọng nói với bạn Thỏ AI (song ngữ Việt–Anh)** và **trò chơi đố vui**.

## ✨ Tính năng chính
- 📺 **Xem hoạt hình** – video bài hát thiếu nhi (CoComelon, animals, colors, numbers…).
- 🃏 **Học từ vựng từ video** – sau khi xem, bé học các từ/cụm từ rút ra từ video, có hình minh hoạ và phát âm tự động.
- 🐰 **Nói chuyện với Thỏ Bông** – bé bấm micro và **nói**, Thỏ **trả lời bằng giọng nói** song ngữ Việt–Anh (không cần gõ chữ).
- 🎮 **Đố vui** – nghe từ tiếng Anh rồi chọn đúng hình.

## 🛠️ Công nghệ
- HTML, CSS, JavaScript thuần (không cần cài đặt phức tạp).
- **Web Speech API** của trình duyệt: `speechSynthesis` (đọc) và `SpeechRecognition` (nghe) – **miễn phí**.
- Video nhúng từ YouTube.

## ▶️ Cách chạy
1. Tải toàn bộ thư mục này về máy.
2. Mở file `index.html` bằng **Google Chrome** (Chrome hỗ trợ nghe giọng nói tốt nhất).
3. Cho phép quyền **micro** khi trình duyệt hỏi để dùng tính năng trò chuyện.

> Mẹo: Tính năng nghe giọng nói chỉ hoạt động khi mở bằng `http://` hoặc `https://`.
> Khi đã đẩy lên **GitHub Pages** (xem hướng dẫn kèm theo), app chạy đầy đủ trên link `https://...`.

## 📁 Cấu trúc thư mục
```
bunny-english/
├── index.html   # Giao diện các màn hình
├── style.css    # Màu sắc, bố cục
├── app.js       # Xử lý logic (chuyển màn, đọc, nghe, đố vui)
├── data.js      # Dữ liệu: video, từ vựng, kịch bản Thỏ (dễ sửa)
└── README.md    # Giới thiệu (file này)
```

## 🚀 Hướng phát triển nâng cao
- Kết nối **AI thật** (Claude / GPT) để Thỏ trò chuyện tự nhiên thay cho kịch bản mẫu.
- Thêm hệ thống **tài khoản phụ huynh** theo dõi tiến độ của bé.
- Thêm **huy hiệu / phần thưởng** để tạo động lực.

---
Made with ❤️ for kids.
