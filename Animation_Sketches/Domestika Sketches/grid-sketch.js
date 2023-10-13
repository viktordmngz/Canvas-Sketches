const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const params = {
  cols: 40,
  rows: 40,
  scaleMin: 1,
  scaleMax: 10,
  freq: 0.001,
  amp: 0.2,
  bgcolor: "black",
  maincolor: "white"

}

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = params.bgcolor;
    context.strokeStyle = params.maincolor;
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;

    // Grid Area Properties
    const gridWidth = width * 0.8;
    const gridHeight = height * 0.8;
    // Cell Area Properties
    const cellWidth = gridWidth / cols;
    const cellHeight = gridHeight / rows;
    // Margins --> Gap between cells and canvas border
    const marginX = (width-gridWidth)/2;
    const marginY = (height-gridHeight)/2;

    for (let i = 0; i < numCells; i++) {
      // Using i, return the column number or row number (0 indexed)
      // ex: i = 3 with 4 columns and 3 rows --> column: 3, row: 0
      //     i = 4 --> column: 0, row: 1
      const colNumber = i % cols;
      const rowNumber = Math.floor(i/cols);

      // x and y --> starting coordinates
      const x = colNumber * cellWidth;
      const y = rowNumber * cellHeight;
      // Width & Height Lengths of lines
      const w = cellWidth * 0.8;
      const h = cellHeight * 0.8;

      // Noise, Angle, and Scale variables
      const n = random.noise3D(x, y, frame*10, params.freq);
      const angle = n * Math.PI * params.amp;
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      // Drawing the Sketch
      context.save();
      // center each cell
      context.translate(x+marginX, y+marginY);
      context.translate(cellWidth * 0.5, cellHeight * 0.5);
      // random rotation
      context.rotate(angle);

      context.beginPath();
      context.moveTo(-w/2, 0);
      context.lineTo(w/2, 0);
      context.lineWidth = scale;
      // context.lineWidth = 2;
      context.stroke();
      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;
  folder = pane.addFolder({ title: 'Grid'});
  folder.addInput(params, 'cols', {min: 2, max: 50, step: 1 });
  folder.addInput(params, 'rows', {min: 2, max: 50, step: 1 });
  folder.addInput(params, 'scaleMin', {min: 1, max: 100 });
  folder.addInput(params, 'scaleMax', {min: 1, max: 100 });
  
  folder = pane.addFolder({ title: 'Noise'});
  folder.addInput(params, 'freq', {min: -0.01, max: 0.01 })
  folder.addInput(params, 'amp', {min: 0, max: 1 })

};

createPane();
canvasSketch(sketch, settings);
