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
}

module.exports = { Tuple, Point, Vector } ;
