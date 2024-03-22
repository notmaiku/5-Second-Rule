<template>
  <div style="display: flex; width=100%; height=100%">
    <div ref="target" style="width: 500px; height: 500px;" tabindex="0" @keydown="handleKeyDown" @keyup="handleKeyUp">
    </div>
    <div ref="stats" style=" cursor: pointer;"></div>
    <ul>
      <li v-for="model in models" :key="model">
        <button @click="selectedModal = model">{{ model }}</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref, watch } from 'vue';
import * as THREE from 'three';
import Stats from 'stats.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const selectedModal = ref('Hamtaro');
const models = ['Hamtaro', 'cinnamoroll', 'cube']

const target = ref<HTMLElement | null>(null);
const moveForward = ref(false);
const moveBackward = ref(false);
let loadedObject: THREE.Object3D | null = null;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let stats: Stats;

onMounted(() => {
  if (typeof window !== 'undefined' && target.value) {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 500);
    target.value.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light, shining from the top
    directionalLight.position.set(0, 1, 0); // Direction the light is shining towards
    scene.add(directionalLight);

    // Add stats.js
    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);

    // Load OBJ file
    const loader = new OBJLoader();
    loader.load(
      `${selectedModal.value}.obj`,
      (object) => {
        loadedObject = object;
        scene.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('An error happened', error);
      }
    );

    // Start animation
    animate();
  }
});

function animate() {
  requestAnimationFrame(animate);

  // Move object forward or backward based on keyboard input
  if (moveForward.value && loadedObject) {
    loadedObject.position.z -= 0.05; // Move the object forward
  }

  if (moveBackward.value && loadedObject) {
    loadedObject.position.z += 0.05; // Move the object backward
  }

  // Rotate object (optional)
  if (loadedObject) {
    loadedObject.rotation.x += 0.01;
    loadedObject.rotation.y += 0.01;
  }

  renderer.render(scene, camera);

  // Update stats
  stats.update();
}


function loadModel(modelName: string) {
  const loader = new OBJLoader();
  loader.load(
    `${modelName}.obj`,
    (object) => {
      if (loadedObject) {
        scene.remove(loadedObject);
      }
      loadedObject = object;
      scene.add(object);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
      console.error('An error happened', error);
    }
  );
}

watch(selectedModal, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    loadModel(newValue);
  }
});


function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'w') {
    moveForward.value = true;
  }
  if (event.key === 's') {
    moveBackward.value = true;
  }
}
function handleKeyUp(event: KeyboardEvent) {
  if (event.key === 'w') {
    moveForward.value = false;
  }
  if (event.key === 's') {
    moveBackward.value = false;
  }
}

</script>

