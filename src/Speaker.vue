<template>
  <v-ons-page>
    <v-ons-card>
      <div v-if="online">
        <img v-bind:src="speaker.image" alt="Onsen UI" style="width: 100%">
      </div>
      <div style="text-align:center" v-else>
        <v-ons-icon icon="ion-person-stalker" size="300px"></v-ons-icon>
      </div>
      <div class="title">
        {{ speaker.name }}
      </div>
      <div class="content">
        <div>
          <v-ons-icon size="40px" icon="ion-social-twitter" style="width:40px;text-align:center"></v-ons-icon>
          <v-ons-icon size="40px" icon="ion-social-facebook" style="width:40px;text-align:center"></v-ons-icon>
          <v-ons-icon size="40px" icon="ion-social-linkedin" style="width:40px;text-align:center"></v-ons-icon>
          <v-ons-icon size="40px" icon="ion-social-github" style="width:40px;text-align:center"></v-ons-icon>
        </div>
        <p>
          This is demonstration text. This is demonstration text. This is demonstration text. This is demonstration text. This is demonstration text. This is demonstration text. This is demonstration text. This is demonstration text. This is demonstration text. This is demonstration text. This is demonstration text. This is demonstration text. This is demonstration text. This is demonstration text. This is demonstration text. This is demonstration text. This is demonstration text. 
        </p>
      </div>
    </v-ons-card>
  </v-ons-page>
</template>
<script>
  import Vue from 'vue';
  export default{
    data() {
      return {
        view: 'detail',
        type: 'speaker'
      };
    },
    props: [],
    created() {
      // Vue.set(me, 'items', items);
    },
    methods: {
    }
  };
</script>
