class Intersection {
  t: number;
  object: any;

  constructor(t: number, object: any) {
    this.t = t;
    this.object = object;
  }
}

class Intersections {
  intersections: Array<Intersection>;

  constructor(...intersections: Intersection[]) {
    this.intersections = intersections;
  }

  hit() {
    const sorted = this.intersections.sort((a, b) => {
      return a.t - b.t;
    }).filter((x) => x.t > 0);
    return sorted.length > 0 ? sorted[0] : null;
  }
}

export { Intersection, Intersections };
