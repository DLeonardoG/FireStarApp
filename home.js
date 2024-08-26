const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch("datos.json"); 
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

const mostrarPeliculaDescripcion = async () => {
    const descripcion = document.getElementById("miniatures__home");
    const peliculas = await cargarPeliculas();
    let descripcionContenido = ``;
    for (let i = 0; i < 3; i++) {
        descripcionContenido += `
         <figure>
            <a class="miniaturas__peliculas" href="contenido/peliculas/descripcion/descripcion.html">
            <img class="miniaturas__peliculas__imagen"  src="${peliculas[i].imagen}" alt="${peliculas[i].titulo}">
            </a>
            <figcaption><span class="miniaturas__peliculas__nombre">${peliculas[i].titulo}</span></figcaption>
        </figure>`;
    }
    descripcion.innerHTML = descripcionContenido;
    };
mostrarPeliculaDescripcion()