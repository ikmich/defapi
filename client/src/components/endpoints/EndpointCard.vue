<template>
  <div class="card">
    <div class="card-menubar">
      <div class="item copy-path" @click="copyToClipboard">
        <div class="text">Copy Path</div>
        <div id="feedback--copy-path" class="feedback">
          <IconBase>
            <IconCheckboxMarkedCircle />
          </IconBase>
        </div>
      </div>

      <div class="item copy-json" @click="copyToClipboard">
        <div class="text">Copy JSON</div>
        <div id="feedback--copy-json" class="feedback">
          <IconBase>
            <IconCheckboxMarkedCircle />
          </IconBase>
        </div>
      </div>

      <div class="item download-json" @click="downloadJson">
        <div class="text">Download JSON</div>
        <div id="feedback--download-json" class="feedback">
          <IconBase>
            <IconCheckboxMarkedCircle />
          </IconBase>
        </div>
      </div>
    </div>
    <div class="card-contents">
      <div class="card-header">
        <div class="title--path-box">
          <div class="method--path" title='Endpoint path'>
            <span v-bind:class="getHttpMethodCssClass(endpoint.method)">{{ endpoint.method }}</span>
            &nbsp;
            <span class="path--text">{{ endpoint.path }}</span>
          </div>
          <div class="title" title='Endpoint title'>
            {{ endpoint.title }}
          </div>
        </div>
      </div>

      <div class="card-body">
        <div class="description--box" v-if="hasDescription" title='Endpoint description'>
          {{ endpoint.description }}
        </div>
        <div class="headers--box code-box" v-if="hasHeaders">
          <CodeBox title="Headers" v-bind:code="JSON.stringify(endpoint.headers, null, 2)" />
        </div>
        <div class="query-params--box code-box" v-if="hasQueryParams">
          <CodeBox title="Query Params" v-bind:code="JSON.stringify(endpoint.queryParams, null, 2)" />
        </div>
        <div class="body-params--box code-box" v-if="hasBodyParams">
          <CodeBox title="Body Params" v-bind:code="JSON.stringify(endpoint.bodyParams, null, 2)" />
        </div>
        <div class="response--box code-box" v-if="hasHeaders">
          <CodeBox title="Response" v-bind:code="JSON.stringify(endpoint.response, null, 2)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeBox from '@/components/CodeBox';
import IconCheckboxMarkedCircle from '@/components/icons/IconCheckboxMarkedCircle';
import IconBase from '@/components/icons/IconBase';

export default {
  name: 'EndpointCard',
  components: {
    IconBase,
    IconCheckboxMarkedCircle,
    CodeBox
  },
  props: {
    /** @type {EndpointDef} */
    endpoint: Object
  },
  methods: {
    getHttpMethodCssClass(method) {
      return `http-method ${method.toLowerCase()}`;
    },

    /**
     * @type {HTMLElement}
     * @param targetElement
     */
    showFeedback(targetElement) {
      if (targetElement) {
        /** @type {HTMLElement} */
        const feedbackElement = targetElement.querySelector('.feedback');
        if (feedbackElement) {
          feedbackElement.style.opacity = '1';

          setTimeout(() => {
            feedbackElement.style.opacity = '0';
          }, 900);
        }
      }
    },

    copyToClipboard(e) {
      /** @type {HTMLElement} */
      let target = e.target;
      if (target.classList.contains('text')) {
        target = target.parentElement;
      }

      let what = '';
      if (target.classList.contains('copy-path')) {
        what = 'path';
      } else if (target.classList.contains('copy-json')) {
        what = 'json';
      }

      if (!what || !what.length) {
        return;
      }

      let elem = document.createElement('textarea');
      elem.setAttribute('type', 'text');
      document.body.appendChild(elem);
      elem.style.position = 'absolute';
      elem.style.left = '-10000px';

      switch (what) {
        case 'path':
          elem.value = `${this.endpoint.method} ${this.endpoint.path}`;
          break;
        case 'json':
          elem.value = JSON.stringify(this.endpoint, null, 2);
          break;
        default:
          return;
      }

      elem.select();
      elem.setSelectionRange(0, 99999); /* For mobile devices */

      document.execCommand('copy');
      document.body.removeChild(elem);

      setTimeout(() => {
        this.showFeedback(target);
      }, 200);
    },

    downloadJson(e) {
      /** @type {HTMLElement} */
      let target = e.target;
      if (target.classList.contains('text')) {
        target = target.parentElement;
      }

      let json = JSON.stringify(this.endpoint, null, 2);
      let linkElem = document.createElement('a');
      linkElem.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(json));

      let filename = `${this.getEndpointTag(this.endpoint)}.json`;
      linkElem.setAttribute('download', filename);
      linkElem.style.display = 'none';

      document.body.appendChild(linkElem);
      linkElem.click();

      document.body.removeChild(linkElem);

      setTimeout(() => {
        this.showFeedback(target);
      }, 400);
    },

    getEndpointTag(endpoint) {
      let path = endpoint.path.replace(/\//g, '-');
      let method = endpoint.method.toLowerCase();
      return `${method}-${path}`;
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
@import 'endpoint-card.css';
</style>
