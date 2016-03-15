var canvasW = 500;
var canvasH = canvasW;
var isWrite = false;

var lastWrite = {x: 0, y: 0};
var lastTime = 0;
var lastLineWidth = -1;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = canvasW;
canvas.height = canvasH;

canvas.onmousedown = function (e) {
  e.preventDefault();
  isWrite = true;
  lastWrite = windowToCanvas(e.pageX, e.pageY);
  lastTime = new Date().getTime();
  // lastLineWidth = 
}
canvas.onmouseup = function (e) {
  e.preventDefault();
  isWrite = false;
}
canvas.onmouseout = function (e) {
  e.preventDefault();
  isWrite = false;
}
canvas.onmousemove = function (e) {
  e.preventDefault();
  if (isWrite) {
  	var write = windowToCanvas(e.pageX, e.pageY);
  	var time = new Date().getTime();
  	var s = dis(write, lastWrite);
  	var t = time - lastTime;
  	context.strokeStyle = 'black';
  	context.beginPath();
  	context.moveTo(lastWrite.x, lastWrite.y);
  	context.lineTo(write.x, write.y);
  	context.lineCap = 'round';   // 设置线帽为圆形
  	context.lineJoin = 'round';   // 将两线交汇时的转角为圆角
  	context.lineWidth = newLineWidth(s, t);
  	context.stroke();

  	lastWrite = write;
  	lastTime = time;
  }
}

drawBg();

function newLineWidth (s, t) {
  var  v = s / t;
  var resultLineWidth = 0;
  if (v <= 0.1) {
    resultLineWidth = 20;
  } else if (v >= 10) {
  	resultLineWidth = 5;
  } else {
  	resultLineWidth = 30 - (v - 0.1) * (30 - 1) / (10 - 0.1);
  }
  if (lastLineWidth == -1) {
  	return resultLineWidth;
  } else {
    return resultLineWidth * 1/3 + lastLineWidth * 2/3;
  }
}

function dis (now, last) {
  var s = Math.sqrt(Math.pow((now.x - last.x), 2) + Math.pow((now.y - last.y), 2));
  return s;
}

function windowToCanvas (x, y) {
  var change = {x: x - canvas.offsetLeft, y: y - canvas.offsetTop};
  return change;
}

function drawBg () {
  context.strokeStyle = 'red';

  context.beginPath();
  context.moveTo(3, 3);
  context.lineTo(canvasW - 3, 3);
  context.lineTo(canvasW - 3, canvasH - 3);
  context.lineTo(3, canvasH - 3);
  context.closePath();
  context.lineWidth = 6;
  context.stroke();

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(canvasW, canvasH);
  context.moveTo(canvasW, 0);
  context.lineTo(0, canvasH);
  context.moveTo(0, canvasH/2);
  context.lineTo(canvasW, canvasH/2);
  context.moveTo(canvasW/2, 0);
  context.lineTo(canvasW/2, canvasH);
  context.closePath();
  context.lineWidth = 1;
  context.stroke();
}