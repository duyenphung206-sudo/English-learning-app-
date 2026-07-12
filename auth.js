/* ============================================================
   auth.js — Đăng nhập / Đăng ký bằng email (Firebase Authentication)
   + lưu tiến trình học của từng bé trên Firestore.

   File này là ES module (dùng import), được nạp bằng
   <script type="module" src="auth.js"></script> trong index.html.
   Nó gắn các hàm cần dùng vào window.Auth để app.js (script thường)
   có thể gọi được.
   ============================================================ */

import firebaseConfig from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* Dịch mã lỗi Firebase sang tiếng Việt dễ hiểu cho phụ huynh */
function friendlyError(code) {
  const map = {
    "auth/invalid-email": "Email không đúng định dạng.",
    "auth/email-already-in-use": "Email này đã được đăng ký rồi. Hãy đăng nhập nhé!",
    "auth/weak-password": "Mật khẩu cần ít nhất 6 ký tự.",
    "auth/user-not-found": "Không tìm thấy tài khoản với email này.",
    "auth/wrong-password": "Sai mật khẩu, thử lại nhé!",
    "auth/invalid-credential": "Email hoặc mật khẩu không đúng.",
    "auth/too-many-requests": "Bạn thử sai nhiều lần quá, hãy đợi một chút rồi thử lại.",
    "auth/network-request-failed": "Không có kết nối mạng. Kiểm tra internet nhé!",
  };
  return map[code] || "Có lỗi xảy ra, vui lòng thử lại.";
}

function emptyProgress() {
  return { quizScore: 0, quizTotal: 0, learnedWords: [], watchedVideos: [] };
}

/* Tạo tài khoản mới bằng email + mật khẩu, kèm tên bé */
async function register(email, password, childName) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", cred.user.uid), {
    email,
    childName: childName || "",
    createdAt: serverTimestamp(),
    ...emptyProgress(),
  });
  return cred.user;
}

async function login(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

async function logout() {
  await signOut(auth);
}

async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

/* Đọc hồ sơ + tiến trình học của user hiện tại */
async function loadProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (snap.exists()) return snap.data();
  // Phòng trường hợp tài khoản cũ chưa có document (hiếm khi xảy ra)
  const fresh = { email: auth.currentUser?.email || "", childName: "", ...emptyProgress() };
  await setDoc(doc(db, "users", uid), { ...fresh, createdAt: serverTimestamp() });
  return fresh;
}

/* Gộp (merge) dữ liệu tiến trình mới vào document của user */
async function saveProgress(uid, partialData) {
  await updateDoc(doc(db, "users", uid), partialData);
}

/* Thêm 1 từ / 1 video vào mảng (tự tránh trùng) mà không cần đọc trước */
async function addToProgressArray(uid, field, value) {
  await updateDoc(doc(db, "users", uid), { [field]: arrayUnion(value) });
}

window.Auth = {
  register,
  login,
  logout,
  resetPassword,
  loadProfile,
  saveProgress,
  addToProgressArray,
  friendlyError,
  onAuthStateChanged: (cb) => onAuthStateChanged(auth, cb),
};
