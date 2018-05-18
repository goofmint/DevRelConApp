<template id="app">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="header-left left" v-show="back">
        <v-ons-button modifier="quiet" @click="popPage($event)">
          <v-ons-icon size="25px" icon="ion-chevron-left"></v-ons-icon> Back
        </v-ons-button>
      </div>
      <div class="center header-title">{{ headerTitle }}</div>
      <div class="right" v-bind:style="styleRight()">
        <v-ons-toolbar-button>
          <v-ons-icon :icon="favorited" @click="addFavorite" v-show="favorited === 'ion-ios-star-outline'"></v-ons-icon>
          <v-ons-icon :icon="favorited" @click="removeFavorite" v-show="favorited === 'ion-ios-star'"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <LoginDialog
        :ncmb="ncmb"
        :dialogVisible="dialogVisible"
        @closeDialog="closeDialog"
      >
      </LoginDialog>
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
  import Nav from './Nav';
  import Speakers from './speakers';
  import Sessions from './sessions';
  import Information from './Information';
  import News from './news';
  import LoginDialog from './LoginDialog';
  export default{
    data() {
      const data = {
        activeIndex: 2,
        pageStack: [],
        headerTitle: 'News',
        back: false,
        animation: 'none',
        session: null,
        online: window.navigator.onLine,
        right: 'none',
        dialogVisible: false,
        favorited: 'ion-ios-star-outline'
      };
      const ncmb = this.ncmb;
      data.tabs = [
        {
          icon: this.md() ? null : 'ion-ios-bell',
          label: 'News',
          title: 'News',
          page: Nav,
          badge: 7,
          key: "NewsNav",
          props: {
            list: {
              extends: News,
              data() {
                return {
                  article: null,
                  news: [],
                  ncmb: ncmb,
                  online: data.online
                }
              }
            }
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
                  ncmb: ncmb,
                  allSessions: [],
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
                  ncmb: ncmb,
                  speakers: [],
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
          key: "Information",
          page: Nav,
          props: {
            list: {
              extends: Information,
              data() {
                return {
                  sponsors: [],
                  ncmb: ncmb,
                  online: data.online
                }
              }
            }
          }
        }
      ];
      return data;
    },
    props: ['ncmb'],
    components: {
      LoginDialog
    },
    created() {
      // Vue.set(me, 'items', items);
      // this.pageStack.push(News);
    },
    methods: {
      md() {
        return this.$ons.platform.isAndroid();
      },
      
      addFavorite() {
        const me = this;
        me.favorited = 'ion-ios-star'
        if (this.ncmb.isLogin()) {
          this.ncmb
            .addFavorite(this.session)
            .then(res => {})
            .catch(err => {
              me.favorited = 'ion-ios-star-outline';
              alert(err);
            })
        } else {
          this.dialogVisible = true
        }
      },
      
      removeFavorite() {
        const me = this;
        me.favorited = 'ion-ios-star-outline';
        if (this.ncmb.isLogin()) {
          this.ncmb
            .removeFavorite(this.session)
            .then(res => {
            })
            .catch(err => {
              me.favorited = 'ion-ios-star';
              alert(err);
            })
        } else {
          this.dialogVisible = true
        }
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
        this.changeTitle(this.tabs[this.activeIndex]);
      },
      
      changeTitle(options) {
        const pageStack = this.$refs.Nav.$children[this.activeIndex].$data.pageStack;
        const stack = pageStack ? pageStack.length : 0;
        this.headerTitle = stack > 1 ? '' : options.title;
        this.back = stack > 1;
        this.session = options.session;
        this.headerTitle = stack > 1 ? '' : options.title;
        this.right = options.session ? 'inline' : 'none';
        this.isFavorite();
      },
      
      popPage(event) {
        this.$refs.Nav.$children[this.activeIndex].$data.pageStack.pop();
        const pageStack = this.$refs.Nav.$children[this.activeIndex].$data.pageStack;
        this.back = this.$refs.Nav.$children[this.activeIndex].$data.pageStack.length > 1;
        this.headerTitle = this.tabs[this.activeIndex].title;
        const data = pageStack ? pageStack[pageStack.length - 1].data() : {};
        this.right = data.session ? 'inline' : 'none';
        this.session = data.session;
        this.isFavorite();
      },
      styleRight() {
        return `display: ${this.right}`;
      },
      closeDialog() {
        this.dialogVisible = false;
      },
      isFavorite() {
        if (!this.ncmb.isLogin()) {
          this.favorited = 'ion-ios-star-outline';
          return;
        }
        if (!this.session) return;
        this.favorited = this.ncmb.favorited(this.session) ? 'ion-ios-star' : 'ion-ios-star-outline';
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
  position: relative;
  width: 100%;
}
</style>