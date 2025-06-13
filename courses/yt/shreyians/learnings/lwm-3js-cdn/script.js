// scene
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(65, window.innerWidth/window.innerHeight, .1, 100)

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
camera.position.z = 5;
scene.add(mesh);


// Transformations
// Math.PI -> 180 degrees
// position: +ve <-> -ve
// mesh.position.z = 0.1;
// rotate 
// mesh.rotation.x = 0.1;
// scale
// mesh.scale.y = 0.1;


const canvas = document.querySelector('#draw');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Used for consistent animation independent of CPU/GPU speed.
let clock = new THREE.Clock();
function animate() {
    // Syncs rendering to the browser's refresh rate (~60fps).
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // run accordng to clock time
    // mesh.rotation.x += clock.getElapsedTime();
    mesh.rotation.x += 0.01;
}

animate();