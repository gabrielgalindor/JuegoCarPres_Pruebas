class escenaJuego1 extends Phaser.Scene{
    constructor(){
        super({key:"Lobby", active:true});
    }
    preload()
    {
        this.load.atlas('character-01', './assets/sprite-character1.png','./assets/character1.json');
    }
    create()
    {
        this.player = this.add.sprite(0,0,"character-01","c0.png").setScale(0.5);
        // this.anims.create({
        //     key:'walk',
        //     repeat:-1,
        //     frameRate:24,
        //     frames:this.anims.generateFrameNames('samus',{
        //         prefix:'s',
        //         suffix:'.png',
        //         start:0,
        //         end:3
        //     })
        // });

        // samus.play({ key: 'walk', repeat: -1 });

        // cursor = this.input.keyboard.createCursorKeys();
    }

    update(time,delta)
    {
        // if(cursor.down.isDown)
        // {
        //     samus.y+=5;
        // }
        // if(cursor.up.isDown)
        // {
        //     samus.y-=5;
        // }
    }
}