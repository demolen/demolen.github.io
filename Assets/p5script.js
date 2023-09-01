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
    initializeLineOnRandomEdge();
    setDisplayProperties();
    startTime = millis();
    windowResized();
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

    if (x > width || x < 0 || y > height || y < 0) {
        initializeLineOnRandomEdge();

        if ((millis() - startTime) >= stopTime) {
            stopDrawing = true;
        }
    }
}

function initializeLineOnRandomEdge() {
    let edge = int(random(4));

    switch (edge) {
        case 0:
            x = random(width);
            y = 0;
            break;
        case 1:
            x = random(width);
            y = height;
            break;
        case 2:
            x = 0;
            y = random(height);
            break;
        case 3:
            x = width;
            y = random(height);
            break;
    }

    prevX = x;
    prevY = y;
}

function setDisplayProperties() {
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        strokeWidth = 0.5;
        if (width > height) {
            stopTime = 5000;  // 5 seconds for landscape on mobile
        } else {
            stopTime = 4000;  // 4 seconds for portrait on mobile
        }
    } else {
        if (width > height) {
            stopTime = 10000;  // 20 seconds for landscape on desktop
            strokeWidth = 1;
        } else {
            stopTime = 5000;  // 10 seconds for portrait on desktop
            strokeWidth = 1;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    setDisplayProperties();  // adjust properties based on new aspect ratio after resize
}
// Listen for a click on the element with id="scrollToIT"
document.getElementById("scrollToIT").addEventListener("click", function(event) {
    // Prevent the default action (navigating to a new page)
    event.preventDefault();

    // Smoothly scroll to the element with id="IT"
    document.getElementById("IT").scrollIntoView({behavior: "smooth"});
});
