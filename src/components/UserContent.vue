<template>
  <v-card>
  	<v-card-title class="align-end fill-height">
  	  {{content.title}}
  	</v-card-title>
    <v-card-text>
      <ContentText :content="content" v-if="!this.fetching && this.content.content"/>
      <div v-else>
        {{this.errorText}}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import ContentText from "@/components/ContentText.vue";

export default {
  props: ["content", "fetching"],
  computed: {
    errorText: function(){
      if(!this.fetching && this.content.content){
        return "A problem occurred";
      }
      return "Loading . . ."
    }
  },
  components: { ContentText }
};
</script>
