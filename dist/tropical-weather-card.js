/*
 * Tropical Weather Card for Home Assistant
 * https://github.com/mb26-dev/ha-tropical-weather
 * A weather card built for the tropics: monsoon, heat, cyclones, thunderstorms,
 * tides and what the weather means for your day. MIT License.
 */
const TWC_VERSION = "1.0.4";

// ---------- Translations ----------
// Compact source: every language lists its strings in the order of the *_KEYS arrays below.
// Missing keys fall back to English. Placeholders: {p} {t} {h} {m} {n} {d} {e}
const I18N_KEYS = {
  cond: ["clear-night", "cloudy", "exceptional", "fog", "hail", "lightning", "lightning-rainy", "partlycloudy", "pouring", "rainy", "snowy", "snowy-rainy", "sunny", "windy", "windy-variant", "tropical-monsoon", "tropical-heat", "tropical-cyclone"],
  heat: ["comfortable", "normal", "hot", "danger", "extreme_danger", "caution", "extreme_caution"],
  dew: ["dry", "comfortable", "slightly_humid", "humid", "oppressive"],
  uv: ["low", "moderate", "high", "very_high", "extreme"],
  trend: ["steady", "falling", "falling_fast", "rising", "rising_fast"],
  tab: ["hourly", "daily", "tide", "sources", "radar"],
  extra: ["paws", "paws_ok", "paws_hot", "paws_danger", "walk_from", "best_time", "none_today", "laundry", "dries_until", "dries_all_day", "laundry_bad", "tomorrow", "mosquitoes", "bites", "storm_approach", "storm_away", "storm_steady", "stay_inside", "bites_now", "next_peak"],
  flat: ["loading", "no_rain", "rain_now", "rain_from", "until", "approx", "beyond_24h", "peak", "temperature", "wind", "humidity", "pressure", "measured", "local", "agree", "now", "today", "rain_probability", "gust", "no_tide", "rising", "falling", "high", "low", "high_tide", "low_tide", "entity_missing", "weather", "daylight_left", "to_sunrise", "sources_note", "feels_like", "heat_index", "mugginess", "uv_max", "lightning", "from", "strikes", "none_nearby", "sea", "water_temp", "tide", "km_away", "to_the", "radar_error", "next_24h", "max"],
};

const I18N_SRC = {
  en: {
    cond: ["Clear night", "Cloudy", "Severe weather", "Fog", "Hail", "Thunderstorm", "Thunderstorm with rain", "Partly cloudy", "Heavy rain", "Rain", "Snow", "Sleet", "Sunny", "Windy", "Windy, cloudy", "Monsoon downpour", "Tropical heat", "Tropical cyclone"],
    heat: ["Comfortable", "Normal", "Hot", "Danger", "Extreme danger", "Caution", "Extreme caution"],
    dew: ["Dry", "Comfortable", "Slightly humid", "Humid", "Oppressive"],
    uv: ["Low", "Moderate", "High", "Very high", "Extreme"],
    trend: ["Steady", "Falling", "Falling fast", "Rising", "Rising fast"],
    tab: ["Hourly", "8 days", "Tides", "Sources", "Radar"],
    bft: ["Calm", "Light air", "Light breeze", "Gentle breeze", "Moderate breeze", "Fresh breeze", "Strong breeze", "Near gale", "Gale", "Strong gale", "Storm", "Violent storm", "Hurricane"],
    flat: ["Loading forecast …", "No rain expected · next 12 h max {p} %", "Rain likely now", "Rain from {t}", "until {t}", "approx. {t}", "beyond 24 h", "peak {p} %", "Temperature", "Wind", "Humidity", "Pressure", "measured", "Local", "agree", "Now", "Today", "Rain probability", "Gust", "No tide entity configured (tide:).", "rising", "falling", "High", "Low", "High tide", "Low tide", "Entity {e} not found", "Weather", "{h} h {m} min daylight left", "{h} h {m} min to sunrise", "Grey dots = weather models, gold = your own sensor. \"agree\" means all values are within tolerance.", "Feels like", "Heat index", "Mugginess", "UV max today", "Lightning", "from {d}", "{n} strikes", "None nearby", "Sea", "Water temp", "Tide", "{d} km away", "to the {d}", "Radar card could not be loaded", "Next 24 h", "max"],
  },
  de: {
    cond: ["Klare Nacht", "Bewölkt", "Unwetter", "Nebel", "Hagel", "Gewitter", "Gewitter mit Regen", "Teilweise bewölkt", "Starkregen", "Regen", "Schnee", "Schneeregen", "Sonnig", "Windig", "Windig, bewölkt", "Monsun-Regenguss", "Tropische Hitze", "Tropischer Wirbelsturm"],
    heat: ["Angenehm", "Normal", "Heiß", "Gefahr", "Extreme Gefahr", "Vorsicht", "Erhöhte Vorsicht"],
    dew: ["Trocken", "Angenehm", "Leicht schwül", "Schwül", "Drückend"],
    uv: ["Niedrig", "Mäßig", "Hoch", "Sehr hoch", "Extrem"],
    trend: ["Stabil", "Fallend", "Stark fallend", "Steigend", "Stark steigend"],
    tab: ["Stündlich", "8 Tage", "Gezeiten", "Quellen", "Radar"],
    bft: ["Windstille", "Leiser Zug", "Leichte Brise", "Schwache Brise", "Mäßige Brise", "Frische Brise", "Starker Wind", "Steifer Wind", "Stürmischer Wind", "Sturm", "Schwerer Sturm", "Orkanartiger Sturm", "Orkan"],
    flat: ["Vorhersage wird geladen …", "Kein Regen erwartet · nächste 12 h max. {p} %", "Jetzt Regen wahrscheinlich", "Regen ab {t}", "bis {t}", "ca. {t}", "über 24 h hinaus", "Spitze {p} %", "Temperatur", "Wind", "Luftfeuchte", "Luftdruck", "gemessen", "Lokal", "einig", "Jetzt", "Heute", "Regenwahrscheinlichkeit", "Böen", "Keine Gezeiten-Entität konfiguriert (tide:).", "steigend", "fallend", "Flut", "Ebbe", "Hochwasser", "Niedrigwasser", "Entität {e} nicht gefunden", "Wetter", "noch {h} h {m} min Tageslicht", "{h} h {m} min bis Sonnenaufgang", "Graue Punkte = Wettermodelle, gold = dein eigener Sensor. „einig“ heißt: alle Werte liegen innerhalb der Toleranz.", "Gefühlt", "Hitzeindex", "Schwüle", "UV max. heute", "Blitze", "aus {d}", "{n} Einschläge", "Keine in der Nähe", "Meer", "Wassertemperatur", "Gezeiten", "{d} km entfernt", "Richtung {d}", "Radarkarte konnte nicht geladen werden", "Nächste 24 h", "max."],
  },
  th: {
    cond: ["ท้องฟ้าแจ่มใส (กลางคืน)", "มีเมฆมาก", "สภาพอากาศรุนแรง", "หมอก", "ลูกเห็บ", "พายุฝนฟ้าคะนอง", "ฝนฟ้าคะนอง", "มีเมฆบางส่วน", "ฝนตกหนัก", "ฝนตก", "หิมะ", "ฝนปนหิมะ", "แดดออก", "ลมแรง", "ลมแรง มีเมฆ", "ฝนมรสุม", "ร้อนจัด", "พายุหมุนเขตร้อน"],
    heat: ["สบาย", "ปกติ", "ร้อน", "อันตราย", "อันตรายมาก", "ระวัง", "ระวังมาก"],
    dew: ["แห้ง", "สบาย", "ชื้นเล็กน้อย", "ชื้น", "อบอ้าว"],
    uv: ["ต่ำ", "ปานกลาง", "สูง", "สูงมาก", "รุนแรง"],
    trend: ["คงที่", "ลดลง", "ลดลงเร็ว", "เพิ่มขึ้น", "เพิ่มขึ้นเร็ว"],
    tab: ["รายชั่วโมง", "8 วัน", "น้ำขึ้นน้ำลง", "แหล่งข้อมูล", "เรดาร์"],
    bft: ["ลมสงบ", "ลมเบา", "ลมอ่อน", "ลมโชย", "ลมปานกลาง", "ลมแรงพอควร", "ลมแรง", "ลมแรงมาก", "ลมพายุ", "ลมพายุแรง", "พายุ", "พายุรุนแรง", "พายุเฮอริเคน"],
    flat: ["กำลังโหลดพยากรณ์ …", "ไม่มีฝน · 12 ชม. ข้างหน้า สูงสุด {p} %", "มีโอกาสฝนตกตอนนี้", "ฝนตั้งแต่ {t}", "ถึง {t}", "ประมาณ {t}", "เกิน 24 ชม.", "สูงสุด {p} %", "อุณหภูมิ", "ลม", "ความชื้น", "ความกดอากาศ", "วัดจริง", "ในพื้นที่", "ตรงกัน", "ตอนนี้", "วันนี้", "โอกาสฝน", "ลมกระโชก", "ยังไม่ได้ตั้งค่าเอนทิตีน้ำขึ้นน้ำลง (tide:)", "กำลังขึ้น", "กำลังลง", "น้ำขึ้น", "น้ำลง", "น้ำขึ้นสูงสุด", "น้ำลงต่ำสุด", "ไม่พบเอนทิตี {e}", "สภาพอากาศ", "เหลือแสงกลางวัน {h} ชม. {m} นาที", "อีก {h} ชม. {m} นาที พระอาทิตย์ขึ้น", "จุดสีเทา = แบบจำลองสภาพอากาศ สีทอง = เซ็นเซอร์ของคุณ \"ตรงกัน\" หมายถึงทุกค่าอยู่ในเกณฑ์ที่ยอมรับได้", "รู้สึกเหมือน", "ดัชนีความร้อน", "ความอบอ้าว", "UV สูงสุดวันนี้", "ฟ้าผ่า", "จาก {d}", "{n} ครั้ง", "ไม่มีในบริเวณใกล้เคียง", "ทะเล", "อุณหภูมิน้ำ", "น้ำขึ้นน้ำลง", "ห่าง {d} กม.", "ทิศ {d}", "โหลดการ์ดเรดาร์ไม่ได้", "24 ชม. ข้างหน้า", "สูงสุด"],
  },
  vi: {
    cond: ["Trời quang (đêm)", "Nhiều mây", "Thời tiết khắc nghiệt", "Sương mù", "Mưa đá", "Dông", "Dông kèm mưa", "Có mây rải rác", "Mưa lớn", "Mưa", "Tuyết", "Mưa tuyết", "Nắng", "Có gió", "Có gió, nhiều mây", "Mưa gió mùa", "Nắng nóng nhiệt đới", "Bão nhiệt đới"],
    heat: ["Dễ chịu", "Bình thường", "Nóng", "Nguy hiểm", "Cực kỳ nguy hiểm", "Thận trọng", "Hết sức thận trọng"],
    dew: ["Khô", "Dễ chịu", "Hơi ẩm", "Ẩm", "Oi bức"],
    uv: ["Thấp", "Trung bình", "Cao", "Rất cao", "Cực độ"],
    trend: ["Ổn định", "Giảm", "Giảm nhanh", "Tăng", "Tăng nhanh"],
    tab: ["Theo giờ", "8 ngày", "Thủy triều", "Nguồn", "Radar"],
    bft: ["Lặng gió", "Gió rất nhẹ", "Gió nhẹ", "Gió nhẹ vừa", "Gió vừa", "Gió khá mạnh", "Gió mạnh", "Gió rất mạnh", "Gió bão", "Bão", "Bão mạnh", "Bão rất mạnh", "Siêu bão"],
    flat: ["Đang tải dự báo …", "Không có mưa · 12 giờ tới tối đa {p} %", "Có thể mưa ngay bây giờ", "Mưa từ {t}", "đến {t}", "khoảng {t}", "quá 24 giờ", "cao nhất {p} %", "Nhiệt độ", "Gió", "Độ ẩm", "Áp suất", "đo thực tế", "Tại chỗ", "khớp", "Bây giờ", "Hôm nay", "Khả năng mưa", "Gió giật", "Chưa cấu hình thực thể thủy triều (tide:).", "đang lên", "đang xuống", "Đỉnh triều", "Chân triều", "Triều lên", "Triều xuống", "Không tìm thấy thực thể {e}", "Thời tiết", "còn {h} giờ {m} phút ánh sáng", "{h} giờ {m} phút nữa mặt trời mọc", "Chấm xám = mô hình thời tiết, vàng = cảm biến của bạn. \"khớp\" nghĩa là mọi giá trị nằm trong sai số cho phép.", "Cảm giác như", "Chỉ số nhiệt", "Độ oi bức", "UV cao nhất hôm nay", "Sét", "từ {d}", "{n} lần sét", "Không có gần đây", "Biển", "Nhiệt độ nước", "Thủy triều", "cách {d} km", "về phía {d}", "Không tải được thẻ radar", "24 giờ tới", "tối đa"],
  },
  id: {
    cond: ["Cerah (malam)", "Berawan", "Cuaca ekstrem", "Kabut", "Hujan es", "Badai petir", "Badai petir disertai hujan", "Berawan sebagian", "Hujan lebat", "Hujan", "Salju", "Hujan salju", "Cerah", "Berangin", "Berangin, berawan", "Hujan monsun", "Panas tropis", "Siklon tropis"],
    heat: ["Nyaman", "Normal", "Panas", "Bahaya", "Sangat berbahaya", "Waspada", "Sangat waspada"],
    dew: ["Kering", "Nyaman", "Agak lembap", "Lembap", "Gerah"],
    uv: ["Rendah", "Sedang", "Tinggi", "Sangat tinggi", "Ekstrem"],
    trend: ["Stabil", "Turun", "Turun cepat", "Naik", "Naik cepat"],
    tab: ["Per jam", "8 hari", "Pasang surut", "Sumber", "Radar"],
    bft: ["Tenang", "Angin sangat lemah", "Angin lemah", "Angin pelan", "Angin sedang", "Angin segar", "Angin kuat", "Angin sangat kuat", "Angin ribut", "Angin ribut kuat", "Badai", "Badai hebat", "Topan"],
    flat: ["Memuat prakiraan …", "Tidak ada hujan · 12 jam ke depan maks. {p} %", "Kemungkinan hujan sekarang", "Hujan mulai {t}", "sampai {t}", "sekitar {t}", "lebih dari 24 jam", "puncak {p} %", "Suhu", "Angin", "Kelembapan", "Tekanan udara", "terukur", "Lokal", "sesuai", "Sekarang", "Hari ini", "Peluang hujan", "Embusan", "Entitas pasang surut belum diatur (tide:).", "naik", "turun", "Pasang", "Surut", "Air pasang", "Air surut", "Entitas {e} tidak ditemukan", "Cuaca", "{h} j {m} mnt siang tersisa", "{h} j {m} mnt menuju matahari terbit", "Titik abu-abu = model cuaca, emas = sensor Anda sendiri. \"sesuai\" berarti semua nilai dalam batas toleransi.", "Terasa seperti", "Indeks panas", "Kegerahan", "UV maks. hari ini", "Petir", "dari {d}", "{n} sambaran", "Tidak ada di sekitar", "Laut", "Suhu air", "Pasang surut", "{d} km jauhnya", "ke arah {d}", "Kartu radar tidak dapat dimuat", "24 jam ke depan", "maks."],
  },
  ms: {
    cond: ["Cerah (malam)", "Mendung", "Cuaca ekstrem", "Kabus", "Hujan batu", "Ribut petir", "Ribut petir dengan hujan", "Sebahagian berawan", "Hujan lebat", "Hujan", "Salji", "Hujan salji", "Cerah", "Berangin", "Berangin, berawan", "Hujan monsun", "Panas tropika", "Siklon tropika"],
    heat: ["Selesa", "Biasa", "Panas", "Bahaya", "Amat berbahaya", "Berhati-hati", "Amat berhati-hati"],
    dew: ["Kering", "Selesa", "Agak lembap", "Lembap", "Bahang"],
    uv: ["Rendah", "Sederhana", "Tinggi", "Sangat tinggi", "Melampau"],
    trend: ["Stabil", "Menurun", "Menurun pantas", "Meningkat", "Meningkat pantas"],
    tab: ["Setiap jam", "8 hari", "Pasang surut", "Sumber", "Radar"],
    bft: ["Tenang", "Angin sangat perlahan", "Angin perlahan", "Angin lembut", "Angin sederhana", "Angin segar", "Angin kuat", "Angin sangat kuat", "Angin ribut", "Ribut kuat", "Ribut", "Ribut dahsyat", "Taufan"],
    flat: ["Memuatkan ramalan …", "Tiada hujan dijangka · 12 jam akan datang maks. {p} %", "Kemungkinan hujan sekarang", "Hujan dari {t}", "hingga {t}", "kira-kira {t}", "melebihi 24 jam", "puncak {p} %", "Suhu", "Angin", "Kelembapan", "Tekanan udara", "diukur", "Tempatan", "sepadan", "Sekarang", "Hari ini", "Kebarangkalian hujan", "Tiupan", "Entiti pasang surut belum ditetapkan (tide:).", "naik", "turun", "Pasang", "Surut", "Air pasang", "Air surut", "Entiti {e} tidak dijumpai", "Cuaca", "{h} j {m} min siang lagi", "{h} j {m} min ke matahari terbit", "Titik kelabu = model cuaca, emas = sensor anda sendiri. \"sepadan\" bermaksud semua nilai dalam had toleransi.", "Terasa seperti", "Indeks haba", "Kebahangan", "UV maks. hari ini", "Kilat", "dari {d}", "{n} panahan", "Tiada berdekatan", "Laut", "Suhu air", "Pasang surut", "{d} km jauhnya", "ke arah {d}", "Kad radar tidak dapat dimuatkan", "24 jam akan datang", "maks."],
  },
  fil: {
    cond: ["Maaliwalas na gabi", "Maulap", "Matinding panahon", "Hamog", "Graniso", "Kulog at kidlat", "Kulog, kidlat at ulan", "Bahagyang maulap", "Malakas na ulan", "Ulan", "Niyebe", "Ulan na may niyebe", "Maaraw", "Mahangin", "Mahangin at maulap", "Ulan ng habagat", "Matinding init", "Bagyo"],
    heat: ["Komportable", "Normal", "Mainit", "Mapanganib", "Labis na mapanganib", "Mag-ingat", "Labis na pag-iingat"],
    dew: ["Tuyo", "Komportable", "Medyo maalinsangan", "Maalinsangan", "Napakaalinsangan"],
    uv: ["Mababa", "Katamtaman", "Mataas", "Napakataas", "Matindi"],
    trend: ["Matatag", "Bumababa", "Mabilis bumaba", "Tumataas", "Mabilis tumaas"],
    tab: ["Bawat oras", "8 araw", "Taog at kati", "Pinagmulan", "Radar"],
    bft: ["Kalmado", "Napakahinang hangin", "Mahinang simoy", "Banayad na simoy", "Katamtamang simoy", "Sariwang simoy", "Malakas na simoy", "Halos unos", "Unos", "Malakas na unos", "Bagyo", "Matinding bagyo", "Super bagyo"],
    flat: ["Kinukuha ang forecast …", "Walang inaasahang ulan · susunod na 12 oras max {p} %", "Malamang umulan ngayon", "Ulan mula {t}", "hanggang {t}", "mga {t}", "lampas 24 oras", "rurok {p} %", "Temperatura", "Hangin", "Halumigmig", "Presyon", "nasukat", "Lokal", "tugma", "Ngayon", "Ngayong araw", "Tsansa ng ulan", "Bugso", "Walang naka-configure na tide entity (tide:).", "tumataas", "bumababa", "Taog", "Kati", "Taog", "Kati", "Hindi nakita ang entity {e}", "Panahon", "{h} h {m} min na liwanag pa", "{h} h {m} min bago sumikat ang araw", "Abong tuldok = mga weather model, ginto = sarili mong sensor. Ang \"tugma\" ay nangangahulugang pasok sa tolerance ang lahat ng halaga.", "Pakiramdam ay", "Heat index", "Alinsangan", "Pinakamataas na UV ngayon", "Kidlat", "mula {d}", "{n} tama", "Wala sa malapit", "Dagat", "Temperatura ng tubig", "Taog at kati", "{d} km ang layo", "sa {d}", "Hindi ma-load ang radar card", "Susunod na 24 oras", "max"],
  },
  km: {
    cond: ["មេឃស្រឡះពេលយប់", "មានពពកច្រើន", "អាកាសធាតុធ្ងន់ធ្ងរ", "អ័ព្ទ", "ព្រឹល", "ផ្គររន្ទះ", "ផ្គររន្ទះ និងភ្លៀង", "មានពពកខ្លះ", "ភ្លៀងខ្លាំង", "ភ្លៀង", "ព្រិល", "ភ្លៀងលាយព្រិល", "មានពន្លឺថ្ងៃ", "មានខ្យល់", "មានខ្យល់ និងពពក", "ភ្លៀងមូសុង", "កំដៅត្រូពិច", "ព្យុះត្រូពិច"],
    heat: ["ស្រួល", "ធម្មតា", "ក្ដៅ", "គ្រោះថ្នាក់", "គ្រោះថ្នាក់ខ្លាំង", "ប្រុងប្រយ័ត្ន", "ប្រុងប្រយ័ត្នខ្ពស់"],
    dew: ["ស្ងួត", "ស្រួល", "សើមបន្តិច", "សើម", "ហប់"],
    uv: ["ទាប", "មធ្យម", "ខ្ពស់", "ខ្ពស់ណាស់", "ខ្លាំងបំផុត"],
    trend: ["ថេរ", "កំពុងធ្លាក់", "ធ្លាក់លឿន", "កំពុងឡើង", "ឡើងលឿន"],
    tab: ["តាមម៉ោង", "8 ថ្ងៃ", "ជំនោរ", "ប្រភព", "រ៉ាដា"],
    bft: ["គ្មានខ្យល់", "ខ្យល់ស្រាលបំផុត", "ខ្យល់ស្រាល", "ខ្យល់រំភើយ", "ខ្យល់មធ្យម", "ខ្យល់ស្រស់", "ខ្យល់ខ្លាំង", "ខ្យល់ខ្លាំងណាស់", "ខ្យល់ព្យុះ", "ខ្យល់ព្យុះខ្លាំង", "ព្យុះ", "ព្យុះខ្លាំង", "ព្យុះកម្រិតខ្ពស់បំផុត"],
    flat: ["កំពុងផ្ទុកការព្យាករ …", "គ្មានភ្លៀង · 12 ម៉ោងខាងមុខ អតិបរមា {p} %", "អាចភ្លៀងឥឡូវនេះ", "ភ្លៀងចាប់ពី {t}", "ដល់ {t}", "ប្រហែល {t}", "លើស 24 ម៉ោង", "ខ្ពស់បំផុត {p} %", "សីតុណ្ហភាព", "ខ្យល់", "សំណើម", "សម្ពាធខ្យល់", "វាស់ផ្ទាល់", "មូលដ្ឋាន", "ស៊ីគ្នា", "ឥឡូវ", "ថ្ងៃនេះ", "ឱកាសភ្លៀង", "ខ្យល់បក់ខ្លាំង", "មិនទាន់កំណត់ entity ជំនោរ (tide:)។", "កំពុងឡើង", "កំពុងស្រក", "ទឹកឡើង", "ទឹកស្រក", "ទឹកឡើងខ្ពស់", "ទឹកស្រកទាប", "រកមិនឃើញ entity {e}", "អាកាសធាតុ", "នៅសល់ពន្លឺថ្ងៃ {h} ម៉ោង {m} នាទី", "{h} ម៉ោង {m} នាទីទៀតថ្ងៃរះ", "ចំណុចប្រផេះ = គំរូអាកាសធាតុ, មាស = ឧបករណ៍ចាប់សញ្ញារបស់អ្នក។ \"ស៊ីគ្នា\" មានន័យថាតម្លៃទាំងអស់ស្ថិតក្នុងកម្រិតអនុញ្ញាត។", "អារម្មណ៍ដូច", "សន្ទស្សន៍កំដៅ", "ភាពហប់", "UV ខ្ពស់បំផុតថ្ងៃនេះ", "រន្ទះ", "ពី {d}", "{n} ដង", "គ្មាននៅជិត", "សមុទ្រ", "សីតុណ្ហភាពទឹក", "ជំនោរ", "ចម្ងាយ {d} គម", "ទិស {d}", "មិនអាចផ្ទុកកាតរ៉ាដាបាន", "24 ម៉ោងខាងមុខ", "អតិបរមា"],
  },
  lo: {
    cond: ["ທ້ອງຟ້າແຈ່ມໃສ (ກາງຄືນ)", "ມີເມກຫຼາຍ", "ສະພາບອາກາດຮຸນແຮງ", "ໝອກ", "ໝາກເຫັບ", "ພາຍຸຟ້າຮ້ອງ", "ພາຍຸຟ້າຮ້ອງມີຝົນ", "ມີເມກບາງສ່ວນ", "ຝົນຕົກໜັກ", "ຝົນຕົກ", "ຫິມະ", "ຝົນປົນຫິມະ", "ແດດອອກ", "ລົມແຮງ", "ລົມແຮງ ມີເມກ", "ຝົນມໍລະສຸມ", "ຮ້ອນຈັດ", "ພາຍຸໝູນເຂດຮ້ອນ"],
    heat: ["ສະບາຍ", "ປົກກະຕິ", "ຮ້ອນ", "ອັນຕະລາຍ", "ອັນຕະລາຍຫຼາຍ", "ລະວັງ", "ລະວັງຫຼາຍ"],
    dew: ["ແຫ້ງ", "ສະບາຍ", "ຊຸ່ມເລັກນ້ອຍ", "ຊຸ່ມ", "ອົບເອົ້າ"],
    uv: ["ຕ່ຳ", "ປານກາງ", "ສູງ", "ສູງຫຼາຍ", "ຮຸນແຮງ"],
    trend: ["ຄົງທີ່", "ຫຼຸດລົງ", "ຫຼຸດລົງໄວ", "ເພີ່ມຂຶ້ນ", "ເພີ່ມຂຶ້ນໄວ"],
    tab: ["ລາຍຊົ່ວໂມງ", "8 ມື້", "ນ້ຳຂຶ້ນນ້ຳລົງ", "ແຫຼ່ງຂໍ້ມູນ", "ເຣດາ"],
    bft: ["ລົມສະຫງົບ", "ລົມອ່ອນຫຼາຍ", "ລົມອ່ອນ", "ລົມພັດເບົາ", "ລົມປານກາງ", "ລົມຂ້ອນຂ້າງແຮງ", "ລົມແຮງ", "ລົມແຮງຫຼາຍ", "ລົມພາຍຸ", "ລົມພາຍຸແຮງ", "ພາຍຸ", "ພາຍຸຮຸນແຮງ", "ພາຍຸເຮີຣິເຄນ"],
    flat: ["ກຳລັງໂຫຼດການພະຍາກອນ …", "ບໍ່ມີຝົນ · 12 ຊມ. ຂ້າງໜ້າ ສູງສຸດ {p} %", "ອາດມີຝົນຕອນນີ້", "ຝົນຕັ້ງແຕ່ {t}", "ຮອດ {t}", "ປະມານ {t}", "ເກີນ 24 ຊມ.", "ສູງສຸດ {p} %", "ອຸນຫະພູມ", "ລົມ", "ຄວາມຊຸ່ມ", "ຄວາມກົດອາກາດ", "ວັດແທກຈິງ", "ທ້ອງຖິ່ນ", "ກົງກັນ", "ຕອນນີ້", "ມື້ນີ້", "ໂອກາດຝົນ", "ລົມກະໂຊກ", "ຍັງບໍ່ໄດ້ຕັ້ງຄ່າ entity ນ້ຳຂຶ້ນນ້ຳລົງ (tide:).", "ກຳລັງຂຶ້ນ", "ກຳລັງລົງ", "ນ້ຳຂຶ້ນ", "ນ້ຳລົງ", "ນ້ຳຂຶ້ນສູງສຸດ", "ນ້ຳລົງຕ່ຳສຸດ", "ບໍ່ພົບ entity {e}", "ສະພາບອາກາດ", "ເຫຼືອແສງກາງເວັນ {h} ຊມ. {m} ນາທີ", "ອີກ {h} ຊມ. {m} ນາທີ ຕາເວັນຂຶ້ນ", "ຈຸດສີເທົາ = ແບບຈຳລອງອາກາດ, ສີຄຳ = ເຊັນເຊີຂອງທ່ານ. \"ກົງກັນ\" ໝາຍເຖິງທຸກຄ່າຢູ່ໃນເກນ.", "ຮູ້ສຶກຄື", "ດັດຊະນີຄວາມຮ້ອນ", "ຄວາມອົບເອົ້າ", "UV ສູງສຸດມື້ນີ້", "ຟ້າຜ່າ", "ຈາກ {d}", "{n} ຄັ້ງ", "ບໍ່ມີໃກ້ຄຽງ", "ທະເລ", "ອຸນຫະພູມນ້ຳ", "ນ້ຳຂຶ້ນນ້ຳລົງ", "ຫ່າງ {d} ກມ.", "ທິດ {d}", "ໂຫຼດບັດເຣດາບໍ່ໄດ້", "24 ຊມ. ຂ້າງໜ້າ", "ສູງສຸດ"],
  },
  my: {
    cond: ["ကောင်းကင်ကြည်လင် (ည)", "တိမ်ထူ", "ပြင်းထန်သောရာသီဥတု", "မြူ", "မိုးသီး", "မိုးကြိုးမုန်တိုင်း", "မိုးကြိုးနှင့်မိုးရွာ", "တိမ်အနည်းငယ်", "မိုးသည်းထန်", "မိုးရွာ", "နှင်း", "မိုးနှင့်နှင်း", "နေသာ", "လေပြင်း", "လေပြင်း တိမ်ထူ", "မုတ်သုံမိုးသည်း", "အပူပိုင်းပူပြင်း", "အပူပိုင်းဆိုင်ကလုန်း"],
    heat: ["သက်တောင့်သက်သာ", "ပုံမှန်", "ပူ", "အန္တရာယ်", "အလွန်အန္တရာယ်", "သတိ", "အထူးသတိ"],
    dew: ["ခြောက်သွေ့", "သက်တောင့်သက်သာ", "အနည်းငယ်စိုထိုင်း", "စိုထိုင်း", "အိုက်စပ်"],
    uv: ["နိမ့်", "အသင့်အတင့်", "မြင့်", "အလွန်မြင့်", "အလွန်အမင်း"],
    trend: ["တည်ငြိမ်", "ကျဆင်း", "အမြန်ကျဆင်း", "တက်", "အမြန်တက်"],
    tab: ["နာရီအလိုက်", "8 ရက်", "ဒီရေ", "ရင်းမြစ်", "ရေဒါ"],
    bft: ["လေငြိမ်", "လေအလွန်နု", "လေနု", "လေညင်း", "လေအသင့်", "လေလတ်", "လေပြင်း", "လေအလွန်ပြင်း", "လေမုန်တိုင်း", "လေမုန်တိုင်းပြင်း", "မုန်တိုင်း", "မုန်တိုင်းကြီး", "ဟာရီကိန်း"],
    flat: ["ခန့်မှန်းချက် ဖွင့်နေသည် …", "မိုးမရွာ · နောက် 12 နာရီ အများဆုံး {p} %", "ယခု မိုးရွာနိုင်", "{t} မှ မိုးရွာ", "{t} အထိ", "{t} ခန့်", "24 နာရီ ကျော်", "အမြင့်ဆုံး {p} %", "အပူချိန်", "လေ", "စိုထိုင်းဆ", "လေဖိအား", "တိုင်းတာထား", "ဒေသတွင်း", "ကိုက်ညီ", "ယခု", "ယနေ့", "မိုးရွာနိုင်ခြေ", "လေဆောင့်", "ဒီရေ entity မသတ်မှတ်ရသေး (tide:)။", "တက်နေ", "ကျနေ", "ဒီရေတက်", "ဒီရေကျ", "ဒီရေအမြင့်ဆုံး", "ဒီရေအနိမ့်ဆုံး", "entity {e} ကို မတွေ့ပါ", "ရာသီဥတု", "နေ့အလင်း {h} နာရီ {m} မိနစ် ကျန်", "နေထွက်ရန် {h} နာရီ {m} မိနစ်", "မီးခိုးရောင်အစက် = ရာသီဥတုမော်ဒယ်များ၊ ရွှေရောင် = သင့်ကိုယ်ပိုင်အာရုံခံကိရိယာ။ \"ကိုက်ညီ\" ဆိုသည်မှာ တန်ဖိုးအားလုံး ခွင့်ပြုအတိုင်းအတာအတွင်း ရှိသည်။", "ခံစားရသည်မှာ", "အပူညွှန်းကိန်း", "အိုက်စပ်မှု", "ယနေ့ UV အမြင့်ဆုံး", "လျှပ်စီး", "{d} မှ", "{n} ကြိမ်", "အနီးတွင် မရှိ", "ပင်လယ်", "ရေအပူချိန်", "ဒီရေ", "{d} ကီလိုမီတာ အကွာ", "{d} ဘက်", "ရေဒါကတ်ကို မဖွင့်နိုင်ပါ", "နောက် 24 နာရီ", "အများဆုံး"],
  },
  "zh-Hans": {
    cond: ["晴（夜间）", "阴", "恶劣天气", "雾", "冰雹", "雷暴", "雷阵雨", "多云", "大雨", "雨", "雪", "雨夹雪", "晴", "有风", "有风，多云", "季风暴雨", "热带酷热", "热带气旋"],
    heat: ["舒适", "正常", "炎热", "危险", "极度危险", "注意", "高度注意"],
    dew: ["干燥", "舒适", "略潮湿", "潮湿", "闷热"],
    uv: ["低", "中等", "高", "很高", "极高"],
    trend: ["平稳", "下降", "快速下降", "上升", "快速上升"],
    tab: ["逐小时", "8天", "潮汐", "数据源", "雷达"],
    bft: ["无风", "软风", "轻风", "微风", "和风", "清风", "强风", "疾风", "大风", "烈风", "狂风", "暴风", "飓风"],
    flat: ["正在加载预报 …", "预计无雨 · 未来12小时最高 {p} %", "现在可能下雨", "{t} 起有雨", "至 {t}", "约 {t}", "超过24小时", "峰值 {p} %", "温度", "风", "湿度", "气压", "实测", "本地", "一致", "现在", "今天", "降雨概率", "阵风", "未配置潮汐实体 (tide:)。", "涨潮中", "落潮中", "高潮", "低潮", "高潮", "低潮", "未找到实体 {e}", "天气", "白昼剩余 {h} 小时 {m} 分", "距日出 {h} 小时 {m} 分", "灰点 = 天气模型，金色 = 你自己的传感器。“一致”表示所有数值都在容差范围内。", "体感", "炎热指数", "闷热度", "今日最高紫外线", "闪电", "来自{d}", "{n} 次", "附近无", "海", "水温", "潮汐", "距离 {d} 公里", "位于{d}方向", "无法加载雷达卡片", "未来24小时", "最高"],
  },
  "zh-Hant": {
    cond: ["晴（夜間）", "陰", "惡劣天氣", "霧", "冰雹", "雷暴", "雷陣雨", "多雲", "大雨", "雨", "雪", "雨夾雪", "晴", "有風", "有風，多雲", "季風暴雨", "熱帶酷熱", "熱帶氣旋"],
    heat: ["舒適", "正常", "炎熱", "危險", "極度危險", "注意", "高度注意"],
    dew: ["乾燥", "舒適", "略潮濕", "潮濕", "悶熱"],
    uv: ["低", "中等", "高", "很高", "極高"],
    trend: ["平穩", "下降", "快速下降", "上升", "快速上升"],
    tab: ["逐時", "8天", "潮汐", "資料來源", "雷達"],
    bft: ["無風", "軟風", "輕風", "微風", "和風", "清風", "強風", "疾風", "大風", "烈風", "狂風", "暴風", "颶風"],
    flat: ["正在載入預報 …", "預計無雨 · 未來12小時最高 {p} %", "現在可能下雨", "{t} 起有雨", "至 {t}", "約 {t}", "超過24小時", "峰值 {p} %", "溫度", "風", "濕度", "氣壓", "實測", "本地", "一致", "現在", "今天", "降雨機率", "陣風", "未設定潮汐實體 (tide:)。", "漲潮中", "退潮中", "滿潮", "乾潮", "滿潮", "乾潮", "找不到實體 {e}", "天氣", "日照剩餘 {h} 小時 {m} 分", "距日出 {h} 小時 {m} 分", "灰點 = 天氣模型，金色 = 你自己的感測器。「一致」表示所有數值都在容許範圍內。", "體感", "炎熱指數", "悶熱度", "今日最高紫外線", "閃電", "來自{d}", "{n} 次", "附近無", "海", "水溫", "潮汐", "距離 {d} 公里", "位於{d}方向", "無法載入雷達卡片", "未來24小時", "最高"],
  },
  ja: {
    cond: ["晴れ（夜）", "曇り", "荒天", "霧", "ひょう", "雷", "雷雨", "晴れ時々曇り", "大雨", "雨", "雪", "みぞれ", "晴れ", "風が強い", "風が強く曇り", "モンスーンの豪雨", "熱帯の猛暑", "熱帯サイクロン"],
    heat: ["快適", "通常", "暑い", "危険", "極めて危険", "注意", "厳重警戒"],
    dew: ["乾燥", "快適", "やや蒸し暑い", "蒸し暑い", "非常に蒸し暑い"],
    uv: ["弱い", "中程度", "強い", "非常に強い", "極端に強い"],
    trend: ["安定", "下降", "急降下", "上昇", "急上昇"],
    tab: ["1時間ごと", "8日間", "潮汐", "ソース", "レーダー"],
    bft: ["静穏", "至軽風", "軽風", "軟風", "和風", "疾風", "雄風", "強風", "疾強風", "大強風", "全強風", "暴風", "台風級"],
    flat: ["予報を読み込み中 …", "雨の予報なし · 今後12時間の最大 {p} %", "今すぐ雨の可能性", "{t} から雨", "{t} まで", "{t} 頃", "24時間以上", "ピーク {p} %", "気温", "風", "湿度", "気圧", "実測", "ローカル", "一致", "現在", "今日", "降水確率", "突風", "潮汐エンティティが未設定です (tide:)。", "上げ潮", "下げ潮", "満潮", "干潮", "満潮", "干潮", "エンティティ {e} が見つかりません", "天気", "日没まで {h} 時間 {m} 分", "日の出まで {h} 時間 {m} 分", "灰色の点 = 気象モデル、金色 = あなたのセンサー。「一致」はすべての値が許容範囲内であることを示します。", "体感", "暑さ指数", "蒸し暑さ", "今日の最大UV", "落雷", "{d}から", "{n} 回", "付近になし", "海", "水温", "潮汐", "{d} km 先", "{d}方向", "レーダーカードを読み込めません", "今後24時間", "最大"],
  },
  ko: {
    cond: ["맑은 밤", "흐림", "악천후", "안개", "우박", "뇌우", "비를 동반한 뇌우", "구름 조금", "폭우", "비", "눈", "진눈깨비", "맑음", "바람", "바람, 흐림", "몬순 폭우", "열대 폭염", "열대 저기압"],
    heat: ["쾌적", "보통", "더움", "위험", "매우 위험", "주의", "경고"],
    dew: ["건조", "쾌적", "약간 습함", "습함", "무더움"],
    uv: ["낮음", "보통", "높음", "매우 높음", "위험"],
    trend: ["안정", "하강", "급하강", "상승", "급상승"],
    tab: ["시간별", "8일", "조석", "출처", "레이더"],
    bft: ["고요", "실바람", "남실바람", "산들바람", "건들바람", "흔들바람", "된바람", "센바람", "큰바람", "큰센바람", "노대바람", "왕바람", "싹쓸바람"],
    flat: ["예보 불러오는 중 …", "비 예보 없음 · 향후 12시간 최대 {p} %", "지금 비 올 가능성", "{t}부터 비", "{t}까지", "약 {t}", "24시간 이후", "최고 {p} %", "기온", "바람", "습도", "기압", "실측", "현지", "일치", "지금", "오늘", "강수 확률", "돌풍", "조석 엔티티가 설정되지 않았습니다 (tide:).", "밀물", "썰물", "만조", "간조", "만조", "간조", "엔티티 {e}을(를) 찾을 수 없습니다", "날씨", "일몰까지 {h}시간 {m}분", "일출까지 {h}시간 {m}분", "회색 점 = 기상 모델, 금색 = 내 센서. '일치'는 모든 값이 허용 범위 안에 있다는 뜻입니다.", "체감", "열지수", "불쾌감", "오늘 최대 UV", "낙뢰", "{d}에서", "{n}회", "주변 없음", "바다", "수온", "조석", "{d} km 거리", "{d} 방향", "레이더 카드를 불러올 수 없습니다", "향후 24시간", "최대"],
  },
  hi: {
    cond: ["साफ़ रात", "बादल छाए", "गंभीर मौसम", "कोहरा", "ओले", "आंधी-तूफ़ान", "बारिश के साथ आंधी-तूफ़ान", "आंशिक बादल", "भारी बारिश", "बारिश", "बर्फ़", "बर्फ़ के साथ बारिश", "धूप", "तेज़ हवा", "तेज़ हवा, बादल", "मानसूनी मूसलाधार बारिश", "उष्णकटिबंधीय गर्मी", "उष्णकटिबंधीय चक्रवात"],
    heat: ["आरामदायक", "सामान्य", "गर्म", "ख़तरा", "अत्यधिक ख़तरा", "सावधानी", "अत्यधिक सावधानी"],
    dew: ["शुष्क", "आरामदायक", "थोड़ी नमी", "नम", "उमस भरा"],
    uv: ["कम", "मध्यम", "उच्च", "बहुत उच्च", "अत्यधिक"],
    trend: ["स्थिर", "गिर रहा", "तेज़ी से गिर रहा", "बढ़ रहा", "तेज़ी से बढ़ रहा"],
    tab: ["प्रति घंटा", "8 दिन", "ज्वार", "स्रोत", "रडार"],
    bft: ["शांत", "हल्की हवा", "हल्का झोंका", "मंद समीर", "मध्यम समीर", "ताज़ा समीर", "तेज़ समीर", "लगभग आंधी", "आंधी", "तेज़ आंधी", "तूफ़ान", "भीषण तूफ़ान", "हरिकेन"],
    flat: ["पूर्वानुमान लोड हो रहा है …", "बारिश की संभावना नहीं · अगले 12 घंटे अधिकतम {p} %", "अभी बारिश संभव", "{t} से बारिश", "{t} तक", "लगभग {t}", "24 घंटे से आगे", "शिखर {p} %", "तापमान", "हवा", "नमी", "वायुदाब", "मापा गया", "स्थानीय", "मेल खाते", "अभी", "आज", "बारिश की संभावना", "झोंके", "ज्वार एंटिटी कॉन्फ़िगर नहीं है (tide:)।", "चढ़ रहा", "उतर रहा", "ज्वार", "भाटा", "ज्वार", "भाटा", "एंटिटी {e} नहीं मिली", "मौसम", "{h} घं {m} मि दिन का उजाला बाकी", "सूर्योदय में {h} घं {m} मि", "धूसर बिंदु = मौसम मॉडल, सुनहरा = आपका अपना सेंसर। \"मेल खाते\" का अर्थ है सभी मान सहनशीलता के भीतर हैं।", "महसूस", "ताप सूचकांक", "उमस", "आज अधिकतम UV", "बिजली", "{d} से", "{n} बार", "आसपास कोई नहीं", "समुद्र", "पानी का तापमान", "ज्वार-भाटा", "{d} किमी दूर", "{d} की ओर", "रडार कार्ड लोड नहीं हो सका", "अगले 24 घंटे", "अधिकतम"],
  },
  bn: {
    cond: ["পরিষ্কার রাত", "মেঘলা", "তীব্র আবহাওয়া", "কুয়াশা", "শিলাবৃষ্টি", "বজ্রঝড়", "বৃষ্টিসহ বজ্রঝড়", "আংশিক মেঘলা", "ভারী বৃষ্টি", "বৃষ্টি", "তুষার", "বৃষ্টি ও তুষার", "রৌদ্রোজ্জ্বল", "ঝোড়ো হাওয়া", "ঝোড়ো হাওয়া ও মেঘলা", "মৌসুমি ভারী বর্ষণ", "গ্রীষ্মমণ্ডলীয় গরম", "ঘূর্ণিঝড়"],
    heat: ["আরামদায়ক", "স্বাভাবিক", "গরম", "বিপজ্জনক", "অত্যন্ত বিপজ্জনক", "সতর্কতা", "বিশেষ সতর্কতা"],
    dew: ["শুষ্ক", "আরামদায়ক", "সামান্য আর্দ্র", "আর্দ্র", "ভ্যাপসা"],
    uv: ["নিম্ন", "মাঝারি", "উচ্চ", "অতি উচ্চ", "চরম"],
    trend: ["স্থির", "কমছে", "দ্রুত কমছে", "বাড়ছে", "দ্রুত বাড়ছে"],
    tab: ["প্রতি ঘণ্টা", "8 দিন", "জোয়ার-ভাটা", "উৎস", "রাডার"],
    bft: ["শান্ত", "মৃদু বাতাস", "হালকা বাতাস", "মৃদুমন্দ বাতাস", "মাঝারি বাতাস", "তাজা বাতাস", "প্রবল বাতাস", "প্রায় ঝড়", "ঝড়", "প্রবল ঝড়", "ঝঞ্ঝা", "প্রচণ্ড ঝঞ্ঝা", "হারিকেন"],
    flat: ["পূর্বাভাস লোড হচ্ছে …", "বৃষ্টির সম্ভাবনা নেই · আগামী 12 ঘণ্টায় সর্বোচ্চ {p} %", "এখন বৃষ্টি হতে পারে", "{t} থেকে বৃষ্টি", "{t} পর্যন্ত", "প্রায় {t}", "24 ঘণ্টার পরে", "সর্বোচ্চ {p} %", "তাপমাত্রা", "বাতাস", "আর্দ্রতা", "বায়ুচাপ", "পরিমাপকৃত", "স্থানীয়", "মিলছে", "এখন", "আজ", "বৃষ্টির সম্ভাবনা", "দমকা হাওয়া", "জোয়ারের এনটিটি কনফিগার করা নেই (tide:)।", "বাড়ছে", "নামছে", "জোয়ার", "ভাটা", "জোয়ার", "ভাটা", "এনটিটি {e} পাওয়া যায়নি", "আবহাওয়া", "দিনের আলো বাকি {h} ঘ {m} মি", "সূর্যোদয়ের {h} ঘ {m} মি বাকি", "ধূসর বিন্দু = আবহাওয়া মডেল, সোনালি = আপনার নিজের সেন্সর। \"মিলছে\" মানে সব মান সহনসীমার মধ্যে।", "অনুভূত", "তাপ সূচক", "ভ্যাপসা ভাব", "আজ সর্বোচ্চ UV", "বজ্রপাত", "{d} থেকে", "{n} বার", "কাছাকাছি নেই", "সমুদ্র", "পানির তাপমাত্রা", "জোয়ার-ভাটা", "{d} কিমি দূরে", "{d} দিকে", "রাডার কার্ড লোড করা যায়নি", "আগামী 24 ঘণ্টা", "সর্বোচ্চ"],
  },
  ne: {
    cond: ["सफा रात", "बादल लागेको", "गम्भीर मौसम", "हुस्सु", "असिना", "चट्याङसहितको आँधी", "वर्षासहित चट्याङ", "आंशिक बादल", "भारी वर्षा", "वर्षा", "हिउँ", "हिउँमिश्रित वर्षा", "घमाइलो", "हावाहुरी", "हावाहुरी र बादल", "मनसुनी मुसलधारे वर्षा", "उष्ण गर्मी", "उष्णकटिबन्धीय चक्रवात"],
    heat: ["आरामदायी", "सामान्य", "गर्मी", "खतरा", "अत्यन्त खतरा", "सावधानी", "विशेष सावधानी"],
    dew: ["सुख्खा", "आरामदायी", "अलि ओसिलो", "ओसिलो", "उकुसमुकुस"],
    uv: ["न्यून", "मध्यम", "उच्च", "धेरै उच्च", "अत्यधिक"],
    trend: ["स्थिर", "घट्दै", "छिटो घट्दै", "बढ्दै", "छिटो बढ्दै"],
    tab: ["प्रति घण्टा", "8 दिन", "ज्वारभाटा", "स्रोत", "रडार"],
    bft: ["शान्त", "अति मन्द हावा", "मन्द हावा", "हल्का हावा", "मध्यम हावा", "ताजा हावा", "बलियो हावा", "लगभग आँधी", "आँधी", "बलियो आँधी", "तुफान", "भीषण तुफान", "हरिकेन"],
    flat: ["पूर्वानुमान लोड हुँदैछ …", "वर्षा अपेक्षित छैन · अर्को 12 घण्टा अधिकतम {p} %", "अहिले वर्षा सम्भव", "{t} बाट वर्षा", "{t} सम्म", "लगभग {t}", "24 घण्टाभन्दा पछि", "उच्चतम {p} %", "तापक्रम", "हावा", "आर्द्रता", "वायुचाप", "मापन गरिएको", "स्थानीय", "मिल्छ", "अहिले", "आज", "वर्षाको सम्भावना", "हावाको झोक्का", "ज्वारभाटा एन्टिटी कन्फिगर गरिएको छैन (tide:)।", "बढ्दै", "घट्दै", "ज्वार", "भाटा", "ज्वार", "भाटा", "एन्टिटी {e} भेटिएन", "मौसम", "दिनको उज्यालो {h} घ {m} मि बाँकी", "सूर्योदयसम्म {h} घ {m} मि", "खैरो थोप्ला = मौसम मोडेल, सुनौलो = तपाईंको आफ्नै सेन्सर। \"मिल्छ\" को अर्थ सबै मान सहनसीमाभित्र छन्।", "महसुस", "ताप सूचकांक", "उकुसमुकुस", "आज अधिकतम UV", "चट्याङ", "{d} बाट", "{n} पटक", "नजिक छैन", "समुद्र", "पानीको तापक्रम", "ज्वारभाटा", "{d} किमी टाढा", "{d} तर्फ", "रडार कार्ड लोड गर्न सकिएन", "अर्को 24 घण्टा", "अधिकतम"],
  },
  si: {
    cond: ["පැහැදිලි රාත්‍රිය", "වලාකුළු සහිත", "දැඩි කාලගුණය", "මීදුම", "හිම කැට", "ගිගුරුම් සහිත කුණාටු", "වැසි සහිත ගිගුරුම්", "අර්ධ වශයෙන් වලාකුළු", "තද වැසි", "වැසි", "හිම", "හිම සහිත වැසි", "හිරු එළිය", "සුළං සහිත", "සුළං සහ වලාකුළු", "මෝසම් තද වැසි", "නිවර්තන උෂ්ණත්වය", "නිවර්තන සුළි කුණාටුව"],
    heat: ["සුවපහසු", "සාමාන්‍ය", "උණුසුම්", "අනතුරුදායක", "අතිශය අනතුරුදායක", "අවධානයෙන්", "දැඩි අවධානයෙන්"],
    dew: ["වියළි", "සුවපහසු", "තරමක් තෙතමනය", "තෙතමනය", "අපහසු උණුසුම"],
    uv: ["අඩු", "මධ්‍යම", "ඉහළ", "ඉතා ඉහළ", "අධික"],
    trend: ["ස්ථාවර", "පහත වැටේ", "ශීඝ්‍රයෙන් පහත වැටේ", "ඉහළ යයි", "ශීඝ්‍රයෙන් ඉහළ යයි"],
    tab: ["පැයෙන් පැය", "දින 8", "උදම", "මූලාශ්‍ර", "රේඩාර්"],
    bft: ["නිසල", "ඉතා මඳ සුළං", "මඳ සුළං", "සෞම්‍ය සුළං", "මධ්‍යම සුළං", "නැවුම් සුළං", "තද සුළං", "කුණාටු ආසන්න", "කුණාටු සුළං", "තද කුණාටු සුළං", "කුණාටුව", "දරුණු කුණාටුව", "සුළි කුණාටුව"],
    flat: ["අනාවැකි පූරණය වෙමින් …", "වැසි අපේක්ෂා නොකෙරේ · ඊළඟ පැය 12 උපරිම {p} %", "දැන් වැසි ඇති විය හැක", "{t} සිට වැසි", "{t} දක්වා", "දළ වශයෙන් {t}", "පැය 24 ඉක්මවා", "උපරිම {p} %", "උෂ්ණත්වය", "සුළඟ", "ආර්ද්‍රතාවය", "වායු පීඩනය", "මැනූ", "දේශීය", "ගැළපේ", "දැන්", "අද", "වැසි සම්භාවිතාව", "සුළං රැල්ල", "උදම් entity සකසා නැත (tide:).", "ඉහළ යයි", "පහළ යයි", "උදම", "බාදිය", "උදම", "බාදිය", "entity {e} සොයාගත නොහැක", "කාලගුණය", "දිවා ආලෝකය පැය {h} මිනි {m} ඉතිරියි", "හිරු උදාවට පැය {h} මිනි {m}", "අළු තිත් = කාලගුණ ආකෘති, රන්වන් = ඔබේම සංවේදකය. \"ගැළපේ\" යනු සියලු අගයන් ඉවසීම් සීමාව තුළ ඇති බවයි.", "දැනෙන්නේ", "තාප දර්ශකය", "අපහසු උණුසුම", "අද උපරිම UV", "අකුණු", "{d} සිට", "{n} වතාවක්", "අසල නැත", "මුහුද", "ජල උෂ්ණත්වය", "උදම", "කි.මී. {d} දුරින්", "{d} දෙසට", "රේඩාර් කාඩ්පත පූරණය කළ නොහැක", "ඊළඟ පැය 24", "උපරිම"],
  },
  ta: {
    cond: ["தெளிவான இரவு", "மேகமூட்டம்", "கடும் வானிலை", "மூடுபனி", "ஆலங்கட்டி", "இடியுடன் கூடிய புயல்", "இடி மழை", "ஓரளவு மேகமூட்டம்", "கனமழை", "மழை", "பனி", "பனியுடன் மழை", "வெயில்", "காற்று வீசும்", "காற்றுடன் மேகமூட்டம்", "பருவமழை கனமழை", "வெப்பமண்டல வெப்பம்", "வெப்பமண்டல சூறாவளி"],
    heat: ["இதமானது", "இயல்பு", "வெப்பம்", "ஆபத்து", "மிகுந்த ஆபத்து", "எச்சரிக்கை", "மிகுந்த எச்சரிக்கை"],
    dew: ["உலர்ந்த", "இதமானது", "சற்று ஈரப்பதம்", "ஈரப்பதம்", "புழுக்கம்"],
    uv: ["குறைவு", "மிதமான", "அதிகம்", "மிக அதிகம்", "தீவிரம்"],
    trend: ["நிலையானது", "குறைகிறது", "வேகமாகக் குறைகிறது", "அதிகரிக்கிறது", "வேகமாக அதிகரிக்கிறது"],
    tab: ["மணிநேரம்", "8 நாட்கள்", "அலைகள்", "மூலங்கள்", "ரேடார்"],
    bft: ["அமைதி", "மிக மெல்லிய காற்று", "மெல்லிய காற்று", "இளங்காற்று", "மிதமான காற்று", "புதிய காற்று", "பலத்த காற்று", "கிட்டத்தட்ட புயல்", "புயல் காற்று", "கடும் புயல் காற்று", "புயல்", "கடும் புயல்", "சூறாவளி"],
    flat: ["முன்னறிவிப்பு ஏற்றப்படுகிறது …", "மழை எதிர்பார்க்கப்படவில்லை · அடுத்த 12 மணி அதிகபட்சம் {p} %", "இப்போது மழை வாய்ப்பு", "{t} முதல் மழை", "{t} வரை", "சுமார் {t}", "24 மணிக்கு மேல்", "உச்சம் {p} %", "வெப்பநிலை", "காற்று", "ஈரப்பதம்", "காற்றழுத்தம்", "அளவிடப்பட்டது", "உள்ளூர்", "ஒத்துப்போகிறது", "இப்போது", "இன்று", "மழை வாய்ப்பு", "காற்று வீச்சு", "அலை entity அமைக்கப்படவில்லை (tide:).", "ஏறுகிறது", "இறங்குகிறது", "உயர் அலை", "தாழ் அலை", "உயர் அலை", "தாழ் அலை", "entity {e} கிடைக்கவில்லை", "வானிலை", "பகல் வெளிச்சம் {h} ம {m} நி மீதம்", "சூரிய உதயத்திற்கு {h} ம {m} நி", "சாம்பல் புள்ளிகள் = வானிலை மாதிரிகள், தங்கம் = உங்கள் சொந்த சென்சார். \"ஒத்துப்போகிறது\" என்றால் எல்லா மதிப்புகளும் வரம்புக்குள் உள்ளன.", "உணர்வு", "வெப்பக் குறியீடு", "புழுக்கம்", "இன்று அதிகபட்ச UV", "மின்னல்", "{d} இலிருந்து", "{n} முறை", "அருகில் இல்லை", "கடல்", "நீர் வெப்பநிலை", "அலைகள்", "{d} கிமீ தொலைவில்", "{d} திசையில்", "ரேடார் அட்டையை ஏற்ற முடியவில்லை", "அடுத்த 24 மணி", "அதிகபட்சம்"],
  },
};

// v0.9 additions: tropical day insights and thunderstorm tracking (same order as I18N_KEYS.extra)
const I18N_EXTRA = {
  "en": ["Asphalt / paws", "OK for walks", "Hot – keep walks short", "Too hot for paws", "walks from {t}", "Best time outside", "No good window", "Laundry", "dries until {t}", "dries all day", "won't dry outside", "tomorrow", "Mosquitoes", "most bites {t}", "Thunderstorm approaching from {d} · overhead in ~{m} min", "moving away", "not moving closer", "Stay indoors until {t} (30/30 rule)", "Peak biting time now", "next peak {t}"],
  "de": ["Asphalt / Pfoten", "OK für Gassi", "Heiß – nur kurz raus", "Zu heiß für Pfoten", "Gassi ab {t}", "Beste Zeit draußen", "Kein gutes Fenster", "Wäsche", "trocknet bis {t}", "trocknet den ganzen Tag", "trocknet draußen nicht", "morgen", "Mücken", "meiste Stiche {t}", "Gewitter zieht aus {d} heran · in ca. {m} min hier", "zieht ab", "kommt nicht näher", "Drinnen bleiben bis {t} (30/30-Regel)", "Jetzt Hauptstechzeit", "nächste Stechzeit {t}"],
  "th": ["ยางมะตอย / อุ้งเท้า", "พาเดินเล่นได้", "ร้อน – เดินสั้นๆ", "ร้อนเกินไปสำหรับอุ้งเท้า", "เดินเล่นได้ตั้งแต่ {t}", "ช่วงเวลาที่ดีที่สุดนอกบ้าน", "ไม่มีช่วงที่เหมาะ", "ตากผ้า", "แห้งได้ถึง {t}", "แห้งได้ทั้งวัน", "ตากข้างนอกไม่แห้ง", "พรุ่งนี้", "ยุง", "ยุงกัดมากช่วง {t}", "พายุฝนฟ้าคะนองกำลังเข้ามาจากทิศ {d} · ถึงในราว {m} นาที", "กำลังเคลื่อนออกไป", "ไม่ได้เข้าใกล้", "อยู่ในอาคารจนถึง {t} (กฎ 30/30)", "ตอนนี้ยุงกัดมาก", "ช่วงยุงกัดถัดไป {t}"],
  "vi": ["Mặt đường / chân thú cưng", "Đi dạo được", "Nóng – chỉ đi ngắn", "Quá nóng cho chân", "đi dạo từ {t}", "Thời điểm ra ngoài tốt nhất", "Không có khung giờ tốt", "Phơi đồ", "khô đến {t}", "khô cả ngày", "phơi ngoài không khô", "ngày mai", "Muỗi", "đốt nhiều nhất {t}", "Dông đang đến từ hướng {d} · tới đây sau ~{m} phút", "đang đi xa", "không tiến lại gần", "Ở trong nhà đến {t} (quy tắc 30/30)", "Đang là giờ muỗi đốt nhiều", "đợt đốt tiếp theo {t}"],
  "id": ["Aspal / kaki hewan", "Aman untuk jalan-jalan", "Panas – jalan singkat saja", "Terlalu panas untuk kaki", "jalan-jalan mulai {t}", "Waktu terbaik di luar", "Tidak ada waktu yang baik", "Jemuran", "kering sampai {t}", "kering seharian", "tidak akan kering di luar", "besok", "Nyamuk", "paling banyak gigitan {t}", "Badai petir mendekat dari {d} · tiba dalam ~{m} mnt", "menjauh", "tidak mendekat", "Tetap di dalam sampai {t} (aturan 30/30)", "Sekarang puncak gigitan", "puncak berikutnya {t}"],
  "ms": ["Asfalt / tapak kaki", "Selamat untuk berjalan", "Panas – jalan sekejap", "Terlalu panas untuk tapak kaki", "berjalan dari {t}", "Masa terbaik di luar", "Tiada masa yang sesuai", "Jemuran", "kering hingga {t}", "kering sepanjang hari", "tidak akan kering di luar", "esok", "Nyamuk", "paling banyak gigitan {t}", "Ribut petir menghampiri dari {d} · tiba dalam ~{m} min", "semakin menjauh", "tidak menghampiri", "Kekal di dalam hingga {t} (peraturan 30/30)", "Kini waktu puncak gigitan", "puncak seterusnya {t}"],
  "fil": ["Aspalto / paa", "Okay maglakad", "Mainit – saglit lang", "Masyadong mainit para sa paa", "lakad mula {t}", "Pinakamagandang oras sa labas", "Walang magandang oras", "Sampay", "tuyo hanggang {t}", "tuyo buong araw", "hindi matutuyo sa labas", "bukas", "Lamok", "pinakamaraming kagat {t}", "Paparating ang kulog at kidlat mula {d} · nandito sa ~{m} min", "papalayo", "hindi lumalapit", "Manatili sa loob hanggang {t} (30/30 rule)", "Rurok ng kagat ngayon", "susunod na rurok {t}"],
  "km": ["កៅស៊ូផ្លូវ / ជើងសត្វ", "ដើរលេងបាន", "ក្ដៅ – ដើរខ្លីៗ", "ក្ដៅពេកសម្រាប់ជើងសត្វ", "ដើរលេងចាប់ពី {t}", "ពេលល្អបំផុតនៅខាងក្រៅ", "គ្មានពេលល្អ", "ហាលខោអាវ", "ស្ងួតដល់ {t}", "ស្ងួតពេញមួយថ្ងៃ", "ហាលខាងក្រៅមិនស្ងួត", "ថ្ងៃស្អែក", "មូស", "ខាំច្រើនបំផុត {t}", "ផ្គររន្ទះកំពុងមកពីទិស {d} · មកដល់ប្រហែល {m} នាទី", "កំពុងរសាត់ចេញ", "មិនខិតមកជិត", "នៅក្នុងផ្ទះរហូតដល់ {t} (ច្បាប់ 30/30)", "ឥឡូវជាពេលមូសខាំខ្លាំង", "ពេលខាំខ្លាំងបន្ទាប់ {t}"],
  "lo": ["ຢາງປູທາງ / ຕີນສັດ", "ພາຍ່າງຫຼິ້ນໄດ້", "ຮ້ອນ – ຍ່າງສັ້ນໆ", "ຮ້ອນເກີນໄປສຳລັບຕີນ", "ຍ່າງຫຼິ້ນໄດ້ຕັ້ງແຕ່ {t}", "ເວລາທີ່ດີທີ່ສຸດຢູ່ນອກ", "ບໍ່ມີຊ່ວງທີ່ເໝາະ", "ຕາກເຄື່ອງ", "ແຫ້ງໄດ້ຮອດ {t}", "ແຫ້ງໄດ້ໝົດມື້", "ຕາກຂ້າງນອກບໍ່ແຫ້ງ", "ມື້ອື່ນ", "ຍຸງ", "ກັດຫຼາຍສຸດ {t}", "ພາຍຸຟ້າຮ້ອງກຳລັງມາຈາກທິດ {d} · ຮອດປະມານ {m} ນາທີ", "ກຳລັງເຄື່ອນອອກໄປ", "ບໍ່ໄດ້ເຂົ້າໃກ້", "ຢູ່ໃນເຮືອນຈົນຮອດ {t} (ກົດ 30/30)", "ຕອນນີ້ຍຸງກັດຫຼາຍ", "ຊ່ວງຍຸງກັດຕໍ່ໄປ {t}"],
  "my": ["ကတ္တရာလမ်း / ခြေဖဝါး", "လမ်းလျှောက်ရန် အဆင်ပြေ", "ပူ – ခဏသာ လျှောက်ပါ", "ခြေဖဝါးအတွက် အလွန်ပူ", "{t} မှ လမ်းလျှောက်နိုင်", "အပြင်ထွက်ရန် အကောင်းဆုံးအချိန်", "သင့်တော်သောအချိန် မရှိ", "အဝတ်လှန်း", "{t} အထိ ခြောက်မည်", "တစ်နေကုန် ခြောက်မည်", "အပြင်တွင် မခြောက်ပါ", "မနက်ဖြန်", "ခြင်", "{t} တွင် အကိုက်အများဆုံး", "{d} မှ မိုးကြိုးမုန်တိုင်း လာနေသည် · ~{m} မိနစ်အတွင်း ရောက်မည်", "ဝေးသွားနေသည်", "နီးမလာပါ", "{t} အထိ အိမ်ထဲတွင်နေပါ (30/30 စည်းမျဉ်း)", "ယခု ခြင်ကိုက်အများဆုံးအချိန်", "နောက်ကိုက်ချိန် {t}"],
  "zh-Hans": ["沥青 / 爪垫", "适合遛狗", "炎热 – 短时散步", "对爪垫太烫", "{t} 起可遛狗", "最佳户外时段", "没有合适时段", "晾衣", "可晾干至 {t}", "全天可晾干", "户外晾不干", "明天", "蚊子", "叮咬高峰 {t}", "雷暴正从{d}方向逼近 · 约 {m} 分钟后到达", "正在远离", "未靠近", "请待在室内至 {t}（30/30 规则）", "现在是叮咬高峰", "下次高峰 {t}"],
  "zh-Hant": ["瀝青 / 腳掌", "適合遛狗", "炎熱 – 短時散步", "對腳掌太燙", "{t} 起可遛狗", "最佳戶外時段", "沒有合適時段", "晾衣", "可晾乾至 {t}", "全天可晾乾", "戶外晾不乾", "明天", "蚊子", "叮咬高峰 {t}", "雷暴正從{d}方向逼近 · 約 {m} 分鐘後到達", "正在遠離", "未靠近", "請待在室內至 {t}（30/30 規則）", "現在是叮咬高峰", "下次高峰 {t}"],
  "ja": ["路面 / 肉球", "散歩OK", "暑い – 短めに", "肉球には熱すぎ", "{t} から散歩可", "外出のベストタイム", "適した時間なし", "洗濯物", "{t} まで乾く", "一日中乾く", "外では乾かない", "明日", "蚊", "刺されやすい時間 {t}", "雷雨が{d}から接近中 · 約 {m} 分で到達", "遠ざかっています", "接近していません", "{t} まで屋内に（30/30ルール）", "今が刺されやすい時間", "次のピーク {t}"],
  "ko": ["아스팔트 / 발바닥", "산책 가능", "더움 – 짧게 산책", "발바닥에 너무 뜨거움", "{t}부터 산책 가능", "외출하기 좋은 시간", "적당한 시간 없음", "빨래", "{t}까지 마름", "하루 종일 마름", "밖에서는 안 마름", "내일", "모기", "물림 최다 {t}", "뇌우가 {d} 방향에서 접근 중 · 약 {m}분 후 도달", "멀어지는 중", "접근하지 않음", "{t}까지 실내에 머무르세요 (30/30 규칙)", "지금 물림 최다 시간", "다음 최다 시간 {t}"],
  "hi": ["डामर / पंजे", "टहलने के लिए ठीक", "गर्म – छोटी सैर", "पंजों के लिए बहुत गर्म", "{t} से टहलें", "बाहर जाने का सबसे अच्छा समय", "कोई अच्छा समय नहीं", "कपड़े सुखाना", "{t} तक सूखेंगे", "पूरे दिन सूखेंगे", "बाहर नहीं सूखेंगे", "कल", "मच्छर", "सबसे ज़्यादा काटते हैं {t}", "{d} से आंधी-तूफ़ान आ रहा है · लगभग {m} मिनट में यहाँ", "दूर जा रहा है", "पास नहीं आ रहा", "{t} तक घर के अंदर रहें (30/30 नियम)", "अभी काटने का चरम समय", "अगला चरम समय {t}"],
  "bn": ["পিচ রাস্তা / থাবা", "হাঁটার জন্য ঠিক আছে", "গরম – অল্প হাঁটুন", "থাবার জন্য খুব গরম", "{t} থেকে হাঁটা যাবে", "বাইরে যাওয়ার সেরা সময়", "ভালো সময় নেই", "কাপড় শুকানো", "{t} পর্যন্ত শুকাবে", "সারাদিন শুকাবে", "বাইরে শুকাবে না", "আগামীকাল", "মশা", "সবচেয়ে বেশি কামড়ায় {t}", "{d} দিক থেকে বজ্রঝড় এগিয়ে আসছে · প্রায় {m} মিনিটে পৌঁছাবে", "দূরে সরে যাচ্ছে", "কাছে আসছে না", "{t} পর্যন্ত ঘরে থাকুন (30/30 নিয়ম)", "এখন কামড়ের সর্বোচ্চ সময়", "পরবর্তী সর্বোচ্চ সময় {t}"],
  "ne": ["पिच सडक / पन्जा", "हिँडाउन ठीक", "गर्मी – छोटो हिँडाइ", "पन्जाका लागि धेरै तातो", "{t} बाट हिँडाउनुहोस्", "बाहिर जाने उत्तम समय", "राम्रो समय छैन", "लुगा सुकाउने", "{t} सम्म सुक्छ", "दिनभर सुक्छ", "बाहिर सुक्दैन", "भोलि", "लामखुट्टे", "सबैभन्दा बढी टोक्ने {t}", "{d} बाट चट्याङसहितको आँधी नजिकिँदैछ · करिब {m} मिनेटमा यहाँ", "टाढा जाँदैछ", "नजिक आउँदैन", "{t} सम्म भित्रै बस्नुहोस् (30/30 नियम)", "अहिले टोक्ने चरम समय", "अर्को चरम समय {t}"],
  "si": ["තාර පාර / පාද", "ඇවිදීමට හොඳයි", "උණුසුම් – කෙටියෙන් ඇවිදින්න", "පාදවලට ඉතා උණුසුම්", "{t} සිට ඇවිදින්න", "එළියට යාමට හොඳම කාලය", "සුදුසු කාලයක් නැත", "රෙදි වියළීම", "{t} දක්වා වියළේ", "දවස පුරා වියළේ", "එළියේ වියළෙන්නේ නැත", "හෙට", "මදුරුවන්", "වැඩිම දෂ්ට කිරීම් {t}", "{d} දෙසින් ගිගුරුම් කුණාටුවක් ළං වෙයි · මිනි {m} කින් පමණ මෙහි", "ඈත් වෙමින්", "ළං නොවේ", "{t} දක්වා ඇතුළත සිටින්න (30/30 රීතිය)", "දැන් දෂ්ට කිරීම් වැඩිම කාලය", "ඊළඟ උපරිම කාලය {t}"],
  "ta": ["தார் சாலை / பாதம்", "நடைக்கு ஏற்றது", "வெப்பம் – குறுகிய நடை", "பாதங்களுக்கு மிகவும் சூடு", "{t} முதல் நடை", "வெளியே செல்ல சிறந்த நேரம்", "நல்ல நேரம் இல்லை", "துணி காயவைத்தல்", "{t} வரை காயும்", "நாள் முழுவதும் காயும்", "வெளியே காயாது", "நாளை", "கொசுக்கள்", "அதிக கடி {t}", "{d} திசையிலிருந்து இடியுடன் கூடிய புயல் நெருங்குகிறது · சுமார் {m} நிமிடத்தில் இங்கே", "விலகிச் செல்கிறது", "நெருங்கவில்லை", "{t} வரை உள்ளே இருங்கள் (30/30 விதி)", "இப்போது அதிக கடி நேரம்", "அடுத்த உச்ச நேரம் {t}"],
};

// expand the compact source into nested key objects: I18N.th.cond["cloudy"], I18N.th.heat.normal, I18N.th.feels_like ...
const I18N = {};
for (const [lang, src] of Object.entries(I18N_SRC)) {
  const o = {};
  for (const g of ["cond", "heat", "dew", "uv", "trend", "tab"]) { o[g] = {}; I18N_KEYS[g].forEach((k, i) => { if (src[g] && src[g][i] !== undefined) o[g][k] = src[g][i]; }); }
  if (src.bft) o.bft = src.bft;
  I18N_KEYS.flat.forEach((k, i) => { if (src.flat && src.flat[i] !== undefined) o[k] = src.flat[i]; });
  I18N_KEYS.extra.forEach((k, i) => { const ex = I18N_EXTRA[lang]; if (ex && ex[i] !== undefined) o[k] = ex[i]; });
  I18N[lang] = o;
}

let LANG = "en";
const INTL_LOCALE = { "zh-Hans": "zh-CN", "zh-Hant": "zh-TW" };
function resolveLang(l) {
  l = String(l || "en");
  if (I18N[l]) return l;
  const lo = l.toLowerCase();
  if (lo.startsWith("zh")) return /hant|tw|hk|mo/.test(lo) ? "zh-Hant" : "zh-Hans";
  if (lo === "tl") return "fil";
  const b = lo.split(/[-_]/)[0];
  return I18N[b] ? b : "en";
}
// T("group.key", {var}) - current language, English fallback, {name} placeholders
function T(key, vars) {
  const get = (d) => key.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), d);
  let v = get(I18N[LANG]);
  if (v === undefined) v = get(I18N.en);
  if (v === undefined) return key;
  if (vars) for (const k in vars) v = String(v).split("{" + k + "}").join(vars[k]);
  return v;
}
const COMPASS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

// solar elevation in degrees (NOAA low-precision formulas, good to ~0.5 deg)
function sunElevation(t, lat, lon) {
  const rad = Math.PI / 180, d = t / 86400000 - 10957.5;
  const g = (357.529 + 0.98560028 * d) * rad, q = 280.459 + 0.98564736 * d;
  const L = (q + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * rad, e = (23.439 - 0.00000036 * d) * rad;
  const ra = Math.atan2(Math.cos(e) * Math.sin(L), Math.cos(L)), dec = Math.asin(Math.sin(e) * Math.sin(L));
  const gmst = (18.697374558 + 24.06570982441908 * d) % 24;
  const ha = (gmst * 15 + lon) * rad - ra;
  return Math.asin(Math.sin(lat * rad) * Math.sin(dec) + Math.cos(lat * rad) * Math.cos(dec) * Math.cos(ha)) / rad;
}
// global horizontal irradiance W/m2: Haurwitz clear sky, reduced by cloud cover (Kasten-Czeplak)
function irradiance(elev, cloudPct) {
  if (elev <= 0) return 0;
  const s = Math.sin(elev * Math.PI / 180);
  return 1098 * s * Math.exp(-0.057 / s) * (1 - 0.75 * Math.pow(clamp((cloudPct ?? 50) / 100, 0, 1), 3.4));
}
// sun-heated asphalt surface: rises with irradiance, cooled by wind
function asphaltTemp(air, g, wind) { return air + (0.033 * g) / (1 + (wind || 0) / 30); }

function num(v) { const n = parseFloat(v); return Number.isFinite(n) ? n : null; }
function median(a) { const s = a.filter((x) => x !== null).sort((x, y) => x - y); if (!s.length) return null; const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

// NOAA Heat Index (Rothfusz), input/output in °C
function heatIndex(tC, rh) {
  if (tC === null || rh === null) return null;
  const T = tC * 9 / 5 + 32;
  let hi = 0.5 * (T + 61 + (T - 68) * 1.2 + rh * 0.094);
  if (hi >= 80) {
    hi = -42.379 + 2.04901523 * T + 10.14333127 * rh - 0.22475541 * T * rh - 0.00683783 * T * T
      - 0.05481717 * rh * rh + 0.00122874 * T * T * rh + 0.00085282 * T * rh * rh - 0.00000199 * T * T * rh * rh;
    if (rh < 13 && T >= 80 && T <= 112) hi -= ((13 - rh) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17);
    if (rh > 85 && T >= 80 && T <= 87) hi += ((rh - 85) / 10) * ((87 - T) / 5);
  }
  return (hi - 32) * 5 / 9;
}
// Heat stress bands adapted to the local climate: what is "extreme caution" in Europe is a normal day in the tropics.
// zone: "tropical" (|lat| < 23.5), "subtropical" (< 35), "temperate"; overridable with climate: in the card config
const HEAT_BANDS = {
  tropical:    [[32, "comfortable", "#4caf50"], [38, "normal", "#8bc34a"], [42, "hot", "#ffa000"], [48, "danger", "#f4511e"], [Infinity, "extreme_danger", "#d50000"]],
  subtropical: [[29, "comfortable", "#4caf50"], [34, "normal", "#8bc34a"], [40, "hot", "#ffa000"], [50, "danger", "#f4511e"], [Infinity, "extreme_danger", "#d50000"]],
  temperate:   [[27, "comfortable", "#4caf50"], [32, "caution", "#c0ca33"], [41, "extreme_caution", "#ffa000"], [54, "danger", "#f4511e"], [Infinity, "extreme_danger", "#d50000"]],
};
function climateZone(lat) {
  const a = Math.abs(num(lat) ?? 0);
  return a < 23.5 ? "tropical" : a < 35 ? "subtropical" : "temperate";
}
function heatLevel(hi, zone = "temperate") {
  if (hi === null) return { t: "–", c: "#888", hot: false };
  const bands = HEAT_BANDS[zone] || HEAT_BANDS.temperate;
  const i = bands.findIndex((b) => hi < b[0]);
  return { t: T("heat." + bands[i][1]), c: bands[i][2], hot: i >= 2 };
}
function dewLevel(dp) {
  if (dp === null) return "–";
  if (dp < 16) return T("dew.dry");
  if (dp < 19) return T("dew.comfortable");
  if (dp < 21) return T("dew.slightly_humid");
  if (dp < 24) return T("dew.humid");
  return T("dew.oppressive");
}
function uvLevel(uv) {
  if (uv === null) return { t: "–", c: "#888" };
  if (uv < 3) return { t: T("uv.low"), c: "#4caf50" };
  if (uv < 6) return { t: T("uv.moderate"), c: "#fdd835" };
  if (uv < 8) return { t: T("uv.high"), c: "#fb8c00" };
  if (uv < 11) return { t: T("uv.very_high"), c: "#e53935" };
  return { t: T("uv.extreme"), c: "#8e24aa" };
}

// Weather icon pack (animated SVG), rendered as data: URIs so ids and SMIL animations stay isolated
const WX_ICONS = {
  "clear-night": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Clear Night\"><defs><radialGradient id=\"wx-night-halo\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#60a5fa\" stop-opacity=\"0.35\"/><stop offset=\"65%\" stop-color=\"#3b82f6\" stop-opacity=\"0.1\"/><stop offset=\"100%\" stop-color=\"#1e3a8a\" stop-opacity=\"0\"/></radialGradient><linearGradient id=\"wx-moon-grad\" x1=\"15%\" y1=\"10%\" x2=\"85%\" y2=\"90%\"><stop offset=\"0%\" stop-color=\"#fef9c3\"/><stop offset=\"55%\" stop-color=\"#fde047\"/><stop offset=\"100%\" stop-color=\"#eab308\"/></linearGradient></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"url(#wx-night-halo)\"/><g fill=\"#e0f2fe\"><path d=\"M47 13 L48.3 16.7 L52 18 L48.3 19.3 L47 23 L45.7 19.3 L42 18 L45.7 16.7 Z\"><animate attributeName=\"opacity\" values=\"0.3;1;0.3\" dur=\"2.8s\" repeatCount=\"indefinite\"/></path><path d=\"M51 31 L51.9 33.6 L54.5 34.5 L51.9 35.4 L51 38 L50.1 35.4 L47.5 34.5 L50.1 33.6 Z\"><animate attributeName=\"opacity\" values=\"1;0.25;1\" dur=\"3.4s\" repeatCount=\"indefinite\"/></path><circle cx=\"16\" cy=\"18\" r=\"1.3\"><animate attributeName=\"opacity\" values=\"0.2;0.95;0.2\" dur=\"2.2s\" repeatCount=\"indefinite\"/></circle></g><g><animateTransform attributeName=\"transform\" type=\"rotate\" values=\"-3 32 32;3 32 32;-3 32 32\" dur=\"6s\" repeatCount=\"indefinite\"/><path d=\"M35.5 14.5 A17 17 0 1 0 49.5 39.5 A13.5 13.5 0 1 1 35.5 14.5 Z\" fill=\"url(#wx-moon-grad)\" stroke=\"#fef9c3\" stroke-width=\"0.7\" stroke-linejoin=\"round\"/></g></svg>",
  "cloudy": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Cloudy\"><defs><linearGradient id=\"wx-cld-back\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#cbd5e1\"/><stop offset=\"100%\" stop-color=\"#64748b\"/></linearGradient><linearGradient id=\"wx-cld-front\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#f8fafc\"/><stop offset=\"60%\" stop-color=\"#cbd5e1\"/><stop offset=\"100%\" stop-color=\"#94a3b8\"/></linearGradient></defs><g opacity=\"0.85\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"1.5 0;-1.5 0;1.5 0\" dur=\"6.5s\" repeatCount=\"indefinite\"/><path d=\"M26 36 H50 A7.5 7.5 0 0 0 49 21.2 A10 10 0 0 0 30 19 A8 8 0 0 0 26 36 Z\" fill=\"url(#wx-cld-back)\"/></g><g><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-1.8 0;1.8 0;-1.8 0\" dur=\"5.2s\" repeatCount=\"indefinite\"/><path d=\"M16 48 H46 A10 10 0 0 0 44.5 28.2 A13.5 13.5 0 0 0 19 25.5 A11 11 0 0 0 16 48 Z\" fill=\"url(#wx-cld-front)\" stroke=\"#e2e8f0\" stroke-width=\"0.8\"/><path d=\"M21 30 A9.5 9.5 0 0 1 36.5 26\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"1.5\" stroke-linecap=\"round\" opacity=\"0.85\"/></g></svg>",
  "exceptional": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Severe Weather Alert\"><defs><radialGradient id=\"wx-exc-halo\" cx=\"50%\" cy=\"52%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#ef4444\" stop-opacity=\"0.45\"/><stop offset=\"100%\" stop-color=\"#ef4444\" stop-opacity=\"0\"/></radialGradient><linearGradient id=\"wx-exc-tri\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#facc15\"/><stop offset=\"50%\" stop-color=\"#f97316\"/><stop offset=\"100%\" stop-color=\"#dc2626\"/></linearGradient></defs><circle cx=\"32\" cy=\"34\" r=\"26\" fill=\"url(#wx-exc-halo)\"><animate attributeName=\"opacity\" values=\"0.4;1;0.4\" dur=\"1.4s\" repeatCount=\"indefinite\"/></circle><path d=\"M32 11 L54 49 A2.5 2.5 0 0 1 51.8 52.8 H12.2 A2.5 2.5 0 0 1 10 49 Z\" fill=\"none\" stroke=\"url(#wx-exc-tri)\" stroke-width=\"3.4\" stroke-linejoin=\"round\"/><rect x=\"30.2\" y=\"24\" width=\"3.6\" height=\"14\" rx=\"1.8\" fill=\"#fef08a\"/><circle cx=\"32\" cy=\"44\" r=\"2.2\" fill=\"#fef08a\"/></svg>",
  "fog": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Fog and Tropical Haze\"><defs><linearGradient id=\"wx-fog-cld\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#e2e8f0\"/><stop offset=\"100%\" stop-color=\"#94a3b8\"/></linearGradient><linearGradient id=\"wx-fog-bar\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\"><stop offset=\"0%\" stop-color=\"#38bdf8\" stop-opacity=\"0.15\"/><stop offset=\"50%\" stop-color=\"#bae6fd\" stop-opacity=\"0.95\"/><stop offset=\"100%\" stop-color=\"#38bdf8\" stop-opacity=\"0.15\"/></linearGradient></defs><path d=\"M17 34 H47 A9 9 0 0 0 45.5 16.2 A12 12 0 0 0 22 14 A10 10 0 0 0 17 34 Z\" fill=\"url(#wx-fog-cld)\" opacity=\"0.9\"/><g stroke=\"url(#wx-fog-bar)\" stroke-width=\"3.2\" stroke-linecap=\"round\"><line x1=\"12\" y1=\"40\" x2=\"52\" y2=\"40\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-2.5 0;2.5 0;-2.5 0\" dur=\"4.2s\" repeatCount=\"indefinite\"/></line><line x1=\"16\" y1=\"46.5\" x2=\"48\" y2=\"46.5\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"2.5 0;-2.5 0;2.5 0\" dur=\"3.6s\" repeatCount=\"indefinite\"/></line><line x1=\"10\" y1=\"53\" x2=\"54\" y2=\"53\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-2 0;2 0;-2 0\" dur=\"4.8s\" repeatCount=\"indefinite\"/></line></g></svg>",
  "hail": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Hail\"><defs><linearGradient id=\"wx-hail-cld\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#64748b\"/><stop offset=\"60%\" stop-color=\"#334155\"/><stop offset=\"100%\" stop-color=\"#0f172a\"/></linearGradient></defs><path d=\"M16 36 H47 A9.5 9.5 0 0 0 45.5 17.2 A13 13 0 0 0 21 14.5 A10.5 10.5 0 0 0 16 36 Z\" fill=\"url(#wx-hail-cld)\" stroke=\"#94a3b8\" stroke-width=\"0.8\"/><g fill=\"#bae6fd\" stroke=\"#ffffff\" stroke-width=\"0.6\"><polygon points=\"22,40 24.5,43 22,46 19.5,43\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 -2;-2 11\" dur=\"0.6s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.6s\" repeatCount=\"indefinite\"/></polygon><polygon points=\"32,40 34.5,43 32,46 29.5,43\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 -2;-2 11\" dur=\"0.6s\" begin=\"0.2s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.6s\" begin=\"0.2s\" repeatCount=\"indefinite\"/></polygon><polygon points=\"42,40 44.5,43 42,46 39.5,43\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 -2;-2 11\" dur=\"0.6s\" begin=\"0.4s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.6s\" begin=\"0.4s\" repeatCount=\"indefinite\"/></polygon></g></svg>",
  "lightning-rainy": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Thunderstorm with Rain\"><defs><linearGradient id=\"wx-lr-cld\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#475569\"/><stop offset=\"55%\" stop-color=\"#1e1b4b\"/><stop offset=\"100%\" stop-color=\"#090514\"/></linearGradient><linearGradient id=\"wx-lr-bolt\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#fef9c3\"/><stop offset=\"50%\" stop-color=\"#facc15\"/><stop offset=\"100%\" stop-color=\"#f97316\"/></linearGradient></defs><path d=\"M15 35 H48 A9.5 9.5 0 0 0 46.5 16.2 A13 13 0 0 0 21 13.5 A10.5 10.5 0 0 0 15 35 Z\" fill=\"url(#wx-lr-cld)\" stroke=\"#6366f1\" stroke-width=\"0.7\"/><g stroke=\"#38bdf8\" stroke-width=\"2.2\" stroke-linecap=\"round\"><line x1=\"21\" y1=\"39\" x2=\"18\" y2=\"48\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 -2;-3 9\" dur=\"0.65s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.65s\" repeatCount=\"indefinite\"/></line><line x1=\"43\" y1=\"39\" x2=\"40\" y2=\"48\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 -2;-3 9\" dur=\"0.65s\" begin=\"0.32s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.65s\" begin=\"0.32s\" repeatCount=\"indefinite\"/></line></g><g><animate attributeName=\"opacity\" values=\"1;0.15;1;0.2;1\" dur=\"1.9s\" repeatCount=\"indefinite\"/><polygon points=\"34,26 25,40 31.5,40 28,55 40,37.5 33,37.5\" fill=\"url(#wx-lr-bolt)\" stroke=\"#fef08a\" stroke-width=\"0.6\" stroke-linejoin=\"round\"/></g></svg>",
  "lightning": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Lightning\"><defs><linearGradient id=\"wx-lgt-cld\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#475569\"/><stop offset=\"50%\" stop-color=\"#1e1b4b\"/><stop offset=\"100%\" stop-color=\"#090514\"/></linearGradient><linearGradient id=\"wx-lgt-bolt\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#fef9c3\"/><stop offset=\"50%\" stop-color=\"#facc15\"/><stop offset=\"100%\" stop-color=\"#f97316\"/></linearGradient></defs><path d=\"M15 36 H48 A9.5 9.5 0 0 0 46.5 17.2 A13 13 0 0 0 21 14.5 A10.5 10.5 0 0 0 15 36 Z\" fill=\"url(#wx-lgt-cld)\" stroke=\"#6366f1\" stroke-width=\"0.7\"/><g><animate attributeName=\"opacity\" values=\"1;0.2;1;0.15;0.95;1\" dur=\"2.1s\" repeatCount=\"indefinite\"/><polygon points=\"34,26 24,41 31,41 27,56 41,38 33,38\" fill=\"url(#wx-lgt-bolt)\" stroke=\"#fef08a\" stroke-width=\"0.6\" stroke-linejoin=\"round\"/></g></svg>",
  "partlycloudy": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Partly Cloudy\"><defs><linearGradient id=\"wx-pc-sun\" x1=\"20%\" y1=\"15%\" x2=\"85%\" y2=\"85%\"><stop offset=\"0%\" stop-color=\"#fef08a\"/><stop offset=\"50%\" stop-color=\"#facc15\"/><stop offset=\"100%\" stop-color=\"#ea580c\"/></linearGradient><linearGradient id=\"wx-pc-cloud\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#ffffff\"/><stop offset=\"65%\" stop-color=\"#e2e8f0\"/><stop offset=\"100%\" stop-color=\"#94a3b8\"/></linearGradient></defs><g><g stroke=\"#facc15\" stroke-width=\"2.2\" stroke-linecap=\"round\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 23 23\" to=\"360 23 23\" dur=\"26s\" repeatCount=\"indefinite\"/><line x1=\"23\" y1=\"6\" x2=\"23\" y2=\"10\"/><line x1=\"23\" y1=\"36\" x2=\"23\" y2=\"40\"/><line x1=\"6\" y1=\"23\" x2=\"10\" y2=\"23\"/><line x1=\"36\" y1=\"23\" x2=\"40\" y2=\"23\"/><line x1=\"11\" y1=\"11\" x2=\"13.8\" y2=\"13.8\"/><line x1=\"32.2\" y1=\"32.2\" x2=\"35\" y2=\"35\"/><line x1=\"35\" y1=\"11\" x2=\"32.2\" y2=\"13.8\"/><line x1=\"13.8\" y1=\"32.2\" x2=\"11\" y2=\"35\"/></g><circle cx=\"23\" cy=\"23\" r=\"9.5\" fill=\"url(#wx-pc-sun)\"/></g><g><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-1.5 0;1.5 0;-1.5 0\" dur=\"5s\" repeatCount=\"indefinite\"/><path d=\"M20 49 H47 A9.5 9.5 0 0 0 45.5 30.2 A13 13 0 0 0 21 27.5 A10.5 10.5 0 0 0 20 49 Z\" fill=\"url(#wx-pc-cloud)\" stroke=\"#cbd5e1\" stroke-width=\"0.8\"/><path d=\"M23 32 A9 9 0 0 1 38 28\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"1.5\" stroke-linecap=\"round\" opacity=\"0.8\"/></g></svg>",
  "pouring": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Pouring Rain\"><defs><linearGradient id=\"wx-pour-cld\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#64748b\"/><stop offset=\"50%\" stop-color=\"#334155\"/><stop offset=\"100%\" stop-color=\"#0f172a\"/></linearGradient><linearGradient id=\"wx-pour-drop\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#7dd3fc\"/><stop offset=\"100%\" stop-color=\"#0369a1\"/></linearGradient></defs><path d=\"M15 35 H48 A9.5 9.5 0 0 0 46.5 16.2 A13 13 0 0 0 21 13.5 A10.5 10.5 0 0 0 15 35 Z\" fill=\"url(#wx-pour-cld)\" stroke=\"#475569\" stroke-width=\"0.8\"/><g stroke=\"url(#wx-pour-drop)\" stroke-width=\"2.4\" stroke-linecap=\"round\"><line x1=\"20\" y1=\"39\" x2=\"15\" y2=\"51\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"1 -3;-4 11\" dur=\"0.55s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.55s\" repeatCount=\"indefinite\"/></line><line x1=\"28\" y1=\"39\" x2=\"23\" y2=\"51\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"1 -3;-4 11\" dur=\"0.55s\" begin=\"0.14s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.55s\" begin=\"0.14s\" repeatCount=\"indefinite\"/></line><line x1=\"36\" y1=\"39\" x2=\"31\" y2=\"51\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"1 -3;-4 11\" dur=\"0.55s\" begin=\"0.28s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.55s\" begin=\"0.28s\" repeatCount=\"indefinite\"/></line><line x1=\"44\" y1=\"39\" x2=\"39\" y2=\"51\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"1 -3;-4 11\" dur=\"0.55s\" begin=\"0.42s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.55s\" begin=\"0.42s\" repeatCount=\"indefinite\"/></line></g></svg>",
  "rainy": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Rainy\"><defs><linearGradient id=\"wx-rain-cld\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#94a3b8\"/><stop offset=\"55%\" stop-color=\"#475569\"/><stop offset=\"100%\" stop-color=\"#1e293b\"/></linearGradient><linearGradient id=\"wx-rain-drop\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#bae6fd\"/><stop offset=\"100%\" stop-color=\"#0284c7\"/></linearGradient></defs><path d=\"M16 37 H47 A9.5 9.5 0 0 0 45.5 18.2 A13 13 0 0 0 21 15.5 A10.5 10.5 0 0 0 16 37 Z\" fill=\"url(#wx-rain-cld)\" stroke=\"#64748b\" stroke-width=\"0.7\"/><g stroke=\"url(#wx-rain-drop)\" stroke-width=\"2.6\" stroke-linecap=\"round\"><line x1=\"23\" y1=\"41\" x2=\"20\" y2=\"49\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 -2;-3 10\" dur=\"0.85s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.85s\" repeatCount=\"indefinite\"/></line><line x1=\"32\" y1=\"41\" x2=\"29\" y2=\"49\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 -2;-3 10\" dur=\"0.85s\" begin=\"0.28s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.85s\" begin=\"0.28s\" repeatCount=\"indefinite\"/></line><line x1=\"41\" y1=\"41\" x2=\"38\" y2=\"49\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 -2;-3 10\" dur=\"0.85s\" begin=\"0.56s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.85s\" begin=\"0.56s\" repeatCount=\"indefinite\"/></line></g></svg>",
  "snowy-rainy": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Snowy and Rainy\"><defs><linearGradient id=\"wx-sr-cld\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#cbd5e1\"/><stop offset=\"55%\" stop-color=\"#64748b\"/><stop offset=\"100%\" stop-color=\"#334155\"/></linearGradient></defs><path d=\"M16 37 H47 A9.5 9.5 0 0 0 45.5 18.2 A13 13 0 0 0 21 15.5 A10.5 10.5 0 0 0 16 37 Z\" fill=\"url(#wx-sr-cld)\" stroke=\"#94a3b8\" stroke-width=\"0.7\"/><line x1=\"23\" y1=\"41\" x2=\"20\" y2=\"49\" stroke=\"#38bdf8\" stroke-width=\"2.4\" stroke-linecap=\"round\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 -2;-3 10\" dur=\"0.8s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.8s\" repeatCount=\"indefinite\"/></line><circle cx=\"32\" cy=\"43\" r=\"2.3\" fill=\"#e0f2fe\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"1 0;-1.5 11\" dur=\"1.7s\" begin=\"0.3s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"1.7s\" begin=\"0.3s\" repeatCount=\"indefinite\"/></circle><line x1=\"41\" y1=\"41\" x2=\"38\" y2=\"49\" stroke=\"#38bdf8\" stroke-width=\"2.4\" stroke-linecap=\"round\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 -2;-3 10\" dur=\"0.8s\" begin=\"0.4s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.8s\" begin=\"0.4s\" repeatCount=\"indefinite\"/></line></svg>",
  "snowy": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Snowy\"><defs><linearGradient id=\"wx-snw-cld\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#f1f5f9\"/><stop offset=\"60%\" stop-color=\"#cbd5e1\"/><stop offset=\"100%\" stop-color=\"#94a3b8\"/></linearGradient></defs><path d=\"M16 37 H47 A9.5 9.5 0 0 0 45.5 18.2 A13 13 0 0 0 21 15.5 A10.5 10.5 0 0 0 16 37 Z\" fill=\"url(#wx-snw-cld)\" stroke=\"#e2e8f0\" stroke-width=\"0.8\"/><g fill=\"#e0f2fe\"><circle cx=\"22\" cy=\"43\" r=\"2.3\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-1 0;1.5 11\" dur=\"1.8s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"1.8s\" repeatCount=\"indefinite\"/></circle><circle cx=\"32\" cy=\"42\" r=\"2.5\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"1 0;-1.5 12\" dur=\"2.1s\" begin=\"0.5s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"2.1s\" begin=\"0.5s\" repeatCount=\"indefinite\"/></circle><circle cx=\"42\" cy=\"43\" r=\"2.3\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-1 0;1.5 11\" dur=\"1.9s\" begin=\"1s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"1.9s\" begin=\"1s\" repeatCount=\"indefinite\"/></circle></g></svg>",
  "sunny": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Sunny\"><defs><radialGradient id=\"wx-sun-halo\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#fde047\" stop-opacity=\"0.55\"/><stop offset=\"60%\" stop-color=\"#f59e0b\" stop-opacity=\"0.18\"/><stop offset=\"100%\" stop-color=\"#f59e0b\" stop-opacity=\"0\"/></radialGradient><linearGradient id=\"wx-sun-core\" x1=\"20%\" y1=\"15%\" x2=\"80%\" y2=\"85%\"><stop offset=\"0%\" stop-color=\"#fef08a\"/><stop offset=\"45%\" stop-color=\"#facc15\"/><stop offset=\"100%\" stop-color=\"#ea580c\"/></linearGradient></defs><circle cx=\"32\" cy=\"32\" r=\"28\" fill=\"url(#wx-sun-halo)\"><animate attributeName=\"r\" values=\"25;29;25\" dur=\"4s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0.75;1;0.75\" dur=\"4s\" repeatCount=\"indefinite\"/></circle><g stroke=\"#facc15\" stroke-width=\"2.8\" stroke-linecap=\"round\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 32 32\" to=\"360 32 32\" dur=\"28s\" repeatCount=\"indefinite\"/><line x1=\"32\" y1=\"6\" x2=\"32\" y2=\"12\"/><line x1=\"32\" y1=\"52\" x2=\"32\" y2=\"58\"/><line x1=\"6\" y1=\"32\" x2=\"12\" y2=\"32\"/><line x1=\"52\" y1=\"32\" x2=\"58\" y2=\"32\"/><line x1=\"13.6\" y1=\"13.6\" x2=\"17.9\" y2=\"17.9\"/><line x1=\"46.1\" y1=\"46.1\" x2=\"50.4\" y2=\"50.4\"/><line x1=\"50.4\" y1=\"13.6\" x2=\"46.1\" y2=\"17.9\"/><line x1=\"17.9\" y1=\"46.1\" x2=\"13.6\" y2=\"50.4\"/></g><circle cx=\"32\" cy=\"32\" r=\"13.5\" fill=\"url(#wx-sun-core)\" stroke=\"#fef08a\" stroke-width=\"0.8\"/><ellipse cx=\"28\" cy=\"27\" rx=\"5\" ry=\"3\" transform=\"rotate(-25 28 27)\" fill=\"#ffffff\" opacity=\"0.45\"/></svg>",
  "tropical-cyclone": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Tropical Cyclone\"><defs><radialGradient id=\"wx-cyc-glow\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#38bdf8\" stop-opacity=\"0.45\"/><stop offset=\"70%\" stop-color=\"#6366f1\" stop-opacity=\"0.15\"/><stop offset=\"100%\" stop-color=\"#0f172a\" stop-opacity=\"0\"/></radialGradient><linearGradient id=\"wx-cyc-arm\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#e0f2fe\"/><stop offset=\"50%\" stop-color=\"#38bdf8\"/><stop offset=\"100%\" stop-color=\"#6366f1\"/></linearGradient></defs><circle cx=\"32\" cy=\"32\" r=\"27\" fill=\"url(#wx-cyc-glow)\"/><g fill=\"none\" stroke=\"url(#wx-cyc-arm)\" stroke-width=\"3.6\" stroke-linecap=\"round\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"360 32 32\" to=\"0 32 32\" dur=\"4.5s\" repeatCount=\"indefinite\"/><path d=\"M32 24 C43 24 51 31 49 42 C47 50 38 54 29 53\"/><path d=\"M32 40 C21 40 13 33 15 22 C17 14 26 10 35 11\"/><path d=\"M24 32 C24 21 31 13 42 15\"/><path d=\"M40 32 C40 43 33 51 22 49\"/></g><circle cx=\"32\" cy=\"32\" r=\"5\" fill=\"#0f172a\" stroke=\"#7dd3fc\" stroke-width=\"2\"/></svg>",
  "tropical-heat": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Tropical Heat and High UV\"><defs><radialGradient id=\"wx-heat-halo\" cx=\"50%\" cy=\"42%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#fb923c\" stop-opacity=\"0.6\"/><stop offset=\"65%\" stop-color=\"#ef4444\" stop-opacity=\"0.2\"/><stop offset=\"100%\" stop-color=\"#ef4444\" stop-opacity=\"0\"/></radialGradient><linearGradient id=\"wx-heat-core\" x1=\"20%\" y1=\"10%\" x2=\"80%\" y2=\"90%\"><stop offset=\"0%\" stop-color=\"#fef08a\"/><stop offset=\"45%\" stop-color=\"#f97316\"/><stop offset=\"100%\" stop-color=\"#dc2626\"/></linearGradient></defs><circle cx=\"32\" cy=\"27\" r=\"24\" fill=\"url(#wx-heat-halo)\"><animate attributeName=\"r\" values=\"21;25;21\" dur=\"2.6s\" repeatCount=\"indefinite\"/></circle><circle cx=\"32\" cy=\"27\" r=\"12.5\" fill=\"url(#wx-heat-core)\" stroke=\"#fef08a\" stroke-width=\"0.9\"/><g fill=\"none\" stroke=\"#fb923c\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M16 47 Q21 43 26 47 T36 47 T46 47\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 2;0 -2;0 2\" dur=\"2s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0.45;1;0.45\" dur=\"2s\" repeatCount=\"indefinite\"/></path><path d=\"M14 54 Q19 50 24 54 T34 54 T44 54 T50 54\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 -2;0 2;0 -2\" dur=\"2.3s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"1;0.4;1\" dur=\"2.3s\" repeatCount=\"indefinite\"/></path></g></svg>",
  "tropical-monsoon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Tropical Monsoon Downpour\"><defs><linearGradient id=\"wx-mon-cld\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#38bdf8\"/><stop offset=\"35%\" stop-color=\"#1e3a8a\"/><stop offset=\"100%\" stop-color=\"#090514\"/></linearGradient><linearGradient id=\"wx-mon-rain\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#e0f2fe\"/><stop offset=\"50%\" stop-color=\"#38bdf8\"/><stop offset=\"100%\" stop-color=\"#0284c7\"/></linearGradient></defs><path d=\"M14 32 H49 A9 9 0 0 0 47.5 14.2 A13 13 0 0 0 21 11.5 A10 10 0 0 0 14 32 Z\" fill=\"url(#wx-mon-cld)\" stroke=\"#38bdf8\" stroke-width=\"0.8\"/><g stroke=\"url(#wx-mon-rain)\" stroke-width=\"2.3\" stroke-linecap=\"round\"><line x1=\"20\" y1=\"35\" x2=\"13\" y2=\"49\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"2 -4;-5 10\" dur=\"0.45s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.45s\" repeatCount=\"indefinite\"/></line><line x1=\"28\" y1=\"35\" x2=\"21\" y2=\"49\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"2 -4;-5 10\" dur=\"0.45s\" begin=\"0.11s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.45s\" begin=\"0.11s\" repeatCount=\"indefinite\"/></line><line x1=\"36\" y1=\"35\" x2=\"29\" y2=\"49\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"2 -4;-5 10\" dur=\"0.45s\" begin=\"0.22s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.45s\" begin=\"0.22s\" repeatCount=\"indefinite\"/></line><line x1=\"44\" y1=\"35\" x2=\"37\" y2=\"49\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"2 -4;-5 10\" dur=\"0.45s\" begin=\"0.33s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0;1;0\" dur=\"0.45s\" begin=\"0.33s\" repeatCount=\"indefinite\"/></line></g><ellipse cx=\"26\" cy=\"56\" rx=\"8\" ry=\"2.2\" fill=\"none\" stroke=\"#38bdf8\" stroke-width=\"1.3\"><animate attributeName=\"rx\" values=\"3;12\" dur=\"0.9s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0.9;0\" dur=\"0.9s\" repeatCount=\"indefinite\"/></ellipse><ellipse cx=\"38\" cy=\"56\" rx=\"8\" ry=\"2.2\" fill=\"none\" stroke=\"#7dd3fc\" stroke-width=\"1.3\"><animate attributeName=\"rx\" values=\"3;12\" dur=\"0.9s\" begin=\"0.45s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0.9;0\" dur=\"0.9s\" begin=\"0.45s\" repeatCount=\"indefinite\"/></ellipse></svg>",
  "windy-variant": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Windy and Cloudy\"><defs><linearGradient id=\"wx-wv-cld\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#f8fafc\"/><stop offset=\"65%\" stop-color=\"#cbd5e1\"/><stop offset=\"100%\" stop-color=\"#64748b\"/></linearGradient><linearGradient id=\"wx-wv-line\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\"><stop offset=\"0%\" stop-color=\"#38bdf8\" stop-opacity=\"0.25\"/><stop offset=\"100%\" stop-color=\"#7dd3fc\"/></linearGradient></defs><path d=\"M16 33 H45 A8.5 8.5 0 0 0 43.5 16.2 A11.5 11.5 0 0 0 21 14 A9.5 9.5 0 0 0 16 33 Z\" fill=\"url(#wx-wv-cld)\" opacity=\"0.92\"/><g fill=\"none\" stroke=\"url(#wx-wv-line)\" stroke-width=\"3\" stroke-linecap=\"round\"><path d=\"M10 40 H48 A5 5 0 1 1 44 48\" stroke-dasharray=\"38 14\"><animate attributeName=\"stroke-dashoffset\" from=\"52\" to=\"0\" dur=\"1.4s\" repeatCount=\"indefinite\"/></path><path d=\"M14 49 H34 A4 4 0 1 1 30.5 55.5\" stroke-dasharray=\"26 12\"><animate attributeName=\"stroke-dashoffset\" from=\"38\" to=\"0\" dur=\"1.7s\" repeatCount=\"indefinite\"/></path></g></svg>",
  "windy": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"64\" height=\"64\" role=\"img\" aria-label=\"Windy\"><defs><linearGradient id=\"wx-wind-g1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\"><stop offset=\"0%\" stop-color=\"#38bdf8\" stop-opacity=\"0.25\"/><stop offset=\"60%\" stop-color=\"#7dd3fc\"/><stop offset=\"100%\" stop-color=\"#e0f2fe\"/></linearGradient><linearGradient id=\"wx-wind-g2\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\"><stop offset=\"0%\" stop-color=\"#818cf8\" stop-opacity=\"0.3\"/><stop offset=\"100%\" stop-color=\"#38bdf8\"/></linearGradient></defs><g fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 24 H43 A5.5 5.5 0 1 0 38.5 15.2\" stroke=\"url(#wx-wind-g1)\" stroke-width=\"3.2\" stroke-dasharray=\"36 14\"><animate attributeName=\"stroke-dashoffset\" from=\"50\" to=\"0\" dur=\"1.6s\" repeatCount=\"indefinite\"/></path><path d=\"M8 33 H50 A6 6 0 1 1 45 42.5\" stroke=\"url(#wx-wind-g2)\" stroke-width=\"3.4\" stroke-dasharray=\"42 16\"><animate attributeName=\"stroke-dashoffset\" from=\"58\" to=\"0\" dur=\"1.3s\" repeatCount=\"indefinite\"/></path><path d=\"M14 43 H33 A4.5 4.5 0 1 1 29.2 50.2\" stroke=\"url(#wx-wind-g1)\" stroke-width=\"2.8\" stroke-dasharray=\"28 12\"><animate attributeName=\"stroke-dashoffset\" from=\"40\" to=\"0\" dur=\"1.9s\" repeatCount=\"indefinite\"/></path></g></svg>"
};
const WX_URL = {};
function iconUrl(name) {
  const k = WX_ICONS[name] ? name : "partlycloudy";
  if (!WX_URL[k]) WX_URL[k] = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(WX_ICONS[k]);
  return WX_URL[k];
}

// Tropical icon resolver: monsoon / heat / cyclone override the standard condition
function resolveWeatherIcon(condition, metrics = {}) {
  const { precipitationRate = 0, uvIndex = 0, apparentTemp = 0, windSpeed = 0, tropicalMode = true, heatFrom = 42 } = metrics;
  if (tropicalMode) {
    if (windSpeed >= 63 || condition === "exceptional") return "tropical-cyclone";
    if ((condition === "pouring" || condition === "rainy") && precipitationRate >= 12) return "tropical-monsoon";
    if ((condition === "sunny" || condition === "partlycloudy") && (uvIndex >= 9 || apparentTemp >= heatFrom)) return "tropical-heat";
  }
  return WX_ICONS[condition] ? condition : "partlycloudy";
}

// Hero backgrounds (animated SVG scenes), one per resolved weather key
const WX_BG = {
  "clear-night": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Clear Night Hero Background\"><defs><linearGradient id=\"bg-ng-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#050816\"/><stop offset=\"55%\" stop-color=\"#0f172a\"/><stop offset=\"100%\" stop-color=\"#1e1b4b\"/></linearGradient><radialGradient id=\"bg-ng-glow\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#93c5fd\" stop-opacity=\"0.38\"/><stop offset=\"55%\" stop-color=\"#3b82f6\" stop-opacity=\"0.12\"/><stop offset=\"100%\" stop-color=\"#1e3a8a\" stop-opacity=\"0\"/></radialGradient><linearGradient id=\"bg-ng-moon\" x1=\"15%\" y1=\"10%\" x2=\"85%\" y2=\"90%\"><stop offset=\"0%\" stop-color=\"#fef9c3\"/><stop offset=\"60%\" stop-color=\"#fde047\"/><stop offset=\"100%\" stop-color=\"#eab308\"/></linearGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-ng-sky)\"/><g fill=\"#e0f2fe\"><circle cx=\"310\" cy=\"36\" r=\"1.4\"><animate attributeName=\"opacity\" values=\"0.2;1;0.2\" dur=\"2.6s\" repeatCount=\"indefinite\"/></circle><circle cx=\"385\" cy=\"82\" r=\"1.1\"><animate attributeName=\"opacity\" values=\"0.9;0.2;0.9\" dur=\"3.3s\" repeatCount=\"indefinite\"/></circle><circle cx=\"430\" cy=\"28\" r=\"1.6\"><animate attributeName=\"opacity\" values=\"0.3;1;0.3\" dur=\"2.1s\" repeatCount=\"indefinite\"/></circle><circle cx=\"565\" cy=\"42\" r=\"1.5\"><animate attributeName=\"opacity\" values=\"1;0.25;1\" dur=\"3.7s\" repeatCount=\"indefinite\"/></circle><circle cx=\"625\" cy=\"95\" r=\"1.2\"><animate attributeName=\"opacity\" values=\"0.25;0.95;0.25\" dur=\"2.9s\" repeatCount=\"indefinite\"/></circle><circle cx=\"695\" cy=\"48\" r=\"1.4\"><animate attributeName=\"opacity\" values=\"0.85;0.2;0.85\" dur=\"3.1s\" repeatCount=\"indefinite\"/></circle><circle cx=\"745\" cy=\"115\" r=\"1.1\"><animate attributeName=\"opacity\" values=\"0.2;0.9;0.2\" dur=\"2.4s\" repeatCount=\"indefinite\"/></circle></g><circle cx=\"495\" cy=\"68\" r=\"85\" fill=\"url(#bg-ng-glow)\"/><g><animateTransform attributeName=\"transform\" type=\"rotate\" values=\"-2 495 68;2 495 68;-2 495 68\" dur=\"7s\" repeatCount=\"indefinite\"/><path d=\"M 500 45 A 22 22 0 1 0 518 77 A 17.5 17.5 0 1 1 500 45 Z\" fill=\"url(#bg-ng-moon)\"/></g></svg>",
  "cloudy": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Cloudy Hero Background\"><defs><linearGradient id=\"bg-cl-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#334155\"/><stop offset=\"52%\" stop-color=\"#475569\"/><stop offset=\"100%\" stop-color=\"#64748b\"/></linearGradient><radialGradient id=\"bg-cl-sun\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#fde047\" stop-opacity=\"0.7\"/><stop offset=\"50%\" stop-color=\"#facc15\" stop-opacity=\"0.2\"/><stop offset=\"100%\" stop-color=\"#facc15\" stop-opacity=\"0\"/></radialGradient><linearGradient id=\"bg-cl-scrim\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\"><stop offset=\"0%\" stop-color=\"#0f172a\" stop-opacity=\"0.65\"/><stop offset=\"52%\" stop-color=\"#0f172a\" stop-opacity=\"0.18\"/><stop offset=\"100%\" stop-color=\"#0f172a\" stop-opacity=\"0.32\"/></linearGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-cl-sky)\"/><circle cx=\"465\" cy=\"58\" r=\"78\" fill=\"url(#bg-cl-sun)\"/><circle cx=\"465\" cy=\"58\" r=\"17\" fill=\"#fde047\" opacity=\"0.85\"/><g fill=\"#f1f5f9\" opacity=\"0.35\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"20 0;-20 0;20 0\" dur=\"19s\" repeatCount=\"indefinite\"/><path d=\"M 270 104 H 430 A 24 24 0 0 0 425 57 A 34 34 0 0 0 360 50 A 26 26 0 0 0 270 104 Z\"/><path d=\"M 490 112 H 670 A 26 26 0 0 0 665 61 A 38 38 0 0 0 590 53 A 28 28 0 0 0 490 112 Z\"/></g><g fill=\"#ffffff\" opacity=\"0.62\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-22 0;22 0;-22 0\" dur=\"15s\" repeatCount=\"indefinite\"/><path d=\"M 225 142 H 415 A 28 28 0 0 0 409 87 A 40 40 0 0 0 330 78 A 30 30 0 0 0 225 142 Z\"/><path d=\"M 380 156 H 560 A 26 26 0 0 0 555 105 A 36 36 0 0 0 485 97 A 28 28 0 0 0 380 156 Z\"/></g><rect width=\"800\" height=\"220\" fill=\"url(#bg-cl-scrim)\"/></svg>",
  "exceptional": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Severe Weather Alert Hero Background\"><defs><linearGradient id=\"bg-ex-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#1c0a0d\"/><stop offset=\"55%\" stop-color=\"#450a0a\"/><stop offset=\"100%\" stop-color=\"#7f1d1d\"/></linearGradient><radialGradient id=\"bg-ex-pulse\" cx=\"72%\" cy=\"48%\" r=\"48%\"><stop offset=\"0%\" stop-color=\"#f97316\" stop-opacity=\"0.45\"/><stop offset=\"55%\" stop-color=\"#ef4444\" stop-opacity=\"0.18\"/><stop offset=\"100%\" stop-color=\"#7f1d1d\" stop-opacity=\"0\"/></radialGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-ex-sky)\"/><circle cx=\"585\" cy=\"105\" r=\"145\" fill=\"url(#bg-ex-pulse)\"><animate attributeName=\"opacity\" values=\"0.35;1;0.35\" dur=\"1.8s\" repeatCount=\"indefinite\"/></circle><g fill=\"none\" stroke=\"#f97316\" stroke-width=\"1.6\" opacity=\"0.45\"><circle cx=\"585\" cy=\"105\" r=\"45\"><animate attributeName=\"r\" values=\"35;135\" dur=\"2.4s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0.7;0\" dur=\"2.4s\" repeatCount=\"indefinite\"/></circle><circle cx=\"585\" cy=\"105\" r=\"45\"><animate attributeName=\"r\" values=\"35;135\" dur=\"2.4s\" begin=\"1.2s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0.7;0\" dur=\"2.4s\" begin=\"1.2s\" repeatCount=\"indefinite\"/></circle></g></svg>",
  "fog": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Fog Hero Background\"><defs><linearGradient id=\"bg-fg-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#1e293b\"/><stop offset=\"55%\" stop-color=\"#334155\"/><stop offset=\"100%\" stop-color=\"#475569\"/></linearGradient><linearGradient id=\"bg-fg-mist\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\"><stop offset=\"0%\" stop-color=\"#cbd5e1\" stop-opacity=\"0\"/><stop offset=\"30%\" stop-color=\"#e2e8f0\" stop-opacity=\"0.35\"/><stop offset=\"70%\" stop-color=\"#bae6fd\" stop-opacity=\"0.4\"/><stop offset=\"100%\" stop-color=\"#cbd5e1\" stop-opacity=\"0\"/></linearGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-fg-sky)\"/><g fill=\"url(#bg-fg-mist)\"><rect x=\"-60\" y=\"38\" width=\"920\" height=\"24\" rx=\"12\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-30 0;30 0;-30 0\" dur=\"12s\" repeatCount=\"indefinite\"/></rect><rect x=\"-60\" y=\"84\" width=\"920\" height=\"30\" rx=\"15\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"35 0;-35 0;35 0\" dur=\"15s\" repeatCount=\"indefinite\"/></rect><rect x=\"-60\" y=\"136\" width=\"920\" height=\"28\" rx=\"14\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-25 0;25 0;-25 0\" dur=\"11s\" repeatCount=\"indefinite\"/></rect><rect x=\"-60\" y=\"178\" width=\"920\" height=\"26\" rx=\"13\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"28 0;-28 0;28 0\" dur=\"14s\" repeatCount=\"indefinite\"/></rect></g></svg>",
  "hail": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Hail Hero Background\"><defs><linearGradient id=\"bg-hl-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#0f172a\"/><stop offset=\"55%\" stop-color=\"#1e293b\"/><stop offset=\"100%\" stop-color=\"#334155\"/></linearGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-hl-sky)\"/><g fill=\"#bae6fd\" stroke=\"#ffffff\" stroke-width=\"0.8\"><polygon points=\"320,18 325,24 320,30 315,24\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"10 -30;-30 200\" dur=\"0.75s\" repeatCount=\"indefinite\"/></polygon><polygon points=\"415,28 420,34 415,40 410,34\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"10 -30;-30 200\" dur=\"0.75s\" begin=\"0.2s\" repeatCount=\"indefinite\"/></polygon><polygon points=\"510,14 515,20 510,26 505,20\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"10 -30;-30 200\" dur=\"0.75s\" begin=\"0.4s\" repeatCount=\"indefinite\"/></polygon><polygon points=\"605,24 610,30 605,36 600,30\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"10 -30;-30 200\" dur=\"0.75s\" begin=\"0.1s\" repeatCount=\"indefinite\"/></polygon><polygon points=\"700,16 705,22 700,28 695,22\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"10 -30;-30 200\" dur=\"0.75s\" begin=\"0.5s\" repeatCount=\"indefinite\"/></polygon></g></svg>",
  "lightning-rainy": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Thunderstorm Rain Hero Background\"><defs><linearGradient id=\"bg-lr-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#070913\"/><stop offset=\"55%\" stop-color=\"#171936\"/><stop offset=\"100%\" stop-color=\"#1e293b\"/></linearGradient><radialGradient id=\"bg-lr-flash\" cx=\"65%\" cy=\"35%\" r=\"45%\"><stop offset=\"0%\" stop-color=\"#fef08a\" stop-opacity=\"0.4\"/><stop offset=\"55%\" stop-color=\"#38bdf8\" stop-opacity=\"0.15\"/><stop offset=\"100%\" stop-color=\"#0f172a\" stop-opacity=\"0\"/></radialGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-lr-sky)\"/><rect width=\"800\" height=\"220\" fill=\"url(#bg-lr-flash)\"><animate attributeName=\"opacity\" values=\"0;1;0.1;0.85;0;0\" keyTimes=\"0;0.05;0.11;0.17;0.26;1\" dur=\"3.1s\" repeatCount=\"indefinite\"/></rect><g stroke=\"#38bdf8\" stroke-width=\"2\" stroke-linecap=\"round\" opacity=\"0.75\"><line x1=\"310\" y1=\"15\" x2=\"290\" y2=\"62\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"16 -45;-36 185\" dur=\"0.8s\" repeatCount=\"indefinite\"/></line><line x1=\"395\" y1=\"30\" x2=\"375\" y2=\"77\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"16 -45;-36 185\" dur=\"0.8s\" begin=\"0.2s\" repeatCount=\"indefinite\"/></line><line x1=\"480\" y1=\"10\" x2=\"460\" y2=\"57\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"16 -45;-36 185\" dur=\"0.8s\" begin=\"0.4s\" repeatCount=\"indefinite\"/></line><line x1=\"565\" y1=\"25\" x2=\"545\" y2=\"72\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"16 -45;-36 185\" dur=\"0.8s\" begin=\"0.6s\" repeatCount=\"indefinite\"/></line><line x1=\"650\" y1=\"18\" x2=\"630\" y2=\"65\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"16 -45;-36 185\" dur=\"0.8s\" begin=\"0.3s\" repeatCount=\"indefinite\"/></line><line x1=\"735\" y1=\"32\" x2=\"715\" y2=\"79\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"16 -45;-36 185\" dur=\"0.8s\" begin=\"0.5s\" repeatCount=\"indefinite\"/></line></g><g><animate attributeName=\"opacity\" values=\"0;1;0.15;0.95;0;0\" keyTimes=\"0;0.05;0.11;0.17;0.26;1\" dur=\"3.1s\" repeatCount=\"indefinite\"/><polyline points=\"585,12 558,72 582,72 550,148\" fill=\"none\" stroke=\"#facc15\" stroke-width=\"4.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><polyline points=\"585,12 558,72 582,72 550,148\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></svg>",
  "lightning": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Lightning Hero Background\"><defs><linearGradient id=\"bg-lg-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#090514\"/><stop offset=\"55%\" stop-color=\"#1e1b4b\"/><stop offset=\"100%\" stop-color=\"#311042\"/></linearGradient><radialGradient id=\"bg-lg-flash\" cx=\"68%\" cy=\"35%\" r=\"45%\"><stop offset=\"0%\" stop-color=\"#fef08a\" stop-opacity=\"0.45\"/><stop offset=\"50%\" stop-color=\"#818cf8\" stop-opacity=\"0.18\"/><stop offset=\"100%\" stop-color=\"#1e1b4b\" stop-opacity=\"0\"/></radialGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-lg-sky)\"/><rect width=\"800\" height=\"220\" fill=\"url(#bg-lg-flash)\"><animate attributeName=\"opacity\" values=\"0;0.95;0.1;0.8;0;0\" keyTimes=\"0;0.06;0.12;0.18;0.28;1\" dur=\"3.4s\" repeatCount=\"indefinite\"/></rect><g><animate attributeName=\"opacity\" values=\"0;1;0.15;0.9;0;0\" keyTimes=\"0;0.06;0.12;0.18;0.28;1\" dur=\"3.4s\" repeatCount=\"indefinite\"/><polyline points=\"555,14 528,74 552,74 522,146\" fill=\"none\" stroke=\"#facc15\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><polyline points=\"555,14 528,74 552,74 522,146\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g><g><animate attributeName=\"opacity\" values=\"0;0;1;0.2;0.85;0\" keyTimes=\"0;0.52;0.57;0.62;0.67;0.76\" dur=\"4.2s\" repeatCount=\"indefinite\"/><polyline points=\"670,22 648,68 666,68 644,126\" fill=\"none\" stroke=\"#fde047\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></svg>",
  "partlycloudy": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Partly Cloudy Hero Background\"><defs><linearGradient id=\"bg-pc-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#1e3a5f\"/><stop offset=\"55%\" stop-color=\"#335c81\"/><stop offset=\"100%\" stop-color=\"#476c8a\"/></linearGradient><radialGradient id=\"bg-pc-glow\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#fde047\" stop-opacity=\"0.75\"/><stop offset=\"45%\" stop-color=\"#facc15\" stop-opacity=\"0.22\"/><stop offset=\"100%\" stop-color=\"#facc15\" stop-opacity=\"0\"/></radialGradient><linearGradient id=\"bg-pc-scrim\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\"><stop offset=\"0%\" stop-color=\"#0f172a\" stop-opacity=\"0.62\"/><stop offset=\"50%\" stop-color=\"#0f172a\" stop-opacity=\"0.15\"/><stop offset=\"100%\" stop-color=\"#0f172a\" stop-opacity=\"0.28\"/></linearGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-pc-sky)\"/><circle cx=\"475\" cy=\"64\" r=\"95\" fill=\"url(#bg-pc-glow)\"><animate attributeName=\"r\" values=\"88;102;88\" dur=\"5s\" repeatCount=\"indefinite\"/></circle><circle cx=\"475\" cy=\"64\" r=\"19\" fill=\"#fde047\"/><g fill=\"#f8fafc\" opacity=\"0.55\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-18 0;18 0;-18 0\" dur=\"14s\" repeatCount=\"indefinite\"/><path d=\"M 340 122 H 485 A 26 26 0 0 0 480 71 A 36 36 0 0 0 412 64 A 28 28 0 0 0 340 122 Z\"/></g><g fill=\"#e2e8f0\" opacity=\"0.38\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"16 0;-16 0;16 0\" dur=\"18s\" repeatCount=\"indefinite\"/><path d=\"M 520 148 H 695 A 28 28 0 0 0 689 93 A 40 40 0 0 0 612 85 A 30 30 0 0 0 520 148 Z\"/></g><rect width=\"800\" height=\"220\" fill=\"url(#bg-pc-scrim)\"/></svg>",
  "pouring": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Pouring Hero Background\"><defs><linearGradient id=\"bg-pr-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#090d16\"/><stop offset=\"55%\" stop-color=\"#172033\"/><stop offset=\"100%\" stop-color=\"#1e3a5f\"/></linearGradient><linearGradient id=\"bg-pr-drop\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#38bdf8\" stop-opacity=\"0\"/><stop offset=\"50%\" stop-color=\"#38bdf8\" stop-opacity=\"0.85\"/><stop offset=\"100%\" stop-color=\"#e0f2fe\" stop-opacity=\"0.95\"/></linearGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-pr-sky)\"/><g fill=\"#334155\" opacity=\"0.55\"><path d=\"M 220 58 H 540 A 26 26 0 0 0 535 7 A 38 38 0 0 0 450 -2 A 28 28 0 0 0 220 58 Z\"/><path d=\"M 450 66 H 770 A 26 26 0 0 0 765 15 A 38 38 0 0 0 680 6 A 28 28 0 0 0 450 66 Z\"/></g><g stroke=\"url(#bg-pr-drop)\" stroke-width=\"2.2\" stroke-linecap=\"round\"><line x1=\"280\" y1=\"10\" x2=\"256\" y2=\"62\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"20 -50;-45 190\" dur=\"0.72s\" repeatCount=\"indefinite\"/></line><line x1=\"340\" y1=\"30\" x2=\"316\" y2=\"82\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"20 -50;-45 190\" dur=\"0.72s\" begin=\"0.18s\" repeatCount=\"indefinite\"/></line><line x1=\"400\" y1=\"5\" x2=\"376\" y2=\"57\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"20 -50;-45 190\" dur=\"0.72s\" begin=\"0.36s\" repeatCount=\"indefinite\"/></line><line x1=\"460\" y1=\"25\" x2=\"436\" y2=\"77\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"20 -50;-45 190\" dur=\"0.72s\" begin=\"0.54s\" repeatCount=\"indefinite\"/></line><line x1=\"520\" y1=\"12\" x2=\"496\" y2=\"64\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"20 -50;-45 190\" dur=\"0.72s\" begin=\"0.12s\" repeatCount=\"indefinite\"/></line><line x1=\"580\" y1=\"32\" x2=\"556\" y2=\"84\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"20 -50;-45 190\" dur=\"0.72s\" begin=\"0.30s\" repeatCount=\"indefinite\"/></line><line x1=\"640\" y1=\"8\" x2=\"616\" y2=\"60\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"20 -50;-45 190\" dur=\"0.72s\" begin=\"0.48s\" repeatCount=\"indefinite\"/></line><line x1=\"700\" y1=\"28\" x2=\"676\" y2=\"80\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"20 -50;-45 190\" dur=\"0.72s\" begin=\"0.62s\" repeatCount=\"indefinite\"/></line><line x1=\"760\" y1=\"15\" x2=\"736\" y2=\"67\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"20 -50;-45 190\" dur=\"0.72s\" begin=\"0.24s\" repeatCount=\"indefinite\"/></line></g></svg>",
  "rainy": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Rainy Hero Background\"><defs><linearGradient id=\"bg-rn-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#0f172a\"/><stop offset=\"55%\" stop-color=\"#1e293b\"/><stop offset=\"100%\" stop-color=\"#1e3a5f\"/></linearGradient><linearGradient id=\"bg-rn-drop\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#38bdf8\" stop-opacity=\"0\"/><stop offset=\"65%\" stop-color=\"#7dd3fc\" stop-opacity=\"0.75\"/><stop offset=\"100%\" stop-color=\"#bae6fd\" stop-opacity=\"0.9\"/></linearGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-rn-sky)\"/><g fill=\"#475569\" opacity=\"0.45\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-14 0;14 0;-14 0\" dur=\"16s\" repeatCount=\"indefinite\"/><path d=\"M 260 66 H 520 A 26 26 0 0 0 515 15 A 38 38 0 0 0 435 6 A 28 28 0 0 0 260 66 Z\"/><path d=\"M 480 74 H 740 A 26 26 0 0 0 735 23 A 38 38 0 0 0 655 14 A 28 28 0 0 0 480 74 Z\"/></g><g stroke=\"url(#bg-rn-drop)\" stroke-width=\"2\" stroke-linecap=\"round\"><line x1=\"310\" y1=\"30\" x2=\"294\" y2=\"66\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"12 -40;-28 190\" dur=\"1.1s\" repeatCount=\"indefinite\"/></line><line x1=\"385\" y1=\"10\" x2=\"369\" y2=\"46\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"12 -40;-28 190\" dur=\"1.1s\" begin=\"0.3s\" repeatCount=\"indefinite\"/></line><line x1=\"460\" y1=\"40\" x2=\"444\" y2=\"76\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"12 -40;-28 190\" dur=\"1.1s\" begin=\"0.6s\" repeatCount=\"indefinite\"/></line><line x1=\"535\" y1=\"15\" x2=\"519\" y2=\"51\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"12 -40;-28 190\" dur=\"1.1s\" begin=\"0.2s\" repeatCount=\"indefinite\"/></line><line x1=\"610\" y1=\"35\" x2=\"594\" y2=\"71\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"12 -40;-28 190\" dur=\"1.1s\" begin=\"0.5s\" repeatCount=\"indefinite\"/></line><line x1=\"685\" y1=\"20\" x2=\"669\" y2=\"56\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"12 -40;-28 190\" dur=\"1.1s\" begin=\"0.8s\" repeatCount=\"indefinite\"/></line><line x1=\"745\" y1=\"45\" x2=\"729\" y2=\"81\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"12 -40;-28 190\" dur=\"1.1s\" begin=\"0.4s\" repeatCount=\"indefinite\"/></line></g></svg>",
  "snowy-rainy": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Snowy Rainy Hero Background\"><defs><linearGradient id=\"bg-sr-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#172033\"/><stop offset=\"55%\" stop-color=\"#293548\"/><stop offset=\"100%\" stop-color=\"#334155\"/></linearGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-sr-sky)\"/><g stroke=\"#7dd3fc\" stroke-width=\"2\" stroke-linecap=\"round\" opacity=\"0.75\"><line x1=\"330\" y1=\"20\" x2=\"314\" y2=\"56\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"12 -30;-24 190\" dur=\"1.1s\" repeatCount=\"indefinite\"/></line><line x1=\"490\" y1=\"15\" x2=\"474\" y2=\"51\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"12 -30;-24 190\" dur=\"1.1s\" begin=\"0.4s\" repeatCount=\"indefinite\"/></line><line x1=\"650\" y1=\"25\" x2=\"634\" y2=\"61\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"12 -30;-24 190\" dur=\"1.1s\" begin=\"0.7s\" repeatCount=\"indefinite\"/></line></g><g fill=\"#e0f2fe\"><circle cx=\"410\" cy=\"25\" r=\"3.2\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-8 -20;10 205\" dur=\"3.6s\" repeatCount=\"indefinite\"/></circle><circle cx=\"570\" cy=\"20\" r=\"3.4\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"8 -20;-10 205\" dur=\"3.9s\" begin=\"1.2s\" repeatCount=\"indefinite\"/></circle><circle cx=\"725\" cy=\"30\" r=\"3.0\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-6 -20;12 205\" dur=\"3.4s\" begin=\"0.6s\" repeatCount=\"indefinite\"/></circle></g></svg>",
  "snowy": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Snowy Hero Background\"><defs><linearGradient id=\"bg-sn-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#1e293b\"/><stop offset=\"55%\" stop-color=\"#334155\"/><stop offset=\"100%\" stop-color=\"#475569\"/></linearGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-sn-sky)\"/><g fill=\"#f1f5f9\"><circle cx=\"310\" cy=\"20\" r=\"3.2\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-8 -20;12 210\" dur=\"4.2s\" repeatCount=\"indefinite\"/></circle><circle cx=\"390\" cy=\"40\" r=\"2.6\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"10 -30;-10 200\" dur=\"5.1s\" begin=\"0.8s\" repeatCount=\"indefinite\"/></circle><circle cx=\"470\" cy=\"15\" r=\"3.6\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-12 -15;14 215\" dur=\"4.6s\" begin=\"1.5s\" repeatCount=\"indefinite\"/></circle><circle cx=\"550\" cy=\"35\" r=\"2.8\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"8 -25;-12 205\" dur=\"4.9s\" begin=\"0.4s\" repeatCount=\"indefinite\"/></circle><circle cx=\"630\" cy=\"22\" r=\"3.4\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-10 -20;10 210\" dur=\"4.4s\" begin=\"2.1s\" repeatCount=\"indefinite\"/></circle><circle cx=\"710\" cy=\"30\" r=\"2.7\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"12 -25;-8 205\" dur=\"5.3s\" begin=\"1.1s\" repeatCount=\"indefinite\"/></circle></g></svg>",
  "sunny": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Sunny Hero Background\"><defs><linearGradient id=\"bg-sun-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#0c4a6e\"/><stop offset=\"50%\" stop-color=\"#0369a1\"/><stop offset=\"100%\" stop-color=\"#0284c7\"/></linearGradient><radialGradient id=\"bg-sun-glow\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#fef08a\" stop-opacity=\"0.85\"/><stop offset=\"35%\" stop-color=\"#facc15\" stop-opacity=\"0.35\"/><stop offset=\"70%\" stop-color=\"#f59e0b\" stop-opacity=\"0.1\"/><stop offset=\"100%\" stop-color=\"#f59e0b\" stop-opacity=\"0\"/></radialGradient><linearGradient id=\"bg-sun-disc\" x1=\"20%\" y1=\"15%\" x2=\"85%\" y2=\"85%\"><stop offset=\"0%\" stop-color=\"#fef9c3\"/><stop offset=\"55%\" stop-color=\"#facc15\"/><stop offset=\"100%\" stop-color=\"#ea580c\"/></linearGradient><linearGradient id=\"bg-sun-scrim\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\"><stop offset=\"0%\" stop-color=\"#082f49\" stop-opacity=\"0.68\"/><stop offset=\"48%\" stop-color=\"#082f49\" stop-opacity=\"0.18\"/><stop offset=\"100%\" stop-color=\"#082f49\" stop-opacity=\"0.22\"/></linearGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-sun-sky)\"/><circle cx=\"485\" cy=\"68\" r=\"115\" fill=\"url(#bg-sun-glow)\"><animate attributeName=\"r\" values=\"105;124;105\" dur=\"5s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0.8;1;0.8\" dur=\"5s\" repeatCount=\"indefinite\"/></circle><g stroke=\"#fde047\" stroke-width=\"2.2\" stroke-linecap=\"round\" opacity=\"0.65\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 485 68\" to=\"360 485 68\" dur=\"42s\" repeatCount=\"indefinite\"/><line x1=\"485\" y1=\"24\" x2=\"485\" y2=\"35\"/><line x1=\"485\" y1=\"101\" x2=\"485\" y2=\"112\"/><line x1=\"441\" y1=\"68\" x2=\"452\" y2=\"68\"/><line x1=\"518\" y1=\"68\" x2=\"529\" y2=\"68\"/><line x1=\"454\" y1=\"37\" x2=\"462\" y2=\"45\"/><line x1=\"508\" y1=\"91\" x2=\"516\" y2=\"99\"/><line x1=\"516\" y1=\"37\" x2=\"508\" y2=\"45\"/><line x1=\"462\" y1=\"91\" x2=\"454\" y2=\"99\"/></g><circle cx=\"485\" cy=\"68\" r=\"22\" fill=\"url(#bg-sun-disc)\"/><rect width=\"800\" height=\"220\" fill=\"url(#bg-sun-scrim)\"/></svg>",
  "tropical-cyclone": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Tropical Cyclone Hero Background\"><defs><linearGradient id=\"bg-tc-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#060b19\"/><stop offset=\"55%\" stop-color=\"#172554\"/><stop offset=\"100%\" stop-color=\"#312e81\"/></linearGradient><radialGradient id=\"bg-tc-eye\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#38bdf8\" stop-opacity=\"0.45\"/><stop offset=\"60%\" stop-color=\"#6366f1\" stop-opacity=\"0.15\"/><stop offset=\"100%\" stop-color=\"#0f172a\" stop-opacity=\"0\"/></radialGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-tc-sky)\"/><circle cx=\"585\" cy=\"105\" r=\"130\" fill=\"url(#bg-tc-eye)\"/><g fill=\"none\" stroke=\"#38bdf8\" stroke-width=\"4\" stroke-linecap=\"round\" opacity=\"0.55\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"360 585 105\" to=\"0 585 105\" dur=\"7s\" repeatCount=\"indefinite\"/><path d=\"M 585 75 C 625 75 655 102 648 140 C 640 170 605 184 570 180\"/><path d=\"M 585 135 C 545 135 515 108 522 70 C 530 40 565 26 600 30\"/><path d=\"M 555 105 C 555 65 582 35 620 42\"/><path d=\"M 615 105 C 615 145 588 175 550 168\"/></g><circle cx=\"585\" cy=\"105\" r=\"14\" fill=\"#090d16\" stroke=\"#7dd3fc\" stroke-width=\"2\" opacity=\"0.75\"/></svg>",
  "tropical-heat": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Tropical Heat Hero Background\"><defs><linearGradient id=\"bg-th-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#27130c\"/><stop offset=\"50%\" stop-color=\"#7c2d12\"/><stop offset=\"100%\" stop-color=\"#c2410c\"/></linearGradient><radialGradient id=\"bg-th-glow\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0%\" stop-color=\"#fef08a\" stop-opacity=\"0.8\"/><stop offset=\"40%\" stop-color=\"#fb923c\" stop-opacity=\"0.35\"/><stop offset=\"100%\" stop-color=\"#ef4444\" stop-opacity=\"0\"/></radialGradient><linearGradient id=\"bg-th-scrim\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\"><stop offset=\"0%\" stop-color=\"#1c0a06\" stop-opacity=\"0.65\"/><stop offset=\"52%\" stop-color=\"#1c0a06\" stop-opacity=\"0.15\"/><stop offset=\"100%\" stop-color=\"#1c0a06\" stop-opacity=\"0.28\"/></linearGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-th-sky)\"/><circle cx=\"485\" cy=\"64\" r=\"115\" fill=\"url(#bg-th-glow)\"><animate attributeName=\"r\" values=\"105;125;105\" dur=\"3.4s\" repeatCount=\"indefinite\"/></circle><circle cx=\"485\" cy=\"64\" r=\"22\" fill=\"#fde047\"/><g fill=\"none\" stroke=\"#fdba74\" stroke-width=\"2.4\" stroke-linecap=\"round\" opacity=\"0.42\"><path d=\"M 330 148 Q 365 136 400 148 T 470 148 T 540 148 T 610 148\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 4;0 -4;0 4\" dur=\"2.6s\" repeatCount=\"indefinite\"/></path><path d=\"M 360 174 Q 395 162 430 174 T 500 174 T 570 174 T 640 174\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 -4;0 4;0 -4\" dur=\"3.1s\" repeatCount=\"indefinite\"/></path></g><rect width=\"800\" height=\"220\" fill=\"url(#bg-th-scrim)\"/></svg>",
  "tropical-monsoon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Tropical Monsoon Hero Background\"><defs><linearGradient id=\"bg-tm-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#041322\"/><stop offset=\"52%\" stop-color=\"#0c2d48\"/><stop offset=\"100%\" stop-color=\"#164e63\"/></linearGradient><linearGradient id=\"bg-tm-rain\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#38bdf8\" stop-opacity=\"0\"/><stop offset=\"50%\" stop-color=\"#38bdf8\" stop-opacity=\"0.85\"/><stop offset=\"100%\" stop-color=\"#e0f2fe\" stop-opacity=\"0.95\"/></linearGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-tm-sky)\"/><g stroke=\"url(#bg-tm-rain)\" stroke-width=\"2.3\" stroke-linecap=\"round\"><line x1=\"270\" y1=\"8\" x2=\"242\" y2=\"68\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"24 -55;-52 195\" dur=\"0.58s\" repeatCount=\"indefinite\"/></line><line x1=\"330\" y1=\"24\" x2=\"302\" y2=\"84\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"24 -55;-52 195\" dur=\"0.58s\" begin=\"0.14s\" repeatCount=\"indefinite\"/></line><line x1=\"390\" y1=\"10\" x2=\"362\" y2=\"70\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"24 -55;-52 195\" dur=\"0.58s\" begin=\"0.28s\" repeatCount=\"indefinite\"/></line><line x1=\"450\" y1=\"28\" x2=\"422\" y2=\"88\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"24 -55;-52 195\" dur=\"0.58s\" begin=\"0.42s\" repeatCount=\"indefinite\"/></line><line x1=\"510\" y1=\"12\" x2=\"482\" y2=\"72\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"24 -55;-52 195\" dur=\"0.58s\" begin=\"0.08s\" repeatCount=\"indefinite\"/></line><line x1=\"570\" y1=\"22\" x2=\"542\" y2=\"82\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"24 -55;-52 195\" dur=\"0.58s\" begin=\"0.22s\" repeatCount=\"indefinite\"/></line><line x1=\"630\" y1=\"14\" x2=\"602\" y2=\"74\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"24 -55;-52 195\" dur=\"0.58s\" begin=\"0.36s\" repeatCount=\"indefinite\"/></line><line x1=\"690\" y1=\"26\" x2=\"662\" y2=\"86\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"24 -55;-52 195\" dur=\"0.58s\" begin=\"0.50s\" repeatCount=\"indefinite\"/></line><line x1=\"750\" y1=\"16\" x2=\"722\" y2=\"76\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"24 -55;-52 195\" dur=\"0.58s\" begin=\"0.18s\" repeatCount=\"indefinite\"/></line></g><g fill=\"none\" stroke=\"#38bdf8\" stroke-width=\"1.4\"><ellipse cx=\"420\" cy=\"204\" rx=\"18\" ry=\"4\"><animate attributeName=\"rx\" values=\"6;28\" dur=\"1.1s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0.85;0\" dur=\"1.1s\" repeatCount=\"indefinite\"/></ellipse><ellipse cx=\"590\" cy=\"206\" rx=\"18\" ry=\"4\"><animate attributeName=\"rx\" values=\"6;28\" dur=\"1.1s\" begin=\"0.55s\" repeatCount=\"indefinite\"/><animate attributeName=\"opacity\" values=\"0.85;0\" dur=\"1.1s\" begin=\"0.55s\" repeatCount=\"indefinite\"/></ellipse></g></svg>",
  "windy-variant": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Windy Cloudy Hero Background\"><defs><linearGradient id=\"bg-wv-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#1e293b\"/><stop offset=\"55%\" stop-color=\"#334155\"/><stop offset=\"100%\" stop-color=\"#1e3a5f\"/></linearGradient><linearGradient id=\"bg-wv-stream\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\"><stop offset=\"0%\" stop-color=\"#38bdf8\" stop-opacity=\"0\"/><stop offset=\"50%\" stop-color=\"#bae6fd\" stop-opacity=\"0.65\"/><stop offset=\"100%\" stop-color=\"#38bdf8\" stop-opacity=\"0\"/></linearGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-wv-sky)\"/><g fill=\"#cbd5e1\" opacity=\"0.28\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-26 0;26 0;-26 0\" dur=\"9s\" repeatCount=\"indefinite\"/><path d=\"M 320 96 H 510 A 24 24 0 0 0 505 49 A 34 34 0 0 0 438 42 A 26 26 0 0 0 320 96 Z\"/></g><g fill=\"none\" stroke=\"url(#bg-wv-stream)\" stroke-linecap=\"round\"><path d=\"M 200 124 H 660 A 18 18 0 1 1 645 154\" stroke-width=\"3.5\" stroke-dasharray=\"170 260\"><animate attributeName=\"stroke-dashoffset\" from=\"430\" to=\"0\" dur=\"1.8s\" repeatCount=\"indefinite\"/></path><path d=\"M 260 168 H 580\" stroke-width=\"2.6\" stroke-dasharray=\"120 200\"><animate attributeName=\"stroke-dashoffset\" from=\"320\" to=\"0\" dur=\"2.2s\" repeatCount=\"indefinite\"/></path></g></svg>",
  "windy": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 220\" preserveAspectRatio=\"xMidYMid slice\" width=\"800\" height=\"220\" role=\"img\" aria-label=\"Windy Hero Background\"><defs><linearGradient id=\"bg-wd-sky\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#0f172a\"/><stop offset=\"55%\" stop-color=\"#1e3a5f\"/><stop offset=\"100%\" stop-color=\"#0c4a6e\"/></linearGradient><linearGradient id=\"bg-wd-stream\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\"><stop offset=\"0%\" stop-color=\"#38bdf8\" stop-opacity=\"0\"/><stop offset=\"50%\" stop-color=\"#7dd3fc\" stop-opacity=\"0.7\"/><stop offset=\"100%\" stop-color=\"#e0f2fe\" stop-opacity=\"0\"/></linearGradient></defs><rect width=\"800\" height=\"220\" fill=\"url(#bg-wd-sky)\"/><g fill=\"none\" stroke=\"url(#bg-wd-stream)\" stroke-linecap=\"round\"><path d=\"M 180 56 H 560 A 18 18 0 1 0 545 27\" stroke-width=\"3.2\" stroke-dasharray=\"140 240\"><animate attributeName=\"stroke-dashoffset\" from=\"380\" to=\"0\" dur=\"2.4s\" repeatCount=\"indefinite\"/></path><path d=\"M 220 108 H 680 A 20 20 0 1 1 664 140\" stroke-width=\"3.8\" stroke-dasharray=\"180 280\"><animate attributeName=\"stroke-dashoffset\" from=\"460\" to=\"0\" dur=\"1.9s\" repeatCount=\"indefinite\"/></path><path d=\"M 140 158 H 490 A 15 15 0 1 1 478 182\" stroke-width=\"2.8\" stroke-dasharray=\"120 220\"><animate attributeName=\"stroke-dashoffset\" from=\"340\" to=\"0\" dur=\"2.7s\" repeatCount=\"indefinite\"/></path></g></svg>"
};
const WX_BG_URL = {};
function bgUrl(name) {
  const k = WX_BG[name] ? name : "partlycloudy";
  if (!WX_BG_URL[k]) WX_BG_URL[k] = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(WX_BG[k]);
  return WX_BG_URL[k];
}

function icon(name, size = 28) {
  return `<img class="wxi" src="${iconUrl(name)}" width="${size}" height="${size}" alt="">`;
}

class TropicalWeatherCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._tab = "hourly";
    this._hourly = null;
    this._daily = null;
    this._subs = [];
    this._lastKey = "";
  }

  static getStubConfig(hass) {
    const w = Object.keys((hass && hass.states) || {}).find((e) => e.startsWith("weather."));
    return { weather: w || "weather.home" };
  }

  setConfig(config) {
    if (!config.weather) throw new Error("weather: set a weather entity (e.g. weather.home)");
    this._config = Object.assign({
      name: null,
      sources: [config.weather],
      temperature: null,
      humidity: null,
      tide: null,
      sun: "sun.sun",
      show_hours: 24,
      tropical_mode: true,
      climate: "auto",
      show_week: true,
      sea_temperature: null,
      pressure: null,
      pressure_offset: 0,
      elevation: null,
      pressure_trend: null,
      lightning_distance: null,
      lightning_counter: null,
      lightning_azimuth: null,
      lightning_alert_km: 15,
      cyclone: null,
      cyclone_alert_km: 400,
      radar_card: null,
      asset_path: null,
      wind_gust: null,
      language: "auto",
      solar_radiation: null,
      insights: true,
    }, config);
    if (!this._config.sources.includes(this._config.weather)) this._config.sources.unshift(this._config.weather);
    this._lastKey = "";
  }

  getCardSize() { return 9; }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (first || this._subscribedTo !== this._activeWeather()) this._subscribe();
    const c = this._config;
    const ids = [...c.sources, c.temperature, c.humidity, c.tide, c.sun, c.sea_temperature, c.pressure, c.pressure_trend, c.lightning_distance, c.lightning_counter, c.lightning_azimuth, c.cyclone, c.wind_gust].filter(Boolean);
    if (this._radarEl) this._radarEl.hass = hass;
    this._trackLightning(first);
    const key = ids.map((id) => { const s = hass.states[id]; return s ? s.last_updated + s.state : "x"; }).join("|");
    if (key !== this._lastKey) { this._lastKey = key; this._render(); }
  }

  connectedCallback() {
    if (this._hass && !this._subs.length) this._subscribe();
    this._tick = setInterval(() => this._render(), 60000);
  }
  disconnectedCallback() {
    clearInterval(this._tick);
    this._unsubscribe();
  }

  async _unsubscribe() {
    const subs = this._subs; this._subs = [];
    for (const p of subs) { try { const u = await p; if (u) u(); } catch (e) { /* ignore */ } }
  }

  _subscribe() {
    if (!this._hass || !this._hass.connection) return;
    this._unsubscribe();
    const wid = this._activeWeather();
    this._subscribedTo = wid;
    this._hourly = null; this._daily = null;
    const sub = (type, cb) => this._hass.connection.subscribeMessage((ev) => { cb(ev.forecast || []); this._render(); },
      { type: "weather/subscribe_forecast", forecast_type: type, entity_id: wid });
    this._subs.push(sub("hourly", (f) => { this._hourly = f; }).catch(() => null));
    this._subs.push(sub("daily", (f) => { this._daily = f; }).catch(() => null));
  }

  // ---------- helpers ----------
  // asset_path: folder under /local with icons/<key>.svg and backgrounds/bg-<key>.svg (e.g. a photorealistic pack); built-in vector pack otherwise
  _iconUrl(name) { const p = this._config.asset_path; return p ? `${p}/icons/${WX_ICONS[name] ? name : "partlycloudy"}.svg?v=${TWC_VERSION}` : iconUrl(name); }
  _bgUrl(name) { const p = this._config.asset_path; return p ? `${p}/backgrounds/bg-${WX_BG[name] ? name : "partlycloudy"}.svg?v=${TWC_VERSION}` : bgUrl(name); }
  _icon(name, size = 28) { return `<img class="wxi" src="${this._iconUrl(name)}" width="${size}" height="${size}" alt="">`; }
  _tz() { return (this._hass && this._hass.config && this._hass.config.time_zone) || undefined; }
  _fmtTime(d) { return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: this._tz() }).format(d); }
  _fmtHour(d) { return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", hourCycle: "h23", timeZone: this._tz() }).format(d).replace(/\D/g, "") + ":00"; }
  _dayName(d) {
    const loc = (INTL_LOCALE[LANG] || LANG) + "-u-nu-latn";
    try { return new Intl.DateTimeFormat(loc, { weekday: "short", timeZone: this._tz() }).format(d).replace(/\.$/, ""); }
    catch (e) { return new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: this._tz() }).format(d); }
  }
  _lang() {
    const c = this._config.language;
    const want = c && c !== "auto" ? c : ((this._hass.locale && this._hass.locale.language) || this._hass.language || "en");
    return resolveLang(want);
  }
  _state(id) { return id && this._hass.states[id] ? this._hass.states[id] : null; }
  _attr(id, a) { const s = this._state(id); return s ? num(s.attributes[a]) : null; }

  _zone() {
    const z = this._config.climate;
    if (z && z !== "auto" && HEAT_BANDS[z]) return z;
    return climateZone(this._hass && this._hass.config && this._hass.config.latitude);
  }
  _heatFrom() { return HEAT_BANDS[this._zone()][1][0]; }

  // main weather entity, or the first working one from sources when it is unavailable
  _activeWeather() {
    const ok = (id) => { const st = this._hass && this._hass.states[id]; return st && !["unavailable", "unknown"].includes(st.state); };
    const c = this._config;
    if (ok(c.weather)) return c.weather;
    return (c.sources || []).find(ok) || c.weather;
  }

  _num(id) { const s = this._state(id); return s ? num(s.state) : null; }

  _localPressure() {
    // station pressure -> sea-level pressure (barometric formula), so it compares with the models
    const p = this._num(this._config.pressure);
    if (p === null) return null;
    const h = num(this._config.elevation) ?? num(this._hass.config && this._hass.config.elevation) ?? 0;
    const t = this._num(this._config.temperature) ?? this._attr(this._activeWeather(), "temperature") ?? 15;
    const msl = h > 0 ? p * Math.pow(1 - (0.0065 * h) / (t + 0.0065 * h + 273.15), -5.257) : p;
    return msl + (num(this._config.pressure_offset) || 0);
  }

  // ---------- thunderstorm tracking (Blitzortung: distance = nearest strike, updates per strike) ----------
  _trackLightning(first) {
    const id = this._config.lightning_distance;
    if (!id) return;
    this._lhist = this._lhist || [];
    if (first && this._hass.callWS) {
      this._hass.callWS({ type: "history/history_during_period", start_time: new Date(Date.now() - 3600000).toISOString(), entity_ids: [id], minimal_response: true, no_attributes: true, significant_changes_only: false })
        .then((r) => {
          const pts = (r[id] || []).map((x) => ({ t: (x.lu || x.lc) * 1000, d: num(x.s) })).filter((x) => x.d !== null);
          const seen = new Set(this._lhist.map((x) => x.t));
          this._lhist = [...pts.filter((x) => !seen.has(x.t)), ...this._lhist].sort((a, b) => a.t - b.t);
          this._lastKey = ""; this._render();
        }).catch(() => null);
    }
    const s = this._hass.states[id];
    const d = s ? num(s.state) : null;
    if (d !== null) {
      const t = Date.parse(s.last_changed);
      if (!this._lhist.length || this._lhist[this._lhist.length - 1].t !== t) this._lhist.push({ t, d });
    }
    const cut = Date.now() - 2 * 3600000;
    this._lhist = this._lhist.filter((x) => x.t > cut);
  }

  _stormTrack() {
    const now = Date.now(), pts = (this._lhist || []).filter((x) => x.t > now - 40 * 60000);
    const res = { trend: null, eta: null, until: null };
    // 30/30 rule: indoors until 30 min after the last strike within 10 km
    const near = (this._lhist || []).filter((x) => x.d <= 10 && x.t > now - 30 * 60000);
    if (near.length) res.until = near[near.length - 1].t + 30 * 60000;
    if (pts.length < 3 || pts[pts.length - 1].t - pts[0].t < 6 * 60000) return res;
    const n = pts.length, mx = pts.reduce((a, p) => a + p.t, 0) / n, my = pts.reduce((a, p) => a + p.d, 0) / n;
    const slope = pts.reduce((a, p) => a + (p.t - mx) * (p.d - my), 0) / pts.reduce((a, p) => a + (p.t - mx) ** 2, 0) * 60000; // km per min
    const last = pts[n - 1].d;
    if (slope < -0.15) { res.trend = "approach"; res.eta = Math.min(180, Math.round(last / -slope)); }
    else if (slope > 0.15) res.trend = "away";
    else res.trend = "steady";
    return res;
  }

  // ---------- tropical day insights ----------
  _ahead(hours) {
    const now = Date.now();
    return (this._hourly || []).filter((x) => Date.parse(x.datetime) + 3600000 > now).slice(0, hours);
  }
  _geo() { const c = this._hass.config || {}; return { lat: num(c.latitude) ?? 0, lon: num(c.longitude) ?? 0 }; }
  _hh(t) { return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", hourCycle: "h23", timeZone: this._tz() }).format(new Date(t)).replace(/\D/g, ""); }
  _localHour(t) { return parseInt(this._hh(t), 10); }

  _insights(temp, ws) {
    const h = this._ahead(30);
    if (h.length < 6) return "";
    const { lat, lon } = this._geo();
    const a = this._state(this._activeWeather()).attributes;
    const hot = this._heatFrom();
    const rows = h.map((x) => {
      const t = Date.parse(x.datetime), elev = sunElevation(t + 1800000, lat, lon);
      const g = irradiance(elev, num(x.cloud_coverage));
      return { t, elev, g, pp: num(x.precipitation_probability) || 0, mm: num(x.precipitation) || 0, rh: num(x.humidity), app: num(x.apparent_temperature) ?? num(x.temperature),
        temp: num(x.temperature), wind: num(x.wind_speed) || 0, uv: num(x.uv_index), storm: String(x.condition).startsWith("lightning"),
        asph: asphaltTemp(num(x.temperature) ?? 28, g, num(x.wind_speed) || 0) };
    });
    const tiles = [];

    // 1) paws / asphalt
    const measured = this._num(this._config.solar_radiation);
    const gNow = measured ?? irradiance(sunElevation(Date.now(), lat, lon), num(a.cloud_coverage));
    const asNow = asphaltTemp(temp ?? num(a.temperature) ?? 28, gNow, ws || 0);
    const pl = asNow < 40 ? ["paws_ok", "#4caf50"] : asNow < 52 ? ["paws_hot", "#ff9800"] : ["paws_danger", "#f44336"];
    let pawSub = T(pl[0]);
    if (asNow >= 40) { const ok = rows.find((r) => r.t > Date.now() && r.asph < 40 && r.pp < 50); if (ok) pawSub += ` · ${T("walk_from", { t: this._fmtTime(new Date(ok.t)) })}`; }
    tiles.push(`<div class="tile ins"><span class="tl"><ha-icon icon="mdi:paw"></ha-icon>${T("paws")}</span><b style="color:${pl[1]}">${Math.round(asNow)}°</b><span class="ts">${pawSub}</span></div>`);

    // 2) best time outside: dry, below the hot band, no thunder, 05-22 h local
    // from civil dawn (sun above -6 deg) until 22 h local
    // comfortable outside: after dawn, until 22 h, dry, no thunder, UV below "high" and feels-like a step below the hot band
    const comfy = hot - 3;
    const good = rows.slice(0, 30).filter((r) => { const lh = this._localHour(r.t); return sunElevation(r.t, lat, lon) > -6 && lh <= 21 && lh >= 4 && r.pp < 30 && !r.storm && (r.app ?? 99) < comfy && (r.uv ?? 0) < 6; });
    const wins = [];
    for (const r of good) {
      const w = wins[wins.length - 1];
      if (w && r.t - w.end <= 3600000) w.end = r.t; else wins.push({ start: r.t, end: r.t });
    }
    const dayKey = (t) => new Intl.DateTimeFormat("en-CA", { timeZone: this._tz() }).format(new Date(t));
    const today = dayKey(Date.now());
    const cap = (x) => String(x).charAt(0).toUpperCase() + String(x).slice(1);
    const dayOf = (w) => cap(dayKey(w.start) === today ? T("today") : T("tomorrow"));
    const span = (w) => `${w.start <= Date.now() ? T("now") : this._hh(w.start)}–${this._hh(w.end + 3600000)}`;
    const w1 = wins[0], w2 = wins[1];
    const bestSub = w1 ? dayOf(w1) + (w2 ? ` · + ${dayOf(w2) !== dayOf(w1) ? dayOf(w2) + " " : ""}${span(w2)}` : "") : T("none_today");
    tiles.push(`<div class="tile ins"><span class="tl"><ha-icon icon="mdi:walk"></ha-icon>${T("best_time")}</span><b class="sm">${w1 ? span(w1) : "–"}</b><span class="ts">${bestSub}</span></div>`);

    // 3) laundry: daylight hours (sun > 12 deg) without rain from now, or tomorrow when it is dark
    const isDay = (r) => r.elev > 12;
    let day = rows.filter((r) => r.t + 3600000 > Date.now());
    let prefix = "";
    if (!day.length || !isDay(day[0])) { const nx = day.findIndex(isDay); day = nx >= 0 ? day.slice(nx) : []; if (nx > 0 && day.length && this._localHour(day[0].t) < 12 && new Date(day[0].t).getDate() !== new Date().getDate()) prefix = T("tomorrow") + " · "; }
    let n = 0;
    while (n < day.length && isDay(day[n]) && day[n].pp < 40 && (day[n].rh ?? 80) < 92) n++;
    const dayLen = day.findIndex((r) => !isDay(r));
    let lSub, lCol;
    if (n >= 3 && (dayLen === -1 ? n === day.length : n >= dayLen)) { lSub = prefix + T("dries_all_day"); lCol = "#4caf50"; }
    else if (n >= 3) { lSub = prefix + T("dries_until", { t: this._fmtTime(new Date(day[n].t)) }); lCol = "#ffc107"; }
    else { lSub = prefix + T("laundry_bad"); lCol = "#f44336"; }
    tiles.push(`<div class="tile ins"><span class="tl"><ha-icon icon="mdi:tshirt-crew-outline"></ha-icon>${T("laundry")}</span><b class="sm" style="color:${lCol}">${n >= 3 ? "✓" : "✗"}</b><span class="ts">${lSub}</span></div>`);

    // 4) mosquitoes (Aedes): warm 26-32 deg, humid, recent / coming rain = breeding water
    const nx24 = rows.slice(0, 24);
    const tm = nx24.reduce((s2, r) => s2 + (r.temp ?? 28), 0) / nx24.length, rh = nx24.reduce((s2, r) => s2 + (r.rh ?? 75), 0) / nx24.length;
    const rain48 = rows.reduce((s2, r) => s2 + r.mm, 0) + (num((this._daily || [])[0]?.precipitation) || 0);
    let sc = tm >= 26 && tm <= 32 ? 2 : tm >= 22 && tm <= 35 ? 1 : 0;
    sc += rh >= 70 ? 1 : 0; sc += rain48 >= 20 ? 2 : rain48 >= 5 ? 1 : 0;
    const ml = sc >= 4 ? ["uv.high", "#f44336"] : sc >= 2 ? ["uv.moderate", "#ffc107"] : ["uv.low", "#4caf50"];
    tiles.push(`<div class="tile ins"><span class="tl"><ha-icon icon="mdi:bug-outline"></ha-icon>${T("mosquitoes")}</span><b class="sm" style="color:${ml[1]}">${T(ml[0])}</b><span class="ts">${sc >= 2 ? this._biteText() : "&nbsp;"}</span></div>`);

    return `<div class="tiles ins-row">${tiles.join("")}</div>`;
  }

  // Aedes biting peaks: early morning and late afternoon (local time)
  _biteText() {
    const lh = this._localHour(Date.now());
    const P = [[6, 8], [16, 18]];
    if (P.some(([a, b]) => lh >= a && lh < b)) return T("bites_now");
    const nx = P.find(([a]) => lh < a);
    const f = ([a, b]) => `${String(a).padStart(2, "0")}–${String(b).padStart(2, "0")}`;
    return T("next_peak", { t: nx ? f(nx) : `${T("tomorrow")} ${f(P[0])}` });
  }

  _lightning() {
    const c = this._config;
    if (!c.lightning_distance && !c.lightning_counter) return null;
    const d = this._num(c.lightning_distance), n = this._num(c.lightning_counter), az = this._num(c.lightning_azimuth);
    const active = d !== null && (n === null || n > 0);
    return { active, d, n: n || 0, az, near: active && d <= (num(c.lightning_alert_km) || 15) };
  }

  _cyclone() {
    const s = this._state(this._config.cyclone);
    if (!s || ["unknown", "unavailable", "none", "", "None"].includes(s.state)) return null;
    const a = s.attributes || {};
    const dist = num(a.distance_km ?? a.distance ?? a.distance_to_home_km);
    return { name: s.state, dist, near: dist === null ? false : dist <= (num(this._config.cyclone_alert_km) || 400) };
  }

  _pressureTrend() {
    const t = this._num(this._config.pressure_trend);
    if (t === null) return null;
    let label = T("trend.steady"), arrow = "▶";
    if (t <= -3) { label = T("trend.falling_fast"); arrow = "▼"; } else if (t < -0.5) { label = T("trend.falling"); arrow = "▼"; }
    else if (t >= 3) { label = T("trend.rising_fast"); arrow = "▲"; } else if (t > 0.5) { label = T("trend.rising"); arrow = "▲"; }
    return { t, label, arrow };
  }

  async _ensureRadar() {
    if (this._radarEl || !this._config.radar_card || this._radarLoading) return;
    this._radarLoading = true;
    try {
      const helpers = await window.loadCardHelpers();
      const el = await helpers.createCardElement(this._config.radar_card);
      el.hass = this._hass;
      this._radarEl = el;
      if (this._root) this._root.radar.appendChild(el);
    } catch (e) {
      if (this._root) this._root.radar.innerHTML = `<div class="empty">${T("radar_error")}</div>`;
    }
    this._radarLoading = false;
  }

  _sunInfo() {
    const s = this._state(this._config.sun);
    const now = Date.now();
    if (!s) return { frac: 0.5, up: true, rise: null, set: null, elev: 45 };
    const nr = Date.parse(s.attributes.next_rising), ns = Date.parse(s.attributes.next_setting);
    const up = s.state === "above_horizon";
    let rise, set;
    if (up) { set = ns; rise = nr - 86400000; if (rise > set) rise -= 86400000; }
    else { rise = nr; set = ns; if (set > rise) set -= 86400000; }
    const frac = up ? clamp((now - rise) / (set - rise), 0, 1) : clamp((now - set) / (rise - set), 0, 1);
    return { frac, up, rise: up ? rise : nr, set: up ? set : ns, elev: num(s.attributes.elevation) };
  }

  _dayIcon(day) {
    // daily icon from real hourly data of that local day (max rain rate, max feels-like)
    const key = (t) => new Intl.DateTimeFormat("en-CA", { timeZone: this._tz() }).format(new Date(t));
    const k = key(Date.parse(day.datetime));
    const hrs = (this._hourly || []).filter((h) => key(Date.parse(h.datetime)) === k);
    const rate = hrs.length ? Math.max(...hrs.map((h) => num(h.precipitation) || 0)) : 0;
    const feels = hrs.length ? Math.max(...hrs.map((h) => num(h.apparent_temperature) || 0)) : 0;
    return resolveWeatherIcon(day.condition, { precipitationRate: rate, uvIndex: num(day.uv_index) || 0, apparentTemp: feels, windSpeed: num(day.wind_speed) || 0, tropicalMode: this._config.tropical_mode, heatFrom: this._heatFrom() });
  }

  _tideNow() {
    const s = this._state(this._config.tide);
    if (!s || !Array.isArray(s.attributes.predictions)) return null;
    const p = s.attributes.predictions.map((x) => ({ t: Date.parse(x.time), h: num(x.height), type: x.type })).filter((x) => x.h !== null).sort((a, b) => a.t - b.t);
    const now = Date.now();
    const i = p.findIndex((x) => x.t > now);
    if (i <= 0) return null;
    const heightAt = (t) => {
      const j = p.findIndex((x) => x.t > t);
      if (j <= 0) return null;
      const a = p[j - 1], b = p[j];
      const f = (t - a.t) / (b.t - a.t);
      return a.h + (b.h - a.h) * (1 - Math.cos(Math.PI * f)) / 2;
    };
    const next = p[i];
    const nextOther = p[i + 1];
    return { p, now: heightAt(now), rising: next.type === "high", next, nextOther, heightAt };
  }

  // ---------- building blocks ----------
  _rainOutlook(hourly) {
    if (!hourly || !hourly.length) return { text: T("loading"), cls: "", icon: "cloudy" };
    const now = Date.now();
    const h = hourly.filter((x) => Date.parse(x.datetime) + 3600000 > now).slice(0, 24);
    const p = h.map((x) => num(x.precipitation_probability) || 0);
    const start = p.slice(0, 12).findIndex((v) => v >= 50);
    if (start === -1) {
      const mx = Math.max(...p.slice(0, 12));
      return { text: T("no_rain", { p: Math.round(mx) }), cls: "ok", icon: "partlycloudy" };
    }
    let end = p.findIndex((v, i) => i > start && v < 40);
    const hh = end === -1 ? h : h.slice(0, end);
    const peak = Math.max(...p.slice(0, hh.length));
    const mm = hh.reduce((s, x) => s + (num(x.precipitation) || 0), 0);
    const t0 = this._fmtHour(new Date(Date.parse(h[start].datetime)));
    const t1 = end === -1 ? T("beyond_24h") : T("approx", { t: this._fmtHour(new Date(Date.parse(h[end].datetime))) });
    const lead = start === 0 ? T("rain_now") : T("rain_from", { t: t0 });
    const maxRate = Math.max(...hh.map((r) => num(r.precipitation) || 0));
    const thunder = hh.some((r) => String(r.condition).startsWith("lightning"));
    const ic = this._config.tropical_mode && maxRate >= 12 ? "tropical-monsoon" : (thunder ? "lightning-rainy" : (peak >= 80 ? "pouring" : "rainy"));
    return { text: `${lead} · ${T("until", { t: t1 })} · ${T("peak", { p: Math.round(peak) })} · ${mm.toFixed(1)} mm`, cls: peak >= 80 ? "warn" : "info", icon: ic };
  }

  _consensus() {
    const metrics = [
      { k: "temperature", label: T("temperature"), unit: "°", dec: 1 },
      { k: "wind_speed", label: T("wind"), unit: " km/h", dec: 0 },
      { k: "humidity", label: T("humidity"), unit: " %", dec: 0 },
      { k: "pressure", label: T("pressure"), unit: " hPa", dec: 0 },
    ];
    const srcs = this._config.sources.map((id) => ({ id, s: this._state(id) })).filter((x) => x.s);
    const short = (id) => { const s = this._state(id); const a = (s && s.attributes.attribution) || id; if (/pirate/i.test(a + id)) return "Pirate"; if (/openweather/i.test(a + id)) return "OWM"; if (/met\.no/i.test(a)) return "Met.no"; return (s && s.attributes.friendly_name) || id; };
    const local = { temperature: num(this._state(this._config.temperature)?.state), humidity: num(this._state(this._config.humidity)?.state), pressure: this._localPressure() };
    const tolerance = { temperature: 1.5, wind_speed: 5, humidity: 8, pressure: 2 };
    return metrics.map((m) => {
      const vals = srcs.map((x) => ({ n: short(x.id), v: num(x.s.attributes[m.k]) })).filter((x) => x.v !== null);
      const all = vals.map((x) => x.v);
      if (local[m.k] != null) all.push(local[m.k]);
      if (!all.length) return null;
      const lo = Math.min(...all), hi = Math.max(...all);
      const spread = hi - lo;
      const med = median(vals.map((x) => x.v));
      const agree = spread <= tolerance[m.k];
      const pad = Math.max(spread * 0.15, tolerance[m.k] * 0.5);
      const a = lo - pad, b = hi + pad;
      const pos = (v) => ((v - a) / (b - a)) * 100;
      const dots = vals.map((x) => `<span class="dot" style="left:${pos(x.v)}%" title="${x.n}: ${x.v.toFixed(m.dec)}${m.unit}"><i>${x.n}</i></span>`).join("")
        + (local[m.k] != null ? `<span class="dot loc" style="left:${pos(local[m.k])}%" title="${T("measured")}: ${local[m.k].toFixed(m.dec)}${m.unit}"><i>${T("local")}</i></span>` : "");
      const shown = local[m.k] != null ? local[m.k] : med;
      return `<div class="cons">
        <div class="ch"><span>${m.label}</span><b>${shown.toFixed(m.dec)}${m.unit}</b><em class="${agree ? "ag" : "dg"}">${agree ? T("agree") : "± " + (spread / 2).toFixed(m.dec)}</em></div>
        <div class="track"><div class="span" style="left:${pos(lo)}%;width:${pos(hi) - pos(lo)}%"></div>${dots}</div>
      </div>`;
    }).filter(Boolean).join("");
  }

  _hourlyView(hourly) {
    if (!hourly || !hourly.length) return `<div class="empty">${T("loading")}</div>`;
    const now = Date.now();
    const h = hourly.filter((x) => Date.parse(x.datetime) + 3600000 > now).slice(0, this._config.show_hours);
    const W = 600, H = 170, pl = 6, pr = 6, top = 30, base = 120;
    const cw = (W - pl - pr) / h.length;
    const temps = h.map((x) => num(x.temperature));
    const tmin = Math.min(...temps) - 0.5, tmax = Math.max(...temps) + 0.5;
    const ty = (t) => top + (1 - (t - tmin) / (tmax - tmin)) * 45;
    let bars = "", labels = "", uv = "", icons = "";
    const pts = [];
    h.forEach((x, i) => {
      const cx = pl + cw * i + cw / 2;
      const pp = num(x.precipitation_probability) || 0;
      const bh = (pp / 100) * 48;
      bars += `<rect x="${cx - cw * 0.34}" y="${base - bh}" width="${cw * 0.68}" height="${bh}" rx="2" fill="rgba(79,195,247,${0.25 + pp / 180})"/>`;
      pts.push([cx, ty(temps[i])]);
      const u = num(x.uv_index);
      if (u !== null && u >= 0.5) uv += `<rect x="${cx - cw / 2 + 0.5}" y="${base + 4}" width="${cw - 1}" height="4" fill="${uvLevel(u).c}"/>`;
      if (i % 3 === 0) {
        const d = new Date(Date.parse(x.datetime));
        labels += `<text x="${cx}" y="${base + 22}" class="lbl">${i === 0 ? T("now") : this._fmtHour(d).slice(0, 2)}</text>`;
        labels += `<text x="${cx}" y="${ty(temps[i]) - 8}" class="tv">${Math.round(temps[i])}°</text>`;
        if (pp >= 20) labels += `<text x="${cx}" y="${base + 36}" class="pv">${Math.round(pp)}%</text>`;
        const ic = resolveWeatherIcon(x.condition, { precipitationRate: num(x.precipitation) || 0, uvIndex: num(x.uv_index) || 0, apparentTemp: num(x.apparent_temperature) || 0, windSpeed: num(x.wind_speed) || 0, tropicalMode: this._config.tropical_mode, heatFrom: this._heatFrom() });
        icons += `<image href="${this._iconUrl(ic)}" x="${cx - 13}" y="${base + 37}" width="26" height="26"/>`;
      }
    });
    const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    const area = line + ` L ${pts[pts.length - 1][0]} ${base} L ${pts[0][0]} ${base} Z`;
    return `<svg class="hourly" viewBox="0 0 ${W} ${H + 28}">
      <defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(255,167,38,.35)"/><stop offset="1" stop-color="rgba(255,167,38,0)"/></linearGradient></defs>
      <line x1="0" y1="${base}" x2="${W}" y2="${base}" stroke="rgba(255,255,255,.08)"/>
      ${bars}<path d="${area}" fill="url(#tg)"/><path d="${line}" fill="none" stroke="#ffa726" stroke-width="2.2" stroke-linejoin="round"/>
      ${uv}${labels}${icons}
    </svg>
    <div class="legend"><span><i style="background:#ffa726"></i>${T("temperature")}</span><span><i style="background:#4fc3f7"></i>${T("rain_probability")}</span><span><i style="background:linear-gradient(90deg,#4caf50,#fdd835,#fb8c00,#e53935)"></i>UV</span></div>`;
  }

  _dailyView(daily) {
    if (!daily || !daily.length) return `<div class="empty">${T("loading")}</div>`;
    const d = daily.slice(0, 8);
    const lo = Math.min(...d.map((x) => num(x.templow) ?? num(x.temperature))), hi = Math.max(...d.map((x) => num(x.temperature)));
    const mmMax = Math.max(10, ...d.map((x) => num(x.precipitation) || 0));
    const pos = (v) => ((v - lo) / (hi - lo || 1)) * 100;
    return `<div class="days">` + d.map((x, i) => {
      const t = new Date(Date.parse(x.datetime));
      const tl = num(x.templow), th = num(x.temperature), mm = num(x.precipitation) || 0, pp = num(x.precipitation_probability);
      const ws = num(x.wind_speed);
      return `<div class="day">
        <span class="dn">${i === 0 ? T("today") : this._dayName(t)}</span>
        <span class="di">${this._icon(this._dayIcon(x), 28)}</span>
        <span class="dp">${pp !== null ? Math.round(pp) + "%" : ""}</span>
        <span class="dmm"><i style="width:${(mm / mmMax) * 100}%"></i><b>${mm.toFixed(1)}</b></span>
        <span class="dlo">${tl !== null ? Math.round(tl) + "°" : ""}</span>
        <span class="drange"><i style="left:${pos(tl ?? th)}%;width:${Math.max(4, pos(th) - pos(tl ?? th))}%"></i></span>
        <span class="dhi">${Math.round(th)}°</span>
        <span class="dw">${ws !== null && ws >= 20 ? "💨 " + Math.round(ws) : ""}</span>
      </div>`;
    }).join("") + `</div>`;
  }

  _rangeBar(today, temp) {
    if (!today) return "";
    const lo = num(today.templow), hi = num(today.temperature);
    if (lo === null || hi === null) return "";
    const f = temp === null ? null : clamp((temp - lo) / (hi - lo || 1), 0, 1);
    return `<div class="rng"><span>${Math.round(lo)}°</span><i>${f !== null ? `<b style="left:${(f * 100).toFixed(1)}%"></b>` : ""}</i><span>${Math.round(hi)}°</span></div>`;
  }

  _windGraph() {
    // next 24 h from the hourly forecast: wind (area) and gusts (dashed)
    const now = Date.now();
    const h = (this._hourly || []).filter((x) => Date.parse(x.datetime) + 3600000 > now).slice(0, 24);
    if (h.length < 4) return "";
    const w = h.map((x) => num(x.wind_speed) || 0), g = h.map((x) => num(x.wind_gust_speed));
    const hasG = g.some((v) => v !== null);
    const mx = Math.max(15, ...w, ...(hasG ? g.filter((v) => v !== null) : []));
    const W = 200, H = 54, X = (i) => (i / (h.length - 1)) * W, Y = (v) => H - 4 - (v / mx) * (H - 12);
    const line = (arr) => arr.map((v, i) => (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(v ?? 0).toFixed(1)).join(" ");
    const wl = line(w);
    const peak = Math.max(...w), gpk = hasG ? Math.max(...g.filter((v) => v !== null)) : null;
    return `<div class="wg"><div class="wgh"><span>${T("next_24h")}</span><span>${T("max")} ${Math.round(peak)}${gpk !== null ? ` · ${T("gust")} ${Math.round(gpk)}` : ""} km/h</span></div>
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><defs><linearGradient id="wgF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(0,188,212,.45)"/><stop offset="1" stop-color="rgba(0,188,212,0)"/></linearGradient></defs>
      <path d="${wl} L ${W} ${H} L 0 ${H} Z" fill="url(#wgF)"/><path d="${wl}" fill="none" stroke="#00bcd4" stroke-width="2" vector-effect="non-scaling-stroke"/>
      ${hasG ? `<path d="${line(g)}" fill="none" stroke="#ffc107" stroke-width="1.5" stroke-dasharray="4 3" vector-effect="non-scaling-stroke"/>` : ""}</svg></div>`;
  }

  _gust() {
    const g = this._num(this._config.wind_gust);
    return g !== null ? g : this._attr(this._activeWeather(), "wind_gust_speed");
  }

  _colsFor(w) { return !w ? 5 : w < 520 ? 3 : w < 660 ? 4 : 5; }

  // lays the tiles out so every row is full: the wind tile stretches to fill, otherwise the last tile does
  _tiles(tiles, wind) {
    const cw = this._cw || (this._root && this._root.content.clientWidth) || 0;
    const cols = this._colsFor(cw);
    this._colsNow = cols;
    const n = tiles.filter((t) => typeof t === "string").length;
    let w = 0, last = 1;
    if (tiles.some((t) => t && t.wind)) {
      for (let k = 2; k <= cols; k++) if ((n + k) % cols === 0) { w = k; break; }
      if (!w) { w = cols; const r = n % cols; if (r) last = cols - r + 1; }
    } else { const r = n % cols; if (r) last = cols - r + 1; }
    const strs = tiles.filter((t) => typeof t === "string");
    const lastStr = strs[strs.length - 1];
    const html = tiles.map((t) => {
      if (t && t.wind) return this._windTile(wind, w, cols);
      if (t === lastStr && last > 1) return t.replace('<div class="tile', `<div style="grid-column:span ${last}" class="tile`);
      return t;
    }).join("");
    return `<div class="tiles" style="grid-template-columns:repeat(${cols},minmax(0,1fr))">${html}</div>`;
  }

  _windTile({ ws, wb, gust }, span, cols) {
    const BFT = [1, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118];
    const NAMES = T("bft");
    const sp = ws ?? 0;
    const bft = BFT.filter((t) => sp >= t).length;
    const col = sp < 20 ? "#00bcd4" : sp < 29 ? "#4caf50" : sp < 50 ? "#ff9800" : "#ff4444";
    const gc = gust === null ? "#9e9e9e" : gust < 30 ? "#4caf50" : gust < 50 ? "#ffc107" : gust < 75 ? "#ff9800" : "#f44336";
    const chips = `<div class="chips">${gust !== null ? `<span class="chip" style="--cc:${gc}">${T("gust")} ${Math.round(gust)} km/h</span>` : ""}<span class="chip" style="--cc:${col}">Bft ${bft}</span></div>`;
    return `<div class="tile wnd" style="grid-column:span ${span}">
      <div class="wnd-l"><span class="tl">${T("wind")}</span><b>${ws !== null ? Math.round(ws) : "–"}<small> km/h</small></b><span class="ts" style="color:${col};opacity:1;font-weight:600">${NAMES[bft]}</span>${chips}</div>
      ${span >= 3 ? this._windGraph() : ""}
      ${this._compass(wb, sp)}
    </div>`;
  }

  _compass(wb, sp) {
    const c = 46, R = 31;
    let ticks = "";
    for (let a = 0; a < 360; a += 30) {
      const major = a % 90 === 0, r1 = R - (major ? 6 : 4), rad = (a * Math.PI) / 180;
      ticks += `<line x1="${(c + Math.sin(rad) * r1).toFixed(1)}" y1="${(c - Math.cos(rad) * r1).toFixed(1)}" x2="${(c + Math.sin(rad) * R).toFixed(1)}" y2="${(c - Math.cos(rad) * R).toFixed(1)}" stroke="rgba(255,255,255,${major ? 0.4 : 0.18})" stroke-width="${major ? 1.6 : 1}"/>`;
    }
    const lab = (t, x, y, f) => `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="8.5" font-weight="700" fill="${f}">${t}</text>`;
    const letters = lab("N", c, c - R - 8, "#d4af37") + lab("E", c + R + 8, c, "rgba(255,255,255,.45)") + lab("S", c, c + R + 8, "rgba(255,255,255,.45)") + lab("W", c - R - 8, c, "rgba(255,255,255,.45)");
    let needle = "", centre = `<text x="${c}" y="${c}" text-anchor="middle" dominant-baseline="central" font-size="13" fill="#9a9aa0">–</text>`;
    if (wb !== null) {
      const blow = sp >= 1, d = Math.max(0.6, 3 - sp / 12).toFixed(2);
      const stream = (begin) => `<line x1="${c}" y1="${c - R + 7}" x2="${c}" y2="${c - R + 19}" stroke="url(#cmpS)" stroke-width="3" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 20" dur="${d}s" begin="${begin}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.9;0" dur="${d}s" begin="${begin}s" repeatCount="indefinite"/></line>`;
      needle = `<g transform="rotate(${wb} ${c} ${c})">
        <defs><linearGradient id="cmpS" gradientUnits="userSpaceOnUse" x1="0" y1="${c - R + 7}" x2="0" y2="${c - R + 19}"><stop offset="0" stop-color="#ff4444" stop-opacity=".95"/><stop offset="1" stop-color="#ff4444" stop-opacity="0"/></linearGradient></defs>
        ${blow ? stream(0) + stream(-d / 2) : ""}
        ${blow ? `<circle cx="${c}" cy="${c - R}" r="5" fill="none" stroke="#ff4444" stroke-width="1.5"><animate attributeName="r" values="5;13" dur="${d}s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="${d}s" repeatCount="indefinite"/></circle>` : ""}
        <circle cx="${c}" cy="${c - R}" r="5" fill="#ff4444" stroke="#fff" stroke-width="1.5"/>
      </g>`;
      centre = `<text x="${c}" y="${c - 3}" text-anchor="middle" dominant-baseline="central" font-size="17" font-weight="800" fill="#fff">${COMPASS[Math.round(wb / 45) % 8]}</text><text x="${c}" y="${c + 12}" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#9a9aa0">${Math.round(wb)}°</text>`;
    }
    return `<svg class="cmp" viewBox="0 0 92 92"><circle cx="${c}" cy="${c}" r="${R}" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.14)" stroke-width="2"/>${ticks}${letters}${needle}${centre}</svg>`;
  }

  _weekStrip(daily) {
    // compact week at a glance, always visible (no tab)
    if (!daily || !daily.length) return "";
    const d = daily.slice(0, 8);
    return `<div class="week">` + d.map((x, i) => {
      const t = new Date(Date.parse(x.datetime));
      const tl = num(x.templow), th = num(x.temperature), pp = num(x.precipitation_probability), mm = num(x.precipitation) || 0;
      const wet = (pp !== null && pp >= 60) || mm >= 10;
      return `<div class="wd${i === 0 ? " now" : ""}">
        <span class="wn">${i === 0 ? T("today") : this._dayName(t)}</span>
        ${this._icon(this._dayIcon(x), 34)}
        <span class="wh">${th !== null ? Math.round(th) + "°" : "–"}</span>
        <span class="wl">${tl !== null ? Math.round(tl) + "°" : ""}</span>
        <span class="wp${wet ? " wet" : ""}">${pp !== null ? "💧" + Math.round(pp) + "%" : ""}</span>
      </div>`;
    }).join("") + `</div>`;
  }

  _tideView(tide) {
    if (!tide) return `<div class="empty">${T("no_tide")}</div>`;
    const now = Date.now(), from = now - 6 * 3600000, to = now + 24 * 3600000;
    const W = 600, H = 150, top = 20, bot = 115;
    const hs = tide.p.filter((x) => x.t > from - 86400000 && x.t < to + 86400000).map((x) => x.h);
    const hmin = Math.min(...hs), hmax = Math.max(...hs);
    const X = (t) => ((t - from) / (to - from)) * W;
    const Y = (h) => bot - ((h - hmin) / (hmax - hmin)) * (bot - top);
    let d = "";
    for (let t = from; t <= to; t += 15 * 60000) { const h = tide.heightAt(t); if (h !== null) d += (d ? "L" : "M") + X(t).toFixed(1) + " " + Y(h).toFixed(1) + " "; }
    const marks = tide.p.filter((x) => x.t > from && x.t < to).map((x) => ({ ...x, lx: clamp(X(x.t), 22, W - 22) })).map((x) =>
      `<circle cx="${X(x.t)}" cy="${Y(x.h)}" r="3.5" fill="${x.type === "high" ? "#4fc3f7" : "#90a4ae"}"/>
       <text x="${x.lx}" y="${x.type === "high" ? Y(x.h) - 9 : Y(x.h) + 18}" class="tv">${this._fmtTime(new Date(x.t))}</text>
       <text x="${x.lx}" y="${x.type === "high" ? Y(x.h) - 21 : Y(x.h) + 30}" class="pv">${x.h.toFixed(1)} m</text>`).join("");
    const nx = X(now), ny = Y(tide.now);
    return `<svg class="tide" viewBox="0 0 ${W} ${H}">
      <defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(79,195,247,.45)"/><stop offset="1" stop-color="rgba(79,195,247,.03)"/></linearGradient></defs>
      <path d="${d} L ${W} ${H} L 0 ${H} Z" fill="url(#wg)"/><path d="${d}" fill="none" stroke="#4fc3f7" stroke-width="2"/>
      <line x1="${nx}" y1="0" x2="${nx}" y2="${H}" stroke="rgba(212,175,55,.6)" stroke-dasharray="3 4"/>
      <circle cx="${nx}" cy="${ny}" r="5.5" fill="#d4af37" stroke="#141416" stroke-width="2"/>
      ${marks}
    </svg>
    <div class="legend"><span>${T("now")} ${tide.now.toFixed(2)} m · ${tide.rising ? T("rising") + " ▲" : T("falling") + " ▼"}</span><span>${tide.next.type === "high" ? T("high_tide") : T("low_tide")} ${this._fmtTime(new Date(tide.next.t))} (${tide.next.h.toFixed(2)} m)</span></div>`;
  }

  // ---------- Render ----------
  _render() {
    if (!this._hass || !this._config) return;
    LANG = this._lang();
    const c = this._config;
    const wid = this._activeWeather();
    const w = this._state(wid);
    if (!w) { this._root = null; this._skyKey = null; this.shadowRoot.innerHTML = `<ha-card style="padding:16px">${T("entity_missing", { e: c.weather })}</ha-card>`; return; }
    const a = w.attributes;
    const sun = this._sunInfo();
    let cond = w.state;
    if (cond === "sunny" && !sun.up) cond = "clear-night";
    const hourly = this._hourly;
    const nowH = hourly && hourly.find((h) => Date.parse(h.datetime) + 3600000 > Date.now());
    const cloudCov = num(a.cloud_coverage) ?? (cond === "cloudy" ? 95 : cond === "partlycloudy" ? 50 : 15);

    const locT = num(this._state(c.temperature)?.state);
    const locH = num(this._state(c.humidity)?.state);
    const temp = locT ?? num(a.temperature);
    const hum = locH ?? num(a.humidity);
    const hi = heatIndex(temp, hum);
    const hl = heatLevel(hi, this._zone());
    const dp = num(a.dew_point);
    const uvMax = hourly ? Math.max(...hourly.filter((x) => { const t = Date.parse(x.datetime); return t + 3600000 > Date.now() && t < Date.now() + 14 * 3600000; }).map((x) => num(x.uv_index) || 0)) : null;
    const ul = uvLevel(uvMax);
    const today = this._daily && this._daily[0];
    const rain = this._rainOutlook(hourly);
    const tide = this._tideNow();
    const wsList = c.sources.map((id) => this._attr(id, "wind_speed"));
    const ws = median(wsList);
    const wb = num(a.wind_bearing);
    let heroIcon = resolveWeatherIcon(cond, { precipitationRate: nowH ? num(nowH.precipitation) || 0 : 0, uvIndex: num(a.uv_index) ?? (nowH ? num(nowH.uv_index) || 0 : 0), apparentTemp: hi || 0, windSpeed: ws || 0, tropicalMode: c.tropical_mode, heatFrom: this._heatFrom() });
    if (!sun.up && heroIcon === "tropical-heat") heroIcon = cond;
    const cyc = this._cyclone();
    if (c.tropical_mode && cyc && cyc.near) heroIcon = "tropical-cyclone";
    const lt = this._lightning();
    const pt = this._pressureTrend();
    const sea = this._num(c.sea_temperature);
    const pLocal = this._localPressure();
    const pShown = pLocal ?? num(a.pressure);
    const name = c.name || (this._hass.config && this._hass.config.location_name) || T("weather");
    const daylightLeft = sun.up ? Math.max(0, sun.set - Date.now()) : null;
    const dl = daylightLeft !== null ? T("daylight_left", { h: Math.floor(daylightLeft / 3600000), m: Math.floor((daylightLeft % 3600000) / 60000) }) : T("to_sunrise", { h: Math.floor(Math.max(0, sun.rise - Date.now()) / 3600000), m: Math.floor((Math.max(0, sun.rise - Date.now()) % 3600000) / 60000) });

    const tabs = [["hourly", T("tab.hourly")], ["daily", T("tab.daily")], ["tide", T("tab.tide")], ["sources", T("tab.sources")], ["radar", T("tab.radar")]].filter(([k]) => (k !== "tide" || c.tide) && (k !== "radar" || c.radar_card));
    let body;
    if (this._tab === "daily") body = this._dailyView(this._daily);
    else if (this._tab === "tide") body = this._tideView(tide);
    else if (this._tab === "sources") body = `<div class="conswrap">${this._consensus()}</div><div class="note">${T("sources_note")}</div>`;
    else if (this._tab === "radar") body = "";
    else body = this._hourlyView(hourly);

    // build the skeleton once and redraw the sky only on real changes (otherwise animations restart)
    if (!this._root) {
      this.shadowRoot.innerHTML = `<style>${TropicalWeatherCard.styles}</style><ha-card><div class="hero"><div class="skyhost"></div><div class="overlay"></div></div><div class="content"></div><div class="radar"></div></ha-card>`;
      this._root = { sky: this.shadowRoot.querySelector(".skyhost"), overlay: this.shadowRoot.querySelector(".overlay"), content: this.shadowRoot.querySelector(".content"), radar: this.shadowRoot.querySelector(".radar") };
      if (window.ResizeObserver) {
        this._ro = new ResizeObserver((en) => { const w = en[0].contentRect.width; const b = this._colsFor(w); this._cw = w; if (b !== this._colsNow) this._render(); });
        this._ro.observe(this._root.content);
      }
      this._root.content.addEventListener("click", (e) => { const b = e.target.closest("button[data-tab]"); if (b) { this._tab = b.dataset.tab; this._render(); } });
    }
    const skyKey = [heroIcon, sun.up].join("|");
    if (skyKey !== this._skyKey) {
      this._skyKey = skyKey;
      const dim = !sun.up && heroIcon !== "clear-night" ? "linear-gradient(rgba(5,8,20,.5), rgba(5,8,20,.5)), " : "";
      this._root.sky.style.backgroundImage = `linear-gradient(180deg, rgba(20,20,22,0) 55%, rgba(20,20,22,.9) 100%), ${dim}url("${this._bgUrl(heroIcon)}")`;
    }
    this._root.overlay.innerHTML = `
        <div class="htop">
          <div class="hl">${this._icon(heroIcon, 64)}<div><div class="place">${name}</div><div class="cond">${((k) => { const v = T("cond." + k); return v.startsWith("cond.") ? k : v; })(heroIcon !== cond && heroIcon.startsWith("tropical") ? heroIcon : cond)}</div>${wid !== c.weather ? `<div class="fb">↺ ${(w.attributes && w.attributes.friendly_name) || wid}</div>` : ""}</div></div>
          <div class="sunbox">${sun.up ? "☀︎ ↓" : "☀︎ ↑"} ${this._fmtTime(new Date(sun.up ? sun.set : sun.rise))}<br><span>${dl}</span></div>
        </div>
        <div class="hbot">
          <div class="temp">${temp !== null ? temp.toFixed(1) : "–"}<sup>°C</sup></div>
          <div class="hmeta">
            <div>${T("feels_like")} <b style="color:${hl.c}">${hi !== null ? Math.round(hi) + "°" : "–"}</b> · ${hl.t}</div>
            ${hum !== null ? `<div class="hhum"><svg width="11" height="13" viewBox="0 0 24 28"><path d="M12 2C12 2 3 13 3 18.5a9 9 0 0 0 18 0C21 13 12 2 12 2z" fill="#4fc3f7"/></svg>${T("humidity")} <b>${Math.round(hum)} %</b>${locH !== null ? ` <span class="gold">●</span>` : ""}</div>` : ""}
            ${this._rangeBar(today, temp)}${locT !== null || locH !== null ? `<div class="msr">● ${T("measured")}</div>` : ""}
          </div>
        </div>`;
    const storm = this._stormTrack();
    const tiles = [
      `<div class="tile"><span class="tl">${T("heat_index")}</span><b style="color:${hl.c}">${hi !== null ? Math.round(hi) + "°" : "–"}</b><span class="ts">${hl.t}</span></div>`,
      `<div class="tile"><span class="tl">${T("mugginess")}</span><b>${dp !== null ? dp.toFixed(0) + "°" : "–"}</b><span class="ts">${dewLevel(dp)} · ${hum !== null ? Math.round(hum) : "–"} %</span></div>`,
      `<div class="tile"><span class="tl">${T("uv_max")}</span><b style="color:${ul.c}">${uvMax !== null ? uvMax.toFixed(1) : "–"}</b><span class="ts">${ul.t}</span></div>`,
      { wind: true },
      pShown !== null ? `<div class="tile"><span class="tl">${T("pressure")}</span><b>${Math.round(pShown)}<small> hPa</small></b><span class="ts">${pt ? `${pt.arrow} ${pt.t > 0 ? "+" : ""}${pt.t.toFixed(1)} / 3 h · ${pt.label}` : (pLocal !== null ? T("measured") : "")}</span></div>` : "",
      lt ? `<div class="tile${lt.near ? " hot" : ""}"><span class="tl">${T("lightning")}</span>${lt.active ? `<b>${lt.d.toFixed(0)}<small> km</small></b><span class="ts">${lt.az !== null ? `${T("from", { d: COMPASS[Math.round(lt.az / 45) % 8] })} · ` : ""}${T("strikes", { n: lt.n })}${storm.trend ? ` · ${storm.trend === "approach" ? "▼ ~" + storm.eta + " min" : T(storm.trend === "away" ? "storm_away" : "storm_steady")}` : ""}</span>` : `<b>–</b><span class="ts">${T("none_nearby")}</span>`}</div>` : "",
      sea !== null ? `<div class="tile"><span class="tl">${T("sea")}</span><b>${sea.toFixed(1)}°</b><span class="ts">${T("water_temp")}</span></div>` : "",
      tide ? `<div class="tile"><span class="tl">${T("tide")}</span><b>${tide.now.toFixed(1)}<small> m</small></b><span class="ts">${tide.rising ? "▲ " + T("rising") : "▼ " + T("falling")} · ${tide.next.type === "high" ? T("high") : T("low")} ${this._fmtTime(new Date(tide.next.t))}</span></div>` : ""
    ].filter(Boolean);
    this._root.content.innerHTML = `
      ${cyc ? `<div class="alert cyc">${this._icon("tropical-cyclone", 30)}<span>${T("cond.tropical-cyclone")}: <b>${cyc.name}</b>${cyc.dist !== null ? ` · ${T("km_away", { d: Math.round(cyc.dist) })}` : ""}</span></div>` : ""}
      ${lt && lt.near && storm.trend !== "approach" ? `<div class="alert bolt">${this._icon("lightning", 30)}<span>${T("lightning")} <b>${lt.d.toFixed(0)} km</b>${lt.az !== null ? ` ${T("to_the", { d: COMPASS[Math.round(lt.az / 45) % 8] })}` : ""} · ${T("strikes", { n: lt.n })}</span></div>` : ""}
      ${storm.trend === "approach" && lt && lt.active && (storm.eta <= 60 || lt.d <= 30) ? `<div class="alert bolt">${this._icon("lightning-rainy", 30)}<span>${T("storm_approach", { d: lt.az !== null ? COMPASS[Math.round(lt.az / 45) % 8] : "–", m: storm.eta })}</span></div>` : ""}
      ${storm.until && storm.until > Date.now() ? `<div class="alert bolt">${this._icon("lightning", 30)}<span>${T("stay_inside", { t: this._fmtTime(new Date(storm.until)) })}</span></div>` : ""}
      <div class="rain ${rain.cls}">${this._icon(rain.icon, 30)}<span>${rain.text}</span></div>
      ${c.insights !== false ? this._insights(temp, ws) : ""}
      ${this._tiles(tiles, { ws, wb, gust: this._gust(), sources: c.sources })}
      ${c.show_week !== false ? this._weekStrip(this._daily) : ""}
      <div class="tabs">${tabs.map(([k, l]) => `<button data-tab="${k}" class="${this._tab === k ? "on" : ""}">${l}</button>`).join("")}</div>
      <div class="body">${body}</div>`;
    this._root.radar.style.display = this._tab === "radar" ? "block" : "none";
    if (this._tab === "radar") this._ensureRadar();
  }
}

TropicalWeatherCard.styles = `
  :host { --gold: #d4af37; }
  ha-card { display: block; overflow: hidden; background: #141416; color: #e8e8ea; border-radius: 12px; border: none;
    box-shadow: 0px 0px 15px 3px rgba(255, 215, 0, 0.8); font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif); }
  .hero { position: relative; height: 244px; }
  .skyhost, .sky { position: absolute; inset: 0; width: 100%; height: 100%; }
  .skyhost { background-size: cover; background-position: center; background-repeat: no-repeat; }
  .htop, .hbot { position: absolute; left: 18px; right: 18px; display: flex; justify-content: space-between; text-shadow: 0 1px 6px rgba(0,0,0,.55); }
  .htop { top: 14px; align-items: flex-start; }
  .hbot { bottom: 26px; align-items: flex-end; }
  .hl { display: flex; align-items: center; gap: 10px; }
  .hl .wxi { width: 64px; height: 64px; padding: 6px; box-sizing: border-box; border-radius: 50%; background: rgba(10,12,20,.55); box-shadow: 0 0 0 1px rgba(255,215,0,.55), 0 0 12px rgba(255,215,0,.35); }
  .wxi { display: block; }
  .rain .wxi { flex: 0 0 30px; }
  .place { font-size: 13px; letter-spacing: .08em; text-transform: uppercase; color: var(--gold); font-weight: 600; }
  .cond { font-size: 22px; font-weight: 500; margin-top: 2px; }
  .sunbox { text-align: right; font-size: 13px; font-weight: 600; }
  .sunbox span { font-weight: 400; opacity: .8; font-size: 12px; }
  .temp { font-size: 64px; font-weight: 300; line-height: 1; letter-spacing: -2px; }
  .temp sup { font-size: 20px; vertical-align: top; margin-left: 4px; letter-spacing: 0; opacity: .8; }
  .hmeta { text-align: right; font-size: 13px; line-height: 1.6; }
  .gold { color: var(--gold); }
  .rain { display: flex; align-items: center; gap: 10px; margin: 12px 14px 0; padding: 10px 12px; border-radius: 10px; font-size: 14px;
    background: rgba(79,195,247,.08); border: 1px solid rgba(79,195,247,.25); }
  .rain.warn { background: rgba(41,121,255,.14); border-color: rgba(79,195,247,.55); }
  .rain.ok { background: rgba(76,175,80,.08); border-color: rgba(76,175,80,.3); }
  .alert { display: flex; align-items: center; gap: 10px; margin: 12px 14px 0; padding: 10px 12px; border-radius: 10px; font-size: 14px; }
  .alert .wxi { flex: 0 0 30px; }
  .alert.bolt { background: rgba(250,204,21,.12); border: 1px solid rgba(250,204,21,.55); animation: pulse 1.6s ease-in-out infinite; }
  .alert.cyc { background: rgba(239,68,68,.14); border: 1px solid rgba(239,68,68,.6); animation: pulse 1.6s ease-in-out infinite; }
  @keyframes pulse { 50% { box-shadow: 0 0 14px rgba(255,200,0,.35); } }
  .tile.hot { border-color: rgba(250,204,21,.7); box-shadow: 0 0 10px rgba(250,204,21,.35); animation: pulse 1.6s ease-in-out infinite; }
  .tile.hot b { color: #facc15; }
  .radar { padding: 0 14px 14px; }
  .radar > * { display: block; border-radius: 12px; overflow: hidden; }
  .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(96px, 1fr)); gap: 8px; margin: 12px 14px 0; }
  .tile { background: #1c1c1f; border: 1px solid rgba(255,255,255,.06); border-radius: 10px; padding: 9px 10px; display: flex; flex-direction: column; gap: 2px; }
  .tl { font-size: 10.5px; text-transform: uppercase; letter-spacing: .06em; opacity: .6; }
  .tile b { font-size: 21px; font-weight: 500; }
  .tile b small { font-size: 12px; opacity: .7; }
  .ts { font-size: 11.5px; opacity: .75; }
  .tabs { display: flex; gap: 4px; margin: 14px 14px 0; border-bottom: 1px solid rgba(255,255,255,.08); }
  .tabs button { background: none; border: none; color: #9a9aa0; font: inherit; font-size: 13px; padding: 8px 10px; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; }
  .tabs button.on { color: var(--gold); border-bottom-color: var(--gold); }
  .body { padding: 10px 14px 14px; }
  svg.hourly, svg.tide { width: 100%; display: block; }
  .lbl { fill: #8c8c92; font-size: 11px; text-anchor: middle; }
  .tv { fill: #e8e8ea; font-size: 11.5px; text-anchor: middle; font-weight: 500; }
  .pv { fill: #4fc3f7; font-size: 10.5px; text-anchor: middle; }
  .legend { display: flex; flex-wrap: wrap; gap: 14px; font-size: 11.5px; opacity: .75; margin-top: 4px; }
  .legend i { display: inline-block; width: 14px; height: 4px; border-radius: 2px; vertical-align: middle; margin-right: 5px; }
  .content { container-type: inline-size; }
  .tiles { grid-auto-flow: row dense; }
  .ins-row { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .tile.ins .tl { display: flex; align-items: center; gap: 4px; }
  .tile.ins ha-icon { --mdc-icon-size: 14px; width: 14px; height: 14px; color: var(--gold); opacity: .9; }
  .tile b.sm { font-size: 17px; }
  @container (max-width: 520px) { .ins-row { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .content > :first-child { margin-top: -18px; position: relative; z-index: 2; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); background-color: rgba(20,24,32,.72); }
  .rng { display: flex; align-items: center; gap: 6px; justify-content: flex-end; font-size: 12px; margin-top: 3px; }
  .rng span { opacity: .8; }
  .rng i { position: relative; width: 74px; height: 5px; border-radius: 3px; background: linear-gradient(90deg, #4fc3f7, #ffca28, #ff7043); }
  .rng b { position: absolute; top: 50%; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 2px rgba(20,20,22,.8), 0 0 6px rgba(255,255,255,.7); }
  .msr { font-size: 11px; color: var(--gold); margin-top: 2px; }
  .fb { font-size: 11px; opacity: .75; margin-top: 2px; }
  .hhum { display: flex; align-items: center; justify-content: flex-end; gap: 4px; }
  .hhum b { font-weight: 600; }
  .hhum .gold { font-size: 9px; }
  .wg { flex: 1 1 auto; min-width: 0; align-self: stretch; display: flex; flex-direction: column; justify-content: flex-end; padding: 0 4px; }
  .wg svg { width: 100%; height: 54px; display: block; }
  .wgh { display: flex; justify-content: space-between; gap: 6px; font-size: 10.5px; opacity: .7; margin-bottom: 4px; white-space: nowrap; }
  .tile.wnd { flex-direction: row; align-items: center; justify-content: space-between; gap: 10px; }
  .wnd-l { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .chips { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px; }
  .chip { font-size: 10.5px; font-weight: 600; padding: 2px 8px; border-radius: 999px; white-space: nowrap; color: var(--cc);
    background: color-mix(in srgb, var(--cc) 14%, transparent); border: 1px solid color-mix(in srgb, var(--cc) 45%, transparent); }
  .cmp { flex: 0 0 92px; width: 92px; height: 92px; }
  .week { display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); gap: 4px; margin: 12px 14px 0; }
  .wd { display: flex; flex-direction: column; align-items: center; gap: 1px; padding: 7px 2px 6px; background: #1c1c1f; border: 1px solid rgba(255,255,255,.06); border-radius: 10px; font-size: 12px; }
  .wd.now { border-color: rgba(212,175,55,.55); }
  .wn { color: #9a9aa0; font-size: 11px; }
  .wd.now .wn { color: var(--gold); }
  .wh { font-size: 15px; font-weight: 500; }
  .wl { color: #8a8a90; font-size: 12px; }
  .wp { color: #7fb3d5; font-size: 11px; min-height: 14px; }
  .wp.wet { color: #4fc3f7; font-weight: 500; }
  @container (max-width: 440px) {
    .week { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 4px; margin: 12px 12px 0; }
    .wd:nth-child(n+7) { display: none; }
    .wd .wxi { width: 32px; height: 32px; }
    .wp { font-size: 10.5px; }
    .cmp { flex-basis: 78px; width: 78px; height: 78px; }
  }
  .days { display: flex; flex-direction: column; }
  .day { display: grid; grid-template-columns: 44px 30px 38px 1fr 30px 1.2fr 30px 46px; align-items: center; gap: 6px; padding: 5px 0; border-bottom: 1px solid rgba(255,255,255,.05); font-size: 13px; }
  .day:last-child { border-bottom: none; }
  .dp { color: #4fc3f7; font-size: 12px; }
  .dmm { position: relative; height: 16px; background: rgba(255,255,255,.04); border-radius: 4px; overflow: hidden; }
  .dmm i { position: absolute; left: 0; top: 0; bottom: 0; background: rgba(79,195,247,.45); }
  .dmm b { position: relative; font-size: 11px; font-weight: 400; padding-left: 5px; line-height: 16px; }
  .dlo { text-align: right; opacity: .65; }
  .drange { position: relative; height: 6px; background: rgba(255,255,255,.07); border-radius: 3px; }
  .drange i { position: absolute; top: 0; bottom: 0; border-radius: 3px; background: linear-gradient(90deg, #ffca28, #ff7043); }
  .dw { font-size: 11px; opacity: .8; }
  .conswrap { display: flex; flex-direction: column; gap: 16px; padding-top: 6px; }
  .ch { display: flex; align-items: baseline; gap: 8px; font-size: 13px; }
  .ch span { opacity: .7; width: 78px; }
  .ch b { font-size: 16px; font-weight: 500; }
  .ch em { font-style: normal; font-size: 11px; padding: 1px 7px; border-radius: 8px; margin-left: auto; }
  .ag { background: rgba(76,175,80,.15); color: #81c784; }
  .dg { background: rgba(255,160,0,.15); color: #ffb74d; }
  .track { position: relative; height: 26px; margin-top: 4px; }
  .track::before { content: ""; position: absolute; left: 0; right: 0; top: 7px; height: 2px; background: rgba(255,255,255,.08); }
  .span { position: absolute; top: 5px; height: 6px; border-radius: 3px; background: rgba(255,255,255,.12); }
  .dot { position: absolute; top: 3px; width: 10px; height: 10px; margin-left: -5px; border-radius: 50%; background: #90a4ae; }
  .dot i { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); font-size: 9.5px; font-style: normal; opacity: .7; white-space: nowrap; }
  .dot.loc { background: var(--gold); box-shadow: 0 0 6px rgba(212,175,55,.8); }
  .dot.loc i { color: var(--gold); opacity: 1; top: -13px; }
  .note { font-size: 11.5px; opacity: .55; margin-top: 12px; }
  .empty { padding: 24px 0; text-align: center; opacity: .6; font-size: 13px; }
  @media (prefers-reduced-motion: reduce) { .alert, .tile.hot { animation: none; } }
`;

customElements.define("tropical-weather-card", TropicalWeatherCard);
window.customCards = window.customCards || [];
window.customCards.push({ type: "tropical-weather-card", name: "Tropical Weather Card", description: "A weather card built for the tropics: heat index, rain outlook, thunderstorm tracking, tides and day planning in 19 languages", preview: true });
console.info(`%c TROPICAL-WEATHER-CARD %c v${TWC_VERSION} `, "background:#d4af37;color:#000;font-weight:700", "background:#141416;color:#d4af37");
