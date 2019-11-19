const mazeWidth = 36, mazeHeight = 20, wallWidth = 6;
let w = 0, h = 0, squareSize = 0;
const pressedKeys = {};
let lastTimestamp = 0;

let myX = 0;
let myY = 0;

let maze = [];
let mazeDone = false;

function resetMaze() {
    maze = [];
    let n = 0;
    for (let i = 0; i < mazeWidth; i++) {
        let column = [];
        for (let j = 0; j < mazeHeight; j++) {
            column.push({down: false, right:  i < false, set: n, colour: 'grey'});
            n++;
        }
        maze.push(column);
    }
    mazeDone = false;
}

function pageLoad() {

    window.addEventListener("resize", fixSize);
    fixSize();

    window.addEventListener("keydown", event => pressedKeys[event.key] = true);
    window.addEventListener("keyup", event => pressedKeys[event.key] = false);

    resetMaze();

    window.requestAnimationFrame(gameFrame);

}

function fixSize() {

    w = window.innerWidth;
    h = window.innerHeight;
    const canvas = document.getElementById('mazeCanvas');
    canvas.width = w;
    canvas.height = h;
    squareSize = h / (mazeHeight + 1);

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
        if (!keyDown && myY > 0 && maze[myX][myY-1].down) {
            myY--;
            keyDown = true;
        }
    } else if (pressedKeys["ArrowDown"]) {
        if (!keyDown && myY < mazeHeight-1 && maze[myX][myY].down) {
            myY++;
            keyDown = true;
        }
    } else if (pressedKeys["ArrowLeft"]) {
        if (!keyDown && myX > 0 && maze[myX-1][myY].right) {
            myX--;
            keyDown = true;
        }
    } else if (pressedKeys["ArrowRight"]) {
        if (!keyDown && myX < mazeWidth-1 && maze[myX][myY].right) {
            myX++;
            keyDown = true;
        }
    } else if (pressedKeys["g"]) {
        if (!keyDown) {
            resetMaze();
            keyDown = true;
        }
    } else if (pressedKeys["f"]) {
        if (!keyDown) {
            while (!mazeDone) {
                mazeDone = mazeStep();
            }
            keyDown = true;
        }
    } else {
        keyDown = false;
    }

}

function processes(frameLength) {

    if (!mazeDone) {
        mazeDone = mazeStep();
    }

}

function outputs() {

    const canvas = document.getElementById('mazeCanvas');
    const context = canvas.getContext('2d');

    context.fillStyle = 'navy';
    context.fillRect(0,0,w,h);

    for (let i = 0; i < mazeWidth; i++) {
      for (let j = 0; j < mazeHeight; j++) {

        let x = w/2 - (mazeWidth*squareSize)/2 + i*squareSize;
        let y = h/2 - (mazeHeight*squareSize)/2 + j*squareSize;

        context.fillStyle = maze[i][j].colour;
        context.fillRect(x + wallWidth, y + wallWidth, squareSize - 2*wallWidth, squareSize - 2*wallWidth);
        if (maze[i][j].down) context.fillRect(x + wallWidth, y + squareSize - wallWidth - 1, squareSize - 2*wallWidth, wallWidth * 2 + 2);
        if (maze[i][j].right) context.fillRect(x + squareSize - wallWidth - 1, y + wallWidth, wallWidth * 2 + 2, squareSize - 2*wallWidth);

        if (!mazeDone) {
            context.fillStyle = 'black';
            context.font = '15px Arial';
            context.textAlign = 'left';
            context.textBaseline = 'top';
            context.fillText(maze[i][j].set, x + wallWidth + 2, y + wallWidth + 2);
        }

        if (myX == i && myY == j) {
            context.fillStyle = 'red';
            context.beginPath();
            context.arc(x + squareSize/2, y + squareSize/2, squareSize/3, 0, 2*Math.PI);
            context.fill();
        }

      }
    }


}

function mazeStep() {

    let oneSet = true;
    for (let i = 0; i < mazeWidth; i++) {
        for (let j = 0; j < mazeHeight; j++) {
            if (maze[i][j].set != maze[0][0].set) {
                oneSet = false;
            }
        }
    }
    if (oneSet) return true;

    let x, y, a, b, horizontal = 0, vertical = 0;

    while (true) {

        x = Math.floor(Math.random() * mazeWidth);
        y = Math.floor(Math.random() * mazeHeight);

        if (Math.random() < 0.5) {
            horizontal = 1;
            vertical = 0;
        } else {
            horizontal = 0;
            vertical = 1;
        }

        if (horizontal > 0 && (maze[x][y].right || x == mazeWidth - 1)) continue;
        if (vertical > 0 && (maze[x][y].down || y == mazeHeight - 1)) continue;

        a = maze[x][y].set;
        b = maze[x + horizontal][y + vertical].set;

        if (a == b) continue;

        if (vertical > 0) {
            maze[x][y].down = true;
        } else {
            maze[x][y].right = true;
        }
        for (let i = 0; i < mazeWidth; i++) {
            for (let j = 0; j < mazeHeight; j++) {
                if (maze[i][j].set == b) {
                    maze[i][j].set = a;
                }
                if (maze[i][j].set == a) {
                    maze[i][j].colour = 'white';
                }
            }
        }

        return false;

    }

}
