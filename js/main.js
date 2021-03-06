let gameboard = document.querySelector('#GameBoard')
let context = gameboard.getContext('2d')
let score = document.querySelector('#result')
let playAg = document.querySelector('#playAgain')
var grid = 16
var count = 0
let snake = {
    x: 160,
    y: 160,

    dx: 0,
    dy: 0,

    cells: [],

    maxCells: 4
};

let apple = {
    x: 320,
    y: 320
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}



function loop() {
    requestAnimationFrame(loop)

    if (++count < 8) {
        return;
    }
    count = 0

    context.clearRect(0, 0, gameboard.width, gameboard.height)

    snake.x += snake.dx
    snake.y += snake.dy

    if (snake.x < 0) {
        snake.x = gameboard.width - grid
    }
    else if (snake.x >= gameboard.width) {
        snake.x = 0
    }
    if (snake.y < 0) {
        snake.y = gameboard.height - grid
    }
    else if (snake.y >= gameboard.height) {
        snake.y = 0
    }
    snake.cells.unshift({ x: snake.x, y: snake.y })
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop()
    }

    context.fillStyle = 'red'
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1)

    context.fillStyle = 'green'

    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1)

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++
            score.placeholder++
            apple.x = getRandomInt(0, 25) * grid
            apple.y = getRandomInt(0, 25) * grid
        }

        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = []
                snake.maxCells = 4
                snake.dx = 0
                snake.dy = 0
                score.placeholder = 0
                playAg.style.display = 'flex'

                apple.x = getRandomInt(0, 25) * grid
                apple.y = getRandomInt(0, 25) * grid
            }
        }
    })
}

playAg.addEventListener('click', function (event) {
    snake.dx = grid
    playAg.style.display = 'none'
})

document.addEventListener('keydown', function (e) {
    // LEFT
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid
        snake.dy = 0
    }
    // UP
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid
        snake.dx = 0
    }
    // RIGHT
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid
        snake.dy = 0
    }
    // DOWN
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid
        snake.dx = 0
    }
})

requestAnimationFrame(loop)