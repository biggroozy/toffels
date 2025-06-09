// app.js
import scene from "./core/scene";
import createCamera from "./core/camera";
import createRenderer from "./core/renderer";
import createControls from "./core/controls";
import { loadHDRI } from "./core/environment";
import { updateModel } from "./controllers/updateModel";
import { onChange } from "./controllers/tableStore";
import "./ui/initUI"; // interfejs i inputy

// Ustawienie kamery, renderera i kontrolek
const container = document.querySelector(".canva-place");
const camera = createCamera(container);
const renderer = createRenderer(container);
const controls = createControls(camera, renderer.domElement);

// Załaduj środowisko HDRI
loadHDRI(scene);

// Wygeneruj pierwszy stół
updateModel();

// Aktualizacja stołu przy każdej zmianie w stanie
onChange(() => {
  updateModel();
});

export { scene, camera, renderer, controls };
