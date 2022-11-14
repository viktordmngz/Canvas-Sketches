window.onload = function(){

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;
	var background = "#112235"; // background color of canvas
	ctx.fillStyle = background;
	ctx.fillRect(0, 0, width, height);

	var color_outer = "#ffffee"; // outer box color (WHITE-ISH)
	// var color_outer = "#3efafe";	// outer box color (LIGHT BLUE)
	var color_inner = "#3efaac"; // inner box color (MINT)
	// var color_inner = "Pink"; // inner box color 2 (PINK)


	var w = 0.6*width; // box width
	var h = 0.6*height; // box height
	var ix = width/5; // initial x pos
	var iy = height/6; // initial y pos
	var offset = w*0.6; //will be used for smaller boxes
	let k = 0;
	// variables for inner box
	let growth = 0.25 * Math.cos(k) + 0.25; // growing behavior
	const x_inner = (ix) + offset*growth;
	const y_inner = (iy) + offset*growth;
	const w_inner = w - offset*growth*2;
	const h_inner = h - offset*growth*2;

	// // Outer box
	// ctx.beginPath();
	// ctx.strokeStyle = color_outer; // arr[0];
	// ctx.strokeRect(ix, iy, w, h);

	// // Inner box
	// ctx.beginPath();
	// ctx.save();
	// ctx.translate(x_inner+w_inner*growth, y_inner - h_inner*growth/3);
	// ctx.rotate(1.5*growth);
	// ctx.strokeStyle = color_inner // arr[1];
	// ctx.strokeRect(0, 0, w_inner, h_inner);
	// ctx.restore();


	function Spiralsolid() {
		// Background
		// ctx.beginPath();
		// ctx.fillStyle = background;
		// ctx.fillRect(1, 1, width, height);

		// Outer box
		ctx.beginPath();
		ctx.strokeStyle = color_outer; // arr[0];
		ctx.strokeRect(ix, iy, w, h);

		// variables for inner box
		let growth = 0.25 * Math.cos(k) + 0.25; // growing behavior
		const x_inner = ix + offset*growth;
		const y_inner = iy + offset*growth;
		const w_inner = w - offset*growth*2;
		const h_inner = h - offset*growth*2;

		// Inner box
		ctx.beginPath();
		ctx.save();
		ctx.translate(x_inner+w_inner*growth, y_inner - h_inner*(Math.sqrt(2)-1)*growth);
		ctx.rotate(Math.PI/2 * growth);
		ctx.strokeStyle = color_inner;
		ctx.strokeRect(0, 0, w_inner, h_inner);
		ctx.restore();

		if(growth <= 0) {
			let temp = color_outer;
			color_outer = color_inner;
			color_inner = temp;
		}

		k += Math.PI/180;
	}

	// run the animation once 'ENTER' is pressed
	addEventListener('keydown', (event) => {
		if(event.code == "Enter"){
				setInterval(Spiralsolid, 17)
				}
			}, {once: true} // only run this listener once to start the animation
		);
	

};
