import { gql } from "apollo-boost";
import client from '../../apollo';
import router from '../../router';
import {orderByDate, homogenize, order} from "../../utils/functions"

export default {
  namespaced: true,
  state() {
    return {
      tabs: null,
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
      client.query({
        query: gql`
          {
            __type(name:"Title"){
              name
              enumValues{
                name
              }
            }
          }
        `
      })
        .then(result=>{
          const {data} = result; // This is 
          const {__type} = data; // kinda ugly
          const {enumValues} = __type;
          const {tab} = router.currentRoute.params;

          const tabs = enumValues.map((key,idx) => ({
            title: key.name,
            content: null
          })).sort(order);

          if(tab){
            const tabFound = tabs.filter(tabObj => tabObj.title === tab);
            if(tabFound.length > 0){
              context.dispatch("getTabInfo", {title: tabFound[0].title, idx:  tabs.indexOf(tabFound[0])});
            }
          }

          context.commit("set", {key: 'tabs', value: tabs});
          context.commit("set", {key: 'fetching', value: false});
        })
        .catch(err=>{
          console.log("GRAPHQL ERROR", err);
          context.commit("set", {key: 'fetching', value: false});
        });
    },
    getTabInfo(context, payload){
      const {title, idx} = payload;
      context.commit("set", {key: 'fetchingTab', value: true});
      client.query({
        query: gql`
          {getTab(title: ${title}){
            _id
            date
            title
            data
          }}
        `
      })
        .then(result=>{
          const {data} = result; // This is 
          const {getTab} = data; // kinda ugly
          const toCommit = getTab.data; // ?
          const {tab} = router.currentRoute.params;

          if(title === 'Publications'){
            toCommit.bibliography = toCommit.bibliography.map(homogenize).sort(orderByDate);
          }

          if(tab !== title){
            router.push({ path: `/${title}` }); //Maybe consider a replace instead of a push
          }

          context.commit("setTab", {idx, content: toCommit});
          context.commit("set", {key: 'fetchingTab', value: false});
        })
        .catch(err=>{
          console.log("GRAPHQL ERROR", err);
          context.commit("set", {key: 'fetchingTab', value: false});
        });
    }
  }
};
