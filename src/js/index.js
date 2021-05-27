const config ={
	width:800,
	height:600,
	parent:"container",
	type: Phaser.AUTO,
	physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
	scene:{
		preload:preload,
		create:create,
		update: update,
		debug:true
	}
}


var game = new Phaser.Game(config);

function preload(){
    this.load.image('map', './assets/fondo1.png');
}
function create(){
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
    
    //this.input.on('pointerdown', function () {
    
    //this.cam = this.cameras.main;
    
            // if (pos === 0)
            // {
            //     cam.pan(767, 1096, 2000, 'Power2');
            //     pos++;
            // }
            // else if (pos === 1)
            // {
            //     cam.pan(703, 1621, 2000, 'Elastic');
            //     pos++;
            // }
            // else if (pos === 2)
            // {
            //     cam.pan(256, 623, 2000, 'Sine.easeInOut');
            //     pos++;
            // }
            // else if (pos === 3)
            // {
            //     cam.pan(166, 304, 2000);
            //     pos++;
            // }
            // else if (pos === 4)
            // {
            //     cam.pan(624, 158, 2000);
            //     pos++;
            // }
            // else if (pos === 5)
            // {
            //     cam.pan(680, 330, 2000);
            //     pos++;
            // }
            // else if (pos === 6)
            // {
            //     cam.pan(748, 488, 2000);
            //     pos++;
            // }
            // else if (pos === 7)
            // {
            //     cam.pan(1003, 1719, 2000);
            //     pos = 0;
            // }
    
        //}, this);


}
function update(time,delta){
	
        const cam = this.cameras.main;
        //Pan Y
        if(this.cursor.down.isDown)
        {
            this.pany+=1;
            cam.pan(this.panx,this.pany,20);
        }
        if(this.cursor.up.isDown)
        {
            this.pany-=1;
            cam.pan(this.panx,this.pany,20);
        }
        //Pan X
        if(this.cursor.left.isDown)
        {
            this.panx-=1;
            cam.pan(this.panx,this.pany,20);
        }
        if(this.cursor.right.isDown)
        {
            this.panx+=1;
            cam.pan(this.panx,this.pany,20);
        }
        //this.text.setText(['Click to move', 'x: ' + cam.scrollX, 'y: ' + cam.scrollY ]);
}