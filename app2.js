/* Formulario para registrar nombre */
$('#registrarse').prepend(`
    <p>Ingrese su nombre:</p>
`)


$('#boton-form').click( (event) => {
    event.preventDefault()
    $('#registrarse').trigger('submit')
})

/* Se saluda al usuario con el nombre ingresado en el formulario */
$('#registrarse').on('submit',  (e) =>{
    e.preventDefault()
    const nombre = $('#nombre-ingresado').val()
    console.log(nombre)
    $('#saludo').append(`
        Gracias por su compra ${nombre}!

`)
})

const volverAInicio = document.getElementById('boton-inicio')
volverAInicio.onclick = () => {localStorage.clear()}

/* Se accede al carrito previamente guardado en localStorage */
const valorFinal = localStorage.getItem('carritoActualizado')
console.log(valorFinal)

$('#valor-final').append(`
                El precio a pagar es de: $${valorFinal}
`)

/* Se ingresa a la API de MP a traves de ajax */
let carrito = localStorage.getItem('carrito')
carrito = JSON.parse(carrito)
console.log(carrito)
const finalizarCompra = async () => {

    const productosMP = carrito.map( (prod) => {
            
        return{
            title: prod.tipo,
            description: "",
            picture_url: "",
            category_id: prod.id,
            quantity: 1,
            currency_id: "ARS",
            unit_price: prod.precio
        }
    })
   
    console.log(productosMP)
    const resp = await fetch('https://api.mercadopago.com/checkout/preferences', 
    {
                        method: 'POST',
                        headers: {
                            Authorization: 'Bearer TEST-6137751924765712-091418-00e1ecbf6ea17e84a8044e7f7a6a10ff-290980513'
                        },
                        body: JSON.stringify({
                            items: productosMP
                        })
                    })
        
        const data = await resp.json()

       console.log(data)
       window.open(data.init_point, "_blank")

}

/* Se muestran los productos comprados por el usuario */
let muestraCarrito1 = localStorage.getItem('carrito')
let muestraCarrito2 = JSON.parse(muestraCarrito1)
console.log(typeof muestraCarrito1)

for (items of muestraCarrito2) {
    $('#productos').append(`${(items.tipo)}<br> 
    
    `)
}