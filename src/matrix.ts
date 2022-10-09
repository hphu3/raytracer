const { Tuple } = require('./tuple');

class Matrix {
  matrix: Array<Array<number>>

  static identity() {
    return new Matrix([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
  }

  static translation(x: number, y: number, z: number) {
    return new Matrix([
      [1, 0, 0, x],
      [0, 1, 0, y],
      [0, 0, 1, z],
      [0, 0, 0, 1],
    ]);
  }

  static scaling(x: number, y: number, z:number) {
    return new Matrix([
      [x, 0, 0, 0],
      [0, y, 0, 0],
      [0, 0, z, 0],
      [0, 0, 0, 1],
    ]);
  }

  static rotationX(radians: number) {
    return new Matrix([
      [1, 0, 0, 0],
      [0, Math.cos(radians), -Math.sin(radians), 0],
      [0, Math.sin(radians), Math.cos(radians), 0],
      [0, 0, 0, 1],
    ]);
  }

  static rotationY(radians: number) {
    return new Matrix([
      [Math.cos(radians), 0, Math.sin(radians), 0],
      [0, 1, 0, 0],
      [-Math.sin(radians), 0, Math.cos(radians), 0],
      [0, 0, 0, 1],
    ]);
  }

  static rotationZ(radians: number) {
    return new Matrix([
      [Math.cos(radians), -Math.sin(radians), 0, 0],
      [Math.sin(radians), Math.cos(radians), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]);
  }

  static shearing(xy: number, xz: number, yx: number, yz: number, zx: number, zy: number ) {
    return new Matrix([
      [1, xy, xz, 0],
      [yx, 1, yz, 0],
      [zx, zy, 1, 0],
      [0, 0, 0, 1],
    ]);
  }

  constructor(matrix: number[][]) {
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
    const transposed: number[][] = [...new Array(this.matrix.length)].map(() => new Array(this.matrix[0].length));
    for (let i=0; i<this.matrix.length; i++) {
      const row = this.matrix[i];
      for (let j=0; j<row.length; j++) {
        transposed[j][i] = row[j];
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

  determinant(): number {
    if (this.size() === 4) {
      const a = this.matrix[0][0];
      const b = this.matrix[0][1];
      const c = this.matrix[1][0];
      const d = this.matrix[1][1];
      return a * d - b * c;
    } else {
      // calculate determinant for > 2x2 matrices by
      // sum of each element in the first (or any) row by its cofactor
      return this.matrix[0].reduce((acc, val, index) => {
        return acc + val * this.cofactor(0, index);
      }, 0);
    }
  }

  submatrix(row: number, col: number) {
    const submatrix = this.matrix.map((arr) => arr.slice());
    submatrix.splice(row, 1);
    for (let i=0; i<submatrix.length; i++) {
      submatrix[i].splice(col, 1);
    }
    return new Matrix(submatrix);
  }

  minor(row: number, col: number): number {
    const sub = this.submatrix(row, col);
    return sub.determinant();
  }

  cofactor(row: number, col: number): number {
    const minor = this.minor(row, col);
    return (row + col) % 2 === 0 ? minor : -minor;
  }

  invertible() {
    return this.determinant() !== 0;
  }

  invert() {
    if (!this.invertible()) {
      throw new Error('matrix is not invertible');
    }

    const inverted: number[][] = [...new Array(this.matrix.length)].map(() => new Array(this.matrix[0].length));
    const determinant = this.determinant();

    for (let i=0; i<this.matrix.length; i++) {
      const row = this.matrix[i];
      for (let j=0; j<row.length; j++) {
        const cofactor = this.cofactor(i, j);
        inverted[j][i] = cofactor / determinant;
      }
    }
    return new Matrix(inverted);
  }
}

export { Matrix };
