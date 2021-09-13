import {imageconst} from '../js/imageconst.js';
import {fwidth, fheight, centerw, centerh} from '../ENV.js';
import {game} from '../index.js';
import {escenaLobby} from './escenaLobby.js';


export class escenaIntro extends Phaser.Scene{
    constructor(){
        super({key:"intro", active:true});
        this.yellowbot = 0xFCCE1A;
    }
    preload()
    {
        this.load.image('background', './assets/intro/background.jpg');
        this.load.image('decorador-1', './assets/intro/decorador1.png');
        this.load.image('logo', './assets/intro/logo1.png');
        
        var progress = this.add.graphics();
        this.load.on('progress', function (value) {

            progress.clear();
            progress.fillStyle(this.yellowbot, 1);
            progress.fillRect(0, 270, 800 * value, 60);
    
        });
        

        this.load.video('intro', './assets/intro/intro_carrera_presidencial.mp4', 'loadeddata', true, true);
    }
    create()
    {

        this.background = this.add.tileSprite(centerw,centerh,game.config.width,game.config.height,'background');
        this.decorador1 = this.add.tileSprite(1000,600,194,194,'decorador-1');
        this.logo = this.add.tileSprite(0,0,640,200,'logo');

        //Alpha para manejar la opacidad del logo
        this.logoAlpha = 0.25;
        this.logo.setAlpha(this.logoAlpha);
        
        Phaser.Display.Align.In.Center(this.logo, this.add.zone(game.config.width/2, game.config.height/2,game.config.width,game.config.height));
        
        //---------------------- Colocar Texto -------
        //texto indicando que debe hacer clic
        this.info = this.add.text(centerw-170, 500, 'Haga clic para continuar', { font: '18px Karmatic Arcade', fill: '#074aaa' });
        //Contador para hacer un delay del texto
        this.textdelay = 0;
        //Booleano que permite hacerlo intermitente
        this.alphaBool = false;
        //Detecta los clic para hacer los cambios en la pantalla
        this.eventClic = 0;
        //Booleano para cambiar escena
        this.changeScene = false;


        //-------------------- Colocar video según el puntero----
        this.videoDuration = 0;
        //Detecta si el vídeo fue creado
        this.isCreatedVideo = false;
        this.input.on('pointerdown', function (pointer) {
            
            if(this.eventClic==0)
            {
                //----- Agregar video
                var vid = this.add.video(centerw, centerh, 'intro');
                vid.play(true);
                vid.setMute(false);
                vid.setPaused(false);
                // Colocamos el booleano de que se creo el vídeo
                this.isCreatedVideo = true;
                //---- Agregar nuevamente el texto
                this.info = this.add.text(centerw-170, 50, 'Haga clic para continuar', { font: '18px Karmatic Arcade', fill: '#ffffff' });
                this.info.setAlpha(0.25);
            }
            if(this.eventClic==1)
            {
                this.changeScene = true;
            }

            this.eventClic=1;

        }, this);

        
        
    }

    update(time,delta)
    {
        this.background.tilePositionY += 0.5;
        this.textdelay += 1;
        
        
        
        
        //Animación del logo inicio
        if(this.logoAlpha<1)
        {
            this.logoAlpha+=0.05;
            this.logo.setAlpha(this.logoAlpha);
        }

        if(this.textdelay>=10)
        {
            if(this.alphaBool)
            {
                this.info.setAlpha(1);
            }else{
                this.info.setAlpha(0.5);
            }

            this.alphaBool=!this.alphaBool;
            this.textdelay = 0;
        }

        if(this.changeScene)
        {
            
            this.scene.start("menu1");
        }

        //Proceso del vídeo
        if(this.isCreatedVideo)
        {
            this.videoDuration+=1;
            // Debuggear para captar la duración del vídeo
            //console.log("Video Duration: ");
            //console.log(this.videoDuration);
            if(this.videoDuration>750)
            {
                this.scene.start("menu1");
            }
        }

    }
}