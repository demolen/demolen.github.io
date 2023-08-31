let xoff = 0;
let yoff = 10000;
let x, y;
let prevX, prevY;
let startTime;
let stopDrawing = false;

function setup() {
    frameRate(30);
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('canvas-container');
    background(255);
    // Initialize line to start on a random edge of the canvas
    initializeLineOnRandomEdge();
    startTime = millis();
}

function draw() {
    if (!stopDrawing || (millis() - startTime) < 10000) {
        let angle = noise(xoff) * TWO_PI * 4;
        let len = 5;
        let newX = x + cos(angle) * len;
        let newY = y + sin(angle) * len;

        stroke(0);
        strokeWeight(1);

        line(prevX, prevY, newX, newY);

        prevX = newX;
        prevY = newY;

        x = newX;
        y = newY;

        xoff += 0.01;
        yoff += 0.01;
    }

    // If it exits the screen, pick a random edge to re-enter
    if (x > width || x < 0 || y > height || y < 0) {
        initializeLineOnRandomEdge();

        // Stop drawing if 10 seconds or more have passed
        if ((millis() - startTime) >= 20000) {
            stopDrawing = true;
        }
    }
}

function initializeLineOnRandomEdge() {
    let edge = int(random(4));

    switch (edge) {
        case 0:  // top edge
            x = random(width);
            y = 0;
            break;
        case 1:  // bottom edge
            x = random(width);
            y = height;
            break;
        case 2:  // left edge
            x = 0;
            y = random(height);
            break;
        case 3:  // right edge
            x = width;
            y = random(height);
            break;
    }

    prevX = x;
    prevY = y;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
