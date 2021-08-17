// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// function to update the counter 

function Counter(){
    counter--
    p.textContent = `Ball count: ${counter}`
}

// Class Shape

class Shape {
    constructor(x, y, velX, velY, exists){
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
        this.exists = exists
    }
}

class Ball extends Shape{
    constructor(x, y, velX, velY, color, size){
        super(x, y, velX, velY, true)
        this.color = color
        this.size = size
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.fill()
    }
    update() {
        if ((this.x + this.size) >= width){
            this.velX = -(this.velX)
        }

        if ((this.x - this.size) <= 0){
            this.velX = -(this.velX)
        }

        if ((this.y + this.size) >= height){
            this.velY = -(this.velY)
        }

        if ((this.y - this.size) <= 0){
            this.velY = -(this.velY)
        }

        this.x += this.velX
        this.y += this.velY
    }
    detectCollision() {
        for (let i in balls){
            if (!(this === balls[i]) && balls[i].exists) {
                const dx = this.x - balls[i].x
                const dy = this.y - balls[i].y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < this.size + balls[i].size){
                    balls[i].color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
                }
            }
        }
    }
}

class EvilCircle extends Shape {
    constructor(x, y){
        super(x, y, 20, 20, true)
        this.color = "white"
        this.size = 10
    }
    draw() {
        ctx.beginPath()
        ctx.lineWidth = 3
        ctx.strokeStyle = this.color
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.stroke()
    }
    checkBounds() {
        if ((this.x + this.size) >= width){
            this.x -= this.size
        }

        if ((this.x - this.size) <= 0){
            this.x += this.size
        }

        if ((this.y + this.size) >= height){
            this.y -= this.size
        }

        if ((this.y - this.size) <= 0){
            this.y += this.size
        }
    }
    setControls() {
        let _this = this
        window.addEventListener("keydown", (e)=> {
            if (e.key === 'a') {
                _this.x -= _this.velX;
            } else if (e.key === 'd') {
                _this.x += _this.velX;
            } else if (e.key === 'w') {
                _this.y -= _this.velY;
            } else if (e.key === 's') {
                _this.y += _this.velY;
            }
        })
    }
    detectCollision() {
        for (let i in balls){
            if (balls[i].exists) {
                const dx = this.x - balls[i].x
                const dy = this.y - balls[i].y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < this.size + balls[i].size){
                    balls[i].exists = false
                    Counter()
                }
            }
        }
    }
}

// it creates new balls and populates the array
const quantity = 50
let balls = []

let counter = quantity
const p = document.querySelector("p")
p.textContent = `Ball count: ${counter}`

while(balls.length < quantity){

    let size = random(10, 20)
    let ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`,
        size
    )
    balls.push(ball)
}

// Creating the Evil Circle
let circle = new EvilCircle( 
    random(0 + 10, width - 10),
    random(0 + 10, height - 10)
)
circle.setControls()

function loop() {

    ctx.fillStyle = "rgba(0, 0, 0, 0.25)"
    ctx.fillRect(0, 0, width, height)

    // loop() will only draw existing balls
    for (let i in balls){
        if(balls[i].exists){
            balls[i].draw();
            balls[i].update();
            balls[i].detectCollision();
        }
    }

    // Drawing the evil circle
    circle.draw()
    circle.checkBounds()
    circle.detectCollision()

    requestAnimationFrame(loop);
}

loop();