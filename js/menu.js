// variables
const carrito =document.getElementById("carrito"),
    listaProductos =document.getElementById("lista-productos"),
    contenedorCarrito = document.querySelector('.buy-card .lista_de_productos'),
    btnVaciarCarrito = document.querySelector('#vaciar_carrito');

// DECLARACION E INICIALIZACION DE VARIABLES USUARIOS
let articulosCarrito =[];

// ACCION SOBRE EL ICONO DEL CARRITO DE COMPRAS
registrarEventsListeners()
function registrarEventsListeners() {
    listaProductos.addEventListener('click', agregarProducto);
    // VACIAR EL CARRITO
    btnVaciarCarrito.addEventListener('click',e =>{
        articulosCarrito = [];
        limpiarHTML()
    })
}

// ACCION DEL BOTON AGREGAR AL CARRITO
function agregarProducto(e) {
    if(e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerInfo(cursoSeleccionado)
    }
    //AGREGA AL LOCALSTORE
    localStorage.setItem('carritoTer',JSON.stringify(articulosCarrito));
}

// RECUPERA INFO DE NUESTRO HTML AL QUE LE DIMOS CLICK 
function leerInfo(producto) {
    // CREA UN OBJETO CON EL CONTENIDO DEL PRODUCTO
    const infoProducto={
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.descuento').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1,
    }    

    // VERIFICA SI EL PRODUCTO YA ESTA EN EL CARRITO
    const existe = articulosCarrito.some(producto=>producto.id === infoProducto.id)
    if(existe){
        // ACTUALIZA LA CANTIDAD
        const productos = articulosCarrito.map(producto => {
            if(producto.id ===infoProducto.id){
                producto.cantidad++;
                return producto
            }else{
                return producto
            }
        });
        [...articulosCarrito,infoProducto]
    }else {
        // AGREGAMOS ELEMENTOS AL CARRITO DE COMPRAS
        articulosCarrito = [...articulosCarrito,infoProducto]
    }

    // CALCULA EL TOTAL POR FILA
    let precioFinal=0;
    const total =articulosCarrito.map(producto => {
        precioFinal = precioFinal +(producto.precio*producto.cantidad);
    })
    carritoHTML()
}

// MOSTRAR EL CARRITO EN EL HTML
function carritoHTML() {
    let total=0;
    limpiarHTML()
    // RECORRE EL CARRITO Y GENERA LA LISTA DEL CARRITO EN HTML
    articulosCarrito.forEach(producto=>{
        const fila=document.createElement('div');
        fila.innerHTML=`
        <img src="${producto.imagen}"></img>
        <p>${producto.titulo}</p>
        <p>${"$"+producto.precio}</p>
        <p>${producto.cantidad}</p>
        <p>${"$"+producto.cantidad*producto.precio}</p>
        `;
        total=total+producto.cantidad*producto.precio;
        contenedorCarrito.appendChild(fila);
    })
    // GENERA EL TOTAL DEL CARRITO
    const filaFinal=document.createElement('div');
    filaFinal.innerHTML= `
        <i>${"Total del carrito: "+"$"+total}</i>
    `;
    contenedorCarrito.appendChild(filaFinal);
}

// ELIMINA LOS PRODUCTOS QUE ESTAN EN LA LISTA DEL CARRITO
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
