let xoff = 0;
let yoff = 10000;
let x, y;
let prevX, prevY;
let startTime;
let stopDrawing = false;
let stopTime;
let strokeWidth;

function setup() {
    frameRate(30);
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('canvas-container');
    background(255);
    // Initialize line to start on a random edge of the canvas
    initializeLineOnRandomEdge();
    setDisplayProperties();
    startTime = millis();
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    if (!stopDrawing || (millis() - startTime) < stopTime) {
        let angle = noise(xoff) * TWO_PI * 4;
        let len = 5;
        let newX = x + cos(angle) * len;
        let newY = y + sin(angle) * len;

        stroke(0);
        strokeWeight(strokeWidth);

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

        // Stop drawing if the stopTime has passed
        if ((millis() - startTime) >= stopTime) {
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

function setDisplayProperties() {
    if (width > height) {
        // Landscape mode
        stopTime = 20000; // 20 seconds
        strokeWidth = 1;
    } else {
        // Portrait mode
        stopTime = 10000; // 10 seconds
        strokeWidth = 0.5;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    setDisplayProperties(); // Adjust properties based on new aspect ratio after resize
}
