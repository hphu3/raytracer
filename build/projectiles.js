"use strict";
const { Tuple, Point, Vector } = require('./tuple');
class Projectile {
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
    }
}
class Environment {
    constructor(gravity, wind) {
        this.gravity = gravity;
        this.wind = wind;
    }
    tick(projectile) {
        const position = projectile.position + projectile.velocity;
        const velocity = projectile.velocity + this.gravity + this.wind;
        return new Projectile(position, velocity);
    }
}
const position = new Point(0, 1, 0);
const velocity = new Vector(1, 1, 0).normalize();
p = new Projectile(position, velocity);
const gravity = new Vector(0, -0.1, 0);
const wind = new Vector(-0.01, 0, 0);
e = new Environment(gravity, wind);
while (p.position[1] >= 0) {
    e.tick(p);
    console.log(p.position);
}
