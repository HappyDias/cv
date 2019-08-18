<template>
  <v-expansion-panels focusable>
    <v-expansion-panel
      v-for="pub in content.content.bibliography"
      v-bind:key="pub.title"
    >
      <v-expansion-panel-header>
        <v-layout justify-space-around>
          <v-flex xs8 class="text-truncate">{{pub.title}}</v-flex>
          <v-flex xs1 class="text-secondary">{{pub.year}}</v-flex>
        </v-layout>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list dense>
          <v-list-item three-line>
            {{ 'Title: ' + pub.title }}
          </v-list-item>
          <v-list-item three-line>
            {{ 'Journal: ' + pub.journal }}
          </v-list-item>
          <v-list-item three-line>
            {{ pub.authType }}
          </v-list-item>
          <v-list-item three-line>
            <v-btn @click="redirect(pub.url)">Link</v-btn>
          </v-list-item>	
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default{
  methods: {
    redirect: link => {
      if(link){
        window.open(link);
      }
    }
  },
  props: ["content"]
}
</script>