<template>
  <v-ons-navigator swipeable
    :page-stack="pageStack"
    :session="session"
    @changeTitle="changeTitle"
    @push-page="pushPage($event)"
  ></v-ons-navigator>
</template>
<script>
  import Vue from 'vue';
  import Sessions from './sessions';
  export default{
    data() {
      return {
        session: null
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
