import * as THREE from "three";

const createCamera = (container) => {
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(-3, 6, 9);
  camera.updateProjectionMatrix();
  return camera;
};

export default createCamera;
