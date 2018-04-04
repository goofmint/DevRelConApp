<template id="app">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left" v-if="back">
        <v-ons-button modifier="quiet" @click="popPage($event)">
          <v-ons-icon size="25px" icon="ion-chevron-left"></v-ons-icon> Back
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
    <v-ons-tabbar
      animation="none"
      :tabs="tabs"
      ref="Nav"
      :visible="true"
      @push-page="pushPage"
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
  import Nav from './Nav';
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
        back: false,
        allSessions: [],
        news: [],
        speakers: [],
        sponsors: [],
        animation: 'none',
        online: window.navigator.onLine
      };
      data.tabs = [
        {
          icon: this.md() ? null : 'ion-ios-bell',
          label: 'News',
          title: 'News',
          page: Nav,
          badge: 7,
          key: "NewsNav",
          props: {
            list: News,
            article: null,
            news: data.news,
            online: data.online
          }
        },
        {
          icon: this.md() ? null : 'ion-clock',
          label: 'Sessions',
          title: 'Sessions',
          page: Nav,
          key: "SessionNav",
          props: {
            list: {
              extends: Sessions,
              data() {
                return {
                  session: null,
                  allSessions: data.allSessions,
                  online: data.online
                }
              }
            }
          }
        },
        {
          icon: this.md() ? null : 'ion-person-stalker',
          label: 'Speakers',
          title: 'Speakers',
          page: Nav,
          key: "SpeakerNav",
          props: {
            list: {
              extends: Speakers,
              data() {
                return {
                  speaker: null,
                  speakers: data.speakers,
                  online: data.online
                }
              }
            }
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
      // this.pageStack.push(News);
      this.getSessions();
      this.getNews();
      this.getSpeakers();
      this.getSponsors();
    },
    methods: {
      md() {
        return this.$ons.platform.isAndroid();
      },
      
      getSessions() {
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
      
      setSessions(sessions) {
        Vue.set(this, 'allSessions', sessions);
      },
      
      getNews() {
        const me = this;
        if (!this.ncmb) {
          return false;
        }
        me.setNews(me.ncmb.getNews());
        if (!this.online) return;
        this.ncmb.getLatestNews()
          .then(news => {
            me.setNews(news);
          });
      },
      
      setNews(news) {
        Vue.set(this, 'news', news);
      },
      
      getSpeakers() {
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
      
      setSpeakers(speakers) {
        Vue.set(this, 'speakers', speakers);
      },
      
      getSponsors() {
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
      
      setSponsors(sponsors) {
        Vue.set(this, 'sponsors', sponsors);
      },
      
      pushPage(e) {
        this.pageStack.push({
          extends: e.page,
          onsNavigatorOptions: {
            animation: 'slide'
          },
          data() {
            const data = e.options;
            data.online = window.navigator.online;
            return data;
          }
        });
      },
      
      postChange(e) {
        this.headerTitle = this.tabs[this.activeIndex].title;
      },
      
      changeTitle(options) {
        this.headerTitle = options.title;
        this.back = this.$refs.Nav.$children[this.activeIndex].$data.pageStack.length > 1;
      },
      
      popPage(event) {
        this.$refs.Nav.$children[this.activeIndex].$data.pageStack.pop();
        this.back = this.$refs.Nav.$children[this.activeIndex].$data.pageStack.length > 1;
        this.headerTitle = this.tabs[this.activeIndex].title;
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