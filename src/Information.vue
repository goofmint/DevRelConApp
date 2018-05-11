<template>
  <v-ons-page>
    <v-ons-card>
      <img src="images/logo.big.png" alt="DevRelCon Tokyo 2018" style="width: 100%" />
      <div class="title">
        DevRelCon Tokyo 2018
      </div>
      <p>
        a one day conference about developer relations, developer experience and developer marketing. July 15th, 2018, Tokyo.
      </p>
    </v-ons-card>
    <p style="text-align: center">
      <v-ons-button @click="getToken" modifier="cta" style="margin: 10px 0" v-show="!notification">Get push notification</v-ons-button>
    </p>
    <p style="margin: 0 10px">
      We never send spam message. You can stop push notification anytime.
    </p>
    <v-ons-card>
      <div class="title">
        Sponsors
        <v-ons-row class="sponsor">
          <v-ons-col v-for="sponsor in sponsors" :index="index">
            <v-ons-card>
              <div :style="style(sponsor)">
                <a :href="sponsor.url" target="_system">
                  <img :src="sponsor.picture" width="100%" />
                </a>
              </div>
            </v-ons-card>
          </v-ons-col>
        </v-ons-row>
      </div>
    </v-ons-card>
  </v-ons-page>
</template>
<script>
  import Vue from 'vue';
  // import Session from './session';
  export default{
    data() {
      return {
        index: 0,
        notification: false
      }
    },
    props: [],
    created() {
      const me = this;
      if (!this.ncmb) {
        return false;
      }
      me.setSponsors(me.ncmb.getSponsors());
      if (!this.online) return;
      this.ncmb.getLatestSponsors()
        .then(sponsors => {
          me.setSponsors(sponsors);
        });
    },
    methods: {
      setSponsors(sponsors) {
        Vue.set(this, 'sponsors', sponsors);
      },
      style(sponsor) {
        return `height: ${sponsor.size}px; width: ${sponsor.size}px; text-align: center`;
      },
      getToken() {
        this.ncmb
          .getToken()
          .then(() => {
            // Change status
          }, err => {
            alert(err);
          })
      }
    },
    computed: {
    }
  };
</script>
<style>
  .title {
    text-align: center;
  }
  .sponsor .card {
    box-shadow: none;
    text-align: center;
    vertical-align: middle;
    max-width: 100%;
    margin: 5 auto;
  }
</style>