const { Ray } = require('../src/ray');
const { Matrix } = require('../src/matrix');
const { Point, Vector } = require('../src/tuple');
const { Sphere } = require('../src/sphere');
const { Intersection, Intersections } = require('../src/intersection');

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
    expect(xs.intersections.length).toEqual(2);
    expect(xs.intersections[0].t).toEqual(4);
    expect(xs.intersections[1].t).toEqual(6);
  });

  test("a ray intersects a sphere at a tangent", () => {
    const r = new Ray(new Point(0, 1, -5), new Vector(0, 0, 1));
    const s = new Sphere();
    const xs = r.intersects(s);
    expect(xs.intersections.length).toEqual(2);
    expect(xs.intersections[0].t).toEqual(5);
    expect(xs.intersections[1].t).toEqual(5);
  });

  test("a ray misses a sphere", () => {
    const r = new Ray(new Point(0, 2, -5), new Vector(0, 0, 1));
    const s = new Sphere();
    const xs = r.intersects(s);
    expect(xs.intersections.length).toEqual(0);
  });

  test("a ray originates inside a sphere", () => {
    const r = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1));
    const s = new Sphere();
    const xs = r.intersects(s);
    expect(xs.intersections.length).toEqual(2);
    expect(xs.intersections[0].t).toEqual(-1);
    expect(xs.intersections[1].t).toEqual(1);
  });

  test("a sphere is behind a ray", () => {
    const r = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1));
    const s = new Sphere();
    const xs = r.intersects(s);
    expect(xs.intersections.length).toEqual(2);
    expect(xs.intersections[0].t).toEqual(-6);
    expect(xs.intersections[1].t).toEqual(-4);
  });

  test('an intersection encapsulates t and object', () => {
    const s = new Sphere();
    const i = new Intersection(3.5, s);
    expect(i.t).toEqual(3.5);
    expect(i.object).toEqual(s);
  });

  test('aagregating intersections', () => {
    const s = new Sphere();
    const i1 = new Intersection(1, s);
    const i2 = new Intersection(2, s);
    const xs = new Intersections(i1, i2);
    expect(xs.intersections[0].t).toEqual(1);
    expect(xs.intersections[1].t).toEqual(2);
  });

  test('intersect sets the object on the intersection', () => {
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
    const s = new Sphere();
    const xs = r.intersects(s, r);
    expect(xs.intersections.length).toEqual(2);
    expect(xs.intersections[0].object).toEqual(s);
    expect(xs.intersections[1].object).toEqual(s);
  });

  test('the hit, when all intersections have positive t', () => {
    const s = new Sphere();
    const i1 = new Intersection(1, s);
    const i2 = new Intersection(2, s);
    const xs = new Intersections(i2, i1);
    expect(xs.hit()).toEqual(i1);
  });

  test('the hit, when some intersections have negative t', () => {
    const s = new Sphere();
    const i1 = new Intersection(-1, s);
    const i2 = new Intersection(1, s);
    const xs = new Intersections(i2, i1);
    expect(xs.hit()).toEqual(i2);
  });

  test('the hit, when all intersections have negative t', () => {
    const s = new Sphere();
    const i1 = new Intersection(-2, s);
    const i2 = new Intersection(-1, s);
    const xs = new Intersections(i2, i1);
    expect(xs.hit()).toEqual(null);
  });

  test('the hit is always the lowest nonnegative intersection', () => {
    const s = new Sphere();
    const i1 = new Intersection(5, s);
    const i2 = new Intersection(7, s);
    const i3 = new Intersection(-3, s);
    const i4 = new Intersection(2, s);
    const xs = new Intersections(i1, i2, i3, i4);
    expect(xs.hit()).toEqual(i4);
  });

  test('translating a ray', () => {
    const r = new Ray(new Point(1, 2, 3), new Vector(0, 1, 0));
    const m = Matrix.translation(3, 4, 5);
    const r2 = r.transform(m);
    expect(r2.origin.equals(new Point(4, 6, 8))).toBe(true);
    expect(r2.direction.equals(new Vector(0, 1, 0))).toBe(true);
  });

  test('scaling a ray', () => {
    const r = new Ray(new Point(1, 2, 3), new Vector(0, 1, 0));
    const m = Matrix.scaling(2, 3, 4);
    const r2 = r.transform(m);
    expect(r2.origin.equals(new Point(2, 6, 12))).toBe(true);
    expect(r2.direction.equals(new Vector(0, 3, 0))).toBe(true);
  });

  test('intersecting a scaled sphere with a ray', () => {
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
    const s = new Sphere();
    s.setTransform(Matrix.scaling(2, 2, 2));
    const xs = r.intersects(s);
    expect(xs.intersections.length).toEqual(2);
    expect(xs.intersections[0].t).toEqual(3);
    expect(xs.intersections[1].t).toEqual(7);
  });

  test('intersecting a translated sphere with a ray', () => {
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
    const s = new Sphere();
    s.setTransform(Matrix.translation(5, 0, 0));
    const xs = r.intersects(s);
    expect(xs.intersections.length).toEqual(0);
  });
});
