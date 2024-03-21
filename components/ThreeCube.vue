<template>
  <div ref="target" style="width: 500px; height: 500px;" tabindex="0" @keydown="handleKeyDown" @keyup="handleKeyUp"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as THREE from 'three';

const target = ref<HTMLElement | null>(null);
const moveForward = ref(false);
const moveBackward = ref(false);

onMounted(() => {
    if (typeof window !== 'undefined' && target.value) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(500, 500);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;


        function animate() {
            requestAnimationFrame(animate);

            if (moveForward.value) {
                cube.position.z -= 0.05; // Adjust the speed as needed
            }

            if (moveBackward.value) {
                cube.position.z += 0.05; // Adjust the speed as needed
            }
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        }

        target.value.appendChild(renderer.domElement);
        animate();
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

