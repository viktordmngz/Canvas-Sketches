window.onload = function(){

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;
	var background = "#112235"; // background color of canvas
	ctx.fillStyle = background;
	ctx.fillRect(0, 0, width, height);

	var color_outer = "#ffffee"; // outer box color
	var color_inner = "#3efaac"; // inner box color

	var w = 0.6*width; // box width
	var h = 0.6*height; // box height
	var ix = width/6; // initial x pos
	var iy = height/6; // initial y pos
	var offset = w*0.6; //will be used for smaller boxes
	let k = 0;


	function rotated() {
		// Background
		ctx.beginPath();
		ctx.fillStyle = background;
		ctx.fillRect(0, 0, width, height);

		// Outer box
		ctx.beginPath();
		ctx.strokeStyle = color_outer; // arr[0];
		ctx.strokeRect(ix, iy, w, h);

		// variables for inner box
		let growth = 0.25 * Math.cos(k) + 0.25; // growing behavior
		const x_inner = ix + offset*growth; // inner box's x (top left)
		const y_inner = iy + offset*growth;	// inner box's y (top left)
		const w_inner = w - offset*growth*2; // inner box's width
		const h_inner = h - offset*growth*2; // inner box's height

		// Inner box
		ctx.beginPath();
		ctx.save();
		ctx.translate(x_inner+w_inner*growth, y_inner - h_inner*(Math.sqrt(2) - 1)*growth);
		ctx.rotate(Math.PI/2*growth);
		// Math.PI/2 * growth max: Math.PI/4 ==> 45 degrees
		// Math.PI/2 * growth min: 0
		ctx.strokeStyle = color_inner;
		ctx.strokeRect(0, 0, w_inner, h_inner);
		/*
			Distance from corner to center = Sqrt(2) * w/2 ==> (sqrt(2) * w)/2
			Want to keep this center point at (x_inner + w_inner/2, y_inner + h_inner/2) (non-rotated coord)
			
		*/

		// Inner Box Center
		ctx.beginPath();
		ctx.arc(w_inner/2, h_inner/2, 1, 0, Math.PI * 2);
		ctx.strokeStyle = color_inner;
		ctx.stroke();
		// ctx.beginPath();
		// ctx.moveTo(w_inner/2, h_inner/2);
		// ctx.lineTo();
		ctx.restore();

		// Original Inner Box
		ctx.beginPath();
		ctx.strokeStyle = "red";
		ctx.strokeRect(x_inner, y_inner, w_inner, h_inner);
		// Original Inner Box Center
		ctx.beginPath();
		ctx.arc(x_inner + w_inner/2, y_inner + h_inner/2, 1, 0, Math.PI * 2);
		ctx.strokeStyle = "red";
		ctx.stroke();


		// // Spinning Box
		// let spin = Math.sin(k);
		// ctx.beginPath();
		// ctx.save();
		// if(spin <= 0){
		// 	ctx.strokeStyle = "pink";
		// } else {
		// 	ctx.strokeStyle = "cyan";
		// }
		// ctx.translate(ix + offset/2, iy + offset/2);
		// ctx.rotate(k);
		// ctx.strokeRect(0, 0, w - offset, h - offset);
		// ctx.restore();

		// // Lines connecting corners
		// for(let i = 0; i <= 1; i++){
		// 	for(let j = 0; j <= 1; j++){
		// 		let lx = x_inner + j*w_inner; // corner x-pos
		// 		let ly = y_inner + i*h_inner; // corner y-pos

		// 		ctx.moveTo(ix+w*j,iy+h*i);
		// 		ctx.strokeStyle = color_outer; // arr[0];
		// 		ctx.save();
		// 		if(j == 0 && i == 0){
		// 			ctx.lineTo(lx + w_inner*growth,ly - h_inner*growth/3)
		// 		} else if(i == 0 && j == 1){
		// 				ctx.lineTo(lx + w_inner*growth, ly - h_inner*growth)
		// 		} else if(i == 1 && j == 0){
		// 				ctx.lineTo(lx - w_inner*growth, ly - h_inner*growth/3)
		// 		} else {
		// 				ctx.lineTo(lx - w_inner*growth, ly - h_inner*growth)
		// 		}
		// 		ctx.rotate(-1.5*growth);
		// 		ctx.stroke();
		// 		ctx.restore();
		// 	}
		// }

		if(growth <= 0) {
			let temp = color_outer;
			color_outer = color_inner;
			color_inner = temp;
		}

		k += Math.PI/180;

	}
		// console.log(growth)
	setInterval(rotated, 17);

};

/*
	Rotation so that the inner box starts rotated 90 degrees when at the center (smallest)
	x_inner must be ix + w/2 at smallest point, then rotate ccw 90 degrees
		* for each degree the box grows, it must rotate that proportion of 90
	growth --> goes from 0.5 to 0 then grows back to 0.5
	cos variable goes from 1 to 0 to -1 then grows back to 0 to 1
		k grows by 1 degree radians each iteration

	rotation will be same as growth --> start at 1, then stabilizes at 0, then returns to -1
	1. translate to starting point
	2. rotate by growth variable
	3. draw square
	4. draw lines from corners

	x_inner starting point: ix + w/2
		offset*growth == w/2

	y_inner starting point: iy + h/

*/