const { Matrix } = require('./matrix');
const { Point } = require('./tuple');

class Sphere {
  center: typeof Point
  transform: typeof Matrix

  constructor() {
    this.center = new Point(0, 0, 0);
    this.transform = Matrix.identity();
  }

  setTransform(t: typeof Matrix) {
    this.transform = t;
  }
}

export { Sphere };
