auth.onAuthStateChanged((user) => {
    //metodo que funciona si el usuario ingresa, se muestran o no los datos.
    if (user) {
      chequearInicio(user);
      auth.currentUser;
      if (user.emailVerified == true) {
        formularioRecomendaciones();
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
      window.location.href = "index.html";
      window.reload();
    }
  });

  /* Formulario que aparecera si el usuario verifico su mail */

function formularioRecomendaciones() {
  let formulario = document.getElementById("formularioRecomendaciones");
    formulario.innerHTML = `
    <div class="card text-center">
    <div class="card-header">
      <h3>Dudas y/o recomendaciones</h3>
    </div>
    <div class="card-body">
      <form
        id="my-form"
        action="https://formspree.io/f/xeqvjwjn"
        method="POST"
      >
        <div class="form-group">
          <i class="fas fa-paw fa-2x"></i>
          <input
            id="nombre"
            type="text"
            name="name"
            class="form-control"
            placeholder="Nombre*"
            autofocus
            required
          />
        </div>
        <div class="form-group">
          <i class="far fa-edit fa-2x"></i>
          <input
            id="apellido"
            type="text"
            name="apellido"
            class="form-control"
            placeholder="Apellido*"
            required
          />
        </div>
        <div class="form-group">
          <i class="fas fa-user fa-2x"></i>
          <input type="email" name="mail" id="mail" class="form-control" placeholder="Email*" required />
        </div>
        <div class="form-group">
          <i class="fas fa-user fa-2x"></i>
          <textarea name="mensaje" class="form-control" id="mensaje" placeholder="Hacenos llegar tu consulta*" required></textarea>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">Enviar</button>
        </div>
      </form>
    </div>
  </div>
`;
}
  
$(window).on("load", function () {
  setTimeout(function () {
    $(".loader-page").css({ visibility: "hidden", opacity: "0" });
  }, 2000);
});