import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getFirestore ,
          collection,
          addDoc,
          getDocs,
          query,
          where,
          setDoc,
          doc
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js"

const firebaseConfig = {
   apiKey: "AIzaSyAfGY_mqEF4huqK0oywK-HrNoqX_ityeIU",
   authDomain: "musicgo-f228a.firebaseapp.com",
   databaseURL: "https://musicgo-f228a-default-rtdb.firebaseio.com",
   projectId: "musicgo-f228a",
   storageBucket: "musicgo-f228a.appspot.com",
   messagingSenderId: "414709953375",
   appId: "1:414709953375:web:95ccaa815d8f93558e3cea"
 };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Analytics and get a reference to the service
const db = getFirestore();
export const Autorizar = (correo,contrasena)=>{
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, correo, contrasena)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
};
export const guardarUsuario = (nombre,correo,contrasena)=> setDoc(doc(db,'usuarios',correo),{nombre,correo,contrasena});


export const getUsuarios = () => getDocs(collection(db,'usuarios')) 