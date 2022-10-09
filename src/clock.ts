const { Tuple, Point, Vector, Color } = require('./tuple.ts');
const { Matrix } = require('./matrix.ts');
const { Canvas } = require('./canvas.ts');
const fs = require('fs');

const canvas = new Canvas(600, 600);

const color = new Color(1, 1, 1);

const twelveOClock = new Point(0, 1, 0);
const points = [];

for (let i=0; i < 12; i++){
  const rotation = Matrix.rotationZ(Math.PI * i / 6);
  const scale = Matrix.scaling(250, 250, 250);
  const translate = Matrix.translation(300, 300, 0);
  const transform = translate.multiply(scale).multiply(rotation);
  const clockHour = transform.multiply(twelveOClock);
  points.push(clockHour);
}

points.forEach((p) => {
  canvas.writePixel(Math.round(p.x), Math.round(canvas.height - p.y), color)
});
fs.writeFile('clock.ppm', canvas.toPPM(), function (err: any) {
  if (err) throw err;
  console.log('Done');
});
