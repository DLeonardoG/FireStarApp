console.log(localStorage.getItem("cate"))
console.log(localStorage.getItem("descripcion"))
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
        console.error("dede");
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
            <form class="nav__form" action="../index.html">
                <button class="nav__button" type="submit">
                    <img class="nav__img img--inicio" src="../imagenes/iconos/icono-inicio.png" alt="inicio">
                    <span class="nav__span nav__span--inicio">Inicio</span>
                </button>
            </form>
        </li>
        <li>
            <form class="nav__form" action="peliculas_categorias.html">
                <button class="nav__button" type="submit">
                    <img class="nav__img img--inicio" src="../imagenes/iconos/icono-peliculas.svg" alt="Peliculas">
                    <span class="nav__span nav__span--inicio">Peliculas</span>
                </button>
            </form>
        </li>
        <li>
            <form class="nav__form" action="carrito.html">
                <button class="nav__button" type="submit">
                    <img class="nav__img img--compras" src="../imagenes/iconos/icono-compras.png" alt="Compras">
                    <span class="nav__span nav__span--compras">Compras</span>
                </button>
            </form>
        </li>
        <li>
            <form class="nav__form" action="perfil.html">
                <button class="nav__button" type="submit">
                    <img class="nav__img img--compras icono__perfil" src="../imagenes/miniaturas/juankis.jpeg" alt="Perfil">
                    <span class="nav__span nav__span--compras">Perfil</span>
                </button>
            </form>
        </li>
    </ul>
</nav>`;}
const hacerfooter = () => {
    const footer = document.querySelector("footer");
    footer.innerHTML = ``;
    footer.innerHTML = `
     <nav>
        <ul class="footer__nav lista">
            <li>
                <a class="footer__nav__button" href="peliculas_categorias.html"><img class="footer__nav__img footer__nav__img--imagen" src="../imagenes/iconos/icono-peliculas.svg" alt="icono Peliculas"></a>
            </li>
            <li>
                <div class="footer__nav__title">
                    <h2 class="cateName footer__nav__title nav__span--compras"></h2>
                </div>
            </li>
            <li>
                <a class="footer__nav__button" href="#"><img class="footer__nav__img footer__nav__img--imagen" src="../imagenes/iconos/icono-perfil-header.png" alt="icono perfil"></a>
            </li>
        </ul>
    </nav>`;}
const mostrarPeliculaCategoria = async () => {
    const verTodas = document.getElementById("verTodas");
    const peliculas = await cargarPeliculas();
    const cateName = document.querySelector(".cateName");
    const categoriasLista = JSON.parse(localStorage.getItem("categoriasLista"));
    cac = localStorage.getItem("cate")
    cateName.textContent = cac
    console.log(categoriasLista)
    verTodas.innerHTML = ``
        peliculas.forEach( (uni) => {
        if (uni.categoria.id === cac){
            verTodas.innerHTML += `
            <li>
            <figure>
            <a id="${uni.id}" class="miniaturas__peliculas" href="descripcion.html">
            <img class="miniaturas__peliculas__imagen" src="../${uni.imagen}" alt="${uni.titulo}">
            </a>
            <figcaption><span class="miniaturas__peliculas__nombre">${uni.titulo}</span></figcaption>
            </figure>
            </li>`;
            const peli = document.querySelectorAll(".miniaturas__peliculas"); 
            console.log(peli);
            peli.forEach((uni) => {
                uni.addEventListener('click', () => {
                    localStorage.setItem("descripcion", uni.id)
                    localStorage.getItem("descripcion")
                });
            })
        }

        }
        )
    }
hacerHeader();
mostrarPeliculaCategoria();
hacerfooter();