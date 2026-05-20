# 🌶️ Doon Didi – Ghar Ka Aachar

**A multi-page static Indian pickle brand website** — fully bilingual (Hindi/English), AI-powered chatbot, customer reviews, and product catalogue.

---

## ✅ Deployment Status

**Platform:** Vercel — Framework: Other, no build command, no output dir, no install command  
**Config:** `vercel.json` ✅ (at root)  
**All image paths:** Relative `images/*.jpg` — zero external CDN dependencies  
**All CSS/JS paths:** Relative `css/*.css`, `js/*.js`  
**Console errors:** 0 ✅

---

## 📁 File Structure

```
index.html          ← Single-page app (all 5 pages inside)
vercel.json         ← Vercel static hosting config
css/
  style.css         ← Main styles (brand colours, layout, Instagram CSS)
  extras.css        ← Badges, dividers, animations
  chatbot.css       ← Chatbot widget styles
js/
  main.js           ← Products, reviews, i18n, navigation
  chatbot.js        ← AI chatbot (OpenRouter + Claude Sonnet 4.5)
images/
  lahsun-pickle.jpg
  amla-pickle.jpg
  green-mirch-pickle.jpg
  red-mirch-pickle.jpg
  mixed-pickle.jpg
  gajar-pickle.jpg
  mukhwas.jpg       ← NEW (Unsplash, local)
  amla-candy.jpg    ← NEW (Unsplash, local)
  murabba.jpg       ← NEW (Unsplash, local)
  founder.jpg       ← NEW (Unsplash, local)
  quality-amla.jpg  ← NEW (Unsplash, local)
  about-intro.jpg   ← NEW (Unsplash, local)
```

---

## 🗺️ Pages (single `index.html`, shown/hidden via JS)

| Page ID | Route trigger | Description |
|---------|---------------|-------------|
| `home` | default / `showPage('home')` | Hero slider, intro, featured products, testimonials, CTA |
| `products` | `showPage('products')` | Full product grid with category filter |
| `reviews` | `showPage('reviews')` | Rating stats + review form (RESTful Table API) |
| `about` | `showPage('about')` | Founder story, timeline, quality commitment |
| `contact` | `showPage('contact')` | Contact cards, social links, contact form |

---

## 🛍️ Products (9 total)

| # | Product | Category | Image |
|---|---------|----------|-------|
| 1 | Lahsun Pickle (लहसुन का अचार) | Pickle | `images/lahsun-pickle.jpg` |
| 2 | Amla Pickle (आंवला का अचार) | Pickle | `images/amla-pickle.jpg` |
| 3 | Green Mirch Achar (हरी मिर्च का अचार) | Pickle | `images/green-mirch-pickle.jpg` |
| 4 | Red Mirch Achar (लाल मिर्च का अचार) | Pickle | `images/red-mirch-pickle.jpg` |
| 5 | Mixed Pickle (मिक्स्ड अचार) | Pickle | `images/mixed-pickle.jpg` |
| 6 | Gajar Pickle (गाजर का अचार) | Pickle | `images/gajar-pickle.jpg` |
| 7 | Mukhwas (मुखवास) | Fresh | `images/mukhwas.jpg` |
| 8 | Amla Candy (आंवला कैंडी) | Sweet | `images/amla-candy.jpg` |
| 9 | Murabba (मुरब्बा) | Sweet | `images/murabba.jpg` |

---

## 🌐 i18n (Bilingual)

- Default language: Hindi (`hi`)
- Toggle to: English (`en`)
- Mechanism: `data-i18n` attributes on all HTML elements
- Dictionary: `I18N` object in `js/main.js` with 80+ keys for both languages
- Chatbot syncs with site language via `syncChatbotLang(lang)`

---

## 🤖 AI Chatbot

- **Provider:** OpenRouter API  
- **Model:** `anthropic/claude-sonnet-4-5`  
- **Endpoint:** `https://openrouter.ai/api/v1/chat/completions`  
- **API Key:** `sk-or-v1-bff9ef1b...` (in `js/chatbot.js`)  
- **Fallback:** 19 offline intent handlers if API unreachable  
- **Voice:** Web Speech API (input + output)

---

## ⭐ Reviews API

Uses the built-in RESTful Table API:
- `GET tables/reviews` — load all reviews
- `POST tables/reviews` — submit new review

---

## 📱 Social / Contact

- **WhatsApp:** `https://wa.me/918445349802`
- **Instagram:** `https://www.instagram.com/doon_didi_ghar_ka_aachar`
- **Phone:** `8445349802`
- **Location:** Uttarakhand, India

---

## 🚀 Deployment (Vercel)

Settings:
- **Framework Preset:** Other
- **Build Command:** *(empty)*
- **Output Directory:** *(empty)*  
- **Install Command:** *(empty)*
- **Root Directory:** `/` (project root)

`vercel.json` handles:
- Clean URLs
- Security headers
- Cache headers for assets
- SPA rewrite fallback to `index.html`

---

## 🔧 Known Limitations / Next Steps

- Product images for items 7–9 (Mukhwas, Amla Candy, Murabba) are Unsplash placeholder images — replace with actual product photos for production
- Founder photo is an Unsplash placeholder — replace with actual photo of Kavita Uniyal
- Contact form currently shows toast notification only — no email backend
- Instagram/Facebook/YouTube social links (except Instagram) use `href="#"` placeholders
