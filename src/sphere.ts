const { Matrix } = require('./matrix');
const { Tuple, Point, Vector } = require('./tuple');

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

  normalAt(p: typeof Point) {
    const objectPoint = this.transform.invert().multiply(p);
    const normalInObjectSpace = Tuple.asPointOrVector(...objectPoint.subtract(this.center).tuple);
    const worldNormal = new Vector(...this.transform.invert().transpose().multiply(normalInObjectSpace).tuple);
    return worldNormal.normalize();
  }
}

export { Sphere };
