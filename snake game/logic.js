//game constants and variables

let inputDir={x:0,y:0};
let foodSound=new Audio('images&music/eating.wav');
let gameOverSound=new Audio('images&music/gameover.wav');
let bgSound=new Audio('images&music/bgsound.mp3');
let collideSound=new Audio('images&music/accident.wav')
let speed=5;
let lastPaintTime=0;
let snakeArr=[{x:13, y:15}]; //first position of snake at the point (13,15)
let food={x:6,y:7};
let score=0;


// **game functions**

function main(ctime){ //gamepage rendering loop(ctime=current time)
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){     //repainting the game page in an interval of 1/2=0.5sec
        return;
    }                           
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){ //conditions for when snake will collide
    //con1: snake bump into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){ //if head coordinate collide with other
            return true;
        }
    }
    //con2: snake collide with board wall
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;  
    }
}

function gameEngine(){
    //part 1: upadating the snake array and food

    if(isCollide(snakeArr)){  //if snake collide
        gameOverSound.play(); //playing game over sound
        bgSound.pause();
        inputDir={x:0,y:0};  //reseting the input direction at intial
        alert("Game Over.Press any key to play again!");
        snakeArr=[{x:13, y:15}]; //resetting the position of the snake at intial
        bgSound.play();
        score=0;
    }

    //food regenarating after eating the food and snake body updating
    if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){ //if food coordinante and head coordinate collides
        foodSound.play();
        score += 1;  //increasing the score after eating food
        if(score>hiScoreVal){ //if score is grater than high score
            hiScoreVal = score;  //then high score will be score value and
            localStorage.setItem("hiScore",JSON.stringify(hiScoreVal)); //setting the hiscore value in the localstorage
            hiScoreBox.innerHTML="High Score: "+hiScoreVal; //changing the high score value in browser window
        }
        scoreBox.innerHTML = "Score:  "+score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y}); //making a body block of snake in the direction of snake
        let a=2; //grid numbers
        let b=16; //food will always arrive between this grid
        food={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())} //generating a random location of food between a and b
    }

    //moving the snake
    for (let i = snakeArr.length-2; i>=0; i--) { // starting at second last block of snake body
        snakeArr[i+1]={...snakeArr[i]}; //and repalcing the last block in the place of second last and so on.Here snakeArr[i] is a new object.
    }
    snakeArr[0].x+=inputDir.x; //updating the head block(arr [0]) to the arrow key direction
    snakeArr[0].y+=inputDir.y;

    //part 2: craeting and displaying the snake

    board.innerHTML=""; //intializing the board as empty
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div'); //creating a block of snake
        snakeElement.style.gridRowStart=e.y; //postion of the block row wise
        snakeElement.style.gridColumnStart=e.x; //postion of the block column wise
        
        if(index==0){  
            snakeElement.classList.add('head'); //adding the head to the body
        }
        else{
            snakeElement.classList.add('snake'); //adding the body blocks
        }
        board.appendChild(snakeElement); //appending each block one after another
    });

    //part 3: creating and dispalying the food
    foodElement=document.createElement('div'); //creating the block of food
    foodElement.style.gridRowStart=food.y; //postion of the block row wise
    foodElement.style.gridColumnStart=food.x; //postion of the block column wise
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


//**main logic**

//high score configuration
let hiScore = localStorage.getItem("hiScore");
    if(hiScore===null){ //when there is no high score in localstorage
        hiScoreVal=0;
        localStorage.setItem("hiScore",JSON.stringify(hiScoreVal));
    }
    else{        //if high score presnt
        hiScoreVal = JSON.parse(hiScore);
        hiScoreBox.innerHTML="High Score: "+hiScore;
    }

//navigation configuration of snake
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{ //if user pressing any key on keyboard
        bgSound.play();
        inputDir={x:0,y:-1} //then the snake will start moving in the direction of y=-1(upwards)
        switch (e.key) {
            case "ArrowUp":
                console.log("ArrowUp");
                inputDir.x=0;
                inputDir.y=-1;
                break;
            case "ArrowDown":
                console.log("ArrowDown");
                inputDir.x=0;
                inputDir.y=1;
                break;
            case "ArrowLeft":
                console.log("ArrowLeft");
                inputDir.x=-1;
                inputDir.y=0;
                break;
            case "ArrowRight":
                console.log("ArrowRight");
                inputDir.x=1;
                inputDir.y=0;
                break;        
            default:
                break;
        }
});