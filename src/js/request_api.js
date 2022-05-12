
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