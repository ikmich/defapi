<template>
  <div class="code-box">
    <div class="contents">
      <div class="title" :title="title">{{ title }}</div>
      <div class="body">
        <pre class='json'><code>{{ codeValue }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
export default {
  name: 'CodeBox',
  props: {
    code: String,
    title: String
  },
  data() {
    return {};
  },
  computed: {
    codeValue() {
      return this.code;
    }
  },
  mounted() {
    hljs.highlightAll();
  }
};
</script>

<style scoped>
.code-box {
  width: 100%;
  text-align: left;
  position: relative;
}

.code-box > .contents {
  position: relative;
  left: 0;
  top: 0;
}

.code-box .contents > .title {
  background-color: var(--codeBoxTitleColor);
  border-radius: 3px 3px 0 0;
  color: #191919;
  font-family: Rubik, sans-serif;
  font-size: 12px;
  font-weight: 500;
  padding: 3px;
  margin: 0;
}

.code-box .contents > .body {
  background-color: #fafafa;
  border-radius: 0 4px 4px 4px;
  margin: 0;
  text-align: left;
  max-height: 240px;
  overflow-y: scroll;
}

.code-box pre,
.code-box code {
  border-radius: 0 4px 4px 4px;
  margin: 0 !important;
  font-size: 12px;
}

.code-box pre {
  /*padding: 4px;*/
}
</style>
