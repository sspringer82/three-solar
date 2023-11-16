import './style.css';
import {
  Controls,
  createAmbientLight,
  createBox,
  createCamera,
  createControls,
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

const boxMesh = createBox();
scene.add(boxMesh);

const planeMesh = createPlane();
scene.add(planeMesh);

const camera = createCamera();
camera.lookAt(boxMesh.position);

const ambientLight = createAmbientLight();
scene.add(ambientLight);

const pointLight = createPointLight();
scene.add(pointLight);

const controls = createControls(Controls.OrbitControls, camera, renderer);

let t = 0;
const x = 4;
const z = 2;

function animate() {
  boxMesh.rotation.y += 0.01;

  boxMesh.position.x = 0 + x * Math.cos(t);
  boxMesh.position.z = -5 + z * Math.sin(t);

  t += 0.01;

  requestAnimationFrame(animate);
  controls.update(0.1);
  renderer.render(scene, camera);
}
animate();
