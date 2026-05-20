/* ================================================================
   DOON DIDI — BILINGUAL AI CHATBOT  (v5 — Order Flow + WhatsApp)
   ─────────────────────────────────────────────────────────────
   ✅ OpenRouter API  →  anthropic/claude-sonnet-4-5  (LIVE, real AI)
   ✅ Multi-step ORDER FLOW → WhatsApp deep-link delivery
   ✅ Hindi / English auto-detect & reply
   ✅ Conversation memory (last 10 turns)
   ✅ Typing / loading indicator
   ✅ Smart offline fallback if API unreachable
   ✅ Voice input  (SpeechRecognition)
   ✅ Voice output (SpeechSynthesis)
   ✅ Mobile responsive, accessible
   ✅ Syncs with site EN/HI language toggle
   ================================================================ */

'use strict';

/* ════════════════════════════════════════════════════════════════
   OPENROUTER CONFIGURATION
   ════════════════════════════════════════════════════════════════ */
const OPENROUTER_API_KEY  = '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';
const OPENROUTER_MODEL    = 'meta-llama/llama-3.3-70b-instruct:free';
const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

/* ── SYSTEM PROMPT ─────────────────────────────────────────────── */
const SYSTEM_PROMPT = `You are a friendly, warm customer assistant for "Doon Didi – Ghar Ka Aachar" — an authentic Indian homemade pickle brand by Kavita Uniyal from Uttarakhand, India.

OUR PRODUCTS (direct customers to call 8445349802 for pricing):
1. Lahsun Pickle (लहसुन का अचार) — Garlic in mustard oil. BESTSELLER 🔥 Ingredients: garlic, mustard oil, mustard seeds, fenugreek, turmeric, red chilli, salt.
2. Amla Pickle (आंवला का अचार) — Indian gooseberry pickle. Rich in Vitamin C.
3. Green Mirch Achar (हरी मिर्च का अचार) — Stuffed green chilli. Spicy 🌶️
4. Red Mirch Achar (लाल मिर्च का अचार) — Stuffed red chilli. Extra Hot 🔥
5. Mixed Pickle (मिक्स्ड अचार) — Mango, carrot, cauliflower, lime. Family Favourite 🏡
6. Gajar Pickle (गाजर का अचार) — Fresh carrot pickle. Winter Special ❄️
7. Mukhwas (मुखवास) — Roasted seeds mouth freshener. After Meal 🌱
8. Amla Candy (आंवला कैंडी) — Sweet & sour amla candy. Healthy snack 🍬
9. Murabba (मुरब्बा) — Amla in sugar syrup with cardamom & saffron 🍯

BUSINESS INFO:
- Phone / WhatsApp: 8445349802
- Hours: Mon–Sat 9AM–7PM, Sunday 10AM–3PM
- Location: Uttarakhand, India
- Minimum order: ₹200. Bulk discount above ₹1000.
- 100% homemade, no preservatives, freshly made per order

ORDER HANDLING — IMPORTANT:
When the user clearly wants to place an order (says things like "I want to order", "मुझे ऑर्डर करना है", "buy", "purchase", "खरीदना", "मंगवाना"), 
start your reply with the EXACT token [START_ORDER] on the very first line, then continue with a warm 1-sentence acknowledgement.
Do NOT include [START_ORDER] for any other intent (questions, pricing, etc.).

RULES:
- ALWAYS reply in the SAME language the user writes in (Hindi → Hindi, English → English)
- Keep answers warm, friendly, concise (2–5 sentences)
- For pricing, always say "call or WhatsApp 8445349802"
- Use relevant emojis naturally
- Never make up prices or availability`;

/* ════════════════════════════════════════════════════════════════
   STATE
   ════════════════════════════════════════════════════════════════ */
let chatOpen        = false;
let chatLang        = 'hi';
let voiceOutputOn   = false;
let isListening     = false;
let isSpeaking      = false;
let chatHistory     = [];
let recognitionObj  = null;
let hasShownWelcome = false;
let badgeCount      = 1;

/* ── ORDER FLOW STATE ──────────────────────────────────────────── */
// orderStep: null | 'name' | 'product' | 'qty' | 'address' | 'phone' | 'confirm'
let orderStep    = null;
let currentOrder = { name: '', product: '', quantity: '', address: '', phone: '', _preselected: '' };

function resetOrder() {
  orderStep    = null;
  currentOrder = { name: '', product: '', quantity: '', address: '', phone: '', _preselected: '' };
}

/* ── CAPABILITY FLAGS ─────────────────────────────────────────── */
const speechRecognitionSupported =
  ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
const speechSynthesisSupported = ('speechSynthesis' in window);

/* ════════════════════════════════════════════════════════════════
   DOM REFERENCES
   ════════════════════════════════════════════════════════════════ */
function dom() {
  return {
    window:       document.getElementById('chatbotWindow'),
    messages:     document.getElementById('chatMessages'),
    input:        document.getElementById('chatInput'),
    typing:       document.getElementById('chatTyping'),
    micBtn:       document.getElementById('chatMicBtn'),
    suggestions:  document.getElementById('chatSuggestions'),
    langBtn:      document.getElementById('chatLangBtn'),
    langLabel:    document.getElementById('chatLangLabel'),
    badge:        document.getElementById('chatbotBadge'),
    voiceOnIcon:  document.getElementById('voiceOnIcon'),
    voiceOffIcon: document.getElementById('voiceOffIcon'),
  };
}

/* ════════════════════════════════════════════════════════════════
   OPEN / CLOSE / TOGGLE
   ════════════════════════════════════════════════════════════════ */
function openChatbot() {
  const d = dom();
  chatOpen = true;
  if (d.window) d.window.classList.add('open');
  hideBadge();
  if (!hasShownWelcome) {
    hasShownWelcome = true;
    setTimeout(showWelcome, 350);
  }
  setTimeout(() => d.input && d.input.focus(), 420);
}

function closeChatbot() {
  chatOpen = false;
  const d = dom();
  if (d.window) d.window.classList.remove('open');
  stopListening();
  stopSpeaking();
}

function toggleChatbot() {
  chatOpen ? closeChatbot() : openChatbot();
}

function hideBadge() {
  badgeCount = 0;
  const b = dom().badge;
  if (b) b.style.display = 'none';
}

/* ════════════════════════════════════════════════════════════════
   WELCOME MESSAGE
   ════════════════════════════════════════════════════════════════ */
function showWelcome() {
  const msg = chatLang === 'hi'
    ? `नमस्ते! 🙏 मैं **Doon Didi** का AI सहायक हूँ।\n\nहमारे **9 उत्पादों** के बारे में पूछें — लहसुन अचार से मुरब्बा तक!\n\n🛒 **ऑर्डर करना है?** बस लिखें "ऑर्डर करना है" — मैं सब पूछकर आपका ऑर्डर WhatsApp पर भेज दूँगा!\n\nकैसे मदद करूँ? 😊`
    : `Hello! 🙏 I'm **Doon Didi's** AI assistant.\n\nAsk me about our **9 products** — from Lahsun Pickle to Murabba!\n\n🛒 **Want to order?** Just say "I want to order" — I'll collect your details and send the order to Kavita ji via WhatsApp!\n\nHow can I help? 😊`;
  appendMessage('bot', msg);
}

/* ════════════════════════════════════════════════════════════════
   ORDER FLOW
   ════════════════════════════════════════════════════════════════ */

/** Called when user explicitly clicks "Order" on a product card */
function startOrderFlowWithProduct(productName) {
  resetOrder();
  currentOrder._preselected = productName;
  orderStep = 'name';
  const msg = chatLang === 'hi'
    ? `बिल्कुल! 🛒 **${productName}** के लिए ऑर्डर लेते हैं!\n\nपहले बताएं — **आपका नाम क्या है?**`
    : `Sure! 🛒 Let's place an order for **${productName}**!\n\nFirst, **what's your name?**`;
  appendMessage('bot', msg);
}

/** Called by AI or offline fallback when order intent is detected */
function startOrderFlow() {
  resetOrder();
  orderStep = 'name';
  const msg = chatLang === 'hi'
    ? `बिल्कुल! 🛒 मैं आपका ऑर्डर लेने में मदद करूँगा।\n\nपहले बताएं — **आपका नाम क्या है?**`
    : `Sure! 🛒 I'll help you place your order.\n\nFirst, **what's your name?**`;
  appendMessage('bot', msg);
}

/* Product name mapping — number or keyword → display name */
const PRODUCT_MAP = {
  '1': 'Lahsun Pickle (लहसुन अचार)', 'lahsun': 'Lahsun Pickle (लहसुन अचार)', 'garlic': 'Lahsun Pickle (लहसुन अचार)', 'लहसुन': 'Lahsun Pickle (लहसुन अचार)',
  '2': 'Amla Pickle (आंवला अचार)', 'amla pickle': 'Amla Pickle (आंवला अचार)', 'आंवला अचार': 'Amla Pickle (आंवला अचार)',
  '3': 'Green Mirch Achar (हरी मिर्च अचार)', 'green mirch': 'Green Mirch Achar (हरी मिर्च अचार)', 'hari mirch': 'Green Mirch Achar (हरी मिर्च अचार)', 'हरी मिर्च': 'Green Mirch Achar (हरी मिर्च अचार)',
  '4': 'Red Mirch Achar (लाल मिर्च अचार)', 'red mirch': 'Red Mirch Achar (लाल मिर्च अचार)', 'lal mirch': 'Red Mirch Achar (लाल मिर्च अचार)', 'लाल मिर्च': 'Red Mirch Achar (लाल मिर्च अचार)',
  '5': 'Mixed Pickle (मिक्स्ड अचार)', 'mixed': 'Mixed Pickle (मिक्स्ड अचार)', 'mix': 'Mixed Pickle (मिक्स्ड अचार)', 'मिक्स': 'Mixed Pickle (मिक्स्ड अचार)', 'मिक्स्ड': 'Mixed Pickle (मिक्स्ड अचार)',
  '6': 'Gajar Pickle (गाजर अचार)', 'gajar': 'Gajar Pickle (गाजर अचार)', 'carrot': 'Gajar Pickle (गाजर अचार)', 'गाजर': 'Gajar Pickle (गाजर अचार)',
  '7': 'Mukhwas (मुखवास)', 'mukhwas': 'Mukhwas (मुखवास)', 'मुखवास': 'Mukhwas (मुखवास)',
  '8': 'Amla Candy (आंवला कैंडी)', 'amla candy': 'Amla Candy (आंवला कैंडी)', 'candy': 'Amla Candy (आंवला कैंडी)', 'कैंडी': 'Amla Candy (आंवला कैंडी)',
  '9': 'Murabba (मुरब्बा)', 'murabba': 'Murabba (मुरब्बा)', 'मुरब्बा': 'Murabba (मुरब्बा)',
};

function resolveProduct(text) {
  const tLow = text.toLowerCase().trim();
  if (PRODUCT_MAP[tLow]) return PRODUCT_MAP[tLow];
  // partial match
  for (const [key, val] of Object.entries(PRODUCT_MAP)) {
    if (tLow.includes(key.toLowerCase()) || key.toLowerCase().includes(tLow)) return val;
  }
  return null;
}

/** Process user input when inside the order flow */
function handleOrderStep(text) {
  const hi = chatLang === 'hi';
  const t  = text.trim();

  // Allow cancellation at any step
  if (/^(cancel|रद्द|cancel order|नहीं|no thanks|nahi)$/i.test(t)) {
    cancelOrder(true);
    return;
  }

  switch (orderStep) {
    case 'name': {
      currentOrder.name = t;

      if (currentOrder._preselected) {
        // Product already known — skip to qty
        currentOrder.product = currentOrder._preselected;
        currentOrder._preselected = '';
        orderStep = 'qty';
        appendMessage('bot', hi
          ? `धन्यवाद **${t}** जी! 🙏\n\n**${currentOrder.product}** के लिए **कितनी मात्रा** चाहिए?\n_(जैसे: 1 jar, 500g, 1 kg)_`
          : `Thank you **${t}**! 🙏\n\nHow much **${currentOrder.product}** would you like?\n_(e.g., 1 jar, 500g, 1 kg)_`);
      } else {
        orderStep = 'product';
        appendMessage('bot', hi
          ? `धन्यवाद **${t}** जी! 🙏\n\nकौन सा उत्पाद चाहिए? नाम या नंबर लिखें:\n\n**1.** 🧄 लहसुन अचार\n**2.** 🫒 आंवला अचार\n**3.** 🌶️ हरी मिर्च अचार\n**4.** 🌶️ लाल मिर्च अचार\n**5.** 🥗 मिक्स्ड अचार\n**6.** 🥕 गाजर अचार\n**7.** 🌱 मुखवास\n**8.** 🍬 आंवला कैंडी\n**9.** 🍯 मुरब्बा`
          : `Thank you **${t}**! 🙏\n\nWhich product would you like? Type the name or number:\n\n**1.** 🧄 Lahsun Pickle\n**2.** 🫒 Amla Pickle\n**3.** 🌶️ Green Mirch Achar\n**4.** 🌶️ Red Mirch Achar\n**5.** 🥗 Mixed Pickle\n**6.** 🥕 Gajar Pickle\n**7.** 🌱 Mukhwas\n**8.** 🍬 Amla Candy\n**9.** 🍯 Murabba`);
      }
      break;
    }

    case 'product': {
      const matched = resolveProduct(t);
      if (!matched) {
        appendMessage('bot', hi
          ? `माफ करें, यह उत्पाद नहीं मिला। 😅 कृपया नंबर **(1–9)** या उत्पाद का नाम दोबारा लिखें।`
          : `Hmm, I couldn't match that product. 😅 Please type the number **(1–9)** or product name again.`);
        return; // stay on same step
      }
      currentOrder.product = matched;
      orderStep = 'qty';
      appendMessage('bot', hi
        ? `✅ **${matched}** — बढ़िया चुनाव!\n\n**कितनी मात्रा** चाहिए?\n_(जैसे: 1 jar, 2 kg, 500g)_`
        : `✅ **${matched}** — great choice!\n\n**How much quantity** would you like?\n_(e.g., 1 jar, 2 kg, 500g)_`);
      break;
    }

    case 'qty': {
      currentOrder.quantity = t;
      orderStep = 'address';
      appendMessage('bot', hi
        ? `📦 **डिलीवरी पता** क्या है?\n\n_(पूरा पता लिखें — घर/फ्लैट नं., मोहल्ला, शहर, पिनकोड)_`
        : `📦 What's your **delivery address**?\n\n_(Full address — house/flat no., locality, city, pincode)_`);
      break;
    }

    case 'address': {
      currentOrder.address = t;
      orderStep = 'phone';
      appendMessage('bot', hi
        ? `📱 आपका **WhatsApp / फ़ोन नंबर** क्या है?\n\n_(कविता जी इसी नंबर पर ऑर्डर कन्फ़र्म करेंगी)_`
        : `📱 Your **WhatsApp / phone number**?\n\n_(Kavita ji will confirm the order on this number)_`);
      break;
    }

    case 'phone': {
      currentOrder.phone = t;
      orderStep = 'confirm';
      showOrderSummary();
      break;
    }

    default:
      break;
  }
}

/** Render the order summary card with confirm / cancel buttons */
function showOrderSummary() {
  const d  = dom();
  if (!d.messages) return;
  const hi = chatLang === 'hi';

  const wrap   = document.createElement('div');
  wrap.classList.add('chat-msg', 'chat-msg-bot');

  const bubble = document.createElement('div');
  bubble.classList.add('chat-bubble', 'chat-bubble-order');
  bubble.innerHTML = `
    <div class="order-summary-card">
      <div class="order-summary-title">🛒 ${hi ? 'ऑर्डर सारांश' : 'Order Summary'}</div>
      <div class="order-summary-rows">
        <div class="order-row"><span class="order-row-label">${hi ? '👤 नाम' : '👤 Name'}</span><span class="order-row-val">${escHtml(currentOrder.name)}</span></div>
        <div class="order-row"><span class="order-row-label">${hi ? '🥒 उत्पाद' : '🥒 Product'}</span><span class="order-row-val">${escHtml(currentOrder.product)}</span></div>
        <div class="order-row"><span class="order-row-label">${hi ? '📦 मात्रा' : '📦 Quantity'}</span><span class="order-row-val">${escHtml(currentOrder.quantity)}</span></div>
        <div class="order-row"><span class="order-row-label">${hi ? '📍 पता' : '📍 Address'}</span><span class="order-row-val">${escHtml(currentOrder.address)}</span></div>
        <div class="order-row"><span class="order-row-label">${hi ? '📱 फ़ोन' : '📱 Phone'}</span><span class="order-row-val">${escHtml(currentOrder.phone)}</span></div>
      </div>
      <p class="order-summary-note">${hi ? 'सब कुछ सही है? नीचे कन्फ़र्म करें 👇' : 'Everything correct? Confirm below 👇'}</p>
      <div class="order-summary-btns">
        <button class="order-btn-confirm" onclick="confirmOrder()">
          <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clip-rule="evenodd"/></svg>
          ${hi ? 'WhatsApp पर भेजें' : 'Send via WhatsApp'}
        </button>
        <button class="order-btn-cancel" onclick="cancelOrder(false)">
          ${hi ? 'रद्द करें' : 'Cancel'}
        </button>
      </div>
    </div>`;

  const time = document.createElement('span');
  time.classList.add('chat-time');
  time.textContent = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  wrap.appendChild(bubble);
  wrap.appendChild(time);
  d.messages.appendChild(wrap);
  scrollBottom();
  requestAnimationFrame(() => wrap.classList.add('visible'));
}

/** User pressed Confirm — build WhatsApp deep-link and open it */
function confirmOrder() {
  const o  = currentOrder;
  const hi = chatLang === 'hi';

  // Disable buttons immediately so they can't double-tap
  document.querySelectorAll('.order-btn-confirm, .order-btn-cancel').forEach(b => {
    b.disabled = true;
    b.style.opacity = '0.5';
  });

  // Format the WhatsApp message
  const waText =
`🛒 *नया ऑर्डर — Doon Didi Ghar Ka Aachar*

👤 *नाम:* ${o.name}
📱 *फ़ोन / WhatsApp:* ${o.phone}
🥒 *उत्पाद:* ${o.product}
📦 *मात्रा:* ${o.quantity}
📍 *डिलीवरी पता:* ${o.address}

_यह ऑर्डर Doon Didi चैटबॉट के ज़रिए आया है।_
_कृपया जल्दी कन्फ़र्म करें। 🙏_`;

  const waLink = `https://wa.me/918445349802?text=${encodeURIComponent(waText)}`;

  appendMessage('bot', hi
    ? `🎉 **ऑर्डर तैयार है!**\n\nWhatsApp खुलेगा — बस **Send** दबाएं और आपका ऑर्डर कविता जी तक पहुँच जाएगा! 📲\n\nवो जल्दी कन्फ़र्म करेंगी। **धन्यवाद!** 🙏`
    : `🎉 **Your order is ready!**\n\nWhatsApp will open — just press **Send** and Kavita ji will receive your order! 📲\n\nShe'll confirm it shortly. **Thank you!** 🙏`);

  resetOrder();

  // Small delay so the success message renders first
  setTimeout(() => window.open(waLink, '_blank'), 900);
}

/** User pressed Cancel or typed cancel keyword */
function cancelOrder(fromKeyword = false) {
  document.querySelectorAll('.order-btn-confirm, .order-btn-cancel').forEach(b => {
    b.disabled = true;
    b.style.opacity = '0.5';
  });
  resetOrder();
  const hi = chatLang === 'hi';
  appendMessage('bot', fromKeyword
    ? (hi ? `ठीक है, ऑर्डर रद्द कर दिया। 😊 कभी भी ऑर्डर करना हो तो बताएं!` : `No problem, order cancelled. 😊 Feel free to order anytime!`)
    : (hi ? `ठीक है! ऑर्डर रद्द कर दिया गया। 😊 कोई और मदद चाहिए तो बताएं।` : `Alright! Order cancelled. 😊 Let me know if I can help with anything else.`));
}

/* Safe HTML escape for user inputs in summary */
function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ════════════════════════════════════════════════════════════════
   LANGUAGE SYNC
   ════════════════════════════════════════════════════════════════ */
function syncChatbotLang(lang) {
  chatLang = lang;
  const d = dom();
  if (d.langLabel) d.langLabel.textContent = chatLang === 'hi' ? 'EN' : 'HI';
}

function toggleChatLang() {
  chatLang = chatLang === 'hi' ? 'en' : 'hi';
  const d = dom();
  if (d.langLabel) d.langLabel.textContent = chatLang === 'hi' ? 'EN' : 'HI';
  updateSuggestionLang();
  updateChatPlaceholder();
  appendMessage('system', chatLang === 'hi'
    ? '🌐 हिंदी में बात करते हैं।'
    : '🌐 Switched to English.');
}

function updateChatPlaceholder() {
  const inp = dom().input;
  if (!inp) return;
  const ph = (typeof I18N !== 'undefined' && I18N[chatLang]?.chat_input_ph)
    ? I18N[chatLang].chat_input_ph
    : (chatLang === 'hi' ? 'अपना सवाल लिखें...' : 'Type your question...');
  inp.placeholder = ph;
}

function updateSuggestionLang() {
  document.querySelectorAll('.chat-suggest-btn').forEach(btn => {
    const key = btn.getAttribute('data-i18n');
    if (!key) return;
    if (typeof I18N !== 'undefined' && I18N[chatLang]?.[key]) {
      btn.textContent = I18N[chatLang][key];
    } else {
      const fb = {
        hi: { sug1: 'आपके उत्पाद क्या हैं?', sug2: 'ऑर्डर करना है', sug3: 'लहसुन अचार में क्या है?' },
        en: { sug1: 'What products do you have?', sug2: 'I want to order', sug3: 'Ingredients in Lahsun Pickle?' }
      }[chatLang] || {};
      if (fb[key]) btn.textContent = fb[key];
    }
  });
}

/* ════════════════════════════════════════════════════════════════
   SEND MESSAGE  —  main entry point
   ════════════════════════════════════════════════════════════════ */
async function sendChatMessage() {
  const d   = dom();
  const inp = d.input;
  if (!inp) return;
  const text = inp.value.trim();
  if (!text) return;

  inp.value = '';
  hideSuggestions();
  appendMessage('user', text);

  /* ── If inside the order flow, handle locally (no API needed) ── */
  if (orderStep !== null && orderStep !== 'confirm') {
    showTyping(true);
    await sleep(400 + Math.random() * 200);
    showTyping(false);
    handleOrderStep(text);
    return;
  }

  showTyping(true);

  /* Auto-detect language */
  chatLang = /[\u0900-\u097F]/.test(text) ? 'hi' : 'en';
  if (d.langLabel) d.langLabel.textContent = chatLang === 'hi' ? 'EN' : 'HI';
  updateChatPlaceholder();

  /* Build history */
  chatHistory.push({ role: 'user', content: text });
  if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);

  await sleep(350 + Math.random() * 250);

  try {
    let reply = await getReply(chatHistory);

    /* ── Detect [START_ORDER] token from AI ── */
    if (reply.includes('[START_ORDER]')) {
      const cleanReply = reply.replace('[START_ORDER]', '').trim();
      showTyping(false);
      if (cleanReply) appendMessage('bot', cleanReply);
      chatHistory.push({ role: 'assistant', content: cleanReply || reply });
      setTimeout(startOrderFlow, 600);
      return;
    }

    showTyping(false);
    appendMessage('bot', reply);
    chatHistory.push({ role: 'assistant', content: reply });
    if (voiceOutputOn && speechSynthesisSupported) speakText(reply);
  } catch (err) {
    showTyping(false);
    appendMessage('error', chatLang === 'hi'
      ? '⚠️ कुछ गड़बड़ हुई। कृपया दोबारा कोशिश करें या **8445349802** पर कॉल करें।'
      : '⚠️ Something went wrong. Please try again or call **8445349802**.');
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ════════════════════════════════════════════════════════════════
   GET REPLY  —  OpenRouter → Claude Sonnet 4.5  (with offline fallback)
   ════════════════════════════════════════════════════════════════ */
async function getReply(history) {
  try {
    return await callOpenRouter(history);
  } catch (err) {
    console.warn('[DoonDidi Chat] OpenRouter unreachable, using offline fallback:', err.message);
    return offlineFallback(history[history.length - 1]?.content || '');
  }
}

/* ── Live OpenRouter API Call ────────────────────────────────── */
async function callOpenRouter(history) {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.slice(-10)
  ];

  const response = await fetch(OPENROUTER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer':  window.location.origin || 'https://doondidi.com',
      'X-Title':       'Doon Didi – Ghar Ka Aachar',
    },
    body: JSON.stringify({
      model:       OPENROUTER_MODEL,
      messages,
      max_tokens:  512,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    let errMsg = `HTTP ${response.status}`;
    try {
      const errBody = await response.json();
      errMsg = errBody?.error?.message || errMsg;
    } catch (_) {}
    throw new Error(`OpenRouter error: ${errMsg}`);
  }

  const data = await response.json();
  const msg  = data?.choices?.[0]?.message;
  let content = '';

  if (typeof msg?.content === 'string') {
    content = msg.content.trim();
  } else if (Array.isArray(msg?.content)) {
    content = msg.content.filter(b => b.type === 'text').map(b => b.text).join('').trim();
  }

  if (!content) throw new Error('Empty response from OpenRouter');
  return content;
}

/* ════════════════════════════════════════════════════════════════
   OFFLINE FALLBACK  —  handles common queries without internet
   ════════════════════════════════════════════════════════════════ */
function offlineFallback(text) {
  const t  = text.toLowerCase();
  const hi = /[\u0900-\u097F]/.test(text);

  /* ── Order intent → trigger order flow via token ── */
  if (/order|ऑर्डर|खरीद|buy|purchase|मंगवा|चाहिए|order karna|order krna/.test(t)) {
    return '[START_ORDER]' + (hi ? ' बिल्कुल! ऑर्डर लेते हैं।' : ' Sure, let\'s place your order!');
  }

  if (/^(hello|hi|hey|namaste|namaskar|नमस्ते|नमस्कार|हेलो|हाय)/.test(t))
    return hi
      ? `नमस्ते! 🙏 Doon Didi में आपका स्वागत है!\n\n**9 उत्पाद** उपलब्ध हैं। ऑर्डर करने के लिए लिखें "ऑर्डर करना है"। क्या जानना चाहेंगे?`
      : `Hello! 🙏 Welcome to Doon Didi!\n\nWe have **9 products**. To order, just say "I want to order". What would you like to know?`;

  if (/all.*product|product.*list|सब.*उत्पाद|उत्पाद.*क्या|what.*product|सारे/.test(t))
    return hi
      ? `हमारे उत्पाद 🥒:\n**अचार:** 🧄 लहसुन · 🫒 आंवला · 🌶️ हरी मिर्च · 🌶️ लाल मिर्च · 🥗 मिक्स्ड · 🥕 गाजर\n**अन्य:** 🌱 मुखवास · 🍬 आंवला कैंडी · 🍯 मुरब्बा\nदाम जानने के लिए: 📞 **8445349802**`
      : `Our products 🥒:\n**Pickles:** 🧄 Lahsun · 🫒 Amla · 🌶️ Green Mirch · 🌶️ Red Mirch · 🥗 Mixed · 🥕 Gajar\n**Others:** 🌱 Mukhwas · 🍬 Amla Candy · 🍯 Murabba\nFor pricing: 📞 **8445349802**`;

  if (/price|rate|दाम|कीमत|cost|how much|kitna|₹/.test(t))
    return hi
      ? `दाम जानने के लिए **8445349802** पर कॉल या WhatsApp करें। 📞\nन्यूनतम ऑर्डर ₹200 | ₹1000 से ऊपर बल्क छूट उपलब्ध!`
      : `For pricing, call or WhatsApp **8445349802**. 📞\nMinimum order ₹200 | Bulk discount above ₹1000!`;

  if (/ingredient|सामग्री|content|क्या.*है|kya.*hai/.test(t) && /lahsun|लहसुन|garlic/.test(t))
    return hi
      ? `🧄 **लहसुन अचार** सामग्री:\nलहसुन, सरसों का तेल, सरसों के बीज, मेथी, हल्दी, लाल मिर्च, नमक।\nकोई प्रिज़र्वेटिव नहीं! 100% घर का बना।`
      : `🧄 **Lahsun Pickle** ingredients:\nGarlic, mustard oil, mustard seeds, fenugreek, turmeric, red chilli, salt.\nNo preservatives! 100% homemade.`;

  if (/how.*order|order.*kaise|ऑर्डर.*कैसे|kaise order/.test(t))
    return hi
      ? `ऑर्डर 3 तरीकों से:\n\n1️⃣ **चैट में ऑर्डर** — "ऑर्डर करना है" लिखें\n2️⃣ **WhatsApp** — wa.me/918445349802\n3️⃣ **फ़ोन** — 8445349802\n\nन्यूनतम ऑर्डर: ₹200`
      : `Order in 3 ways:\n\n1️⃣ **Chat order** — type "I want to order"\n2️⃣ **WhatsApp** — wa.me/918445349802\n3️⃣ **Phone** — 8445349802\n\nMinimum order: ₹200`;

  if (/hours|timing|time|समय|कब|available|open|बंद/.test(t))
    return hi
      ? `⏰ **कार्य समय:**\nसोमवार – शनिवार: सुबह 9 – शाम 7 बजे\nरविवार: सुबह 10 – दोपहर 3 बजे`
      : `⏰ **Business Hours:**\nMon – Sat: 9 AM – 7 PM\nSunday: 10 AM – 3 PM`;

  if (/location|address|where|कहाँ|uttarakhand/.test(t))
    return hi
      ? `📍 हम **उत्तराखंड, भारत** से संचालित हैं।\nपूरे भारत में डिलीवरी उपलब्ध है।`
      : `📍 We operate from **Uttarakhand, India**.\nDelivery available across India.`;

  return hi
    ? `जानकारी के लिए **8445349802** पर कॉल/WhatsApp करें। 🙏\nऑर्डर के लिए लिखें: "**ऑर्डर करना है**"`
    : `For help, call/WhatsApp **8445349802**. 🙏\nTo place an order, type: "**I want to order**"`;
}

/* ════════════════════════════════════════════════════════════════
   VOICE INPUT  (SpeechRecognition)
   ════════════════════════════════════════════════════════════════ */
function toggleVoiceInput() {
  if (!speechRecognitionSupported) {
    appendMessage('system', chatLang === 'hi'
      ? '⚠️ आपका ब्राउज़र वॉयस इनपुट सपोर्ट नहीं करता।'
      : '⚠️ Voice input not supported in this browser.');
    return;
  }
  isListening ? stopListening() : startListening();
}

function startListening() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognitionObj = new SR();
  recognitionObj.lang            = chatLang === 'hi' ? 'hi-IN' : 'en-IN';
  recognitionObj.continuous      = false;
  recognitionObj.interimResults  = true;
  recognitionObj.maxAlternatives = 1;

  recognitionObj.onstart = () => {
    isListening = true;
    const btn = dom().micBtn; if (btn) btn.classList.add('listening');
    const inp = dom().input;
    if (inp) { inp.placeholder = chatLang === 'hi' ? '🎙️ सुन रहे हैं...' : '🎙️ Listening...'; inp.value = ''; }
  };

  recognitionObj.onresult = (e) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) { const inp = dom().input; if (inp) inp.value = e.results[i][0].transcript; }
      else { interim += e.results[i][0].transcript; const inp = dom().input; if (inp) inp.value = interim; }
    }
  };

  recognitionObj.onend = () => {
    isListening = false;
    const btn = dom().micBtn; if (btn) btn.classList.remove('listening');
    updateChatPlaceholder();
    const inp = dom().input; if (inp && inp.value.trim()) setTimeout(sendChatMessage, 150);
  };

  recognitionObj.onerror = (e) => {
    isListening = false;
    const btn = dom().micBtn; if (btn) btn.classList.remove('listening');
    updateChatPlaceholder();
    if (e.error !== 'no-speech' && e.error !== 'aborted')
      appendMessage('system', chatLang === 'hi' ? `🎙️ एरर: ${e.error}` : `🎙️ Voice error: ${e.error}`);
  };

  try { recognitionObj.start(); }
  catch (err) {
    isListening = false;
    appendMessage('system', chatLang === 'hi' ? '🎙️ माइक शुरू नहीं हो सका।' : '🎙️ Could not start microphone.');
  }
}

function stopListening() {
  if (recognitionObj) { try { recognitionObj.stop(); } catch (_) {} recognitionObj = null; }
  isListening = false;
  const btn = dom().micBtn; if (btn) btn.classList.remove('listening');
  updateChatPlaceholder();
}

/* ════════════════════════════════════════════════════════════════
   VOICE OUTPUT  (SpeechSynthesis)
   ════════════════════════════════════════════════════════════════ */
function toggleVoiceOutput() {
  voiceOutputOn = !voiceOutputOn;
  const { voiceOnIcon, voiceOffIcon } = dom();
  if (voiceOnIcon)  voiceOnIcon.style.display  = voiceOutputOn ? 'block' : 'none';
  if (voiceOffIcon) voiceOffIcon.style.display = voiceOutputOn ? 'none'  : 'block';
  if (!voiceOutputOn) stopSpeaking();
  appendMessage('system', voiceOutputOn
    ? (chatLang === 'hi' ? '🔊 आवाज़ चालू' : '🔊 Voice on')
    : (chatLang === 'hi' ? '🔇 आवाज़ बंद'  : '🔇 Voice off'));
}

function speakText(rawText) {
  if (!speechSynthesisSupported || !voiceOutputOn) return;
  stopSpeaking();
  const text = rawText.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\n/g, ' ').trim();
  if (!text) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang   = chatLang === 'hi' ? 'hi-IN' : 'en-IN';
  utter.rate   = 0.92; utter.pitch = 1.05; utter.volume = 0.9;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.startsWith(chatLang === 'hi' ? 'hi' : 'en') && /female|woman/i.test(v.name))
                 || voices.find(v => v.lang.startsWith(chatLang === 'hi' ? 'hi' : 'en'));
  if (preferred) utter.voice = preferred;
  utter.onstart = () => { isSpeaking = true; };
  utter.onend   = () => { isSpeaking = false; };
  utter.onerror = () => { isSpeaking = false; };
  window.speechSynthesis.speak(utter);
  isSpeaking = true;
}

function stopSpeaking() {
  if (speechSynthesisSupported) window.speechSynthesis.cancel();
  isSpeaking = false;
}

/* ════════════════════════════════════════════════════════════════
   UI HELPERS
   ════════════════════════════════════════════════════════════════ */
function appendMessage(type, rawText) {
  const d = dom();
  if (!d.messages) return;

  const wrap = document.createElement('div');
  wrap.classList.add('chat-msg', `chat-msg-${type}`);

  const safe = rawText
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');

  const bubble = document.createElement('div');
  bubble.classList.add('chat-bubble');
  bubble.innerHTML = safe;
  wrap.appendChild(bubble);

  if (type !== 'system') {
    const time = document.createElement('span');
    time.classList.add('chat-time');
    time.textContent = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    wrap.appendChild(time);
  }

  d.messages.appendChild(wrap);
  scrollBottom();
  requestAnimationFrame(() => wrap.classList.add('visible'));
}

function showTyping(show) {
  const t = dom().typing;
  if (!t) return;
  t.style.display = show ? 'flex' : 'none';
  if (show) {
    const lbl = t.querySelector('small');
    if (lbl) lbl.textContent = chatLang === 'hi' ? 'AI जवाब लिख रहा है...' : 'AI is typing...';
    scrollBottom();
  }
}

function scrollBottom() {
  const m = dom().messages;
  if (m) setTimeout(() => { m.scrollTop = m.scrollHeight; }, 50);
}

function hideSuggestions() {
  const s = dom().suggestions;
  if (s) s.style.display = 'none';
}

function useSuggestion(btn) {
  const inp = dom().input;
  if (inp) { inp.value = btn.textContent.trim(); sendChatMessage(); }
}

/* ════════════════════════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  if (typeof currentLang !== 'undefined') {
    chatLang = currentLang;
    const lbl = document.getElementById('chatLangLabel');
    if (lbl) lbl.textContent = chatLang === 'hi' ? 'EN' : 'HI';
  }

  if (!speechRecognitionSupported) {
    const mic = document.getElementById('chatMicBtn');
    if (mic) { mic.style.opacity = '0.35'; mic.style.cursor = 'not-allowed';
      mic.title = chatLang === 'hi' ? 'वॉयस सपोर्ट नहीं' : 'Voice not supported'; }
  }

  if (speechSynthesisSupported) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }

  setTimeout(() => {
    const badge = document.getElementById('chatbotBadge');
    if (badge && !chatOpen) badge.style.display = 'flex';
  }, 3000);

  updateChatPlaceholder();
  updateSuggestionLang();
});

/* ── Keep in sync with site EN/HI toggle ────────────────────── */
(function syncWithSiteToggle() {
  const poll = setInterval(() => {
    if (typeof window.toggleLang === 'function') {
      clearInterval(poll);
      const orig = window.toggleLang;
      window.toggleLang = function () {
        orig.call(this);
        if (typeof currentLang !== 'undefined') {
          chatLang = currentLang;
          const lbl = document.getElementById('chatLangLabel');
          if (lbl) lbl.textContent = chatLang === 'hi' ? 'EN' : 'HI';
          updateChatPlaceholder();
          updateSuggestionLang();
        }
      };
    }
  }, 50);
})();