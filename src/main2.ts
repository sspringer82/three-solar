import './style.css';
import {
  createAmbientLight,
  createCamera,
  createPlane,
  createPointLight,
  createRenderer,
  createScene,
  createSphere,
} from './util';

const scene = createScene();

const renderer = createRenderer();
document.body.appendChild(renderer.domElement);

const sphereMesh = createSphere(false);
scene.add(sphereMesh);

const planeMesh = createPlane();
scene.add(planeMesh);

const camera = createCamera();
camera.lookAt(sphereMesh.position);

const ambientLight = createAmbientLight();
scene.add(ambientLight);

const pointLight = createPointLight();
scene.add(pointLight);

renderer.render(scene, camera);
