const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch("datos.json"); 
        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            return datos;   
        } else {
            console.log("Error al cargar los peliculas");
        }
    } catch (error) {
        console.error(error);
    }
};

const mostrarPeliculaDescripcion = async () => {
    const descripcion = document.getElementById("miniatures__home");
    const peliculas = await cargarPeliculas();
    let descripcionContenido = ``;
    for (let i = 0; i < 3; i++) {
        descripcionContenido += `
        <figure>
            <a id="${peliculas[i].id}" class="miniaturas__peliculas abrir" href="contenido/peliculas/descripcion/descripcion.html">
            <img class="miniaturas__peliculas__imagen"  src="${peliculas[i].imagen}" alt="${peliculas[i].titulo}">
            </a>
            <figcaption><span class="miniaturas__peliculas__nombre">${peliculas[i].titulo}</span></figcaption>
        </figure>`;
    };
    descripcion.innerHTML = descripcionContenido;
    const peliculaEscogida = document.querySelectorAll(".abrir");
    console.log(peliculaEscogida.length)
    for (let i = 0; i < peliculaEscogida.length; i++) {
        peliculaEscogida[i].addEventListener('click', guardarDescripcion);
    }
    console.log(peliculaEscogida)
    };
mostrarPeliculaDescripcion()
function guardarDescripcion() {
    console.log("Mostrar Pelicula Descripcion")
    let id = this.getAttribute('id')
    localStorage.setItem("descripcion",id)
}
