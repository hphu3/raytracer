const { Matrix } = require('../src/matrix');
const { Tuple } = require('../src/tuple');

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
    expect(a.equals(b));
  });

  test('matrix equality with different matrices', () => {
    const a = new Matrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 8, 7, 6], [5, 4, 3, 2]]);
    const b = new Matrix([[2, 3, 4, 5], [6, 7, 8, 9], [8, 7, 6, 5], [4, 3, 2, 1]]);
    expect(a.equals(b) === false);
  });

  test('multiplying two matrices', () => {
    const a = new Matrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 8, 7, 6], [5, 4, 3, 2]]);
    const b = new Matrix([[-2, 1, 2, 3], [3, 2, 1, -1], [4, 3, 6, 5], [1, 2, 7, 8]]);
    expect(a.multiply(b).equals(new Matrix([
      [20, 22, 50, 48],
      [44, 54, 114, 108],
      [40, 58, 110, 102],
      [16, 26, 46, 42]])
    ));
  });

  test('multiplying a matrix and a tuple', () => {
    const a = new Matrix([[1, 2, 3, 4], [2, 4, 4, 2], [8, 6, 4, 1], [0, 0, 0, 1]]);
    const b = new Tuple(1, 2, 3, 1);
    expect(a.multiply(b).equals(new Tuple(18, 24, 33, 1)));
  });

  test('multiplying a matrix by the identity matrix', () => {
    const a = new Matrix([[0, 1, 2, 4], [1, 2, 4, 8], [2, 4, 8, 16], [4, 8, 16, 32]]);
    expect(a.multiply(Matrix.identity()).equals(a));
  });

  test('transposing a matrix', () => {
    const a = new Matrix([[0, 9, 3, 4], [9, 8, 0, 8], [1, 8, 5, 3], [0, 0, 5, 8]]);
    expect(a.transpose().equals(new Matrix([[0, 9, 1, 0], [9, 8, 8, 0], [3, 0, 5, 5], [0, 8, 3, 8]])));
  });

  test('calculating the determinant of a 2x2 matrix', () => {
    const a = new Matrix([[1, 5], [-3, 2]]);
    expect(a.determinant() == 17);
  });

  test('a submatrix of a 3x3 matrix is a 2x2 matrix', () => {
    const a = new Matrix([[1, 5, 0], [-3, 2, 7], [0, 6, -3]]);
    expect(a.submatrix(0, 2).equals(new Matrix([-3, 2], [0, 6])));
  });

  test('a submatrix of a 4x4 matrix is a 3x3 matrix', () => {
    const a = new Matrix([[-6, 1, 1, 6], [-8, 5, 8, 6], [-1, 0, 8, 2], [-7, 1,-1, 1]]);
    expect(a.submatrix(2, 1).equals(new Matrix([[-6, 1, 6], [-8, 8, 6], [-7, -1, 1]])));
  });

  test('calculating a minor of a 3x3 matrix', () => {
    const a = new Matrix([[3, 5, 0], [2, -1, -7], [6, -1, 5]]);
    expect(a.minor(1, 0) == 25);
  });

  test('calculating the cofactor of a 3x3 matrix', () => {
    const a = new Matrix([[3, 5, 0], [2, -1, -7], [6, -1, 5]]);
    expect(a.cofactor(0, 0) == -12);
    expect(a.minor(1, 0) == 25);
    expect(a.cofactor(1, 0) == -25);
  });

  test('calculating the determinant of a 3x3 matrix', () => {
    const a = new Matrix([[1, 2, 6], [-5, 8, -4], [2, 6, 4]]);
    expect(a.cofactor(0, 0) == 56);
    expect(a.cofactor(0, 1) == 12);
    expect(a.cofactor(0, 2) == -46);
    expect(a.determinant() == -196);
  });

  test('calculating the determinant of a 4x4 matrix', () => {
    const a = new Matrix([
      [-2, -8, 3, 5],
      [-3, 1, 7, 3],
      [1, 2, -9, 6],
      [-6, 7, 7, -9]
    ]);

    expect(a.cofactor(0, 0) == 690);
    expect(a.cofactor(0, 1) == 447);
    expect(a.cofactor(0, 2) == 210);
    expect(a.cofactor(0, 3) == 51);
    expect(a.determinant() == -4071);
  });
});
