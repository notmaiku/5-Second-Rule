// pages/index.vue

<template>
  <div>
    <ThreeCube />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ThreeCube from '~/components/ThreeCube.vue';

export default defineComponent({
  components: {
    ThreeCube
  }
})
</script>

