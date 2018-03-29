<template>
  <v-ons-page>
    <p>{{ article.title }}</p>
    <p></p>
  </v-ons-page>
</template>
<script>
  import Vue from 'vue';
  export default{
    data() {
      return {
      };
    },
    props: ['ncmb'],
    created() {
      // Vue.set(me, 'items', items);
    },
    methods: {
    }
  };
</script>
