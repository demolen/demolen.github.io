
    document.addEventListener("mousemove", function (event) {
    const shapes = document.querySelectorAll(".square, .square2, .square3, #rect");

    shapes.forEach((shape) => {
    const rect = shape.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    const pseudoElement = shape.querySelector(":before");
    shape.style.setProperty('--mouse-x', x + '%');
    shape.style.setProperty('--mouse-y', y + '%');
});
});
