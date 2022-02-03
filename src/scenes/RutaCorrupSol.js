import {fwidth, fheight, centerw, centerh, centerhroad} from '../ENV.js';
import {game} from '../index.js';



export class RutaCorrupsol extends Phaser.Scene{
    
    constructor(){
        super({key:"RutaCorrupsol", active:false});
        this.speed = 1;
        //Variables para intentar crear el hueco al Azar
        this.createTramp = true;
        this.checkcamera3DForElement1 = false;
        //Variable para hacer la animación del choque
        this.isDefeated = false;
        //Limites para el carro (el personaje del usuario)
        this.leftLimit = 100;
        this.rightLimit = 900;
        //Puntaje
        this.score = 0;
        //Oportunidades
        this.opportunities=7;
        this.master_method = 0;
        //Variables que manejan la presentación por 3 secuencias
        this.update_secuence = 1;
        this.timer_update = 0;
       
    }

    init(data)
    {
        this.votos = data.votos;
        this.niveles_dictonary = data.niveles_dictonary;
    }

    preload()
    {
        this.load.image('bg-corrupsol', './assets/rutacorrupsol/bg-corrupsol.jpg');
        this.load.atlas('rc-ruta2', './assets/rutacorrupsol/carretera-v02.png','./assets/rutacorrupsol/bg-road-atlas.json');
        this.load.atlas('rc-palmeras', './assets/rutacorrupsol/palmeras.png','./assets/rutacorrupsol/palmeras.json');
        this.load.atlas('spritecar','./assets/rutacorrupsol/sprite-car.png','./assets/rutacorrupsol/spritecar-atlas.json');
        this.load.image('rc-car', './assets/rutacorrupsol/car-test.png');
        this.load.image('rc-hueco', './assets/rutacorrupsol/hueco.png');
        this.load.atlas('rc-title', './assets/rutacorrupsol/allframes_rutaCorrupsol.png','./assets/rutacorrupsol/title_rc_anim.json');
        this.load.scenePlugin('Camera3DPlugin', './src/js/camera3d.min.js', 'Camera3DPlugin', 'cameras3d');

    }
    create()
    {
        //Animación de la carretera
        this.background = this.add.tileSprite(centerw,centerh,game.config.width,game.config.height,'bg-corrupsol');
        this.carretera = this.add.sprite(0,centerhroad+5,'rc-ruta2','cposition1.png');
        this.palmeras = this.add.sprite(-200,centerhroad-200,'rc-palmeras','palm-rc0x.png');
        this.carreteraAnimA = true;
        this.carrteraAnimB = false;
        //Animación de presentación
        this.title = this.add.sprite(0,centerh-300,'rc-title','title_rc0x.png');

        this.anims.create({
            key:'road-a',
            repeat:-1,
            frameRate:12,
            frames:this.anims.generateFrameNames('rc-ruta2',{
                prefix:'cposition',
                suffix:'.png',
                start:0,
                end:2
            })
        });

        this.anims.create({
            key:'title-rc',
            repeat:-1,
            frameRate:12,
            frames:this.anims.generateFrameNames('rc-title',{
                prefix:'title_rc',
                suffix:'x.png',
                start:0,
                end:7
            })
        });

        this.anims.create({
            key:'palmeras-rc',
            repeat:-1,
            frameRate:12,
            frames:this.anims.generateFrameNames('rc-palmeras',{
                prefix:'palm-rc',
                suffix:'x.png',
                start:0,
                end:1
            })
        });

        this.anims.create({
            key:'palmeras-rc2',
            repeat:-1,
            frameRate:24,
            frames:this.anims.generateFrameNames('rc-palmeras',{
                prefix:'palm-rc',
                suffix:'x.png',
                start:0,
                end:1
            })
        });

        this.carretera.play({ key: 'road-a', repeat: -1 });
        this.title.play({key: 'title-rc', repeat: 0});
        this.palmeras.play({key: 'palmeras-rc', repeat: -1});

    }

    update(time,delta)
    {        
        console.log(delta);
        //Revisa secuencia para ver si ya presentó el título
        //update_secuence = 0 significa que todavía no ha terminado el tiempo de la presentación
        if(this.update_secuence == 0)
        {
            this.timer_update += delta;
            //Revisa si ya han pasado 2 segundos (o 2.000 milisegundos)
            //Para cambiar a la secuencia de pseudocrear
            if(this.timer_update>=2000)
            {
                this.update_secuence=1;
            }
        }    
        
        if(this.update_secuence==1)
        {
            this.title.destroy();
            this.pseudocreate();
            this.update_secuence = 2;
        }

        if(this.update_secuence==2)
        {
            this.pseudoupdate(delta);
        }
    }
    //PseudoCreate: Create cicle for gaming
    // This method goes after the process presentation of the game
    pseudocreate(){
        
        //Crear el personaje como carro
        //Set Depth permite manejar las capas
        this.carcharacter = this.physics.add.sprite(400,590,"spritecar","carsprite1-1.png");
        this.carcharacter.setScale(2.5,2.5);
        this.carcharacter.body.setSize(80,20);
        this.carcharacter.setDepth(3);
        
        
        //Logica de crear las trampas, el elemento0 es el carro de la maquina, elemento1 es el hueco que aparece al azar
        this.createElement0();
        this.tryToCreateElement1();

       

        this.anims.create({
            key:'road-b',
            repeat:-1,
            frameRate:24,
            frames:this.anims.generateFrameNames('rc-ruta2',{
                prefix:'cposition',
                suffix:'.png',
                start:0,
                end:2
            })
        });
      

        this.anims.create({
            key:'spritecar-a',
            repeat:-1,
            frameRate:24,
            frames:this.anims.generateFrameNames('spritecar',{
                prefix:'carsprite1-',
                suffix:'.png',
                start:0,
                end:2
            })
        });

        this.anims.create({
            key:'spritecar-r',
            repeat:-1,
            frameRate:24,
            frames:this.anims.generateFrameNames('spritecar',{
                prefix:'carsprite2-',
                suffix:'.png',
                start:0,
                end:3
            })
        });

        this.anims.create({
            key:'spritecar-l',
            repeat:-1,
            frameRate:24,
            frames:this.anims.generateFrameNames('spritecar',{
                prefix:'carsprite3-',
                suffix:'.png',
                start:0,
                end:3
            })
        });
       

        
        this.carcharacter.play({ key: 'spritecar-a', repeat: -1 });

        this.cursor = this.input.keyboard.createCursorKeys();
        //Texto que lleva el tiempo
        this.textTime = this.add.text(centerw-100, 50, '02:59', { fontFamily: 'Bitwise, "Arial", Times, serif', fontSize: '5rem', color: '#ffd147'});
        //Texto que lleva el puntaje
        this.textScore = this.add.text(100, 50, '02:59', { fontFamily: 'Bitwise, "Arial", Times, serif', fontSize: '2rem', color: '#ffffff'});
        this.textOppor = this.add.text(centerw + 200, 50, 'Vidas: 7', { fontFamily: 'Bitwise, "Arial", Times, serif', fontSize: '2rem', color: '#ffffff'});
        //Variables del tiempo
        this.minutes = 0;
        this.seconds = 59;
        this.miliseconds = 1000;

    }
    //-------------------------------------------
    //-------End PseudoCreate Method -----------

    
    //PseudoUpdate: Normal cicle Update for gaming 
    // This method goes after the process presentation of the game and after PseudoCreate
    pseudoupdate(delta){
        //Logica de pseudocamaras
        this.camera3Deffect();

        this.controlCar();
        //Logica de manejar el cronometro del juego
        this.miliseconds -= delta;
        //Logica de los textos que ve el usuario
        this.printScoreText();
        this.printTimeText();
        //Revisa si tiene que crear el hueco, porque se tiene que hacer al AZAR
        this.tryToCreateElement1();
        //fin del ciclo update
    }

    //Camera 3D methods
    camera3Deffect(){
        this.camera3D_element0();
        //Revisa si el hueco fue creado para hacer un efecto de 3D
        if(this.checkcamera3DForElement1)
        {
            this.camera3D_element1();
        }
        
    }

    camera3D_element0(){
        if(this.transformScale<2)
        {
            this.transformScale += 0.025*this.speed;
            this.elemento.y+=5*this.speed;
            this.elemento.x+=this.posx/40;
            this.elemento.setScale(this.transformScale,this.transformScale);
        }else{
            this.elemento.destroy();
            this.score += this.scoreElement0;
            this.createElement0();
        }
    }

    camera3D_element1(){
        if(this.transformScale1<2)
        {
            this.transformScale1 += 0.015*this.speed;
            this.elemento1.y+=5*this.speed;
            this.elemento1.x+=-10/40;
            this.elemento1.setScale(this.transformScale1,this.transformScale1);
        }else{
            this.elemento1.destroy();
            this.score += this.scoreElement1;
            this.checkcamera3DForElement1 = false;
            this.createTramp = true;
            this.tryToCreateElement1();
        }
    }

    tryToCreateElement1(){
        let lucky =Math.floor(Math.random()*100);
        if(lucky<2 && this.createTramp)
        {
            this.createElement1();
            this.createTramp = false;
            this.checkcamera3DForElement1 = true;
        }
    }

    createElement0(){
        this.posx =Math.random()*200 -50;
        this.elemento = this.physics.add.image(centerw+this.posx, centerhroad, 'rc-car');
        this.elemento.setDepth(2);
        this.elemento.setScale(0.25,0.25);
        this.transformScale = 0.25;
        this.scoreElement0 = 50;
        this.physics.add.collider(this.carcharacter, 
            this.elemento,
             function(){
                this.scoreElement0 = -50;
                this.defeatLogic();
             },
             null,
            this);
    }

    createElement1(){
        let lucky =Math.floor(Math.random()*100);
        this.posx1 = 400;
        if(lucky<=50)
        {
            this.posx1 = 300;
        }else{
            this.posx1 = 900;
        }
        
        this.elemento1 = this.physics.add.image(this.posx1, centerhroad, 'rc-hueco');
        this.elemento1.setScale(0.25,0.25);
        this.transformScale1 = 0.15;
        this.scoreMinus = true;
        this.scoreElement1 = 50;
        this.physics.add.collider(this.carcharacter, 
            this.elemento1,
             function(){
                this.scoreElement1= -50;
                this.opportunities -=1;
                 this.defeatLogic();
             },
             null,
            this);
    }

    printTimeText(){
        if(this.miliseconds < 0)
        {
            this.miliseconds = 1000;
            this.seconds -=1;
            if(this.seconds < 0)
            {
                this.minutes -=1;
                this.seconds =59;
            }
            
            if(this.minutes <= 0 && this.seconds <= 0)
            {
                //Secuencia de game over
                // const enviar_data es lo que debe recibir cada escena para iniciar
                this.niveles_dictonary['nivel1'] = false;
                this.votos+=this.score;
                const enviar_data =  {votos: this.votos, niveles_dictonary: this.niveles_dictonary};
                this.scene.start('Status',enviar_data);
            }

            //Se coloca este condicional con el fin de cuando los segundos sean
            // menor a 10 se muestre un 0 al lado de los segundos
            if(this.seconds >= 10)
            {
                this.textTime.setText('0'+this.minutes+':'+this.seconds);
            }else{
                this.textTime.setText('0'+this.minutes+':0'+this.seconds);
            }
        }
    }

    printScoreText()
    {
        this.textScore.setText('Puntaje: '+this.score);
    }
    //Funcion sobre la animacion del carro cuando choca
    defeatLogic(){
        if(this.carcharacter.x >= centerw)
        {
            this.carcharacter.x-=200;
        }else{
            this.carcharacter.x+=200;
        }

    }

    controlCar(){

        //Inicio de controles 
            if(this.cursor.left.isDown)
            {
                if(this.carcharacter.x >= this.leftLimit)
                {
                    this.carcharacter.x-=10;
                }
                this.carcharacter.play({ key: 'spritecar-l', repeat: 1 });
            }
            
            if(this.cursor.right.isDown)
            {
                if(this.carcharacter.x <= this.rightLimit)
                {
                    this.carcharacter.x+=10;
                }
                this.carcharacter.play({ key: 'spritecar-r', repeat: 1 });
            }

            if(!this.cursor.left.isDown && !this.cursor.right.isDown)
            {
                this.carcharacter.play({ key: 'spritecar-a', repeat: -1 });
            }

            if(this.cursor.up.isDown)
            {
                if(this.speed < 2)
                {
                    this.speed+=0.05;
                }
            }else{
                if(this.speed>1)
                {
                    this.speed-=0.1;
                }
            }

            if(this.speed>2 && this.carreteraAnimA)
            {
                this.carretera.play({ key: 'road-b', repeat: -1 });
                this.palmeras.play({key: 'palmeras-rc2', repeat: -1})
                this.carreteraAnimA = false;
                this.carreteraAnimB = true;
            }

            if(this.speed<1.5 && this.carreteraAnimB)
            {
                this.carretera.play({ key: 'road-a', repeat: -1 });
                this.palmeras.play({key: 'palmeras-rc', repeat: -1})
                this.carreteraAnimA = true;
                this.carreteraAnimB = false;
            }
             //Fin de controles
             
    }
}