let sketch = function(p) {
    let xoff = 0;
    let yoff = 10000;
    let x, y;
    let prevX, prevY;
    let startTime;
    let stopDrawing = false;
    let stopTime;
    let strokeWidth;

    p.setup = function() {
        p.frameRate(60);
        let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
        cnv.parent('canvas-container');
        cnv.elt.style.pointerEvents = "none";
        p.background(255);
        initializeLineOnRandomEdge();
        setDisplayProperties();
        startTime = p.millis();
        p.windowResized();
    };

    p.draw = function() {
        if (!stopDrawing || (p.millis() - startTime) < stopTime) {
            let angle = p.noise(xoff) * p.TWO_PI * 4;
            let len = 5;
            let newX = x + p.cos(angle) * len;
            let newY = y + p.sin(angle) * len;

            p.stroke(0);
            p.strokeWeight(strokeWidth);

            p.line(prevX, prevY, newX, newY);

            prevX = newX;
            prevY = newY;

            x = newX;
            y = newY;

            xoff += 0.01;
            yoff += 0.01;
        }

        if (x > p.width || x < 0 || y > p.height || y < 0) {
            initializeLineOnRandomEdge();

            if ((p.millis() - startTime) >= stopTime) {
                stopDrawing = true;
            }
        }
    };

    function initializeLineOnRandomEdge() {
        let edge = parseInt(p.random(4));

        switch (edge) {
            case 0:
                x = p.random(p.width);
                y = 0;
                break;
            case 1:
                x = p.random(p.width);
                y = p.height;
                break;
            case 2:
                x = 0;
                y = p.random(p.height);
                break;
            case 3:
                x = p.width;
                y = p.random(p.height);
                break;
        }

        prevX = x;
        prevY = y;
    }

    function setDisplayProperties() {
        let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) {
            strokeWidth = 0.5;
            if (p.width > p.height) {
                stopTime = 5000;
            } else {
                stopTime = 4000;
            }
        } else {
            if (p.width > p.height) {
                stopTime = 60000;
                strokeWidth = 1;
            } else {
                stopTime = 5000;
                strokeWidth = 1;
            }
        }
    }

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        setDisplayProperties();
    };
};

let myp5 = new p5(sketch);

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

    let initialHeight, finalHeight, initialWidth, finalWidth,initialLeftOfGold,finalLeftOfGold;

    // Check if it's in portrait mode
    if (window.innerHeight > window.innerWidth) {

    } else {
        // Values for landscape mode
        initialHeight = 41;
        finalHeight = 48;
        initialWidth = 24;
        finalWidth = 28;
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
const square6 = document.querySelector('.square6');

// Initial call to set the height
updateSquareHeight();

// Listen to the scroll event on the window
window.addEventListener('scroll', updateSquareHeight);

// Listen to the resize event to detect orientation change
window.addEventListener('resize', updateSquareHeight);
