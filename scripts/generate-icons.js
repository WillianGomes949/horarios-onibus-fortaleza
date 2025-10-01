
// npm install sharp
// node scripts/generate-icons.js

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateIcons() {
  const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
  const sourceIcon = path.join(__dirname, '../icon-source.png'); // Sua imagem 512x512
  
  try {
    await fs.access(sourceIcon);
  } catch {
    console.log('❌ Arquivo icon-source.png não encontrado na raiz do projeto');
    console.log('📝 Crie um ícone de 512x512 pixels e salve como icon-source.png');
    return;
  }

  for (const size of sizes) {
    await sharp(sourceIcon)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `../public/icons/icon-${size}x${size}.png`));
    console.log(`✅ Gerado ícone ${size}x${size}`);
  }
  
  console.log('🎉 Todos os ícones foram gerados!');
}

generateIcons();
