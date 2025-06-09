import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const createControls = (camera, domElement) => {
  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI / 2.1;
  controls.minDistance = 8;
  controls.maxDistance = 18;
  return controls;
};

export default createControls;
