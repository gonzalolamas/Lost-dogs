auth.onAuthStateChanged((user) => {
  //metodo que funciona si el usuario ingresa, se muestran o no los datos.
  if (user) {
    chequearInicio(user);

    if (user.emailVerified == true) {
      let uid = auth.currentUser.uid;

      dogLost(`${"http://localhost:8000/api/user/posts"}/${uid}`);
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
    swal("¡Necesita iniciar sesión para ver sus publicaciones!").then(() => {
      swal("Redireccion a home"((window.location.href = "index.html")));
    });
  }
});

/* Preloader */
$(window).on("load", function () {
  setTimeout(function () {
    $(".loader-page").css({ visibility: "hidden", opacity: "0" });
  }, 5500);
});

/* Perros perdidos */
function dogLost(url) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let perros = JSON.parse(this.responseText).pets;
      let resultado = document.getElementById("todos-los-perros");
      resultado.innerHTML = " ";

      for (const perro of perros) {
        resultado.innerHTML += `
  
          <div class="col-md-4 mt-3 bd-light search">
            <div class="card h-100 text-center" data-id=${perro._id}>
              <img class="img-fluid h-50" src="${perro.animalPic}" alt="perro-perdido">
              <div class="card-body h-50" data-id=${perro._id}>
                <h5 class="card-title">${perro.name}</h5>
                <p class="card-text">Descripción:${perro.description}</p>
                <p class="card-text">Dueño/a: ${perro.owner}</p>
                <p class="card-text">Teléfono<i class="fab fa fa-whatsapp" style="color:green">${perro.cel}</i></p>
                <a href="#" class="card-link btn btn-dark btn-lg active" role="button"" id="delete-post">Eliminar</a>
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

const postPerros = document.getElementById("todos-los-perros");

/* Eliminar */
postPerros.addEventListener("click", (e) => {
  e.preventDefault();
  let delButtonIsPressed = e.target.id == "delete-post";

  let id = e.target.parentElement.dataset.id;

  // method: DELETE publicacion
  if (delButtonIsPressed) {
    fetch(`${"http://localhost:8000/delete-perro"}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => location.reload());
  }
});
