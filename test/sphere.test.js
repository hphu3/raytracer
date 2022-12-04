const { Matrix } = require('../src/matrix');
const { Sphere } = require('../src/sphere');

describe("sphere", () => {
  test("a sphere's default transformation", () => {
    const s = new Sphere();
    expect(s.transform.equals(Matrix.identity())).toBe(true);
  });

  test("changing a sphere's transformation", () => {
    const s = new Sphere();
    const t = Matrix.translation(2, 3, 4);
    s.setTransform(t);
    expect(s.transform.equals(t)).toBe(true);
  });
});
