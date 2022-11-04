window.onload = function(){

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;
	var background = "#112235";
	ctx.fillStyle = background; // background color of canvas
	ctx.fillRect(0, 0, width, height);
	let color_outer = "#ffffee";
	let color_inner = "#3efaac";
	let colors = [color_outer, color_inner];

	let rows = 5;	// number of rows
	let cols = 5; // number of columns

	let w = 0.1*width; // box width
	let h = 0.1*height; // box height
	let gap = width * 0.03; // gap between boxes
	let ix = 100; // initial x pos
	let iy = 100; // initial y pos
	let x,y;			// initialize x, y position variables
	let offset = width * 0.05; //will be used for smaller boxes

	let boxes = []; // empty array to store positions of inner boxes
	
	for(let i = 0; i < rows; i++) {
		boxes[i] = [];
		for(let j = 0; j < cols; j++) {
			x = ix + (gap+w) * j;
			y = iy + (gap+h) * i;

			// outer boxes
			ctx.beginPath();
			ctx.strokeStyle = colors[0]; // color of outer box
			ctx.strokeRect(x, y, w, h);

			// inner boxes
			if(Math.random() < 0.3) {
				boxes[i][j] = [1, colors[1]]; // marking inner boxes position in boxes array
				ctx.beginPath();
				ctx.strokeStyle = colors[1]; // color of inner boxes
				ctx.strokeRect(x + offset/2, y + offset/2, w - offset, h - offset);
				/*
				
				x + offset/2 >>> moves the starting point to the right by half the offset
				y + offset/2 >>> moves the starting point down by half of the offset
				w - offset >>> makes a slightly thinner box from our original box (left and right)
				h - offset >>> makes a slightly "squished" box from our original (up and down)
				
				*/

				// Lines connecting corners
				for(let l = 0; l <= 1; l++){
					for(let k = 0; k <= 1; k++) {
						let lx = (x + offset/2) + k*(w-offset);
						let ly = (y + offset/2) + l*(h - offset);
						ctx.beginPath();
						ctx.strokeStyle = colors[0]; // color of lines connecting corners
						ctx.moveTo(lx, ly);
						ctx.lineTo(x + k*w, y + l*h);
						ctx.stroke();
					}
				}
				/*
				Want a function to grow inner box until it touches the outer box
					--> will it go one-by-one? or all at once?
						--> try all at once to start
				
				The inner box will grow at some rate ("grow" variable)
					--> lines connecting corners will have to shrink at inverse rate (1/grow)
				
				Once the box finishes growing, we will have to return the color of that square
					--> want to keep the color 

				*/

			}
			else {boxes[i][j] = [0, colors[0]]}
		}
	}
console.log(boxes);
// window.requestAnimationFrame(animation);
};