import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import * as THREE from "three";

export const loadHDRI = (scene) => {
  new RGBELoader()
    .setPath("assets/hdri/")
    .load("studio_small_08_2k.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.background = texture;
    });
};
