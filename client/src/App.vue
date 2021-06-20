<template>
  <div id='app'>
    <div class='container'>
      <div class='header'>
        <div class='left'>
          <TitleBox v-bind:title='repo.title' />
        </div>
        <div class='middle'>
          <div class='search-box'>
            <div class='search-box-contents'>
              <input id='input-search' class='search' type='text' @keyup='handleSearch' placeholder='Search...' />
              <div class='clear' @click='clearSearch()'>x</div>
            </div>
          </div>
        </div>
        <div class='right'></div>
      </div>
      <div class='sub-header'>

      </div>
      <div class='endpoint-list-wrapper'>
        <EndpointList v-bind:endpoints='_endpoints' />
      </div>
    </div>
  </div>
</template>

<script>
import TitleBox from '@/components/TitleBox.vue';
import EndpointList from '@/components/endpoints/EndpointList';

export default {
  name: 'App',
  components: {
    TitleBox, EndpointList
  },
  data() {
    return {
      repo: {},
      search: ''
    };
  },
  computed: {
    isDevEnvironment() {
      return process.env.NODE_ENV === 'development';
    },
    _endpoints() {
      if (!this.search || !this.search.trim().length) {
        return this.repo.endpoints;
      }
      let results = [];
      if (Array.isArray(this.repo.endpoints)) {
        for (let endpoint of this.repo.endpoints) {
          switch (true) {
            case endpoint.title?.toLowerCase().includes(this.search?.toLowerCase()):
            case endpoint.path?.toLowerCase().includes(this.search?.toLowerCase()):
            case endpoint.description?.toLowerCase().includes(this.search?.toLowerCase()):
              results.push(endpoint);
              break;
          }
        }
      }

      return results;
    }
  },
  methods: {
    handleSearch(e) {
      this.search = e.target.value;
    },
    clearSearch() {
      const el = document.getElementById('input-search');
      if (el) {
        el.value = '';
        this.search = '';
      }
    },
    async fetchRepo() {
      if (this.isDevEnvironment) {
        console.log('> Development Environment - fetching sample data');
        return require('../sample-data.json');
      }
      let raw = await fetch('/repository.json');
      let json = JSON.parse(await raw.text());
      if (this.isDevEnvironment) {
        console.log(json);
      }
      return json;
    }
  },
  mounted() {
    this.fetchRepo().then((results) => {
      this.repo = results;
      if (this.isDevEnvironment) {
        console.log('fetched repo');
      }
      // Set site title
      document.querySelector('head title').innerHTML = this.repo.title;
    }).catch(e => {
      console.error('Error fetching data repository');
      console.error(e);
    });
  }
};
</script>

<style>
@import url('./app.css');
</style>
