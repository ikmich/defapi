<template>
  <div class='title-box'>
    <div class='title'>{{ title }}</div>
    <span class='powered-by'>Powered by Defapi</span>
  </div>
</template>

<script>
export default {
  name: 'SiteTitle',
  props: {
    title: String
  }
};
</script>

<style scoped>
.title-box {
  line-height: 100%;
  margin: 12px;
  width: 220px;
}

.title-box .title {
  font-family: Nunito, sans-serif;
  font-weight: 700;
}

.title-box .powered-by {
  font-size: 11px;
  color: #909090;
}
</style>
