const { Matrix } = require('./matrix');
const { Tuple, Point, Vector } = require('./tuple');
const { Material } = require('./material');

class Sphere {
  center: typeof Point
  transform: typeof Matrix
  material: typeof Material

  constructor() {
    this.center = new Point(0, 0, 0);
    this.transform = Matrix.identity();
    this.material = new Material();
  }

  setTransform(t: typeof Matrix) {
    this.transform = t;
  }

  normalAt(p: typeof Point) {
    const objectPoint = this.transform.invert().multiply(p);
    const normalInObjectSpace = objectPoint.subtract(this.center);
    const worldNormal = new Vector(...this.transform.invert().transpose().multiply(normalInObjectSpace).tuple);
    return worldNormal.normalize();
  }
}

export { Sphere };
