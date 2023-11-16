import { animatePlanets, loadPlanets, rotatePlanets } from './planets';
import './style.css';
import {
  Controls,
  createAmbientLight,
  createCamera,
  createControls,
  createRenderer,
  createScene,
} from './util';

const scene = createScene();

const renderer = createRenderer();
document.body.appendChild(renderer.domElement);

const camera = createCamera();
camera.lookAt(0, 0, -5);

loadPlanets(scene);
const ambientLight = createAmbientLight();
scene.add(ambientLight);

const controls = createControls(Controls.OrbitControls, camera, renderer);

function animate() {
  requestAnimationFrame(animate);
  controls.update(0.1);
  renderer.render(scene, camera);
  rotatePlanets(scene);
  animatePlanets(scene);
}
animate();
