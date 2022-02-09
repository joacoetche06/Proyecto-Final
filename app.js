/* $("h1").hide()
$("h2").hide() */

/* Lista de productos */
const contenedorProductos = document.getElementById('contenedor-productos')

console.log(contenedorProductos)

$.get('./stock.json', (productos) => {
    console.log(productos)
    productos.forEach(producto => {
        $('#contenedor-productos').append(`           
        <div class="producto">        
                <img src=${producto.img}>
                <p>Id: ${producto.id}</p>
                <p>Tipo: ${producto.tipo}</p>
                <p>Marcas: ${producto.marcas}</p>
                <p>Talles Disponibles: ${producto.talles}</p>
                <p>Precio: $${producto.precio}</p>
                <button id='${producto.id}' class="btn btn-primary" onclick=comprar(this)>Comprar</button>
        </div>       
        `
        )
    });
})



const carrito = []



/* Función para agregar los productos seleccionados por el usuario */

const comprar = (el) => {
    $.get('./stock.json', (productos) => {
        const arrProductos = productos.find( p => p.id == el.id ) 
        
        console.log(arrProductos)   //se lee el producto que se agrega al carrito

        const table = document.getElementById('tabla')
        
        carrito.push({id: arrProductos.id, tipo: arrProductos.tipo, precio: arrProductos.precio})
        console.log(carrito)
        /* Se agregan a una tabla */
        table.innerHTML += `               
                <tbody id="tabla" >
                    <tr>
                        <th scope="row">${arrProductos.id}</th>
                        <td>${arrProductos.tipo}</td>
                        <td>$${arrProductos.precio}</td>
                        <th> <button id='${arrProductos.id}' type="button" class="btn btn-danger" onclick="eliminar(this)">Eliminar</button></th>
                    </tr>
                </tbody>
        `
        Toastify({
            text: "Elemento agregado al Carrito",
            duration: 1600,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            "style.background": "linear-gradient(to bottom right, lightblue, blue)",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            onClick: function(){} // Callback after click
            }).showToast();
        
        
        actualizarPrecio()
        })        
} 

/* Función para eliminar un producto seleccionado previamente por el usuario */
const eliminar = (el) => {   
    /* $.get('./stock.json', (productos) => { */
    let productoAEliminar = carrito.find( p => p.id == el.id )
    console.log(productoAEliminar)

    console.log(carrito)
    
    let indice = carrito.indexOf(productoAEliminar)
    console.log(indice)
    carrito.splice(indice, 1)
    const table = document.getElementById('tabla')
    table.innerHTML = ''
    for (const items of carrito) {
        console.log()
    
    table.innerHTML += `               
                    <tbody id="tabla" >
                        <tr>
                            <th scope="row">${items.id}</th>
                            <td>${items.tipo}</td>
                            <td>$${items.precio}</td>
                            <th> <button id='${items.id}' type="button" class="btn btn-danger" onclick="eliminar(this)">Eliminar</button></th>
                        </tr>
                    </tbody>
        `
    }
    console.log(carrito)
    Toastify({
        text: "Elemento Eliminado del Carrito",
        duration: 1600,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        backgroundColor: "linear-gradient(to bottom right, red, red)",
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: function(){} // Callback after click
        }).showToast();
    
    actualizarPrecio()
    /* }) */ 
}



/* Función para ir actualizando el carrito y actualizar el precio final que luego se usara en la pagina de pagos */

let actualizarPrecio = () => {

    localStorage.setItem('carrito', JSON.stringify(carrito))

    localStorage.getItem('carrito')

            
    const precioTotal = document.getElementById('precio-final')
    
    let carritoActualizado = carrito.reduce( (acc, el) => acc + el.precio, 0)
            
    precioTotal.innerHTML = `
            Precio Total $${carritoActualizado}
        `
    console.log(carritoActualizado)
    
    localStorage.setItem('carritoActualizado', JSON.stringify(carritoActualizado))
    
    
    } 

    


console.log($("#precio-final").offset())

/* Scroll al footer */
$("#contacto-bar").click( () => {
    $("html, body").animate({
        scrollTop: $("#contacto-footer").offset().top
    }, 200)
} )
    

/* Scroll a los productos */
$("#productos-bar").click( () => {
    $("html, body").animate({
        scrollTop: $("#productos").offset().top
    }, 200)
} )
    

