<template>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" :width="width" :height="height" :viewBox="viewBoxValue">
    <title :id="iconName" lang="en">{{ iconName }}</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'IconBase',
  props: {
    // viewBox: { type: String, default: '0 0 24 24'},
    iconName: { type: String, default: '' },
    width: { type: [Number, String], default: 18 },
    height: { type: [Number, String], default: 18 },
    iconColor: { type: String, default: 'currentColor' },
    top: { type: [Number, String], default: 0 },
    left: { type: [Number, String], default: 0 },
    bottom: { type: [Number, String], default: 24 },
    right: { type: [Number, String], default: 24 },
    src: { type: String, default: '' }
  },
  computed: {
    viewBoxValue() {
      return `${this.left} ${this.top} ${this.right} ${this.bottom}`;
    }
  },
  watch: {
    src() {
      console.log('src.changed::', this.src);
    }
  },
  async mounted() {

  }
};
</script>

<style scoped></style>
