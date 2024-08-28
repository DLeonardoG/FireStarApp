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
const hacerHeader = () => {
    const header = document.querySelector("header");
    header.innerHTML = ``;
    header.innerHTML = `
    <nav>
        <ul class="lista header__nav">
            <li>
                <form class="nav__form" action="#">
                    <button class="nav__button" type="submit">
                        <img class="nav__img img--inicio" src="imagenes/iconos/icono-inicio-azul.svg" alt="inicio">
                        <span class="nav__span nav__span--azul">Inicio</span>
                    </button>
                </form>
            </li>
            <li>
                <form class="nav__form" action="html/peliculas_categorias.html">
                    <button class="nav__button" type="submit">
                        <img class="nav__img img--inicio" src="imagenes/iconos/icono-peliculas.svg" alt="Peliculas">
                        <span class="nav__span nav__span--inicio">Peliculas</span>
                    </button>
                </form>
            </li>
            <li>
                <form class="nav__form" action="html/carrito.html">
                    <button class="nav__button" type="submit">
                        <img class="nav__img img--compras" src="imagenes/iconos/icono-compras.png" alt="Compras">
                        <span class="nav__span nav__span--compras">Compras</span>
                    </button>
                </form>
            </li>
            <li>
                <form class="nav__form" action="html/perfil.html">
                    <button class="nav__button" type="submit">
                        <img class="nav__img img--compras icono__perfil" src="imagenes/miniaturas/juankis.jpeg" alt="Perfil">
                        <span class="nav__span nav__span--compras">Perfil</span>
                    </button>
                </form>
            </li>
        </ul>
    </nav>`
}
const hacerfooter = () => {
    const footer = document.querySelector("footer");
    footer.innerHTML = ``;
    footer.innerHTML = `
    <nav>
        <ul class="footer__nav lista">
            <li>
                <a class="footer__nav__button" href="#"><img class="footer__nav__img footer__nav__img--imagen" src="../imagenes/iconos/icono-inicio.png" alt="icono Peliculas"></a>
            </li>
            <li>
                <div class="footer__nav__title">
                    <h2 class="footer__nav__title nav__span--compras">inicio</h2>
                </div>
            </li>
            <li>
                <a class="footer__nav__button" href="#"><img class="footer__nav__img footer__nav__img--imagen" src="../imagenes/iconos/icono-perfil-header.png" alt="icono Peliculas"></a>
            </li>
        </ul>
    </nav>`;}
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
function guardarDescripcion() {
    console.log("Mostrar Pelicula Descripcion")
    let id = this.getAttribute('id')
    localStorage.setItem("descripcion",id)
}
hacerHeader()
mostrarPeliculaDescripcion()
hacerfooter()