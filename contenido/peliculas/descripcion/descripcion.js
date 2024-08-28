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
    descripcion.innerHTML = descripcionContenido;
    var idPeli = peliculas[i].id 
}
}
    const pago = document.getElementById("pago")
    pago.innerHTML = ``
    pago.innerHTML = `
        <div class="pago__botones">
            <a href="#" id="${idPeli}" class="pago__button comprar">Comprar</a>
        </div>
        <div class="pago__botones">
            <a href="../ver_todos/peliculas_ver_todas.html" class="pago__button pago__button--transparente">No comprar</a>
        </div>
        `;
    peliId = document.getElementById(idPeli)
    console.log(peliId)
    let carrito;

    peliId.addEventListener('click', () => {
        carrito = JSON.parse(localStorage.getItem("carrito"))
        console.log(carrito)
        carrito.forEach( (item) => {
            if(item.id === idPeli) {
                item.cantidad += 1
            } else {
                carrito.push({
                    id: idPeli,
                    cantidad: 1
                })
            }
        })
        carrito = []
        localStorage.setItem("carrito", JSON.stringify(carrito))
        console.log(idPeli)
        console.log(carrito)
        localStorage.getItem("carrito")
    });
    }
mostrarPeliculaDescripcion()