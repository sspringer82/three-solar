import './style.css';
import {
  createCamera,
  createRenderer,
  createScene,
  createSphere,
} from './util';

const scene = createScene();

const renderer = createRenderer();
document.body.appendChild(renderer.domElement);

const sphereMesh = createSphere();
scene.add(sphereMesh);

const camera = createCamera();
camera.lookAt(sphereMesh.position);

renderer.render(scene, camera);
