class Tuple {
  static EPSILON = 0.0001;
  tuple: Array<number>;

  static asPointOrVector(x: number, y: number, z: number, w: number) {
    if (w === 1) {
      return new Point(x, y, z);
    } else if (w === 0) {
      return new Vector(x, y, z);
    }
  }

  constructor(x: number, y: number, z: number, w?: number) {
    this.tuple = [x, y, z];
    if (w != null) { this.tuple.push(w) }
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
    return this.tuple.length > 3 ? this.tuple[3] : null;
  }

  isPoint() { return this.w === 1 };
  isVector() { return this.w === 0 };

  equals(t2: Tuple) {
    for (let i=0; i<this.tuple.length; i++) {
      if (Math.abs(this.tuple[i] - t2.tuple[i]) >= Tuple.EPSILON) {
        return false;
      }
    }
    return true;
  }

  add(t2: Tuple) {
    const added = [];
    for (let i=0; i<this.tuple.length; i++) {
      added.push(this.tuple[i] + t2.tuple[i]);
    }
    return new Tuple(...(added as [number, number, number, number]));
  }

  subtract(t2: Tuple) {
    const subtracted = [];
    for (let i=0; i<this.tuple.length; i++) {
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

class Color extends Tuple {
  constructor(x: number, y: number, z: number) {
    super(x, y, z);
  }

  get red() {
    return this.tuple[0];
  }

  get green() {
    return this.tuple[1];
  }

  get blue() {
    return this.tuple[2];
  }

  add(c2: Color) {
    return new Color(...super.add(c2).tuple as [number, number, number]);
  }

  subtract(c2: Color) {
    return new Color(...super.subtract(c2).tuple as [number, number, number]);
  }

  multiply(s: number) {
    return new Color(...super.multiply(s).tuple as [number, number, number]);
  }

  blend(c2: Color) {
    return new Color(this.red * c2.red, this.green * c2.green, this.blue * c2.blue);
  }
}

export { Tuple, Point, Vector, Color };
