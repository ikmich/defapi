<template>
  <div class='code-box'>
    <div class='title'>{{ title }}</div>
    <div class='body'>
      <pre><code>{{ code }}</code></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeBox',
  props: {
    code: String,
    title: String
  },
  computed: {}
};
</script>

<style scoped>
.code-box {
  width: 100%;
  text-align: left;
}

.code-box > .title {
  background-color: #b3d2af;
  border-radius: 3px 3px 0 0;
  color: #191919;
  display: inline-block;
  font-family: Rubik, sans-serif;
  font-weight: 500;
  padding: 3px;
  margin: 0;
}

.code-box > .body {
  background-color: #fafafa;
  border-radius: 0 4px 4px 4px;
  margin: 0;
  text-align: left;
}

.code-box pre, .code-box code {
  border-radius: 0 4px 4px 4px;
  margin: 0 !important;
}

.code-box pre {
  /*padding: 4px;*/
}
</style>
