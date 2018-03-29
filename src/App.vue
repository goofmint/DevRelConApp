<template id="app">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left" v-if="back !== ''">
        <v-ons-button modifier="quiet" @click="popPage($event)">
          <v-ons-icon size="25px" icon="ion-chevron-left"></v-ons-icon> {{ back }}
        </v-ons-button>
      </div>
      <div class="left" v-else>
      </div>
      <div class="center header-title">{{ headerTitle }}</div>
      <div class="right">
        <v-ons-toolbar-button>
          <v-ons-icon icon="ion-navicon, material: md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>
    <v-ons-tabbar swipeable position="auto"
      :tabs="tabs"
      :visible="true"
      @push-page="pushPage"
      @prechange="preChange"
      @postchange="postChange"
      @changeTitle="changeTitle"
      :index.sync="activeIndex"
    >
    </v-ons-tabbar>
  </v-ons-page>
</template>

<script>
  import Vue from 'vue';
  import Map from './map';
  import SpeakerNav from './speakerNav';
  import Speakers from './speakers';
  import SessionNav from './sessionNav';
  import Sessions from './sessions';
  import NewsNav from './newsNav';
  import News from './news';
  export default{
    data() {
      const data = {
        activeIndex: 0,
        pageStack: [],
        headerTitle: 'News',
        back: ''
      };
      data.tabs = [
        {
          icon: this.md() ? null : 'ion-ios-bell',
          label: 'News',
          title: 'News',
          page: NewsNav,
          badge: 7,
          key: "NewsNav",
          props: {
            ncmb: this.ncmb,
            pageStack: data.pageStack
          }
        },
        {
          icon: this.md() ? null : 'ion-clock',
          label: 'Sessions',
          title: 'Sessions',
          page: SessionNav,
          key: "sessionNav",
          props: {
            ncmb: this.ncmb,
            pageStack: data.pageStack
          }
        },
        {
          icon: this.md() ? null : 'ion-person-stalker',
          label: 'Speakers',
          title: 'Speakers',
          page: SpeakerNav,
          key: "SpeakerNav",
          props: {
            ncmb: this.ncmb,
            pageStack: data.pageStack
          }
        },
        {
          icon: this.md() ? null : 'ion-map',
          label: 'Map',
          title: 'Map',
          page: Map,
          key: "MapPage"
        },
        {
          icon: this.md() ? null : 'ion-ios-settings',
          label: 'Information',
          title: 'Information',
          page: Sessions,
          key: "aboutPage"
        }
      ];
      return data;
    },
    props: ['ncmb'],
    created() {
      // Vue.set(me, 'items', items);
      this.pageStack.push(News);
    },
    methods: {
      md() {
        return this.$ons.platform.isAndroid();
      },
      pushPage(e) {
        this.pageStack.push({
          extends: e.page,
          data() {
            const data = e.options;
            data.online = window.navigator.online;
            return data;
          }
        });
      },
      preChange(e) {
        this.back = '';
        if (e.activeIndex === 2) {
          this.pageStack.push(Speakers);
        }
        if (e.activeIndex === 1) {
          this.pageStack.push(Sessions);
        }
        if (e.activeIndex === 0) {
          this.pageStack.push(News);
        }
      },
      postChange(e) {
        this.headerTitle = this.tabs[this.activeIndex].title;
        /*
        if ([1,2].indexOf(e.activeIndex) > -1) {
          this.pageStack.pop();
        }
        */
      },
      changeTitle(options) {
        this.headerTitle = options.title;
        this.back = options.back;
      },
      popPage(event) {
        this.back = '';
        this.headerTitle = this.tabs[this.activeIndex].title;
        this.pageStack.pop();
      }
    },
    computed: {
    }
  };
</script>
<style>
  .header-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;    
  }
</style>