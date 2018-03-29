<template>
  <v-ons-page>
    <p>{{ session.title }}</p>
    
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
<style>
  
</style>