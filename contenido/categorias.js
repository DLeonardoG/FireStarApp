const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch("../../../datos.json"); 
        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            console.log(datos)
            return datos;   
        } else {
            console.log("Error al cargar los peliculas");
        }
    } catch (error) {
        console.error(error);
    }
};
const mostrarPeliculaCategoria = async () => {
    const categoriasLista = document.getElementById("categoriasLista");
    const peliculas = await cargarPeliculas();
    let totalidad = ["accion", "comedia","animacion"]
    categoriasLista.innerHTML = "";
    for (let i = 0; i < totalidad.length; i++){
        cac = "mostrarCategoria" + totalidad[i]
        console.log(cac)
        categoriasLista.innerHTML += `
        <li>
        <div class="ver_todas">
            <h2>${totalidad[i]}</h2>
            <a id="${totalidad[i]}" class="ver_todas__button" href="peliculas/ver_todos/peliculas_ver_todas.html">ver todas</a>
        </div>
        <ul id= "${cac}"  class="lista miniaturas">
        </ul>
        </li>`;
        let cate = document.getElementById(totalidad[i]);
        console.log(cate)  
        cate.addEventListener('click', guardarCate(totalidad[i]));
        console.log(cate)
    };
    for (let y = 0; y < totalidad.length; y++){
        cac = totalidad[y]
        console.log(document.getElementById("mostrarCategoriaaccion"))
        const mostrarCategoria = document.getElementById("mostrarCategoria"+cac);
        for (let j = 0; j < peliculas.length; j++){
            if (peliculas[j].categoria.id === totalidad[y]){
                const figura = document.createElement("li");
                figura.innerHTML = ""
                figura.innerHTML = `
                <figure>
                <a id="${peliculas[j].id}" class="miniaturas__peliculas" href="peliculas/descripcion/descripcion.html">
                <img class="miniaturas__peliculas__imagen" src="../../${peliculas[j].imagen}" alt="${peliculas[j].titulo}">
                </a>
                <figcaption><span class="miniaturas__peliculas__nombre">${peliculas[j].titulo}</span></figcaption>
                </figure>
                `;
                mostrarCategoria.appendChild(figura);
                const peli = document.getElementById(peliculas[j].id);
                console.log(peli)  
                peli.addEventListener('click', guardarDescripcion);
                console.log(mostrarCategoria)
            }
        }
    }
}
mostrarPeliculaCategoria()
function guardarDescripcion() {
    console.log("Mostrar Pelicula Descripcion")
    let id = this.getAttribute('id')
    localStorage.setItem("descripcion",id)
};
function guardarCate(save) {
    console.log("Mostrar Pelicula Descripcion")
    let id2 = this.getAttribute('id')
    console.log(id2)
    localStorage.setItem("cate",save)
    localStorage.getItem("cate")
}
