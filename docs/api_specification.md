# 📡 Đặc tả API — Web API trình duyệt & hàm nội bộ

Ứng dụng không có backend; "API" ở đây gồm 3 Web API của trình duyệt và tập hàm nội bộ trong `index.html`.

## 1. Web API trình duyệt sử dụng

### 1.1 Web Audio API
| Đối tượng | Mục đích |
|---|---|
| `AudioContext` | Bộ máy âm thanh, khởi tạo 1 lần sau chạm đầu tiên (biến `AC`, hàm `ac()`) |
| `OscillatorNode` | Nguồn âm cơ bản (sine/triangle/square/sawtooth) |
| `GainNode` | Đường bao âm lượng (attack 20ms, decay mũ) |
| `AudioBuffer` + `BufferSource` | Nhiễu trắng cho tiếng gió/sủa/gõ |
| `BiquadFilterNode` (bandpass) | Tạo màu cho nhiễu |
| LFO (Oscillator → Gain → frequency) | Rung âm (vibrato) cho tiếng mèo, cừu, ngựa... |

### 1.2 Web Speech API (SpeechSynthesis)
| Hàm/thuộc tính | Mục đích |
|---|---|
| `speechSynthesis.getVoices()` | Lấy danh sách giọng; nghe sự kiện `voiceschanged` vì danh sách tải bất đồng bộ |
| `SpeechSynthesisUtterance` | Câu cần đọc: `lang`, `voice`, `pitch`, `rate`, `onend` |
| `speechSynthesis.speak()/cancel()` | Phát / ngắt giọng đang đọc trước khi đọc câu mới |

### 1.3 localStorage
Khóa duy nhất `beHocTiengAnh_v1`, giá trị JSON:

```json
{
  "days": {
    "2026-07-05": { "stars": 6, "words": 9, "correct": 6, "total": 8, "sec": 420 }
  },
  "words": { "Dog": "2026-07-05", "Cat": "2026-07-05" },
  "set":   { "voice": "Microsoft HoaiMy Online (Natural) - Vietnamese (Vietnam)", "pitch": 1.35 }
}
```

| Trường | Ý nghĩa |
|---|---|
| `days[d].stars` | Sao kiếm được trong ngày `d` |
| `days[d].words` | Số từ mới lần đầu học trong ngày |
| `days[d].correct/total` | Số câu đúng / tổng lượt trả lời đố vui |
| `days[d].sec` | Giây học (cộng 5s mỗi nhịp khi đang ở màn học/chơi và tab hiển thị) |
| `words[EN]` | Ngày đầu tiên bé học từ đó |
| `set` | Cài đặt giọng đọc của phụ huynh |

## 2. Hàm nội bộ chính

### 2.1 Âm thanh
| Hàm | Chữ ký | Mô tả |
|---|---|---|
| `syn` | `({f0,f1,dur,type,vol,delay,vib,vibF,am,amF,filt,filt2,q,atk})` | Bộ tổng hợp giọng thú: dao động lướt f0→f1, bộ lọc "cổ họng" bandpass `filt`(→`filt2`), rung cao độ `vib`, rung âm lượng `am/amF`, thời gian vào tiếng `atk` |
| `nz` | `({dur,vol,delay,freq,q,ftype,am,amF,atk})` | Nhiễu trắng qua bộ lọc — hơi thở, tiếng khàn, tiếng gõ |
| `tone` | `(f0,f1,dur,type,vol,delay,vib,vibF)` | Lối tắt của `syn` cho hiệu ứng giao diện và nhạc nền |
| `SPR.<tên>` | `()` | *(sprites.js)* 17 sprite SVG vẽ tay của khu vui chơi, có lớp hoạt ảnh `.blink/.tail/.wing/.sway` |
| `sfx.click/correct/wrong/fanfare/swipe` | `()` | Hiệu ứng bấm nút, đúng, sai, chúc mừng, chuyển cảnh |
| `ANIMAL.<tên>` | `()` | 22 tiếng kêu: dog, cat, cow, duck, chicken, chick, pig, sheep, horse, bird, frog, lion, elephant, bee, monkey, mouse, wolf, owl, snake, cricket, dolphin, whale |
| `OBJ.<tên>` | `()` | Âm đồ vật sân chơi: guitar, ball, flower, house, butterfly, apple |
| `startMusic/stopMusic/toggleMusic` | `()` | Nhạc nền sequencer (chỉ ở khu vui chơi) |

### 2.2 Giọng đọc
| Hàm | Mô tả |
|---|---|
| `loadVoices()` | Nạp danh sách giọng, cập nhật ô chọn giọng |
| `pickVI()` | Chọn giọng vi-VN: giọng phụ huynh đã lưu → HoaiMy → Google → giọng vi đầu tiên |
| `pickEN()` | Chọn giọng en-US: Google → giọng nữ phổ biến → giọng en đầu tiên |
| `speak(text,lang,cb)` | Đọc `text`; vi-VN dùng pitch trong cài đặt, en-US pitch 1.3 rate 0.8; `cb` gọi khi đọc xong |
| `sayVI/sayEN` | Lối tắt cho 2 ngôn ngữ |

### 2.3 Dữ liệu & tiến độ
| Hàm | Mô tả |
|---|---|
| `dkey(date?)` | Chuỗi `YYYY-MM-DD` theo giờ máy |
| `day()` | Bản ghi của hôm nay (tự tạo nếu chưa có) |
| `learnWord(en)` | Đánh dấu từ đã học lần đầu + tăng đếm ngày |
| `addStar(n)` | Cộng sao + cập nhật hiển thị |
| `streak()` | Số ngày học liên tiếp tính lùi từ hôm nay/hôm qua |
| `save()` | Ghi `P` vào localStorage (bọc try/catch) |

### 2.4 Màn hình & trò chơi
| Hàm | Mô tả |
|---|---|
| `showScreen(id)` | Chuyển màn hình, bật/tắt nhạc nền và quái vật trang chủ theo ngữ cảnh |
| `openTopic(k)` / `renderCard()` / `moveCard(dir)` | Vào chủ đề, vẽ thẻ, lật thẻ có hiệu ứng |
| `startQuiz()` / `showQuestion()` / `pickFind(btn,o)` / `endQuiz()` | Trò "Tìm trong cảnh": 20 câu/lượt, mỗi câu rải 9 vật thể của chủ đề vào cảnh, hỏi "Where is the ...?" (Anh trước, Việt sau); sao chỉ tính khi đúng ngay lần đầu |
| `qMood(m)` | Biểu cảm linh vật: `happy` (há miệng + nhảy), `sad`, `idle` |
| `buildPlay()` / `tapItem(el,it)` / `sparkle(el)` / `updatePlayCount()` | Khu vui chơi: dựng vật thể, xử lý chạm (hiệu ứng → âm riêng → EN → VI), pháo sáng, đếm khám phá |
| `openGate()/checkGate()` | Khóa phép toán trước trang Ba Mẹ |
| `renderParent()` / `renderChart()` | Thống kê + biểu đồ tuần/tháng/năm theo chỉ số đang chọn |
| `fillVoiceSel()/saveVoice()/savePitch()/testVoice()` | Cài đặt giọng đọc |

## 3. Ràng buộc & lưu ý

- **Autoplay:** mọi âm thanh chỉ hoạt động sau cú chạm đầu tiên (màn hình bắt đầu đảm nhận việc này — gọi `ac()` để mở khóa AudioContext)
- **`speechSynthesis.cancel()`** luôn được gọi trước khi đọc câu mới để tránh xếp hàng chồng tiếng
- **Giọng đọc phụ thuộc nền tảng:** danh sách giọng vi-VN khác nhau giữa Edge/Chrome/Android/iOS; ứng dụng phải luôn hoạt động được kể cả khi không có giọng (hiển thị chữ)
- **Không dùng thư viện ngoài** trừ font Baloo 2 (Google Fonts, có fallback hệ thống khi offline)
