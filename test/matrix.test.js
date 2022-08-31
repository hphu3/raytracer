const { Matrix } = require('../src/matrix');

describe("Matrix", () => {
  test('Constructing and inspecting a 4x4 matrix', () => {
    const m = new Matrix(1, 2, 3, 4, 5.5, 6.5, 7.5, 8.5, 9, 10, 11, 12, 13.5, 14.5, 15.5, 16.5);

    expect(m.getValue(0, 0)).toEqual(1);
    expect(m.getValue(0, 3)).toEqual(4);
    expect(m.getValue(1, 0)).toEqual(5.5);
    expect(m.getValue(1, 2)).toEqual(7.5);
    expect(m.getValue(2, 2)).toEqual(11);
    expect(m.getValue(3, 0)).toEqual(13.5);
    expect(m.getValue(3, 2)).toEqual(15.5);
  });

  test('A 2x2 matrix ought to be representable', () => {
    const m = new Matrix(-3, 5, 1, -2);
    expect(m.getValue(0, 0)).toEqual(-3);
    expect(m.getValue(0, 1)).toEqual(5);
    expect(m.getValue(1, 0)).toEqual(1);
    expect(m.getValue(1, 1)).toEqual(-2);
  });

  test('A 3x3 matrix ought to be representable', () => {
    const m = new Matrix(-3, 5, 0, 1, -2, -7, 0, 1, 1);
    expect(m.getValue(0, 0)).toEqual(-3);
    expect(m.getValue(1, 1)).toEqual(-2);
    expect(m.getValue(2, 2)).toEqual(1);
  });

  test('matrix equality with identical matrices', () => {
    const a = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2);
    const b = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2);
    expect(a.equals(b));
  });

  test('matrix equality with different matrices', () => {
    const a = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2);
    const b = new Matrix(2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1);
    expect(a.equals(b) === false);
  })
});
