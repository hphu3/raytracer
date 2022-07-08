const { Tuple, Point, Vector } = require('../src/tuple');

test('A tuple with w=1.0 is a point', () => {
  const a = new Tuple(4.3, -4.2, 3.1, 1.0);

  expect(a.tuple[0]).toEqual(4.3);
  expect(a.tuple[1]).toEqual(-4.2);
  expect(a.tuple[2]).toEqual(3.1);
  expect(a.isPoint()).toBe(true);
});

test('A tuple with w=0.0 is a vector', () => {
  const a = new Tuple(4.3, -4.2, 3.1, 0.0);

  expect(a.tuple[0]).toEqual(4.3);
  expect(a.tuple[1]).toEqual(-4.2);
  expect(a.tuple[2]).toEqual(3.1);
  expect(a.isVector()).toBe(true);
});

test('point() creates tuples with w=1', () => {
  const p = new Point(4, -4, 3);

  expect(p.getW()).toEqual(1);
  expect(p).toBeInstanceOf(Tuple);
});

test('vector() creates tuples with w=0', () => {
  const v = new Vector(4, -4, 3);

  expect(v.getW()).toEqual(0);
  expect(v).toBeInstanceOf(Tuple);
});

test('adding two tuples', () => {
  const a1 = new Tuple(3, -2, 5, 1);
  const a2 = new Tuple(-2, 3, 1, 0);
  const added = a1.add(a2);

  expect(added).toBeInstanceOf(Tuple);
  expect(added.tuple).toEqual([1, 1, 6, 1]);
});

test('subtracting a vector from a point', () => {
  const p = new Point(3, 2, 1);
  const v = new Vector(5, 6, 7);
  const subtracted = p.subtract(v);

  expect(subtracted.isPoint()).toBe(true);
  expect(subtracted.tuple).toEqual([-2, -4, -6, 1]);
});

test('subtracting two vectors', () => {
  const v1 = new Vector(3, 2, 1);
  const v2 = new Vector(5, 6, 7);
  const subtracted = v1.subtract(v2);

  expect(subtracted.isVector()).toBe(true);
  expect(subtracted.tuple).toEqual([-2, -4, -6, 0]);
});

test('subtracting a vector from a zero vector', () => {
  const zero = new Vector(0, 0, 0);
  const v = new Vector(1, -2, 3);
  const subtracted = zero.subtract(v);

  expect(subtracted.tuple).toEqual([-1, 2, -3, 0]);
});

test('negating a tuple', () => {
  const a = new Tuple(1, -2, 3, -4);

  expect(a.negate().tuple).toEqual([-1, 2, -3, 4]);
});

test('multiplying a tuple by a scalar', () => {
  const a = new Tuple(1, -2, 3, -4);

  expect(a.multiply(3.5).tuple).toEqual([3.5, -7, 10.5, -14]);
});

test('multiplying a tuple by a fraction', () => {
  const a = new Tuple(1, -2, 3, -4);

  expect(a.multiply(0.5).tuple).toEqual([0.5, -1, 1.5, -2]);
});

test('computing the magnitude of vector 100', () => {
  const v = new Vector(1, 0, 0);
  expect(v.magnitude()).toEqual(1);
});

test('computing the magnitude of vector 010', () => {
  const v = new Vector(0, 1, 0);
  expect(v.magnitude()).toEqual(1);
});

test('computing the magnitude of vector 001', () => {
  const v = new Vector(0, 0, 1);
  expect(v.magnitude()).toEqual(1);
});

test('computing the magnitude of vector 123', () => {
  const v = new Vector(1, 2, 3);
  expect(v.magnitude()).toEqual(Math.sqrt(14));
});

test('computing the magnitude of vector -1-2-3', () => {
  const v = new Vector(-1, -2, -3);
  expect(v.magnitude()).toEqual(Math.sqrt(14));
});
