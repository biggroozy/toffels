import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { getCurrentLeg, getCurrentShape } from "../controllers/tableStore";

const loader = new GLTFLoader();

export default class Legs {
  constructor({ tableSize, topThickness }) {
    this.tableSize = tableSize;
    this.topThickness = topThickness;

    this.legData = getCurrentLeg();
    this.shapeData = getCurrentShape();

    if (!this.shapeData.allowedLegsTypes.includes(this.legData.type)) {
      throw new Error(
        `Leg "${this.legData.name}" is not allowed for top "${this.shapeData.name}"`
      );
    }

    this.offsetY = this.legData.offsetY ?? 0;
    this.legType = this.legData.id;
    this.legArrangement = this.legData.type;
    this.scale = this.legData.scale ?? 10;
  }

  async load() {
    const gltf = await loader.loadAsync(this.legData.path);
    const original = gltf.scene;
    const group = new THREE.Group();
    const y = -this.topThickness / 2 - this.offsetY;

    switch (this.legArrangement) {
      case "single":
        original.position.set(0, 0, 0);
        original.scale.set(this.scale, this.scale, this.scale);
        // original.scale.set(10, 10, 10);
        group.add(original);
        break;

      case "quad":
        const offsets = [
          [1, 1],
          [-1, 1],
          [1, -1],
          [-1, -1],
        ];
        offsets.forEach(([xMul, zMul]) => {
          const leg = original.clone();
          leg.position.set(
            (this.tableSize.width / 2 - 0.1) * xMul,
            y,
            (this.tableSize.length / 2 - 0.1) * zMul
          );
          leg.scale.set(this.scale, this.scale, this.scale);
          group.add(leg);
        });
        break;

      case "double":
        const left = original.clone();
        const right = original.clone();

        left.position.set(-this.tableSize.width / 2 + 0.2, y, 0);
        right.position.set(this.tableSize.width / 2 - 0.2, y, 0);
        left.scale.set(this.scale, this.scale, this.scale);
        right.scale.set(this.scale, this.scale, this.scale);
        group.add(left, right);
        break;

      default:
        console.warn("Nieznany typ nóg:", this.legArrangement);
        break;
    }

    return group;
  }
}
