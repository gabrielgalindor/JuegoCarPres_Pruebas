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
    this.load.image('map', 'assets/tests/camera/earthbound-scarab.png');
}
function create(){


}
function update(time,delta){
	
}