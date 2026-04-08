import './style.css';
import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const aspect = window.innerWidth / window.innerHeight;
const viewHeight = 10;
const viewWidth = viewHeight * aspect;

const camera = new THREE.OrthographicCamera(
  -viewWidth / 2, viewWidth / 2,
  viewHeight / 2, -viewHeight / 2,
  0.1, 100
);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);

const paddleWidth = 0.3;
const paddleHeight = 2;
const paddleDepth = 0.3;
const paddleOffset = viewWidth / 2 - 0.8;

const paddleGeometry = new THREE.BoxGeometry(paddleWidth, paddleHeight, paddleDepth);
const paddleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

const leftPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
leftPaddle.position.set(-paddleOffset, 0, 0);
scene.add(leftPaddle);

const rightPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
rightPaddle.position.set(paddleOffset, 0, 0);
scene.add(rightPaddle);

const ballGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.set(0, 0, 0);
scene.add(ball);

let ballSpeedX = 0.06;

const animate = () => {
  requestAnimationFrame(animate);

  ball.position.x += ballSpeedX;

  if (ball.position.x >= rightPaddle.position.x - paddleWidth / 2 - 0.2) {
    ballSpeedX = -Math.abs(ballSpeedX);
  }

  if (ball.position.x <= leftPaddle.position.x + paddleWidth / 2 + 0.2) {
    ballSpeedX = Math.abs(ballSpeedX);
  }

  renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
  const newAspect = window.innerWidth / window.innerHeight;
  const newWidth = viewHeight * newAspect;
  camera.left = -newWidth / 2;
  camera.right = newWidth / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
