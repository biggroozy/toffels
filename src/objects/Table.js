import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { getCurrentShape } from "../controllers/tableStore";

function isUniformScaling(shapeName) {
  return shapeName === "round" || shapeName === "square";
}

export default class Table {
  constructor({ length = 200, width = 100, thick = 4, material, color }) {
    this.shape = getCurrentShape();
    this.length = length;
    this.width = width;
    this.thick = thick;
    this.materialName = material;
    this.color = color;
    this.mesh = null;
  }

  async load() {
    const loader = new SVGLoader();
    const path = this.shape.path;

    try {
      const data = await loader.loadAsync(path);
      const group = new THREE.Group();

      const extrudeSettings = {
        depth: this.thick * 0.1,
        bevelEnabled: false,
      };

      const tint = new THREE.Color(this.color || "#ffffff").multiplyScalar(0.9);

      let material;
      if (this.materialName) {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(
          `./assets/materials/${this.materialName}.jpg`
        );
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        const scaleFactor = 0.0001;
        texture.repeat.set(this.length * scaleFactor, this.width * scaleFactor);
        material = new THREE.MeshStandardMaterial({
          map: texture,
          color: tint,
        });
      } else {
        material = new THREE.MeshStandardMaterial({ color: tint });
      }

      data.paths.forEach((path) => {
        const shapes = SVGLoader.createShapes(path);
        shapes.forEach((shape) => {
          const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
          const mesh = new THREE.Mesh(geometry, material);
          geometry.center();
          group.add(mesh);
        });
      });

      group.name = this.shape.name;
      group.rotation.x = -Math.PI / 2;

      const uniform = isUniformScaling(this.shape.name);
      const scaleX = this.length / 2000;
      const scaleY = uniform ? scaleX : this.width / 1000;

      group.scale.set(scaleX, scaleY, 1);
      this.mesh = group;
      return group;
    } catch (error) {
      console.error("Nie udało się załadować SVG lub tekstury", error);
      return null;
    }
  }
}
