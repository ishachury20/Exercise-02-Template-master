class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png')
        this.load.image('wall', 'wall.png')
        this.load.image('oneway', 'one_way_wall.png')
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        this.cup = this.physics.add.sprite(width/2, height/10, 'cup'); 
        this.cup.body.setCircle(this.cup.width/4); 
        this.cup.body.setOffset(this.cup.width / 4); 
        this.cup.body.setImmovable(true); 

        this.ball = this.physics.add.sprite(width / 2, height - height / 10, 'ball'); 
        this.ball.body.setCircle(this.ball.width/2); 
        this.ball.body.setCollideWorldBounds(true); 
        this.ball.body.setBounce(0.5); 
        this.ball.setDamping(true).setDrag(0.5); 

        let angle = 0; 

        this.SHOT_VELOCITY_X = 200; 
        this.SHOT_VELOCITY_Y_MIN = 700; 
        this.SHOT_VELOCITY_Y_MAX = 1100; 

        let wallA = this.physics.add.sprite(0, height / 4, 'wall'); 
        wallA.setVelocityX(100)
        wallA.body.setCollideWorldBounds(true); 
        wallA.body.setBounce(1); 
        wallA.setX(Phaser.Math.Between(0 + wallA.width /2, width - wallA.width/ 2)); 
        wallA.body.setImmovable(true); 


        let wallB = this.physics.add.sprite(0, height / 2, 'wall'); 
        wallB.setVelocityX(100)
        wallB.body.setCollideWorldBounds(true); 
        wallB.body.setBounce(1); 
        wallB.setX(Phaser.Math.Between(0 + wallB.width /2, width - wallB.width/ 2)); 
        wallB.body.setImmovable(true); 

        this.walls = this.add.group([wallA, wallB]); 
        
        this.oneway = this.physics.add.sprite(0, height / 4 * 3, 'oneway'); 
        this.oneway.setX(Phaser.Math.Between(0 + this.oneway.width / 2, width - this.oneway.width)); 
        this.oneway.body.setImmovable(true); 
        this.oneway.body.checkCollision.down = false; 

        this.input.on('pointerdown', (pointer) =>{
            //code taken from Phaser labs: Velocity from Angle 
            //https://phaser.io/examples/v3/view/physics/arcade/velocity-from-angle
            let shotdirection;  
            angle = Phaser.Math.Angle.BetweenPoints(this.ball, pointer); 
            pointer.y == this.ball.y ? shotdirection = 1 : shotdirection = -1; 
            this.ball.body.setVelocityX(Phaser.Math.Between(-this.SHOT_VELOCITY_X, this.SHOT_VELOCITY_X)); 
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX) * shotdirection); 
            this.physics.velocityFromRotation(angle, 600, this.ball.body.velocity); 
        })

        this.physics.add.collider(this.ball, this.cup, (ball, cup) => {
            //ball.destroy()
            this.ball.setPosition(width / 2, height - height / 10); 

        })
        this.physics.add.collider(this.ball, this.walls); 
        this.physics.add.collider(this.ball, this.oneway); 
        this.physics.add.collider(this.walls, height); 

        //add logic so the ball resets at the bottom 
        //made one obstacle move left/right and bounce against screen edge 
        //create a display shot counter, score, successful shot percentage 
        //improve shot logic by making the input pointer's relative x-position 
        
        
    }

    update() {
        
    }
}