const WIDTH = 100;
const HEIGHT = 150;

const WINNING_SCORE = 30;
var time; // play time
var score; // score

var playing;
var won;

var tiles = []; // tiles

function soundClick() {
    let audio = new Audio();
    let randNumber = Math.floor(random(1, 6));
    console.log(randNumber);
    if (randNumber == 1) {
        audio.src = './audio/piano-a-1.mp3';
    } else if(randNumber == 2) {
        audio.src = './audio/piano-b-1.mp3';
    } else if(randNumber == 3) {
        audio.src = './audio/piano-c-1.mp3';
    } else if(randNumber == 4) {
        audio.src = './audio/piano-e-1.mp3';
    } else if(randNumber == 5) {
        audio.src = './audio/piano-f-1.mp3';
    } else if(randNumber == 6) {
        audio.src = './audio/piano-f-1.mp3';
    }
    
    audio.autoplay = true;
}

function setup() { // download
    var canvas = createCanvas(401, 601); // game zone (1px padding)
    canvas.parent('game');

    time = -3; // play time
    score = 0;

    for (var i = 0; i < 4; i++) {
        newRow(); // draw tiles
    }

    playing = false;
    won = false;

    textAlign(CENTER);
}

function draw() {
    background(51); // bg color for canvas element

    drawTiles();
    
    handleState();
}

function drawTiles() {
    for (var i = 0; i < tiles.length; i++) {
        var x = (i % 4) * WIDTH; // sizes for 4 tiles
        var y = (Math.floor(i / 4) * HEIGHT); // sizes height tiles
        // -1 = red
        // 0 = black
        // 1 = white
        fill((tiles[i] !== 0) ? ((tiles[i] === 1) ? "#FFFFFF" : "#FF0000") : "#000000");
        rect(x, y, WIDTH, HEIGHT); // tile on the screen
    }
}

// returns formatted time
function getTime() {
    return Math.floor(time / 60) + ":" + Math.floor(map(time % 60, 0, 59, 0 , 990));
}

function handleState() {
      if (!playing) {
        if (time > 0) {
            // End game
           drawEnd(won);
        } else { // pre-game
            // countdown
            textSize(80);
            fill("#FF0000");
            text(-time, width / 2, height / 2);
            if (frameCount % 60 === 0) {
                time++;
                if (time === 0) {
                    playing = true;
                }
            }
        }
    } else { // still playing
        // draw time
        textSize(50);
        fill("#FF0000");
        text(getTime(), width / 2, width / 4);
        time++;
    }
}

// function keyTyped() {
//     if (key === '1') {
//       console.log(1);
//     } else if (key === '2') {
//         console.log(2);
//     } else if (key === '3') {
//         console.log(3);
//     } else if (key === '4') {
//         console.log(4);
//     }
// }

function drawEnd(won) {
    if (won) {
        background("#66FF66");
        fill("#FFFFFF");
        textSize(60);
        text("СУКА!", width / 2, height / 2 - 75);
        fill("#000000");
        textSize(50);
        text(getTime(), width / 2 , height/ 2);
        fill("FFFFFF");
        textSize(30);
        text("Нажмите R для старта!", width / 2, height / 2 + 50);
    } else {
        fill("#FF0000");
        textSize(60);
        text("Конец игры!", width / 2, height / 2);
        textSize(30);
        text("Нажмите R для старта!", width / 2, height / 2 + 50);
    }
}

function mousePressed() {
    if (!playing) { // don't allow input if the player isn't playing
        return
    }
    if (mouseY => 3 * HEIGHT && mouseY <= 4 * HEIGHT) {
        // check if click is within canvas bounds
        var t = getClickedTile(mouseX, mouseY);
        if (t == -1) { // they cliced out of bounds
            return;
        }
        if (tiles[t] !== 0) {
            // end game
            tiles[t] = -1;
            won = false;
            playing = false;
        } else {
            soundClick();
            score++;
            newRow();

            if (score >= WINNING_SCORE) {
                // end game
                won = true;
                playing = false;
            }
        }
    }
}

// return index of cliked tile
function getClickedTile(mX) { 
    for (var i = 0; i < 4; i++) {
        // get clicked tile
        var lowerBound = i * WIDTH;
        var upperBound = (i + 1) * WIDTH
        if (mX >= lowerBound && mX <= upperBound) {
            return i + 12; // only return for button row
        }
    }
    return -1; // if mised, click was out of bounds
}

function newRow() {
    // t is tile
    var t = Math.floor(random(4)); // random number
    for (var i = 0; i < 4; i++) {
        tiles.unshift((t === i) ? 0 : 1); // push tiles to the front(on top page) and random spawn tiles
    }
}

function keyTyped() {
    if (key === 'r') {
        setup();
    }
}
