let productosEnCarrito = JSON.parse(localStorage.getItem("carrito"));

const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch("../../datos.json"); 
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
            <ul class="header__nav">
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
                    <form class="nav__form" action="#">
                        <button class="nav__button" type="submit">
                            <img class="nav__img img--compras" src="../imagenes/iconos/icono-compras-azul.svg" alt="Compras">
                            <span class="nav__span nav__span--azul">Compras</span>
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
        </nav>`
}
const hacerfooter = () => {
    const footer = document.querySelector("footer");
    footer.innerHTML = ``;
    footer.innerHTML = `
          <nav>
            <ul class="footer__nav lista">
                <li>
                    <a class="footer__nav__button" href="#"><img class="footer__nav__img footer__nav__img--imagen" src="../imagenes/iconos/icono-compras.png" alt="icono Peliculas"></a>
                </li>
                <li>
                    <div class="footer__nav__title">
                        <h2 id="nav--compras" class="footer__nav__title nav__span--compras">Compras</h2>
                    </div>
                </li>
                <li>
                    <a class="footer__nav__button" href="#"><img class="footer__nav__img footer__nav__img--imagen" src="../imagenes/iconos/icono-perfil-header.png" alt="icono perfil"></a>
                </li>
            </ul>
        </nav>`;}

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

async function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        const peliculas = await cargarPeliculas()
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        let totalCalculado = 0;
        contenedorCarritoProductos.innerHTML = "";
        productosEnCarrito.forEach(uni => {
            let id = uni.id;
            peliculas.forEach(el => {
                if (el.id === id) {
                    const div = document.createElement("div");
                    div.classList.add("carrito-producto");
                    div.innerHTML = `
                        <img class="carrito-producto-imagen" src="${el.imagen}" alt="${el.titulo}">
                        <div class="carrito-producto-titulo">
                            <small>Título</small>
                            <h3>${el.titulo}</h3>
                        </div>
                        <div class="carrito-producto-cantidad">
                            <small>Cantidad</small>
                            <p>${uni.cantidad}</p>
                        </div>
                        <div class="carrito-producto-precio">
                            <small>Precio</small>
                            <p>$${el.precio}</p>
                        </div>
                        <div class="carrito-producto-subtotal">
                            <small>Subtotal</small>
                            <p>$${el.precio * uni.cantidad}</p>
                        <button class="carrito-producto-eliminar" id="${el.id}"><i class="bi bi-trash-fill"></i></button>`;
                        contenedorCarritoProductos.append(div);
                        console.log("entro")
                        totalCalculado += el.precio * uni.cantidad;
    total.innerText = `$${totalCalculado}`
                }
            });
            
        })    
    actualizarBotonesEliminar();
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}
function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
}
botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}
botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}
hacerHeader();
cargarProductosCarrito();
hacerfooter();