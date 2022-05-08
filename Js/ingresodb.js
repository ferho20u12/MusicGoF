import {guardarArchivo,
        guardarCancion,
        updateUsuario,
        getUsuario
} from './conexionConfig.js'
import { mainInicio, mainMap, mainPerfil,mainCap
} from './mains.js'
const user = window.localStorage.getItem('user');
const correo = window.localStorage.getItem('correo');
const btnMap = document.getElementById('btn-Map');
const btnCap = document.getElementById('btn-Cap');
const btnInicio = document.getElementById('btn-Inicio');
const btnPerfil = document.getElementById('btn-Perfil');
var band=false;
const main = document.getElementById('main');

btnCap.addEventListener("click",async (e)=>{
    e.preventDefault();
    main.innerHTML = mainCap;
    geoloc();
    const btnRC = document.getElementById('btn-RC');
    btnRC.addEventListener("click",async(e)=>{
        e.preventDefault();
        const fileName  = localStorage.getItem('file-name');
        if(fileName != 'none'){
            const doc = await getUsuario(correo);
            const latitude  = localStorage.getItem('latitude');
            const longitude = localStorage.getItem('longitude');
            const file = document.getElementById("myAudio").src;
            var binary= convertDataURIToBinary(file);
            var blob=new Blob([binary], {type : 'audio/*'});
            await guardarCancion(fileName,correo,latitude,longitude);
            await guardarArchivo(blob,fileName);
            if(doc.exists()){
                var canciones = doc.data().canciones;
                canciones.push(fileName);
                await updateUsuario(doc.data().nombre,doc.data().correo,doc.data().contrasena,canciones);
            }
            alert("Su cancion se subira en breve");
        }else{ alert("Seleccione una cancion")}
    })

})
btnMap.addEventListener("click",(e)=>{
    e.preventDefault();
    main.innerHTML = mainMap;

    

    function geoloc (){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        else {
          alert("Lo sentimos, tu dispositivo no admite la geolocaización.");
        }
    }
    function showPosition(position){

        const latitude  = position.coords.latitude;;
        const longitude = position.coords.longitude;
        let map = L.map('map').setView([latitude,longitude], 16);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        L.marker([latitude,longitude]).addTo(map)
                .openPopup();
    }
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
    const latitude  = position.coords.latitude;;
    const longitude = position.coords.longitude;
    let map = L.map('map').setView([latitude,longitude], 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([latitude,longitude]).addTo(map)
            .openPopup();
    L.popup()
        .setLatLng([latitude,longitude])
        .setContent("Ubicacion Actual")
        .openOn(map);
    localStorage.setItem('latitude',latitude);
    localStorage.setItem('longitude',longitude);
}


//---------------------------------------------------------------------Funciones de inico/fin de la pagina
window.addEventListener("DOMContentLoaded", function (e) {
    localStorage.setItem('file-name','none');
    if(user != 'none'){
        const texto = document.getElementById('texto-user');
        const name = "Bienvenido "+user;
        texto.placeholder = name; 
    }else{
        const str = window.location.href.replace('ingreso.html','login.html');
        location.href = str;
    }
});
window.addEventListener("beforeunload", function (e) {
    localStorage.setItem("user",'none'); 
    localStorage.setItem("correo",'none'); 
    localStorage.setItem('latitude',null);
    localStorage.setItem('longitude',null);
    localStorage.setItem('file-name','none');
});