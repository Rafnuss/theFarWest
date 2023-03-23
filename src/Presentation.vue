<template>
  <div v-if="region == 'midwest'"></div>
  <div v-else-if="region == 'colorado'"></div>
  <div v-else-if="region == 'texas'"></div>
  <div v-else-if="region == 'arizona'"></div>
  <div v-else-if="region == 'california'"></div>
  <div v-else-if="region == 'mountainwest'"></div>
  <div v-else-if="region == 'cascadia'"></div>
  <div v-else></div>
</template>

<script>
export default {
  props: ["region"],
};
</script>

<style>
.iframe-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 90%; /* 16:9 aspect ratio */
}

.iframe-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
