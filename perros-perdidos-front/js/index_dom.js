import searchFilters from "./filtro_busquedas.js";

const d = document;

d.addEventListener("DOMContentLoaded",(e) => {
    searchFilters(".card-filter", ".search");
})