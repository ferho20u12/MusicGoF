import {guardarArchivo
} from './conexionConfig.js'
import { mainInicio, mainMap, mainPerfil
} from './mains.js'
const user = window.localStorage.getItem('user');
const btnMap = document.getElementById('btn-Map');
const btnInicio = document.getElementById('btn-Inicio');
const btnPerfil = document.getElementById('btn-Perfil');
var band=false;
const main = document.getElementById('main');

btnMap.addEventListener("click",(e)=>{
    e.preventDefault();
    main.innerHTML = mainMap;
    geoloc();
    const btnRC = document.getElementById('btn-RC');
    btnRC.addEventListener("click",(e)=>{
        e.preventDefault();
        const fileName = window.localStorage.getItem('file-name');
        const file = document.getElementById("myAudio").src;
        var binary= convertDataURIToBinary(file);
        var blob=new Blob([binary], {type : 'audio/*'});
        guardarArchivo(blob,fileName);
        alert("Cancion guardada");
    })

})
btnInicio.addEventListener("click",(e)=>{
    e.preventDefault();
    main.innerHTML = mainInicio;
})
btnPerfil.addEventListener("click",(e)=>{
    e.preventDefault();
    main.innerHTML = mainPerfil;
})




//-------------------------------------------------------------Funciones de cancion
function getFile() {
    var base64 = localStorage["file"];
    var base64Parts = base64.split(",");
    var fileFormat = base64Parts[0].split(";")[1];
    var fileContent = base64Parts[1];
    var file = new File([fileContent], "file name here", {type: fileFormat});
    return file;
}
function convertDataURIToBinary(dataURI) {
    var BASE64_MARKER = ';base64,';
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
  
    for(var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
}
//-------------------------------------------------------------Funciones del mapa
function geoloc (){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
      alert("Lo sentimos, tu dispositivo no admite la geolocaización.");
    }
}

function showPosition(position){
    let map = L.map('map').setView([position.coords.latitude,position.coords.longitude], 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
        L.marker([position.coords.latitude,position.coords.longitude]).addTo(map)
            .openPopup();
}


//---------------------------------------------------------------------Funciones de inico/fin de la pagina
window.addEventListener("DOMContentLoaded", function (e) {
    /*if(user == 'none'){
        const str = window.location.href.replace('ingreso.html','login.html');
        localStorage.setItem("user","none");
        location.href = str;
    }else{
        const texto = document.getElementById('texto-user');
        const name = "Bienvenido "+user;
        texto.placeholder = name; 
    }*/
});
window.addEventListener("beforeunload", function (e) {
    this.localStorage.setItem("user",'none'); 
});