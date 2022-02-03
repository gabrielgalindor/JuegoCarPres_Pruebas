import {fwidth, fheight, centerw, centerh, centerhroad} from '../ENV.js';
import {game} from '../index.js';



export class BallenasChoko  extends Phaser.Scene{
    
    constructor(){
        super({key:"BallenasChoko", active:false});
        this.speed = 1;
        this.seaObjects = [];
        this.CreateSeaObject = false;
        this.CreateSeaTimer = 0;
        //test
        //Variables que manejan la presentación por 3 secuencias
        this.update_secuence = 0;
        this.timer_update = 0;

        //Variables de puntaje
        this.score = 0;

        //Variables de manejo de los sprites
        this.velocidad_caida = 5;
        this.limiteY = 720;
        //Delay principal que distancia la creación de basura en segundos
        this.delay_basura = 5;
        this.call_basura_seconds = 5;
        this.primer_cambio = 28;
        this.primer_cambio_flag = true;
        this.segundo_cambio = 30;
        this.segundo_cambio_flag = false;
        //Limites para el carro (el personaje del usuario)
        this.leftLimit = 100;
        this.rightLimit = 900;

    }

    preload()
    {
        this.load.image('bg-ballenaschoco','./assets/ballenaschoco/background.jpg');
        this.load.image('seaballenas','./assets/ballenaschoco/sea8bits.jpg');
        this.load.image('whale', './assets/ballenaschoco/whal02.png');
        this.load.image('mountains', './assets/ballenaschoco/layer2.png');
        this.load.image('leaves', './assets/ballenaschoco/layer_front.png');
        //Cargar imagenes 
        this.load.image('basura1', './assets/ballenaschoco/basura1.png');
        this.load.image('basura2', './assets/ballenaschoco/basura2.png');
        this.load.image('basura3', './assets/ballenaschoco/basura3.png');

        this.load.image('barco','./assets/ballenaschoco/barco.png');

        this.load.atlas('title-choko','./assets/ballenaschoco/title-choko.png','./assets/ballenaschoco/title-choko.json');
    }
    create()
    {
        this.background_layer = this.add.layer();
        this.front_layer = this.add.layer();

        this.background = this.add.tileSprite(centerw,centerh,game.config.width,game.config.height,'bg-ballenaschoco');
        this.mountains = this.add.tileSprite(0,centerh+120,2711,204,'mountains');
        this.sea = this.add.tileSprite(0,centerh+200,2711,204,'seaballenas');
        this.leaves = this.add.tileSprite(0,0,2711,204,'leaves');
        this.seaObjects.push("1");

        this.title = this.add.sprite(200,centerh-300,'title-choko','titleChoko0.png');

        this.anims.create({
            key:'title-choko',
            repeat:-1,
            frameRate:24,
            frames:this.anims.generateFrameNames('title-choko',{
                prefix:'titleChoko',
                suffix:'.png',
                start:0,
                end:4
            })
        });

        this.title.play({ key: 'title-choko', repeat: -1 });
    }

    update(time,delta)
    {        
        this.backgroundHandler();
        this.seaHandler();

        //Revision de secuencias
        //Secuencia = 0 --- Realiza la presentacion
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
    //Método que remplaza la función del método create
    pseudocreate(){
        // Creación de textos de score y tiempo 
        this.textTime = this.add.text(centerw-100, 50, '02:59', { fontFamily: 'Bitwise, "Arial", Times, serif', fontSize: '5rem', color: '#fdaffc', stroke: "#0000fa", strokeThickness :2});
        this.textScore = this.add.text(100, 50, 'Puntaje: 0', { fontFamily: 'Bitwise, "Arial", Times, serif', fontSize: '2rem', color: '#ffffff', stroke: "#0000fa", strokeThickness :2});
        
        //Variables del tiempo
        this.minutes = 1;
        this.seconds = 59;
        this.miliseconds = 1000;

       
        
        //Array de sprites clicleables (Basuras) que obtendrán los puntajes
        this.basuras = [];
        

        //Crea la opcion de usar el teclado
        this.cursor = this.input.keyboard.createCursorKeys();

        this.barco = this.physics.add.sprite(400,480,"barco");
        // Set el tamano del Collider
        this.barco.body.setSize(297,50);
        // Set la posición del collider
        this.barco.body.setOffset(0,250);
    }
    //Método que remplaza la función normal del Update
    pseudoupdate(delta){
        this.miliseconds -= delta;
        this.printTimeText();

        //Controles del barco 
        this.controlBarco();

        /* Se llama el método que sigue la lógica que maneja el array de las basuras
           con el fin de revisar si lo puede eliminar o continúa la animación
        */
        this.secuenciaBasura();
        //Revisa si tiene que crear un nuevo elemento de basura
        //Este contador está basado en this.call_basura_seconds
        if(this.crear_basura)
        {
            this.createBasura();
        }
    }
    controlBarco(){
        if(this.cursor.left.isDown)
        {
            if(this.barco.x >= this.leftLimit)
            {
                this.barco.x-=10;
            }
        }

        if(this.cursor.right.isDown)
        {
            if(this.barco.x <= this.rightLimit)
            {
                this.barco.x+=10;
            }
        }
    }
    //Todos los siguientes métodos están relacionados al ciclo del minijuego

    //Metodo que permite crear los objetos clicleables
    createBasura(){
        console.log("Se creo basura");
        let lucky =Math.floor(Math.random()*300);
        let lucky_x = Math.floor(Math.random()*700);
        let texture_string = 'basura1';
        if(lucky < 100)
        {
            texture_string = 'basura1';
        }

        if(lucky >= 100 && lucky < 200)
        {
            texture_string = 'basura2';
        }

        if(lucky >= 200 && lucky <= 300)
        {
            texture_string = 'basura3';
        }
        //Crea Sprite con física de imagen
        let basura1 = this.physics.add.image(50+lucky_x, 100, texture_string).setInteractive();
        basura1.setScale(0.30);
        console.log(this.score);
        this.physics.add.collider( basura1, 
            this.barco,
             function(){
                basura1.destroy();
                this.score +=10;
                this.textScore.setText('Puntaje: '+this.score);
             },
             null,
            this);
        basura1.on('pointerdown', (pointer) => {

            basura1.destroy();
            this.score +=10;
            this.textScore.setText('Puntaje: '+this.score);
        }, this);
        this.basuras.push(basura1);
        this.crear_basura = false;
    }

    secuenciaBasura(){
        let array_pointer = 0;
        //Velocidad de la caida
        this.basuras.forEach((item, index, object)=> {
            item.y+=this.velocidad_caida;
            //limite de caida
            if(item.y>this.limiteY)
            {
                item.destroy();
                object.splice(index,1);
            }
        });
    }

    backgroundHandler()
    {
        //Efecto de mover el fondo
        this.background.tilePositionX +=1*this.speed;
        this.mountains.tilePositionX +=0.25*this.speed;
        this.sea.tilePositionX +=10*this.speed;
    }
    seaHandler()
    {
        if(this.CreateSeaTimer<100)
        {
            this.CreateSeaTimer+=1;
        }else{
            
            this.CreateSeaTimer=-100;
        }

        let index = 0;

        this.seaObjects.forEach(element => {
               if(index!=0)
               {
                   element.x+=10*this.speed;
                   if(element.x>1400)
                   {
                       element.destroy();
                       this.removeElementSea(element);
                   }
               }
               index+=1;
        });
    }
    removeElementSea(ELEMENT)
    {
        let isFind = this.seaObjects.indexOf(ELEMENT);
        this.seaObjects.splice(isFind,1);
    }

    printTimeText(){
        if(this.miliseconds < 0)
        {
            this.miliseconds = 1000;
            this.seconds -=1;
            this.call_basura_seconds-=1;
            if(this.seconds < 0)
            {
                this.minutes -=1;
                this.seconds =59;
            }
           

            //Se coloca este condicional con el fin de cuando los segundos sean
            // menor a 10 se muestre un 0 al lado de los segundos
            if(this.seconds >= 10)
            {
                this.textTime.setText('0'+this.minutes+':'+this.seconds);
            }else{
                this.textTime.setText('0'+this.minutes+':0'+this.seconds);
            }

             //Contador de llamar la creación de nueva basura
             if(this.call_basura_seconds<=0)
             {
                 this.call_basura_seconds = this.delay_basura;
                 this.crear_basura = true;
             }
             //Detecta si ya pasó el tiempo para acelerar el juego
            if(this.primer_cambio_flag)
            {
                
                if(this.primer_cambio>0)
                {
                    this.primer_cambio-=1;
                }else{
                    //Acelerar el juego
                    this.delay_basura=2;
                    this.velocidad_caida+=3;
                    this.primer_cambio_flag=false;
                    this.segundo_cambio_flag = true;
                }
            }
            //Detecta si ya paso el segundo tiempo para acelerar el juego
            if(this.segundo_cambio_flag)
            {
                if(this.segundo_cambio>0)
                {
                    this.segundo_cambio-=1;
                }else{
                    this.delay_basura=1;
                    this.velocidad_caida+=4;
                    this.segundo_cambio_flag=false;
                }
            }


        }
    }
}