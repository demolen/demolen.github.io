let xMargin = 30; // Margin space left and right
let buWImg;
function preload() {
    buWImg = loadImage('Assets/BUW_Logo.png');
    studyBuddyImg = loadImage('Assets/StudyBuddy_Logo.png');
}
function setup() {
    let width = 638;
    let height = 900;
    createCanvas(width, height);

    background('lightGrey');

    textSize(32);
    textAlign(LEFT);
    textFont('Helvetica');

}

function draw() {

    push();
    let randomSize = random(10,15);
    let currentPosition = 0;
    let offset = 10;
    randomSize = randomSize + (width % randomSize + offset);
    translate(200,150);
    for (let j = 0; j < 100; j++) {
        rotate(sin(j) / 20);
        //scale(.86);

        noStroke();
        if (j % 2 === 0) {
            stroke('lightGrey');
            strokeWeight(2);
            fill('#453953');
            rect(currentPosition, currentPosition, randomSize*j, randomSize+j*20, 20);
        } else if (j % 9 ===1) {
            fill('#28eed2');
        } else {
            fill('#28eed2');
            rect(currentPosition, currentPosition, randomSize/20, randomSize*3, 2);
        }
        noStroke();
        rect(currentPosition-200, 360, randomSize*(j/10), randomSize/2+(j/10), 20);
        currentPosition = currentPosition + randomSize + offset;
    }
    pop();
    noStroke();
    fill(255);
    rect(0,height-140,width,140);
    // Add text
    fill(0); // Black text color
    textSize(50);
    text('AIEv - AI und Evidenz', xMargin, 100);
    textSize(18);
    text('in Curriculumsdesign, ' +
        'Serviceeinrichtungen und Hochschulverwaltung', xMargin, 150);
    textSize(28);

    text('30.09.2024', xMargin, 320);
    fill(0);
    textSize(28);

    text('HYBRIDE\nFACHTAGUNG', xMargin, 250);
    textSize(16); // Smaller text for detailed info
    text('// Evidenzbasiertes Curriculumsdesign, KI-gestütztes Studienmonitoring,' +
        '\n   datengestütze Studienverlaufsplanung' +
        '\n// Mehrwert, Anwendbarkeit, Nutzen-Kosten-Abwägungen' +
        '\n// Für Wissenschaft, Serviceeinrichtungen' +
        ' und Hochschulverwaltungen', xMargin, 670);
    image(buWImg, width-165, height-100, 1000/6, 327/6);
    image(studyBuddyImg, width-650, height-120, 1366/3, 261/3);
    noLoop();
}