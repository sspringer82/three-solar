import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { planets } from './planets';

export function createScene(): THREE.Scene {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x00_00_00);
  scene.fog = new THREE.Fog(0xffffff, 0.0025, 500);
  return scene;
}

export function createRenderer(): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.setClearColor(0xff_ff_ff);
  return renderer;
}

function createSimpleSphere(): THREE.Mesh {
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff_00_00 });
  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMesh.position.set(0, 0, -5);
  return sphereMesh;
}

function createAdvancedSphere(): THREE.Mesh {
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xff_00_00 });
  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMesh.position.set(0, 0, -5);
  sphereMesh.castShadow = true;
  sphereMesh.receiveShadow = true;
  return sphereMesh;
}

export function createBox() {
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

  boxMesh.position.set(0, 0, -5);
  boxMesh.castShadow = true;

  return boxMesh;
}

export function createSphere(isSimple = true): THREE.Mesh {
  if (isSimple) {
    return createSimpleSphere();
  } else {
    return createAdvancedSphere();
  }
}

export function createAmbientLight(): THREE.AmbientLight {
  const ambientLight = new THREE.AmbientLight(0x404040);
  ambientLight.intensity = 50;
  return ambientLight;
}

export function createPlane(): THREE.Mesh {
  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.rotation.x = -Math.PI / 2;
  planeMesh.position.y = -1;
  planeMesh.position.z = -5;
  planeMesh.receiveShadow = true;
  return planeMesh;
}

export function createPointLight(): THREE.PointLight {
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, -10);
  pointLight.intensity = 100;
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 2048;
  pointLight.shadow.mapSize.height = 2048;
  pointLight.shadow.bias = -0.001;
  return pointLight;
}

export function createCamera(): THREE.Camera {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    500
  );
  camera.position.set(0, 0, 1);
  return camera;
}

export enum Controls {
  OrbitControls,
  FlyControls,
  FirstPersonControls,
}

export function createControls(
  type: Controls,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer
): OrbitControls | FlyControls | FirstPersonControls {
  switch (type) {
    case Controls.OrbitControls:
      return new OrbitControls(camera, renderer.domElement);
    case Controls.FlyControls:
      const flyControls = new FlyControls(camera, renderer.domElement);
      flyControls.movementSpeed = 50;
      flyControls.domElement = renderer.domElement;
      flyControls.rollSpeed = Math.PI / 24;
      flyControls.autoForward = false;
      flyControls.dragToLook = false;
      return flyControls;
    case Controls.FirstPersonControls:
    default:
      const fpControls = new FirstPersonControls(camera, renderer.domElement);
      fpControls.movementSpeed = 1;
      fpControls.lookSpeed = 0.01;
      fpControls.lookVertical = false;
      return fpControls;
  }
}

export function createStarField(): THREE.Points {
  const textureLoader = new THREE.TextureLoader();
  const starTexture = textureLoader.load('planets/star.webp'); // Pfad zur Stern-Textur
  const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2,
    map: starTexture,
    transparent: true,
  });

  const starsGeometry = new THREE.BufferGeometry();

  const starVertices = [];
  for (let i = 0; i < 10000; i++) {
    const x = THREE.MathUtils.randFloatSpread(1000);
    const y = THREE.MathUtils.randFloatSpread(1000);
    const z = THREE.MathUtils.randFloatSpread(1000);
    starVertices.push(x, y, z);
  }
  starsGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starVertices, 3)
  );

  const starField = new THREE.Points(starsGeometry, starsMaterial);

  return starField;
}

export function createRaycaster(scene: THREE.Scene, camera: THREE.Camera) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onMouseMove(event: MouseEvent) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    const overlay = document.getElementById('overlay');
    let intersected = false;
    for (let i = 0; i < intersects.length; i++) {
      const intersectObject = intersects[i].object;
      if (
        intersectObject.parent?.name &&
        planets.includes(intersectObject.parent.name)
      ) {
        overlay!.innerText = intersectObject.parent.name;
        overlay!.style.display = 'block';
        overlay!.style.left = `${event.clientX + 10}px`;
        overlay!.style.top = `${event.clientY + 10}px`;
        intersected = true;

        break;
      }
    }

    if (!intersected) {
      overlay!.style.display = 'none';
    }
  }

  window.addEventListener('mousemove', onMouseMove);
}

export function addOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.style.position = 'absolute';
  overlay.style.color = 'white';
  overlay.style.padding = '5px';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.border = '1px solid white';
  overlay.style.borderRadius = '4px';
  overlay.style.display = 'none';
  document.body.appendChild(overlay);
}
