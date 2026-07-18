'use strict';
/* ================== DỮ LIỆU TỪ VỰNG (4 chủ đề x ~100 từ) ==================
   Định dạng: 'TiếngAnh|TiếngViệt|Hình|tiếng_kêu(tùy chọn)' — ngăn cách bằng ; */
const RAW = {
  animals: { title:'Động vật', icon:'🐶', cls:'c1', s:
    'Dog|Con chó|🐶|dog;Puppy|Chó con|🐕|dog;Poodle|Chó xù|🐩|dog;Cat|Con mèo|🐱|cat;'+
    'Kitten|Mèo con|🐈|cat;Cow|Con bò|🐮|cow;Buffalo|Con trâu|🐃|cow;Ox|Bò đực|🐂|cow;'+
    'Duck|Con vịt|🦆|duck;Chicken|Con gà|🐔|chicken;Rooster|Gà trống|🐓|chicken;Chick|Gà con|🐤|chick;'+
    'Turkey|Gà tây|🦃|chicken;Pig|Con heo|🐷|pig;Boar|Heo rừng|🐗|pig;Sheep|Con cừu|🐑|sheep;'+
    'Goat|Con dê|🐐|sheep;Horse|Con ngựa|🐴|horse;Zebra|Ngựa vằn|🦓|horse;Donkey|Con lừa|🫏|horse;'+
    'Bird|Con chim|🐦|bird;Eagle|Đại bàng|🦅|bird;Parrot|Con vẹt|🦜|bird;Swan|Thiên nga|🦢;'+
    'Peacock|Con công|🦚;Flamingo|Hồng hạc|🦩;Dove|Bồ câu|🕊️|owl;Owl|Con cú|🦉|owl;'+
    'Penguin|Chim cánh cụt|🐧;Frog|Con ếch|🐸|frog;Lion|Con sư tử|🦁|lion;Tiger|Con hổ|🐯|lion;'+
    'Leopard|Con báo|🐆|lion;Bear|Con gấu|🐻|lion;Panda|Gấu trúc|🐼;Koala|Gấu túi|🐨;'+
    'Elephant|Con voi|🐘|elephant;Bee|Con ong|🐝|bee;Mosquito|Con muỗi|🦟|bee;Fly|Con ruồi|🪰|bee;'+
    'Monkey|Con khỉ|🐵|monkey;Gorilla|Khỉ đột|🦍|monkey;Orangutan|Đười ươi|🦧|monkey;'+
    'Fish|Con cá|🐟;Tropical fish|Cá cảnh|🐠;Pufferfish|Cá nóc|🐡;Shark|Cá mập|🦈;'+
    'Dolphin|Cá heo|🐬|dolphin;Whale|Cá voi|🐳|whale;Octopus|Bạch tuộc|🐙;Squid|Con mực|🦑;'+
    'Shrimp|Con tôm|🦐;Lobster|Tôm hùm|🦞;Crab|Con cua|🦀;Shell|Vỏ sò|🐚;Seal|Hải cẩu|🦭;'+
    'Rabbit|Con thỏ|🐰;Mouse|Con chuột|🐭|mouse;Rat|Chuột cống|🐀|mouse;Hamster|Chuột hamster|🐹|mouse;'+
    'Squirrel|Con sóc|🐿️|mouse;Hedgehog|Con nhím|🦔;Bat|Con dơi|🦇;Fox|Con cáo|🦊;'+
    'Wolf|Con sói|🐺|wolf;Raccoon|Gấu mèo|🦝;Skunk|Chồn hôi|🦨;Badger|Con lửng|🦡;'+
    'Otter|Rái cá|🦦;Sloth|Con lười|🦥;Kangaroo|Chuột túi|🦘;Camel|Lạc đà|🐪;'+
    'Llama|Lạc đà không bướu|🦙;Giraffe|Hươu cao cổ|🦒;Deer|Con nai|🦌;Hippo|Hà mã|🦛;'+
    'Rhino|Tê giác|🦏;Bison|Bò rừng|🦬|cow;Turtle|Con rùa|🐢;Snake|Con rắn|🐍|snake;'+
    'Lizard|Thằn lằn|🦎;Crocodile|Cá sấu|🐊;Dinosaur|Khủng long|🦖|lion;Sauropod|Khủng long cổ dài|🦕;'+
    'Dragon|Con rồng|🐉;Snail|Ốc sên|🐌;Caterpillar|Sâu bướm|🐛;Butterfly|Con bướm|🦋;'+
    'Ladybug|Bọ rùa|🐞;Ant|Con kiến|🐜;Cricket|Con dế|🦗|cricket;Spider|Con nhện|🕷️;'+
    'Scorpion|Bọ cạp|🦂;Beetle|Bọ cánh cứng|🪲;Worm|Con giun|🪱;Unicorn|Kỳ lân|🦄|horse;'+
    'Jellyfish|Con sứa|🪼;Ram|Cừu đực|🐏|sheep;Racehorse|Ngựa phi|🐎|horse;Paw prints|Dấu chân|🐾' },
  food: { title:'Đồ ăn & Trái cây', icon:'🍎', cls:'c2', s:
    'Apple|Quả táo|🍎;Green apple|Táo xanh|🍏;Pear|Quả lê|🍐;Orange|Quả cam|🍊;'+
    'Lemon|Quả chanh|🍋;Banana|Quả chuối|🍌;Watermelon|Dưa hấu|🍉;Grapes|Chùm nho|🍇;'+
    'Strawberry|Quả dâu tây|🍓;Blueberries|Việt quất|🫐;Melon|Dưa lưới|🍈;Cherry|Quả anh đào|🍒;'+
    'Peach|Quả đào|🍑;Mango|Quả xoài|🥭;Pineapple|Quả dứa|🍍;Coconut|Quả dừa|🥥;'+
    'Kiwi|Quả kiwi|🥝;Tomato|Cà chua|🍅;Olive|Quả ô liu|🫒;Avocado|Quả bơ|🥑;'+
    'Eggplant|Cà tím|🍆;Potato|Khoai tây|🥔;Sweet potato|Khoai lang|🍠;Carrot|Cà rốt|🥕;'+
    'Corn|Bắp ngô|🌽;Chili|Ớt|🌶️;Bell pepper|Ớt chuông|🫑;Cucumber|Dưa leo|🥒;'+
    'Lettuce|Rau xà lách|🥬;Broccoli|Bông cải xanh|🥦;Garlic|Củ tỏi|🧄;Onion|Củ hành|🧅;'+
    'Mushroom|Cây nấm|🍄;Peanuts|Đậu phộng|🥜;Chestnut|Hạt dẻ|🌰;Bread|Bánh mì|🍞;'+
    'Croissant|Bánh sừng bò|🥐;Baguette|Bánh mì que|🥖;Pretzel|Bánh xoắn|🥨;Bagel|Bánh vòng|🥯;'+
    'Pancakes|Bánh kếp|🥞;Waffle|Bánh tổ ong|🧇;Cheese|Phô mai|🧀;Meat|Thịt|🍖;'+
    'Chicken leg|Đùi gà|🍗;Steak|Bít tết|🥩;Bacon|Thịt xông khói|🥓;Hamburger|Bánh mì kẹp|🍔;'+
    'Fries|Khoai tây chiên|🍟;Pizza|Bánh pizza|🍕;Hot dog|Xúc xích kẹp|🌭;Sandwich|Bánh sandwich|🥪;'+
    'Taco|Bánh taco|🌮;Burrito|Bánh cuốn Mexico|🌯;Salad|Rau trộn|🥗;Popcorn|Bỏng ngô|🍿;'+
    'Butter|Bơ sữa|🧈;Salt|Muối|🧂;Egg|Quả trứng|🥚;Fried egg|Trứng ốp la|🍳;'+
    'Hot pot|Nồi lẩu|🍲;Rice|Cơm trắng|🍚;Rice ball|Cơm nắm|🍙;Rice cracker|Bánh gạo|🍘;'+
    'Bento|Cơm hộp|🍱;Curry|Cơm cà ri|🍛;Noodles|Mì tô|🍜;Spaghetti|Mì Ý|🍝;'+
    'Sushi|Cơm cuộn sushi|🍣;Fried shrimp|Tôm chiên|🍤;Fish cake|Chả cá|🍥;Dumpling|Bánh bao|🥟;'+
    'Fortune cookie|Bánh may mắn|🥠;Takeout box|Hộp thức ăn|🥡;Skewer|Xiên que|🍢;Dango|Bánh trôi|🍡;'+
    'Shaved ice|Đá bào|🍧;Ice cream|Kem ly|🍨;Soft ice cream|Kem ốc quế|🍦;Pie|Bánh nướng|🥧;'+
    'Cupcake|Bánh cupcake|🧁;Cake|Bánh ngọt|🍰;Birthday cake|Bánh sinh nhật|🎂;Pudding|Bánh flan|🍮;'+
    'Lollipop|Kẹo mút|🍭;Candy|Viên kẹo|🍬;Chocolate|Sô cô la|🍫;Donut|Bánh rán vòng|🍩;'+
    'Cookie|Bánh quy|🍪;Honey|Mật ong|🍯;Milk|Sữa|🥛;Baby bottle|Bình sữa|🍼;'+
    'Coffee|Cà phê|☕;Tea|Trà nóng|🍵;Juice|Nước ép|🧃;Soda|Nước ngọt|🥤;'+
    'Bubble tea|Trà sữa|🧋;Ice|Đá lạnh|🧊;Kebab|Bánh mì kebab|🥙;Falafel|Chả chiên|🧆' },
  things: { title:'Đồ vật & Xe cộ', icon:'🚗', cls:'c3', s:
    'Car|Xe hơi|🚗;Taxi|Xe taxi|🚕;Bus|Xe buýt|🚌;Race car|Xe đua|🏎️;'+
    'Police car|Xe cảnh sát|🚓;Ambulance|Xe cứu thương|🚑;Fire truck|Xe cứu hỏa|🚒;Truck|Xe tải|🚚;'+
    'Tractor|Máy cày|🚜;Pickup|Xe bán tải|🛻;Motorcycle|Xe máy|🏍️;Scooter|Xe tay ga|🛵;'+
    'Bicycle|Xe đạp|🚲;Kick scooter|Xe trượt|🛴;Train|Tàu hỏa|🚂;Bullet train|Tàu cao tốc|🚅;'+
    'Metro|Tàu điện ngầm|🚇;Tram|Tàu điện|🚊;Airplane|Máy bay|✈️;Small plane|Máy bay nhỏ|🛩️;'+
    'Helicopter|Trực thăng|🚁;Rocket|Tên lửa|🚀;UFO|Đĩa bay|🛸;Sailboat|Thuyền buồm|⛵;'+
    'Speedboat|Ca nô|🚤;Ship|Tàu thủy|🚢;Ferry|Phà|⛴️;Canoe|Thuyền độc mộc|🛶;'+
    'Anchor|Mỏ neo|⚓;Traffic light|Đèn giao thông|🚦;Stop sign|Biển dừng|🛑;Fuel pump|Trạm xăng|⛽;'+
    'House|Ngôi nhà|🏠;School|Trường học|🏫;Hospital|Bệnh viện|🏥;Store|Cửa hàng|🏪;'+
    'Castle|Lâu đài|🏰;Tent|Cái lều|⛺;Bed|Cái giường|🛏️;Couch|Ghế sô pha|🛋️;'+
    'Chair|Cái ghế|🪑;Door|Cánh cửa|🚪;Window|Cửa sổ|🪟;Toilet|Bồn cầu|🚽;'+
    'Shower|Vòi sen|🚿;Bathtub|Bồn tắm|🛁;Toothbrush|Bàn chải răng|🪥;Soap|Cục xà phòng|🧼;'+
    'Sponge|Miếng bọt biển|🧽;Broom|Cây chổi|🧹;Basket|Cái giỏ|🧺;Bucket|Cái xô|🪣;'+
    'Key|Chìa khóa|🔑;Lamp|Bóng đèn|💡;Candle|Cây nến|🕯️;Clock|Đồng hồ|⏰;'+
    'Telephone|Điện thoại bàn|☎️;Mobile phone|Điện thoại|📱;Computer|Máy tính|💻;Television|Ti vi|📺;'+
    'Camera|Máy ảnh|📷;Radio|Đài radio|📻;Scissors|Cây kéo|✂️;Pencil|Bút chì|✏️;'+
    'Pen|Bút mực|🖊️;Crayon|Bút sáp màu|🖍️;Paintbrush|Cọ vẽ|🖌️;Book|Quyển sách|📚;'+
    'Notebook|Quyển vở|📓;Ruler|Cây thước|📏;Backpack|Ba lô|🎒;Umbrella|Cây dù|☂️;'+
    'T-shirt|Áo thun|👕;Jeans|Quần jean|👖;Coat|Áo khoác|🧥;Dress|Váy đầm|👗;'+
    'Shirt|Áo sơ mi|👔;Shorts|Quần đùi|🩳;Socks|Đôi vớ|🧦;Gloves|Găng tay|🧤;'+
    'Scarf|Khăn choàng|🧣;Hat|Cái nón|👒;Cap|Nón lưỡi trai|🧢;Crown|Vương miện|👑;'+
    'Ring|Chiếc nhẫn|💍;Glasses|Mắt kính|👓;Sunglasses|Kính mát|🕶️;Sneakers|Giày thể thao|👟;'+
    'Shoes|Đôi giày|👞;Boots|Giày ống|🥾;Ball|Quả bóng|⚽;Basketball|Bóng rổ|🏀;'+
    'Baseball|Bóng chày|⚾;Tennis|Bóng tennis|🎾;Balloon|Bong bóng|🎈;Teddy bear|Gấu bông|🧸;'+
    'Kite|Con diều|🪁;Yo-yo|Cái yo-yo|🪀;Drum|Cái trống|🥁;Guitar|Đàn ghi-ta|🎸;'+
    'Piano|Đàn piano|🎹;Trumpet|Kèn trumpet|🎺;Violin|Đàn violin|🎻;Gift|Hộp quà|🎁' },
  nature: { title:'Thiên nhiên & Bé', icon:'🌈', cls:'c4', s:
    'Sun|Mặt trời|☀️;Moon|Mặt trăng|🌙;Star|Ngôi sao|⭐;Cloud|Đám mây|☁️;'+
    'Rain|Mưa|🌧️;Storm|Bão|⛈️;Snow|Tuyết|❄️;Snowman|Người tuyết|☃️;'+
    'Rainbow|Cầu vồng|🌈;Tornado|Lốc xoáy|🌪️;Water|Nước|💧;Wave|Sóng biển|🌊;'+
    'Fire|Ngọn lửa|🔥;Lightning|Tia sét|⚡;Earth|Trái đất|🌍;Mountain|Ngọn núi|⛰️;'+
    'Volcano|Núi lửa|🌋;Beach|Bãi biển|🏖️;Desert|Sa mạc|🏜️;Island|Hòn đảo|🏝️;'+
    'Tree|Cây xanh|🌳;Pine tree|Cây thông|🌲;Palm tree|Cây dừa|🌴;Cactus|Xương rồng|🌵;'+
    'Seedling|Cây mầm|🌱;Herb|Nhánh cỏ|🌿;Clover|Cỏ ba lá|🍀;Maple leaf|Lá phong|🍁;'+
    'Fallen leaf|Lá rụng|🍂;Leaf|Chiếc lá|🍃;Tulip|Hoa tulip|🌷;Rose|Hoa hồng|🌹;'+
    'Sunflower|Hoa hướng dương|🌻;Daisy|Hoa cúc|🌼;Cherry blossom|Hoa anh đào|🌸;Hibiscus|Hoa dâm bụt|🌺;'+
    'Bouquet|Bó hoa|💐;Eye|Con mắt|👁️;Ears|Cái tai|👂;Nose|Cái mũi|👃;'+
    'Mouth|Cái miệng|👄;Tongue|Cái lưỡi|👅;Tooth|Cái răng|🦷;Bone|Khúc xương|🦴;'+
    'Brain|Bộ não|🧠;Heart|Trái tim|❤️;Muscle|Bắp tay|💪;Leg|Cái chân|🦵;'+
    'Foot|Bàn chân|🦶;Hand|Bàn tay|✋;Thumbs up|Ngón cái|👍;Clap|Vỗ tay|👏;'+
    'Baby|Em bé|👶;Boy|Bé trai|👦;Girl|Bé gái|👧;Dad|Bố|👨;'+
    'Mom|Mẹ|👩;Grandpa|Ông|👴;Grandma|Bà|👵;Family|Gia đình|👪;'+
    'Happy|Vui vẻ|😀;Sad|Buồn|😢;Angry|Tức giận|😠;Sleepy|Buồn ngủ|😴;'+
    'Surprised|Ngạc nhiên|😲;Scared|Sợ hãi|😨;Laughing|Cười lớn|😂;Love|Yêu thương|😍;'+
    'Crying|Khóc|😭;Sick|Bị ốm|🤒;Red|Màu đỏ|🔴;Orange color|Màu cam|🟠;'+
    'Yellow|Màu vàng|🟡;Green|Màu xanh lá|🟢;Blue|Màu xanh dương|🔵;Purple|Màu tím|🟣;'+
    'Brown|Màu nâu|🟤;Black|Màu đen|⚫;White|Màu trắng|⚪;Pink|Màu hồng|💗;'+
    'Circle|Hình tròn|⭕;Square|Hình vuông|🔲;Triangle|Hình tam giác|🔺;Diamond|Hình thoi|🔷;'+
    'One|Số một|1️⃣;Two|Số hai|2️⃣;Three|Số ba|3️⃣;Four|Số bốn|4️⃣;'+
    'Five|Số năm|5️⃣;Six|Số sáu|6️⃣;Seven|Số bảy|7️⃣;Eight|Số tám|8️⃣;'+
    'Nine|Số chín|9️⃣;Ten|Số mười|🔟;Eleven|Số mười một|11;Twelve|Số mười hai|12;'+
    'Thirteen|Số mười ba|13;Fourteen|Số mười bốn|14;Fifteen|Số mười lăm|15;Sixteen|Số mười sáu|16;'+
    'Seventeen|Số mười bảy|17;Eighteen|Số mười tám|18;Nineteen|Số mười chín|19;Twenty|Số hai mươi|20' }
};
const TOPICS = {};
Object.keys(RAW).forEach(k=>{
  const r=RAW[k];
  TOPICS[k]={ title:r.title, icon:r.icon, cls:r.cls,
    items:r.s.split(';').map(row=>{
      const p=row.split('|');
      const it={en:p[0],vi:p[1],e:p[2]};
      if(p[3]) it.snd=p[3];
      return it;
    })};
});

/* Khu vui chơi: vật thể vẽ bằng SVG (sprites.js), tọa độ % trong cảnh */
const PLAY_ITEMS=[
  {en:'Dog',vi:'Con chó',spr:'dog',snd:'dog',x:20,y:78,w:13},
  {en:'Cat',vi:'Con mèo',spr:'cat',snd:'cat',x:36,y:87,w:12},
  {en:'Chicken',vi:'Con gà',spr:'chicken',snd:'chicken',x:49,y:76,w:10},
  {en:'Duck',vi:'Con vịt',spr:'duck',snd:'duck',x:63,y:60,w:10},
  {en:'Cow',vi:'Con bò',spr:'cow',snd:'cow',x:80,y:74,w:14},
  {en:'Pig',vi:'Con heo',spr:'pig',snd:'pig',x:91,y:86,w:12},
  {en:'Rabbit',vi:'Con thỏ',spr:'rabbit',snd:'mouse',x:8,y:64,w:9},
  {en:'Frog',vi:'Con ếch',spr:'frog',snd:'frog',x:54,y:67,w:9},
  {en:'Bird',vi:'Con chim',spr:'bird',snd:'bird',x:73,y:22,w:8},
  {en:'Bee',vi:'Con ong',spr:'bee',snd:'bee',x:40,y:30,w:7,fly:1},
  {en:'Butterfly',vi:'Con bướm',spr:'butterfly',obj:'butterfly',x:24,y:40,w:8,fly:1,delay:-11},
  {en:'Tree',vi:'Cây táo',spr:'tree',obj:'flower',x:29,y:44,w:22},
  {en:'Flower',vi:'Bông hoa',spr:'flower',obj:'flower',x:12,y:90,w:7},
  {en:'Apple',vi:'Quả táo',spr:'apple',obj:'apple',x:33,y:64,w:6},
  {en:'Guitar',vi:'Đàn ghi-ta',spr:'guitar',obj:'guitar',x:5,y:84,w:7},
  {en:'Ball',vi:'Quả bóng',spr:'ball',obj:'ball',x:68,y:88,w:8},
  {en:'House',vi:'Ngôi nhà',spr:'house',obj:'house',x:90,y:38,w:17}
];
