/* =====================================================
   DOON DIDI – MAIN JAVASCRIPT
   Page navigation · Products · Reviews API · Animations
   ===================================================== */

'use strict';

// ── Product Data ──────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: 'Lahsun Pickle',
    nameHindi: 'लहसुन का अचार',
    category: 'pickle',
    tag: 'Bestseller 🔥',
    tagStyle: 'badge-spicy',
    desc: 'Bold, pungent garlic cloves marinated in mustard oil with traditional spices. A classic accompaniment for dal-roti.',
    descHindi: 'सरसों के तेल में पारंपरिक मसालों के साथ मैरीनेट की हुई लहसुन। दाल-रोटी के साथ एक क्लासिक साथी।',
    emoji: '🧄',
    img: 'images/lahsun-pickle.jpg',
  },
  {
    id: 2,
    name: 'Amla Pickle',
    nameHindi: 'आंवला का अचार',
    category: 'pickle',
    tag: 'Rich in Vit C',
    tagStyle: 'badge-tangy',
    desc: 'Tangy Indian gooseberry pickle packed with antioxidants and the unmistakable taste of tradition.',
    descHindi: 'एंटीऑक्सीडेंट से भरपूर खट्टा आंवला अचार, परंपरा के अनूठे स्वाद के साथ।',
    emoji: '🫒',
    img: 'images/amla-pickle.jpg',
  },
  {
    id: 3,
    name: 'Green Mirch Achar',
    nameHindi: 'हरी मिर्च का अचार',
    category: 'pickle',
    tag: 'Spicy 🌶️',
    tagStyle: 'badge-spicy',
    desc: 'Fresh green chillies stuffed with mustard and fennel seeds, slow-marinated in pure mustard oil. Fiery and flavourful!',
    descHindi: 'सरसों और सौंफ भरी हरी मिर्च, शुद्ध सरसों के तेल में धीरे-धीरे मैरीनेट की हुई। तीखी और स्वादिष्ट!',
    emoji: '🌶️',
    img: 'images/green-mirch-pickle.jpg',
  },
  {
    id: 4,
    name: 'Red Mirch Achar',
    nameHindi: 'लाल मिर्च का अचार',
    category: 'pickle',
    tag: 'Extra Hot 🔥',
    tagStyle: 'badge-spicy',
    desc: 'Bharwan lal mirch — bold red chillies stuffed with a rich spice mix and preserved in fragrant mustard oil.',
    descHindi: 'भरवां लाल मिर्च — खुशबूदार सरसों के तेल में समृद्ध मसालों से भरी तीखी लाल मिर्च।',
    emoji: '🌶️',
    img: 'images/red-mirch-pickle.jpg',
  },
  {
    id: 5,
    name: 'Mixed Pickle',
    nameHindi: 'मिक्स्ड अचार',
    category: 'pickle',
    tag: 'Family Favourite 🏡',
    tagStyle: 'badge-tangy',
    desc: 'A classic medley of seasonal vegetables — raw mango, carrot, cauliflower and lime — spiced with the finest traditional masala.',
    descHindi: 'मौसमी सब्जियों का क्लासिक मिश्रण — कच्चा आम, गाजर, फूलगोभी और नींबू — बेहतरीन पारंपरिक मसाले के साथ।',
    emoji: '🥗',
    img: 'images/mixed-pickle.jpg',
  },
  {
    id: 6,
    name: 'Gajar Pickle',
    nameHindi: 'गाजर का अचार',
    category: 'pickle',
    tag: 'Winter Special ❄️',
    tagStyle: 'badge-mild',
    desc: 'Crisp, fresh carrots marinated in mustard oil with aromatic spices. A crunchy winter delight you cannot stop eating.',
    descHindi: 'सरसों के तेल और सुगंधित मसालों में मैरीनेट की हुई ताज़ा कुरकुरी गाजर। एक शीतकालीन स्वाद जो रोकता नहीं।',
    emoji: '🥕',
    img: 'images/gajar-pickle.jpg',
  },
  {
    id: 7,
    name: 'Mukhwas',
    nameHindi: 'मुखवास',
    category: 'fresh',
    tag: 'After Meal 🌱',
    tagStyle: 'badge-mild',
    desc: 'A blend of aromatic roasted seeds — fennel, sesame, coriander — sweetened and spiced for the perfect mouth freshener.',
    descHindi: 'सुगंधित भुने हुए बीजों का मिश्रण — सौंफ, तिल, धनिया — मीठे और मसालेदार मुखवास।',
    emoji: '🌱',
    img: 'images/mukhwas.jpg',
  },
  {
    id: 8,
    name: 'Amla Candy',
    nameHindi: 'आंवला कैंडी',
    category: 'sweet',
    tag: 'Sweet & Sour 🍬',
    tagStyle: 'badge-sweet',
    desc: 'Dried and sweetened amla with a delicious sweet-sour-spicy coating. A healthy treat loved by kids and adults alike.',
    descHindi: 'मीठे-खट्टे-तीखे लेप के साथ सूखा और मीठा आंवला। बच्चों और बड़ों सभी का पसंदीदा।',
    emoji: '🍬',
    img: 'images/amla-candy.jpg',
  },
  {
    id: 9,
    name: 'Murabba',
    nameHindi: 'मुरब्बा',
    category: 'sweet',
    tag: 'Traditional 🍯',
    tagStyle: 'badge-sweet',
    desc: 'Amla Murabba — slow-cooked gooseberries in fragrant sugar syrup infused with cardamom and saffron. A timeless winter preserve.',
    descHindi: 'आंवला मुरब्बा — इलायची और केसर युक्त सुगंधित चाशनी में धीरे-धीरे पकाए गए आंवले। एक अमर शीतकालीन मिठाई।',
    emoji: '🍯',
    img: 'images/murabba.jpg',
  },
];

// ── Helper: star string ───────────────────────────────
function starsHTML(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

// ── Toast notification ────────────────────────────────
function showToast(msg, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  setTimeout(() => { toast.className = 'toast'; }, 3200);
}

// ── Page Navigation ───────────────────────────────────
function showPage(pageId) {
  // Update pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Update nav links
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });
  // Close mobile nav
  const navLinks = document.getElementById('navLinks');
  const toggle   = document.getElementById('navToggle');
  navLinks && navLinks.classList.remove('open');
  toggle   && toggle.classList.remove('open');

  // Lazy init page content
  if (pageId === 'products' && !document.getElementById('allProductsGrid').childElementCount) {
    renderAllProducts();
  }
  if (pageId === 'reviews') {
    loadReviews();
  }
}

// ── Render Product Card HTML ──────────────────────────
function productCardHTML(p, featured = false) {
  const displayName = currentLang === 'hi' ? p.nameHindi : p.name;
  const displayDesc = currentLang === 'hi' ? (p.descHindi || p.desc) : p.desc;
  const orderLabel   = t('order_label');
  const inquireLabel  = t('get_price_label');
  return `
    <div class="product-card" data-category="${p.category}" data-id="${p.id}">
      <div class="product-card-img-wrap">
        <img class="product-card-img" src="${p.img}" alt="${p.name}" loading="lazy" />
      </div>
      <span class="product-tag ${p.tagStyle}">${p.tag}</span>
      <div class="product-card-body">
        <h3 class="product-card-name">${p.emoji} ${displayName}</h3>
        <p style="font-size:0.78rem;color:var(--saffron-d);margin-bottom:0.4rem;font-weight:500;">${currentLang === 'hi' ? p.name : p.nameHindi}</p>
        <p class="product-card-desc">${displayDesc}</p>
        <div class="product-card-footer" style="justify-content:flex-end;">
          <button class="product-btn" onclick="orderProduct('${p.name}')">${orderLabel}</button>
          <button class="product-btn product-btn-outline" onclick="openChatForProduct('${p.name}','${p.nameHindi}')" style="margin-left:0.4rem;">${inquireLabel}</button>
        </div>
      </div>
    </div>`;
}

// ── Render Featured Products (Home) ──────────────────
function renderFeaturedProducts() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  // Show first 4
  grid.innerHTML = PRODUCTS.slice(0, 4).map(p => productCardHTML(p, true)).join('');
}

// ── Render All Products ────────────────────────────────
function renderAllProducts() {
  const grid = document.getElementById('allProductsGrid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(p => productCardHTML(p)).join('');
  initFilters();
}

// ── Product Filters ────────────────────────────────────
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      document.querySelectorAll('#allProductsGrid .product-card').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ── Order Product shortcut ─────────────────────────────
// Opens chatbot with the product pre-selected in the order flow
function orderProduct(name) {
  // Open the chatbot first
  if (typeof openChatbot === 'function') {
    openChatbot();
  }
  // After welcome message has had time to show, start the order flow
  setTimeout(() => {
    if (typeof startOrderFlowWithProduct === 'function') {
      startOrderFlowWithProduct(name);
    }
  }, hasShownWelcome ? 450 : 800);
  showToast(t('inquiry_started').replace('{name}', name));
}

// ── Open chatbot pre-filled for a product ─────────────
function openChatForProduct(nameEn, nameHi) {
  const displayName = currentLang === 'hi' ? nameHi : nameEn;
  openChatbot();
  setTimeout(() => {
    const inp = document.getElementById('chatInput');
    if (inp) {
      inp.value = currentLang === 'hi'
        ? `${nameHi} का दाम क्या है?`
        : `What is the price of ${nameEn}?`;
      inp.focus();
    }
  }, 350);
}

// ══════════════════════════════════════════════════════
// COMPLETE i18n TRANSLATION SYSTEM
// ══════════════════════════════════════════════════════

let currentLang = 'hi'; // default: Hindi

/* ── Full translation dictionary ──────────────────────
   Keys match data-i18n attributes in index.html
   ──────────────────────────────────────────────────── */
const I18N = {
  hi: {
    // Top bar
    topbar_care: 'ग्राहक सेवा',
    topbar_tag:  '100% घर का बना &amp; स्वच्छ',
    // Navbar
    nav_home:     '🏠 होम',
    nav_products: '🛍️ उत्पाद',
    nav_reviews:  '⭐ समीक्षाएं',
    nav_about:    '👩‍💼 हमारे बारे में',
    nav_contact:  '📞 संपर्क',
    nav_order:    'ऑर्डर करें',
    // Hero
    hero_subtitle:    '✨ शुद्ध · घर का बना · परंपरागत ✨',
    hero_brand_sub:   'Ghar Ka Aachar',
    hero_desc:        'प्यार से बनाया, पुराने तरीके से — भारतीय रसोई के असली स्वाद सीधे आपकी थाली तक। कोई प्रिज़र्वेटिव नहीं। कोई शॉर्टकट नहीं। बस शुद्ध देसी अच्छाई।',
    hero_btn_explore: 'उत्पाद देखें 🛍️',
    hero_btn_order:   'ऑर्डर करें 📞',
    img_lahsun: 'लहसुन अचार',
    img_amla:   'आंवला अचार',
    img_hari:   'हरी मिर्च',
    img_lal:    'लाल मिर्च',
    scroll_hint: 'नीचे स्क्रॉल करें',
    // Intro strip
    intro1_title: '100% प्राकृतिक',
    intro1_desc:  'कोई कृत्रिम रंग या प्रिज़र्वेटिव नहीं',
    intro2_title: 'घर का बना',
    intro2_desc:  'स्वच्छ रसोई में ताज़ा तैयार',
    intro3_title: 'पारंपरिक नुस्खा',
    intro3_desc:  'पीढ़ियों से चली आ रही विधि',
    intro4_title: 'ताज़ी गुणवत्ता',
    intro4_desc:  'ऑर्डर के बाद ताज़ा तैयार, सुरक्षित पैकेजिंग',
    // Home – about intro
    badge_est:       'Est. Since 2010',
    home_story_tag:  'हमारी कहानी',
    home_story_title:'प्यार &amp; परंपरा से <span class="highlight">बना</span>',
    home_story_p1:   '<strong>Doon Didi – Ghar Ka Aachar</strong> में आपका स्वागत है — एक घरेलू रसोई जहाँ हर जार में असली स्वाद, यादें और एक माँ का प्यार भरा है।',
    home_story_p2:   '<strong>कविता उनियाल</strong> द्वारा स्थापित, हमारी यात्रा भारतीय व्यंजनों के पुराने स्वादों को संरक्षित करने के एक साधारण जुनून से शुरू हुई।',
    home_story_p3:   'हमारा मानना है कि घर का खाना सबसे अच्छा होता है — और यही विश्वास हमारे हर काम की नींव है। कोई मास प्रोडक्शन नहीं। कोई शॉर्टकट नहीं।',
    home_story_btn:  'हमारी कहानी पढ़ें →',
    // Featured products
    feat_tag:      'हमारी विशेषताएं',
    feat_title:    'चुनिंदा <span class="highlight">उत्पाद</span>',
    feat_sub:      'बेहतरीन सामग्री से छोटे बैच में हाथ से तैयार',
    feat_view_all: 'सभी उत्पाद देखें →',
    // Testimonials
    testi_tag:   'खुश ग्राहक',
    testi_title: 'हमारे ग्राहक क्या <span class="highlight-light">कहते हैं</span>',
    // CTA
    cta_title: 'असली घर के <span class="highlight">अचार</span> का स्वाद लेना है?',
    cta_call:  'कॉल करें: 8445349802',
    cta_msg:   'संदेश भेजें',
    // Products page
    prod_hero_tag:   'हमारा संग्रह',
    prod_hero_title: 'हमारे <span class="highlight">उत्पाद</span>',
    prod_hero_sub:   'हर जार स्वाद, परंपरा और देखभाल का उत्सव है',
    filter_all:    'सभी उत्पाद',
    filter_pickle: 'अचार',
    filter_sweet:  'मिठाई &amp; व्यंजन',
    filter_fresh:  'मुखवास',
    order1_title: 'न्यूनतम ऑर्डर',
    order1_desc:  'न्यूनतम ऑर्डर ₹200। ₹1000 से ऊपर के ऑर्डर पर थोक छूट उपलब्ध।',
    order2_title: 'ऑर्डर कैसे करें',
    order2_desc:  '<strong>8445349802</strong> पर कॉल या WhatsApp करें।',
    order3_title: 'ताज़गी की गारंटी',
    order3_desc:  'सभी उत्पाद ऑर्डर के बाद ताज़ा तैयार किए जाते हैं। कोई पुराना स्टॉक नहीं।',
    // Reviews page
    rev_hero_tag:   'ग्राहकों की प्रतिक्रिया',
    rev_hero_title: 'समीक्षाएं &amp; <span class="highlight">रेटिंग</span>',
    rev_hero_sub:   'आपके शब्द हमें प्यार से पकाते रहने की प्रेरणा देते हैं',
    rev_based_on:   '0 समीक्षाओं पर आधारित',
    rev_form_title: 'अपना <span class="highlight">अनुभव</span> साझा करें',
    rev_form_sub:   'हम जानना चाहते हैं कि आपको हमारे उत्पाद कैसे लगे!',
    rev_label_name:    'आपका नाम',
    rev_ph_name:       'जैसे: केशव पैन्यूली',
    rev_label_product: 'समीक्षित उत्पाद',
    rev_select_product:'— उत्पाद चुनें —',
    rev_other:         'अन्य',
    rev_label_rating:  'आपकी रेटिंग',
    rev_label_text:    'आपकी समीक्षा',
    rev_ph_text:       'अपना अनुभव बताएं...',
    rev_submit:        'समीक्षा जमा करें',
    // About page
    about_hero_tag:   'हमारी कहानी',
    about_hero_title: 'हमारे <span class="highlight">बारे में</span>',
    about_hero_sub:   'जुनून, परंपरा और घर के स्वाद की कहानी',
    founder_title:    'संस्थापक &amp; CEO',
    founder_tag:      'संस्थापक से मिलें',
    founder_heading:  'हर जार के पीछे का <span class="highlight">दिल</span>',
    founder_p1: 'मेरा नाम <strong>कविता उनियाल</strong> है और मेरा हमेशा से मानना रहा है कि सबसे अच्छा खाना घर की रसोई से आता है — धैर्य, प्यार और बेहतरीन सामग्री के साथ।',
    founder_p2: 'उत्तराखंड की पहाड़ियों में पली-बढ़ी, मैंने अपनी माँ और नानी को हर मौसम में अचार के जार तैयार करते देखा — घर में सरसों के तेल, मेथी और हल्दी की खुशबू भर जाती थी। वो स्वाद मुझे कभी नहीं भूले।',
    founder_p3: 'अपनी रेसिपी को वर्षों तक परिपक्व करने के बाद, मैंने इन असली स्वादों को उन सभी लोगों तक पहुँचाने का फ़ैसला किया जो सच्चे घरेलू अचार की याद में हैं। आज <strong>Doon Didi</strong> सिर्फ एक व्यापार नहीं — यह भारतीय पाक परंपरा को मेरा प्रेम-पत्र है।',
    fv1: 'प्यार से बना',
    fv2: 'स्वच्छ रसोई',
    fv3: 'प्राकृतिक सामग्री',
    fv4: 'असली नुस्खा',
    tl_heading: 'हमारी <span class="highlight">यात्रा</span>',
    tl1_title: 'शुरुआत',
    tl1_desc:  'कविता ने घर पर अचार बनाना शुरू किया, पड़ोसियों और दोस्तों के साथ साझा किया जो असली स्वाद को बेहद पसंद करते थे।',
    tl2_title: 'पहले ऑर्डर',
    tl2_desc:  'बात फैली! दूसरे शहरों के दोस्तों से पहले औपचारिक ऑर्डर आए जो घर का स्वाद फिर से जीना चाहते थे।',
    tl3_title: 'विस्तार',
    tl3_desc:  'बढ़ती माँग को पूरा करने के लिए रसोई का विस्तार हुआ। स्वच्छ पैकेजिंग के साथ अचार हर जगह पहुँचा।',
    tl4_title: 'नए उत्पाद जुड़े',
    tl4_desc:  'मुखवास, आंवला कैंडी और मुरब्बा मेनू में शामिल हुए — पूरे भारत के ग्राहकों के लिए और भी पारंपरिक स्वाद।',
    tl5_title: 'डिजिटल होना',
    tl5_desc:  'ऑनलाइन उपस्थिति लॉन्च की ताकि और भी अचार प्रेमियों तक पहुँचा जा सके।',
    quality_tag:   'हमारा वादा',
    quality_title: 'गुणवत्ता जो आप <span class="highlight">महसूस करें</span>',
    q1: 'विश्वसनीय किसानों से सीधे प्राप्त सामग्री',
    q2: 'कोई कृत्रिम प्रिज़र्वेटिव या सिंथेटिक रंग नहीं',
    q3: 'पूरी तरह स्वच्छ घरेलू रसोई में तैयार',
    q4: 'हर बार एक जैसे स्वाद के लिए परखी हुई रेसिपी',
    q5: 'ताज़गी बनाए रखने के लिए फ़ूड-ग्रेड पैकेजिंग',
    q6: 'हर ऑर्डर के बाद ताज़ा तैयार — कोई पुराना स्टॉक नहीं',
    // Contact page
    contact_hero_tag:    'संपर्क करें',
    contact_hero_title:  'हमसे <span class="highlight">बात करें</span>',
    contact_hero_sub:    'हमें आपसे सुनना अच्छा लगता है। कॉल करें, संदेश दें या लिखें!',
    contact_connect_title: 'जुड़ते <span class="highlight">हैं</span>',
    contact_connect_desc:  'ऑर्डर देना है या कोई सवाल है? किसी भी माध्यम से संपर्क करें — हम हमेशा मदद के लिए तैयार हैं!',
    cc_care_title:  'ग्राहक सेवा',
    cc_care_hours:  'सोम – शनि: सुबह 9 – शाम 7 बजे',
    cc_wa_desc:     'WhatsApp पर ऑर्डर करें',
    cc_loc_title:   'स्थान',
    cc_loc_value:   'उत्तराखंड, भारत',
    cc_loc_desc:    'उत्तराखंड से संचालित',
    cc_hours_title: 'कार्य समय',
    cc_hours_value: 'सोम – शनि: 9 AM – 7 PM',
    cc_hours_sun:   'रविवार: 10 AM – 3 PM',
    follow_us:      'फ़ॉलो करें',
    cf_title:         'संदेश <span class="highlight">भेजें</span>',
    cf_name_label:    'पूरा नाम',
    cf_name_ph:       'आपका नाम',
    cf_email_label:   'ईमेल पता',
    cf_phone_label:   'फ़ोन नंबर',
    cf_phone_ph:      'आपका फ़ोन नंबर',
    cf_subject_label: 'विषय',
    cf_sub1:          'ऑर्डर देना है',
    cf_sub2:          'उत्पाद जानकारी',
    cf_sub3:          'फ़ीडबैक',
    cf_sub4:          'अन्य',
    cf_msg_label:     'संदेश',
    cf_msg_ph:        'आपको क्या चाहिए बताएं...',
    cf_submit:        'संदेश भेजें',
    // Footer
    footer_brand_desc:    'घर का बना अचार &amp; पारंपरिक व्यंजन — कविता उनियाल द्वारा प्यार से बनाया, उत्तराखंड, भारत।',
    footer_quick_links:   'त्वरित लिंक',
    footer_our_products:  'हमारे उत्पाद',
    footer_contact_us:    'संपर्क करें',
    footer_wa_order:      'WhatsApp ऑर्डर',
    footer_hours:         'सोम–शनि: 9AM – 7PM',
    footer_copy:          '© 2024 Doon Didi – Ghar Ka Aachar. Made with ❤️ in India.',
    fp_lahsun:  'लहसुन अचार',
    fp_amla:    'आंवला अचार',
    fp_hari:    'हरी मिर्च अचार',
    fp_lal:     'लाल मिर्च अचार',
    fp_mixed:   'मिक्स्ड अचार',
    fp_gajar:   'गाजर अचार',
    fp_mukhwas: 'मुखवास',
    fp_candy:   'आंवला कैंडी',
    fp_murabba: 'मुरब्बा',
    // Chatbot
    chat_header_title: 'Doon Didi सहायक',
    chat_online:       'ऑनलाइन है',
    chat_typing:       'जवाब लिख रहे हैं...',
    sug1:              'आपके उत्पाद क्या हैं?',
    sug2:              'ऑर्डर कैसे करें?',
    sug3:              'लहसुन अचार में क्या है?',
    chat_input_ph:     'अपना सवाल लिखें...',
    // Dynamic strings (used in JS)
    order_label:        'ऑर्डर करें',
    get_price_label:    'दाम जानें',
    loading_reviews:    'समीक्षाएं लोड हो रही हैं…',
    no_reviews:         'अभी कोई समीक्षा नहीं है। पहले समीक्षा करें!',
    review_success:     '🎉 धन्यवाद! आपकी समीक्षा सफलतापूर्वक जमा हो गई।',
    review_toast:       'समीक्षा जमा हो गई! धन्यवाद 🙏',
    contact_success:    '✅ धन्यवाद {name} जी! आपका संदेश मिल गया है। हम जल्द ही {contact} पर संपर्क करेंगे।',
    contact_toast:      'संदेश भेज दिया गया! जल्द संपर्क होगा 📞',
    sending:            'भेज रहे हैं…',
    submitting:         'जमा हो रहा है…',
    select_rating_err:  'कृपया स्टार रेटिंग चुनें।',
    inquiry_started:    '{name} के लिए पूछताछ शुरू हो गई 🛍️',
    contact_subject_order: 'ऑर्डर देना है',
    contact_prefill:    'नमस्ते! मैं {name} ऑर्डर करना चाहता/चाहती हूँ। कृपया उपलब्धता और जानकारी बताएं। धन्यवाद!',
    based_on:           '{n} समीक्षाओं पर आधारित',
    send_msg_btn:       'संदेश भेजें',
  },
  en: {
    // Top bar
    topbar_care: 'Customer Care',
    topbar_tag:  '100% Homemade &amp; Hygienic',
    // Navbar
    nav_home:     '🏠 Home',
    nav_products: '🛍️ Products',
    nav_reviews:  '⭐ Reviews',
    nav_about:    '👩‍💼 About Us',
    nav_contact:  '📞 Contact',
    nav_order:    'Order Now',
    // Hero
    hero_subtitle:    '✨ Pure · Homemade · Traditional ✨',
    hero_brand_sub:   'Ghar Ka Aachar',
    hero_desc:        'Crafted with love, made the old-fashioned way — bringing the authentic flavours of Indian kitchens straight to your table. No preservatives. No shortcuts. Just pure desi goodness.',
    hero_btn_explore: 'Explore Products 🛍️',
    hero_btn_order:   'Order Now 📞',
    img_lahsun: 'Lahsun Achar',
    img_amla:   'Amla Achar',
    img_hari:   'Hari Mirch',
    img_lal:    'Lal Mirch',
    scroll_hint: 'Scroll to explore',
    // Intro strip
    intro1_title: '100% Natural',
    intro1_desc:  'No artificial colours or preservatives',
    intro2_title: 'Homemade',
    intro2_desc:  'Prepared fresh in a hygienic kitchen',
    intro3_title: 'Traditional Recipe',
    intro3_desc:  'Age-old methods passed down generations',
    intro4_title: 'Fresh Quality',
    intro4_desc:  'Freshly prepared after order, safe packaging',
    // Home – about intro
    badge_est:       'Est. Since 2010',
    home_story_tag:  'Our Story',
    home_story_title:'Made with <span class="highlight">Love &amp; Tradition</span>',
    home_story_p1:   'Welcome to <strong>Doon Didi – Ghar Ka Aachar</strong> — a home kitchen where every jar is filled with authentic flavours, memories, and a mother\'s care.',
    home_story_p2:   'Founded by <strong>Kavita Uniyal</strong>, our journey began from a simple passion for preserving the age-old flavours of Indian cuisine.',
    home_story_p3:   'We believe food made at home tastes best — and that belief is at the heart of everything we do. No mass production. No shortcuts.',
    home_story_btn:  'Read Our Story →',
    // Featured products
    feat_tag:      'Our Specialties',
    feat_title:    'Featured <span class="highlight">Products</span>',
    feat_sub:      'Handcrafted in small batches with the finest ingredients',
    feat_view_all: 'View All Products →',
    // Testimonials
    testi_tag:   'Happy Customers',
    testi_title: 'What Our Customers <span class="highlight-light">Say</span>',
    // CTA
    cta_title: 'Ready to taste <span class="highlight">real homemade</span> achar?',
    cta_call:  'Call: 8445349802',
    cta_msg:   'Send a Message',
    // Products page
    prod_hero_tag:   'Our Collection',
    prod_hero_title: 'Our <span class="highlight">Products</span>',
    prod_hero_sub:   'Every jar is a celebration of flavour, tradition, and care',
    filter_all:    'All Products',
    filter_pickle: 'Pickles / Achar',
    filter_sweet:  'Sweets &amp; Treats',
    filter_fresh:  'Mouth Freshener',
    order1_title: 'Minimum Order',
    order1_desc:  'Minimum order of ₹200. Bulk discounts available on orders above ₹1000.',
    order2_title: 'How to Order',
    order2_desc:  'Call or WhatsApp us on <strong>8445349802</strong> with your product choice.',
    order3_title: 'Freshness Guarantee',
    order3_desc:  'All products are freshly prepared after order confirmation. No stale stock.',
    // Reviews page
    rev_hero_tag:   'Customer Feedback',
    rev_hero_title: 'Reviews &amp; <span class="highlight">Ratings</span>',
    rev_hero_sub:   'Your words inspire us to keep cooking with love',
    rev_based_on:   'Based on 0 reviews',
    rev_form_title: 'Share Your <span class="highlight">Experience</span>',
    rev_form_sub:   'We\'d love to hear what you think about our products!',
    rev_label_name:    'Your Name',
    rev_ph_name:       'e.g. Keshav Painyuli',
    rev_label_product: 'Product Reviewed',
    rev_select_product:'— Select Product —',
    rev_other:         'Other',
    rev_label_rating:  'Your Rating',
    rev_label_text:    'Your Review',
    rev_ph_text:       'Tell us about your experience...',
    rev_submit:        'Submit Review',
    // About page
    about_hero_tag:   'Our Story',
    about_hero_title: 'About <span class="highlight">Us</span>',
    about_hero_sub:   'Passion, tradition, and the taste of home',
    founder_title:    'Founder &amp; CEO',
    founder_tag:      'Meet the Founder',
    founder_heading:  'The Heart Behind <span class="highlight">Every Jar</span>',
    founder_p1: 'My name is <strong>Kavita Uniyal</strong> and I have always believed that the best food comes from a home kitchen, made with patience, love, and the finest ingredients.',
    founder_p2: 'Growing up in the hills of Uttarakhand, I watched my mother and grandmother prepare jars of pickles every season — filling the house with the heady aroma of mustard oil, fenugreek, and turmeric. Those flavours never left me.',
    founder_p3: 'After years of perfecting my recipes and sharing them with family and friends, I decided to bring these authentic tastes to everyone who misses a truly homemade achar. Today, <strong>Doon Didi</strong> is not just a business — it is my love letter to Indian culinary tradition.',
    fv1: 'Made with Love',
    fv2: 'Hygienic Kitchen',
    fv3: 'Natural Ingredients',
    fv4: 'Authentic Recipe',
    tl_heading: 'Our <span class="highlight">Journey</span>',
    tl1_title: 'The Beginning',
    tl1_desc:  'Kavita begins preparing pickles at home, sharing them with neighbours and friends who loved the authentic taste.',
    tl2_title: 'First Orders',
    tl2_desc:  'Word spreads! First formal orders come in from friends in other cities who want to re-live the taste of home.',
    tl3_title: 'Expansion',
    tl3_desc:  'The kitchen expands. Pickles reach everywhere with hygienic packaging.',
    tl4_title: 'New Products Added',
    tl4_desc:  'Mukhwas, Amla Candy, and Murabba join the menu — bringing more traditional delights to customers nationwide.',
    tl5_title: 'Going Digital',
    tl5_desc:  'Launching an online presence to reach even more pickle lovers and serve authentic homemade goodness everywhere.',
    quality_tag:   'Our Promise',
    quality_title: 'Quality You Can <span class="highlight">Taste &amp; Trust</span>',
    q1: 'Ingredients sourced directly from trusted farms',
    q2: 'No artificial preservatives or synthetic colours',
    q3: 'Prepared in a fully hygienic home kitchen',
    q4: 'Recipes tested for consistent taste every time',
    q5: 'Food-grade packaging to preserve freshness',
    q6: 'Freshly made after every order — no stale stock',
    // Contact page
    contact_hero_tag:    'Get in Touch',
    contact_hero_title:  'Contact <span class="highlight">Us</span>',
    contact_hero_sub:    'We\'d love to hear from you. Call, message or write to us!',
    contact_connect_title: 'Let\'s <span class="highlight">Connect</span>',
    contact_connect_desc:  'Ready to order or have a question? Reach us through any of these channels — we\'re happy to help!',
    cc_care_title:  'Customer Care',
    cc_care_hours:  'Mon – Sat: 9 AM – 7 PM',
    cc_wa_desc:     'Quick order via WhatsApp',
    cc_loc_title:   'Location',
    cc_loc_value:   'Uttarakhand, India',
    cc_loc_desc:    'Based in Uttarakhand',
    cc_hours_title: 'Working Hours',
    cc_hours_value: 'Mon – Sat: 9 AM – 7 PM',
    cc_hours_sun:   'Sunday: 10 AM – 3 PM',
    follow_us:      'Follow Us',
    cf_title:         'Send a <span class="highlight">Message</span>',
    cf_name_label:    'Full Name',
    cf_name_ph:       'Your Name',
    cf_email_label:   'Email Address',
    cf_phone_label:   'Phone Number',
    cf_phone_ph:      'Your phone number',
    cf_subject_label: 'Subject',
    cf_sub1:          'Place an Order',
    cf_sub2:          'Product Inquiry',
    cf_sub3:          'Feedback',
    cf_sub4:          'Other',
    cf_msg_label:     'Message',
    cf_msg_ph:        'Tell us what you need...',
    cf_submit:        'Send Message',
    // Footer
    footer_brand_desc:    'Homemade pickles &amp; traditional delights crafted with love by Kavita Uniyal from Uttarakhand, India.',
    footer_quick_links:   'Quick Links',
    footer_our_products:  'Our Products',
    footer_contact_us:    'Contact Us',
    footer_wa_order:      'WhatsApp Order',
    footer_hours:         'Mon–Sat: 9AM – 7PM',
    footer_copy:          '© 2024 Doon Didi – Ghar Ka Aachar. Made with ❤️ in India.',
    fp_lahsun:  'Lahsun Pickle',
    fp_amla:    'Amla Pickle',
    fp_hari:    'Green Mirch Achar',
    fp_lal:     'Red Mirch Achar',
    fp_mixed:   'Mixed Pickle',
    fp_gajar:   'Gajar Pickle',
    fp_mukhwas: 'Mukhwas',
    fp_candy:   'Amla Candy',
    fp_murabba: 'Murabba',
    // Chatbot
    chat_header_title: 'Doon Didi Assistant',
    chat_online:       'Online',
    chat_typing:       'Typing...',
    sug1:              'What products do you have?',
    sug2:              'How to order?',
    sug3:              'Ingredients in Lahsun Pickle?',
    chat_input_ph:     'Type your question...',
    // Dynamic strings
    order_label:        'Order Now',
    get_price_label:    'Get Price',
    loading_reviews:    'Loading reviews…',
    no_reviews:         'No reviews yet. Be the first to review!',
    review_success:     '🎉 Thank you! Your review has been submitted.',
    review_toast:       'Review submitted! Thank you 🙏',
    contact_success:    '✅ Thank you {name}! We\'ve received your message and will call you back shortly on {contact}.',
    contact_toast:      'Message sent! We\'ll get back to you soon 📞',
    sending:            'Sending…',
    submitting:         'Submitting…',
    select_rating_err:  'Please select a star rating.',
    inquiry_started:    'Inquiry started for {name} 🛍️',
    contact_subject_order: 'Place an Order',
    contact_prefill:    'Hi! I would like to order: {name}. Please let me know the availability. Thank you!',
    based_on:           'Based on {n} review{s}',
    send_msg_btn:       'Send Message',
  }
};

/* ── t(key) — get translation for current lang ─────────── */
function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) ||
         (I18N['en'] && I18N['en'][key]) ||
         key;
}

/* ── updateLanguage — apply all data-i18n attributes ────── */
function updateLanguage(lang) {
  if (lang) currentLang = lang;

  // 1. Toggle button label
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = currentLang === 'hi' ? '🌐 English' : '🌐 हिंदी';

  // 2. html lang attribute
  document.documentElement.lang = currentLang === 'hi' ? 'hi' : 'en';

  // 3. All [data-i18n] elements — update innerHTML
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (!val || val === key) return;

    // Preserve required-star spans inside labels
    const req = el.querySelector('.req');
    if (req) {
      // Replace only the text node, keep .req child
      const reqClone = req.cloneNode(true);
      el.innerHTML = val + ' ';
      el.appendChild(reqClone);
    } else {
      el.innerHTML = val;
    }
  });

  // 4. All [data-i18n-placeholder] elements — update placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = t(key);
    if (val && val !== key) el.placeholder = val;
  });

  // 5. Re-render JS-driven product cards & filter buttons
  reRenderProducts();

  // 6. Sync chatbot language variable + UI
  // chatLang is a global let in chatbot.js — update it so chatbot replies in site language
  if (typeof syncChatbotLang === 'function') syncChatbotLang(currentLang);
  if (typeof updateChatPlaceholder === 'function') updateChatPlaceholder();
  if (typeof updateSuggestionLang  === 'function') updateSuggestionLang();
  const chatLbl = document.getElementById('chatLangLabel');
  if (chatLbl) chatLbl.textContent = currentLang === 'hi' ? 'EN' : 'HI';
}

function toggleLang() {
  currentLang = currentLang === 'hi' ? 'en' : 'hi';
  updateLanguage(currentLang);
}

// alias kept for backward-compat with chatbot.js
function applyLang() { updateLanguage(currentLang); }

function reRenderProducts() {
  const fg = document.getElementById('featuredGrid');
  const ag = document.getElementById('allProductsGrid');
  if (fg && fg.childElementCount) renderFeaturedProducts();
  if (ag && ag.childElementCount) renderAllProducts();
}

// ══════════════════════════════════════════════════════
// REVIEWS
// ══════════════════════════════════════════════════════

let reviewRating = 0;

function initStarPicker() {
  const stars = document.querySelectorAll('.star-pick');
  stars.forEach(star => {
    star.addEventListener('mouseover', function () {
      const val = +this.dataset.val;
      stars.forEach((s, i) => s.classList.toggle('active', i < val));
    });
    star.addEventListener('mouseleave', () => {
      stars.forEach((s, i) => s.classList.toggle('active', i < reviewRating));
    });
    star.addEventListener('click', function () {
      reviewRating = +this.dataset.val;
      document.getElementById('reviewRating').value = reviewRating;
      stars.forEach((s, i) => s.classList.toggle('active', i < reviewRating));
    });
  });
}

async function loadReviews() {
  const listEl  = document.getElementById('reviewsList');
  const statsEl = document.getElementById('reviewStatsBox');
  if (!listEl) return;

  listEl.innerHTML = `<p style="color:var(--text-light);text-align:center;padding:2rem;">${t('loading_reviews')}</p>`;

  try {
    const res  = await fetch('tables/reviews?limit=100&sort=created_at');
    const data = await res.json();
    const rows = data.data || [];

    renderReviewStats(rows);
    renderReviewCards(rows, listEl);
  } catch (err) {
    listEl.innerHTML = '<p style="color:var(--text-light);text-align:center;padding:2rem;">Could not load reviews.</p>';
  }
}

function renderReviewStats(rows) {
  const avgEl   = document.getElementById('avgRatingNum');
  const starsEl = document.getElementById('avgStarsDisplay');
  const labelEl = document.getElementById('totalReviewsLabel');
  const barsEl  = document.getElementById('ratingBars');

  if (!rows.length) { return; }

  const total = rows.length;
  const avg   = rows.reduce((s, r) => s + (r.rating || 0), 0) / total;

  if (avgEl)   avgEl.textContent   = avg.toFixed(1);
  if (starsEl) starsEl.textContent = starsHTML(Math.round(avg));
  if (labelEl) labelEl.textContent = t('based_on').replace('{n}', total).replace('{s}', total !== 1 ? 's' : '');

  // Rating breakdown
  if (barsEl) {
    barsEl.innerHTML = '';
    for (let star = 5; star >= 1; star--) {
      const count = rows.filter(r => Math.round(r.rating) === star).length;
      const pct   = total ? Math.round((count / total) * 100) : 0;
      barsEl.innerHTML += `
        <div class="rating-bar-row">
          <span>${star}★</span>
          <div class="bar-outer"><div class="bar-inner" style="width:${pct}%"></div></div>
          <span class="bar-count">${count}</span>
        </div>`;
    }
  }
}

function renderReviewCards(rows, container) {
  if (!rows.length) {
    container.innerHTML = `<p style="color:var(--text-light);text-align:center;padding:2rem;">${t('no_reviews')}</p>`;
    return;
  }
  container.innerHTML = rows.map(r => `
    <div class="review-card">
      <div class="review-card-header">
        <div>
          <div class="review-card-name">👤 ${escapeHtml(r.customer_name)}</div>
          <div class="review-card-date">${formatDate(r.created_at)}</div>
        </div>
        <div>
          <div class="review-card-stars">${starsHTML(r.rating)}</div>
          <span class="review-card-product">${escapeHtml(r.product || '')}</span>
        </div>
      </div>
      <p class="review-card-text">"${escapeHtml(r.review_text || r.review_text)}"</p>
    </div>`).join('');
}

async function submitReview(e) {
  e.preventDefault();
  const name    = document.getElementById('reviewName').value.trim();
  const product = document.getElementById('reviewProduct').value;
  const rating  = +document.getElementById('reviewRating').value;
  const text    = document.getElementById('reviewText').value.trim();
  const msgEl   = document.getElementById('reviewMsg');
  const btn     = document.getElementById('reviewSubmitBtn');

  if (!rating) {
    showMessage(msgEl, 'Please select a star rating.', 'error');
    return;
  }

  btn.disabled    = true;
  btn.textContent = t('submitting');

  try {
    const res = await fetch('tables/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: name,
        product,
        rating,
        review_text: text,
        created_at: new Date().toISOString().split('T')[0],
      }),
    });

    if (res.ok) {
      showMessage(msgEl, t('review_success'), 'success');
      document.getElementById('reviewForm').reset();
      reviewRating = 0;
      document.querySelectorAll('.star-pick').forEach(s => s.classList.remove('active'));
      showToast(t('review_toast'), 'success');
      loadReviews();
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    showMessage(msgEl, '❌ Could not submit review. Please try again.', 'error');
  } finally {
    btn.disabled  = false;
    btn.innerHTML = `<i class="fas fa-paper-plane"></i> ${t('rev_submit')}`;
  }
}

// ══════════════════════════════════════════════════════
// CONTACT FORM
// ══════════════════════════════════════════════════════

async function submitContact(e) {
  e.preventDefault();
  const name    = document.getElementById('contactName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const phone   = document.getElementById('contactPhone').value.trim();
  const subject = document.getElementById('contactSubject').value;
  const message = document.getElementById('contactMessage').value.trim();
  const msgEl   = document.getElementById('contactMsg');
  const btn     = e.target.querySelector('button[type=submit]');

  btn.disabled    = true;
  btn.textContent = 'Sending…';

  // Simulate send (no backend)
  await new Promise(r => setTimeout(r, 1200));

  showMessage(msgEl, currentLang === 'hi'
    ? `✅ धन्यवाद ${name} जी! आपका संदेश मिल गया है। हम जल्द ही ${phone || email} पर संपर्क करेंगे।`
    : `✅ Thank you ${name}! We've received your message and will call you back shortly on ${phone || email}.`, 'success');
  e.target.reset();
  btn.disabled = false;
  btn.innerHTML = currentLang === 'hi' ? '<i class="fas fa-paper-plane"></i> संदेश भेजें' : '<i class="fas fa-paper-plane"></i> Send Message';
  showToast(currentLang === 'hi' ? 'संदेश भेज दिया गया! जल्द संपर्क होगा 📞' : 'Message sent! We\'ll get back to you soon 📞', 'success');
}

// ══════════════════════════════════════════════════════
// TESTIMONIALS SLIDER
// ══════════════════════════════════════════════════════

const TESTIMONIALS = [
  { name:'Keshav Painyuli', location:'Uttarakhand', stars:5, text:'"बहुत ही लाजवाब अचार है! लहसुन और लाल मिर्च दोनों का स्वाद एकदम घर जैसा है। कविता जी का हाथ बहुत अच्छा है, सच में दिल से बनाती हैं। जरूर मंगवाएं!"', product:'Lahsun Pickle' },
];

let currentSlide = 0;
let sliderInterval;

function buildTestimonials() {
  const sliderEl = document.getElementById('testimonialSlider');
  const dotsEl   = document.getElementById('testimonialDots');
  if (!sliderEl) return;

  const track = document.createElement('div');
  track.className = 'testimonial-track';
  track.id = 'testimonialTrack';

  TESTIMONIALS.forEach(t => {
    track.innerHTML += `
      <div class="testimonial-slide">
        <div class="testimonial-card">
          <div class="tc-stars">${'★'.repeat(t.stars)}</div>
          <p class="tc-text">${t.text}</p>
          <div class="tc-author">
            <strong>${t.name}</strong>
            <span>📍 ${t.location} &nbsp;|&nbsp; ${t.product}</span>
          </div>
        </div>
      </div>`;
  });

  sliderEl.appendChild(track);

  if (dotsEl) {
    TESTIMONIALS.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 't-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToSlide(i));
      dotsEl.appendChild(dot);
    });
  }

  sliderInterval = setInterval(() => goToSlide((currentSlide + 1) % TESTIMONIALS.length), 5000);
}

function goToSlide(idx) {
  currentSlide = idx;
  const track = document.getElementById('testimonialTrack');
  if (track) track.style.transform = `translateX(-${idx * 100}%)`;
  document.querySelectorAll('.t-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
}

// ══════════════════════════════════════════════════════
// SCROLL EFFECTS
// ══════════════════════════════════════════════════════

function initScrollEffects() {
  const navbar  = document.getElementById('navbar');
  const backTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (navbar)  navbar.classList.toggle('scrolled', scrollY > 80);
    if (backTop) backTop.classList.toggle('visible', scrollY > 400);
  });

  // Intersection observer for reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ══════════════════════════════════════════════════════
// MOBILE NAV
// ══════════════════════════════════════════════════════

function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('open');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      toggle.classList.remove('open');
    }
  });
}

// ══════════════════════════════════════════════════════
// UTILITIES
// ══════════════════════════════════════════════════════

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(typeof dateStr === 'number' ? dateStr : dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return dateStr; }
}

function showMessage(el, msg, type) {
  if (!el) return;
  el.textContent = msg;
  el.className = `form-message ${type}`;
  setTimeout(() => { el.className = 'form-message'; el.textContent = ''; }, 6000);
}

// ══════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Render featured products on homepage
  renderFeaturedProducts();

  // Build testimonial slider
  buildTestimonials();

  // Init star picker for review form
  initStarPicker();

  // Scroll effects
  initScrollEffects();

  // Mobile nav
  initMobileNav();

  // Add reveal class to cards (for observer)
  document.querySelectorAll('.product-card, .intro-item, .order-info-card, .contact-card, .tl-content').forEach(el => {
    el.classList.add('reveal');
  });

  // Re-init reveals after any dynamic content renders
  setTimeout(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, 300);

  // Handle hash links for direct access
  const hash = window.location.hash.replace('#', '');
  const validPages = ['home', 'products', 'reviews', 'about', 'contact'];
  if (hash && validPages.includes(hash)) {
    showPage(hash);
  }
});