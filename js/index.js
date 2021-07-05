window.onload = () => {

    document.getElementById('start-button').onclick = () => {
        startGame();
    };
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')

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
                this.y += 1.4
                this.draw()
            } else if (score >= 11) {
                this.y += 1.5
                this.draw()
            } else if (score >= 20) {
                this.y += 2
                this.draw()
            }
        }
        outofscreen = () => {
            if (this.y > canvas.height) {
                score += 1
                return true
            } else {
                return false
            }
        }

    }



    const obstacles = []
    let obsCreator = setInterval(function () {

        if (score <= 15) {
            let color = 'darkblue'
            let obs = new Obstacle(Math.random() * canvas.width, 10, 150, 40, color)

            obstacles.push(obs)
        } else if (score >= 16) {
            let color = 'white'
            let obs = new Obstacle(Math.random() * canvas.width, 0, 170, 40, color)

            obstacles.push(obs)
        } else if (score >= 35) {
            let color = 'red'
            let obs = new Obstacle(Math.random() * canvas.width, 0, 200, 40, color)
            obstacles.push(obs)
        }


    }, 2000) //determina a frequencia de obstaculos

    function detectCollision(rect1, rect2) {
        if (rect1.x < rect2.x + rect2.w &&
            rect1.x + rect1.w > rect2.x &&
            rect1.y < rect2.y + rect2.h &&
            rect1.y + rect1.h > rect2.y) {
            console.log("collision")
            cancelAnimationFrame(animatedId)

            document.getElementById('startGameSound').pause();
            document.getElementById('gameOverSound').play();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, 500, 700);
            ctx.fillStyle = 'red';
            ctx.font = '30px Arial'
            ctx.fillText('GAME OVER!', 150, 300)
            ctx.fillStyle = 'red'
            ctx.font = '40px Arial'
            ctx.fillText(`Your final score ${score}`, 100, 350,)
            clearRect(obsCreator)

            document.getElementById('start-button').onclick = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                startGame();
            };

        }
    }


    function drawScore() {
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + score, 100, 100);
    }

    let car = new Image()
    car.src = "./images/personagem.png"
    var player = new Car(car, 225, 550, car.width, car.height)
    window.onkeydown = function (e) {
        if (e.key === 'ArrowLeft') {
            player.x -= 10
        }
        if (e.key === 'ArrowRight') {
            player.x += 10
        }
    }
    let animatedId = null;
    function win() {

        cancelAnimationFrame(animatedId)
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        document.getElementById('startGameSound').pause();
        document.getElementById('applause').play();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'yellow';
            ctx.fillRect(0, 0, 500, 700);
            ctx.fillStyle = 'black';
            ctx.font = '40px Arial'
            ctx.fillText('CONSEGUIU ESCAPAR!', 40, 300)
            ctx.fillStyle = 'red'
            ctx.font = '40px Arial'
            ctx.fillText(`Sua pontuação final é ${score}`, 40, 450,)
            clearRect(obsCreator)
            setInterval(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                startGame();
            }, 2000);

            
    }

    function startGame() {
        document.getElementById('startGameSound').play();
        animatedId = requestAnimationFrame(startGame)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (score <= 15) {
            let road = new Image()
            road.src = './images/corredor.png'
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
        if (score ==20 ) {

            win();
        }

    }
};