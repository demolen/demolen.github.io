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
    cnv.elt.style.pointerEvents = "none";  // this line disables mouse events for the canvas
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

// Function to hide the menu
function hideMenu() {
    document.getElementById("toggle").checked = false;
}

// Function to check if a point is inside a circle
function isPointInCircle(x, y, circleCenterX, circleCenterY, radius) {
    const dx = x - circleCenterX;
    const dy = y - circleCenterY;
    return dx * dx + dy * dy <= radius * radius;
}

// Function to handle document clicks
function handleDocumentClick(event) {
    const menuContainer = document.querySelector('.menu-container');
    const toggleButton = document.querySelector('.button-toggle');
    const toggleRect = toggleButton.getBoundingClientRect();

    // Calculate the center and effective radius of the circle
    const circleCenterX = toggleRect.left + toggleRect.width / 2;
    const circleCenterY = toggleRect.top + toggleRect.height / 2;
    const radius = 550;  // This should match the maximum radius in your CSS

    if (!menuContainer.contains(event.target) &&
        !isPointInCircle(event.clientX, event.clientY, circleCenterX, circleCenterY, radius)) {
        hideMenu();
    }
}

// Attach event listeners to nav items
document.addEventListener("DOMContentLoaded", function() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', hideMenu);
    });

    // Attach event listener to document to handle clicks outside menu
    document.addEventListener('click', handleDocumentClick);
});

// Function to update the height of the square based on scroll position and orientation
function updateSquareHeight() {
    // Get the current scroll position
    const scrollY = window.scrollY;

    // Get the height of the document
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Calculate the percentage of how much has been scrolled
    const scrollPercent = (scrollY / documentHeight) * 100;

    let initialHeight, finalHeight, initialWidth, finalWidth

    // Check if it's in portrait mode
    if (window.innerHeight > window.innerWidth) {
        initialHeight = 12.7;
        finalHeight = 61;
        initialWidth = 96;
        finalWidth = 96;
    } else {
        // Values for landscape mode
        initialHeight = 41;
        finalHeight = 60;
        initialWidth = 24;
        finalWidth = 60;
    }

    // Calculate the new height based on scroll percent
    const newHeight = initialHeight + (finalHeight - initialHeight) * (scrollPercent/10);
    const newWidth = initialWidth + (finalWidth - initialWidth) * (scrollPercent/10);


    // If scrolled downwards
    if (scrollY > 0) {
        // Update the height of .square2
        square2.style.height = `${Math.min(finalHeight, newHeight)}%`;
        square2.style.width = `${Math.min(finalWidth, newWidth)}%`;

    } else {
        // If scrolled back to top, reset the height to initial value
        square2.style.height = `${initialHeight}%`;
        square2.style.width = `${initialWidth}%`;
    }
}

// Select the .square2 element
const square2 = document.querySelector('.square2');

// Initial call to set the height
updateSquareHeight();

// Listen to the scroll event on the window
window.addEventListener('scroll', updateSquareHeight);

// Listen to the resize event to detect orientation change
window.addEventListener('resize', updateSquareHeight);
