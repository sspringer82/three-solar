import * as THREE from 'three';

import { animatePlanets, loadPlanets, rotatePlanets } from './planets';
import './style.css';
import {
  Controls,
  addOverlay,
  createAmbientLight,
  createCamera,
  createControls,
  createRaycaster,
  createRenderer,
  createScene,
  createStarField,
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

const starField = createStarField();
scene.add(starField);

addOverlay();
createRaycaster(scene, camera);

function animate() {
  requestAnimationFrame(animate);
  controls.update(0.1);
  renderer.render(scene, camera);
  rotatePlanets(scene);
  animatePlanets(scene);
}
animate();
