// ===== POEM DETAIL PAGE =====
const params = new URLSearchParams(window.location.search);
const poemId = params.get("id");
const poem = getPoemById(poemId);
const container = document.getElementById("poemPage");

if (!poem) {
  container.innerHTML = `
    <div class="poem-loading">
      <div style="font-size:3rem">😔</div>
      <h2>Không tìm thấy bài thơ</h2>
      <p>Bài thơ này không tồn tại hoặc đã bị xóa.</p>
      <a href="gallery.html" class="btn-primary" style="margin-top:20px">Quay Lại Thư Viện</a>
    </div>`;
} else {
  document.title = `"${poem.title}" — PoetryAI`;

  const related = getRelatedPoems(poem.id, poem.category, 3);
  const poemLines = poem.poem.split("\n").map(l => l.trim() ? `<span>${l}</span>` : `<br />`).join("<br />");

  let liked = false;

  container.innerHTML = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="index.html">Trang Chủ</a>
      <span>›</span>
      <a href="gallery.html">Thư Viện</a>
      <span>›</span>
      <a href="gallery.html?cat=${poem.category}">${poem.tag}</a>
      <span>›</span>
      <span>${poem.title}</span>
    </div>

    <!-- POEM HERO -->
    <div class="poem-hero">
      <div class="poem-hero-img">
        <img src="${imgUrl(poem.seed, 800, 700)}" alt="${poem.title}" />
      </div>
      <div class="poem-hero-content">
        <span class="poem-category-tag">${poem.tag}</span>
        <h1>"${poem.title}"</h1>
        <div class="poem-full-text">${poemLines}</div>
        <div class="poem-info-row">
          <span class="poem-info-badge">📝 ${poem.style}</span>
          <span class="poem-info-badge">💭 ${poem.mood}</span>
          <span class="poem-info-badge">🤖 PoetryAI</span>
        </div>
        <div class="poem-actions">
          <button class="poem-action-btn" id="likeBtn" onclick="toggleLike()">
            ❤ Yêu Thích (<span id="likeCount">${poem.likes.toLocaleString()}</span>)
          </button>
          <button class="poem-action-btn" onclick="copyPoemDetail()">📋 Sao Chép</button>
          <button class="poem-action-btn" onclick="sharePoemDetail()">🔗 Chia Sẻ</button>
          <button class="poem-action-btn" onclick="downloadPoemDetail()">⬇ Tải Về</button>
        </div>
      </div>
    </div>

    <!-- STATS BAR -->
    <div class="poem-stats-bar">
      <div class="ps-item"><span class="ps-num">${poem.likes.toLocaleString()}</span> lượt yêu thích</div>
      <div class="ps-item"><span class="ps-num">${poem.comments}</span> bình luận</div>
      <div class="ps-item"><span class="ps-num">${poem.views.toLocaleString()}</span> lượt xem</div>
      <div class="ps-item"><span class="ps-num">${poem.style}</span> phong cách</div>
      <div class="ps-item"><span class="ps-num">${poem.mood}</span> cảm xúc</div>
    </div>

    <!-- RELATED -->
    <div class="poem-related">
      <div class="section-header">
        <span class="section-tag">Có Thể Bạn Thích</span>
        <h2>Bài Thơ<br /><em>Liên Quan</em></h2>
      </div>
      <div class="related-grid">
        ${related.map(r => `
          <a href="poem.html?id=${r.id}" class="related-card">
            <img src="${imgUrl(r.seed, 400, 240)}" alt="${r.title}" loading="lazy" />
            <div class="related-body">
              <span class="card-tag">${r.tag}</span>
              <h4>"${r.title}"</h4>
              <p>${r.poem.split("\n")[0]}</p>
              <div class="card-meta" style="margin-top:8px">
                <span>❤ ${fmtNum(r.likes)}</span>
                <span>💬 ${r.comments}</span>
              </div>
            </div>
          </a>`).join("")}
      </div>
    </div>`;
}

function toggleLike() {
  if (!poem) return;
  liked = !liked;
  const btn = document.getElementById("likeBtn");
  const count = document.getElementById("likeCount");
  const newCount = liked ? poem.likes + 1 : poem.likes;
  count.textContent = newCount.toLocaleString();
  btn.classList.toggle("liked", liked);
  showToast(liked ? "Đã thêm vào yêu thích ❤" : "Đã bỏ yêu thích");
}

function copyPoemDetail() {
  if (!poem) return;
  navigator.clipboard.writeText(`"${poem.title}"\n\n${poem.poem}\n\n— PoetryAI`);
  showToast("Đã sao chép bài thơ!");
}

function sharePoemDetail() {
  if (!poem) return;
  if (navigator.share) {
    navigator.share({ title: `"${poem.title}" — PoetryAI`, text: poem.poem, url: window.location.href });
  } else {
    navigator.clipboard.writeText(window.location.href);
    showToast("Đã sao chép link chia sẻ!");
  }
}

function downloadPoemDetail() {
  if (!poem) return;
  const blob = new Blob([`"${poem.title}"\n\n${poem.poem}\n\n— PoetryAI`], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${poem.title.toLowerCase().replace(/\s+/g, "-")}.txt`;
  a.click();
}
