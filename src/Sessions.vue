<template>
  <v-ons-page>
    <p style="text-align: center">
      <v-ons-segment :index.sync="segmentIndex" style="width: 300px" @postchange="changeTrack()">
        <button>Fuji</button>
        <button>Sakura</button>
        <button>Favorite</button>
      </v-ons-segment>
    </p>
    <v-ons-list>
      <v-ons-list-item v-for="session in sessions" @click="toSession(session)" v-bind:style="style(session)">
        <v-ons-row v-bind:style="height(session)">
          <v-ons-col
            width="60px">
            {{ session.time }}</v-ons-col>
          <v-ons-col>
            <strong class="title">{{ session.title }}</strong>
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
      if (!this.ncmb) {
        return false;
      }
      me.setSessions(me.ncmb.getSessions());
      if (!this.online) return;
      this.ncmb.getLatestSessions()
        .then(sessions => {
          me.setSessions(sessions);
        });
    },
    methods: {
      setSessions(sessions) {
        Vue.set(this, 'allSessions', sessions);
        this.changeTrack();
      },
      // Change track
      changeTrack(e) {
        if (this.segmentIndex === 2) {
          Vue.set(this, 'sessions', this.ncmb.favorites);
        } else {
          const room = this.segmentIndex === 0 ? 'Fuji' : 'Sakura';
          Vue.set(this, 'sessions', this.allSessions.filter(session => [room, 'Both'].indexOf(session.room) > -1));
        }
      },
      
      toSession(e) {
        if (!e.speaker) return false;
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
      },
      
      height(session) {
        return `height: ${session.speaker ? 5.5 : 3}em`;
      },
      style(session) {
        return `border-left: 2px ${session.color} solid;`;
      }
    },
    computed: {
    }
  };
</script>
