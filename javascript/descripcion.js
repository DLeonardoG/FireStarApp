let carrito;
const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch("../datos.json"); 
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
var local = localStorage.getItem("descripcion");
const mostrarPeliculaDescripcion = async () => {
    const descripcion = document.getElementById("contenedor__descripcion");
    const peliculas = await cargarPeliculas();
    let descripcionContenido = ``;
    for (let i = 0; i < peliculas.length; i++){
        if(peliculas[i].id === local) {
            descripcionContenido = `
        <header>
        <div class="video-wrapper">
    <div class="video-container">
        <iframe 
            src="${peliculas[i].video}" 
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen>
        </iframe>
        </div>
    </div>
        </header>
        <div class="descripcion">
            <h2 class="descripcion__title">${peliculas[i].titulo}</h2>
            <h2 class="descripcion__title descripcion__title--sinopsis">Sinopsis</h2>
            <p class="descripcion__texto">${peliculas[i].sinopsis}</p>
            <h2 class="descripcion__title descripcion__title--reparto">Reparto</h2>
            <span class="descripcion__caracteristicas"> ${peliculas[i].reparto}</span>
            <br>
            <ul class="lista descripcion__caracteristicas">
                <li><span><b>Pais:</b> ${peliculas[i].pais}</span></li>
                <li><span><b>Año:</b>${peliculas[i].año}</span></li>
                <li><span><b>Género:</b> ${peliculas[i].genero}</span></li>
                <li><span><b>Director:</b>${peliculas[i].director}</span></li>
            </ul>
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
            <a href="carrito.html" id="pagarBoton" class="pago__button comprar">Comprar</a>
        </div>
        <div class="pago__botones">
            <a href="ver_todos/peliculas_ver_todas.html" class="pago__button pago__button--transparente">No comprar</a>
        </div>
        `;
    peliId = document.getElementById("pagarBoton");
    console.log(peliId);
    if(localStorage.getItem("carrito") === null || localStorage.getItem("carrito") == []) {
        carrito = []
    } else {
        carrito = JSON.parse(localStorage.getItem("carrito"))
        console.log(carrito)
    }
    
    
    peliId.addEventListener('click', () => {
        console.log(carrito)
        console.log(carrito.length)
        const propiedadBuscada = { "id": local };
        const contieneObjeto = carrito.some(elemento =>
            elemento.id === propiedadBuscada.id
            );
        if (carrito.length === 0) {
            carrito.push({
                "id": local,
                "cantidad": 1
            })
            console.log(carrito)
        } else if (contieneObjeto === true) {
            carrito.forEach( (ele) => {
                if (ele.id === local) {
                    ele.cantidad += 1;
                }
            })
        } else {
            carrito.push({
                "id": local,
                "cantidad": 1
            })
            console.log(carrito)
        }
        localStorage.setItem("carrito", JSON.stringify(carrito))
        console.log(idPeli)
        console.log(carrito)
        console.log(localStorage.getItem("carrito"))
    });
    const footer = document.querySelector("footer")
    console.log(footer);
    footer.innerHTML = `
        <nav>
        <ul class="footer__nav lista footer__descripcion">
            <li>
                <a class="footer__nav__button" href="peliculas_categorias.html"><img class="footer__nav__img footer__nav__img--imagen" src="../../../imagenes/iconos/icono-volver.svg" alt="icono Peliculas"></a>
            </li>
            <li>
                <div class="footer__nav__title">
                    <h2 class="footer__nav__title nav__span--compras">pelicula</h2>
                </div>
            </li>
            <li>
                <a class="footer__nav__button" href="#"><img class="footer__nav__img footer__nav__img--imagen" src="../../../imagenes/iconos/icono-perfil-header.png" alt="icono perfil"></a>
            </li>
        </ul>
    </nav>
    `;
    }
mostrarPeliculaDescripcion()