import fetch from "node-fetch";

const API = 'https://api.escuelajs.co/api/v1';


//Lógica de async: ir por los datos, luego esperar por ellos y finalmente retornarlos hacia el usuario

async function fetchData(urlApi){ //siempre async antes de function
    const response = await fetch(urlApi);
    const data = await response.json();
    return data;//retorna la información de la API que estamos solicitando
}

const anotherFunction = async (urlApi) =>{
    try {
        const products = await fetchData(`${urlApi}/products`);
        const product = await fetchData(`${urlApi}/products/${products[0].id}`);
        const category = await fetchData(`${urlApi}/categories/${product.category.id}`);

        console.log(products[0]);
        console.log(product.title);
        console.log(category);
    } catch (error) {
        console.log("This was the error: " + error);
    }
}

anotherFunction(API);