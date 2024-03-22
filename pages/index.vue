<template>
  <div>
    <ThreeCube />
  </div>
</template>

<script setup lang="ts">
import ThreeCube from '~/components/ThreeCube.vue';
import { defineComponent } from 'vue';

defineComponent({
  components: {
    ThreeCube
  }
})


const colorMode = useColorMode()

</script>


<script setup></script>

<style>
body {
  background-color: #fff;
  color: rgba(0,0,0,0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
