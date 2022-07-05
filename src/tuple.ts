class Tuple {
  constructor(x, y, z, w) {
    this.tuple = [x, y, z, w];
  }

  getW() {
    return this.tuple[3];
  }

  isPoint() { return this.getW() === 1 };
  isVector() { return this.getW() === 0 };
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
