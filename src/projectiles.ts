const { Tuple, Point, Vector, Color } = require('./tuple.ts');
const { Canvas } = require('./canvas.ts');
const fs = require('fs');

class Projectile {
  position: typeof Point;
  velocity: typeof Vector;

  constructor(position: typeof Point, velocity: typeof Vector) {
    this.position = position;
    this.velocity = velocity;
  }
}

class Environment {
  gravity: typeof Vector;
  wind: typeof Vector;

  constructor(gravity: typeof Vector, wind: typeof Vector) {
    this.gravity = gravity;
    this.wind = wind;
  }

  tick(projectile: Projectile) {
    const position = projectile.position.add(projectile.velocity);
    const velocity = projectile.velocity.add(this.gravity).add(this.wind);
    return new Projectile(position, velocity);
  }
}

const position = new Point(0, 100, 0);
const velocity = new Vector(100, 150, 0).normalize();
let p = new Projectile(position, velocity);

const gravity = new Vector(0, -1, 0);
const wind = new Vector(2, 0, 0);
const e = new Environment(gravity, wind);

const canvas = new Canvas(800, 600);

const color = new Color(0, 0.5, 0);
while (p.position.tuple[1] >= 0) {
  // console.log(p.position);
  canvas.writePixel(Math.round(p.position.x), Math.round(canvas.height - p.position.y), color)
  p = e.tick(p);
}
fs.writeFile('projectile.ppm', canvas.toPPM(), function (err: any) {
  if (err) throw err;
  console.log('Done');
});
