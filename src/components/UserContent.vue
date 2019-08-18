<template>
  <v-card>
  	<v-card-title class="align-end fill-height">
  	  {{content.title}}
  	</v-card-title>
    <v-card-text>
      <div v-if="!this.fetching && this.content.content">
        <component :is="currentComponent" :content="content"></component>
      </div>
      <div v-else>
        {{this.errorText}}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import * as Tabs from "./Tabs";

export default {
  data: function(){
    return {
      tabMapping: {
        Interests: 'Interests',
        Experience: 'Timeline',
        Education: 'Timeline',
        Languages: 'Languages',
        Skills: 'Skills',
        Publications: 'Bibliography',
      },
      Tabs
    };
  },
  props: ["content", "fetching"],
  computed: {
    errorText: function(){
      if(!this.fetching && this.content.content){
        return "A problem occurred";
      }
      return "Loading . . ."
    },
    currentComponent: function(){
      return this.Tabs[this.tabMapping[this.content.title]]
    }
  },
  components: { ...Tabs }
};
</script>
