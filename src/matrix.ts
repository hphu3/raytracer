class Matrix {
  matrix: Array<Array<number>>

  constructor(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number) {
    switch (arguments.length) {
      case 4:
        this.matrix = [[a, b],[c, d]];
        break;
      case 9:
        this.matrix = [
          [a, b, c],
          [d, e, f],
          [g, h, i],
        ];
        break;
      case 16:
        this.matrix = [
          [a, b, c, d],
          [e, f, g, h],
          [i, j, k, l],
          [m, n, o, p],
        ];
        break;
      default:
        throw new Error("Unsupported matrix size")
    }
  }

  getValue(row: number, col: number) {
    return this.matrix[row][col];
  }

  size() {
    return this.matrix.reduce((sum, curr) => sum + curr.length, 0);
  }

  equals(other: Matrix) {
    if (other.size() !== this.size()) { return false }
    for (let i=0; i< this.matrix.length; i++) {
      for (let j=0; j< this.matrix[i].length; j++) {
        if (Math.abs(this.matrix[i][j] - other.matrix[i][j]) >= 1e-4) {
          return false;
        }
      }
    }
    return true;
  }
}

export { Matrix };
