<template>
  <v-app app id="sandbox">
    <!--<v-app-bar clipped-left absolute>
      <v-toolbar-title>Curriculum Vitae - António Dias</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click="drawerRight = !drawerRight">{{icons.mdiSettings}}</v-icon>
    </v-app-bar>-->
    <v-navigation-drawer v-model="show" right fixed clipped temporary>
      <settings />
    </v-navigation-drawer>
    <v-content grid-list-md>
      <v-container fluid>
        <v-layout justify-start v-bind="binding">
          <v-flex ma-2 xs3>
            <UserCard />
          </v-flex>
          <v-flex ma-2 xs9 v-if="this.tab>=0">
            <UserContent :content="this.tabs[this.tab]" :fetching="this.fetchingTab" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mdiSettings } from "@mdi/js";
import { mapState, mapActions } from "vuex";
import Settings from "@/components/Settings.vue";
import UserCard from "@/components/UserCard.vue";
import UserContent from "@/components/UserContent.vue";

export default {
  data: () => ({
    drawer: null,
    right: false,
    left: false,
    icons: {
      mdiSettings
    }
  }),
  methods: {
    ...mapActions("settings", ["set"]),
    ...mapActions("tabs", ["getTabs"])
  },
  computed: {
    ...mapState("tabs", ["tab", "tabs", "fetching", "fetchingTab"]),
    show: {
      set(show){
        this.set({key: 'show', value: show})
      },
      get(){
        return this.$store.state.settings.show
      }
    },
    binding() {
      const binding = {};

      if (this.$vuetify.breakpoint.mdAndDown) binding.column = true;

      return binding;
    }
  },
  components: { Settings, UserCard, UserContent },
};
</script>
