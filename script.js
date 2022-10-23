'use strict';
// Variables
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX;
let lastY;
let hue = 0;
let direction = true;

// Canvas spec
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = 'red';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 25;

// Drawing function
function draw(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  hue++;
  if (ctx.lineWidth <= 15 || ctx.lineWidth >= 125) {
    direction = !direction;
  }
  direction ? ctx.lineWidth++ : ctx.lineWidth--;
}

// Event listeners
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));
