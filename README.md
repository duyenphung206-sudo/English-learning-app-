# 👾 Bé Học Tiếng Anh — Web học tiếng Anh cho trẻ 3-5 tuổi

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Web Audio API](https://img.shields.io/badge/Web%20Audio%20API-brightgreen)
![Web Speech API](https://img.shields.io/badge/Web%20Speech%20API-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

Ứng dụng web học tiếng Anh cho trẻ em Việt Nam 3-5 tuổi, lấy cảm hứng từ đồ họa AdaptedMind và lối chơi khám phá của Sago Mini World. Chạy tĩnh hoàn toàn — không server, không file hình/âm thanh bên ngoài: **nhân vật vẽ bằng SVG, âm thanh tổng hợp bằng code**.

## 🎯 Demo

Sau khi bật GitHub Pages: `https://<tên-tài-khoản>.github.io/<tên-repo>/`

## ✨ Tính năng

### Dành cho bé
- **408 từ vựng** trong 4 chủ đề lớn (100+ từ mỗi chủ đề): 🐶 Động vật (100), 🍎 Đồ ăn & Trái cây (100), 🚗 Đồ vật & Xe cộ (104), 🌈 Thiên nhiên & Bé (104 — gồm màu sắc, hình khối, cơ thể, cảm xúc, số đếm 1-20)
- **🏡 Khu vui chơi kiểu Sago Mini**: 17 nhân vật/vật thể **vẽ tay bằng SVG** — chó, mèo, gà, vịt, bò, heo, thỏ, ếch, chim, ong, bướm, cây táo, hoa, nhà... Tất cả **chuyển động**: nháy mắt, vẫy đuôi, đập cánh, ong và bướm bay lượn quanh cảnh. Chạm vào → nhảy lên + pháo sáng + tiếng kêu + phát âm tiếng Anh + nghĩa tiếng Việt. Nhạc nền nhẹ nhàng tạo bằng code
- **🎮 Trò chơi "Tìm trong cảnh"** (20 câu/lượt): khung cảnh chứa 9 vật thể của chủ đề, giọng đọc hỏi *"Where is the pig?"* (kèm tiếng Việt *"Đâu là con heo?"*), bé quan sát và bấm đúng vật trong cảnh → thưởng sao, pháo sáng, linh vật reo mừng
- **Thẻ học từ** với phát âm Anh/Việt và **tiếng kêu của 20+ loài** được tổng hợp bằng bộ máy âm thanh riêng (dao động + bộ lọc "cổ họng" formant + rung thanh quản) cho âm thanh chân thật hơn: chó, mèo, bò, vịt, gà trống, gà con, heo, cừu, ngựa, chim, ếch, sư tử, voi, ong, khỉ, chuột, sói hú, cú, rắn, dế, cá heo, cá voi
- Âm thanh phản hồi mọi thao tác, chuyển cảnh mượt, linh vật quái vật biểu cảm theo kết quả

### Dành cho ba mẹ (khóa phép toán)
- **Tài khoản (Firebase)**: đăng ký/đăng nhập bằng email, kèm tên bé; **tiến độ học tự động đồng bộ lên đám mây (Firestore)** — đổi máy vẫn giữ sao, từ đã học; có nút quên mật khẩu; vẫn cho phép "Chơi ngay, không cần tài khoản" (khi đó tiến độ chỉ lưu trên máy)
- Biểu đồ **tuần / tháng / năm**: sao, từ mới, phút học; chuỗi ngày học; tỉ lệ đúng; tiến độ từng chủ đề
- **Cài đặt giọng đọc tiếng Việt**: chọn giọng, chỉnh độ cao (giọng trẻ em), nghe thử
- Tự cảnh báo khi trình duyệt thiếu giọng tiếng Việt (nguyên nhân giọng "lơ lớ")

## 🔊 Giọng đọc tiếng Việt bản xứ (quan trọng!)

Web hỗ trợ 2 chế độ giọng tiếng Việt:

1. **Giọng bản xứ đóng gói sẵn (khuyến nghị)** — chạy `tools/TAO_GIONG_VIET.bat` **một lần duy nhất** trên máy có Python và mạng. Công cụ sẽ tạo toàn bộ 830 câu đọc (409 từ + 409 câu hỏi + lời thoại) bằng **giọng nữ Việt Nam Hoài My (neural, bản xứ)**, nâng cao độ +25Hz cho non trẻ như giọng bé, gộp thành 2 file `audio/vi.mp3` + `audio/vi.json` (~10 MB). Có 2 file này, web phát giọng Việt chuẩn **trên mọi trình duyệt, mọi thiết bị**, kể cả offline.
2. **Giọng trình duyệt (dự phòng)** — nếu chưa có thư mục `audio/`, web dùng Web Speech API. Chất lượng phụ thuộc máy: nếu trình duyệt thiếu giọng vi-VN sẽ đọc lơ lớ và web hiện cảnh báo.

Cách tạo giọng (làm 1 lần): cài Python từ [python.org/downloads](https://www.python.org/downloads/) (khi cài **tích ô "Add python.exe to PATH"**) → nhấp đúp `tools/TAO_GIONG_VIET.bat` → chờ 5-10 phút → mở lại `index.html` để nghe. Nhớ tải cả thư mục `audio/` lên GitHub.

## 🚀 Cách chạy

**Trên máy:** tải toàn bộ thư mục, nhấp đúp `index.html` (khuyến nghị Edge). **GitHub Pages:** đẩy code lên repo → Settings → Pages → Branch `main` → Save.

## 📁 Cấu trúc thư mục

```
├── index.html               # Khung giao diện các màn hình
├── css/
│   └── style.css            # Toàn bộ giao diện + hoạt ảnh (nháy mắt, vẫy đuôi...)
├── js/
│   ├── data.js              # 408 từ vựng (4 chủ đề) + vật thể khu vui chơi
│   ├── sprites.js           # Bộ nhân vật SVG vẽ tay (17 sprite + linh vật)
│   ├── audio.js             # Bộ máy âm thanh: tiếng kêu, hiệu ứng, nhạc nền
│   └── app.js               # Luồng màn hình, trò chơi, thống kê, giọng đọc
├── auth.js                  # Đăng nhập Firebase + lưu tiến độ Firestore (ES module)
├── firebase-config.js       # Cấu hình Firebase của dự án
├── audio/                   # (tạo bằng tools/) vi.mp3 + vi.json — giọng Việt bản xứ
├── tools/
│   ├── TAO_GIONG_VIET.bat   # Nhấp đúp để tạo giọng Việt bản xứ (1 lần)
│   ├── generate_audio.py    # Script tạo giọng (edge-tts, giọng Hoài My)
│   └── words.json           # Danh sách 409 từ + lời thoại cần đọc
├── docs/                    # Tài liệu chi tiết
├── README.md
├── KE_HOACH_TRIEN_KHAI.md
└── .gitignore
```

## 🛠️ Công nghệ

| Thành phần | Công nghệ | Ghi chú |
|---|---|---|
| Giao diện & hoạt ảnh | HTML5 + CSS3 thuần | Không framework |
| Đồ họa nhân vật | SVG vẽ tay | Nháy mắt, vẫy đuôi, đập cánh, bay lượn bằng CSS animation |
| Tiếng kêu & hiệu ứng | Web Audio API | Oscillator + formant filter + vibrato/AM, không file audio |
| Giọng đọc | Web Speech API | vi-VN + en-US, chọn giọng & pitch |
| Nhạc nền | Web Audio API | Sequencer ngũ cung |
| Lưu trữ | localStorage | Tiến độ theo ngày + cài đặt |

## 📖 Tài liệu

- [Kế hoạch triển khai](KE_HOACH_TRIEN_KHAI.md) · [Walkthrough](docs/walkthrough.md) · [Kiến trúc](docs/implementation_plan.md) · [Đặc tả API](docs/api_specification.md)

## 👥 Nhóm thực hiện

| Thành viên | Vai trò |
|---|---|
| _(điền tên)_ | Trưởng nhóm, thiết kế UX |
| _(điền tên)_ | Lập trình giao diện & sprite SVG |
| _(điền tên)_ | Âm thanh & dữ liệu từ vựng |
| _(điền tên)_ | Kiểm thử & tài liệu |

## 📄 Giấy phép

MIT — tự do sử dụng cho mục đích học tập. Toàn bộ hình ảnh nhân vật do nhóm tự vẽ bằng SVG (không dùng tài nguyên có bản quyền của AdaptedMind hay Sago Mini).
