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

