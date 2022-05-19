import {imageconst} from '../js/imageconst.js';
import {fwidth, fheight, centerw, centerh} from '../ENV.js';
import {game} from '../index.js';
import {escenaLobby} from './escenaLobby.js';
import {get_msbot_api} from '../js/request_api.js';

export class escena_personaje extends Phaser.Scene{
    constructor(){
        super({key:"escena_personaje", active:true});
        this.temporalScenePoint= "Lobby";
    }
    preload()
    {
        this.new_load = false

    }
    create()
    {
        //Me quede acá
        //Recordar referenciar con el promise de la camisa
        //Va orden body, head, camisa, pantalon, zapatos, accesorio
        this.promise_body = get_msbot_api(
            {
                "collection": "faj",
                "part": "camisa",
                "variation": 1
            },
            'img_url'
        )

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
            this.final_camisa = data;
            
            this.new_load = true;
           }
        )
        
        
        
    }

    update(time,delta)
    {
        if(this.new_load)
        {
            this.reload_images();
            this.new_load= false;
        }
    }

    reload_images()
    {
        this.scene.start('draw_character', {img_camisa: this.final_camisa});
           
    }

}

export class draw_personaje extends Phaser.Scene{

    constructor(){
        super({key:"draw_character", active:false});
        this.temporalScenePoint= "Lobby";
    }

    init(data)
    {
        this.camisa_url = data.img_camisa;
    }

    preload()
    {
        console.log('camisa url = '+this.camisa_url);
        this.load.image('camisa', this.camisa_url);
        

    }

    create()
    {
        //Estas constantes son para la escala 0.25
        const width_imgs = 800
        const height_imgs = 900
        
        
        console.log('create draw');
        this.camisa = this.add.sprite(fwidth-(width_imgs/2),200,'camisa');
        this.camisa.setScale(0.25,0.25);
    }

}