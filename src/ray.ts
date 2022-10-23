const { Tuple, Point, Vector } = require('./tuple');
const { Sphere } = require('./sphere');

class Ray {
  origin: typeof Point
  direction: typeof Vector

  constructor(origin: typeof Point, direction: typeof Vector) {
    this.origin = origin;
    this.direction = direction;
  }

  position(time: Number) {
    return this.origin.add(this.direction.multiply(time));
  }

  intersects(sphere: typeof Sphere) {
    const sphereToRayTuple = this.origin.subtract(sphere.center)
    const sphereToRay = new Vector(sphereToRayTuple.x, sphereToRayTuple.y, sphereToRayTuple.z, sphereToRayTuple.w);
    const a = this.direction.dot(this.direction);
    const b = this.direction.dot(sphereToRay) * 2;
    const c = sphereToRay.dot(sphereToRay) - 1;

    const discriminant = Math.pow(b, 2) - 4 * a * c;
    if (discriminant < 0) { return [] }
    const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
    return [t1, t2];
  }
}

export { Ray };
