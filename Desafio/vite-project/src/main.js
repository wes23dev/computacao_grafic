import './style.css';
import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(3, 3, 5);
camera.lookAt(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 8, 5);
scene.add(directionalLight);

const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
backLight.position.set(-3, 2, -3);
scene.add(backLight);

const pyramidGeometry = new THREE.ConeGeometry(1.5, 2.5, 4);
const pyramidMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
  roughness: 0.6,
  metalness: 0.1
});
const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
pyramid.rotation.y = Math.PI / 4;
scene.add(pyramid);

const edgesGeometry = new THREE.EdgesGeometry(pyramidGeometry);
const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x888888, transparent: true, opacity: 0.3 });
const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
edges.rotation.y = Math.PI / 4;
scene.add(edges);

let time = 0;

const animate = () => {
  requestAnimationFrame(animate);

  time += 0.01;

  const scale = 1 + Math.sin(time * 2) * 0.5;
  pyramid.scale.set(scale, scale, scale);
  edges.scale.set(scale, scale, scale);

  renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
