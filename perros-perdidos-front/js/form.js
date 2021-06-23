auth.onAuthStateChanged((user) => {
  //metodo que funciona si el usuario ingresa, se muestran o no los datos.
  if (user) {
    /* console.log("signin"); */
    chequearInicio(user);
    auth.currentUser;
    if (user.emailVerified == true) {
    } else {
      swal(
        "¡Se envió un mail de verificación de cuenta, por favor confirmar la misma!"
      );
    }

    // CERRAR SESION
    const cerrarSesion = document.getElementById("cerrar-sesion");

    cerrarSesion.addEventListener("click", (e) => {
      e.preventDefault();
      auth.signOut().then(() => {
        chequearInicio();
        window.reload();
        window.location.href = "index.html";
      });
    });
  } else {
    console.log("no logueado");
    swal("Necesita iniciar sesión para publicar una búsqueda!").then(() => {
      swal("Redireccion a home"((window.location.href = "index.html")));
    });
  }
});
/* Cargando logo */
$(window).on("load", function () {
  setTimeout(function () {
    $(".loader-page").css({ visibility: "hidden", opacity: "0" });
  }, 2000);
});
