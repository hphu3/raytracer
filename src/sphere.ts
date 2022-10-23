const { Point } = require('./tuple');

class Sphere {
  center: typeof Point

  constructor() {
    this.center = new Point(0, 0, 0);
  }
}

export { Sphere };
