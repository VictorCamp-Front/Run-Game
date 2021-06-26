window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame();
    };
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')

    function startGame() {}
    class Car {
        constructor(img, x, y, w, h) {
            this.x = x
            this.y = y
            this.w = w
            this.h = h
            this.img = img
        }

        draw = () => {
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        }
    }
    let score = 0;
    class Obstacle {
        constructor(x, y, w, h, color) {
            this.x = x
            this.y = y
            this.w = w
            this.h = h
            this.color = color
        }
        draw = () => {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.w, this.h)
        }

        move = () => {
            if (score <= 10) {
                this.y += 1.3
                this.draw()
            } else if (score >= 11) {
                this.y += 1.50
                this.draw()
            } else if (score >= 20) {
                this.y += 2
                this.draw()
            }
        }
        outofscreen = () => {
            if (this.y > canvas.height) {
                score += 2
                return true
            } else {
                return false
            }
        }

    }



    const obstacles = []
    let obsCreator = setInterval(function() {

            if (score <= 15) {
                let color = 'darkblue'
                let obs = new Obstacle(Math.random() * canvas.width, 100, 400, 30, color)

                obstacles.push(obs)
            } else if (score >= 16) {
                let color = 'white'
                let obs = new Obstacle(Math.random() * canvas.width, 0, 200, 30, color)

                obstacles.push(obs)
            } else if (score >= 35) {
                let color = 'red'
                let obs = new Obstacle(Math.random() * canvas.width, 100, 400, 30, color)
                obstacles.push(obs)
            }


        }, 2800) //determina a frequencia de obstaculos

    function detectCollision(rect1, rect2) {
        if (rect1.x < rect2.x + rect2.w &&
            rect1.x + rect1.w > rect2.x &&
            rect1.y < rect2.y + rect2.h &&
            rect1.y + rect1.h > rect2.y) {
            console.log("collision")
            cancelAnimationFrame(animatedId)
            clearInterval(obsCreator)
        }
    }


    function drawScore() {
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + score, 100, 100);
    }

    let car = new Image()
    car.src = "./images/personagem.jpg"
    var player = new Car(car, 225, 550, car.width, car.height)
    window.onkeydown = function(e) {
        if (e.key === 'ArrowLeft') {
            player.x -= 10
        }
        if (e.key === 'ArrowRight') {
            player.x += 10
        }
    }
    let animatedId = null;

    function startGame() {
        animatedId = requestAnimationFrame(startGame)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (score <= 15) {
            let road = new Image()
            road.src = './images/corredor.jpg'
            ctx.drawImage(road, 0, 0, canvas.width, canvas.height);
            player.draw()
        } else if (score >= 16) {
            let road = new Image()
            road.src = './images/campo-fut.jpg'
            ctx.drawImage(road, 0, 0, canvas.width, canvas.height);
            player.draw()
        } else if (score >= 50) {
            let road = new Image()
            road.src = './images/corredor.jpg'
            ctx.drawImage(road, 0, 0, canvas.width, canvas.height);
            player.draw()
        }
        for (let obs in obstacles) {
            obstacles[obs].move()
            detectCollision(obstacles[obs], player)
            if (obstacles[obs].outofscreen()) {
                obstacles.splice(obs, 1)
            }
        }
        drawScore()
    }
};