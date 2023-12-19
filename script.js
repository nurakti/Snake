// Define HTML elements

const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');

//define game variables, used let coz the snakes size isnt constant
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = 'right';
let highScore = 0;
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

//draws game map + food
function draw() {
board.innerHTML = '';
drawSnake();
drawFood();
updateScore();
}

//Draws the snake

function drawSnake() {

    snake.forEach((segment) => {
     const snakeElement = createGameElement('div', 'snake');
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
    });
}

//creates food cube or snake

function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}


//set the position of snake or food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

//segment is basically every object in the  coordinate or x and y in the grid system separet. are segments

function drawFood() {
    if (gameStarted) {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
    }
}

//randomly generates a piece of food on the grid system. +1 is so its never 0
function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;

    return { x, y };

}

//MOVING THE SNAKE!!!
//the three dots are so its a copy(?)

function move(){
    const head = {...snake[0]};
    switch (direction){
        case'right' :
            head.x++;
        break;
        case'left' :
            head.x--;
        break;
        case'up' :
        head.y--;
    break;
        case'down' :
        head.y++;
        break;   
           
    }

    snake.unshift(head);

   


if (head.x === food.x && head.y === food.y){
    food=generateFood();
    increaseSpeed();
    clearInterval(gameInterval); //clears past interval
    gameInterval = setInterval(() =>{
        move();
        checkCollision();
        draw();

    }, gameSpeedDelay);
    } else {
        snake.pop();
    }
}

//starting the game

function startGame(){

    gameStarted = true; //keep track of a running game
    instructionText.style.display= 'none';
    logo.style.display= 'none';
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay);

}

//keypress event listener

function handleKeyPress(event){
  if(
    (!gameStarted && event.code === 'Space' ) ||
     (!gameStarted && event.key === ' ' )){
    startGame();
     } else{
        switch(event.key){
             case 'ArrowUp':
                direction = 'up';
                break;
                
                case 'ArrowDown':
                    direction = 'down';
                    break;    
                
                    case 'ArrowLeft':
                        direction = 'left';
                        break;

                        case 'ArrowRight':
                            direction = 'right';
                            break;
        }
     }
  }

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed(){
    console.log(gameSpeedDelay);
    if(gameSpeedDelay>150){
        gameSpeedDelay -= 5;
    } else if(gameSpeedDelay>100){
          gameSpeedDelay -= 3;
    }
    else if(gameSpeedDelay>50){
        gameSpeedDelay -= 2;
  }
  else if(gameSpeedDelay>25){
    gameSpeedDelay -= 1;
}
}

function checkCollision(){
    const head = snake[0];

    if(head.x < 1 || head.x>gridSize || head.y<1 || head.y>gridSize){
      resetGame();

    }
    for(let i = 1; i < snake.length; i++){
        if(head.x=== snake[i].x && head.y===snake [i].y){
                resetGame();
        }
    }
}

function resetGame(){
    updateHighScore();
    stopGame();
    snake = [{x:10, y:10}];
    food= generateFood();
    direction= 'right';
    gameSpeedDelay=200;
    updateScore();
}

function updateScore(){
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0');
}

function stopGame(){
    clearInterval(gameInterval);
    gameStarted= false;
    instructionText.style.display= 'block';
    logo.style.display= 'block';
}

//padstart stringin belli bir yere gelmesini sağlar

function updateHighScore(){
    const currentScore = snake.length - 1;
    if (currentScore>highScore){
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
    }
  highScoreText.style.display = 'block';
} 

