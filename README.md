# 🎬 Film Keşfet

Modern ve şık bir film keşfetme uygulaması. Popüler filmleri keşfedin, arama yapın ve detayları görüntüleyin.

## ✨ Özellikler

- 🔍 **Film Arama** - İstediğiniz filmi hızlıca arayın
- 🎥 **Popüler Filmler** - Otomatik olarak popüler filmleri listeler
- 📱 **Responsive Tasarım** - Tüm cihazlarda kusursuz çalışır
- 🌙 **Modern UI** - Karanlık tema ile göz yorgunluğunu azaltır
- ⚡ **Hızlı Performans** - Vite + React ile yüksek performans

## 🛠️ Kullanılan Teknolojiler

- **React** - Kullanıcı arayüzü
- **Vite** - Build tool
- **Tailwind CSS** - Stilendirme
- **OMDb API** - Film verileri
- **Lucide React** - İkonlar

## 🚀 Kurulum

```bash
# Repoyu klonla
git clone <repo-url>

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

## 🔑 API Yapılandırması

Uygulamayı çalıştırmak için OMDb API anahtarı gerekir:

1. [OMDb API](http://www.omdbapi.com/apikey.aspx) adresinden ücretsiz anahtar alın
2. Proje kök dizininde `.env` dosyası oluşturun:
```env
VITE_OMDB_API_KEY=your_api_key_here
```
3. Uygulamayı yeniden başlatın

## 📁 Proje Yapısı

```
movie-app/
├── src/
│   ├── components/
│   │   └── MovieCard.jsx    # Film kartı bileşeni
│   ├── App.jsx              # Ana uygulama
│   ├── main.jsx             # Giriş noktası
│   └── index.css            # Global stiller
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 📝 Lisans

MIT License
