//*  SE LE SOLICITA AL USUARIO A TRAVÉS DE INPUTS DE FORMULARIO EL NOMBRE, EL GÉNERO, LA ALTURA, EL PESO, LA EDAD, LA CANTIDAD DE DÍAS DE LA SEMANA QUE REALIZÓ EJERCICIO Y LAS KILOCALORÍAS CONSUMIDAS LA ÚLTIMA SEMANA.


//! INDEXAR TODOS LOS COMENTARIOS. Por ejemplo: 1.A.II
//* Accedo al elemento botón a través del método getElementById.
let boton_calorias = document.getElementById("boton_calorias");

//* Defino una función anónima como Event Handler para el evento "click" del botón.
boton_calorias.addEventListener("click", function(e){

    e.preventDefault();
    //* Asigno una variable para los valores de los inputs del formulario.
    let nombre = document.getElementById("campo_nombre").value;
    let genero = document.querySelector('input[name = campo_genero]:checked').value;
    let altura = parseInt(document.getElementById("campo_altura").value);
    let peso = parseFloat(document.getElementById("campo_peso").value);
    let edad = parseInt(document.getElementById("campo_edad").value);
    let dias_ejercicio = parseInt(document.querySelector('input[name = campo_ejercicio]:checked').value);
    let kilocalorias_acumuladas = parseFloat(document.getElementById("campo_kilocalorias").value);

    //* Creo un Objeto a través de una Clase para generar una calculadora de Tasa Metabólica Basal (TMB).
    class Calculador_tmb{
        constructor(nombre, genero, altura, peso, edad){
            this.nombre = nombre; 
            this.genero = genero;
            this.altura =altura; 
            this.peso = peso; 
            this.edad = edad;
            this.tasa = 0; 
        }

    //* Creo un método dentro de la clase para calcular la tasa metabólica basal.
    calcular_tasa(){

        //? ECUACION DE HARRIS BENEDICT PARA CALCULAR LA TMB

        if(genero == "femenino"){
            this.tasa = 655.1 + (9.56 * peso) + (1.845 * altura) - (4.6756 * edad);
        }
        else if(genero == "masculino"){
            this.tasa = 66.473 + (13.75 * peso) + (5.0033 * altura) - (6.755 * edad);
        }
        return this.tasa;
    }
    }

    //* Creo una instancia de objeto y la guardo en una variable.
    let usuario = new Calculador_tmb(nombre, genero, altura, peso, edad);


    //* Llamo al método 'calcular_tasa' y le asigno una variable que me retorna el valor de la TMB de dicho usuario.
    let TMB = usuario.calcular_tasa();

    //! DE ESTE MODO YA OBTUVE LA "TMB" Y CONTINUO OPERANDO LA "TMB" CON "DIAS_EJERCICIO" PARA OBTENER LA INGESTA IDEAL DEL USUARIO. 

    //* Ingesta ideal en función a los dias de ejercicios físicos utilizando la tasa metabólica basal.
    let ingesta_ideal = 0;

    // Ejercitación nula
    if(dias_ejercicio < 1){
        ingesta_ideal = TMB * 1.2;
    }
    // Ejercitación ligera
    else if(dias_ejercicio <= 2){
        ingesta_ideal = TMB * 1.375;
    }
    // Ejercitación moderada
    else if(dias_ejercicio <= 5){
        ingesta_ideal = TMB * 1.55;
    }
    // Ejercitación fuerte
    else{
        ingesta_ideal = TMB * 1.725;
    }

    //! DE ESTA MANERA OBTENGO "INGESTA_IDEAL". SE UTILIZARÁ LUEGO PARA COMPARAR CON LA INGESTA REAL DE KILOCALORIAS.

    //* DIFERENCIA ENTRE CONSUMO DE KILOCALORIAS E INGESTA IDEAL

    //* Primero busco el promedio de kilocalorías diarias consumidas
    let promedio_kilocalorias = kilocalorias_acumuladas/7;

    //* Luego le resto la ingesta ideal para ver si hay exceso o déficit calórico
    let diferencia_kilocalorias = promedio_kilocalorias - ingesta_ideal;

    //* Creo un párrafo debajo del formulario y envío un mensaje al usuario dependiendo de los resultados obtenidos.
    function mensaje_usuario(){
        let mensaje = document.getElementById("mensaje");
        
        if(diferencia_kilocalorias > 50){   
            let respuesta = document.createElement("p");
            respuesta.innerHTML = nombre + ": Debe disminuir un promedio de " + Math.round(diferencia_kilocalorias) + " kilocalorías diarias para MANTENER su peso. Si quiere aumentar o bajar de peso, podemos asesorarlo.";
            respuesta.style.fontSize = "16px";
            mensaje.append(respuesta);

            Swal.fire({
                    icon: "warning",
                html: `<h2>${nombre}</h2>
                <br>
                <h3>Deberías disminuir al menos ${Math.round(diferencia_kilocalorias)} kilocalorías en tu consumo diario.</h3>`
            });
        }
    
        else if(diferencia_kilocalorias < 50){
            let respuesta = document.createElement("p");
            respuesta.innerHTML = nombre + ": Debe aumentar un promedio de " + Math.round(-diferencia_kilocalorias) + " kilocalorías diarias para MANTENER su peso. Si quiere aumentar o bajar de peso, podemos asesorarlo.";
            respuesta.style.fontSize = "16px";
            mensaje.append(respuesta);
            Swal.fire({
                icon: "warning",
            html: `<h2>${nombre}</h2>
            <br>
            <h3>Deberías aumentar al menos ${Math.round(diferencia_kilocalorias)} kilocalorías en tu consumo diario.</h3>`
        });
        }
    
        else{
            let respuesta = document.createElement("p");
            respuesta.innerHTML = nombre + ": Con su consumo actual, mantendrás el mismo peso";
            respuesta.style.fontSize = "16px";
            mensaje.append(respuesta);
            Swal.fire({
                icon: "warning",
            html: `<h2>${nombre}</h2>
            <br>
            <h3>Con tu consumo actual, puedes mantener tu peso. Si quieres modificarlo, asesórate con nosotros.</h3>`
        });
        }
    }
    mensaje_usuario();
}
);