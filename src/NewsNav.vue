<template>
  <v-ons-navigator swipeable
    :page-stack="pageStack"
    :article="article"
    @changeTitle="changeTitle"
    @push-page="pushPage($event)"
  ></v-ons-navigator>
</template>
<script>
  import Vue from 'vue';
  import News from './news';
  export default{
    data() {
      return {
        article: null
      };
    },
    props: ['ncmb', 'pageStack'],
    created() {
      // Vue.set(me, 'items', items);
    },
    methods: {
      pushPage(e) {
        this.$emit('push-page', e);
      },
      changeTitle(options) {
        this.$emit('changeTitle', options);
      }
    }
  };
</script>
