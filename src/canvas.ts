const { Color } = require('./tuple');

class Canvas {
  width: number;
  height: number;
  pixels: Array<Array<typeof Color>>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.pixels = []

    for (let col=0; col<height; col++) {
      this.pixels.push([]);

      for (let row=0; row<width; row++) {
        this.pixels[col].push(new Color(0, 0, 0));
      }
    }
  }

  writePixel(x: number, y: number, color: typeof Color) {
    if (x <= this.width && y <= this.height) {
      this.pixels[y][x] = color;
    }
  }

  pixelAt(x: number, y: number) {
    return this.pixels[y][x];
  }

  clampedScale(n: number, s: number, min: number, max: number) {
    const scaled = Math.round(n * s);
    return Math.max(min, Math.min(max, scaled));
  }

  toPPM() {
    const max = 255;
    const min = 0;
    const maxLineLength = 70
    const header = ["P3", `${this.width} ${this.height}`, `${max}`].join("\n");
    const bodyLines: Array<String> = [];
    let bodyLine: String = "";
    for (const row of this.pixels) {
      for (const color of row) {
        const colorArray = color.tuple.map((c: number) => this.clampedScale(c, max, min, max));
        for (const colorNum of colorArray) {
          if (bodyLine.length + ` ${colorNum}`.length > maxLineLength) {
            bodyLines.push(bodyLine);
            bodyLine = "";
          }
          bodyLine += bodyLine.length > 0 ? ` ${colorNum}` : `${colorNum}`;
        }
      }
      bodyLines.push(bodyLine);
      bodyLine = "";
    }
    bodyLines.push(bodyLine);
    const body = bodyLines.join("\n");
    return `${header}\n${body}\n`;
  }
}

export { Canvas };
