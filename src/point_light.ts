const { Point, Color } = require('./tuple');

class PointLight {
  position: typeof Point
  intensity: typeof Color

  constructor(position: typeof Point, intensity: typeof Color) {
    this.position = position;
    this.intensity = intensity;
  }
}

export { PointLight };
