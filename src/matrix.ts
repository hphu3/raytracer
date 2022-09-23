const { Tuple } = require('./tuple');

class Matrix {
  matrix: Array<Array<number>>

  static identity() {
    return new Matrix([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
  }

  constructor(matrix: number[][]) {
    if (matrix.length != 2 &&
        matrix.length != 3 &&
        matrix.length != 4) {
      throw new Error("Unsupported matrix size")
    }
    this.matrix = matrix;
  }

  getValue(row: number, col: number) {
    return this.matrix[row][col];
  }

  size() {
    return this.matrix.reduce((sum, curr) => sum + curr.length, 0);
  }

  equals(other: Matrix) {
    if (other.size() !== this.size()) { return false }
    for (let i=0; i<this.matrix.length; i++) {
      for (let j=0; j<this.matrix[i].length; j++) {
        if (Math.abs(this.matrix[i][j] - other.matrix[i][j]) >= 1e-4) {
          return false;
        }
      }
    }
    return true;
  }

  transpose() {
    const transposed: number[][] = [];
    for (let i=0; i<this.matrix.length; i++) {
      transposed.push([]);
    }
    for (let i=0; i<this.matrix.length; i++) {
      const row = this.matrix[i];
      for (let j=0; j<row.length; j++) {
        transposed[j][i] = row[i];
      }
    }
    return new Matrix(transposed);
  }

  multiply(other: Matrix | typeof Tuple) {
    if (other instanceof Matrix) {
      if (other.size() !== 16 || this.size() !== 16) {
        throw new Error("Multiply only supports 4x4 matrices")
      }
      const result: number[][] = [[], [], [], []];

      for (let i=0; i<4; i++) {
        for (let j=0; j<4; j++) {
          const row = this.matrix[i];
          const otherCol = other.matrix.flatMap((row) => row[j])
          result[i].push([0,1,2,3].reduce((sum, val) => sum + row[val] * otherCol[val], 0));
        }
      }
      return new Matrix(result);
    } else if (other instanceof Tuple) {
      const result: number[] = [];

      for (let i=0; i<4; i++) {
        const row = this.matrix[i];
        const otherCol = other.tuple;
        result.push([0,1,2,3].reduce((sum, val) => sum + row[val] * otherCol[val], 0));
      }
      return new Tuple(...result);
    }
  }

  determinant() {
    const a = this.matrix[0][0];
    const b = this.matrix[0][1];
    const c = this.matrix[1][0];
    const d = this.matrix[1][1];
    return a * b - c * d;
  }

  submatrix(row: number, col: number) {
    const submatrix = this.matrix.slice();
    submatrix.splice(row, 1);
    for (let i=0; i<submatrix.length; i++) {
      submatrix[i].splice(col, 1);
    }
    return new Matrix(submatrix);
  }
}

export { Matrix };
