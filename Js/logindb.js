import { getUsuario } from "./conexionConfig.js";
let usuarios = [];

const btn = document.getElementById("task-form");

btn.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = btn["user"];
  const pass = btn["pass"];
  if (user.value != "" && pass.value != "") {
    const docSnap = await getUsuario(user.value);
    if (docSnap.exists()) {
      if (docSnap.data().contrasena == pass.value) {
        localStorage.setItem("correo", docSnap.data().correo);
        localStorage.setItem("user", docSnap.data().nombre);
        location.href = window.location.href.replace(
          "login.html",
          "ingreso.html"
        );
      } else {
        showAlert("Contraseña incorrecta.", "error");
      }
    } else {
      showAlert("No se encontro usuario registrado con este correo.", "error");
    }
  } else {
    showAlert("Rellene todos los datos, por favor.", "error");
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
