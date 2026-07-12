/* ============================================================
   firebase-config.js
   DÁN CONFIG FIREBASE CỦA BẠN VÀO ĐÂY.

   Cách lấy config:
   1) Vào https://console.firebase.google.com → tạo project mới (miễn phí).
   2) Vào Build → Authentication → Get started → tab "Sign-in method"
      → bật "Email/Password" → Save.
   3) Vào Build → Firestore Database → Create database → Start in
      test mode → chọn khu vực gần nhất (vd: asia-southeast1) → Enable.
   4) Vào biểu tượng bánh răng (Project settings) → cuộn xuống
      "Your apps" → bấm biểu tượng Web </> → đặt tên app → Register app.
   5) Firebase sẽ hiện ra 1 đoạn "const firebaseConfig = {...}".
      Copy đúng phần bên trong { } và dán thay thế bên dưới.
   ============================================================ */

const firebaseConfig = {
  apiKey: "AIzaSyCwb8HZpGArqd8EzYpymkDNqQ12ek1Tkw0",
  authDomain: "thobongapp.firebaseapp.com",
  projectId: "thobongapp",
  storageBucket: "thobongapp.firebasestorage.app",
  messagingSenderId: "563139070058",
  appId: "1:563139070058:web:3210d1d8132b99217c2213",
};

export default firebaseConfig;
