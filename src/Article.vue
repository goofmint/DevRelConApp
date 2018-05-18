<template>
  <v-ons-page>
    <v-ons-card>
      <div class="title">{{ article.title }}</div>
      <div class="content" v-html="changeImagePath(article.content)">
      </div>
    </v-ons-card>
  </v-ons-page>
</template>
<script>
  import Vue from 'vue';
  export default{
    data() {
      return {
      };
    },
    props: [],
    created() {
      // Vue.set(me, 'items', items);
    },
    methods: {
      changeImagePath(text) {
        text = text.replace(/<img src="/g, '<img width="100%" src="https://tokyo-2018.devrel.net');
        console.log(text);
        return text;
      }
    }
  };
</script>
