<template>
  <v-ons-page>
    <v-ons-card>
      <div class="left" v-bind:style="categoryStyle">
        {{ session.category }}
      </div>
      <div class="title">{{ session.title }}</div>
      <p class="right"> by 
        <v-ons-button modifier="quiet" @click="toSpeaker(session.speaker)">{{ session.speaker.name }}</v-ons-button>
      </p>
      <p>
        <v-ons-list-item modifier="longdivider">{{ session.time }}, {{ roomLabel }}</v-ons-list-item>
      </p>
      <p>
        {{ session.description }}
      </p>
    </v-ons-card>
  </v-ons-page>
</template>
<script>
  import Vue from 'vue';
  import Speaker from './Speaker';
  export default{
    data() {
      return {
        view: 'detail',
        type: 'session'
      };
    },
    created() {
      // Vue.set(me, 'items', items);
      console.log('this.session', this.session)
    },
    methods: {
      toSpeaker(e) {
        const me = this;
        e.session = me.session;
        this.$emit('push-page', {
          extends: Speaker, 
          data() {
            return {
              speaker: e,
              online: me.online
            }
          }
        });
        this.$emit('changeTitle', {
          title: '',
          back: 'Session'
        })
      }
    },
    computed: {
      roomLabel() {
        return this.session.room === 'Both' ? 'Fuji' : this.session.room;
      },
      categoryStyle() {
        return `color: ${this.session.color}`;
      }
    }
  };
</script>
<style>
  .right {
    width: 100%;
    text-align: right;
  }
</style>