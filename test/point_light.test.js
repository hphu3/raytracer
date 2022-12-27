const { PointLight } = require('../src/point_light');
const { Point, Color } = require('../src/tuple');

describe("pointlight", () => {
  test("a point light has a position and intensity", () => {
    const i = new Color(1, 1, 1);
    const p = new Point(0, 0, 0);
    const light = new PointLight(p, i);
    expect(light.position.equals(p)).toBe(true);
    expect(light.intensity.equals(i)).toBe(true);
  });
});
