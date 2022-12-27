const { Matrix } = require('../src/matrix');
const { Sphere } = require('../src/sphere');
const { Point, Vector } = require('../src/tuple');
const { Material } = require('../src/material');

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

  test("the normal on a sphere at a point on the x axis", () => {
    const s = new Sphere();
    const n = s.normalAt(new Point(1, 0, 0));
    expect(n.equals(new Vector(1, 0, 0))).toBe(true);
  });

  test("the normal on a sphere at a point on the y axis", () => {
    const s = new Sphere();
    const n = s.normalAt(new Point(0, 1, 0));
    expect(n.equals(new Vector(0, 1, 0))).toBe(true);
  });

  test("the normal on a sphere at a point on the z axis", () => {
    const s = new Sphere();
    const n = s.normalAt(new Point(0, 0, 1));
    expect(n.equals(new Vector(0, 0, 1))).toBe(true);
  });

  test("the normal on a sphere on a nonaxial point", () => {
    const s = new Sphere();
    const n = s.normalAt(new Point(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3));
    expect(n.equals(new Vector(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3))).toBe(true);
  });

  test("the normal is a normalized vector", () => {
    const s = new Sphere();
    const n = s.normalAt(new Point(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3));
    expect(n.equals(n.normalize())).toBe(true);
  });

  test("computing the normal on a translated sphere", () => {
    const s = new Sphere();
    s.setTransform(Matrix.translation(0, 1, 0));
    const n = s.normalAt(new Point(0, 1.70711, -0.70711));
    expect(n.equals(new Vector(0, 0.70711, -0.70711))).toBe(true);
  });

  test("computing the normal on a transformed sphere", () => {
    const s = new Sphere();
    const m = Matrix.scaling(1, 0.5, 1).multiply(Matrix.rotationZ(Math.PI / 5));
    s.setTransform(m);
    const n = s.normalAt(new Point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2));
    expect(n.equals(new Vector(0, 0.97014, -0.24254))).toBe(true);
  });

  test('a sphere has a default material', () => {
    const s = new Sphere();
    const m = s.material;
    expect(m.equals(new Material)).toBe(true);
  });

  test('a sphere may be assigned a material', () => {
    const s = new Sphere();
    const m = new Material();
    m.ambient = 1;
    s.material = m;
    expect(s.material.equals(m)).toBe(true);
  });
});
