import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GUI } from 'lil-gui';

// 1. Create the scene
const scene = new THREE.Scene();

// 2. Set up the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 10);  // Slightly above and back
camera.lookAt(0, 0, 0);

// 3. Set up the renderer
const canvas = document.querySelector('#draw');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// 4. Add lighting
const ambientLight = new THREE.AmbientLight('white', 0.5); // Soft ambient light
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight('white', 1);  // Strong directional light
dirLight.position.set(10, 10, 10);
scene.add(dirLight);

// 5. (Optional) Helpers for debugging - commented out
// scene.add(new THREE.AxesHelper(5));     // Shows X, Y, Z axes
// scene.add(new THREE.GridHelper(10, 10)); // Shows a ground grid

// 6. OrbitControls to allow user interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.target.set(0, 0, 0);
controls.update();

// 7. Load a texture for demo objects
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/assets/paving.png');

// 8. Create materials
const wireframeMaterial = new THREE.MeshStandardMaterial({
  color: 'white',
  wireframe: true,
  side: THREE.DoubleSide,
});
const textureMaterial = new THREE.MeshStandardMaterial({ map: texture });

// 9. Add sample meshes (optional)
// Cube with solid color (not affected by light)
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// );
// scene.add(cube);

// Textured sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10), textureMaterial);
sphere.position.x = 3;
scene.add(sphere);

// Wireframe cylinder
const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(2, 2, 2, 4, 1, true),
  wireframeMaterial
);
cylinder.position.x = -4;
// scene.add(cylinder); // Uncomment to show

// 10. lil-gui for interactive tweaking
const gui = new GUI();
const options = {
  lightIntensity: 1,
  sphereX: 3,
  wireframe: true,
  color: '#ffffff',
};

gui.add(options, 'lightIntensity', 0, 2).onChange((val) => {
  ambientLight.intensity = val * 0.5;
  dirLight.intensity = val;
});
gui.add(options, 'sphereX', -10, 10).onChange((val) => (sphere.position.x = val));
gui.add(options, 'wireframe').onChange((val) => (wireframeMaterial.wireframe = val));
gui.addColor(options, 'color').onChange((val) => wireframeMaterial.color.set(val));

// 11. Load GLB model (Sage)
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  '/assets/valo/sage.glb',
  (gltf) => {
    const model = gltf.scene;

    // Center the model - Important while loading 3d objects
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    model.position.sub(center);

    // Scale model if very small
    const maxSize = Math.max(size.x, size.y, size.z);
    if (maxSize < 1) model.scale.setScalar(1 / maxSize);

    // Enable shadows for model
    model.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    scene.add(model);

    // Reposition camera based on model size
    camera.position.set(0, size.y / 2 + 1, size.z * 2);
    controls.target.set(0, 0, 0);
    controls.update();
  },
  undefined,
  (error) => console.error('Error loading model:', error)
);

// 12. Handle browser window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// 13. Main animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
