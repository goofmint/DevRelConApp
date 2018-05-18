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
  login(authData) {
    const me = this;
    return new Promise((res, rej) => {
      this.ncmb.User.loginWith('facebook', authData)
        .then(() => {
          return this.allFavorites();
        })
        .then(results => {
          me.favorites = results;
          res();
        })
    })
  }
  isLogin() {
    return this.ncmb.User.getCurrentUser();
  }
  
  idAuth(userName, password) {
    return new Promise((res, rej) => {
      this.ncmb.User.login(userName, password)
        .then(response => {
          res(res);
        })
        .catch(err => {
          rej(err);
        })
    })
  }
  
  allFavorites() {
    return new Promise((res, rej) => {
      const user = this.ncmb.User.getCurrentUser();
      const Sessions = this.ncmb.DataStore(this.consts.sessions);
      Sessions
        .include('speaker')
        .relatedTo(user, 'sessions')
        .order('time')
        .fetchAll()
        .then(result => {
          res(result);
        })
        .catch(err => {
          rej(err)
        });
    })
  }
  
  favorited(session) {
    return this.favorites.filter(favorite => favorite.objectId === session.objectId)[0];
  }
  
  addFavorite(session) {
    this.favorites.push(session);
    const user = this.ncmb.User.getCurrentUser();
    const relation = new this.ncmb.Relation();
    relation.add(session);
    return user
      .set('sessions', relation)
      .update();
  }
  
  removeFavorite(session) {
    this.favorites = this.favorites.filter(favorite => favorite.objectId !== session.objectId);
    const user = this.ncmb.User.getCurrentUser();
    const relation = new this.ncmb.Relation();
    relation.remove(session);
    return user
      .set('sessions', relation)
      .update();
  }
  
  getToken() {
    return new Promise((res, rej) => {
      alert(true);
      debugger;
      console.log(window)
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
  
  getLatestArticle(name) {
    return new Promise((res, rej) => {
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
      Item
        .fetchAll()
        .then((articles) => {
          localStorage.setItem(name, JSON.stringify(articles));
          res(articles);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }
}

const ncmb = new NCMBConf(config.applicationKey, config.clientKey)
export {ncmb}