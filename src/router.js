import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
//import TabSelector  from "./components/TabSelector";
//import UserContent  from "./components/UserContent";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [//Maybe consider a "home" route, but not particularly necessary
    {
      path: "/:tab",
      name: "tab",
      props: true,
      component: ()=> {
        return import(/* webpackChunkName: "about"*/  "./components/UserContent")
      }
    },
  ]
});
