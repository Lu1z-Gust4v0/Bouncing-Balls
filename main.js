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

// Class Ball

class Ball {
    constructor(x, y, velX, velY, color, size){
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
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
            if (!(this === balls[i])) {
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

// it creates new balls and populates the array

const quantity = 50
let balls = []

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

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)"
    ctx.fillRect(0, 0, width, height)

    for (let i in balls){
        balls[i].draw();
        balls[i].update();
        balls[i].detectCollision();
    }

    requestAnimationFrame(loop);
}

loop();