const { Tuple, Point, Vector, Color } = require('../src/tuple');

describe("Tuple", () => {
  test('A tuple with w=1.0 is a point', () => {
    const a = new Tuple(4.3, -4.2, 3.1, 1.0);

    expect(a.x).toEqual(4.3);
    expect(a.y).toEqual(-4.2);
    expect(a.z).toEqual(3.1);
    expect(a.isPoint()).toBe(true);
  });

  test('A tuple with w=0.0 is a vector', () => {
    const a = new Tuple(4.3, -4.2, 3.1, 0.0);

    expect(a.x).toEqual(4.3);
    expect(a.y).toEqual(-4.2);
    expect(a.z).toEqual(3.1);
    expect(a.isVector()).toBe(true);
  });

  test('point() creates tuples with w=1', () => {
    const p = new Point(4, -4, 3);

    expect(p.w).toEqual(1);
    expect(p).toBeInstanceOf(Tuple);
  });

  test('vector() creates tuples with w=0', () => {
    const v = new Vector(4, -4, 3);

    expect(v.w).toEqual(0);
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

  test('Normalizing vector 400 gisves 100', () => {
    const v = new Vector(4, 0, 0);
    expect(v.normalize().tuple).toEqual([1, 0, 0, 0]);
  });

  test('normalizing vector 123', () => {
    const v = new Vector(1, 2, 3);
    const expected = [0.26726, 0.53452, 0.80178, 0];
    const actual = v.normalize().tuple;
    for (let i=0; i<4; i++) {
      expect(actual[i]).toEqual(expect.closeTo(expected[i], 5));
    }
  });

  test('the magnitude of a normalized vector is 1', () => {
    const v = new Vector(1, 2, 3);
    expect(v.normalize().magnitude()).toEqual(1);
  });

  test('the dot product of two tuples', () => {
    const a = new Vector(1, 2, 3);
    const b = new Vector(2, 3, 4);
    expect(a.dot(b)).toEqual(20);
  });

  test('the magnitude of a normalized vector is 1', () => {
    const v = new Vector(1, 2, 3);
    expect(v.normalize().magnitude()).toEqual(1);
  });

  test('the magnitude of a normalized vector is 1', () => {
    const v = new Vector(1, 2, 3);
    expect(v.normalize().magnitude()).toEqual(1);
  });

  test('the cross product of two vectors', () => {
    const a = new Vector(1, 2, 3);
    const b = new Vector(2, 3, 4);
    expect(a.cross(b).tuple).toEqual([-1, 2, -1, 0]);
    expect(b.cross(a).tuple).toEqual([1, -2, 1, 0]);
  });

  describe("color", () => {
    test('colors are (red, green, blue) tuples', () => {
      const c = new Color(-0.5, 0.4, 1.7);
      expect(c.red).toEqual(-0.5);
      expect(c.green).toEqual(0.4);
      expect(c.blue).toEqual(1.7);
    });

    test('adding colors', () => {
      const c1 = new Color(0.9, 0.6, 0.75);
      const c2 = new Color(0.7, 0.1, 0.25);
      const added = c1.add(c2);
      expect(added.equals(new Color(1.6, 0.7, 1.0)));
    });

    test('subtracting colors', () => {
      const c1 = new Color(0.9, 0.6, 0.75);
      const c2 = new Color(0.7, 0.1, 0.25);
      const subtracted = c1.subtract(c2);
      expect(subtracted.equals(new Color(0.2, 0.5, 0.5)));
    });

    test('multiplying a color by a scalar', () => {
      const c = new Color(0.2, 0.3, 0.4);
      const scaled = c.multiply(2);
      expect(scaled.equals(new Color(0.4, 0.6, 0.8)));
    });

    test('multiplying colors', () => {
      const c1 = new Color(1, 0.2, 0.4);
      const c2 = new Color(0.9, 1, 0.1);
      expect(c1.blend(c2).equals(new Color(0.9, 0.2, 0.04)));
    });
  });
});
