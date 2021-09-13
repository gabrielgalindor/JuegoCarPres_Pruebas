import {imageconst} from '../js/imageconst.js';
import {fwidth, fheight, centerw, centerh} from '../ENV.js';
import {game} from '../index.js';

export class escenaIntro extends Phaser.Scene{
    constructor(){
        super({key:"intro", active:true});
    }
    preload()
    {
        this.load.image('title-img', './assets/intro/titulo1.png');
        this.titleImg = new imageconst(922,318);
        this.load.image('background', './assets/intro/background.jpg');
    }
    create()
    {
       this.background = this.add.tileSprite(centerw,centerh,game.config.width,game.config.height,'background');

       this.createTitle = true;
       this.titleExist = false;
       this.titlecounter = 0;
    }

    update(time,delta)
    {
        console.log(time/1000);
        if(time/1000 > 3 && this.createTitle)
        {   
           this.titleSprite = this.add.tileSprite(centerw,centerh,922,318,'title-img');
           this.createTitle = false;
           this.titleExist = true;
        }
        if(this.titleExist)
        {
            this.titlecounter +=1;
            if(this.titlecounter>=2500)
            {
                this.tileSprite.setAlpha();
            }
        }
    }
}