import { guardarUsuario, getUsuarios, Autorizar } from "./conexionConfig.js";

const btn = document.getElementById("btn-form");

btn.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userName = btn["userName"];
  const userEmail = btn["userEmail"];
  const userPass = btn["userPass"];
  const userPass2 = btn["userPass2"];
  if (userPass.value == userPass2.value) {
    if (userPass.value != "" && userName.value != "" && userEmail.value != "") {
      const querySnapshot = await getUsuarios();
      var band = false;
      querySnapshot.forEach((doc) => {
        if (doc.data().correo == userEmail.value) {
          band = true;
        }
      });
      if (!band) {
        await guardarUsuario(userName.value, userEmail.value, userPass.value);
        await Autorizar(userEmail.value, userPass.value);
        const str = window.location.href.replace("register.html", "login.html");
        location.href = str;
        alert("Registro Exitoso");
      } else {
        alert("Ya existe una cuenta registrada con este correo");
      }
    } else {
      alert("LLena todo el formulario");
    }
  } else {
    alert("Las contraseñas no coinciden ");
  }
});
