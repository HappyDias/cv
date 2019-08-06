<template>
  <div>
    Dark Mode
    <v-switch
      :value="dark"
      @click.stop="changeSettings({ key: 'dark', value: !dark })"
      :label="dark ? 'On' : 'Off'"
    />
    <v-select :items="this.locales" label="Language" :value="this.current">
      <template slot="selection" slot-scope="data">
        <country-flag :country="data.item" size="normal" />
      </template>
      <template slot="item" slot-scope="data">
        <country-flag :country="data.item" size="normal" />
      </template>
    </v-select>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CountryFlag from "vue-country-flag";

export default {
  name: "settings",
  computed: {
    ...mapState("settings", ["dark"]),
    locales: function() {
      return ["gb", "pt"];
    },
    current: function() {
      return "pt";
    }
  },
  methods: {
    changeSettings(data) {
      this.set(data);
    },
    buttonClick() {
      console.log(this.locales);
    },
    ...mapActions("settings", ["set"])
  },
  components: { CountryFlag }
};
</script>
