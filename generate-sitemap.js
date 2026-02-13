const fs = require('fs');
const path = require('path');

const pages = [
    '/',
    '/index.html',
    '/order.html',
    '/upload.html',
    '/admin.html'
];

const domain = 'https://karatayfenlisesibilisimkulubu.netlify.app';

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

pages.forEach(page => {
    xml += `  <url>\n`;
    xml += `    <loc>${domain}${page}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
});

xml += `</urlset>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml);

console.log('Sitemap oluşturuldu!');
