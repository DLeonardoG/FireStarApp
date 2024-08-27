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

const mostrarPeliculaDescripcion = async () => {
    const descripcion = document.getElementById("contenedor__descripcion");
    const peliculas = await cargarPeliculas();
    let descripcionContenido = ``;
    let local = localStorage.getItem("descripcion");
    for (let i = 0; i < peliculas.length; i++){
        if(peliculas[i].id === local) {
            descripcionContenido = `
        <header>
            <div class="video-wrapper">
                <div class="video-container">
                    <video autoplay muted loop playsinline controls>
                        <source src="../../../${peliculas[i].video}" type="video/mp4">
                        Tu navegador no soporta la etiqueta de video.
                    </video>
                </div>
            </div>
        </header>
        <div class="descripcion">
            <h2 class="descripcion__title">${peliculas[i].titulo}</h2>
            <ul class="lista descripcion__caracteristicas">
                <li><span><b>Pais:</b> ${peliculas[i].pais}</span></li>
                <li><span><b>Año:</b>${peliculas[i].año}</span></li>
                <li><span><b>Género:</b> ${peliculas[i].genero}</span></li>
                <li><span><b>Director:</b>${peliculas[i].director}</span></li>
            </ul>
            <h2 class="descripcion__title descripcion__title--sinopsis">Sinopsis</h2>
            <p class="descripcion__texto">${peliculas[i].sinopsis}</p>
            <h2 class="descripcion__title descripcion__title--reparto">Reparto</h2>
            <span class="descripcion__caracteristicas"> ${peliculas[i].reparto}</span>
        </div>
            <div class="pago__total">
        <span>Total</span>
        <span><b>$</b>${peliculas[i].precio}</span>
    </div>`;
    descripcion.innerHTML = descripcionContenido;}
    }
}
mostrarPeliculaDescripcion()
