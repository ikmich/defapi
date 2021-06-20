<template>
  <div class='card'>
    <div class='card-contents'>
      <div class='card-header'>
        <div class='title--path-box'>
          <div class='path'>
            <span v-bind:class='getHttpMethodCssClass(endpoint.method)'>{{ endpoint.method }}</span> <span>{{ endpoint.path
            }}</span>
          </div>
          <div class='title'>
            {{ endpoint.title }}
          </div>
        </div>
      </div>

      <div class='card-body'>
        <div class='description--box' v-if='hasDescription'>
          {{ endpoint.description }}
        </div>
        <div class='query-params--box code-box' v-if='hasQueryParams'>
          <CodeBox title='Query Params' v-bind:code='JSON.stringify(endpoint.queryParams, null, 2)' />
        </div>
        <div class='body-params--box code-box' v-if='hasBodyParams'>
          <CodeBox title='Body Params' v-bind:code='JSON.stringify(endpoint.bodyParams, null, 2)' />
        </div>
        <div class='headers--box code-box' v-if='hasHeaders'>
          <CodeBox title='Headers' v-bind:code='JSON.stringify(endpoint.headers, null, 2)' />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import CodeBox from '@/components/CodeBox';

export default {
  name: 'EndpointCard',
  components: {
    CodeBox
  },
  props: {
    endpoint: Object
  },
  methods: {
    getHttpMethodCssClass(method) {
      return `http-method ${method.toLowerCase()}`;
    }
  },
  computed: {
    hasDescription() {
      return !!this.endpoint.description && this.endpoint.description.length > 0;
    },
    hasQueryParams() {
      let qp = this.endpoint.queryParams;
      return qp && Object.keys(qp).length > 0;
    },
    hasBodyParams() {
      let bp = this.endpoint.bodyParams;
      return bp && Object.keys(bp).length > 0;
    },
    hasHeaders() {
      let h = this.endpoint.headers;
      return h && Object.keys(h).length > 0;
    }
  }
};
</script>

<style scoped>
@import "endpoint-card.css";
</style>
