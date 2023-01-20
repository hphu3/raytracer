const { Tuple, Vector, Point, Color } = require('./tuple');
const { PointLight } = require('./point_light')

class Material {
  ambient: number
  diffuse: number
  specular: number
  shininess: number
  color: typeof Color


  constructor(color: typeof Color, ambient: number, diffuse: number, specular: number, shininess: number) {
    this.ambient = ambient || 0.1;
    this.diffuse = diffuse || 0.9;
    this.specular = specular || 0.9;
    this.shininess = shininess || 200.0;
    this.color = color || new Color(1, 1, 1);
  }

  lighting(light: typeof PointLight, point: typeof Point, eyev: typeof Vector, normalv: typeof Vector) {
    const effectiveColor = this.color.multiply(light.intensity);
    const lightv = light.position.subtract(point).normalize();
    const ambient = effectiveColor.multiply(this.ambient);

    let diffuse;
    let specular;

    const lightDotNormal = lightv.dot(normalv);
    if (lightDotNormal < 0) {
      diffuse = new Color(0, 0, 0);
      specular = new Color(0, 0, 0);
    } else {
      diffuse = effectiveColor.multiply(this.diffuse).multiply(lightDotNormal);
      const reflectv = lightv.negate().reflect(normalv);
      const reflectDotEye = reflectv.dot(eyev);

      if (reflectDotEye <= 0) {
        specular = new Color(0, 0, 0);
      } else {
        const factor = Math.pow(reflectDotEye, this.shininess);
        specular = light.intensity.multiply(this.specular).multiply(factor);
      }
    }
    return ambient.add(diffuse).add(specular);
  }

  equals(m2: Material) {
    return this.ambient == m2.ambient &&
      this.diffuse == m2.diffuse &&
      this.specular == m2.specular &&
      this.shininess == m2.shininess &&
      this.color.equals(m2.color);
  }
}

export { Material };
