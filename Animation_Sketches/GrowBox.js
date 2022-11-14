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
	let growth = 0.5;
	let colors = [color_outer, color_inner];

	// var color_third = "pink"; // color of offset position (OPTIONAL)

	var rows = 1;	// number of rows
	var cols = 1; // number of columns

	var w = 0.6*width; // box width
	var h = 0.6*height; // box height
	var ix = width/5; // initial x pos
	var iy = height/6; // initial y pos
	var offset = w*0.6; //will be used for smaller boxes


	function Grow() {
		// Outer box
		ctx.beginPath();
		ctx.strokeStyle = color_outer // arr[0];
		ctx.strokeRect(ix, iy, w, h);

		// Filling in outer box
		ctx.beginPath();
		ctx.fillStyle = background;
		ctx.fillRect(ix+1, iy+1, w-1,h-1)

		// variables for inner box
		const x_inner = ix + offset*growth;
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

		if(growth == 0) {
			let temp = color_outer;
			color_outer = color_inner;
			color_inner = temp;

			growth = 0.5;
		}
		else if(x_inner-ix < 0.1) {
				growth = 0;

		}
		else {
				growth -= 0.0025;
		}

		return arr;
		// console.log(growth)
	}

	setInterval(Grow, 17);

};
