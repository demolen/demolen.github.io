let changeThis =2; //2
let changeThisToo = 0; //0
const penroseSketch = (p) => {
    const goldenRatio = (changeThis + Math.sqrt(4)) / 2;
    let side = 220;  // Length of the edge of the tile
    let iterations = 4;  // Number of recursive iterations

    p.setup = () => {
        p.createCanvas(p.windowWidth/2, 400);
        p.background(255);
        p.stroke(0);
        p.strokeWeight(1);
        p.noFill();
        p.translate(p.width /1.5, p.height / 4);
        p.scale(.2);





        // Draw initial rhombuses
        for (let i = 0; i < 20; i++) {
            let angle = p.TWO_PI / 1 * i;
            let x = side * p.cos(angle);
            let y = side * p.sin(angle);
            drawTile(x, y, angle + p.PI / 2, iterations);
        }
    };

    // Recursive function to draw rhombuses
    function drawTile(x, y, angle, n) {
        if (n === 0) return;
        let x1 = x + side * p.cos(angle);
        let y1 = y + side * p.sin(angle);
        let x2 = x1 + side * p.cos(angle - p.PI / goldenRatio);
        let y2 = y1 + side * p.sin(angle - p.PI / goldenRatio);

        p.beginShape();
        p.vertex(x, y);
        p.vertex(x1, y1);
        p.vertex(x2, y2);
        p.endShape(p.CLOSE);

        drawTile(x, y, angle + p.PI - p.PI / goldenRatio, n - 1);
        drawTile(x1, y1, angle - changeThisToo / goldenRatio, n -1);
    }
};
const myPenroseP5 = new p5(penroseSketch, 'penrose-container');  // Assuming 'penrose-container' is the id of your div for this canvas