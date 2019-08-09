<template>
  <v-tabs @change="change">
    <v-tab v-for="tab in this.tabs" v-bind:key="tab.title">
      {{ tab.title }}
    </v-tab>
  </v-tabs>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("tabs", ["tabs", "tab"]),
  },
  methods: {
    change: function(number) {
      this.set({ key: "tab", value: number });
    },
    ...mapActions("tabs", ["set"])
  }
};
</script>
