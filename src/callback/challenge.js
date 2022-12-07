//Documentation: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://api.escuelajs.co/api/v1';

function fetchData(urlAPI, callback){
    let xhttp = new XMLHttpRequest(); 

    xhttp.open('GET', urlAPI, true); //Initializes a request. true para habilitar
    xhttp.onreadystatechange = function(event){ //escuchamos diferentes estados de la solicitud
        if(xhttp.readyState === 4){ //4 === STATE DONE - The operation is complete
            if(xhttp.status === 200){ //200 === The request succeeded. Documentation: https://developer.mozilla.org/es/docs/Web/HTTP/Status
                callback(null, JSON.parse(xhttp.responseText)); //dentro de xhttp.responseTex recibimos lo que entrega el servidor en texto y se hace la transformación en JSON
            }else {
                const error = new Error('Error' + urlAPI); //En caso de tener error en un elemento de la API
                return callback(error, null); //null porque no regresa ningun dato
            }
        } 
    }
    xhttp.send();
}

//se invoca el metodo fetchData() pasandole como argumentos la varible API concatenada con la cadena 'products' para acceder a la URL de la API deseada, y una función anónima que recibe 2 parámetros (un objeto de error y un arreglo que almacena todos los objetos traidos por la API).

fetchData(`${API}/products`, function (error1, data1){ 
    if(error1) return console.error(error1); //se valida si existe un error, en caso de que exista se detiene el proceso y se imprime el error

    //se invoca nuevamente la función fetchData con el fin de acceder a un objeto puntual del arreglo data1, se envia como parámetros la url de la API apuntando al atributo del primer objeto de arreglo data1 y nuevamente una función anónima.
    fetchData(`${API}/products/${data1[0].id}`, function (error2, data2){
        if(error2) return console.error(error2);

        //Se invoca nuevamente la funcion fetchData con el fin de acceder a la categoria, se envían como parametros la url de la API con la concatenación de 'Categories' y el atributo Id de categoria del objeto data2 de la función anterior
        fetchData(`${API}/categories/${data2?.category?.id}`, function(error3, data3){
            if(error3) return console.error(error3);
            console.log(data1[0]);
            console.log(data2.title);
            console.log(data3.name);
        });
    });
});