import axios from "axios";
import qs from 'qs';

function orderByDate(a,b){
  if(a.year < b.year) return -1;
  if(a.year > b.year) return 1;
  return 0;
}

function homogenize(obj){
  const toReturn = {...obj};
  const testKeys = {
    year : ['date'],
    url : ['adsurl'],
    journal: ['journaltitle', 'booktitle']
  }

  Object.keys(testKeys).forEach(testKey =>{
    if(!(testKey in toReturn)){
      testKeys[testKey].forEach(checkKey =>{
        if(toReturn[checkKey]){
          toReturn[testKey] = toReturn[checkKey];
        }
      })
    }
  })

  if(toReturn.author[0].includes('Dias')){
    toReturn['authType'] = 'Main Author'
  }
  else{
    toReturn['authType'] = 'Co-Author'
  }

  return toReturn;
}

export default {
  namespaced: true,
  state() {
    return {
      tabs: null,
      tab: -1,
      fetching: true,
      fetchingTab: true,
      userInfo: [
      {
        icon: 'mdi-email',
        text: 'amcbd89@gmail.com',
        'redirect': 'mailto:amcbd89@gmail.com'
      },
      {
        icon: 'mdi-phone',
        text: '(+351) 96 9875 025',
        'redirect': 'tel:+351969875025'
      },
      {
        icon: 'mdi-skype',
        text: 'amcbd89',
        'redirect': 'skype:amcbd89?chat'
      },
      {
        icon: 'mdi-home',
        text: 'Rua dos Escritores, 7, 7C, <br />2685-207, Portela LRS, Portugal',
        'redirect': 'https://www.google.com/maps/search/?api=1&query=38.783029,-9.108888'
      },
      {
        icon: 'mdi-gender-male-female',
        text: 'Male',
        'redirect': ''
      },
      {
        icon: 'mdi-cake-variant',
        text: '21<sup>st</sup> of November 1989',
        'redirect': ''
      }
    ]
    };
  },
  mutations: {
    set(state, { key, value }) {
      state[key] = value;
    },
    setTab(state, {idx, content}){
      state.tabs[idx].content = content;
    }
  },
  actions: {
    set(context, payload) {
      context.commit("set", payload);
    },
    getTabs(context){
      axios.get("/.netlify/functions/get_tabs")
        .then(res => {
          if(res.status === 200){
            const tabs = res.data.map((key,idx) => ({
              title: key,
              content: null
            }));
            context.commit("set", {key: 'tab', value: 0});
            context.commit("set", {key: 'tabs', value: tabs});
          }
          context.commit("set", {key: 'fetching', value: false});
      })
        .catch(error => {
          console.log("error", error);
          context.commit("set", {key: 'fetching', value: false});
      });
    },
    getTabInfo(context, payload){
      const {title, idx} = payload;
      context.commit("set", {key: 'fetchingTab', value: true});
      axios.get("/.netlify/functions/get_tab_info?title="+title)
        .then(res=>{
          if(res.status === 200){
            const returnData = res.data.data;
            if(title === 'Publications'){
              returnData.bibliography = returnData.bibliography.map(homogenize).sort(orderByDate);
            }
            context.commit("setTab", {idx, content: res.data.data});
          }
          context.commit("set", {key: 'fetchingTab', value: false});
        })
        .catch(error=>{
          context.commit("set", {key: 'fetchingTab', value: false});
        })
    }
  }
};
