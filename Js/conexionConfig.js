import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getFirestore ,
          collection,
          getDocs,
          getDoc,
          setDoc,
          updateDoc,
          doc
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js"
import { getStorage, ref, uploadBytes  } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-storage.js";
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
const storage = getStorage();
const auth = getAuth();

export const Autorizar = (correo,contrasena)=>{
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
export const getAudioDetails  = (audioName)=> getDoc(doc(db, "usuarios", audioName))

export const getUsuario = (correo)=> getDoc(doc(db, "usuarios", correo))

export const guardarUsuario = (nombre,correo,contrasena,canciones)=> setDoc(doc(db,'usuarios',correo),{nombre,correo,contrasena,canciones});

export const guardarCancion = (nombre,correo,latitude,longitude)=> setDoc(doc(db,'canciones',nombre),{nombre,correo,latitude,longitude});

export const updateUsuario = (nombre,correo,contrasena,canciones)=> updateDoc(doc(db,'usuarios',correo),{nombre,correo,contrasena,canciones});

export const getUsuarios = () => getDocs(collection(db,'usuarios')) 

export const guardarArchivo = (file,nombre)=>{
  const storageRef = ref(storage,'musica/'+nombre);
  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, file).then((snapshot) => {
    alert("Cancion subida");
  });
}
export const cargarArchivo =(nameAudio)=>getDownloadURL(ref(storage, 'musica/'+nameAudio))
.then((url) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = (event) => {
    const blob = xhr.response;
  };
  xhr.open('GET', url);
  xhr.send();

  // Or inserted into an <img> element
  const img = document.getElementById('myimg');
  img.setAttribute('src', url);
})
.catch((error) => {
  // Handle any errors
});