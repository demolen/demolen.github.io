let sketch = function(p) {
    let xoff = 0;
    let yoff = 10000;
    let x, y;
    let prevX, prevY;
    let startTime;
    let stopDrawing = false;
    let stopTime;
    let strokeWidth;
    let strokeColor;
    let initialized = false;

    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

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
        const now = new Date();
        const hour = now.getHours();
        if (hour >= 18 || hour < 6) {
            strokeColor = 255;  // white
        } else {
            strokeColor = 0;  // black
        }

        if (!stopDrawing || (p.millis() - startTime) < stopTime) {
            let angle = p.noise(xoff) * p.TWO_PI * 4;
            let len = 5;
            let newX = x + p.cos(angle) * len;
            let newY = y + p.sin(angle) * len;

            p.stroke(strokeColor);
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
        if (isMobileDevice()) {
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
        // If the canvas has not been initialized, initialize it
        if (!initialized) {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            setDisplayProperties();
            initialized = true;
        }

        // If the device is not mobile, allow resizing
        if (!isMobileDevice()) {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            setDisplayProperties();
        }
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
    const menuContainer = document.querySelector('.nav');
    const toggleButton = document.querySelector('.button-toggle');
    const toggleRect = toggleButton.getBoundingClientRect();
    const circleCenterX = toggleRect.left + toggleRect.width / 2;
    const circleCenterY = toggleRect.top + toggleRect.height / 2;
    const radius = 550;

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
    document.addEventListener('click', handleDocumentClick);
});

// Darktime colors function
function setDarktimeColors() {
    const now = new Date();
    const hour = now.getHours();
    const darktimeColors = {
        '--main-color': '#1a1a1a',
        '--main-color-rgb': '26, 26, 26',
        '--secondary-color': '#e3e3e3',
        '--secondary-color-rgb': '227, 227, 227'
    };
    const daytimeColors = {
        '--main-color': '#e3e3e3',
        '--main-color-rgb': '227, 227, 227',
        '--secondary-color': '#1a1a1a',
        '--secondary-color-rgb': '26, 26, 26'
    };
    const root = document.documentElement;
    if (hour >= 18 || hour < 6) {
        for (const [key, value] of Object.entries(darktimeColors)) {
            root.style.setProperty(key, value);
        }
    } else {
        for (const [key, value] of Object.entries(daytimeColors)) {
            root.style.setProperty(key, value);
        }
    }
}

setDarktimeColors();
setInterval(setDarktimeColors, 1000 * 60);  // Update every minute
