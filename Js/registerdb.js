import { guardarUsuario, getUsuario, Autorizar } from "./conexionConfig.js";

const btn = document.getElementById("btn-form");

btn.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userName = btn["userName"];
  const userEmail = btn["userEmail"];
  const userPass = btn["userPass"];
  const userPass2 = btn["userPass2"];
  if (userPass.value == userPass2.value) {
    if (userPass.value != "" && userName.value != "" && userEmail.value != "") {
      const docSnap = await getUsuario(userEmail.value);
      if (docSnap.exists()) {
        //showAlert("Ya existe una cuenta registrada con este correo.", "error");
        alert("Ya existe una cuenta registrada con este correo.");
      } else {
        var canciones = [];
        await guardarUsuario(
          userName.value,
          userEmail.value,
          userPass.value,
          canciones
        );
        const str = window.location.href.replace("register.html", "login.html");
        location.href = str;
        //showAlert("Registro exitoso.");
        alert("Registro exitoso.");
      }
    } else {
      //showAlert("Rellene todos los datos, por favor.", "error");
      alert("Rellene todos los datos, por favor.");
    }
  } else {
    //showAlert("Las contraseñas no coinciden.", "error");
    alert("Las contraseñas no coinciden.");
  }
});

// Alertas de Formulario
const form = document.querySelector(".form");

function showAlert(message, type = null) {
  const alert = document.createElement("P");
  alert.textContent = message;

  if (type) {
    alert.classList.add("error");
  } else {
    alert.classList.add("correcto");
  }

  form.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 3000);
}
