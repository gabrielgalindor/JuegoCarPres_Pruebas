import {escenaMenu1} from './scenes/escenamenu1.js';
import {escenaIntro} from './scenes/escenaPresentacion.js';
import {escenaLobby} from './scenes/escenaLobby.js';
import {RutaCorrupsol} from './scenes/RutaCorrupSol.js';
import {BallenasChoko} from './scenes/BallenasChoko.js';
import {escena_personaje} from './scenes/choiceCharacter.js';
import {draw_personaje} from './scenes/choiceCharacter.js';
import {Status} from './scenes/status.js';
import {fwidth, fheight, centerw, centerh} from './ENV.js';

/* 
	Main project
*/


const config ={
	width: fwidth,
	height: fheight,
	parent:"container",
	type: Phaser.AUTO,
	physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
	scene:[escena_personaje, draw_personaje]
}


export var game = new Phaser.Game(config);
