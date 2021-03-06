var canvas = document.createElement("canvas");
var cxt = canvas.getContext('2d');
var _threshold = 160;
var _open = false;
var _orientation = null;
var _speed = 2;
document.onreadystatechange = function() {
	if (document.readyState == 'complete') {
		canvas.width = document.body.offsetWidth;
		canvas.height = document.body.offsetHeight;
		document.addEventListener("onresize", function(e) {
			canvas.width = document.body.offsetWidth;
			canvas.height = document.body.offsetHeight;
		})
		run();
	}
}
function run() {
	var widthThreshold = window.outerWidth - window.innerWidth > _threshold;
	var heightThreshold = window.outerHeight - window.innerHeight > _threshold;
	var orientation = widthThreshold ? 'vertical' : 'horizontal';

	!(!(heightThreshold && widthThreshold) 
			&&((window.Firebug && window.Firebug.chrome 
					&& window.Firebug.chrome.isInitialized) 
					|| widthThreshold || heightThreshold)) 
					&& drawAll();
	//setTimeout(run, 150);
	requestAnimationFrame(run)
}
/**
 * 绘制一片星空
 */
var stars = {
		array:[],
		mode:0,
		black:100
}
function drawAll() {
	cxt.fillStyle = 'black';
	cxt.fillRect(0, 0, canvas.width, canvas.height);
	if(stars.black<=0 || stars.array.length == 0){
		stars.array = [];
		for (var i = 0; i <= 300; i++) {
			var fiveStart = {};
			fiveStart.bigRadius = Math.random() * 6 + 6;
			fiveStart.smallRadius = fiveStart.bigRadius / 2.0;
			fiveStart.offsetX = Math.random() * canvas.width;
			fiveStart.offsetY = Math.random() * canvas.height;
			fiveStart.RotationAngle = Math.random() * 360;
			stars.array.push(fiveStart);
		}
	}
	for(var i in stars.array){
		drawFiveStar(cxt, stars.array[i]);
	}
	stars.mode == 0 && (stars.black -=_speed);
	stars.mode == 1 && (stars.black +=_speed);
	stars.mode == 0 && stars.black<=0 && (stars.mode = 1)
	stars.mode == 1 && stars.black>=100 && (stars.mode = 0)
	document.body.style.backgroundImage = 'url("' + canvas.toDataURL("image/png") + '")';
}

/**
 * 绘制五角星的方法
 */
function drawFiveStar(cxt, fiveStart) {
	var per = stars.black / 100;
	cxt.beginPath();
	var x = 0,
		y = 0;
	for (var i = 0; i < 5; i++) {
		x = Math.cos((18 + 72 * i - fiveStart.RotationAngle) / 180 * Math.PI);
		x = x * fiveStart.bigRadius + fiveStart.offsetX;
		y = -Math.sin((18 + 72 * i - fiveStart.RotationAngle) / 180 * Math.PI);
		y = y * fiveStart.bigRadius + fiveStart.offsetY;
		cxt.lineTo(x, y);
		x = Math.cos((54 + i * 72 - fiveStart.RotationAngle) / 180 * Math.PI);
		x = x * fiveStart.smallRadius + fiveStart.offsetX;
		y = -Math.sin((54 + i * 72 - fiveStart.RotationAngle) / 180 * Math.PI);
		y = y * fiveStart.smallRadius + fiveStart.offsetY;
		cxt.lineTo(x, y);
	}
	cxt.closePath();
	cxt.lineWidth = 3;
	cxt.strokeStyle = "rgb("+255*per+","+225*per+",0)";
	//cxt.strokeStyle = "#FD5";
	cxt.fillStyle = "rgb("+255*per+","+255*per+",0)";
	//cxt.fillStyle = 'yellow';
	cxt.lineJoin = "round";
	cxt.fill();
	cxt.stroke();
}