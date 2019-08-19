<template>
  <v-card>
    <div v-if="this.content && !this.fetchingTab">
      <v-card-title class="align-end fill-height">
        {{this.content.title}}
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

export default {
  computed: {
    ...mapState("tabs", ["tabs", "fetchingTab"]),
    errorText: function(){
      if(!this.fetchingTab){
        return "A problem occurred";
      }
      return "Loading . . .";
    },
    component: function(){
      const {tab} = this.$route.params;

      if(tab && Tabs){
        if(tab in Tabs){
          return Tabs[tab];
        }
      }
      return null;
    },
    content: function (){
      const {tab} = this.$route.params;

      if(tab && this.tabs){
        const foundTab = this.tabs.filter(tabObj => tabObj.title === tab);
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
