import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDHup4M5P3z-fy9fVRElBx0hutREWZGSAM",
  authDomain: "anandhavruksham-3aa36.firebaseapp.com",
  projectId: "anandhavruksham-3aa36",
  storageBucket: "anandhavruksham-3aa36.firebasestorage.app",
  messagingSenderId: "604117717957",
  appId: "1:604117717957:web:3df03ca1c702dba99331ac"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const statusEl = document.getElementById("status");

function setStatus(msg, isError = false) {
  if (statusEl) {
    statusEl.textContent = msg;
    statusEl.style.color = isError ? "#c0392b" : "#004d3e";
  }
  console.log(msg);
}

function formatTimestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return (
    d.getFullYear() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    "_" +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  );
}

async function downloadDatabase() {
  try {
    setStatus("Fetching data from Firestore...");

    const snap = await getDocs(collection(db, "game_reg"));
    const records = [];
    snap.forEach((doc) => {
      records.push({ id: doc.id, ...doc.data() });
    });

    const payload = {
      collection: "game_reg",
      downloadedAt: new Date().toISOString(),
      totalRecords: records.length,
      records: records
    };

    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "game_reg_" + formatTimestamp() + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setStatus("✓ Downloaded " + records.length + " records successfully.");
  } catch (error) {
    console.error("Download error:", error);
    setStatus("✗ Failed to download: " + error.message, true);
  }
}

downloadDatabase();