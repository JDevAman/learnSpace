# 🧠 Three.js Notes – Updated (May 2025)

## 1. 🚀 Introduction to Three.js

* Three.js is a high-level JavaScript library that wraps WebGL, making it easier to create and manage 3D content in the browser.
* Built for games, visualizations, interactive UIs, and more.

## 2. ⚖️ Core Components

| Component  | Purpose                                                   |
| ---------- | --------------------------------------------------------- |
| `Scene`    | Container holding all 3D objects                          |
| `Camera`   | Perspective from which the scene is viewed                |
| `Renderer` | Renders scene from the camera's point of view             |
| `Mesh`     | Combination of geometry (shape) and material (appearance) |

### Example

```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
```

## 3. ⚙️ OrbitControls

Provides mouse-based camera movement:

```js
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // smooth motion
controls.dampingFactor = 0.25;
controls.enableZoom = true;
```

## 4. 🧱 Geometry Types

| Geometry                   | Description  |
| -------------------------- | ------------ |
| `BoxGeometry`              | Cube         |
| `SphereGeometry`           | Sphere       |
| `CylinderGeometry`         | Tube-shaped  |
| `PlaneGeometry`            | 2D surface   |
| `Torus`, `TorusKnot`, etc. | Other shapes |

Use `THREE.DoubleSide` if you need both sides rendered.

## 5. 🎨 Materials

| Material               | Description                         |
| ---------------------- | ----------------------------------- |
| `MeshBasicMaterial`    | No lighting; always visible         |
| `MeshStandardMaterial` | Physically based; responds to light |
| `ShaderMaterial`       | Custom GLSL shaders                 |

Use `TextureLoader` to apply images:

```js
const texture = new THREE.TextureLoader().load('/assets/image.png');
const material = new THREE.MeshStandardMaterial({ map: texture });
```

## 6. 💡 Lighting

### Types

| Type               | Description                  |
| ------------------ | ---------------------------- |
| `AmbientLight`     | Soft global lighting         |
| `DirectionalLight` | Sun-like parallel light rays |
| `PointLight`       | Omnidirectional from a point |
| `SpotLight`        | Focused beam with cone angle |

```js
const light = new THREE.DirectionalLight('white', 1);
light.position.set(10, 10, 10);
scene.add(light);
```

## 7. 🚰 lil-gui (Debugging UI)

```js
const gui = new GUI();
gui.add(options, 'lightIntensity', 0, 2).onChange(val => {
  light.intensity = val;
});
```

Supports booleans, sliders, color pickers, dropdowns.

## 8. 🌀 Animation Loop

Runs 60fps by default:

```js
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
```

## 9. 📐 Transformations

| Property                 | Purpose                    |
| ------------------------ | -------------------------- |
| `.position.set(x, y, z)` | Move object                |
| `.scale.set(x, y, z)`    | Resize object              |
| `.rotation.set(x, y, z)` | Rotate object (in radians) |

## 10. 🏞 Environment Maps (HDRI / Backgrounds)

### What is HDRI?

* High Dynamic Range Image (HDRI) files represent realistic lighting environments.
* Can be used to light scenes and reflect on materials.

### How to Add

```js
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

new RGBELoader()
  .load('/assets/hdr/sunset.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.background = texture; // optional: visible background
  });
```

#### Tips

* Use `.hdr` files (can download from Polyhaven).
* Use `MeshStandardMaterial` or `MeshPhysicalMaterial` to reflect environment.
* Set renderer tone mapping and exposure:

```js
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
```

## 11. 🧳 Loading 3D Models (GLTF / GLB)

Use `GLTFLoader`:

```js
const loader = new GLTFLoader();
loader.load('/model.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);
});
```

Best Practices:

* Use `Box3().setFromObject(model)` to center and scale:

```js
const box = new THREE.Box3().setFromObject(model);
const center = box.getCenter(new THREE.Vector3());
model.position.sub(center); // center at (0,0,0)
```

* Use `.traverse()` to enable shadows.

## 12. 🖥 Making Scene Responsive

```js
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
```

## 13. 📦 Optional Debug Helpers

```js
// scene.add(new THREE.AxesHelper(5));
// scene.add(new THREE.GridHelper(10, 10));
```

Helpful while developing to visualize orientation and ground plane.

## 14. 🧼 Project Structure & Organization

### Suggested folder structure

```
src/
  ├─ models/
  ├─ textures/
  ├─ scenes/
  ├─ controls/
  └─ utils/
main.js
index.html
```

## 15. Post Processing

* **EffectComposer**: Handles post-processing chain.
* **RenderPass**: Basic scene render (first pass).
* **ShaderPass**: Applies visual effects (e.g., RGB Shift, DOF).
* **Chain Passes**: Add multiple effects in order.
* **Final Render**: Use `composer.render()` instead of `renderer.render()`.

### Common Effects

* **RGBShiftShader** → Glitch/distortion.
* **UnrealBloomPass** → Light glow/bloom.
* **BokehPass / DOF** → Camera-like depth blur.
* **FilmShader** → Grain + scanlines.
* **DotScreenShader** → Halftone comic-style effect.

### Notes

* Must import from `three/examples/jsm/postprocessing/...`
* `RenderPass` is required as the first pass.
* Effects only visible if `composer.render()` is used in the animation loop.

### Modularize

* lights.js (for lighting setup)
* controls.js (for OrbitControls)
* loadModel.js (GLTFLoader wrapper)

## 15. ✅ Tips & Best Practices

* Use `MeshStandardMaterial` or `MeshPhysicalMaterial` for realistic shading.
* Use `renderer.shadowMap.enabled = true;` to enable shadows (if needed).
* Keep heavy models optimized (e.g., glTF + Draco compression).
* For better lighting: use HDRI or at least three-point lighting.
* Use GUI to adjust parameters live while developing.
* Don’t forget to clean up resources and cancel animation frame on disposal (when scaling or modularizing).
