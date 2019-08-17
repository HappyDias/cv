<template>
  <v-tabs @change="change" v-if="!this.fetching && this.tab>=0">
    <v-tab v-for="tab in this.tabs" v-bind:key="tab.title">
      {{ tab.title }}
    </v-tab>
  </v-tabs>
  <div v-else>{{this.errorText}}</div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("tabs", ["tabs", "tab", "fetching"]),
    errorText: function(){
      if(!this.fetching && this.tab < 0){
        return "A problem occurred";
      }
      return "Loading . . ."
    }
  },
  methods: {
    change: function(number) {
      if(!this.tabs[number].content){
        this.getTabInfo({title: this.tabs[number].title, idx: number});
      }
      this.set({ key: "tab", value: number });
    },
    ...mapActions("tabs", ["set", "getTabs", "getTabInfo"])
  },
  mounted: function(){
    this.getTabs();
  },
  /*updated: function(){
    console.log("UPDATED", this.tab, this.tabs, this.tabs[this.tab].title);
  }*/
};
</script>
