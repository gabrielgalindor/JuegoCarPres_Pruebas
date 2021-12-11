

export class escenaLobby extends Phaser.Scene{
    constructor(){
        super({key:"Lobby", active:false});
    }
    preload()
    {
        // this.load.image('caminos', './assets/caminos.png'); 
        // this.load.image('puertas', './assets/puertas.png');
        // this.load.atlas('personaje', './assets/sprite1.png','./assets/sprite1atlas.json');
        // this.load.image('bloques', './assets/bloquesAvion.png');

        // // this.load.atlas('personaje', './assets/sprite1.png','./assets/sprite1atlas.json');
        // // this.load.image('block', './assets/carro.png');

        this.load.image('tiles', 'assets/map/lobby.png');
        
        
        this.load.tilemapTiledJSON('map', 'assets/map/lobby.json');
        
        
        this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });

    }
    create()
    {
        

        // this.cameras.main.setBounds(0, 0, 1024, 2048);
    
    
        // var block = this.physics.add.staticImage(0, 0, 'bloques').setOrigin(0);
        // this.add.image(0, 0, 'caminos').setOrigin(0);
        // this.personaje = this.physics.add.sprite(160,230,"personaje","s0.png").setScale(0.5);
        // this.add.image(0, 0, 'puertas').setOrigin(0);

        // // var block = this.physics.add.staticImage(300, 300, 'block');
        // // // block.setCollisionByExclusion([-1]);
        // // this.personaje = this.physics.add.sprite(160,230,"personaje","s0.png").setScale(0.5);
        // this.physics.add.collider( this.personaje, block);
        
        // // var collider = this.physics.add.overlap(this.personaje, this.block, function ()
        // // {
        // // // marioOnBlock.body.stop();

        // // this.physics.world.rfemoveCollider(collider);
        // // }, null, this);

        // //Comentar
        

        // this.cameras.main.setZoom(1);
        // this.cameras.main.centerOn(80, 160);
        
        // console.log(this.cameras.main.getScroll(767, 1096));
            
        // this.text = this.add.text(304, 230).setText('Testeado Ms Bot');
        // this.text.setShadow(1, 1, '#000000', 2);
        
        // this.cursor = this.input.keyboard.createCursorKeys();
        // this.panx = 5;
        // this.pany= 5;

        // this.anims.create({
        //     key:'walk',
        //     repeat:-1,
        //     frameRate:24,
        //     frames:this.anims.generateFrameNames('personaje',{
        //         prefix:'s',
        //         suffix:'.png',
        //         start:0,
        //         end:2
        //     })
        // });
        
        var map = this.make.tilemap({ key: 'map' });
        
        
        var tiles = map.addTilesetImage('lobby', 'tiles');
        
        
        var grass = map.createStaticLayer('Caminos', tiles, 0, 0);
        var obstacles = map.createStaticLayer('Obstaculos', tiles, 0, 0);
        this.minGame1 = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        this.minGame2 = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        this.minGame3 = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        // this.start1 = map.createDynamicLayer('Start1', tiles, 0, 0);
        // // var start2 = map.createStaticLayer('Start2', tiles, 0, 0).setOrigin(0).setInteractive();
        // // var start3 = map.createStaticLayer('Start3', tiles, 0, 0).setOrigin(0).setInteractive();
        // // this.spawns = this.physics.add(start1);
        
        
        obstacles.setCollisionByExclusion([-1]);
        // start1.setCollisionByExclusion([0]);
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13]}),
            frameRate: 10,
            repeat: -1
        });
        
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
            frameRate: 10,
            repeat: -1
        });        

        
        this.player = this.physics.add.sprite(800, 1500, 'player', 6).setScale(2);

        var door = map.createStaticLayer('Puertas', tiles, 0, 0);

        // var tile = this.start1.getTileAtWorldXY(this.player.x, this.player.y);
        // if (tile == 1) {
        //     console.log('start');
        // };

        // this.physics.overlapTiles(this.player, this.start1, function () {
        //     console.log('start');
        // });

        // this.physics.add.collider( this.player, start1);

        // this.physics.add.overlap(this.player, this.start1, function() {
        //     console.log('start1')
        // }, false, this);

        // this.physics.add.overlap(this.player, start1, function (block){
        //     block.body.stop();
		//     console.log('detenido');
        //     }, null, this);

        // start1.on('videojuego1', function() {
        //     console.log('escena activa');
        // },this);

        
        
        
    
        // if (this.physics.add.overlap( this.player, this.spawns1)) {
        //     // this.scene.start('videojuego1')
        //     console.log('se activo escena')
        // }
        
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);
        
        
        this.physics.add.collider(this.player, obstacles);

        
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true; 
        this.cameras.main.setZoom(1.2);
    
        
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // var start1 = this.findObjectsByType('start1', map)[0];
        // var start2 = this.findObjectsByType('start2', map)[0];
        // var start3 = this.findObjectsByType('start3', map)[0];

       

        this.minGame1.create(200, 265, 32, 4);
        this.minGame2.create(425, 265, 32, 4);
        this.minGame3.create(600, 265, 32, 4);
        // this.spawns.create(start2.x, start2.y, 16, 16); 
        // this.spawns.create(start3.x, start3.y, 16, 16); 
        
        // this.physics.add.overlap(this.player, this.spawns1, this.startMinGame, null, this);
        this.physics.add.overlap(this.player, this.minGame1, this.playMinGame1, null, this);
        this.physics.add.overlap(this.player, this.minGame2, this.playMinGame2, null, this);
        this.physics.add.overlap(this.player, this.minGame3, this.playMinGame3, null, this);

    }

    playMinGame1() { 
        this.scene.start('Status', {votos: 0, niveles_dictonary: {'nivel1': true, 'nivel2': true}}); 
    }

    playMinGame2() { 
        this.scene.start('Status', {votos: 0, niveles_dictonary: {'nivel1': true, 'nivel2': true}}); 
    }
    
    playMinGame3() { 
        this.scene.start('Status', {votos: 0, niveles_dictonary: {'nivel1': true, 'nivel2': true}}); 
    }
    // findObjectsByType(type, tilemap, layer) {
    //     const result = [];

    //     tilemap.objects.forEach(function (element) {
    //         if (element.name === 'startMinGames') {
    //             element.objects.forEach(function (element2) {
    //                 if (element2.type === type) {
    //                     element2.y -= tilemap.tileHeight;
    //                     result.push(element2);
    //                 }
    //             });
    //         }
    //     });
    //     return result;
    // }

    // playerAlcanzaMeta() {

    //     this.scene.start('SosAmazonas');

    //     // if (i==1) {
    //     //     this.scene.start('SosAmazonas');
    //     // } 

    //     // if (i==2) {
    //     //     this.scene.start('RutaCorrupsol');
    //     // } 

    //     // if (i==3) {
    //     //     this.scene.start('SalvemosBallenas');
    //     // } 
        
    // }
    // startMinGame(){
    //     console.log('hola');
    // }

    update(time,delta)
    {
        // const cam = this.cameras.main;
        // this.personaje.body.setVelocity(0);  
        // //Pan Y
        // if(this.cursor.down.isDown)
        // {
        //     this.pany+=1;
        //     this.personaje.y+=1;
        //     cam.pan(this.panx,this.pany,30);
        //     this.personaje.body.setVelocityY(80);
            
        // }
        // if(this.cursor.up.isDown)
        // {
        //     this.pany-=1;
        //     this.personaje.y-=1;
        //     cam.pan(this.panx,this.pany,30);
        //     this.personaje.body.setVelocityY(-80);
       
        // }
        // //Pan X
        // if(this.cursor.left.isDown)
        // {
        //     this.panx-=1;
        //     this.personaje.x-=1;
        //     cam.pan(this.panx,this.pany,30);
        //     this.personaje.body.setVelocityX(-80);
         
        // }
        // if(this.cursor.right.isDown)
        // {
        //     this.panx+=1;
        //     this.personaje.x+=1;
        //     cam.pan(this.panx,this.pany,30);
        //     this.personaje.body.setVelocityX(80);
           
        // }
        // this.text.setText(['Click to move', 'x: ' + cam.scrollX, 'y: ' + cam.scrollY ]);

        // if (this.x<0)
        // {
        //     this.x=0;
        // }

        // if(this.y<0)
        // {
        //     this.y=0;
        // }
        
        // cam.pan(this.panx,this.pany,30);

        this.player.body.setVelocity(0);

     
        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-100);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(100);
        }

        
        if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-100);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(100);
        }        

        
        if (this.cursors.left.isDown)
        {
            this.player.anims.play('left', true);
            this.player.flipX = true;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.anims.play('right', true);
            this.player.flipX = false;
        }
        else if (this.cursors.up.isDown)
        {
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.anims.play('down', true);
        }
        else
        {
            this.player.anims.stop();
        }
    }
}


// class FinEscena extends Phaser.Scene {
//     constructor() {
//         super({
//             key: 'finScene'
//         });
//     }
//     preload() {
//         this.load.image('fin', 'assets/game-over.jpg');
//     }

//     create() {
//         this.add.image(480, 320, 'fin');
//     }
// }



class minGame1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'SosAmazonas'
        });
    }
    preload() {
        this.load.image('fin1', 'assets/sosAmazonas.jpg');
    }

    create() {
        this.add.image(400, 300, 'fin1');
    }
}

class minGame2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'RutaCorrupsol'
        });
    }
    preload() {
        this.load.image('fin2', 'assets/rutaCorrupsol.jpg');
    }

    create() {
        this.add.image(400, 300, 'fin2');
    }
}


class minGame3 extends Phaser.Scene {
    constructor() {
        super({
            key: 'SalvemosBallenas'
        });
    }
    preload() {
        this.load.image('fin3', 'assets/salvemosBallenas.jpg');
    }

    create() {
        this.add.image(400, 300, 'fin3');
    }
}

