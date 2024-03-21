// pages/index.vue

<template>
  <div>
    <ThreeCube />
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import ThreeCube from '~/components/ThreeCube.vue';

defineComponent({
  components: {
    ThreeCube
  }
})
</script>

