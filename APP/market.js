
//* Capturo en una variable un div donde voy a inyectar el stock.
let contenedor_market = document.getElementById("market");

//* Creo un array vacío para cargar con objetos que representen los productos.
let carrito = [];

//* Utilizo el método fetch para hacer una petición a un JSON local

fetch('../APP/stock.json')
.then((response) => response.json())
.then((data) => {
    
    //* Inyecto el stock en el HTML
    data.forEach((producto) => {
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
  })


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

        Toastify({
                    text:`${prod.nombre} 
                    ingresado al carrito`,
                    duration: 2000,
                    gravity: "top",
                    position: "right",
                    style:{
                        fontSize: "14px",
                        fontFamily: "Verdana",
                        color: "white",
                        background: "linear-gradient(to right, #00b09b, #084671)"
                    }
                    }).showToast();

        //* Capturo todos los botones de borrar elemento del carrito a través de su clase.
        let btn_borrar = document.querySelectorAll(".borrar_elemento");
    
        //* Recorro la colección de botones y genero un evento click, al cual le asigo una función.
        for(let boton of btn_borrar){
        boton.addEventListener("click", borrar_producto);
        };

        //* La función reconoce el nodo en cual se la llama a través de e y target. Busco el nodo que representa a toda la fila.
        function borrar_producto(e){

            //* Aplico un setTimeout para que primero se borre el nodo, luego se guarde, y por último sume los elementos recuperados.
            setTimeout(()=>{

                let abuelo = e.target.parentNode.parentNode;

                //* Elimino el nodo con el método remove.
                abuelo.remove();
            } , 100);
        };

        //* Guardo el carrito en el localstorage.
        setTimeout(()=> {localStorage.setItem('carrito', JSON.stringify(carrito))}, 200)  
        
        //* Llamo a la función sumar_totales después de que se borre el nodo.
        setTimeout(sumar_totales, 300);

        //! No funciona el orden del setTimeout. Tienen diferentes jerarquías.
    });


    //* Creo un parrafo para la suma de la compra.
    function sumar_totales(){
        //* Utilizo el método reduce sobre el carrito, y le asigno un acumulador igual a cero.
        let valor_subtotal = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);

        //* Inserto el texto resultante en 
        fila_subtotal.innerText = `Subtotal: $ ${parseInt(valor_subtotal)}`; 
    }

    //! Aún no sé cómo restar el valor de los elementos eliminidados del carrito del subtotal. 
    //? Debería utilizar promises?
    //todo: Intentar con callbacks. 
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

//* Modifo la longitud de elementos del carrito a cero.
boton_vaciar.addEventListener('click', function(){
    carrito.length = 0;
    actualizar();
});
//! Al vaciar el carrito no se modifica el localStorage.
//? Debería insertar la función antes de guardarla?
//todo: Insertar la función antes de guardarla.


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
        //* En el caso de que no esté en el carrito, uso el método find para que me devuelva el objeto que coincide el ID con el del producto metido como argumento, y lo pusheo al carrito.
        
        let prod_comprado = stock_productos.find((prod) => prod.id === producto_id);
        
        carrito.push(prod_comprado);
        
        //! Intenté traer el stock del archivo JSON pero la página me empezó a funcionar mal:
        // fetch('../APP/stock.json')
        //     .then((response) => response.json())
        //     .then((data) => {
  	    //             let prod_comprado = data.find((prod) => prod.id === producto.id)

        //             carrito.push(prod_comprado);
        //     })
    };

//* Actualizo.
actualizar();
};

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

//* Datos del clima en el header
let clima = document.getElementById("clima");

fetch("https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&lang=es&units=metric&appid=991dfe4bcda1a40d3917c35468a2109d")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    

        const{main, weather} = data;
        const icono = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

        const datos_clima = `
                        <img src="https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png" class="imagen-clima">
                        <h2 class="card-title">${data.main.temp} °C</h2>
                        <p> Descripción: ${data.weather[0].description}</p>
                        `;

                        clima.innerHTML = datos_clima;
        }
    )
