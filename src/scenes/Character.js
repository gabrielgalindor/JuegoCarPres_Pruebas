import {imageconst} from '../js/imageconst.js';
import {fwidth, fheight, centerw, centerh} from '../ENV.js';
import {game} from '../index.js';
import {escenaLobby} from './escenaLobby.js';

export class Character extends Phaser.Scene{
    constructor(){
        super({key:"character", active:false});
        this.temporalScenePoint= "Lobby";
    }
    preload()
    {
        this.load.image('bg-menu1', './assets/menu1/fondo_menu1.png');
        this.load.image('bg-menu2', './assets/menu1/fondo_2_menu1.jpg');

    }
    create()
    {
        this.behind_back = this.add.tileSprite(centerw,centerh,game.config.width,game.config.height,'bg-menu2');
    }

    update(time,delta)
    {
        this.behind_back.tilePositionX+=10;
        //this.deco1.tilePositionX+=1
    }
}