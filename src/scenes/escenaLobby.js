class escenaLobby extends Phaser.Scene{
    constructor(){
        super({key:"Lobby", active:true});
    }
    preload()
    {
        this.load.image('map', './assets/fondo1.png');

    }
    create()
    {
        alert("Se ha creado la Scena Lobby");

        this.cameras.main.setBounds(0, 0, 1024, 2048);
        this.add.image(0, 0, 'map').setOrigin(0);


        this.cameras.main.setZoom(4);
        this.cameras.main.centerOn(0, 0);
        
        console.log(this.cameras.main.getScroll(767, 1096));
            
        this.text = this.add.text(304, 230).setText('Testeado Ms Bot').setScrollFactor(0);
        this.text.setShadow(1, 1, '#000000', 2);
        
        this.cursor = this.input.keyboard.createCursorKeys();
        this.panx = 0;
        this.pany= 0;


    }
    update(time,delta)
    {
        const cam = this.cameras.main;
        //Pan Y
        if(this.cursor.down.isDown)
        {
            this.pany+=1;
            
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
        
        cam.pan(this.panx,this.pany,20);
    }
}