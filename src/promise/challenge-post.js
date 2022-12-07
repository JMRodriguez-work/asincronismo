import fetch from 'node-fetch';

const API = 'https://api.escuelajs.co/api/v1';

function postData(urlAPI, data){
     //ya no se solicita informarción si no se guardará información
    const response = fetch(urlAPI, {
        method: 'POST',
        mode: 'cors',//cors es el permiso que va a tener, por defecto va estar siempre en cors
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'//necesario indicar que lo que se está enviando es de tipo json
        },
        body: JSON.stringify(data)
    });
    return response;
}

const data = {
    "title": "New Product Course",
    "price": 999,
    "description": "A nice course",
    "categoryId": 1,
    "images": ["https://placeimg.com/640/480/any"]
  }

postData(`${API}/products`, data)
  .then(response => response.json())
  .then(data => console.log(data));