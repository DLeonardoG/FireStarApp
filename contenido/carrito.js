let productosEnCarrito = JSON.parse(localStorage.getItem("carrito"));
console.log(productosEnCarrito);

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
                        <img class="carrito-producto-imagen" src="../${el.imagen}" alt="${el.titulo}">
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

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
      })
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