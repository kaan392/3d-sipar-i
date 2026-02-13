function sendMessage(message) {
  const phone = "905518552577";
  const apiKey = "5401383";
  const text = encodeURIComponent(message);
  
  // Form submission yöntemi - CORS'u bypass etmek için
  const form = document.createElement('form');
  form.method = 'GET';
  form.action = 'https://api.callmebot.com/whatsapp.php';
  form.target = '_blank';
  
  form.innerHTML = `
    <input type="hidden" name="phone" value="${phone}">
    <input type="hidden" name="text" value="${message}">
    <input type="hidden" name="apikey" value="${apiKey}">
  `;
  
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
  
  console.log('✓ Mesaj gönderildi - CallMeBot API\'ye yönlendiriliyor...');
}
