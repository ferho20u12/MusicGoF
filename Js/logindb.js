import {getUsuario} from './conexionConfig.js'
let usuarios = []


const btn  = document.getElementById('task-form');

btn.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const user = btn['user'];
    const pass = btn['pass'];
    if(user.value != "" && pass.value != ""){
        const docSnap = await getUsuario(user.value)
        if (docSnap.exists()) {
            if(docSnap.data().contrasena == pass.value){
                localStorage.setItem("correo", docSnap.data().correo);
                localStorage.setItem("user", docSnap.data().nombre);
                location.href = window.location.href.replace('login.html','ingreso.html');
            }
            else{
                alert("contraseña incorrecta")
            }
        }
        else{
            alert("No se encontro usuario registrado con este correo")
        }
    }else{
        alert ("Llene todos los datos")
    }
})