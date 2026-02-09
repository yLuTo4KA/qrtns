import { initializeApp } from "firebase/app";
import { getDatabase, set, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDoJVsa63w2OusDP9FhZCbxxzDmB45RYRU",

  authDomain: "react-691c2.firebaseapp.com",

  projectId: "react-691c2",
  databaseUrl: "https://react-691c2-default-rtdb.firebaseio.com",

  storageBucket: "react-691c2.firebasestorage.app",

  messagingSenderId: "1022286533908",

  appId: "1:1022286533908:web:ccfe109eba0d003ec51e01",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function telegramLogin(tgId: string) {
  set(ref(db, `users/telegram_${tgId}`), {
    cnfrm: false,
    pltnL: "",
    pltnP: "",
    pltnG: "",
  });
}
