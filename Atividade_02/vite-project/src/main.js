import './style.css';
import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 8);
camera.lookAt(0, 0, 0);

const boxGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(cube);

const orbitRadius = 5;
const orbitSpeed = 0.02;
const rotationSpeed = 0.03;

let angle = 0;

const animate = () => {
  requestAnimationFrame(animate);

  angle += orbitSpeed;
  cube.position.x = Math.cos(angle) * orbitRadius;
  cube.position.z = Math.sin(angle) * orbitRadius;
  cube.position.y = 0.5;

  cube.rotation.x += rotationSpeed * 0.3;
  cube.rotation.y += rotationSpeed;

  renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
