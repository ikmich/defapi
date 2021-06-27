<template>
  <div id="container">
    <div>
      <div class="endpoints-grid">
        <EndpointCard
          class="grid-item"
          v-for="endpoint in endpoints"
          :key="getEndpointId(endpoint)"
          v-bind:endpoint="endpoint"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EndpointCard from './EndpointCard';

export default {
  name: 'EndpointList',
  components: {
    EndpointCard
  },
  data() {
    return {};
  },
  props: {
    endpoints: Array
  },
  methods: {
    getEndpointId(endpoint) {
      return `${endpoint.method}-${endpoint.path}`;
    }
  },
  watch: {
    endpoints: function () {
      // watch it
    }
  },

  mounted() {}
};
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.endpoints-grid {
  display: inline-grid;
  /*grid-template-columns: 1fr 1fr 1fr;*/
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  /*grid-template-columns: 20% 20% 20% 20%;*/
  /*grid-auto-rows: minmax(100px, auto);*/
  grid-auto-flow: row;
  grid-row-end: auto;
  grid-gap: 24px;
  margin: 0 48px 0 48px;
}
</style>
