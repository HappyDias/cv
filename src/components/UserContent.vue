<template>
  <v-card>
    <div v-if="this.component && !this.fetchingTab">
      <v-card-title class="align-end fill-height">
        {{this.tab}}
      </v-card-title>
      <v-card-text>
        <component :is="component" :content="this.content"></component>
      </v-card-text>
    </div>
    <div v-else>
      {{this.errorText}}
    </div>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import * as Tabs from "./Tabs";
import UnavailableTab from "./UnavailableTab.vue";

export default {
  computed: {
    ...mapState("tabs", ["tabs", "fetchingTab"]),
    errorText: function(){
      if(!this.fetchingTab){
        return "A problem occurred";
      }
      return "Loading . . .";
    },
    tab: function(){
      return this.$route.params.tab;
    },
    component: function(){
      if(this.tab && Tabs){
        if(this.tab in Tabs){
          return Tabs[this.tab];
        }
      }
      return UnavailableTab;
    },
    content: function (){
      if(this.tab && this.tabs){
        const foundTab = this.tabs.filter(tabObj => tabObj.title === this.tab);
        if(foundTab.length > 0){
          return foundTab[0];
        }
      }
      return null;
    }
  },
  components: { ...Tabs }
};
</script>
