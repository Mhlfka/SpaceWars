import EnemyController from "./enemyController.js";
import Player from "./player.js";
import BulletController from "./bulletController.js";
backgroundSound();
// var sample = document.getElementById("foobar");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "enemy/space.jpg";     


const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletController = new BulletController(canvas, 10 ,"white",false)
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController); 
const player = new Player(canvas, 3, playerBulletController); 

let isGameOver = false;
let didWin = false;




function game() {
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if(!isGameOver){
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
    }
}

function displayGameOver() {
    if(isGameOver){
        let text = didWin ? "Yorvodiz" : "Yedizu...:(";
        let textOffset = didWin ? 3.5 : 5;

        ctx.fillStyle = "white";
        ctx.font = "70px Arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height /2);
    }

}

function checkGameOver() {
    if(isGameOver){
        return;
    }

    if(enemyBulletController.collideWith(player)) {
        isGameOver = true;
        gameOverSound();
        

    }

    if(enemyController.collideWith(player)) {
        isGameOver = true;
        gameOverSound();
    }

    if(enemyController.enemyRows.length === 0) {

        didWin = true;
        isGameOver = true;
        winSound();
    }
}

function winSound() {
    let win = new Audio("sounds/success-fanfare-trumpets-6185.mp3")
    win.play()
    back.stop()
}
function gameOverSound() {
    let lose = new Audio("sounds/080205_life-lost-game-over-89697.mp3")
    lose.play()
    back.stop()
}
function backgroundSound() {
    let back = new Audio("sounds/back_music.ogg")
    back.play()
}
setInterval(game,1000/60);