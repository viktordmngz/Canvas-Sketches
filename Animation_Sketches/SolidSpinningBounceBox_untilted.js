window.onload = function(){

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var length = canvas.width;
	var background = "#112235"; // background color of canvas
	ctx.fillStyle = background;
	ctx.fillRect(0, 0, length, length);

	var color_outer = "#ffffee"; // outer box color

	// var color_inner = "#3efaac"; // inner box color MINT
	var color_inner = "Salmon"; // inner box color - ALTERNATE SALMON

	var l = 0.6*length; // box length
	var ix = length/6; // initial x pos
	var iy = length/6; // initial y pos
	var offset = l*0.6; //will be used for smaller boxes
	let k = 0;


	function rotated() {
		// // Background
		// ctx.beginPath();
		// ctx.fillStyle = background;
		// ctx.fillRect(0, 0, length, length);

		// Outer box
		ctx.beginPath();
		ctx.strokeStyle = color_outer; // arr[0];
		ctx.strokeRect(ix, iy, l, l);

		// variables for inner box
		let growth = 0.25 * Math.cos(k) + 0.25; // growing behavior Range: [0, 0.5] Center: 0.25
		const x_inner = ix + offset/2; // inner box's x (top left)
		const y_inner = iy + offset/2;	// inner box's y (top left)
		const l_inner = l - offset; // inner box's length


		function spin() {
				// Spinning Box ==> New Inner Box
				// if(k >= Math.PI){ k = Math.PI }; // Pauses functions at max size
				let min = 1.0; // desired minumum value
				let max = 2.5; // desired maximum value
				let range_cos = Math.abs(max - min)/2;
				let center_range_cos = (min+max)/2;
				let spinner = -range_cos*Math.cos(k)+center_range_cos;
				
				// // Desired path of the inner square (Circle)
				// ctx.beginPath();
				// ctx.strokeStyle = color_outer;
				// ctx.arc(x_inner + l_inner/2, y_inner + l_inner/2, l_inner/2*Math.sqrt(2)*spinner, 0, Math.PI * 2);
				// ctx.stroke();

				ctx.beginPath();
				ctx.save();
				ctx.translate(ix+l/2, iy+l/2);
				ctx.rotate(Math.PI/2 + k);
				ctx.strokeStyle = color_inner;
				// if(Math.cos(Math.PI/4 + k) >= Math.sqrt(2)/2){
				// 	ctx.strokeStyle = "Gold";
				// } else { ctx.strokeStyle = "cyan";};
				ctx.strokeRect(-l_inner/2*spinner, -l_inner/2*spinner, l_inner*spinner, l_inner*spinner);
				ctx.restore();
		}

		spin();


		if(growth <= 0) {
			let temp = color_outer;
			color_outer = color_inner;
			color_inner = temp;
		}

		k += Math.PI/180;

	}
		// console.log(growth)
	addEventListener('keydown', (event) => {if(event.code == 'Enter') {setInterval(rotated, 17);}}, {once: true});

};