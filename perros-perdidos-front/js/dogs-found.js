auth.onAuthStateChanged((user) => {
  //metodo que funciona si el usuario ingresa, se muestran o no los datos.
  if (user) {
    chequearInicio(user);
    auth.currentUser;
    if (user.emailVerified == true) {
      dogFound("http://localhost:8000/perros-encontrados");
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
        let resultado = document.getElementById("todos-los-perros");
        resultado.innerHTML = " ";
        window.reload();
        window.location.href = "/";
      });
    });
  } else {
    console.log("no logueado");
    swal("¡Necesita iniciar sesión para ver los perros buscados!").then(() => {
      swal("Redireccion a home"((window.location.href = "index.html")));
    });
  }
});

/* Preloader */
$(window).on("load", function () {
  setTimeout(function () {
    $(".loader-page").css({ visibility: "hidden", opacity: "0" });
  }, 2500);
});

/* Perros reencontrados */
function dogFound(url) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let reencuentros = JSON.parse(this.responseText);
      let resultado = document.getElementById("reencuentros");
      resultado.innerHTML = " ";

      for (const reencuentro of reencuentros) {
        resultado.innerHTML += `

        <div class="col-md-4 mt-3 bd-light search">
          <div class="card h-100 text-center">
            <img class="img-fluid h-50" src="${reencuentro.img}" alt="perro-encontrado">
            <div class="card-body h-50">
              <h5 class="card-title">${reencuentro.title}</h5>
              <p class="card-text">Descripción:${reencuentro.description}</p>
            </div>
          </div>
        </div>
   
        
        `;
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
