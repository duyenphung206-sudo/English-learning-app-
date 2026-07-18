# -*- coding: utf-8 -*-
"""
Tạo bộ giọng đọc tiếng Việt bản xứ (giọng bé gái - Hoài My neural) cho web Bé Học Tiếng Anh.
Chạy 1 lần trên máy có mạng:  py generate_audio.py
Kết quả: ../audio/vi.mp3 (1 file gộp) + ../audio/vi.json (bảng thời gian từng câu)
Web sẽ tự dùng 2 file này ở mọi trình duyệt — không còn phụ thuộc giọng máy.
"""
import asyncio, json, os, sys, re

try:
    import edge_tts
    from mutagen.mp3 import MP3
except ImportError:
    print("Thieu thu vien. Chay:  py -m pip install edge-tts mutagen")
    sys.exit(1)

HERE = os.path.dirname(os.path.abspath(__file__))
CLIPS = os.path.join(HERE, "clips")
OUT_DIR = os.path.join(HERE, "..", "audio")
VOICE = "vi-VN-HoaiMyNeural"   # giọng nữ Việt Nam (neural, bản xứ)
PITCH = "+25Hz"                 # nâng cao độ cho non trẻ như giọng bé
RATE = "-5%"                    # đọc chậm lại một chút cho bé dễ nghe
os.makedirs(CLIPS, exist_ok=True)
os.makedirs(OUT_DIR, exist_ok=True)

def slug(k):
    return re.sub(r'[^a-z0-9]+', '_', k.lower())

def lower_first(s):
    return s[0].lower() + s[1:] if s else s

with open(os.path.join(HERE, "words.json"), encoding="utf-8") as f:
    DATA = json.load(f)

jobs = []  # (key, text)
for w in DATA["words"]:
    jobs.append(("w:" + w["en"], w["vi"]))
    jobs.append(("q:" + w["en"], "Đâu là " + lower_first(w["vi"]) + "?"))
for k, t in DATA["phrases"].items():
    jobs.append((k, t))
print("Tong so cau can tao:", len(jobs))

sem = asyncio.Semaphore(6)
async def make(key, text):
    path = os.path.join(CLIPS, slug(key) + ".mp3")
    if os.path.exists(path) and os.path.getsize(path) > 500:
        return
    async with sem:
        for attempt in range(3):
            try:
                await edge_tts.Communicate(text, VOICE, pitch=PITCH, rate=RATE).save(path)
                if os.path.getsize(path) > 500:
                    return
            except Exception as e:
                await asyncio.sleep(1.5 * (attempt + 1))
        print("  !! loi:", key)

async def main():
    done = 0
    B = 40
    for i in range(0, len(jobs), B):
        await asyncio.gather(*(make(k, t) for k, t in jobs[i:i+B]))
        done = min(i + B, len(jobs))
        print(f"  da tao {done}/{len(jobs)} cau...")
asyncio.run(main())

# Gộp thành 1 file + bảng thời gian (MP3 CBR cùng thông số nên nối thẳng được)
print("Dang gop file...")
offsets, cursor = {}, 0.0
with open(os.path.join(OUT_DIR, "vi.mp3"), "wb") as out:
    for key, _ in jobs:
        path = os.path.join(CLIPS, slug(key) + ".mp3")
        if not (os.path.exists(path) and os.path.getsize(path) > 500):
            continue
        dur = MP3(path).info.length
        with open(path, "rb") as f:
            out.write(f.read())
        offsets[key] = [round(cursor, 3), round(dur, 3)]
        cursor += dur
with open(os.path.join(OUT_DIR, "vi.json"), "w", encoding="utf-8") as f:
    json.dump(offsets, f, ensure_ascii=False)
size = os.path.getsize(os.path.join(OUT_DIR, "vi.mp3")) / 1e6
print(f"XONG! audio/vi.mp3 ({size:.1f} MB, {cursor/60:.1f} phut) + audio/vi.json ({len(offsets)} cau)")
print("Mo lai index.html de nghe giong Viet ban xu. Nho tai len GitHub ca thu muc audio.")
