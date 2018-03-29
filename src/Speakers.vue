<template>
  <v-ons-page>
    <v-ons-row>
      <v-ons-col width="50%" v-for="speaker in speakers">
        <v-ons-card @click="toSpeaker(speaker)">
          <div v-if="online">
            <img v-bind:src="speaker.image" alt="Onsen UI" style="width: 100%">
          </div>
          <div v-else>
            <v-ons-icon icon="ion-person-stalker" size="150px"></v-ons-icon>
          </div>
          <div class="title">
            {{ speaker.name }}
          </div>
        </v-ons-card>
      </v-ons-col>
    </v-ons-row>
  </v-ons-page>
</template>
<script>
  import Vue from 'vue';
  import Speaker from './speaker';
  export default{
    data() {
      const speaker = {
        id: 1,
        name: 'Test Speaker',
        image : 'https://tokyo-2018.devrel.net/img/speakers/onishi.jpg'
      };
      
      return {
        offline: !window.navigator.onLine,
        speakers: [speaker, speaker, speaker],
        speaker: null
      };
    },
    props: ['ncmb'],
    created() {
      // Vue.set(me, 'items', items);
    },
    methods: {
      toSpeaker(e) {
        this.$emit('push-page', {
          page: Speaker, 
          options: {
            speaker: e
          }
        });
        this.$emit('changeTitle', {
          title: '',
          back: 'Speakers'
        })
      }
    }
  };
</script>
