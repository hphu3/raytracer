const { Color, Point, Vector } = require('../src/tuple');
const { Material } = require('../src/material');
const { PointLight } = require('../src/point_light');

describe("material", () => {
  let material;
  let position;

  beforeEach(() => {
    material = new Material();
    position = new Point(0, 0, 0);
  });

  test("lighting with the eye between the light and the surface", () => {
    const eyev = new Vector(0, 0, -1);
    const normalv = new Vector(0, 0, -1);
    const light = new PointLight(new Point(0, 0, -10), new Color(1, 1, 1));
    const result = material.lighting(light, position, eyev, normalv);
    expect(result.equals(new Color(1.9, 1.9, 1.9))).toBe(true);
  });

  test("lighting with the eye between the light and the surface", () => {
    const eyev = new Vector(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2);
    const normalv = new Vector(0, 0, -1);
    const light = new PointLight(new Point(0, 0, -10), new Color(1, 1, 1));
    const result = material.lighting(light, position, eyev, normalv);
    expect(result.equals(new Color(1, 1, 1))).toBe(true);
  });

  test("lighting with the eye opposite the surface, light offset 45deg", () => {
    const eyev = new Vector(0, 0, -1);
    const normalv = new Vector(0, 0, -1);
    const light = new PointLight(new Point(0, 10, -10), new Color(1, 1, 1));
    const result = material.lighting(light, position, eyev, normalv);
    expect(result.equals(new Color(0.7364, 0.7364, 0.7364))).toBe(true);
  });

  test("lighting with the eye in the path of the reflection vector", () => {
    const eyev = new Vector(0, -Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
    const normalv = new Vector(0, 0, -1);
    const light = new PointLight(new Point(0, 0, 10), new Color(1, 1, 1));
    const result = material.lighting(light, position, eyev, normalv);
    expect(result.equals(new Color(0.1, 0.1, 0.1))).toBe(true);
  });
});
