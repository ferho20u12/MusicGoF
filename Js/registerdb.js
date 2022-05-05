import {guardarUsuario
} from './conexionConfig.js'
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userPass = document.getElementById('userPass');
const userPass2 = document.getElementById('userPass2');
const btn = document.getElementById('btn-Registrar')
btn.addEventListener("click",Clicked)

function Clicked() {
    if(userPass.value == userPass2.value){
        if(userPass.value != "" && userName.value != "" && userEmail.value != "")
        {
            const name = ""+userName.value;
            const email = ""+userEmail.value;
            const pass = ""+userPass.value;
            guardarUsuario(name,email,pass)
            
            alert ("Datos Guardados con exito")
        }
        else{
            alert ("LLena todo el formulario, no sea imbecil")
        }
    }else{
        alert("Las contraseñas no coinciden ")
    }
}

