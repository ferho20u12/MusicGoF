import { getUsuarios } from "./conexionConfig.js";
let usuarios = [];

const btn = document.getElementById("task-form");

btn.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = btn["user"];
  const pass = btn["pass"];
  if (user.value != "" && pass.value != "") {
    const querySnapshot = await getUsuarios();
    var band = false;
    querySnapshot.forEach((doc) => {
      if (doc.data().correo == user.value) {
        band = true;
        if (doc.data().contrasena == pass.value) {
          const str = window.location.href.replace(
            "login.html",
            "ingreso.html"
          );
          const nom = "" + doc.data().nombre;
          localStorage.setItem("correo", user.value);
          localStorage.setItem("user", nom);
          location.href = str;
        } else {
          showAlert("Contraseña incorrecta.", "error");
          //alert("Contraseña incorrecta");
        }
      }
    });
    if (!band) {
      showAlert("No se encontro usuario registrado con este correo.", "error");
      //alert("No se encontro usuario registrado con este correo");
    }
  } else {
    showAlert("Llene todos los datos.", "error");
    //alert("Llene todos los datos");
  }
});

// Validar formulario
const data = {
  user: "",
  pass: "",
};

const form = document.querySelector(".form");
const userInput = document.querySelector("#user");
const passInput = document.querySelector("#pass");

userInput.addEventListener("input", readText);
passInput.addEventListener("input", readText);

/*
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validate form
  const { user, pass } = data;
  if (user === "" || pass === "") {
    showAlert("Rellene todos los campos, por favor.", "error");
    return;
  }

  showAlert("Campos correctos, gracias.");
});
*/

function readText(e) {
  data[e.target.id] = e.target.value;
}

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
