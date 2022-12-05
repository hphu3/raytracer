const { Tuple, Point, Vector } = require('./tuple');
const { Sphere } = require('./sphere');
const { Matrix } = require('./matrix');
const { Intersections, Intersection } = require('./intersection');

class Ray {
  origin: typeof Point;
  direction: typeof Vector;

  constructor(origin: typeof Point, direction: typeof Vector) {
    this.origin = origin;
    this.direction = direction;
  }

  position(time: Number) {
    return this.origin.add(this.direction.multiply(time));
  }

  intersects(sphere: typeof Sphere) {
    // use inversely transformed ray in intersection calc to account for sphere transforms
    const rayToCast = this.transform(sphere.transform.invert());
    const sphereToRayTuple = rayToCast.origin.subtract(sphere.center)
    const sphereToRay = new Vector(sphereToRayTuple.x, sphereToRayTuple.y, sphereToRayTuple.z, sphereToRayTuple.w);
    const a = rayToCast.direction.dot(rayToCast.direction);
    const b = rayToCast.direction.dot(sphereToRay) * 2;
    const c = sphereToRay.dot(sphereToRay) - 1;

    const discriminant = Math.pow(b, 2) - 4 * a * c;
    if (discriminant < 0) { return new Intersections() }
    const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);

    return new Intersections(new Intersection(t1, sphere), new Intersection(t2, sphere));
  }

  transform(matrix: typeof Matrix) {
    const tOrigin = matrix.multiply(this.origin);
    const tDirection = matrix.multiply(this.direction);
    return new Ray(tOrigin as typeof Point, tDirection as typeof  Vector);
  }
}

export { Ray };
