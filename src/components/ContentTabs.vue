<template>
  <div>
    <div v-if="!this.fetching && this.tabs">
      <v-tabs v-model="activeTab">
        <v-tab v-for="tab in this.tabs" :label="tab.title" :name="tab.title" v-bind:key="tab.title">
          {{tab.title}}
        </v-tab>
      </v-tabs>
    </div>
    <div v-else>{{this.errorText}}</div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("tabs", ["tabs", "fetching"]),
    errorText: function(){
      if(!this.fetching){
        return "A problem occurred";
      }
      return "Loading . . ."
    },
    activeTab:{
      set(val){
        const tab = this.tabs[val].title;

        this.getTabInfo({title: tab, idx: val});
      },
      get(){
        const {tab} = this.$router.currentRoute.params;
        const tabFound = this.tabs.filter(tabObj => tabObj.title === tab);

        return this.tabs.indexOf(tabFound[0]) || 0;
      }
    }
  },
  methods: {
    ...mapActions("tabs", ["set", "getTabs", "getTabInfo"])
  },
  mounted: function(){
    this.getTabs();
  }
};
</script>
