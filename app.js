// ===== SHARED UTILITIES =====

// Page transition — fade out khi click link sang trang khác
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[href]");
  if (!link) return;
  const href = link.getAttribute("href");
  // Chỉ xử lý link nội bộ .html, không phải anchor (#) hay external
  if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto")) return;
  e.preventDefault();
  document.body.style.transition = "opacity 0.25s ease, transform 0.25s ease";
  document.body.style.opacity = "0";
  document.body.style.transform = "translateY(-6px)";
  setTimeout(() => { window.location.href = href; }, 260);
});

// Nav scroll shadow
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav");
  if (nav) nav.style.boxShadow = window.scrollY > 20 ? "0 4px 20px rgba(26,20,16,0.1)" : "none";
});

// Toast notification
function showToast(msg, duration = 2500) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

// Newsletter subscribe
function subscribeNewsletter(btn) {
  const input = btn.previousElementSibling;
  if (!input.value || !input.value.includes("@")) {
    showToast("Vui lòng nhập email hợp lệ.");
    return;
  }
  btn.textContent = "✓";
  btn.style.background = "#4caf50";
  input.value = "";
  showToast("Đăng ký thành công! Cảm ơn bạn.");
}

// Format number
function fmtNum(n) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "k" : n.toString();
}

// Render a standard card (dùng cho home latest & gallery)
function renderCard(p, linkClass = "latest-card") {
  const lines = p.poem.split("\n").slice(0, 2).join("<br />");
  return `
    <a href="poem.html?id=${p.id}" class="${linkClass}">
      <img src="${imgUrl(p.seed, 400, 280)}" alt="${p.title}" loading="lazy" />
      <div class="${linkClass === 'latest-card' ? 'latest-body' : 'masonry-body'}">
        <span class="card-tag">${p.tag}</span>
        <h3>"${p.title}"</h3>
        <p>${lines}</p>
        <div class="${linkClass === 'latest-card' ? 'card-meta' : 'masonry-meta'}">
          <span>❤ ${fmtNum(p.likes)}</span>
          <span>💬 ${p.comments}</span>
          <span>👁 ${fmtNum(p.views)}</span>
        </div>
      </div>
    </a>`;
}
