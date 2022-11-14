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
	// let colors = [color_outer, color_inner];

	// var color_third = "pink"; // color of offset position (OPTIONAL)

	// var rows = 1;	// number of rows
	// var cols = 1; // number of columns

	var w = 0.6*width; // box width
	var h = 0.6*height; // box height
	var ix = width/5; // initial x pos
	var iy = height/6; // initial y pos
	var offset = w*0.6; //will be used for smaller boxes
	let k = 0;


	function Cube() {
		// Background
		ctx.beginPath();
		ctx.fillStyle = background;
		ctx.fillRect(1, 1, width, height);

		// Outer box
		ctx.beginPath();
		ctx.strokeStyle = color_outer; // arr[0];
		ctx.strokeRect(ix, iy, w, h);

		// Filling in outer box
		ctx.beginPath();
		ctx.fillStyle = background;
		ctx.fillRect(ix+1, iy+1, w-1,h-1);

		// variables for inner box
		let rotater = w * (0.25*Math.cos(k) + 0.25);
		let growth = 0.25 * Math.cos(k) + 0.25; // growing behavior
		const x_inner = (ix + offset*growth) + rotater;
		const y_inner = iy + offset*growth;
		const w_inner = w - offset*growth*2;
		const h_inner = h - offset*growth*2;

		// Inner box
		ctx.beginPath();
		ctx.strokeStyle = color_inner // arr[1];
		ctx.strokeRect(x_inner, y_inner, w_inner, h_inner);

		// Lines connecting corners
		for(let i = 0; i <= 1; i++){
			for(let j = 0; j <= 1; j++){
				let lx = x_inner + j*w_inner;
				let ly = y_inner + i*h_inner;

				ctx.moveTo(lx,ly);
				ctx.strokeStyle = color_outer // arr[0];
				ctx.lineTo(ix+w*j,iy+h*i);
				ctx.stroke();
			}
		}

		if(growth <= 0) {
			let temp = color_outer;
			color_outer = color_inner;
			color_inner = temp;
		}


		k += Math.PI/180;
	}
		// console.log(growth)
	setInterval(Cube, 17);

};

/*
	Rotation so that the inner box starts rotated 90 degrees when at the center (smallest)
	x_inner must be ix + w/2 at smallest point, then rotate ccw 90 degrees
		* for each degree the box grows, it must rotate that proportion of 90
	growth --> goes from 0.5 to 0 then grows back to 0.5
	cos variable goes from 1 to 0 to -1 then grows back to 0 to 1
		k grows by 1 degree radians each iteration

	rotation will be same as growth --> start at 1, then stabilizes at 0, then returns to -1

*/