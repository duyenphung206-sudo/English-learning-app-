# 📋 Kế hoạch triển khai — Bé Học Tiếng Anh

## 1. Mục tiêu dự án

Xây dựng ứng dụng web học tiếng Anh cho trẻ em Việt Nam 3-5 tuổi với các yêu cầu:

- Đồ họa hoạt hình tươi sáng, thân thiện với trẻ nhỏ (tham khảo phong cách AdaptedMind)
- Lối chơi khám phá tự do gây hứng thú (tham khảo Sago Mini World), không chỉ học từ khô khan
- Toàn bộ âm thanh tạo bằng code: giọng đọc tiếng Việt/tiếng Anh, tiếng kêu động vật, âm thanh tương tác, nhạc nền
- Trang theo dõi hành trình học cho phụ huynh theo tuần / tháng / năm
- Chạy được ngay bằng cách mở file, triển khai miễn phí qua GitHub Pages

## 2. Phạm vi

**Trong phạm vi:** 4 chủ đề từ vựng + khu vui chơi tương tác, trò chơi đố vui thưởng sao, thống kê học tập, cài đặt giọng đọc, hoạt động offline (trừ giọng đọc).

**Ngoài phạm vi (hướng phát triển):** tài khoản người dùng, đồng bộ đám mây, giọng đọc thu âm sẵn của trẻ em bản xứ, thêm chủ đề (phương tiện, gia đình, nghề nghiệp), chế độ nhiều bé trên cùng máy.

## 3. Tiến độ theo tuần

| Tuần | Công việc | Sản phẩm |
|---|---|---|
| 1 | Phân tích yêu cầu, khảo sát AdaptedMind & Sago Mini, chọn công nghệ | Tài liệu yêu cầu, bản phác giao diện |
| 2 | Dựng khung màn hình (trang chủ, học từ, đố vui), dữ liệu từ vựng 4 chủ đề | Bản chạy thử đầu tiên |
| 3 | Bộ tổng hợp âm thanh Web Audio (tiếng kêu 14 loài, hiệu ứng bấm), tích hợp Web Speech | Âm thanh hoàn chỉnh |
| 4 | Trò chơi đố vui + thưởng sao + pháo hoa; lưu tiến độ localStorage | Trò chơi hoàn chỉnh |
| 5 | Trang phụ huynh: biểu đồ tuần/tháng/năm, chuỗi ngày, tiến độ chủ đề | Dashboard hoàn chỉnh |
| 6 | Nâng cấp đồ họa: nhân vật quái vật SVG, khung cảnh đồi cỏ, chuyển cảnh | Giao diện v2 |
| 7 | Khu vui chơi kiểu Sago Mini: sân chơi SVG, 16 vật thể tương tác, nhạc nền | Giao diện v3 |
| 8 | Cài đặt giọng đọc (chọn giọng, pitch), kiểm thử, viết tài liệu, triển khai Pages | Bản phát hành + docs |

## 4. Phân công (điền tên thành viên)

| Hạng mục | Người phụ trách |
|---|---|
| Thiết kế UX/UI, đồ họa SVG | _(tên)_ |
| Lập trình màn hình & chuyển cảnh | _(tên)_ |
| Âm thanh (Web Audio, Web Speech) | _(tên)_ |
| Dữ liệu từ vựng & trò chơi | _(tên)_ |
| Dashboard phụ huynh & lưu trữ | _(tên)_ |
| Kiểm thử, tài liệu, triển khai | _(tên)_ |

## 5. Quy trình Git

- Nhánh `main`: bản ổn định, tự động phát hành qua GitHub Pages
- Nhánh `dev`: tích hợp tính năng trước khi gộp vào `main`
- Nhánh tính năng: `feat/<tên>`, ví dụ `feat/playground`, `feat/parent-dashboard`
- Quy ước commit: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:` — mô tả ngắn bằng tiếng Việt hoặc tiếng Anh
- Mỗi Pull Request cần ít nhất 1 thành viên khác xem trước khi gộp

## 6. Kiểm thử

| Loại | Cách thực hiện |
|---|---|
| Cú pháp JS | `node --check` trước khi commit |
| Trình duyệt | Thử trên Chrome, Edge, Cốc Cốc (máy tính) và Chrome/Safari (điện thoại) |
| Giọng đọc | Kiểm tra danh sách giọng vi-VN từng trình duyệt, thử pitch 0.9-1.6 |
| Trẻ em dùng thử | Quan sát bé 3-5 tuổi thao tác, ghi nhận chỗ bé lúng túng |
| Dữ liệu | Kiểm tra localStorage sau khi học, đổi ngày hệ thống để thử biểu đồ tuần/tháng/năm |

## 7. Triển khai

1. Đẩy code lên GitHub (`main`)
2. **Settings → Pages → Branch: main / (root) → Save**
3. Kiểm tra link `https://<user>.github.io/<repo>/` trên máy tính và điện thoại
4. Mỗi lần cập nhật chỉ cần commit vào `main`, Pages tự cập nhật sau 1-2 phút

## 8. Rủi ro & phương án

| Rủi ro | Ảnh hưởng | Phương án |
|---|---|---|
| Trình duyệt không có giọng vi-VN | Không có tiếng Việt | Hiển thị chữ song song; khuyến nghị Edge/Chrome; hướng phát triển: thu âm sẵn |
| Giọng TTS người lớn, chưa giống trẻ em | Trải nghiệm giảm | Cho phụ huynh chỉnh pitch; hướng phát triển: dịch vụ TTS trả phí có giọng trẻ em |
| Chính sách autoplay chặn âm thanh | Không có tiếng khi mở | Màn hình "Chạm để bắt đầu" mở khóa AudioContext |
| Emoji hiển thị khác nhau giữa thiết bị | Hình ảnh không đồng nhất | Chấp nhận ở bản này; hướng phát triển: thay bằng bộ SVG tự vẽ toàn bộ |
