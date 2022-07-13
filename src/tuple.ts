class Tuple {
  static EPSILON = 0.0001;

  constructor(x, y, z, w) {
    this.tuple = [x, y, z, w];
  }

  getW() {
    return this.tuple[3];
  }

  isPoint() { return this.getW() === 1 };
  isVector() { return this.getW() === 0 };

  equals(t2) {
    for (let i=0; i<4; i++) {
      if (Math.abs(this.tuple[i] - t2.tuple[i]) >= Tuple.EPSILON) {
        return false;
      }
    }
    return true;
  }

  add(t2) {
    const added = [];
    for (let i=0; i<4; i++) {
      added.push(this.tuple[i] + t2.tuple[i]);
    }
    return new Tuple(...added);
  }

  subtract(t2) {
    const subtracted = [];
    for (let i=0; i<4; i++) {
      subtracted.push(this.tuple[i] - t2.tuple[i]);
    }
    return new Tuple(...subtracted)
  }

  negate() {
    return new Tuple(...this.tuple.map((e) => -e));
  }

  multiply(s) {
    return new Tuple(...this.tuple.map((e) => e*s));
  }
}

class Point extends Tuple {
  constructor(x, y, z) {
    super(x, y, z, 1);
  }
}

class Vector extends Tuple {
  constructor(x, y, z) {
    super(x, y, z, 0);
  }

  magnitude() {
    return Math.sqrt(this.tuple.reduce((acc, e) => {
      return acc + (e ** 2);
    }, 0));
  }

  normalize() {
    const m = this.magnitude();
    return new Vector(...this.tuple.map((e) => (e / m)));
  }

  dot(v) {
   return this.tuple.reduce((acc, e, index) => {
      return acc + (this.tuple[index] * v.tuple[index]);
    }, 0);
  }

  cross(v) {
    return new Vector(
      this.tuple[1] * v.tuple[2] - this.tuple[2] * v.tuple[1],
      this.tuple[2] * v.tuple[0] - this.tuple[0] * v.tuple[2],
      this.tuple[0] * v.tuple[1] - this.tuple[1] * v.tuple[0]
    );
  }
}

module.exports = { Tuple, Point, Vector } ;
