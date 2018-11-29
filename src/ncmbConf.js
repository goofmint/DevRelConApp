const NCMB = require('ncmb');
import Vue from 'vue';

import {config} from './config';
const {PushNotificationsStatus} = window;

class NCMBConf {
  constructor(applicationKey, clientKey) {
    this.ncmb = new NCMB(applicationKey, clientKey);
    this.consts = {
      news: 'News',
      sessions: 'Sessions',
      speakers: 'Speakers',
      sponsors: 'Sponsors'
    }
    this.favorites = [];
    const me = this;
    if (this.isLogin()) {
      this.allFavorites()
        .then(res => {
          me.favorites = res;
        })
        .catch(err => console.log(err));
    }
  }
  
  async login(authData) {
    await this.ncmb.User.loginWith('facebook', authData);
    this.favorites = await this.allFavorites();
  }
  
  isLogin() {
    return this.ncmb.User.getCurrentUser();
  }
  
  async idAuth(userName, password) {
    return await this.ncmb.User.login(userName, password);
  }
  
  async allFavorites() {
    const user = this.ncmb.User.getCurrentUser();
    const Sessions = this.ncmb.DataStore(this.consts.sessions);
    try {
      return await Sessions
        .include('speaker')
        .relatedTo(user, 'sessions')
        .order('time')
        .fetchAll();
    } catch (err) {
      return err;
    }
  }
  
  favorited(session) {
    return this.favorites.filter(favorite => favorite.objectId === session.objectId)[0];
  }
  
  async addFavorite(session) {
    this.favorites.push(session);
    const user = this.ncmb.User.getCurrentUser();
    const relation = new this.ncmb.Relation();
    relation.add(session);
    return await user
      .set('sessions', relation)
      .update();
  }
  
  async removeFavorite(session) {
    this.favorites = this.favorites.filter(favorite => favorite.objectId !== session.objectId);
    const user = this.ncmb.User.getCurrentUser();
    const relation = new this.ncmb.Relation();
    relation.remove(session);
    return await user
      .set('sessions', relation)
      .update();
  }
  
  getToken() {
    return new Promise((res, rej) => {
      window.NCMB.monaca.setDeviceToken(
        config.applicationKey,
        config.clientKey,
        config.senderId,
        success => res(),
        err => rej(err)
      )
    });
  }
  
  getNotificationStatus() {
    return new Promise((res, rej) => {
      if (typeof cordova == 'undefined') res();
      cordova.exec(res, rej, 'PushNotificationsStatus', 'getStatus');
    })
  }
  getNews() {
    return this.getCache(this.consts.news);
  }
  getSessions() {
    return this.getCache(this.consts.sessions);
  }
  getSpeakers() {
    return this.getCache(this.consts.speakers);
  }
  getSponsors() {
    return this.getCache(this.consts.sponsors);
  }
  getCache(name) {
    const json = localStorage.getItem(name);
    if (!json) {
      return [];
    }
    let articles;
    try{
      articles = JSON.parse(json);
    }catch(e) {
      localStorage.removeItem(name);
      return [];
    }
    const Item = this.ncmb.DataStore(name);
    const Speaker = this.ncmb.DataStore(this.consts.speakers);
    const Session = this.ncmb.DataStore(this.consts.sessions);
    const ary = [];
    for (let article of articles) {
      const item = new Item(article);
      if (name === 'Sessions') {
        item.speaker = new Speaker(article.speaker);
      }
      if (name === 'Speakers') {
        item.session = new Session(article.session);
      }
      ary.push(item);
    }
    return ary;
  }
  
  getLatestNews() {
    return this.getLatestArticle(this.consts.news)
  }
  
  getLatestSessions() {
    return this.getLatestArticle(this.consts.sessions);
  }
  
  getLatestSpeakers() {
    return this.getLatestArticle(this.consts.speakers);
  }
  
  getLatestSponsors() {
    return this.getLatestArticle(this.consts.sponsors);
  }
  
  async getLatestArticle(name) {
    if (!window.navigator.onLine) {
      return res([]);
    }
    let Item = this.ncmb.DataStore(name);
    switch (name) {
    case 'Sessions':
      Item = Item.include('speaker').order('time');
      break;
    case 'Speakers':
      Item = Item
        .include('session')
        .order('name')
        .equalTo('list', 'yes');
      break;
    case 'Sponsors':
      Item = Item.order('rank');
      break;
    }
    try {
      const articles = await Item
        .fetchAll()
      localStorage.setItem(name, JSON.stringify(articles));
      return articles;
    } catch (err) {
      return err;
    }
  }
}

const ncmb = new NCMBConf(config.applicationKey, config.clientKey)
export {ncmb}