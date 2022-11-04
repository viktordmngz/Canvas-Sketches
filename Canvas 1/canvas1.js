window.onload = function() {
	// fuction draw() {
	// 	// cntxt.beginPath();
	// 	cntxt.arc(540, 670, 50, 0, Math.PI*2);
	// 	cntxt.fillStyle = "red";
	// 	cntxt.fill();
	// 	cntxt.lineWidth = 10;
	// 	cntxt.strokeStyle = "black";
	// 	cntxt.stroke();
	// }

	var canvas = document.getElementById("canvas");
	var cntxt = canvas.getContext("2d");
	
	cntxt.beginPath();
	cntxt.rect(100,190,300,30);
	// cntxt.lineWidth = 2;
	cntxt.fillStyle = "#654321";
	cntxt.fill();

	cntxt.beginPath();
	cntxt.arc(100, 160, 50, 0, 2*Math.PI);
	cntxt.fillStyle = "#654321";
	cntxt.fill();

	cntxt.beginPath();
	cntxt.arc(100, 250, 50, 0, 2*Math.PI);
	cntxt.fillStyle = "#654321";
	cntxt.fill();
	// draw();
};
