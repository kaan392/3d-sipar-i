let catalogArray = [];

const form = document.getElementById("adminForm");
const list = document.getElementById("catalogList");
const exportBtn = document.getElementById("exportJSON");

// JSON varsa yükle
fetch("catalog.json")
  .then(res => res.json())
  .then(data => {
    catalogArray = data;
    renderList();
  })
  .catch(() => {});

// JSON'u GitHub üzerinden güncelleme fonksiyonu
// Not: Bu kısmı gerçek GitHub API veya Netlify Functions ile bağlaman gerekir
async function updateJSONOnGitHub(data, commitMessage) {
  // Bu bir placeholder, gerçek entegrasyon için GitHub API veya Netlify Function kullanmalısın
  console.log("JSON güncellendi:", commitMessage, data);
}

// Ekleme
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const image = document.getElementById("image").value;
  const link = document.getElementById("link").value;
  const price = parseFloat(document.getElementById("price").value);

  catalogArray.push({ title, image, link, price });
  renderList();
  updateJSONOnGitHub(catalogArray, "Admin panelden ürün eklendi");
  form.reset();
});

// Liste render
function renderList() {
  list.innerHTML = "";
  catalogArray.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.title} - ${item.price} TL`;

    // Silme butonu
    const delBtn = document.createElement("button");
    delBtn.textContent = "Sil";
    delBtn.onclick = () => {
      if (!confirm(`"${item.title}" ürününü silmek istediğine emin misin?`)) return;
      catalogArray.splice(index, 1);
      renderList();
      updateJSONOnGitHub(catalogArray, "Admin panelden ürün silindi");
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// JSON Export
exportBtn.addEventListener("click", () => {
  const dataStr = JSON.stringify(catalogArray, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "catalog.json";
  a.click();
  URL.revokeObjectURL(url);
});
