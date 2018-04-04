<template>
  <v-ons-navigator swipeable
    :page-stack="pageStack"
    @changeTitle="changeTitle"
    @push-page="pageStack.push($event)"
  ></v-ons-navigator>
</template>
<script>
  import Vue from 'vue';
  export default{
    data() {
      return {
        pageStack: [this.list]
      };
    },
    props: [
      'list',
      'online',
      'news', 'article',
      'allSessions', 'session',
      'speakers', 'speaker'
    ],
    created(e) {
    },
    methods: {
      changeTitle(options) {
        this.$emit('changeTitle', options);
      }
    }
  };
</script>
