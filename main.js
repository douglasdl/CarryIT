"use strict";

var data = [
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 2, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 0, 0, 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 0, 0, 2, 0, 0, 2, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 0, 6, 0, 6, 6, 6, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 0, 0, 0, 6, 0, 6, 6, 6, 0, 6, 6, 6, 6, 0, 0, 1, 1, 6, 6],
    [6, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 6, 6],
    [6, 6, 6, 6, 6, 0, 6, 6, 6, 6, 0, 6, 0, 6, 0, 0, 1, 1, 6, 6],
    [6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
];
var gc;         // Graphic Context
var px = 12;    // Player.x (start position)
var py = 8      // Player.y (start position)

function init() {
    gc = document.getElementById("soko").getContext("2d");
    onkeydown = mykeydown;
    repaint();
}

document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    console.log(`Key pressed ${name} \r\n Key code value: ${code}`);
    switch(code) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowDown':
            moveDown();
            break;
    }
}, false);

function moveLeft() {
    mykeydown({keycode: 37});
}

function moveUp() {
    mykeydown({keycode: 38});
}

function moveRight() {
    mykeydown({keycode: 39});
}

function moveDown() {
    mykeydown({keycode: 40});
}

function mykeydown(e) {
    var dx0 = px; 
    var dx1 = px;
    var dy0 = py;
    var dy1 = py;
    switch(e.keycode) {
        case 37:
            dx0--;
            dx1-=2;
            break;
        case 38:
            dy0--;
            dy1-=2;
            break;
        case 39:
            dx0++;
            dx1+=2;
            break;
        case 40:
            dy0++;
            dy1+=2;
            break;
    }
    console.log(dx0, dx1, dy0, dy1);

    if((data[dy0][dx0] & 0x2) == 0) {            // No luggage, no wall -> can pass
        px = dx0;
        py = dy0;
    } else if((data[dy0][dx0] & 0x6) == 2) {    // Luggage on the way
        if((data[dy1][dx1] & 0x2) == 0) {       // No luggage, no wall -> can pass
            data[dy0][dx0] ^= 2;                // Clear the luggage
            data[dy1][dx1] |= 2;                // Set the luggage to the next space
            px = dx0;
            py = dy0;
        }
    }

    repaint();
}

function repaint() {
    gc.fillStyle = "black";
    gc.fillRect(0, 0, 800, 440);

    for(var y = 0; y < data.length; y++) {
        for(var x = 0; x < data[y].length; x++) {
            if(data[y][x] & 0x1) {
                gc.drawImage(imgGoal, x * 40, y * 40, 40, 40);
            }
            if(data[y][x] & 0x2) {
                gc.drawImage(imgLuggage, x * 40, y * 40, 40, 40);
            }
            if(data[y][x] == 0x6) {
                gc.drawImage(imgWall, x * 40, y * 40, 40, 40);
            }
        }
    }

    gc.drawImage(imgWorker, px * 40, py * 40, 40, 40);
}