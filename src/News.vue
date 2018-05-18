<template>
  <v-ons-page>
    
    <v-ons-list>
      <div v-for="article in news" @click="toArticle(article)">
        <v-ons-list-header>{{ dateFormat(article.published.iso, '%b %d, %Y') }}</v-ons-list-header>
        <v-ons-list-item tappable>
          <div class="center">
            <span class="list-item__title">{{ article.title }}</span>
            <span class="list-item__subtitle" style="padding-top: 5px">{{ truncate(strip_tags(article.content), 200) }}</span>
          </div>
        </v-ons-list-item>
      </div>
    </v-ons-list>
  </v-ons-page>
</template>
<script>
  import Vue from 'vue';
  import Article from './article';
  const strftime = require('strftime')
  export default{
    data() {
      return {
      };
    },
    props: [],
    created() {
      // Vue.set(me, 'items', items);
      const me = this;
      if (!this.ncmb) {
        return false;
      }
      
      me.setNews(me.ncmb.getNews());
      if (!this.online) return;
      this.ncmb.getLatestNews()
        .then(news => {
          me.setNews(news);
        });
    },
    methods: {
      dateFormat(date, format) {
        return strftime(format, new Date(date));
      },
      strip_tags(html) {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
      },
      
      truncate(text, length) {
        if (text.length > length) {
          return text.substring(0, length) + '...';
        }
        return text;
      },
      
      setNews(news) {
        Vue.set(this, 'news', news);
      },
      
      toArticle(e) {
        this.$emit('push-page', {
          extends: Article, 
          data() {
            return {
              article: e,
              online: this.online
            }
          }
        });
        this.$emit('changeTitle', {
          title: '',
          article: e,
          back: 'News'
        });
      }
    }
  };
</script>
