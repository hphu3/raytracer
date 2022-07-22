const { Tuple, Point, Vector, Color } = require('../src/tuple');
const { Canvas } = require('../src/canvas');

describe('canvas', () => {
  test('creating a canvas', () => {
    const c = new Canvas(10, 20);
    for (let col=0; col<20; col++) {
      for (let row=0; row<10; row++) {
        expect(c.pixels[col][row].equals(new Color(0, 0, 0)));
      }
    }
  });

  test('writing pixels to a canvas', () => {
    const c = new Canvas(10, 20);
    const red = new Color(1, 0, 0);
    c.writePixel(2, 3, red);
    expect(c.pixelAt(2,3)).toEqual(red);
  });

  test('constructing the PPM header', () => {
    const c = new Canvas(5, 3);
    const ppm = c.toPPM();
    const lines = ppm.split("\n");

    expect(lines[0]).toEqual("P3");
    expect(lines[1]).toEqual("5 3");
    expect(lines[2]).toEqual("255");
  });

  test('constructing the PPM pixel data', () => {
    const c = new Canvas(5, 3);
    const c1 = new Color(1.5, 0, 0);
    const c2 = new Color(0, 0.5, 0);
    const c3 = new Color(-0.5, 0, 1);

    c.writePixel(0, 0, c1);
    c.writePixel(2, 1, c2);
    c.writePixel(4, 2, c3);
    const lines = c.toPPM().split("\n");
    expect(lines[3]).toEqual("255 0 0 0 0 0 0 0 0 0 0 0 0 0 0");
    expect(lines[4]).toEqual("0 0 0 0 0 0 0 128 0 0 0 0 0 0 0");
    expect(lines[5]).toEqual("0 0 0 0 0 0 0 0 0 0 0 0 0 0 255");
  });

  test('splitting long lines in PPM files', () => {
    const c = new Canvas(10, 2);
    const color = new Color(1, 0.8, 0.6);
    for (let col=0; col<2; col++) {
      for (let row=0; row<10; row++) {
        c.writePixel(row, col, color);
      }
    }
    const lines = c.toPPM().split("\n");
    expect(lines[3]).toEqual("255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204");
    expect(lines[4]).toEqual("153 255 204 153 255 204 153 255 204 153 255 204 153");
    expect(lines[5]).toEqual("255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204");
    expect(lines[6]).toEqual("153 255 204 153 255 204 153 255 204 153 255 204 153");
  });

  test('PPM files are terminated by a newline character', () => {
    const c = new Canvas(5, 3);
    expect(c.toPPM().slice(-1)).toEqual("\n")
  });
});
