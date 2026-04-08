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
camera.position.set(0, 2, 6);
camera.lookAt(0, 0, 0);

const origin = new THREE.Vector3(0, 0.2, 0);
const axisLength = 10;

const redGeom = new THREE.BufferGeometry().setFromPoints([
  origin,
  new THREE.Vector3(origin.x, origin.y + axisLength, origin.z)
]);
const redLine = new THREE.Line(redGeom, new THREE.LineBasicMaterial({ color: 0xff0000 }));
scene.add(redLine);

const blueDir = new THREE.Vector3(-Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4), 0);
const blueGeom = new THREE.BufferGeometry().setFromPoints([
  origin,
  new THREE.Vector3(
    origin.x + blueDir.x * axisLength,
    origin.y + blueDir.y * axisLength,
    origin.z + blueDir.z * axisLength
  )
]);
const blueLine = new THREE.Line(blueGeom, new THREE.LineBasicMaterial({ color: 0x0000ff }));
scene.add(blueLine);

const greenDir = new THREE.Vector3(Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4), 0);
const greenGeom = new THREE.BufferGeometry().setFromPoints([
  origin,
  new THREE.Vector3(
    origin.x + greenDir.x * axisLength,
    origin.y + greenDir.y * axisLength,
    origin.z + greenDir.z * axisLength
  )
]);
const greenLine = new THREE.Line(greenGeom, new THREE.LineBasicMaterial({ color: 0x00ff00 }));
scene.add(greenLine);

const planeGeometry = new THREE.PlaneGeometry(8, 8);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(6, 1.5, -2);
plane.rotation.x = -0.3;
plane.rotation.y = -0.5;
plane.rotation.z = 0.15;
scene.add(plane);

const boxGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.position.set(-1.2, 0.8, 0);
scene.add(cube);

const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 0.2, 0);
scene.add(sphere);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
