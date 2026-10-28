# ആനന്ദവൃക്ഷം ചെസ്സ് ടൂർണമെന്റ് – രജിസ്ട്രേഷൻ പ്രോജക്ട്

## 1. പ്രോജക്ട് എന്താണ്?

**Anandhavruksham Chess Tournament** എന്ന ചെസ്സ് മത്സരത്തിലേക്ക് **സ്കൂളുകൾക്ക് ഓൺലൈനായി രജിസ്റ്റർ ചെയ്യാനുള്ള വെബ് ആപ്ലിക്കേഷൻ** ആണിത്. പേപ്പർ രജിസ്ട്രേഷൻ ഫോമിന്റെ അതേ രൂപത്തിൽ (ലോഗോ, വിലാസം, ടേബിൾ, ഒപ്പിനുള്ള സ്ഥലം ഉൾപ്പെടെ) ഓൺലൈൻ ഫോം തയ്യാറാക്കിയിരിക്കുന്നു.

- സംഘടന: Anandha Vruksham, തിരുത്തണി (Tirutani) – 631209, തിരുവള്ളൂർ ജില്ല, തമിഴ്നാട്
- GitHub റിപ്പോസിറ്ററി: `Vijay-Anand-A/game` (branch: `main`)

### പ്രധാന സവിശേഷതകൾ
| സവിശേഷത | വിവരണം |
|---|---|
| രജിസ്ട്രേഷൻ ഫോം | സ്കൂൾ പേര്/വിലാസം, കാറ്റഗറി (UNDER-08, 11, 13, 15), സ്കൂൾ ഇമെയിൽ, പ്രിൻസിപ്പൽ പേര്/ഫോൺ, PD/PET/Coach പേര്/ഫോൺ |
| വിദ്യാർത്ഥികളുടെ പട്ടിക | ഒരു സ്കൂളിൽ നിന്ന് പരമാവധി **10 പേർ** – പേര്, Boy/Girl, Class & Section, DOB |
| Send ബട്ടൺ | ഫോം ഡാറ്റ നേരിട്ട് ഡാറ്റാബേസിലേക്ക് അയക്കുന്നു; വിജയിച്ചാൽ ഫോം ക്ലിയർ ആകും |
| Download ബട്ടൺ | `window.print()` ഉപയോഗിച്ച് ഫോം പ്രിന്റ് / PDF ആയി സേവ് ചെയ്യാം |
| അഡ്മിൻ വ്യൂ (`view.html`) | രജിസ്റ്റർ ചെയ്ത എല്ലാ സ്കൂളുകളുടെയും ലിസ്റ്റ്, ആകെ എണ്ണം, വിദ്യാർത്ഥികളുടെ എണ്ണം |
| ഫീസ് സ്റ്റാറ്റസ് | Paid / Unpaid ബാഡ്ജിൽ ക്ലിക്ക് ചെയ്ത് മാറ്റാം (ഡാറ്റാബേസിൽ `feePaid` ആയി സേവ് ആകും) |
| വിശദ വ്യൂ | "View" ക്ലിക്ക് ചെയ്താൽ രജിസ്ട്രേഷൻ ഫോം അതേ രൂപത്തിൽ പോപ്പ്-അപ്പ് ആയി കാണാം |

---

## 2. ഉപയോഗിച്ച ഭാഷ / ടെക്നോളജി

ഇതൊരു **ബാക്ക്എൻഡ് സെർവർ ഇല്ലാത്ത (serverless) ഫ്രണ്ട്എൻഡ്-ഒൺലി പ്രോജക്ട്** ആണ്. `npm`, build tool, framework (React/Angular പോലുള്ളവ) ഒന്നും ഉപയോഗിച്ചിട്ടില്ല.

| ഭാഗം | ടെക്നോളജി |
|---|---|
| ഘടന (Structure) | **HTML5** |
| ഡിസൈൻ | **CSS3** (HTML ഫയലിനുള്ളിൽ തന്നെ `<style>` ടാഗിൽ) |
| ലോജിക് | **JavaScript (ES Modules – `<script type="module">`)**, Vanilla JS |
| ഡാറ്റാബേസ് SDK | **Firebase JavaScript SDK v12.11.0** (CDN വഴി: `gstatic.com/firebasejs`) |
| പ്രിന്റ് / ഡൗൺലോഡ് | ബ്രൗസറിന്റെ `window.print()` |
| വേർഷൻ കൺട്രോൾ | **Git + GitHub** |

---

## 3. ഡാറ്റാബേസ് ഏതാണ്?

**Google Firebase – Cloud Firestore** (NoSQL, document-based ഡാറ്റാബേസ്).

- Firebase Project ID: `anandhavruksham-3aa36`
- Auth Domain: `anandhavruksham-3aa36.firebaseapp.com`

### Collections

**1) `game_reg`** – രജിസ്ട്രേഷനുകൾ സൂക്ഷിക്കുന്നു. ഓരോ സ്കൂളും ഒരു document.

```js
{
  schoolNameAddress: "സ്കൂൾ പേര്, വിലാസം",
  categories: ["UNDER-08", "UNDER-13"],
  schoolEmail: "...",
  principalName: "...",
  principalContact: "...",
  coachName: "...",
  coachContact: "...",
  participants: [
    { slno: 1, name: "...", gender: "Boy", classSec: "8-A", dob: "..." }
  ],
  feePaid: true,            // അഡ്മിൻ view.html-ൽ നിന്ന് സെറ്റ് ചെയ്യുന്നത്
  createdAt: <serverTimestamp>
}
```

**2) `login`** – അഡ്മിൻ ലോഗിൻ വിവരങ്ങൾക്കുള്ള collection (document id `1`: `username: admin`, `dept: ad`). ഇത് `create_table_insert_query_firebase.js` ഉപയോഗിച്ച് ഒരു തവണ ഉണ്ടാക്കിയതാണ്. *നിലവിലെ കോഡിൽ ഈ collection എവിടെയും ലോഗിൻ പരിശോധനയ്ക്ക് ഉപയോഗിക്കുന്നില്ല.*

---

## 4. ഹോസ്റ്റിംഗ് എവിടെയാണ്?

- **ഡാറ്റാബേസ് ഹോസ്റ്റിംഗ്:** Google Firebase (Firestore) ക്ലൗഡിൽ – ഇത് ഉറപ്പാണ്.
- **വെബ്സൈറ്റ് ഹോസ്റ്റിംഗ്:** കോഡ് **GitHub** (`Vijay-Anand-A/game`) ൽ ആണ്. പ്രോജക്ടിൽ Netlify / Vercel / Firebase Hosting എന്നിവയുടെ കോൺഫിഗ് ഫയലുകൾ (`netlify.toml`, `vercel.json`, `firebase.json`, `CNAME`) ഇല്ല. അതിനാൽ ഇത് **GitHub Pages** വഴി ഹോസ്റ്റ് ചെയ്യുന്നതാകാനാണ് സാധ്യത – പക്ഷേ ഇത് കോഡിൽ നിന്ന് ഉറപ്പിക്കാൻ കഴിയില്ല (റിപ്പോയുടെ Settings → Pages പരിശോധിക്കണം).
- ഇത് സ്റ്റാറ്റിക് ഫയലുകൾ മാത്രമായതിനാൽ ഏത് സ്റ്റാറ്റിക് ഹോസ്റ്റിലും (GitHub Pages, Netlify, Firebase Hosting) പ്രവർത്തിക്കും.

---

## 5. ഫയൽ ഘടന

```
anandhavruksham_game/
├── index.html                              → സ്കൂൾ രജിസ്ട്രേഷൻ ഫോം (public)
├── view.html                               → രജിസ്ട്രേഷൻ ലിസ്റ്റ്, ഫീസ് സ്റ്റാറ്റസ്, വിശദ വ്യൂ (admin)
├── run.html                                → `game_reg` collection ഉണ്ടാക്കാൻ ഒരു തവണ ഓടിക്കുന്ന പേജ്
├── create_table_game_reg_query.js          → `game_reg/lists` document ഉണ്ടാക്കുന്ന സ്ക്രിപ്റ്റ്
├── create_table_insert_query_firebase.js   → `login` collection-ൽ ഡിഫോൾട്ട് admin ഉണ്ടാക്കുന്ന സ്ക്രിപ്റ്റ്
├── img/
│   ├── anand_vruk_logo.png                 → ആനന്ദവൃക്ഷം ലോഗോ
│   └── chess_tour_logo.png                 → ചെസ്സ് ടൂർണമെന്റ് ലോഗോ
└── README.md                               → (ഇപ്പോൾ "# game" മാത്രം)
```

---

## 6. പ്രവർത്തന രീതി (Flow)

```
സ്കൂൾ  ──►  index.html (ഫോം പൂരിപ്പിക്കുന്നു)
                │  Send ക്ലിക്ക്
                ▼
        Firebase Firestore  →  collection: game_reg  (addDoc)
                ▲
                │  getDocs / updateDoc (feePaid)
        അഡ്മിൻ  ──►  view.html (ലിസ്റ്റ് കാണുന്നു, Paid/Unpaid മാറ്റുന്നു)
```

1. സ്കൂൾ പ്രതിനിധി `index.html` തുറന്ന് വിവരങ്ങൾ നൽകി **Send** അമർത്തുന്നു.
2. JavaScript ഫോം ഡാറ്റ ശേഖരിച്ച് (കാലിയായ വരികൾ ഒഴിവാക്കി) `game_reg` collection-ലേക്ക് `addDoc` ചെയ്യുന്നു.
3. അഡ്മിൻ `view.html` തുറക്കുമ്പോൾ എല്ലാ രജിസ്ട്രേഷനും `createdAt` പ്രകാരം പുതിയത് ആദ്യം എന്ന ക്രമത്തിൽ കാണാം.
4. ഫീസ് ലഭിച്ചാൽ Unpaid ബാഡ്ജിൽ ക്ലിക്ക് ചെയ്ത് Paid ആക്കാം.

---

## 7. പ്രാദേശികമായി ഓടിക്കുന്ന വിധം

1. ഫോൾഡർ ഒരു ലോക്കൽ സെർവറിൽ തുറക്കുക (ES Modules ഉള്ളതിനാൽ `file://` ൽ പ്രവർത്തിക്കില്ല), ഉദാ: VS Code-ന്റെ *Live Server* അല്ലെങ്കിൽ `python -m http.server`.
2. ആദ്യ തവണ മാത്രം `run.html` തുറന്ന് `game_reg` collection ഉണ്ടാക്കുക.
3. `index.html` (ഫോം), `view.html` (അഡ്മിൻ) തുറക്കുക.

---

## 8. സുരക്ഷാ കുറിപ്പുകൾ (ശ്രദ്ധിക്കേണ്ടവ)

കോഡ് പരിശോധിച്ചപ്പോൾ കണ്ട പ്രധാന കാര്യങ്ങൾ:

1. **`view.html` ന് ലോഗിൻ സംരക്ഷണമില്ല.** URL അറിയുന്ന ആർക്കും എല്ലാ സ്കൂളുകളുടെയും വിവരങ്ങൾ (വിദ്യാർത്ഥികളുടെ പേര്, DOB, ഫോൺ നമ്പർ) കാണാനും ഫീസ് സ്റ്റാറ്റസ് മാറ്റാനും കഴിയും. `login` collection ഉണ്ടെങ്കിലും അത് ഉപയോഗിക്കുന്നില്ല.
2. **ഡിഫോൾട്ട് അഡ്മിൻ പാസ്‌വേഡ് `admin` / `admin`** ആണ്, അതും Firestore-ൽ **plain text** ആയി സൂക്ഷിക്കുന്നു. പരിഹാരം: Firebase Authentication ഉപയോഗിക്കുക.
3. **Firebase config (apiKey) കോഡിൽ പരസ്യമായി ഉണ്ട്.** വെബ് ആപ്പിൽ ഇത് സാധാരണമാണ് – അപകടമല്ല – പക്ഷേ അതിനാൽ **Firestore Security Rules** ശരിയായി സെറ്റ് ചെയ്യേണ്ടത് നിർബന്ധമാണ്. ഉദാ: `game_reg` ൽ എല്ലാവർക്കും *create* മാത്രം അനുവദിക്കുക; *read/update* ലോഗിൻ ചെയ്ത അഡ്മിന് മാത്രം.
4. കുട്ടികളുടെ വ്യക്തിഗത വിവരങ്ങൾ ഉള്ളതിനാൽ മുകളിലെ പരിഹാരങ്ങൾ പ്രധാനമാണ്.

## 9. ഭാവിയിൽ മെച്ചപ്പെടുത്താവുന്നവ

- Firebase Authentication ഉപയോഗിച്ച് അഡ്മിൻ ലോഗിൻ
- Firestore Security Rules
- ഫോം വാലിഡേഷൻ (ഇമെയിൽ, ഫോൺ നമ്പർ, ഡ്യൂപ്ലിക്കേറ്റ് രജിസ്ട്രേഷൻ തടയൽ)
- ഒരേ CSS മൂന്ന് ഫയലുകളിൽ ആവർത്തിക്കുന്നതിനാൽ ഒരു പൊതു `style.css`, Firebase config ഒരു പൊതു `firebase-config.js`
- Excel/CSV export, ഓൺലൈൻ പേയ്മെന്റ്
- അർത്ഥവത്തായ `README.md`
