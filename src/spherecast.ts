const { Tuple, Point, Vector, Color } = require('./tuple.ts');
const { Matrix } = require('./matrix.ts');
const { Intersection, Intersections } = require('./intersection.ts');
const { Canvas } = require('./canvas.ts');
const { Sphere } = require('./sphere.ts');
const { Ray } = require('./ray.ts');
const fs = require('fs');

const canvas = new Canvas(300, 300);
const color = new Color(1, 0.5, 0.5);
const sphere = new Sphere();
sphere.setTransform(
  Matrix.translation(canvas.width / 2, canvas.height / 2, 0)
    .multiply(Matrix.shearing(1, 0, 0, 0, 0, 0))
    .multiply(Matrix.scaling(100, 100, 1))
);
const cameraOrigin = new Point(canvas.width / 2, canvas.height / 2, -10);

for (let x=0; x<canvas.width; x++) {
  for (let y=0; y<canvas.height; y++) {
    let direction = new Point(x, y, 0).subtract(cameraOrigin);
    const r = new Ray(cameraOrigin, direction);
    const xs = r.intersects(sphere);
    const intersectionHit = xs.hit();
    if (intersectionHit != null) {
      canvas.writePixel(Math.round(x), Math.round(y), color)
    }
  }
}


fs.writeFile('sphere.ppm', canvas.toPPM(), function (err: any) {
  if (err) throw err;
  console.log('Done');
});
