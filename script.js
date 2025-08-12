
const canvas = document.getElementById("complexPlane");
const ctx = canvas.getContext("2d");

let width, height;
let scale = 50; // píxeles por unidad compleja
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let dragStart = {x: 0, y: 0};

function resizeCanvas() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
    drawPlane();
}

function drawPlane() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 1;

    // Ejes
    ctx.beginPath();
    ctx.moveTo(0, height/2 + offsetY);
    ctx.lineTo(width, height/2 + offsetY);
    ctx.moveTo(width/2 + offsetX, 0);
    ctx.lineTo(width/2 + offsetX, height);
    ctx.stroke();

    // Cuadrícula
    for (let x = width/2 + offsetX; x < width; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for (let x = width/2 + offsetX; x > 0; x -= scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for (let y = height/2 + offsetY; y < height; y += scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    for (let y = height/2 + offsetY; y > 0; y -= scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

// Eventos para mover el plano
canvas.addEventListener("mousedown", e => {
    isDragging = true;
    dragStart.x = e.clientX;
    dragStart.y = e.clientY;
});
canvas.addEventListener("mousemove", e => {
    if (isDragging) {
        offsetX += e.clientX - dragStart.x;
        offsetY += e.clientY - dragStart.y;
        dragStart.x = e.clientX;
        dragStart.y = e.clientY;
        drawPlane();
    }
});
canvas.addEventListener("mouseup", () => isDragging = false);
canvas.addEventListener("mouseleave", () => isDragging = false);

// Zoom con scroll
canvas.addEventListener("wheel", e => {
    e.preventDefault();
    const zoomIntensity = 1.1;
    if (e.deltaY < 0) {
        scale *= zoomIntensity;
    } else {
        scale /= zoomIntensity;
    }
    drawPlane();
});

// Ajuste inicial
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
