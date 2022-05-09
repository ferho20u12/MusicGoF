import {
  guardarArchivo,
  guardarCancion,
  updateUsuario,
  getUsuario,
  getAudioDetails,
  getAudios,
  guardarUsuario
} from "./conexionConfig.js";
import { mainInicio, mainMap, mainPerfil, mainCap } from "./mains.js";
const user = window.localStorage.getItem("user");
const correo = window.localStorage.getItem("correo");
const btnMap = document.getElementById("btn-Map");
const btnCap = document.getElementById("btn-Cap");
const btnInicio = document.getElementById("btn-Inicio");
const btnPerfil = document.getElementById("btn-Perfil");
var band = false;
const main = document.getElementById("main");

btnCap.addEventListener("click", async (e) => {
  e.preventDefault();
  main.innerHTML = mainCap;
  geoloc();
  const btnRC = document.getElementById("btn-RC");
  btnRC.addEventListener("click", async (e) => {
    e.preventDefault();
    const fileName = localStorage.getItem("file-name");
    if (fileName != "none") {
      const docAudio = await getAudioDetails(fileName);
      if(!docAudio.exists()){
        const doc = await getUsuario(correo);
        const latitude = localStorage.getItem("latitude");
        const longitude = localStorage.getItem("longitude");
        const file = document.getElementById("myAudio").src;
        var binary = convertDataURIToBinary(file);
        var blob = new Blob([binary], { type: "audio/*" });
        await guardarCancion(fileName, correo, latitude, longitude);
        await guardarArchivo(blob, fileName);
        if (doc.exists()) {  
          var canciones = doc.data().canciones;
          canciones.push(fileName);
          await updateUsuario(
            doc.data().nombre,
            doc.data().correo,
            doc.data().contrasena,
            canciones
          );
        }
        alert("Su cancion se subira en breve");
      }else{
        alert("Ya existe una cancion con el mismo nombre");
      }
    } else {
      alert("Seleccione una cancion");
    }
  });
});
btnMap.addEventListener("click", async(e) => {
  e.preventDefault();
  main.innerHTML = mainMap;
  const querySnapshot = await getAudios();
  let queryUsuario = await getUsuario(correo);
  var cancionesDisponibles = [];
  geoloc2();
  //--------------------------------------------------------Bottons
  function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
  }

  let ul = document.getElementById('table');
  ul.addEventListener("click",async (e)=>{
    queryUsuario = await getUsuario(correo);
    let target = getEventTarget(e);
    let li = target.closest('a'); // get reference
    let nodes = Array.from( li.closest('ul').children ); // get array
    let index = nodes.indexOf( li );
    let cancionesNuevas = queryUsuario.data().canciones;
    console.log(cancionesDisponibles.at(index));
    cancionesNuevas.push(cancionesDisponibles.at(index))
    await guardarUsuario(queryUsuario.data().nombre,queryUsuario.data().correo,queryUsuario.data().contrasena,cancionesNuevas);
    cancionesDisponibles.splice(index, 1);
    document.getElementById('table').innerHTML =``
    cancionesDisponibles.forEach((doc)=>{
      document.getElementById('table').innerHTML +=
      `
      <a type=`+doc+` class="list-group-item list-group-item-action">`+doc+`</a>
      ` 
    })
        
  })
  //--------------------------------------------------------Funciones
  function geoloc2() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition2);
      } else {
        alert("Lo sentimos, tu dispositivo no admite la geolocaización.");
      }
  }
  function showPosition2(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let map2 = L.map("map2").setView([latitude, longitude], 18);
    var musicIcon = L.icon({
      iconUrl: '../Assets/boombox-fill.png',
      iconSize: [20, 21]
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map2);
    var circle = L.circle([latitude, longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 20
    }).addTo(map2);
    L.marker([latitude,longitude]).addTo(map2)
      .bindPopup("("+latitude+","+longitude+")")
      .openPopup();
    ;
    querySnapshot.forEach((doc) => {
      var band = false;
      queryUsuario.data().canciones.forEach((doc3)=>{
        if(doc3 == doc.data().nombre){
          band=true;
        }
      })
      if(!band){
        L.marker([doc.data().latitude,doc.data().longitude],{icon: musicIcon}).addTo(map2)
          .bindPopup(doc.data().nombre)  
          .openPopup();
          if(0 >= operacion_pitagoras(latitude,longitude,doc.data().latitude,doc.data().longitude,0.000200)){
              cancionesDisponibles.push(doc.data().nombre)
              document.getElementById('table').innerHTML +=
              `
                <a type=`+doc.data().nombre+` class="list-group-item list-group-item-action">`+doc.data().nombre+`</a>
              `
          }

      }
    })  
  }
  function operacion_pitagoras(x,y,x1,y2,r)
  {
    var result = 0;
    result =  ((x-x1)*(x-x1))  + ((y-y2)*(y-y2)) -  (r*r);
    return result;
  }
});
btnInicio.addEventListener("click", (e) => {
  e.preventDefault();
  main.innerHTML = mainInicio;
});
btnPerfil.addEventListener("click", (e) => {
  e.preventDefault();
  main.innerHTML = mainPerfil;
});

//-------------------------------------------------------------Funciones de cancion
function getFile() {
  var base64 = localStorage["file"];
  var base64Parts = base64.split(",");
  var fileFormat = base64Parts[0].split(";")[1];
  var fileContent = base64Parts[1];
  var file = new File([fileContent], "file name here", { type: fileFormat });
  return file;
}
function convertDataURIToBinary(dataURI) {
  var BASE64_MARKER = ";base64,";
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for (var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}
//-------------------------------------------------------------Funciones del mapa
function geoloc() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Lo sentimos, tu dispositivo no admite la geolocalización.");
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  let map = L.map("map").setView([latitude, longitude], 16);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  L.popup()
    .setLatLng([latitude, longitude])
    .setContent("Ubicacion Actual")
    .openOn(map);
  L.marker([latitude, longitude]).addTo(map).openPopup();
  localStorage.setItem("latitude", latitude);
  localStorage.setItem("longitude", longitude);
}

//---------------------------------------------------------------------Funciones de inico/fin de la pagina
window.addEventListener("DOMContentLoaded", function (e) {
  localStorage.setItem("file-name", "none");
  if (user != "none") {
    const texto = document.getElementById("texto-user");
    const name = "Bienvenido " + user;
    texto.placeholder = name;
  } else {
    const str = window.location.href.replace("ingreso.html", "login.html");
    location.href = str;
  }
});
window.addEventListener("beforeunload", function (e) {
  localStorage.setItem("user", "none");
  localStorage.setItem("correo", "none");
  localStorage.setItem("latitude", "");
  localStorage.setItem("longitude", "");
  localStorage.setItem("file-name", "none");
});
