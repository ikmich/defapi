<template>
  <div class='endpoints-wrapper'>
    <EndpointCard v-for='endpoint in endpoints' :key='getEndpointId(endpoint)' v-bind:endpoint='endpoint' />
  </div>
</template>

<script>
import EndpointCard from './EndpointCard';

export default {
  name: 'EndpointList',
  components: {
    EndpointCard
  },
  props: {
    endpoints: Array
  },
  methods: {
    getEndpointId(endpoint) {
      return `${endpoint.method}-${endpoint.path}`;
    }
  }
};
</script>

<style scoped>
.endpoints-wrapper {
  /*display: flex;*/
  /*flex-direction: row;*/
  /*flex-wrap: wrap;*/
  /*flex-grow: 1;*/
  /*justify-content: stretch;*/

  display: inline-grid;
  /*grid-template-columns: 1fr 1fr 1fr;*/
  grid-template-columns: repeat(3, 1fr);
  /*grid-template-columns: 20% 20% 20% 20%;*/
  /*grid-auto-rows: minmax(100px, auto);*/
  grid-auto-flow: row;
  grid-row-end: auto;
  grid-gap: 24px;
  margin: 0 48px 0 48px;
}

</style>
