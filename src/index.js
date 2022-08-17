import {escenaMenu1} from './scenes/escenamenu1.js';
import {escenaIntro} from './scenes/escenaPresentacion.js';
import {escenaLobby} from './scenes/escenaLobby.js';
import {ProfileLoad} from './scenes/ProfileLoad.js';
import {fwidth, fheight, centerw, centerh} from './ENV.js';

//Configuracion juego Phaser 3

const config ={
	width: fwidth,
	height: fheight,
	parent:"container",
	type: Phaser.AUTO,
	physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
	scene:[escenaIntro,escenaLobby,escenaMenu1, ProfileLoad]
}


export var game = new Phaser.Game(config);
