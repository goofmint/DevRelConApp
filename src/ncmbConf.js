const NCMB = require('ncmb');
const applicationKey = 'd288714a5a801f4ccaaac99c87df41d35e38b5804a9ecbcd2026c1901e914fc0';
const clientKey = '3395ea58a34af1edb5009c9d15b3379761539ef3c8eb0ee0d797274e122359b8';

import {config} from './config';

class NCMBConf {
  constructor(applicationKey, clientKey) {
    this.ncmb = new NCMB(applicationKey, clientKey);
    this.consts = {
      news: 'News',
      sessions: 'Sessions',
      speakers: 'Speakers',
      sponsors: 'Sponsors'
    }
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
    try{
      articles = JSON.parse(json);
    }catch(e) {
      localStorage.removeItem(name);
      return [];
    }
    const Item = this.ncmb.DataStore(name);
    const ary = [];
    for (article of articles) {
      ary.push(new Item(article))
    }
    return ary;
  }
  
  getLatestNews() {
    return this.getLatestArticle(this.consts.news)
  }
  
  getLatestSession() {
    return this.getLatestArticle(this.consts.sessions);
  }
  
  getLatestSpeaker() {
    return this.getLatestArticle(this.consts.speakers);
  }
  
  getLatestSponnsors() {
    return this.getLatestArticle(this.consts.sponsors);
  }
  
  getLatestArticle(name) {
    return new Promise((res, rej) => {
      if (!window.navigator.online) {
        return res([]);
      }
      const Item = this.ncmb.DataStore(name);
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