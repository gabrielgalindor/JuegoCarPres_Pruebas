import {imageconst} from '../js/imageconst.js';
import {fwidth, fheight, centerw, centerh} from '../ENV.js';
import {game} from '../index.js';

export class Status extends Phaser.Scene{
    constructor(){
        super({key:"Status", active:false});
        this.temporalScenePoint= "Lobby";
    }

    init(data)
    {
        this.votos = data.votos;
        this.niveles_dictonary = data.niveles_dictonary;
    }

    preload()
    {
        this.load.image('statusBackground', 'assets/status/background.jpg');
        this.load.image('statusBtn', 'assets/status/button.png');
        this.load.image('MapaIcon', 'assets/status/mapa1.png');

        
        //this.votos = 5;
        //this.niveles_dictonary = {'nivel1': true, 'nivel2': true};
    }
    create()
    {
        this.background1 = this.add.tileSprite(centerw,centerh,game.config.width,game.config.height,'statusBackground');
        this.mapIcon = this.add.tileSprite(263,380,525,682,'MapaIcon');
        //Textos
        this.texTitle = this.add.text(650, 20, 'Escoge un juego', { fontFamily: 'Bitwise, "Arial", Times, serif', fontSize: '4rem', color: '#ffffff', stroke: "#0000fa", strokeThickness :2});
        this.texTitle = this.add.text(650, 120, 'Votos Conseguidos: '+ this.votos, { fontFamily: 'Bitwise, "Arial", Times, serif', fontSize: '2rem', color: '#ffffff', stroke: "#0000fa", strokeThickness :2});

        if(this.niveles_dictonary['nivel1'])
        {
            this.texTitle = this.add.text(725, 200, 'Ruta Corrupsol', { fontFamily: 'Bitwise, "Arial", Times, serif', fontSize: '3rem', color: '#fad08f', stroke: "#0000fa", strokeThickness :2});
            this.nivel1 = this.add.sprite(900, 300, 'statusBtn').setInteractive();
            
            this.nivel1.on('pointerdown', (pointer) => {
                const enviar_data =  {votos: this.votos, niveles_dictonary: this.niveles_dictonary};
                this.scene.start('RutaCorrupsol',enviar_data);
            }, this);
        }

        if(this.niveles_dictonary['nivel2'])
        {
            this.texTitle = this.add.text(625, 500, 'Salvar Ballenas Choko', { fontFamily: 'Bitwise, "Arial", Times, serif', fontSize: '3rem', color: '#fad08f', stroke: "#0000fa", strokeThickness :2});
            this.nivel2 = this.add.sprite(900, 600, 'statusBtn').setInteractive();
            this.nivel2.on('pointerdown', (pointer) => {
                const enviar_data =  {votos: this.votos, niveles_dictonary: this.niveles_dictonary};
                this.scene.start('BallenasChoko',enviar_data);
            }, this);
        }

        
    }

    update(time,delta)
    {
        //Comparacion que da un offset de 10 para iniciar la animación
        this.background1.tilePositionY+=2;
        this.background1.tilePositionX-=5;

        //fin del ciclo update
    }
}