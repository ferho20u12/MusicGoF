import {guardarUsuario,
    getUsuarios
} from './conexionConfig.js'
import { mainInicio, mainMap, mainPerfil
} from './mains.js'
const user = window.localStorage.getItem('user');
const btnMap = document.getElementById('btn-Map');
const btnInicio = document.getElementById('btn-Inicio');
const btnPerfil = document.getElementById('btn-Perfil');
const main = document.getElementById('main');

btnMap.addEventListener("click",(e)=>{
    e.preventDefault();
    main.innerHTML = mainMap;
    geoloc();
})
btnInicio.addEventListener("click",(e)=>{
    e.preventDefault();
    main.innerHTML = mainInicio;
})
btnPerfil.addEventListener("click",(e)=>{
    e.preventDefault();
    main.innerHTML = mainPerfil;
})










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
    if(user == 'none'){
        const str = window.location.href.replace('ingreso.html','login.html');
        localStorage.setItem("user","none");
        location.href = str;
    }else{
        const texto = document.getElementById('texto-user');
        const name = "Bienvenido "+user;
        texto.placeholder = name; 
    }
});
window.addEventListener("beforeunload", function (e) {
    this.localStorage.setItem("user",'none'); 
});