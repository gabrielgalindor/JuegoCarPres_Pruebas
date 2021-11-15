import {escenaMenu1} from './scenes/escenamenu1.js';
import {escenaIntro} from './scenes/escenaPresentacion.js';
import {escenaLobby} from './scenes/escenaLobby.js';
import {RutaCorrupsol} from './scenes/RutaCorrupSol.js'
import {fwidth, fheight, centerw, centerh} from './ENV.js';


const config ={
	width: fwidth,
	height: fheight,
	parent:"container",
	type: Phaser.AUTO,
	physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
	scene:[escenaIntro,RutaCorrupsol, escenaLobby,escenaMenu1]
}


export var game = new Phaser.Game(config);
