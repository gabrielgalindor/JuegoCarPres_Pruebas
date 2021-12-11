import {imageconst} from '../js/imageconst.js';
import {fwidth, fheight, centerw, centerh} from '../ENV.js';
import {game} from '../index.js';
import {escenaLobby} from './escenaLobby.js';

export class escenaMenu1 extends Phaser.Scene{
    constructor(){
        super({key:"menu1", active:false});
        this.temporalScenePoint= "Lobby";
    }
    preload()
    {
        this.load.image('bg-menu1', './assets/menu1/background.jpg');
        this.load.image('logo-menu1', './assets/menu1/logo1.png');
        //imagenes de botones
        this.load.image('btn1-menu1', './assets/menu1/btn1.png');
        this.load.image('btn2-menu1', './assets/menu1/btn2.png');
        this.load.image('btn3-menu1', './assets/menu1/btn3.png');
    }
    create()
    {
        this.background1 = this.add.tileSprite(centerw,centerh,game.config.width,game.config.height,'bg-menu1');
        this.logo = this.add.tileSprite(600,100,627,199,'logo-menu1');
        //Alpha para manejar la opacidad del logo
        this.logoAlpha = 0;
        this.logo.setAlpha(this.logoAlpha);
        this.logoDelay = 0;

        //Booleano que dispara escena
        this.NextScene=false;

        //creación de botones
        this.modoHistoria = this.add.image(1000, 250, 'btn1-menu1').setInteractive();
        this.modoHistoria.on('pointerdown', function (event) {
            this.scene.start( this.temporalScenePoint);
        }, this);
        this.modoMultiplayer = this.add.image(1000, 350, 'btn2-menu1').setInteractive();
        this.modoMultiplayer.on('pointerdown', function (event) {
            this.scene.start( this.temporalScenePoint);
        }, this);
        this.settings = this.add.image(1000, 450, 'btn3-menu1').setInteractive();
        this.settings.on('pointerdown', function (event) {
            this.scene.start( this.temporalScenePoint);
        }, this);

    }

    update(time,delta)
    {
        //Comparacion que da un offset de 10 para iniciar la animación
        if(this.logoDelay<20)
        {
            this.logoDelay+=1;
        }else{
            //Animación del logo inicio
            if(this.logoAlpha<1)
            {
                this.logoAlpha+=0.05;
                this.logo.setAlpha(this.logoAlpha);
            }
        }

        //fin del ciclo update
    }
}