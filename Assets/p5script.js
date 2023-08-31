let xoff = 0;
let yoff = 10000;
let x, y;
let prevX, prevY;

function setup() {
    frameRate(30)
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('canvas-container');  // Make sure the canvas is where you want it.
    background(255);
    x = width / 2;
    y = height / 2;
    prevX = x;
    prevY = y;
    windowResized();
}

function draw() {
    let angle = noise(xoff) * TWO_PI * 4;
    let len = 5;
    let newX = x + cos(angle) * len;
    let newY = y + sin(angle) * len;

    stroke(0);
    strokeWeight(1);

    stroke(0,0,0);

    line(prevX, prevY, newX, newY);

    prevX = newX;
    prevY = newY;

    x = newX;
    y = newY;

    xoff += 0.01;
    yoff += 0.01;

    if (x > width || x < 0 || y > height || y < 0) {
        x = width / 2;
        y = height / 2;
        prevX = x;
        prevY = y;
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}