
//* Capturo en una variable un div donde voy a inyectar el stock.
let contenedor_market = document.getElementById("market");

//* Creo un array vacío para cargar con objetos que representen los productos.
let carrito = [];

//* Inyecto el stock en el HTML 
stock_productos.forEach((producto) => {
    let div = document.createElement('div')
    div.classList.add('estilo-producto')
    div.innerHTML = `
    <img src=${producto.imagen} class="producto-imagen">
    <h3 class="card-title">${producto.nombre}</h3>
    <h4 class="tipo" >${producto.tipo}</h4>
    <p class="card-text">${producto.descr}</p>
    <p class="precio-producto">$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="btn btn-primary boton-agregar">Comprar</button>
    `
    //* Inserto el nodo div en el contenedor del market
    contenedor_market.appendChild(div);

    //* Capturo el botón de compra de cada producto  con el ID que le asigné
    let boton_comprar = document.getElementById(`agregar${producto.id}`);

    //* Capturo el evento del botón de compra y le asigno una función para agregar el objeto al carrito.
    boton_comprar.addEventListener('click', () => {
        agregar_a_carrito(producto.id)
    })
});

//* Capturo el cuerpo de la tabla donde insertar los elementos el carrito.
let tabla = document.getElementById("tbody");

//* Capturo el parrafo de la tabla donde voy a volcar el subtotal.
let fila_subtotal = document.getElementById("subtotal");

//* Esta función se va a ejecutar cada vez que se modifique el contenido del carrito.
let actualizar = () => {
    
    //* Cada vez que se actualiza la información, el nodo "tabla" se vacía, para luego ser cargardo con los nuevos elementos y así evitar la acumulación de estos.
    tabla.innerHTML = "";
    fila_subtotal.innerHTML = "";

    
    //* Recorro el array del carrito y creo una tr por cada producto seleccionado.
    carrito.forEach((prod) => {
        
        let fila = document.createElement("tr");
        
        fila.innerHTML = `<td><img src="${prod.imagen}" class='img-carrito'></td>
                          <td>${prod.nombre}</td>
                          <td id="cantidad">${prod.cantidad}</td>
                          <td id="precio">${prod.precio}</td>
                          <td><button class='btn-danger borrar_elemento'>Borrar</button></td>`;      
        
        //* Inserto cada tr en el tbody.
        tabla.append(fila);

        // //* Genero un alerta para notificar la compra.
        // Swal.fire({
        //         html: `<h2>Producto ingresado a carrito</h2>
        //         <br>
        //         <h3>${prod.nombre}</h3>
        //         <img src="${prod.imagen}" class='img-carrito'></img>`
        // });

        //* Borro elementos del carrito.
        let btn_borrar = document.querySelectorAll(".borrar_elemento");
    
        for(let boton of btn_borrar){
        boton.addEventListener("click", borrar_producto);
        };

        function borrar_producto(e){ 
        let abuelo = e.target.parentNode.parentNode;
        abuelo.remove();
        };

        //* Guardo el carrito en el localstorage.
        localStorage.setItem('carrito', JSON.stringify(carrito)); 
    });


    // carrito.forEach((prod) =>{
    //     let subtotal = prod.cantidad * prod.precio;
    //     console.log(subtotal);
    // });
    //* Creo un parrafo para la suma de la compra.
    function sumar_totales(){
        let valor_subtotal = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
        fila_subtotal.innerText = `Subtotal: $ ${valor_subtotal}`;
    }
    sumar_totales();
};

//* Llamo al localStorage después del carrito.
document.addEventListener('DOMContentLoaded', () => {
    //* Espero que cargue el documento.
    if (localStorage.getItem('carrito')){

        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizar();
    }
});

//* Vaciar carrito.
let boton_vaciar = document.getElementById('vaciar-carrito');

boton_vaciar.addEventListener('click', function(){
    carrito.length = 0;
    actualizar();
});

//* Genero la función para agregar al carrito.
let agregar_a_carrito = (producto_id) => {

    //* Primero corroboro si el producto ya existe dentro del array, preguntando si existe algún objeto que tenga un ID idéntico al ID del argumento. 
    let repetido = carrito.some (prod => prod.id === producto_id);

    //* Si ya existe, modifico la cantidad, sino lo pusheo
    if (repetido){
         //* Con el método map creo un nuevo array en el que solo se modifica la cantidad.
        let prod_comprado = carrito.map (prod => {
            if (prod.id === producto_id){
                prod.cantidad++
            };
        });
    } else {
        //* En el caso de que no esté en el carrito, uso el método find para que me devuelva el objeto que coincide el ID con el del producto metido como argumento, y lo pusheo al carrito
        let prod_comprado = stock_productos.find((prod) => prod.id === producto_id);

        carrito.push(prod_comprado);
    };

//* Actualizo.
actualizar();
};





// //* Para eliminar al producto en el carrito voy a seguir los mismos pasos que en la función 
// let eliminar_producto = (producto_id) => {
//     let prod_comprado = carrito.find((prod) => prod.id === producto_id)

//     let indice = carrito.indexOf(prod_comprado) //Busca el elemento q yo le pase y nos devuelve su indice.

//     carrito.splice(indice, 1) //Le pasamos el indice de mi elemento ITEM y borramos 
//     // un elemento 
//     actualizar(); //LLAMAMOS A LA FUNCION QUE CREAMOS EN EL TERCER PASO. CADA VEZ Q SE 
//     //MODIFICA EL CARRITO
//     console.log(carrito)
// }


//* Muestro u oculto el carrito.
let btn_carrito = document.getElementById("vista_carrito");

btn_carrito.addEventListener("click", function(){
    let mostrar_carrito = document.getElementById("carrito");

    if(mostrar_carrito.style.display != "none"){
        mostrar_carrito.style.display = "none";
    }
    else{
        mostrar_carrito.style.display = "flex";
    }
});