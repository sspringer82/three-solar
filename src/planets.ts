import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const planets = [
  'sun',
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
];

export const planetsConfig = {
  mercury: {
    a: 10,
    b: 8,
    t: 0,
    add: 0.01,
  },
  venus: {
    a: 15,
    b: 12,
    t: 0,
    add: 0.015,
  },
  earth: {
    a: 20,
    b: 16,
    t: 0,
    add: 0.02,
  },
  mars: {
    a: 25,
    b: 20,
    t: 0,
    add: 0.018,
  },
  jupiter: {
    a: 30,
    b: 24,
    t: 0,
    add: 0.021,
  },
  saturn: {
    a: 38,
    b: 30,
    t: 0,
    add: 0.017,
  },
  uranus: {
    a: 45,
    b: 36,
    t: 0,
    add: 0.015,
  },
  neptune: {
    a: 52,
    b: 42,
    t: 0,
    add: 0.014,
  },
};

export function animatePlanets(scene: THREE.Scene) {
  planetsConfig.mercury.t += planetsConfig.mercury.add;
  planetsConfig.venus.t += planetsConfig.venus.add;
  planetsConfig.earth.t += planetsConfig.earth.add;
  planetsConfig.mars.t += planetsConfig.mars.add;
  planetsConfig.jupiter.t += planetsConfig.jupiter.add;
  planetsConfig.saturn.t += planetsConfig.saturn.add;
  planetsConfig.uranus.t += planetsConfig.uranus.add;
  planetsConfig.neptune.t += planetsConfig.neptune.add;

  const sun = scene.getObjectByName('sun');

  const mercury = scene.getObjectByName('mercury');
  if (mercury) {
    mercury!.position.x =
      sun?.position.x! +
      planetsConfig.mercury.a * Math.cos(planetsConfig.mercury.t);
    mercury!.position.z =
      sun?.position.z! +
      planetsConfig.mercury.b * Math.sin(planetsConfig.mercury.t);
  }

  const venus = scene.getObjectByName('venus');
  if (venus) {
    venus!.position.x =
      sun?.position.x! +
      planetsConfig.venus.a * Math.cos(planetsConfig.venus.t);
    venus!.position.z =
      sun?.position.z! +
      planetsConfig.venus.b * Math.sin(planetsConfig.venus.t);
  }

  const earth = scene.getObjectByName('earth');
  if (earth) {
    earth!.position.x =
      sun?.position.x! +
      planetsConfig.earth.a * Math.cos(planetsConfig.earth.t);
    earth!.position.z =
      sun?.position.z! +
      planetsConfig.earth.b * Math.sin(planetsConfig.earth.t);
  }

  const mars = scene.getObjectByName('mars');
  if (mars) {
    mars!.position.x =
      sun?.position.x! + planetsConfig.mars.a * Math.cos(planetsConfig.mars.t);
    mars!.position.z =
      sun?.position.z! + planetsConfig.mars.b * Math.sin(planetsConfig.mars.t);
  }

  const jupiter = scene.getObjectByName('jupiter');
  if (jupiter) {
    jupiter!.position.x =
      sun?.position.x! +
      planetsConfig.jupiter.a * Math.cos(planetsConfig.jupiter.t);
    jupiter!.position.z =
      sun?.position.z! +
      planetsConfig.jupiter.b * Math.sin(planetsConfig.jupiter.t);
  }

  const saturn = scene.getObjectByName('saturn');
  if (saturn) {
    saturn!.position.x =
      sun?.position.x! +
      planetsConfig.saturn.a * Math.cos(planetsConfig.saturn.t);
    saturn!.position.z =
      sun?.position.z! +
      planetsConfig.saturn.b * Math.sin(planetsConfig.saturn.t);
  }

  const uranus = scene.getObjectByName('uranus');
  if (uranus) {
    uranus!.position.x =
      sun?.position.x! +
      planetsConfig.uranus.a * Math.cos(planetsConfig.uranus.t);
    uranus!.position.z =
      sun?.position.z! +
      planetsConfig.uranus.b * Math.sin(planetsConfig.uranus.t);
  }

  const neptune = scene.getObjectByName('neptune');
  if (neptune) {
    neptune!.position.x =
      sun?.position.x! +
      planetsConfig.neptune.a * Math.cos(planetsConfig.neptune.t);
    neptune!.position.z =
      sun?.position.z! +
      planetsConfig.neptune.b * Math.sin(planetsConfig.neptune.t);
  }
}

export function rotatePlanets(scene: THREE.Scene) {
  planets
    .map((planet) => scene.getObjectByName(planet))
    .filter((planet) => planet !== undefined)
    .forEach((planet) => {
      planet!.rotation.y -= 0.01;
    });
}

export function loadSun(scene: THREE.Scene) {
  loadPlanet(
    'planets/Sun.glb',
    -0.009,
    scene,
    new THREE.Vector3(0, 0, -5),
    'sun'
  );
}

export function loadMercury(scene: THREE.Scene) {
  loadPlanet(
    'planets/Mercury.glb',
    -0.001,
    scene,
    new THREE.Vector3(7, 0, -5),
    'mercury'
  );
}

export function loadVenus(scene: THREE.Scene) {
  loadPlanet(
    'planets/Venus.glb',
    -0.002,
    scene,
    new THREE.Vector3(11, 0, -5),
    'venus'
  );
}

export function loadEarth(scene: THREE.Scene) {
  loadPlanet(
    'planets/Earth.glb',
    -0.002,
    scene,
    new THREE.Vector3(17, 0, -5),
    'earth'
  );
}

export function loadMars(scene: THREE.Scene) {
  loadPlanet(
    'planets/Mars.glb',
    -0.0015,
    scene,
    new THREE.Vector3(23, 0, -5),
    'mars'
  );
}

export function loadJupiter(scene: THREE.Scene) {
  loadPlanet(
    'planets/Jupiter.glb',
    -0.005,
    scene,
    new THREE.Vector3(31, 0, -5),
    'jupiter'
  );
}

export function loadSaturn(scene: THREE.Scene) {
  loadPlanet(
    'planets/Saturn.glb',
    -0.004,
    scene,
    new THREE.Vector3(40, 0, -5),
    'saturn'
  );
}

export function loadUranus(scene: THREE.Scene) {
  loadPlanet(
    'planets/Uranus.glb',
    -0.003,
    scene,
    new THREE.Vector3(48, 0, -5),
    'uranus'
  );
}

export function loadNeptune(scene: THREE.Scene) {
  loadPlanet(
    'planets/Neptune.glb',
    -0.003,
    scene,
    new THREE.Vector3(56, 0, -5),
    'neptune'
  );
}

function loadPlanet(
  fileName: string,
  scale: number,
  scene: THREE.Scene,
  position: THREE.Vector3,
  name: string
) {
  const loader = new GLTFLoader();
  loader.load(
    fileName,
    (gltf) => {
      gltf.scene.scale.set(scale, scale, scale);
      gltf.scene.position.copy(position);
      gltf.scene.name = name;
      scene.add(gltf.scene);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );
}

export function loadPlanets(scene: THREE.Scene) {
  loadSun(scene);
  loadMercury(scene);
  loadVenus(scene);
  loadEarth(scene);
  loadMars(scene);
  loadJupiter(scene);
  loadSaturn(scene);
  loadUranus(scene);
  loadNeptune(scene);
}
