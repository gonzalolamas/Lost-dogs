/* Mostrar en html bienvenida */
function bienvenida(user) {
  let bienvenida = document.getElementById("bienvenida");
  if(user.emailVerified){
    bienvenida.innerHTML = `
  <div class="alert alert-success" role="alert">
    ¡Sesión iniciada!
  </div>

  <div class="jumbotron mt-4 bg-primary text-white">
    <h1 class="display-4">Perros perdidos</h1>
    <p class="lead">Si encuentras a un perro que anda solo por la calle y no hay nadie a su alrededor, podría tratarse de un perro abandonado, pero también podría ser un perro que se ha perdido o se ha escapado y es posible que su dueño lo esté buscando.
    </p>
    <hr class="my-4">
    <p>Puede que tenga hambre y sed, que pase frío o calor, que acabe atropellado o que provoque un accidente de tráfico. ¿Qué puedes hacer para ayudarle?</p>
    <button type="button" class="btn btn-success enlace" role="link" onclick="window.location='dogs-lost.html'">Ver perros buscados</button>
  </div>
`;
}
  
}

/* Deslogueo desde la pantalla inicial */
auth.onAuthStateChanged((user) => {
  //metodo que funciona si el usuario ingresa, se muestran o no los datos.
  if (user) {
    /* console.log("signin"); */
    chequearInicio(user);
    auth.currentUser;

    // CERRAR SESION
    const cerrarSesion = document.getElementById("cerrar-sesion");

    cerrarSesion.addEventListener("click", (e) => {
      e.preventDefault();
      auth.signOut().then(() => {
        chequearInicio();
        window.location.href = "/";
        window.reload();
      });
    });
  } 
});

/* Preloader */
$(window).on("load", function () {
  setTimeout(function () {
    $(".loader-page").css({ visibility: "hidden", opacity: "0" });
  }, 1500);
});