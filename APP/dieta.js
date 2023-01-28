
//* Creo un array vacío preexistente para pushearle los objetos correspondientes.
let array_objeto_productos = [];

//* Capturo el botón "Agregar"
let boton_dieta = document.getElementById("boton_dieta");

boton_dieta.addEventListener("click", agregar_dieta);

function agregar_dieta(e){

    e.preventDefault();

    let producto_dieta = document.getElementById("producto_dieta").value;
    let producto_kilocalorias = document.getElementById("producto_kilocalorias").value;
    let producto_consumido = document.getElementById("producto_consumido").value;

    let suma_kilocalorias_por_producto = parseInt((producto_kilocalorias/100) * producto_consumido);


    //* Creo un onjeto con los dos valores que quiero inyectar al HTML.
    let valores_calorias = {
                producto: producto_dieta,
                calorias: suma_kilocalorias_por_producto
    };

    //* Pusheo cada objeto al array vacío
    array_objeto_productos.push(valores_calorias);

    //* Convierto el array a JSON
    let array_JSON = JSON.stringify(array_objeto_productos);
        
    //* Guardo en el localStorage
    localStorage.setItem("valores", array_JSON);
        
    //* Recupero los datos del localStorage
    let valores_dieta = localStorage.getItem("valores");
        
    //* Desparseo el texto JSON a texto JavaScript
    valores_dieta = JSON.parse(valores_dieta);

    console.log(valores_dieta);
    
    valores_dieta.forEach((valor) => {
        console.log(valor);
    });

    // //* Capturo la lista que quiero construir.
    // let lista_dieta = document.getElementById("lista_dieta");
            
    // //* Creo un elemento "li" para adherir a la lista.
    // let li_dieta = document.createElement("li");

    // //* Agrego al HTML un elemento "li" con los datos cargados y un botón para borrar.
    // li_dieta.innerHTML = `<b>${valor_producto}</b> - Kilocalorías ingeridas con este producto: <b>${valor_caloria}</b>  <button class="boton_quitar">Quitar de la lista</button>`;
        
    // //* Agrego este elemento hijo al elemento padre "lista_dieta".
    // lista_dieta.append(li_dieta);


       
    
    //! Sumar calorias totales

    function calcular_total_calorias(acumulador, producto){
        acumulador = acumulador + producto.calorias;
        return acumulador;
    };

    let total_kilocalorias = valores_dieta.reduce(calcular_total_calorias, 0);
    // console.log(total_kilocalorias);
    
    let suma_kilocalorias_consumidas = document.getElementById("suma_kilocalorias_consumidas");
    
    const suma_total_kilocalorias = document.createElement("h4");
    suma_total_kilocalorias.innerHTML = `${total_kilocalorias} kilocalorías`;
    
    suma_kilocalorias_consumidas.append(suma_total_kilocalorias);
}



    //! Botones de eliminación
        //* Declaro una variable para todos los botones de eliminación.
        let botones_quitar = document.querySelectorAll(".boton_quitar");
    
        //* Utilizo un for..of para recorrer todos los botones y le aplico una función.
        for(let boton of botones_quitar){
            boton.addEventListener("click", borrar_producto);
        }
        
        //* Dicha función utiliza el elemento "e" y "target" para identificar al botón seleccionado.
        function borrar_producto(e){
            //* declaro al nodo hijo (botón) y padre (li) para aplicar la eliminación del nodo padre.
            let hijo = e.target;
            let padre = hijo.parentNode;
        
            //* Elimino al nodo padre.
            padre.remove();
    
            //* Resto de la suma total, el valor del producto eliminado
            
            //! Tengo que programar parq que el botón borre al nodo padre y le reste al total de la suma de kilocalorías
        }