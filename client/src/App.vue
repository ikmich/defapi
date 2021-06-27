<!--suppress HttpUrlsUsage -->
<template>
  <div id="app">
    <div class="container">
      <div class="header" id="header">
        <div class="left">
          <SiteTitle v-bind:title="repo.title" />
        </div>
        <div class="middle">
          <!-- Search -->
          <div class="search-wrapper">
            <div class="search-box">
              <div class="search-box-contents">
                <input id="input-search" class="search" type="text" @keyup="handleSearch" placeholder="Search..." />
                <div class="clear" @click="clearSearch()">x</div>
              </div>
            </div>

            <div class="search-behaviour">
              <div class="search-behaviour-input">
                <input
                  id="checkbox-search-behaviour"
                  type="checkbox"
                  @change="handleSearchBehaviourChange"
                  :checked="searchBehaviourToggleOn"
                />
                <label for="checkbox-search-behaviour">Search title and description</label>
              </div>
            </div>
          </div>
        </div>

        <div class="right">
          <div
            id="download-json--wrapper"
            class="download-json--wrapper"
            @click="downloadJson()"
            title="Download full API json manifest"
          >
            <div class="download-json--text text">Download JSON</div>
            <IconBase icon-color="#707070" class="icon icon-download">
              <!--578ed6-->
              <IconTrayArrowDown />
            </IconBase>
          </div>
        </div>
      </div>

      <div id="post-header">
        <div id="sub-header">
          <div class="highlights">
            <div class="item highlight-item">
              <div class="title">
                <div>Base URI</div>
              </div>
              <div class="value">
                {{ baseUri }}
              </div>
            </div>

            <div class="separator"></div>

            <!-- Total Endpoints -->
            <div class="item highlight-item">
              <div class="title">
                <div>Total Endpoints</div>
              </div>
              <div class="value">
                {{ totalEndpoints }}
              </div>
            </div>

            <div class="separator" v-if="hasDefaultHeaders"></div>

            <div class="item" v-if="hasDefaultHeaders">
              <CodeBox title="Headers" v-bind:code="JSON.stringify(repo.defaultHeaders, null, 2)" />
            </div>
          </div>
        </div>
        <div class="endpoint-list-wrapper">
          <div class="search-results-info">{{ numSearchResults }}</div>
          <EndpointList v-bind:endpoints="endpointsToDisplay" />
        </div>

        <div id="footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SiteTitle from '@/components/SiteTitle';
import EndpointList from '@/components/endpoints/EndpointList';
import CodeBox from '@/components/CodeBox';
import { sendEvent } from '@/send-event';
import IconBase from '@/components/icons/IconBase';
import IconTrayArrowDown from '@/components/icons/IconTrayArrowDown';

export default {
  name: 'App',
  components: {
    IconTrayArrowDown,
    IconBase,
    SiteTitle,
    EndpointList,
    CodeBox
  },
  data() {
    return {
      /** @type {ApiManifest} */
      repo: {},
      search: '',
      searchBehaviourToggleOn: false
    };
  },
  computed: {
    isDevEnvironment() {
      return process.env.NODE_ENV === 'development';
    },
    /** @type {EndpointDef[]} */
    endpointsToDisplay() {
      const searchInput = (this.search ?? '').trim();
      if (!searchInput || !searchInput.length) {
        return this.repo.endpoints;
      }

      /** @type {EndpointDef[]} */
      let results = [];
      if (Array.isArray(this.repo.endpoints)) {
        for (let endpoint of this.repo.endpoints) {
          let inPath = endpoint.path?.toLowerCase().includes(this.search?.toLowerCase());
          let inTitle = false;
          let inDescription = false;
          if (this.searchBehaviourToggleOn) {
            inTitle = endpoint.title?.toLowerCase().includes(this.search?.toLowerCase());
            inDescription = endpoint.description?.toLowerCase().includes(this.search?.toLowerCase());
          }

          if (inPath || inTitle || inDescription) {
            results.push(endpoint);
          }
        }
      }

      return results;
    },
    numSearchResults() {
      let value = this.endpointsToDisplay?.length ?? 0;
      let word = value > 1 || value === 0 ? 'Results' : 'Result';
      return `${value} ${word}`;
    },
    totalEndpoints() {
      return this.repo.endpoints?.length ?? 0;
    },
    baseUri() {
      let value = this.repo.endpoints?.baseUri;
      if (value && value.trim().length) {
        let rexStartsWithHttp = /^(http)|(https):\/\//;
        if (!rexStartsWithHttp.test(value)) {
          value = `http://${value}`;
        }
      } else {
        value = 'http://0.0.0.0';
      }
      return value;
    },

    hasDefaultHeaders() {
      return this.repo.defaultHeaders && Object.keys(this.repo.defaultHeaders).length > 0;
    }
  },
  methods: {
    handleSearch(e) {
      this.search = e.target.value;
    },

    handleSearchBehaviourChange(e) {
      this.searchBehaviourToggleOn = e.target.checked;
    },

    clearSearch() {
      const el = document.getElementById('input-search');
      if (el) {
        el.value = '';
        el.focus();
        this.search = '';
      }
    },

    async fetchRepo() {
      if (this.isDevEnvironment) {
        console.log('> Development Environment - fetching sample data');
        return require('../sample-data.json');
      }
      let raw = await fetch('/repository.json');
      return JSON.parse(await raw.text());
    },

    handleHeaderOffset() {
      const headerElem = document.getElementById('header');
      const headerHeight = headerElem.offsetHeight;
      const postHeaderElem = document.getElementById('post-header');
      postHeaderElem.style.position = 'relative';
      postHeaderElem.style.top = `${headerHeight + 24}px`;
    },

    /**
     * Handles hover visual behaviour for the main download button/link.
     */
    handleDownloadHover() {
      /** @type {HTMLElement} */
      const parent = document.getElementById('download-json--wrapper');

      /** @type {HTMLElement} */
      const elText = parent.querySelector('.text');

      /** @type {HTMLElement} */
      const elIcon = parent.querySelector('.icon');

      parent.onmouseover = function () {
        elText.style.color = 'var(--pathBlue)';
        elIcon.classList.add('bordered');
      };

      parent.onmouseout = function () {
        elText.style.color = 'inherit';
        elIcon.classList.remove('bordered');
      };
    },

    downloadJson() {
      let json = JSON.stringify(this.repo, null, 2);
      let linkElem = document.createElement('a');
      linkElem.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(json));

      let filename = `${this.repo.title.toLowerCase().replace(/\s+/g, '-')}.json`;
      linkElem.setAttribute('download', filename);
      linkElem.style.display = 'none';

      document.body.appendChild(linkElem);
      linkElem.click();

      document.body.removeChild(linkElem);
    }
  },

  mounted() {
    sendEvent('app-mounted');

    this.fetchRepo()
      .then((results) => {
        this.repo = results;
        if (this.isDevEnvironment) {
          console.log('fetched repo::', results);
        }
        // Set site title
        document.querySelector('head title').innerHTML = this.repo.title;
      })
      .catch((e) => {
        console.error('[defapi.ERR] Error fetching data repository::', e);
      });

    this.handleHeaderOffset();
    this.handleDownloadHover();
  }
};
</script>

<style>
@import url('./app.css');
</style>
