let w = 0, h = 0;
const pressedKeys = {};
let lastTimestamp = 0;

function pageLoad() {

    window.addEventListener("resize", fixSize);
    window.addEventListener("keydown", event => pressedKeys[event.key] = true);
    window.addEventListener("keyup", event => pressedKeys[event.key] = false);

    window.requestAnimationFrame(gameFrame);

}

function fixSize() {

    w = window.innerWidth;
    h = window.innerHeight;
    const canvas = document.getElementById('mazeCanvas');
    canvas.width = w;
    canvas.height = h;

}

function gameFrame(timestamp) {

    if (lastTimestamp === 0) lastTimestamp = timestamp;
    const frameLength = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    inputs();
    processes(frameLength);
    outputs();

    window.requestAnimationFrame(gameFrame);

}


function inputs() {

    if (pressedKeys["ArrowUp"]) {

    } else if (pressedKeys["ArrowDown"]) {

    } else if (pressedKeys["ArrowLeft"]) {

    } else if (pressedKeys["ArrowRight"]) {

    }

}

function processes(frameLength) {

}

function outputs() {

    const canvas = document.getElementById('mazeCanvas');
    const context = canvas.getContext('2d');

    context.fillStyle = 'navy';
    context.fillRect(0,0,w,h);

}
