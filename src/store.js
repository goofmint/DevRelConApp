import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

import {ncmb} from './ncmbConf';

export default new Vuex.Store({
  state: {
    ncmb: ncmb,
    speakers: [],
    sessions: [],
    news: [],
    sponsors: [],
    favorites: []
  },
  mutations: {
    addSpeaker(state, speaker) {
      state.speakers.push(speaker);
    },
    addSession(state, session) {
      state.sessions.push(session);
    }
  }
})

