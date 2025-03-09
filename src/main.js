import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { World } from "./world";

const gui = new GUI();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 5, 10);
// Camera controller
const controls = new OrbitControls(camera, renderer.domElement);
// Add a TERRAIN:
const world = new World(10, 10);
scene.add(world);

// Create a light
const sun = new THREE.DirectionalLight();
sun.intensity = 3;
sun.position.set(1, 2, 3);
scene.add(sun);

// Add an ambient light
const ambient = new THREE.AmbientLight(0xaaaaff, 0.5);
scene.add(ambient);

/**
 // A test CUBE
 // const geometry = new THREE.BoxGeometry(1, 1, 1);
 // const material = new THREE.MeshStandardMaterial({ color: 0x624088 });
 // const cube = new THREE.Mesh(geometry, material);
 // scene.add(cube);
 * 
 */

// Stats
const stats = new Stats();
document.body.appendChild(stats.dom);

camera.position.z = 5;
controls.update();
function animate() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  controls.update();
  stats.update();
  renderer.render(scene, camera);
}

// Maker canvas reactive to window resize...
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const worldFolder = gui.addFolder("World");
worldFolder.add(world, "width", 1, 20, 1).name("Width");
worldFolder.add(world, "height", 1, 20, 1).name("Height");
worldFolder.addColor(world.terrain.material, "color").name("Color");
worldFolder.onChange(() => {
  world.createTerrain();
});
