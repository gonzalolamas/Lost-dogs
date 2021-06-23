const form = document.getElementById("my-form");
const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const dueño = document.getElementById("dueño");
const telefono = document.getElementById("telefono");
const imagen = document.getElementById("imagen");
let photoBase;
const firebase_id = document.getElementById("firebase_id");

/* Post para subir busqueda */

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let data, options;
  toBase64()
    .then((res) => {
      data = {
        name: nombre.value,
        description: descripcion.value,
        owner: dueño.value,
        cel: telefono.value,
        animalPic: photoBase,
        firebase_id: auth.currentUser.uid,
      };
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
    })
    .then(() => {
      fetch("http://localhost:8000/create-perro", options).then((res) => {
        console.log(res);
      });
    });
});

const base64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
async function toBase64() {
  let filePhoto = document.querySelector("#imagen").files[0];
  photoBase = await base64(filePhoto);
}
