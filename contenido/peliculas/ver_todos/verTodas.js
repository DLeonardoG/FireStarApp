
console.log(localStorage.getItem("cate"))
console.log(localStorage.getItem("descripcion"))
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
        console.error("dede");
        console.error(error);
    }
};
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
            <a id="${uni.id}" class="miniaturas__peliculas" href="../descripcion/descripcion.html">
            <img class="miniaturas__peliculas__imagen" src="../../../${uni.imagen}" alt="${uni.titulo}">
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
mostrarPeliculaCategoria();
