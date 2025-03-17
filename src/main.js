import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { World } from "./world";
import { Player } from "./player";

const gui = new GUI();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 5, 10);
// Camera controller
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(5, 0, 5);
camera.position.set(0, 2, 0);
controls.update();
// Add a TERRAIN:
const world = new World(10, 10);
scene.add(world);

// Instantaite player
const plyr = new Player(camera, world);
scene.add(plyr);

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
worldFolder.add(world, "generate").name("Generate");
worldFolder.add(world, "treeCount", 1, 100, 1).name("Tree Count");
worldFolder.add(world, "rockCount", 1, 100, 1).name("Rock Count");
worldFolder.add(world, "bushCount", 1, 100, 1).name("Bush Count");
worldFolder.onChange(() => {
  world.createTerrain();
});
