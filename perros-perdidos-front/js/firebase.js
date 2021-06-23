const usuarioSinIniciar = document.querySelectorAll(".usuario-sin-iniciar");
const usuarioIniciado = document.querySelectorAll(".usuario-dentro");

const chequearInicio = (user) => {
  if (user) {
    usuarioIniciado.forEach((link) => {
      link.classList.remove("hide");
    });
    usuarioSinIniciar.forEach((link) => (link.style.display = "none"));
  } else {
    usuarioIniciado.forEach((link) => (link.style.display = "none"));
    usuarioSinIniciar.forEach((link) => (link.style.display = "block"));
  }
};

// REGISTRO
const registroForm = document.getElementById("registro-form");

registroForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("registro-email").value;
  const clave = document.getElementById("registro-clave").value;

  auth.createUserWithEmailAndPassword(email, clave).then((userCredential) => {
    // verificacion email a mi correo
    verificarEmail();
    
    //limpiar el form
    registroForm.reset();


    //cerrar el modal
    $("#registroModal").modal("hide");

  }).catch((error) => {
    swal(
      "Se envio un mail de verificacion, para que pueda ingresar con su cuenta"
    )
  })
});

// INICIO SESION
const sesionForm = document.getElementById("sesion-form");

sesionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("sesion-email").value;
  const clave = document.getElementById("sesion-clave").value;

  auth
    .signInWithEmailAndPassword(email, clave)
    .then(() => {
      //limpiar el form
      sesionForm.reset();
      //cerrar el modal
      $("#sesionModal").modal("hide");
    })
    .catch((userCredential) => {
      swal("Usuario o contraseña invalidos", "Reintente nuevamente", "error");
    });
});
// CERRAR SESION
const cerrarSesion = document.getElementById("cerrar-sesion");

cerrarSesion.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    chequearInicio();
    let resultado = document.getElementById("todos-los-perros");
    resultado.innerHTML = " ";

    then(() => location.reload());
  });
});

// Google Inicio de sesion
const googleBoton = document.getElementById("googleSesion");
googleBoton.addEventListener("click", (e) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      console.log("google iniciado");
      //limpiar el form
      sesionForm.reset();
      console.log(result, "resultado google");
      //cerrar el modal
      $("#sesionModal").modal("hide");
    })
    .catch((err) => {
      console.log(err);
    });
});
// Eventos
// listar datos cuando esten autenticados
auth.onAuthStateChanged((user) => {
  //metodo que funciona si el usuario ingresa, se muestran o no los datos.
  if (user) {
    console.log("usuario activo");
    chequearInicio(user);
    auth.currentUser;
    if(user.emailVerified == true){
      bienvenida(user);
      } else {
        swal(
          "¡Se envió un mail de verificación de cuenta, por favor confirmar la misma!"
        );
      }
  }
  else{
    console.log('no existe usuario activo')
  }
})


function verificarEmail() {

  let user = auth.currentUser;

  user
    .sendEmailVerification()
    .then(function () {
      console.log("enviando correo")
      swal("IMPORTANTE", "¡Ahora es necesario verificar la cuenta creada desde tu mail!", "info");
    })
    .catch(function (error) {
      console.log(error)
    });
}