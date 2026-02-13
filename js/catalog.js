const catalog = document.getElementById('catalog');
const searchInput = document.getElementById('searchInput');
let catalogData = [];

fetch('catalog.json')
  .then(res => {
    console.log('Fetch response:', res);
    return res.json();
  })
  .then(data => {
    console.log('Katalog JSON parse başarılı:', data);
    data.forEach((item, idx) => {
      console.log(`Item ${idx} - Title: "${item.title}", Link: "${item.link}"`);
    });
    catalogData = data;
    renderCatalog(data);
  })
  .catch(err => {
    console.error('Catalog yüklenemedi:', err);
  });

function renderCatalog(data) {
  catalog.innerHTML = "";
  data.forEach((item, index) => {
    console.log(`Item ${index}:`, item); // Her item kontrol et
    
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-product-index', index);
    
    // Resim
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;
    
    // İçerik
    const content = document.createElement('div');
    content.className = 'card-content';
    
    const h3 = document.createElement('h3');
    h3.textContent = item.title;
    
    const p = document.createElement('p');
    p.textContent = `Fiyat: ${item.price}₺`;
    
    // Buton
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'card-buttons';
    
    const button = document.createElement('button');
    button.textContent = 'Sipariş';
    button.className = 'order-btn';
    button.setAttribute('data-title', item.title);
    button.setAttribute('data-image', item.image);
    button.setAttribute('data-price', item.price);
    button.setAttribute('data-link', item.link || '');
    
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const title = this.getAttribute('data-title');
      const image = this.getAttribute('data-image');
      const price = this.getAttribute('data-price');
      const link = this.getAttribute('data-link');
      console.log('Sipariş tıklandı - Attribute:', {title, image, price, link});
      console.log('item objesinden:', item);
      openOrder(title, image, price, link);
    });
    
    buttonsDiv.appendChild(button);
    content.appendChild(h3);
    content.appendChild(p);
    content.appendChild(buttonsDiv);
    card.appendChild(img);
    card.appendChild(content);
    catalog.appendChild(card);
  });
}

/* Canlı arama */
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = catalogData.filter(item =>
    item.title.toLowerCase().includes(query)
  );
  renderCatalog(filtered);
});
