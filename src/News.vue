<template>
  <v-ons-page>
    
    <v-ons-list>
      <div v-for="article in articles" @click="toArticle(article)">
        <v-ons-list-header>{{ article.time }}</v-ons-list-header>
        <v-ons-list-item tappable>
          <div class="left" v-if="online">
            <img class="list-item__thumbnail" style="width:60px;height:60px" v-bind:src="article.catch">
          </div>
          <div v-else style="padding-right: 5px;">
            <v-ons-icon icon="ion-person-stalker" size="60px"></v-ons-icon>
          </div>
          <div class="center">
            <span class="list-item__title">{{ article.title }}</span>
            <span class="list-item__subtitle">{{ article.description }}</span>
          </div>
        </v-ons-list-item>
      </div>
    </v-ons-list>
  </v-ons-page>
</template>
<script>
  import Vue from 'vue';
  import Article from './article';
  export default{
    data() {
      const article = {
        id: 1,
        title: 'We will start long juarny',
        description: 'On the Internet On the Internet On the Internet On the Internet On the Internet...',
        catch: 'http://placekitten.com/g/120/120',
        time: '1 day ago'
      };

      return {
        segmentIndex: 0,
        online: window.navigator.onLine,
        articles: [article, article, article],
        view: 'list',
        type: 'news'
      };
    },
    props: ['ncmb'],
    created() {
      // Vue.set(me, 'items', items);
    },
    methods: {
      toArticle(e) {
        this.$emit('push-page', {
          page: Article,
          options: {
            article: e
          }
        });
        this.$emit('changeTitle', {
          title: '',
          back: 'News'
        })
      }
    }
  };
</script>
