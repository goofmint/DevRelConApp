<template>
  <v-ons-page>
    <v-ons-list>
      <v-ons-list-item v-for="session in sessions" @click="toSession(session)">
        <v-ons-row v-bind:style="height(session)">
          <v-ons-col
            v-bind:style="style(session)"
            width="75px">
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
        online: window.navigator.online,
        segmentIndex: 0,
        sessions: [
          {
            time: '8:00 AM',
            speaker: null,
            title: 'Registration and light breakfast',
            color: 'grey',
            room: 'both'
          },
          {
            time: '8:55 AM',
            speaker: {
              name: 'Atsushi Nakatsugawa',
              company: 'MOONGIFT',
              objectId: 'bbb'
            },
            title: 'Welcome to DevRelCon Tokyo 2017!',
            color: 'red',
            room: 'both'
          },
          {
            time: '9:10 AM',
            speaker: {
              name: 'John Britton',
              company: 'GitHub',
              objectId: 'ccc'
            },
            title: 'Keynote: Marketing to Developers',
            description: 'this is test content. this is test content. this is test content. this is test content. this is test content. this is test content. this is test content. ',
            color: 'blue',
            room: 'both'
          }
        ]
      };
    },
    props: ['ncmb', 'session'],
    created() {
      // Vue.set(me, 'items', items);
    },
    methods: {
      // Change track
      changeTrack(e) {
        console.log(e)
        //
      },
      
      toSession(e) {
        this.$emit('push-page', {
          page: Session, 
          options: {
            session: e
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
        return `border-right: 2px ${session.color} solid;margin-right:10px`;
      }
    },
    computed: {
    }
  };
</script>
