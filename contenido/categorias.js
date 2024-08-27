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

const categoriasLista = document.getElementById("categoriasLista");

const mostrarPeliculaCategoria = async () => {
    const peliculas = await cargarPeliculas();
    let totalidad = ["accion", "comedia","animacion"]
    categoriasLista.innerHTML = "";
    const li = document.createElement("li");
    li.classList.add("categoriasListaLi");
    for (let i = 0; i < totalidad.length; i++){
        li.innerHTML = ``
        li.innerHTML = `
        <div class="ver_todas">
            <h2>${totalidad[i]}</h2>
            <a class="ver_todas__button" href="peliculas/ver_todos/peliculas_ver_todas_${totalidad[i]}.html">ver todas</a>
        </div>
        <ul id="mostrarCategoria${totalidad[i]}" class="lista miniaturas">
        </ul>`;
        categoriasLista.appendChild(li);
    };
    for (let i = 0; i < totalidad.length; i++){
        cac = totalidad[i]
        console.log(getElementById("mostrarCategoriaaccion"))
        const mostrarCategoria = getElementById("mostrarCategoria"+cac);
        for (let j = 0; j < peliculas.length; j++){
            if (peliculas[j].categoria.id === totalidad[i]){
                const figura = document.createElement("li");
                figura = ``
                figura.innerHTML = `
                <figure>
                <a id="${peliculas[j].id}" class="miniaturas__peliculas" href="peliculas/descripcion/descripcion.html">
                <img class="miniaturas__peliculas__imagen" src="${peliculas[j].imagen}" alt="${peliculas[j].titulo}">
                </a>
                <figcaption><span class="miniaturas__peliculas__nombre">${peliculas[j].titulo}</span></figcaption>
                </figure>
                `;
                peliculas[j].id.addEventListener('click', guardarDescripcion)
                mostrarCategoria.appendChild(figura);
            }
        }
    }
}
function guardarDescripcion() {
    console.log("Mostrar Pelicula Descripcion")
    let id = this.getAttribute('id')
    localStorage.setItem("descripcion",id)
}

mostrarPeliculaCategoria()
