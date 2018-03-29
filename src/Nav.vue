<template id="nav">
</template>

<script>
  import Vue from 'vue';
  import App from './App';
  export default{
    data() {
      return {
        pageStack: [App]
      };
    },
    props: ['ncmb'],
    created() {
      // Vue.set(me, 'items', items);
    },
    methods: {
      pushPage(e) {
        console.log(e)
        this.pageStack.push(e);
      }
    },
    computed: {
    }
  };
</script>
