<template>
  <v-ons-page>
    <v-ons-row>
      <v-ons-col width="50%" v-for="speaker in speakers">
        <v-ons-card @click="toSpeaker(speaker)">
          <div v-if="online">
            <img v-bind:src="speaker.picture" alt="Onsen UI" style="width: 100%">
          </div>
          <div v-else>
            <v-ons-icon icon="ion-person-stalker" size="150px"></v-ons-icon>
          </div>
          <div class="title name">
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
      return {
        speakers: []
      };
    },
    created() {
      // Vue.set(me, 'items', items);
    },
    methods: {
      toSpeaker(e) {
        this.$emit('push-page', {
          extends: Speaker, 
          data() {
            return {
              speaker: e,
              online: this.online
            }
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

<style>
.name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;    
}
</style>