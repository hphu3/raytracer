const { Ray } = require('../src/ray');
const { Point, Vector } = require('../src/tuple');
const { Sphere } = require('../src/sphere');

describe("ray", () => {
  test("creating and querying a ray", () => {
    const origin = new Point(1, 2, 3);
    const direction = new Vector(4, 5, 6);
    const r = new Ray(origin, direction);
    expect(r.origin).toEqual(origin);
    expect(r.direction).toEqual(direction);
  });

  test("computing a point from a distance", () => {
    const r = new Ray(new Point(2, 3, 4), new Vector(1, 0, 0));
    expect(r.position(0)).toEqual(new Point(2, 3, 4));
    expect(r.position(1)).toEqual(new Point(3, 3, 4));
    expect(r.position(-1)).toEqual(new Point(1, 3, 4));
    expect(r.position(2.5)).toEqual(new Point(4.5, 3, 4));
  });

  test("a ray intersects a sphere at two points", () => {
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
    const s = new Sphere();
    const xs = r.intersects(s);
    expect(xs.length).toEqual(2);
    expect(xs[0]).toEqual(4);
    expect(xs[1]).toEqual(6);
  });

  test("a ray intersects a sphere at a tangent", () => {
    const r = new Ray(new Point(0, 1, -5), new Vector(0, 0, 1));
    const s = new Sphere();
    const xs = r.intersects(s);
    expect(xs.length).toEqual(2);
    expect(xs[0]).toEqual(5);
    expect(xs[1]).toEqual(5);
  });

  test("a ray misses a sphere", () => {
    const r = new Ray(new Point(0, 2, -5), new Vector(0, 0, 1));
    const s = new Sphere();
    const xs = r.intersects(s);
    expect(xs.length).toEqual(0);
  });

  test("a ray originates inside a sphere", () => {
    const r = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1));
    const s = new Sphere();
    const xs = r.intersects(s);
    expect(xs.length).toEqual(2);
    expect(xs[0]).toEqual(-1);
    expect(xs[1]).toEqual(1);
  });

  test("a sphere is behind a ray", () => {
    const r = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1));
    const s = new Sphere();
    const xs = r.intersects(s);
    expect(xs.length).toEqual(2);
    expect(xs[0]).toEqual(-6);
    expect(xs[1]).toEqual(-4);
  });
});
