// ===== GENERATE PAGE =====

// Style option toggle
document.querySelectorAll(".style-opt").forEach(opt => {
  opt.addEventListener("click", () => {
    document.querySelectorAll(".style-opt").forEach(o => o.classList.remove("active"));
    opt.classList.add("active");
  });
});

// Mood toggle
document.querySelectorAll(".mood-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".mood-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Color toggle
document.querySelectorAll(".color-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".color-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Char count
const topicInput = document.getElementById("poemTopic");
const charCount = document.getElementById("charCount");
if (topicInput) {
  topicInput.addEventListener("input", () => {
    charCount.textContent = `${topicInput.value.length}/100`;
  });
}

function setTopic(val) {
  if (topicInput) {
    topicInput.value = val;
    charCount.textContent = `${val.length}/100`;
    topicInput.focus();
  }
}

// ===== POEM BANK =====
const POEM_BANK = {
  "luc-bat": [
    { title: "Mưa Chiều Nhớ Ai", lines: `Mưa chiều rơi nhẹ trên sân,\nNhớ người đã khuất, lòng chưa nguôi ngoai.\nGió đưa hương cũ về đây,\nMắt ai long lanh, tay ai vẫy chào.\nThời gian như nước qua cầu,\nChỉ còn kỷ niệm đậm màu trong tim.` },
    { title: "Chiều Vàng Xa Xứ", lines: `Chiều về trên những con đường,\nLá vàng rơi nhẹ, vấn vương lòng người.\nNhớ ai đứng đó mỉm cười,\nBây giờ đã khuất chân trời xa xăm.\nTình yêu như áng mây trắng,\nThoáng qua rồi mất, để lòng bâng khuâng.` },
    { title: "Đêm Nghe Mưa Rơi", lines: `Đêm nay mưa rơi trên mái nhà,\nTiếng mưa như tiếng ai thì thầm xa.\nLòng tôi bỗng nhớ ngày xưa đó,\nHai đứa ngồi nghe mưa, chẳng nói gì.\nBây giờ mỗi đứa một phương trời,\nMưa vẫn rơi, nhưng lòng đã nguội rồi.` },
    { title: "Quê Hương Trong Mơ", lines: `Xa quê đã mấy mùa thu,\nNhớ con đường nhỏ, nhớ bờ ao xưa.\nMẹ già tóc bạc đợi chờ,\nCon đi biền biệt, bao giờ mới về.\nQuê hương ơi, đất mẹ hiền,\nDù đi muôn nẻo, lòng vẫn hướng về.` },
  ],
  "tu-tuyet": [
    { title: "Sương Mai", lines: `Sương mai phủ nhẹ trên đồng xanh,\nGiọt nước long lanh như mắt anh.\nChim hót vang lời chào buổi sáng,\nLòng tôi bỗng nhẹ, bỗng thanh thanh.` },
    { title: "Lá Thu Rơi", lines: `Lá vàng rơi nhẹ trước hiên nhà,\nMùa thu về mang theo nỗi xa.\nGió thổi qua mang hương cỏ dại,\nLòng tôi bỗng nhớ những ngày qua.` },
    { title: "Hoàng Hôn Biển", lines: `Mặt trời chìm xuống biển xa khơi,\nNhuộm đỏ cả một góc chân trời.\nSóng vỗ bờ như tiếng thở dài,\nCủa biển cả nhớ thương ai rồi.` },
    { title: "Đêm Trăng Một Mình", lines: `Trăng lên soi bóng kẻ cô đơn,\nNgồi đây nhớ mãi chuyện xa hơn.\nGió thổi qua mang hương hoa cũ,\nLòng bỗng dưng thấy nhớ ai hơn.` },
    { title: "Mùa Xuân Đến", lines: `Xuân về hoa nở khắp vườn xanh,\nBướm lượn ong bay, cảnh thật xinh.\nLòng người bỗng nhẹ như mây trắng,\nQuên hết ưu phiền, sống thật tình.` },
  ],
  "hien-dai": [
    { title: "Khoảng Trống", lines: `tôi ngồi đây\ngiữa thành phố ồn ào\nnhớ một buổi chiều\ntrên cánh đồng vắng\n\nem đứng đó\ntóc bay trong gió\nnụ cười như nắng\ntan vào không gian\n\nbây giờ\nchỉ còn tiếng xe\nvà khoảng trống\nmang tên em.` },
    { title: "Giọt Mưa Cuối Mùa", lines: `mưa không báo trước\ncũng như em đến\nrồi đi\n\ntôi đứng ở cửa sổ\nnhìn những giọt nước\nchạy dài trên kính\n\nmỗi giọt\nlà một kỷ niệm\ntan vào đất\n\nvà tôi\nvẫn đứng đây\nchờ mưa tạnh.` },
    { title: "Thành Phố Không Ngủ", lines: `3 giờ sáng\nthành phố vẫn thức\nnhư tôi\n\nđèn đường vàng\nchiếu xuống những bóng người\nai cũng có một nỗi riêng\n\ntôi đi bộ\nkhông biết về đâu\nchỉ biết rằng\nđêm nay\nrất dài.` },
    { title: "Mẹ Và Tôi", lines: `mẹ gọi điện\nhỏi con ăn chưa\ntôi nói rồi\nnhưng thực ra chưa\n\nmẹ không biết\ntôi đang ngồi một mình\ngiữa căn phòng trọ\nnhớ mùi cơm mẹ nấu\n\ncó những thứ\nkhông thể nói qua điện thoại\nnhưng mẹ vẫn hiểu\nbằng cách nào đó.` },
  ],
  "haiku": [
    { title: "Lá Thu", lines: `Lá vàng rơi nhẹ\nSương mai còn đọng trên cành\nEm đã đi rồi.` },
    { title: "Mưa Chiều", lines: `Mưa chiều lất phất\nHương hoa cũ còn vương đây\nNhớ ai xa xôi.` },
    { title: "Trăng Đêm", lines: `Trăng lên một mình\nSoi bóng kẻ cô đơn ngồi\nGió thổi lạnh lòng.` },
    { title: "Biển Sáng", lines: `Sóng vỗ bờ xa\nMặt trời lên từ biển sâu\nNgày mới bắt đầu.` },
    { title: "Hoa Nở", lines: `Hoa nở ban mai\nGiọt sương còn đọng cánh hoa\nĐẹp đến nao lòng.` },
  ],
};

const IMG_SEEDS_BY_COLOR = {
  warm:   ["sunset-warm-golden", "autumn-leaves-golden", "morning-coffee-peaceful", "sunrise-warm-field"],
  cool:   ["rain-forest-green", "misty-field-dawn", "blue-door-mystery", "rain-window-love"],
  dreamy: ["dreamy-forest-light", "dreamy-ocean-blue", "cloud-city-fantasy", "flying-clouds-freedom"],
  dark:   ["night-city-lights-street", "distance-longing-window", "couple-rain-street", "old-tree-couple-promise"],
  nature: ["mountain-sunrise-fog", "misty-field-dawn", "rain-forest-green", "autumn-leaves-golden"],
};

let generatedHistory = [];

function generatePoem() {
  const topic = topicInput ? topicInput.value.trim() : "";
  const style = document.querySelector(".style-opt.active")?.dataset.value || "tu-tuyet";
  const mood = document.querySelector(".mood-btn.active")?.dataset.mood || "buon";
  const color = document.querySelector(".color-btn.active")?.dataset.color || "warm";

  const btn = document.getElementById("generateBtn");
  const btnText = document.getElementById("btnText");
  const placeholder = document.getElementById("resultPlaceholder");
  const content = document.getElementById("resultContent");

  btn.classList.add("loading");
  btnText.textContent = "Đang tạo...";
  if (content) content.style.display = "none";
  if (placeholder) placeholder.style.display = "flex";

  setTimeout(() => {
    const bank = POEM_BANK[style] || POEM_BANK["tu-tuyet"];
    const chosen = bank[Math.floor(Math.random() * bank.length)];
    const seeds = IMG_SEEDS_BY_COLOR[color] || IMG_SEEDS_BY_COLOR.warm;
    const seed = seeds[Math.floor(Math.random() * seeds.length)];
    const styleLabels = { "luc-bat": "Lục Bát", "tu-tuyet": "Tứ Tuyệt", "hien-dai": "Hiện Đại", "haiku": "Haiku" };
    const moodLabels = { buon: "Buồn", vui: "Vui", nho: "Nhớ Nhung", "binh-yen": "Bình Yên", "lang-man": "Lãng Mạn", "huyen-bi": "Huyền Bí" };

    // Inject result
    document.getElementById("resultImg").src = imgUrl(seed, 700, 400);
    document.getElementById("resultTitle").textContent = `"${chosen.title}"`;
    document.getElementById("resultText").innerHTML = chosen.lines.replace(/\n/g, "<br />");
    document.getElementById("resultTag").textContent = topic || styleLabels[style];
    document.getElementById("resultStyle").textContent = "📝 " + styleLabels[style];
    document.getElementById("resultMood").textContent = "💭 " + (moodLabels[mood] || mood);

    if (placeholder) placeholder.style.display = "none";
    if (content) content.style.display = "flex";

    // Save to history
    generatedHistory.unshift({ title: chosen.title, lines: chosen.lines, seed, style: styleLabels[style] });
    renderHistory();

    btn.classList.remove("loading");
    btnText.textContent = "Tạo Thơ";
  }, 1600);
}

function renderHistory() {
  const section = document.getElementById("genHistory");
  const grid = document.getElementById("historyGrid");
  if (!section || !grid || generatedHistory.length === 0) return;
  section.style.display = "block";
  grid.innerHTML = generatedHistory.slice(0, 8).map(h => `
    <div class="history-card">
      <img src="${imgUrl(h.seed, 300, 200)}" alt="${h.title}" loading="lazy" />
      <div class="history-body">
        <h4>"${h.title}"</h4>
        <p>${h.lines.split("\n")[0]}</p>
      </div>
    </div>`).join("");
}

function copyPoem() {
  const text = document.getElementById("resultText")?.innerText;
  const title = document.getElementById("resultTitle")?.innerText;
  if (text) { navigator.clipboard.writeText(`${title}\n\n${text}\n\n— PoetryAI`); showToast("Đã sao chép bài thơ!"); }
}

function sharePoem() {
  const text = document.getElementById("resultText")?.innerText;
  if (navigator.share && text) {
    navigator.share({ title: "PoetryAI", text });
  } else {
    navigator.clipboard.writeText(window.location.href);
    showToast("Đã sao chép link chia sẻ!");
  }
}

function downloadPoem() {
  const text = document.getElementById("resultText")?.innerText;
  const title = document.getElementById("resultTitle")?.innerText || "bai-tho";
  if (!text) return;
  const blob = new Blob([`${title}\n\n${text}\n\n— PoetryAI`], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "bai-tho-poetryai.txt";
  a.click();
}

function saveToGallery() {
  showToast("Đã lưu vào bộ sưu tập của bạn! 💾");
}
