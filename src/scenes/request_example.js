import {imageconst} from '../js/imageconst.js';
import {fwidth, fheight, centerw, centerh} from '../ENV.js';
import {game} from '../index.js';
import {escenaLobby} from './escenaLobby.js';
import {get_msbot_api} from '../js/request_api.js';

export class escena_personaje extends Phaser.Scene{
    constructor(){
        super({key:"escena_personaje", active:false});
        this.temporalScenePoint= "Lobby";
    }
    preload()
    {

    }
    create()
    {

        this.promise_camisa = get_msbot_api(
            {
                "collection": "faj",
                "part": "camisa",
                "variation": 1
            },
            'img_url'
        );
        
        this.promise_camisa.then(
           (data)=>{
            this.final_camisa = data
           }
        )

        this.h = 0;
        
    }

    update(time,delta)
    {
        console.log(this.final_camisa)
    }
}