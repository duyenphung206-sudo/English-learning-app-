/* ============================================================
   data.js  —  Toàn bộ DỮ LIỆU của app để ở đây cho dễ sửa.
   Bé chưa biết code vẫn có thể thêm video / từ vựng mới
   bằng cách copy 1 khối { ... } rồi đổi nội dung bên trong.
   ============================================================ */

/* 1) DANH SÁCH VIDEO HOẠT HÌNH
   - youtubeId: lấy phần mã sau "v=" trong link YouTube.
     Ví dụ link  https://www.youtube.com/watch?v=tbbKjDjMDok
     thì youtubeId = "tbbKjDjMDok"
   - words: những từ vựng sẽ học SAU KHI xem xong video.
   LƯU Ý: mỗi từ trong "words" phải có trong DICTIONARY bên dưới
   (viết giống hệt nhau, kể cả chữ hoa/thường).               */
const VIDEOS = [
  {
    id: "v1",
    title: "Make Animal Sounds! Quack",
    titleEn: "The Animals On The Farm",
    thumbEmoji: "🐶",
    youtubeId: "9FcCV286-gA",
    words: ["Duck", "Mice", "Chicken", "Pig", "Goat", "Sheep", "Hourse", "Cow", "Rooster"]
  },
  {
    id: "v2",
    title: "Các con vật trong vườn thú",
    titleEn: "Animals at the Zoo",
    thumbEmoji: "🦁",
    youtubeId: "25_u1GzruQM",
    words: ["Lion", "Monkey", "Elephant", "Tiger", "Bear"]
  },
  {
    id: "v3",
    title: "Bài hát các màu sắc",
    titleEn: "The Colors Song",
    thumbEmoji: "🌈",
    youtubeId: "qhOTU8_1Af4",
    words: ["Red", "Blue", "Green", "Yellow", "Rainbow"]
  },
  {
    id: "v4",
    title: "Đếm số từ 1 đến 20",
    titleEn: "Counting 1 to 20",
    thumbEmoji: "🔢",
    youtubeId: "0VLxWIHRD4E",
    words: ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty"]
  },
  {
    id: "v5",
    title: "Eating Vegetables",
    titleEn: "Healthy Eating Song",
    thumbEmoji: "🥕",
    youtubeId: "tjT_nFtKTas",
    words: ["Celery", "Carrot", "Corn", "Broccoli", "Peppers", "Peas", "Cucumber", "Spinach", "Squash", "Asparagus", "Cabbage", "Beets"]
  }
];

/* 2) TỪ ĐIỂN HÌNH ẢNH cho mỗi từ vựng
   Mỗi từ gồm: emoji (hình minh hoạ), nghĩa tiếng Việt,
   và 1 câu ví dụ ngắn để bé tập nói cả cụm.            */
const DICTIONARY = {
  Duck:      { emoji: "🦆", vi: "con vịt",       phrase: "I see a duck.",                phraseVi: "Mình thấy một con vịt." },
  Mice:      { emoji: "🐁", vi: "con chuột",     phrase: "The mice are on the farm.",    phraseVi: "Chú chuột ở nông trại." },
  Chicken:   { emoji: "🐤", vi: "con gà",        phrase: "The chickens are on the farm.",phraseVi: "Con gà ở nông trại." },
  Pig:       { emoji: "🐖", vi: "con heo",       phrase: "The pigs are on the farm.",    phraseVi: "Con heo ở nông trại." },
  Goat:      { emoji: "🐐", vi: "con dê",        phrase: "The goats are on the farm.",   phraseVi: "Con dê trong nông trại." },
  Sheep:     { emoji: "🐏", vi: "con cừu",       phrase: "The sheep are on the farm.",   phraseVi: "Con cừu trong nông trại." },
  Hourse:    { emoji: "🐴", vi: "con ngựa",      phrase: "The horses are on the farm.",  phraseVi: "Con ngựa trong nông trại." },
  Cow:       { emoji: "🐄", vi: "con bò",        phrase: "The cows are on the farm.",    phraseVi: "Con bò trong nông trại." },
  Rooster:   { emoji: "🐓", vi: "con gà trống",  phrase: "The roosters are on the farm.",phraseVi: "Con gà trống trong nông trại." },
  Lion:      { emoji: "🦁", vi: "con sư tử",     phrase: "The lion says roar.",          phraseVi: "Con sư tử gầm gừ." },
  Monkey:    { emoji: "🐒", vi: "con khỉ",       phrase: "The monkey eats a banana.",    phraseVi: "Con khỉ ăn chuối." },
  Elephant:  { emoji: "🐘", vi: "con voi",       phrase: "The elephant is grey.",        phraseVi: "Con voi màu xám." },
  Tiger:     { emoji: "🐯", vi: "con hổ",        phrase: "The tiger says roar.",         phraseVi: "Con hổ kêu gừ gừ." },
  Bear:      { emoji: "🐻", vi: "con gấu",       phrase: "The bear is sleepy.",          phraseVi: "Con gấu buồn ngủ." },
  Red:       { emoji: "🔴", vi: "màu đỏ",        phrase: "The apple is red.",            phraseVi: "Quả táo màu đỏ." },
  Blue:      { emoji: "🔵", vi: "màu xanh dương",phrase: "The sky is blue.",             phraseVi: "Bầu trời màu xanh." },
  Green:     { emoji: "🟢", vi: "màu xanh lá",   phrase: "The leaf is green.",           phraseVi: "Chiếc lá màu xanh lá." },
  Yellow:    { emoji: "🟡", vi: "màu vàng",      phrase: "The sun is yellow.",           phraseVi: "Mặt trời màu vàng." },
  Rainbow:   { emoji: "🌈", vi: "cầu vồng",      phrase: "Look at the rainbow!",         phraseVi: "Nhìn cầu vồng kìa!" },
  One:       { emoji: "1️⃣", vi: "số một",        phrase: "I have one ball.",             phraseVi: "Mình có một quả bóng." },
  Two:       { emoji: "2️⃣", vi: "số hai",        phrase: "I see two cats.",              phraseVi: "Mình thấy hai con mèo." },
  Three:     { emoji: "3️⃣", vi: "số ba",         phrase: "Three little birds.",          phraseVi: "Ba chú chim nhỏ." },
  Four:      { emoji: "4️⃣", vi: "số bốn",        phrase: "Four red apples.",             phraseVi: "Bốn quả táo đỏ." },
  Five:      { emoji: "5️⃣", vi: "số năm",        phrase: "Give me five!",                phraseVi: "Đập tay nào!" },
  Six:       { emoji: "6️⃣", vi: "số sáu",        phrase: "I have six books.",            phraseVi: "Tôi có sáu quyển sách." },
  Seven:     { emoji: "7️⃣", vi: "số bảy",        phrase: "Seven days in a week.",        phraseVi: "Bảy ngày trong một tuần." },
  Eight:     { emoji: "8️⃣", vi: "số tám",        phrase: "A spider has eight legs.",     phraseVi: "Con nhện có tám chân." },
  Nine:      { emoji: "9️⃣", vi: "số chín",       phrase: "Cats have nine lives.",        phraseVi: "Mèo có chín cái mạng." },
  Ten:       { emoji: "🔟", vi: "số mười",       phrase: "Count from one to ten.",       phraseVi: "Đếm từ một đến mười." },
  Eleven:    { emoji: "1️⃣1️⃣", vi: "số mười một",  phrase: "He is eleven years old.",      phraseVi: "Cậu ấy mười một tuổi." },
  Twelve:    { emoji: "1️⃣2️⃣", vi: "số mười hai",  phrase: "Twelve months in a year.",     phraseVi: "Mười hai tháng trong một năm." },
  Thirteen:  { emoji: "1️⃣3️⃣", vi: "số mười ba",   phrase: "Room number thirteen.",        phraseVi: "Phòng số mười ba." },
  Fourteen:  { emoji: "1️⃣4️⃣", vi: "số mười bốn",  phrase: "Fourteen days make two weeks.",phraseVi: "Mười bốn ngày là hai tuần." },
  Fifteen:   { emoji: "1️⃣5️⃣", vi: "số mười lăm",  phrase: "Just fifteen minutes left.",   phraseVi: "Chỉ còn mười lăm phút nữa." },
  Sixteen:   { emoji: "1️⃣6️⃣", vi: "số mười sáu",  phrase: "Sweet sixteen.",               phraseVi: "Tuổi mười sáu trăng tròn." },
  Seventeen: { emoji: "1️⃣7️⃣", vi: "số mười bảy",  phrase: "Read page seventeen.",         phraseVi: "Đọc trang số mười bảy." },
  Eighteen:  { emoji: "1️⃣8️⃣", vi: "số mười tám",  phrase: "You are eighteen now.",        phraseVi: "Bây giờ bạn đã mười tám tuổi." },
  Nineteen:  { emoji: "1️⃣9️⃣", vi: "số mười chín", phrase: "Nineteen students passed.",    phraseVi: "Mười chín học sinh đã đậu." },
  Twenty:    { emoji: "2️⃣0️⃣", vi: "số hai mươi",  phrase: "Twenty dollars, please.",      phraseVi: "Của bạn hết hai mươi đô la." },
  Celery:    { emoji: "🥬", vi: "cần tây",       phrase: "The celery is in the kitchen.",    phraseVi: "Cần tây ở trong nhà bếp." },
  Carrot:    { emoji: "🥕", vi: "củ cà rốt",     phrase: "The carrots are in the kitchen.",  phraseVi: "Những củ cà rốt ở trong nhà bếp." },
  Corn:      { emoji: "🌽", vi: "trái bắp",      phrase: "The corn is in the kitchen.",      phraseVi: "Trái bắp ở trong nhà bếp." },
  Broccoli:  { emoji: "🥦", vi: "bông cải xanh", phrase: "The broccoli is in the kitchen.",  phraseVi: "Bông cải xanh ở trong nhà bếp." },
  Peppers:   { emoji: "🫑", vi: "ớt chuông",     phrase: "The peppers are in the kitchen.",  phraseVi: "Những quả ớt chuông ở trong nhà bếp." },
  Peas:      { emoji: "🫛", vi: "đậu Hà Lan",    phrase: "The peas are in the kitchen.",     phraseVi: "Đậu Hà Lan ở trong nhà bếp." },
  Cucumber:  { emoji: "🥒", vi: "dưa leo",       phrase: "The cucumber is in the kitchen.",  phraseVi: "Quả dưa leo ở trong nhà bếp." },
  Spinach:   { emoji: "🍃", vi: "rau chân vịt",  phrase: "The spinach is in the kitchen.",   phraseVi: "Rau chân vịt ở trong nhà bếp." },
  Squash:    { emoji: "🎃", vi: "quả bí",        phrase: "The squash is in the kitchen.",    phraseVi: "Quả bí ở trong nhà bếp." },
  Asparagus: { emoji: "🌱", vi: "măng tây",      phrase: "The asparagus is in the kitchen.", phraseVi: "Măng tây ở trong nhà bếp." },
  Cabbage:   { emoji: "🥬", vi: "bắp cải",       phrase: "The cabbage is in the kitchen.",   phraseVi: "Bắp cải ở trong nhà bếp." },
  Beets:     { emoji: "🧅", vi: "củ dền",        phrase: "The beets are in the kitchen.",    phraseVi: "Những củ dền ở trong nhà bếp." }
};

/* 3) KỊCH BẢN TRÒ CHUYỆN CỦA THỎ BÔNG (Phiên bản tự nhiên, gần gũi với trẻ em) */
const BUNNY_BRAIN = {
  opening: "Hello! Thỏ Bông mập mạp xin chào! Bé ơi, ấn nút micro rồi nói chuyện với Thỏ cho vui nhé! 🐰",

  rules: [
    // Chào hỏi ban đầu
    {
      keywords: ["hello", "hi", "xin chào", "chào", "thỏ ơi", "chào thỏ", "ê"],
      reply: "Hello bạn nhỏ! Thỏ đang nhai cà rốt rột rột nè. Bé tên là gì dạ, nói Thỏ nghe với!"
    },

    // Hỏi tên, tuổi
    {
      keywords: ["tên", "name", "là", "tuổi", "years old"],
      reply: "Tên bé cưng quá đi! Thỏ thì mới được 3 tuổi thôi. Ở nhà bé hay thích chơi trò gì nhất?"
    },

    // Nhóm: Động vật nông trại
    {
      keywords: ["duck", "vịt", "mice", "chuột", "chicken", "gà", "pig", "heo", "lợn", "goat", "dê", "sheep", "cừu", "horse", "ngựa", "cow", "bò", "rooster", "farm", "nông trại"],
      reply: "Nhắc tới nông trại là Thỏ nhớ mấy bạn Heo ủn ỉn với bạn Bò kêu 'Moo Moo' lắm. Chơi vui cực! Mà bé có thích bạn Vịt (Duck) lạch bạch không?"
    },

    // Nhóm: Động vật hoang dã
    {
      keywords: ["lion", "sư tử", "monkey", "khỉ", "elephant", "voi", "tiger", "hổ", "cọp", "bear", "gấu", "animal", "con vật"],
      reply: "Ui, mấy bạn đó bự xự luôn! Bạn Hổ gầm 'Roar' một cái làm Thỏ giật cả mình. Bé có sợ bạn Hổ (Tiger) không?"
    },

    // Nhóm: Màu sắc
    {
      keywords: ["color", "màu", "red", "đỏ", "blue", "xanh", "green", "yellow", "vàng", "rainbow", "cầu vồng"],
      reply: "Thỏ thích màu trắng của lông Thỏ, với màu cam của củ cà rốt nữa! Thế bé thích màu gì, là màu Red (đỏ) hay Blue (xanh)?"
    },

    // Nhóm: Số đếm (Rủ chơi trốn tìm)
    {
      keywords: ["number", "số", "đếm", "count", "one", "two", "three", "four", "five", "một", "hai", "ba"],
      reply: "Mình chơi trốn tìm nha! Thỏ nhắm mắt đây, bé đếm One, Two, Three... rồi đi trốn lẹ đi!"
    },

    // Cảm xúc tích cực
    {
      keywords: ["happy", "vui", "thích", "yes", "có", "giỏi", "yêu"],
      reply: "Hihi, Thỏ cũng thích bé lắm! Mình làm bạn thân nha, ngoắc tay cái nào! Bé nói 'Yes' đi!"
    },

    // Cảm xúc tiêu cực (Dỗ dành)
    {
      keywords: ["sad", "buồn", "tired", "mệt", "cry", "khóc", "sợ"],
      reply: "Bé sao thế? Lại đây Thỏ ôm một cái cho đỡ buồn nè. Vuốt ve vuốt ve là hết mệt liền á!"
    },

    // Đồ ăn / Đói bụng
    {
      keywords: ["food", "ăn", "eat", "đói", "hungry", "apple", "táo", "carrot", "cà rốt", "kẹo", "bánh"],
      reply: "Ôi nhắc tới đồ ăn là cái bụng Thỏ kêu rột rột rồi. Thỏ thèm cà rốt lắm! Hôm nay bé được ăn món gì ngon dạ?"
    },

    // Tạm biệt / Đi ngủ
    {
      keywords: ["bye", "tạm biệt", "goodbye", "hẹn gặp lại", "ngủ", "sleep", "night"],
      reply: "Thỏ ngáp rồi nè, Thỏ buồn ngủ quá. Bye bye bé nha, mai mình lại chơi tiếp nhé! Good night! Chụt chụt! 😘"
    }
  ],

  default: [
    // Khi Thỏ không bắt được từ khóa, Thỏ sẽ phản ứng như một đứa trẻ đang hóng chuyện
    "Tai Thỏ hơi dài nên Thỏ nghe chưa rõ lắm, bé nói to lên một tí xíu xiu được không?",
    "Ôi hay quá! Thế rồi sao nữa, bé kể tiếp cho Thỏ nghe đi!",
    "Thỏ đang vểnh tai nghe nè. Mà bé thử nói từ đó bằng tiếng Anh cho Thỏ học ké với được không?"
  ]
};
