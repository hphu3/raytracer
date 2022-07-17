class Tuple {
  static EPSILON = 0.0001;
  tuple: Array<number>;

  constructor(x: number, y: number, z: number, w: number) {
    this.tuple = [x, y, z, w];
  }

  get x() {
    return this.tuple[0];
  }

  get y() {
    return this.tuple[1];
  }

  get z() {
    return this.tuple[2];
  }

  get w() {
    return this.tuple[3];
  }

  isPoint() { return this.w === 1 };
  isVector() { return this.w === 0 };

  equals(t2: Tuple) {
    for (let i=0; i<4; i++) {
      if (Math.abs(this.tuple[i] - t2.tuple[i]) >= Tuple.EPSILON) {
        return false;
      }
    }
    return true;
  }

  add(t2: Tuple) {
    const added = [];
    for (let i=0; i<4; i++) {
      added.push(this.tuple[i] + t2.tuple[i]);
    }
    return new Tuple(...(added as [number, number, number, number]));
  }

  subtract(t2: Tuple) {
    const subtracted = [];
    for (let i=0; i<4; i++) {
      subtracted.push(this.tuple[i] - t2.tuple[i]);
    }
    return new Tuple(...(subtracted as [number, number, number, number]));
  }

  negate() {
    const negated = this.tuple.map((e) => -e) as [number, number, number, number];
    return new Tuple(...negated);
  }

  multiply(s: number) {
    const multiplied = this.tuple.map((e) => e*s) as [number, number, number, number];
    return new Tuple(...multiplied);
  }
}

class Point extends Tuple {
  constructor(x: number, y: number, z: number) {
    super(x, y, z, 1);
  }
}

class Vector extends Tuple {
  constructor(x: number, y: number, z: number) {
    super(x, y, z, 0);
  }

  magnitude() {
    return Math.sqrt(this.tuple.reduce((acc, e) => {
      return acc + (e ** 2);
    }, 0));
  }

  normalize() {
    const m = this.magnitude();
    const normalized = this.tuple.map((e) => (e / m)) as [number, number, number];
    return new Vector(...normalized);
  }

  dot(v: Vector) {
   return this.tuple.reduce((acc, e, index) => {
      return acc + (this.tuple[index] * v.tuple[index]);
    }, 0);
  }

  cross(v: Vector) {
    return new Vector(
      this.tuple[1] * v.tuple[2] - this.tuple[2] * v.tuple[1],
      this.tuple[2] * v.tuple[0] - this.tuple[0] * v.tuple[2],
      this.tuple[0] * v.tuple[1] - this.tuple[1] * v.tuple[0]
    );
  }
}

export { Tuple, Point, Vector };
