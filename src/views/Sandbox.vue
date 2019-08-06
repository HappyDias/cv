<template>
  <v-app id="sandbox" :dark="dark">
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <div>OLA2</div>
    </v-navigation-drawer>
    <v-toolbar clipped-left app absolute>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>DAQBroker</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="drawerRight = !drawerRight">
        <v-icon>settings</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="drawerRight" right fixed clipped temporary>
      <settings />
    </v-navigation-drawer>
    <div>Ola</div>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import Settings from "@/components/Settings.vue";

export default {
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false
  }),
  computed: {
    ...mapState("settings", ["dark"])
  },
  components: { Settings }
};
</script>
