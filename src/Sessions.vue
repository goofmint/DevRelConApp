<template>
  <v-ons-page>
    <p style="text-align: center">
      <v-ons-segment :index.sync="segmentIndex" style="width: 220px" @postchange="changeTrack()">
        <button>Fuji</button>
        <button>Sakura</button>
      </v-ons-segment>
    </p>
    <v-ons-list>
      <v-ons-list-item v-for="session in sessions" @click="toSession(session)" v-bind:style="style(session)">
        <v-ons-row v-bind:style="height(session)">
          <v-ons-col
            width="60px">
            {{ session.time }}</v-ons-col>
          <v-ons-col>
            <strong>{{ session.title }}</strong>
            <p v-if="session.speaker">{{ session.speaker.name }}</p>
          </v-ons-col>
        </v-ons-row>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>
<script>
  import Vue from 'vue';
  import Session from './session';
  export default{
    data() {
      return {
        segmentIndex: 0,
        sessions: [],
      };
    },
    props: [],
    created() {
      const me = this;
      if (!this.allSessions) return;
      this.changeTrack();
    },
    methods: {
      // Change track
      changeTrack(e) {
        const room = this.segmentIndex === 0 ? 'Fuji' : 'Sakura';
        Vue.set(this, 'sessions', this.allSessions.filter(session => [room, 'Both'].indexOf(session.room) > -1));
      },
      
      toSession(e) {
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
          back: 'Sessions'
        })
      },
      
      height(session) {
        return `height: ${session.speaker ? 4 : 3}em`;
      },
      style(session) {
        return `border-left: 2px ${session.color} solid;`;
      }
    },
    computed: {
    }
  };
</script>
