const blockWidth = 300;
const blockHeight = 30;
let currentBlock;
let victory;
let defeat;

let blockDir;
let blockSpeed;

let placedBlocks = [];

const statePlaying = "playing";
const stateLose = "lose";
const stateWin = "win";

let menuState = statePlaying;

function preload(){
  victory = loadSound("Victory.mp3")
  defeat = loadSound("Defeat.mp3")
}
function setup(){
  createCanvas (600, 600);
  textAlign(CENTER, CENTER);
textSize(30)
  newGame();
}

function draw(){
  background(20);

  if(menuState === statePlaying){
    textSize(30);
  updateBlock();
  drawBlocks();
  } else if(menuState === stateLose){
  textSize(40);
  fill("red");
  text("Game Over! You suck :(", width/2, height/2);
  textSize(35);
  text("Press space to try again!", width/2, height *3/4);
  if (defeat.isPlaying() == false){
    defeat.play();
    defeat.setLoop(false);
  }
  } else if(menuState === stateWin) {
    textSize(40);
    fill("green");
    text("Congrats! You did it!", width/2, height/2);
    textSize(35);
  text("Press space to try again!", width/2, height *3/4);
  if (victory.isPlaying() == false){
    victory.play();
    victory.setLoop(false);
  }
  }
}

function keyReleased(){
 if(key === " ") {
  if(menuState === statePlaying) {
    placeBlock();
  } else {
    newGame();
    menuState = statePlaying;
  }
 }
}

function newGame(){
  currentBlock = createVector(0, height-blockHeight, blockWidth);

  blockDir = 1;
  blockSpeed = 2;

  placedBlocks = [];
}

function updateBlock(){
  currentBlock.x += blockDir * blockSpeed;

  if (currentBlock.x < 0) {
    blockDir = 1;
  }
  if (currentBlock.x + currentBlock.z > width){
    blockDir = -1;
  }
}

function drawBlocks(){
  fill("pink");
  rect(currentBlock.x, currentBlock.y, currentBlock.z, blockHeight);
  fill ("purple");
  for (let block of placedBlocks){
    rect(block.x, block.y, block.z, blockHeight);
  }

  text(placedBlocks.length, 30, 30);

}

function placeBlock(){
  const prevBlock = placedBlocks[placedBlocks.length - 1]

    let newWidth = blockWidth;

    if(prevBlock){
      const leftEdge = max(prevBlock.x, currentBlock.x);
      const rightEdge = min(prevBlock.x + prevBlock.z, currentBlock.x + currentBlock.z);
      
       newWidth = rightEdge - leftEdge;
       currentBlock.x = leftEdge;
       currentBlock.z = newWidth;
    }
    
    if (newWidth < 0){
      menuState = stateLose;
      return;
    }
  placedBlocks.push(currentBlock);

  blockSpeed *=1.1;

  newBlock(newWidth);
}

function newBlock(newWidth){
  const blockStackHeight = (placedBlocks.length + 1) * blockHeight;

  if(blockStackHeight > height){
    menuState = stateWin;
    return;
  }

  currentBlock = createVector(0, height - blockStackHeight, newWidth);
}