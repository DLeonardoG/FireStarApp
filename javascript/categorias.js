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
            <form class="nav__form" action="#">
                <button class="nav__button" type="submit">
                    <img class="nav__img img--inicio" src="../imagenes/iconos/icono-peliculas-azul.svg" alt="Peliculas">
                    <span class="nav__span nav__span--azul">Peliculas</span>
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
                <a class="footer__nav__button" href="#"><img class="footer__nav__img footer__nav__img--imagen" src="../imagenes/iconos/icono-peliculas.svg" alt="icono Peliculas"></a>
            </li>
            <li>
                <div class="footer__nav__title">
                    <h2 class="footer__nav__title nav__span--compras">categorias</h2>
                </div>
            </li>
            <li>
                <a class="footer__nav__button" href="#"><img class="footer__nav__img footer__nav__img--imagen" src="../imagenes/iconos/icono-perfil-header.png" alt="icono perfil"></a>
            </li>
        </ul>
    </nav>`;}

const mostrarPeliculaCategoria = async () => {
    const categoriasLista = document.getElementById("categoriasLista");
    const peliculas = await cargarPeliculas();
    let totalidad = ["accion", "comedia","animacion","terror"];
    let categos = JSON.stringify(totalidad)
    localStorage.setItem("categoriasLista",categos);
    categoriasLista.innerHTML = "";
    for (let i = 0; i < totalidad.length; i++){
        cac = "mostrarCategoria" + totalidad[i]
        console.log(cac)
        categoriasLista.innerHTML += `
        <li>
        <div class="ver_todas">
            <h2>${totalidad[i]}</h2>
            <a id="${totalidad[i]}" class="ver_todas__button" href="peliculas_ver_todas.html">ver todas</a>
        </div>
        <ul id= "${cac}"  class="lista miniaturas">
        </ul>
        </li>`;

    };
    cates = document.querySelectorAll(".ver_todas__button")
    cates.forEach((uni) => {
        uni.addEventListener('click', () => {
            localStorage.setItem("cate", uni.id)
            localStorage.getItem("cate")
        });
    })
    for (let y = 0; y < totalidad.length; y++){
        cac = totalidad[y]
        const mostrarCategoria = document.getElementById("mostrarCategoria"+cac);
        let count = 1
        for (let j = 0; j < peliculas.length; j++){
            if (peliculas[j].categoria.id === totalidad[y]){
                count += 1;
                if (count != 4) { 
                    const figura = document.createElement("li");
                    figura.innerHTML = ""
                    figura.innerHTML = `
                    <figure>
                    <a id="${peliculas[j].id}" class="miniaturas__peliculas" href="descripcion.html">
                    <img class="miniaturas__peliculas__imagen" src="${peliculas[j].imagen}" alt="${peliculas[j].titulo}">
                    </a>
                    <figcaption><span class="miniaturas__peliculas__nombre">${peliculas[j].titulo}</span></figcaption>
                    </figure>
                    `;
                    mostrarCategoria.appendChild(figura);
                    const peli = document.getElementById(peliculas[j].id); 
                    peli.addEventListener('click', guardarDescripcion);
                }
            }
        }
    }
}
function guardarDescripcion() {
    console.log("Mostrar Pelicula Descripcion")
    let id = this.getAttribute('id')
    localStorage.setItem("descripcion",id)
};
hacerHeader()
mostrarPeliculaCategoria()
hacerfooter()