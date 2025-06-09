import { scene, camera, renderer, controls } from "./app";

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
