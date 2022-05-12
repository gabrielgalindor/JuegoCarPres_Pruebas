# Carrera presidencial - Proyecto de Pruebas

Este proyecto es de pruebas


## Fetch para hacer requests

Javascript realiza las peticiones a APIs externas de manera asincrona, por lo qué es muy importante tener en cuenta que


A continuación tenemos una función que llama fetch para recibir información sobre la API

```Javascript

const api_url = "http://0.0.0.0:8000/api"

export const  get_msbot_api = async (BODY, KEY)=>{
    

    var response_data = await fetch(api_url+'/get_image',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type':'application/json'
                    },
                    CORS: 'no-cors',
                    body: JSON.stringify(BODY)
                }
            ).then((response)=>{
                return response.json();
            }).then((data)=>{
                console.log(data[KEY]);
                response_data = data[KEY];
                return response_data
            });
    console.log('response into function'+response_data)    
    return response_data;

}
```

La variable promise_camisa retornará siempre una promise debido a qué aún desconoce los valores que retornará la función de fetch, por más que se halla forzado a qué sea una función asincrona y forzado a la espera de la respuesta de fetch


```Javascript

this.promise_camisa = get_msbot_api(
            {
                "collection": "faj",
                "part": "camisa",
                "variation": 1
            },
            'img_url'
        );
```

El 12 de mayo del 2022 se realizó una experiencia que permite recibir la respuesta de la API de la siguiente manera:

```Javascript

this.promise_camisa.then(
           (data)=>{
            this.final_camisa = data
           }
        )

```

Existe un error: Al parecer solamente las scenas pueden cargar las imagenes desde los preloads, por lo que propongo jugar con dos escenas en una