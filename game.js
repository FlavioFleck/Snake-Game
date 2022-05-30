import { restartGame, modalActive } from './modal.js'
const screen = document.querySelector("canvas")
const context = screen.getContext('2d')
const snake = []
let fruit = {}
let direction = "right"

snake[0] = { x: 10, y: 10 }
fruit = {
    x: Math.floor(Math.random() * screen.width - 1),
    y: Math.floor(Math.random() * screen.height - 1)
}

renderScreen()
function renderScreen() {
    context.clearRect(0, 0, screen.width, screen.height)
    for(let i = 0; i < snake.length; i++) {
        context.fillStyle = "#7b2cbf"
        context.fillRect(snake[i].x, snake[i].y, 1, 1)
    }
    context.fillStyle = "#240046"
    context.fillRect(fruit.x, fruit.y, 1, 1)

    requestAnimationFrame(renderScreen)
}

function move() {
    const movements = [
        {
            condition: direction == "up",
            functionality: up
        },
        {
            condition: direction == "down",
            functionality: down
        },
        {
            condition: direction == "left",
            functionality: left
        },
        {
            condition: direction == "right",
            functionality: right
        }
    ]
    
    function up() {
        snake[0].y--
        if (snake[0].y < 0) {
            snake[0].y = screen.height - 1
        } 
    }
    function down() {
        snake[0].y++
        if (snake[0].y >= screen.height) {
            snake[0].y = 0
        }
    }
    function left() {
        snake[0].x--
        if (snake[0].x < 0) {
            snake[0].x = screen.width - 1
        }  
    }
    function right() {
        snake[0].x++
        if (snake[0].x >= screen.width) {
            snake[0].x = 0
        } 
    }

    for(const movement of movements) {
        if(movement.condition) {
            movement.functionality()
        }
    }

    addSnake().eat()
    gameOver()
}

keyboardListener()
function keyboardListener() {
    window.addEventListener("keydown", (event) => {
        if(event.key == "w") {
            if(direction != "down") {
                direction = "up"
                console.log(direction)
            }
        } else if (event.key == "s") {
            if(direction != "up") {
                direction = "down"
                console.log(direction)
            }
        } else if (event.key == "a") {
            if(direction != "right") {
                direction = "left"
                console.log(direction)
            }
        } else if (event.key == "d") {
            if( direction != "left") {
                direction = "right"
                console.log(direction)
            }  
        }
    })
}

function addSnake() {
    let newHead = {
        x: snake[0].x,
        y: snake[0].y
    }
    snake.unshift(newHead)

    function eat() {
        if(snake[0].x != fruit.x || snake[0].y != fruit.y) {
            snake.pop()
        } else {
            console.log("Eated")
            fruit.x = Math.floor(Math.random() * screen.width)
            fruit.y = Math.floor(Math.random() * screen.height)
        }
    }

    return {
        eat
    }
}

function gameOver() {
    for(let i = 2; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(play)
            modalActive()
            restartGame()
        }
    }
    
}

let play = setInterval(move, 100)