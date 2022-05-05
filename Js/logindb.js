import {getUsuarios} from './conexionConfig.js'
let usuarios = []


const btn  = document.getElementById('task-form');

btn.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const user = btn['user'];
    const pass = btn['pass'];
    if(user.value != "" && pass.value != ""){
        const querySnapshot = await getUsuarios()
        var band = false;
        querySnapshot.forEach(doc => {
            if(doc.data().correo == user.value){
                band = true;
                if(doc.data().contrasena == pass.value){
                    const str = window.location.href.replace('login.html','ingreso.html');
                    alert("bienvenido");
                    localStorage.setItem("user", user.value);
                    location.href = str;
                }
                else{
                    alert("contraseña incorrecta")
                }
            }
        })
        if(!band){
            alert("No se encontro usuario registrado con este correo")
        }
    }else{
        alert ("Llene todos los datos, no se imbecil xd")
    }
})