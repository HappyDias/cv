<template>
  <v-card>
  	<v-card-title class="align-end fill-height">
  	  {{content.title}}
  	</v-card-title>
    <v-card-text>
      <ContentText :content="content"/>
    </v-card-text>
  </v-card>
</template>

<script>
import ContentText from "@/components/ContentText.vue";

export default {
  props: ["content"],
  components: { ContentText }
};
</script>
