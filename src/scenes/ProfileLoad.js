import {imageconst} from '../js/imageconst.js';
import {fwidth, fheight, centerw, centerh} from '../ENV.js';
import {game} from '../index.js';
import {escenaLobby} from './escenaLobby.js';

export class ProfileLoad extends Phaser.Scene{
    constructor(){
        super({key:"profileload", active:false});
        this.temporalScenePoint= "Lobby";
    }
    preload()
    {
        //Carga de imagenes
        //Fondo
        this.load.image('perfil_menu1', './assets/menu1/perfil_selector.jpg');
        //Sombrero Vueltiao
        this.load.image('logo_perfil', './assets/menu1/logo_perfil.png');
        //Botones
        this.load.image('facebook_btn', './assets/menu1/facebook_btn.png');
        this.load.image('google_btn', './assets/menu1/google_btn.png');
        this.load.image('tiktok_btn', './assets/menu1/tiktok_btn.png');
        this.load.image('default_btn', './assets/menu1/default_btn.png');

    }
    create()
    {
        //Cargando el fondo de pantalla del juego
        this.behind_back = this.add.tileSprite(centerw,centerh,game.config.width,game.config.height,'perfil_menu1');
        //Logo del sombrero
        this.logo =  this.add.image(640, 250, 'logo_perfil');
        this.logo.setScale(0.75);
        //Botones de Log In o Sign Up
        //Facebook
        this.facebookBtn =  this.add.image(160, 600, 'facebook_btn').setInteractive();
        this.facebookBtn.setScale(0.5);
        //Google
        this.googleBtn =  this.add.image(460, 600, 'google_btn').setInteractive();
        this.googleBtn.setScale(0.5);
        //Tik Tok
        this.tiktokBtn =  this.add.image(720, 600, 'tiktok_btn').setInteractive();
        this.tiktokBtn.setScale(0.5);
        //Nuestra propia BBDD
        this.ownBtn =  this.add.image(1020, 600, 'default_btn').setInteractive();
        this.ownBtn.setScale(0.5);
    }

    update(time,delta)
    {
        this.behind_back.tilePositionX+=1;
    }
}