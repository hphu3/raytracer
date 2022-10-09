const { Matrix } = require('../src/matrix');
const { Tuple, Point, Vector } = require('../src/tuple');

describe("Matrix", () => {
  test('Constructing and inspecting a 4x4 matrix', () => {
    const m = new Matrix([[1, 2, 3, 4], [5.5, 6.5, 7.5, 8.5], [9, 10, 11, 12], [13.5, 14.5, 15.5, 16.5]]);

    expect(m.getValue(0, 0)).toEqual(1);
    expect(m.getValue(0, 3)).toEqual(4);
    expect(m.getValue(1, 0)).toEqual(5.5);
    expect(m.getValue(1, 2)).toEqual(7.5);
    expect(m.getValue(2, 2)).toEqual(11);
    expect(m.getValue(3, 0)).toEqual(13.5);
    expect(m.getValue(3, 2)).toEqual(15.5);
  });

  test('A 2x2 matrix ought to be representable', () => {
    const m = new Matrix([[-3, 5], [1, -2]]);
    expect(m.getValue(0, 0)).toEqual(-3);
    expect(m.getValue(0, 1)).toEqual(5);
    expect(m.getValue(1, 0)).toEqual(1);
    expect(m.getValue(1, 1)).toEqual(-2);
  });

  test('A 3x3 matrix ought to be representable', () => {
    const m = new Matrix([[-3, 5, 0], [1, -2, -7], [0, 1, 1]]);
    expect(m.getValue(0, 0)).toEqual(-3);
    expect(m.getValue(1, 1)).toEqual(-2);
    expect(m.getValue(2, 2)).toEqual(1);
  });

  test('matrix equality with identical matrices', () => {
    const a = new Matrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 8, 7, 6], [5, 4, 3, 2]]);
    const b = new Matrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 8, 7, 6], [5, 4, 3, 2]]);
    expect(a.equals(b)).toBe(true);
  });

  test('matrix equality with different matrices', () => {
    const a = new Matrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 8, 7, 6], [5, 4, 3, 2]]);
    const b = new Matrix([[2, 3, 4, 5], [6, 7, 8, 9], [8, 7, 6, 5], [4, 3, 2, 1]]);
    expect(a.equals(b)).toBe(false);
  });

  test('multiplying two matrices', () => {
    const a = new Matrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 8, 7, 6], [5, 4, 3, 2]]);
    const b = new Matrix([[-2, 1, 2, 3], [3, 2, 1, -1], [4, 3, 6, 5], [1, 2, 7, 8]]);
    expect(a.multiply(b).equals(new Matrix([
      [20, 22, 50, 48],
      [44, 54, 114, 108],
      [40, 58, 110, 102],
      [16, 26, 46, 42]])
    )).toBe(true);
  });

  test('multiplying a matrix and a tuple', () => {
    const a = new Matrix([[1, 2, 3, 4], [2, 4, 4, 2], [8, 6, 4, 1], [0, 0, 0, 1]]);
    const b = new Tuple(1, 2, 3, 1);
    expect(a.multiply(b).equals(new Tuple(18, 24, 33, 1))).toBe(true);
  });

  test('multiplying a matrix by the identity matrix', () => {
    const a = new Matrix([[0, 1, 2, 4], [1, 2, 4, 8], [2, 4, 8, 16], [4, 8, 16, 32]]);
    expect(a.multiply(Matrix.identity()).equals(a)).toBe(true);
  });

  test('transposing a matrix', () => {
    const a = new Matrix([[0, 9, 3, 0], [9, 8, 0, 8], [1, 8, 5, 3], [0, 0, 5, 8]]);
    expect(a.transpose().equals(
      new Matrix([
        [0, 9, 1, 0],
        [9, 8, 8, 0],
        [3, 0, 5, 5],
        [0, 8, 3, 8]
      ]))
    ).toBe(true);
  });

  test('calculating the determinant of a 2x2 matrix', () => {
    const a = new Matrix([[1, 5], [-3, 2]]);
    expect(a.determinant()).toEqual(17);
  });

  test('a submatrix of a 3x3 matrix is a 2x2 matrix', () => {
    const a = new Matrix([[1, 5, 0], [-3, 2, 7], [0, 6, -3]]);
    expect(a.submatrix(0, 2).equals(new Matrix([[-3, 2], [0, 6]]))).toBe(true);
  });

  test('a submatrix of a 4x4 matrix is a 3x3 matrix', () => {
    const a = new Matrix([[-6, 1, 1, 6], [-8, 5, 8, 6], [-1, 0, 8, 2], [-7, 1,-1, 1]]);
    expect(a.submatrix(2, 1).equals(new Matrix([[-6, 1, 6], [-8, 8, 6], [-7, -1, 1]]))).toBe(true);
  });

  test('calculating a minor of a 3x3 matrix', () => {
    const a = new Matrix([[3, 5, 0], [2, -1, -7], [6, -1, 5]]);
    expect(a.minor(1, 0)).toEqual(25);
  });

  test('calculating the cofactor of a 3x3 matrix', () => {
    const a = new Matrix([[3, 5, 0], [2, -1, -7], [6, -1, 5]]);
    expect(a.cofactor(0, 0)).toEqual(-12);
    expect(a.minor(1, 0)).toEqual(25);
    expect(a.cofactor(1, 0)).toEqual(-25);
  });

  test('calculating the determinant of a 3x3 matrix', () => {
    const a = new Matrix([[1, 2, 6], [-5, 8, -4], [2, 6, 4]]);
    expect(a.cofactor(0, 0)).toEqual(56);
    expect(a.cofactor(0, 1)).toEqual(12);
    expect(a.cofactor(0, 2)).toEqual(-46);
    expect(a.determinant()).toEqual(-196);
  });

  test('calculating the determinant of a 4x4 matrix', () => {
    const a = new Matrix([
      [-2, -8, 3, 5],
      [-3, 1, 7, 3],
      [1, 2, -9, 6],
      [-6, 7, 7, -9]
    ]);

    expect(a.cofactor(0, 0)).toEqual(690);
    expect(a.cofactor(0, 1)).toEqual(447);
    expect(a.cofactor(0, 2)).toEqual(210);
    expect(a.cofactor(0, 3)).toEqual(51);
    expect(a.determinant()).toEqual(-4071);
  });

  test('testing an invertible matrix for invertibility', () => {
    const a = new Matrix([
      [6, 4, 4, 4],
      [5, 5, 7, 6],
      [4, -9, 3, -7],
      [9, 1, 7, -6]
    ]);
    expect(a.determinant()).toEqual(-2120);
    expect(a.invertible()).toBe(true);
  });

  test('testing a noninvertible matrix for invertibility', () => {
    const a = new Matrix([
      [-4, 2, -2, -3],
      [9, 6, 2, 6],
      [0, -5, 1, -5],
      [0, 0, 0, 0]
    ]);
    expect(a.determinant()).toEqual(0);
    expect(a.invertible()).toBe(false);
  });

  test('calculating the inverse of a matrix', () => {
    const a = new Matrix([
      [-5, 2, 6, -8], [1, -5, 1, 8], [7, 7,-6,-7], [1,-3, 7, 4]
    ]);

    const b = a.invert();
    expect(a.determinant() == 532);
    expect(a.cofactor(2, 3) == -160);
    expect(b.matrix[3][2] == -160/532);
    expect(a.cofactor(3, 2) == 105);
    expect(b.matrix[2][3] == 105/532);
    expect(b.equals(
      new Matrix([
        [0.21805, 0.45113, 0.24060, -0.04511],
        [-0.80827, -1.45677, -0.44361, 0.52068],
        [-0.07895, -0.22368, -0.05263, 0.19737],
        [-0.52256, -0.81391, -0.30075, 0.30639]
      ]))).toBe(true);
  });

  test('calculating the inverse of another matrix', () => {
    const a = new Matrix([
      [8,-5, 9, 2], [7,5,6,1], [-6, 0, 9, 6], [-3, 0,-9,-4]
    ]);

    expect(a.invert().equals(
    new Matrix([
      [-0.15385, -0.15385, -0.28205, -0.53846],
      [-0.07692, 0.12308, 0.02564, 0.03077],
      [0.35897, 0.35897, 0.43590, 0.92308],
      [-0.69231, -0.69231, -0.76923, -1.92308]
    ]))).toBe(true);
  });

  test('calculating the inverse of a third matrix', () => {
    const a = new Matrix([
      [9,3,0,9],
      [-5, -2, -6, -3],
      [-4, 9, 6, 4],
      [-7, 6, 6, 2]
    ]);

    expect(a.invert().equals(
    new Matrix([
      [-0.04074, -0.07778, 0.14444, -0.22222],
      [-0.07778, 0.03333, 0.36667, -0.33333],
      [-0.02901, -0.14630, -0.10926, 0.12963],
      [0.17778, 0.06667, -0.26667, 0.33333],
    ]))).toBe(true);
  });

  test('multiplying a product by its inverse', () => {
    const a = new Matrix([
      [3,-9, 7, 3],
      [3,-8, 2,-9],
      [-4, 4, 4, 1],
      [-6, 5,-1, 1]
    ]);

    const b = new Matrix([
      [8,2,2,2],
      [3,-1, 7, 0],
      [7,0,5,4],
      [6,-2, 0, 5],
    ]);

    const c = a.multiply(b);

    expect(c.multiply(b.invert()).equals(a)).toBe(true);
  });

  test('multiplying by a translation matrix', () => {
    const transform = Matrix.translation(5, -3, 2);
    const p = new Point(-3, 4, 5);
    expect(transform.multiply(p).equals(new Point(2, 1, 7))).toBe(true);
  });

  test('multiplying by the inverse of a translation matrix', () => {
    const transform = Matrix.translation(5, -3, 2);
    const inv = transform.invert();
    const p = new Point(-3, 4, 5);
    expect(inv.multiply(p).equals(new Point(-8, 7, 3))).toBe(true);
  });

  test('translation does not affect vectors', () => {
    const transform = Matrix.translation(5, -3, 2);
    const v = new Vector(-3, 4, 5);
    expect(transform.multiply(v).equals(v)).toBe(true);
  });
});
