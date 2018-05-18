<template>
  <v-ons-page>
    <v-ons-row>
      <v-ons-col width="50%" v-for="speaker in speakers">
        <v-ons-card @click="toSpeaker(speaker)">
          <div v-if="speaker.image">
            <img v-bind:src="speaker.image" v-bind:alt="speaker.name" style="width: 100%">
          </div>
          <div v-else>
            <img src="images/user.svg" v-bind:alt="speaker.name" style="width: 100%">
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
      const me = this;
      if (!this.ncmb) {
        return false;
      }
      me.setSpeakers(me.ncmb.getSpeakers());
      if (!this.online) return;
      this.ncmb.getLatestSpeakers()
        .then(speakers => {
          me.setSpeakers(speakers);
        });
    },
    methods: {
      setSpeakers(speakers) {
        const newSpeakers = [];
        for (let speaker of speakers) {
          speaker.original_image = speaker.image;
          speaker.image = null;
          newSpeakers.push(speaker);
        }
        Vue.set(this, 'speakers', newSpeakers);
        this.setImage(newSpeakers);
      },
      setImage(speakers) {
        for (let i = 0; i < speakers.length; i += 1) {
          const speaker = speakers[i];
          this.loadImage(i, speakers);
        }
      },
      loadImage(i, speakers) {
        const speaker = speakers[i];
        const image = new Image();
        const me = this;
        image.onload = () => {
          speaker.image = image.src;
          delete speaker.original_image;
          speakers[i] = speaker;
          Vue.set(me, 'speakers', speakers);
        }
        image.src = `https://tokyo-2018.devrel.net${speaker.original_image}`;
      },
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