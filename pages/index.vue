// pages/index.vue

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
</script>

