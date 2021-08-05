class escenaLobby extends Phaser.Scene{
    constructor(){
        super({key:"Lobby", active:true});
    }
    preload()
    {
        this.load.image('map', './assets/fondo1.png');
        this.load.atlas('personaje', './assets/sprite1.png','./assets/sprite1atlas.json');

    }
    create()
    {
        

        this.cameras.main.setBounds(0, 0, 1024, 2048);
        this.add.image(0, 0, 'map').setOrigin(0);
        //Comentar
        this.personaje = this.add.sprite(75,15,"personaje","s0.png").setScale(0.5);

        this.cameras.main.setZoom(4);
        this.cameras.main.centerOn(0, 0);
        
        console.log(this.cameras.main.getScroll(767, 1096));
            
        this.text = this.add.text(304, 230).setText('Testeado Ms Bot').setScrollFactor(0);
        this.text.setShadow(1, 1, '#000000', 2);
        
        this.cursor = this.input.keyboard.createCursorKeys();
        this.panx = 5;
        this.pany= 5;

        this.anims.create({
            key:'walk',
            repeat:-1,
            frameRate:24,
            frames:this.anims.generateFrameNames('personaje',{
                prefix:'s',
                suffix:'.png',
                start:0,
                end:2
            })
        });
        


    }
    update(time,delta)
    {
        const cam = this.cameras.main;
        //Pan Y
        if(this.cursor.down.isDown)
        {
            this.pany+=1;
            this.personaje.y+=1;
            cam.pan(this.panx,this.pany,30);
            
        }
        if(this.cursor.up.isDown)
        {
            this.pany-=1;
       
        }
        //Pan X
        if(this.cursor.left.isDown)
        {
            this.panx-=1;
         
        }
        if(this.cursor.right.isDown)
        {
            this.panx+=1;
           
        }
        //this.text.setText(['Click to move', 'x: ' + cam.scrollX, 'y: ' + cam.scrollY ]);

        if (this.x<0)
        {
            this.x=0;
        }

        if(this.y<0)
        {
            this.y=0;
        }
        
        cam.pan(this.panx,this.pany,30);
    }
}