<template>
  <v-ons-page>
    <v-ons-card>
      <div>
        <img v-bind:src="speaker.image" v-bind:alt="speaker.name" style="width: 100%">
      </div>
      <div class="title">
        {{ speaker.name }}
        at {{ speaker.company }}
      </div>
      <div style="size:1em;text-align: center;padding-bottom:0.5em;" v-if="speaker.title">
        {{ speaker.title }}
      </div>
      <div class="content">
        <div class="social">
          <a v-bind:href="`https://github.com/${speaker.github}`" target="_blank" v-if="speaker.github">
            <v-ons-icon size="40px" icon="ion-social-github" style="width:40px;text-align:center">
            </v-ons-icon>
          </a>
          <a v-bind:href="`https://twitter.com/${speaker.twitter}`" target="_blank" v-if="speaker.twitter">
            <v-ons-icon size="40px" icon="ion-social-twitter" style="width:40px;text-align:center">
            </v-ons-icon>
          </a>
          <a v-bind:href="`https://facebook.com/${speaker.facebook}`" target="_blank" v-if="speaker.facebook">
            <v-ons-icon size="40px" icon="ion-social-facebook" style="width:40px;text-align:center">
            </v-ons-icon>
          </a>
          <a v-bind:href="`https://www.linkedin.com/in/${speaker.linkedin}`" target="_blank" v-if="speaker.linkedin">
            <v-ons-icon size="40px" icon="ion-social-linkedin" style="width:40px;text-align:center">
            </v-ons-icon>
          </a>
          <a v-bind:href="`https://plus.google.com/${speaker.google}`" target="_blank" v-if="speaker.google">
            <v-ons-icon size="40px" icon="ion-social-google" style="width:40px;text-align:center">
            </v-ons-icon>
          </a>
          <a v-bind:href="`https://www.youtube.com/user/${speaker.youtube}`" target="_blank" v-if="speaker.youtube">
            <v-ons-icon size="40px" icon="ion-social-youtube" style="width:40px;text-align:center">
            </v-ons-icon>
          </a>
          <a v-bind:href="speaker.blog" target="_blank" v-if="speaker.blog">
            <v-ons-icon size="40px" icon="ion-social-rss" style="width:40px;text-align:center">
            </v-ons-icon>
          </a>
        </div>
        <p class="profile" v-html="toMarkdown(speaker.profile)">
        </p>
      </div>
      <div class="sessionInfo" v-show="speaker.session">
        <div class="title">Talk</div>
        <div class="content">
          <strong @click="toSession(speaker.session)">{{ speaker.session.title }}</strong>
        </div>
      </div>
    </v-ons-card>
  </v-ons-page>
</template>
<script>
  import Vue from 'vue';
  const showdown  = require('showdown');
  const converter = new showdown.Converter();
  import Session from './session';
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
      toMarkdown(text) {
        return converter.makeHtml(text).replace(/<a /g, '<a target="_blank" ');
      },
      toSession(e) {
        e.speaker = this.speaker;
        this.$emit('push-page', {
          extends: Session, 
          data() {
            return {
              session: e,
              online: this.online
            }
          }
        });
        this.$emit('changeTitle', {
          title: '',
          session: e,
          back: 'Sessions'
        })
      }
    }
  };
</script>
<style>
  .social a, .social a:visited {
    color: black;
  }
  .profile a, .profile a:visited {
    color: red;
  }
</style>