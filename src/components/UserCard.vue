<template>
  <v-card class="mx-auto" max-width="600">
    <v-img class="white--text" :src="'/img/cv_photo2.jpg'">
      <v-card-title class="align-end fill-height">
        Curriculum Vitae - António Dias
      </v-card-title>
    </v-img>
    <v-card-text>
      <span> 
        Physicist, software developer, hardware tinkerer 
        <v-icon @click="change({ key: 'show', value: !show })">mdi-settings</v-icon>
      </span><br />
      <span class="text--primary">
      	<ContentTabs />
        <div v-if="showInfo">
          <div v-for="info in userInfo" v-bind:key="info.icon">
            <v-icon @click="redirect(info.redirect)">
              {{info.icon}}
            </v-icon>
            <span v-html="info.text"/>
          </div>
          <div>
          	<a href="/adiasCV.pdf" target="_blank">
          	  <v-icon>mdi-file-pdf</v-icon>
          	  Pdf version
          	</a>
          </div>
        </div>
        <v-layout :class="infoData.location">
          <v-icon @click="showInfo = !showInfo">{{infoData.icon}}</v-icon>
        </v-layout>
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ContentTabs from "@/components/ContentTabs.vue";

export default {
  data: () => ({
    showInfo: false,
  }),
  methods: {
    redirect: link => {
      if(link){
        window.open(link);
      }
    },
    change: function(data) {
      this.set(data);
    },
    ...mapActions("settings", ["set"])
  },
  computed: {
    ...mapState("settings", ["show"]),
    ...mapState("tabs", ["userInfo"]),
    infoData: function(){
      return this.showInfo ? {icon: 'mdi-minus', location:'justify-end'} : {icon: 'mdi-plus', location:'justify-start'};
    }
  },
  components: { ContentTabs }
};
</script>
