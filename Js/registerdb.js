import {guardarUsuario,
        getUsuario,
        Autorizar
} from './conexionConfig.js'

const btn = document.getElementById('btn-form');

btn.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const userName = btn['userName'];
    const userEmail = btn['userEmail'];
    const userPass = btn['userPass'];
    const userPass2 = btn['userPass2'];
    if(userPass.value == userPass2.value){
        if(userPass.value != "" && userName.value != "" && userEmail.value != "")
        {
            
            const docSnap = await getUsuario(userEmail.value)
            if (docSnap.exists()) {
                alert("Ya existe una cuenta registrada con este correo");
            } else {
                var canciones = [];
                await guardarUsuario(userName.value,userEmail.value,userPass.value,canciones)
                const str = window.location.href.replace('register.html','login.html');
                location.href = str;
                alert("Registro Exitoso");
            }   
        }
        else{
            alert ("LLena todo el formulario");
        }
    }else{
        alert("Las contraseñas no coinciden ");
    }
});



