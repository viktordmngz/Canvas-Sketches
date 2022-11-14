window.onload = function(){

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var length = canvas.width;
	// var background = "#112235"; // background color of canvas
	var background = "#000000"; // background color Alt - White
	ctx.fillStyle = background;
	ctx.fillRect(0, 0, length, length);

	// COLORS FOR BOX
	// var color_outer = "#ffffee"; // outer box color
	var color_outer = 'Black'; // outer box color - ALTERNATE BLACK
	// var color_inner = "#3efaac"; // inner box color MINT
	// var color_inner = "Salmon"; // inner box color - ALTERNATE SALMON
	var color_inner = "Darkred"; // inner box color - ALTERNATE RED
	
	// COLORS FOR SHARINGAN
	// var colorFirst = '#bcbcbc';
	var colorFirst = 'Darkred';
	var colorSecond = '#121212'; // SILVER
	// var colorSecond = '#FFFFFF'; // WHITE
	var colorThird = "#000000";

	// COLORS FOR INNER TRAILS
	var colorTrails = '#000000';
	var colorTrailsALT = 'Darkred';
	var cycle = 0;

	var l = 0.6*length; // box length
	var ix = length/6; // initial x pos
	var iy = length/6; // initial y pos
	var offset = l*0.6; //will be used for smaller boxes
	var k = 0;
	// radius of small circle being used to draw trails
	var r1 = 10;
	var r2 = 12.5;
	var r3 = 15;

	// center the pupil (Not true center, just rough estimate)
	ctx.translate(35, 35);

	function rotated() {
		// // Background
		// ctx.beginPath();
		// ctx.fillStyle = background;
		// ctx.fillRect(0, 0, length, length);

		// // Outer box
		// ctx.beginPath();
		// ctx.strokeStyle = color_outer; // arr[0];
		// ctx.strokeRect(ix, iy, l, l);

		// variables for inner box
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

				// Translate to center, Rotate, Draw (Rect)
				ctx.beginPath();
				ctx.save();
				ctx.translate(ix+l/2, iy+l/2);
				ctx.rotate(Math.PI/2 + k);
				ctx.strokeStyle = color_inner;
				ctx.strokeRect(-l_inner/2*spinner, -l_inner/2*spinner, l_inner*spinner, l_inner*spinner);

				// PUPIL
				ctx.beginPath();
				ctx.fillStyle = 'Darkred';
				ctx.arc(0, 0, 50, 0, 3*Math.PI/4);
				ctx.fill();

				// // PAUSE/FREEZE
				// if(k >= Math.PI*2 + 51*Math.PI/180){
				// 	k = Math.PI*2 + 51*Math.PI/180
				// }
				
				// INNER TRAILS (BLACK --> RED)
				ctx.beginPath();
				ctx.fillStyle = colorTrails;
				ctx.arc(0, -l/2, r1, 0, 2*Math.PI);
				ctx.fill();
				ctx.beginPath();
				ctx.fillStyle = colorTrails;
				ctx.save();
				ctx.rotate(4*Math.PI/3);
				ctx.arc(0, -l/2, r1, 0, 2*Math.PI);
				ctx.fill();
				ctx.restore();				
				ctx.beginPath();
				ctx.fillStyle = colorTrails;
				ctx.save();
				ctx.rotate(2*Math.PI/3);
				ctx.arc(0, -l/2, r1, 0, 2*Math.PI);
				ctx.fill();
				ctx.restore();
				// Changing the trails colors after 2 rotations - DASHED
				if(cycle % 4 == 3) {
					let tempTrail = colorTrails;
					colorTrails = colorTrailsALT;
					colorTrailsALT = tempTrail;
					delete tempTrail;

				// 	// // Changing sizes - creates a slight border around inner trails
				// 	// let tempRadius = r1;
				// 	// r1 = r2;
				// 	// r2 = tempRadius;
				// 	// delete tempRadius;
				}

				/*

				Dashed Reason: Checking the same cycle value multiple times and
				switching the color back and forth. For cycle = 2, the colors
				continually switch back and forth until the cycle variable is
				changed, which just defaults to black (why black is solid and red
				is dashed).
				
				*/
				// Restore the drawing surface to normal angle and starting point
				ctx.restore();

				// BORDER
				ctx.beginPath();
				if( spinner == 1 ){ 
					cycle += 1;
					// Changing Border colors (3 color cycle)				
					if(cycle % 2 == 0){
						let tempColor = colorFirst;
						colorFirst = colorSecond;
						colorSecond = colorThird;
						colorThird = tempColor;
						delete tempColor;
					}

					if(cycle % 3 == 2){
						let tempRadius = r1;
						r1 = r2;
						r2 = r3;
						r3 = tempRadius;
						delete tempRadius;

						// Inner Trails color change - SOLID
						let tempTrail = colorTrails
						colorTrails = colorTrailsALT;
						colorTrailsALT = tempTrail;
						delete tempTrail;
					}
				}

				ctx.save();
				ctx.translate(ix+l/2, iy+l/2);
				ctx.rotate(3*Math.PI/4 - k);
				ctx.fillStyle = colorFirst;
				ctx.arc(l/2, -l/2, 50, 0, Math.PI/4);
				ctx.fill();
				ctx.restore();
				
				// Changing square from RED <--> BLACK when square is certain size
				if( Math.abs(spinner) > 1.25 ) {
					let temp = color_outer;
					color_outer = color_inner;
					color_inner = temp;
					delete temp;
				}

		}

		spin();

		k += Math.PI/180;

	}
		// console.log(growth)
	addEventListener('keydown', (event) => {if(event.code == 'Enter') { setInterval(rotated, 17);}}, {once: true});
};
