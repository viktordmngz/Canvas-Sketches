window.onload = function(){

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var length = canvas.width;
	var background = "#112235"; // background color of canvas
	ctx.fillStyle = background;
	ctx.fillRect(0, 0, length, length);

	var color_outer = "#ffffee"; // outer box color
	var color_inner = "#3efaac"; // inner box color

	var l = 0.6*length; // box length
	var ix = length/6; // initial x pos
	var iy = length/6; // initial y pos
	var offset = l*0.6; //will be used for smaller boxes
	let k = 0;


	function rotated() {
		// Background
		ctx.beginPath();
		ctx.fillStyle = background;
		ctx.fillRect(0, 0, length, length);

		// Outer box
		ctx.beginPath();
		ctx.strokeStyle = color_outer; // arr[0];
		ctx.strokeRect(ix, iy, l, l);

		// variables for inner box
		let growth = 0.25 * Math.cos(k) + 0.25; // growing behavior Range: [0, 0.5] Center: 0.25
		const x_inner = ix + offset/2; // inner box's x (top left)
		const y_inner = iy + offset/2;	// inner box's y (top left)
		const l_inner = l - offset; // inner box's length

		// // Inner box
		// ctx.beginPath();
		// ctx.save();
		// ctx.translate(x_inner + 0.5*(l_inner), y_inner - l_inner*(Math.sqrt(2) - 1)/2);
		// ctx.rotate(Math.PI/4+k);
		// ctx.strokeStyle = color_inner;
		// ctx.strokeRect(0, 0, l_inner, l_inner);
		
		// 	Distance from corner to center = Sqrt(2) * l/2 ==> (sqrt(2) * l)/2
		// 	Want to keep this center point at (x_inner + l_inner/2, y_inner + l_inner/2) (non-rotated coord)
			
		

		// // Inner Box Center
		// ctx.beginPath();
		// ctx.arc(l_inner/2, l_inner/2, 1, 0, Math.PI * 2);
		// ctx.strokeStyle = color_inner;
		// ctx.stroke();
		// ctx.restore();
		

		// Original Inner Box
		ctx.beginPath();
		ctx.strokeStyle = "red";
		ctx.strokeRect(x_inner, y_inner, l_inner, l_inner);
		// Original Inner Box Center
		ctx.beginPath();
		ctx.arc(x_inner + l_inner/2, y_inner + l_inner/2, 1, 0, Math.PI * 2);
		ctx.strokeStyle = "red";
		ctx.stroke();

		// // Final Max Inner Box
		// ctx.beginPath();
		// ctx.save();
		// ctx.translate(ix+l/2, iy+l/2);
		// ctx.rotate(Math.PI/4)
		// ctx.strokeStyle = "Yellow";
		// ctx.strokeRect(-l/4*Math.sqrt(2), -l/4*Math.sqrt(2), l/2*Math.sqrt(2), l/2*Math.sqrt(2));
		// ctx.restore();


		function spin() {
				// Spinning Box ==> New Inner Box
				// if(k >= Math.PI){ k = Math.PI }; // Pauses functions at max size
				let eps = 5/4*Math.sqrt(2);
				let range_cos = (eps - 1)/2;
				let center_range_cos = (eps+1)/2;
				let spinner = -range_cos*Math.cos(k)+center_range_cos;
				
				// Desired path of the inner square (Circle)
				ctx.beginPath();
				ctx.strokeStyle = color_outer;
				ctx.arc(x_inner + l_inner/2, y_inner + l_inner/2, l_inner/2*Math.sqrt(2)*spinner, 0, Math.PI * 2);
				ctx.stroke();

				ctx.beginPath();
				ctx.save();
				ctx.translate(ix+l/2, iy+l/2);
				ctx.rotate(Math.PI/4 + k);
				ctx.strokeStyle = color_inner;
				// if(Math.cos(Math.PI/4 + k) >= Math.sqrt(2)/2){
				// 	ctx.strokeStyle = "Gold";
				// } else { ctx.strokeStyle = "cyan";};
				ctx.strokeRect(-l_inner/2*spinner, -l_inner/2*spinner, l_inner*spinner, l_inner*spinner);
				ctx.restore();
		}

		spin();

		// // Lines connecting corners
		// for(let i = 0; i <= 1; i++){
		// 	for(let j = 0; j <= 1; j++){
		// 		let lx = x_inner + j*l_inner; // corner x-pos
		// 		let ly = y_inner + i*l_inner; // corner y-pos

		// 		ctx.moveTo(ix+l*j,iy+h*i);
		// 		ctx.strokeStyle = color_outer; // arr[0];
		// 		ctx.save();
		// 		if(j == 0 && i == 0){
		// 			ctx.lineTo(lx + l_inner*growth,ly - l_inner*growth/3)
		// 		} else if(i == 0 && j == 1){
		// 				ctx.lineTo(lx + l_inner*growth, ly - l_inner*growth)
		// 		} else if(i == 1 && j == 0){
		// 				ctx.lineTo(lx - l_inner*growth, ly - l_inner*growth/3)
		// 		} else {
		// 				ctx.lineTo(lx - l_inner*growth, ly - l_inner*growth)
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