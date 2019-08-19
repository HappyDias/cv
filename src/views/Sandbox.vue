<template>
  <v-app app id="sandbox">
    <v-navigation-drawer v-model="show" right fixed clipped temporary>
      <Settings />
    </v-navigation-drawer>
    <v-content grid-list-md>
      <v-container fluid>
        <v-layout justify-start v-bind="binding">
          <v-flex ma-2 xs3>
            <UserCard />
          </v-flex>
          <v-flex ma-2 xs9>
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Settings from "@/components/Settings.vue";
import UserCard from "@/components/UserCard.vue";
import UserContent from "@/components/UserContent.vue";

export default {
  methods: {
    ...mapActions("settings", ["set"]),
  },
  computed: {
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
