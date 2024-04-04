
//para pintar las tarjetas desde json
const items = document.getElementById("items")
//const templatecard = document.getElementById('template-card').content
const card =document.getElementById("carrito")
const fragment =document.createDocumentFragment()

//contenedor para las tarjetas
const contenedor =document.querySelector('.card .card-body')

//  llama a la funcion 
document.addEventListener('DOMContentLoaded',()=>{
    fetchData()
})
// busca la informacion en el documento json
const fetchData = async ()=>{
    try {
        const res = await fetch('../json/datos.json');
        const data = await res.json()   
        pintarCards(data)
    } catch (error) {
        console.log(error);
    }
}

// recorre todos los datos del json para poder pintar en cada tarjeta
const pintarCards =data =>{
    console.log(data);
    data.forEach(producto => {
        card.querySelector('h5').textContent = producto.titulo;
        card.querySelector('p').textContent = producto.precio;
        card.querySelector('img').textContent =producto.img
        console.log(producto.titulo);
        const fila=document.createElement('div');
        fila.innerHTML=`
        <img src="${producto.img}"></img>
        <p>${producto.titulo}</p>
        <p>${"$"+producto.precio}</p>
        <p>${1}</p>
        <p>${"$"+producto.cantidad*producto.precio}</p>
        `;

        contenedor.appendChild(fila);
        //para el  reflow
       // const clone = card.cloneNode(true)
       // fragment.appendChild(clone)
    })
   // items.appendChild(fragment)
}