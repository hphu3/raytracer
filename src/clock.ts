const { Tuple, Point, Vector, Color } = require('./tuple.ts');
const { Matrix } = require('./matrix.ts');
const { Canvas } = require('./canvas.ts');
const fs = require('fs');

const canvas = new Canvas(300, 300);

const color = new Color(1, 0.5, 1);

const twelveOClock = new Point(0, 1, 0);
const points = [];

for (let i=0; i < 12; i++){
  const rotation = Matrix.rotationZ(Math.PI * i / 6);
  const scale = Matrix.scaling(100, 100, 100);
  const translate = Matrix.translation(150, 150, 0);
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
