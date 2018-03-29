<template>
  <v-ons-navigator swipeable
    :page-stack="pageStack"
    :speaker="speaker"
    @changeTitle="changeTitle"
    @push-page="pushPage($event)"
  ></v-ons-navigator>
</template>
<script>
  import Vue from 'vue';
  import Speakers from './speakers';
  export default{
    data() {
      return {
        speaker: null
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
