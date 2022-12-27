const { Color } = require('./tuple');

class Material {
  ambient: Number
  diffuse: Number
  specular: Number
  shininess: Number
  color: typeof Color


  constructor(color: typeof Color, ambient: Number, diffuse: Number, specular: Number, shininess: Number) {
    this.ambient = ambient || 0.1;
    this.diffuse = diffuse || 0.9;
    this.specular = specular || 0.9;
    this.shininess = shininess || 200.0;
    this.color = color || new Color(1, 1, 1);
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
