import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";
import { PointerLockControls } from "https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/PointerLockControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf4f4f4);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.7));
const light = new THREE.DirectionalLight(0xffffff, 0.6);
light.position.set(5, 10, 5);
scene.add(light);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({ color: 0xffffff })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const controls = new PointerLockControls(camera, document.body);
document.body.addEventListener("click", () => controls.lock());
scene.add(controls.getObject());

// --- Smart fridge ---
const fridge = new THREE.Mesh(
  new THREE.BoxGeometry(3, 5, 2),
  new THREE.MeshStandardMaterial({ color: 0x99ccff, transparent: true, opacity: 0.8 })
);
fridge.position.set(-6, 2.5, 0);
scene.add(fridge);

// --- Smart carts ---
for (let i = 0; i < 3; i++) {
  const cart = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1.5),
    new THREE.MeshStandardMaterial({ color: 0x444444 })
  );
  cart.position.set(2 + i * 1.5, 0.5, -3);
  scene.add(cart);
}

// --- Automatic juicer ---
const juicer = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 1, 2, 32),
  new THREE.MeshStandardMaterial({ color: 0xffcc88 })
);
juicer.position.set(6, 1, 5);
scene.add(juicer);

const keys = {};
document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

function animate() {
  requestAnimationFrame(animate);
  if (keys["KeyW"]) controls.moveForward(0.08);
  if (keys["KeyS"]) controls.moveForward(-0.08);
  if (keys["KeyA"]) controls.moveRight(-0.08);
  if (keys["KeyD"]) controls.moveRight(0.08);
  juicer.rotation.y += 0.02;
  renderer.render(scene, camera);
}

animate();
