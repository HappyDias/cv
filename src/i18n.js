import Vue from "vue";
import VueI18n from "vue-i18n";
import langs from "./locale/index.ts";

const messages = { ...langs };

const i18n = new VueI18n({
  locale: "gb", // set locale
  messages // set locale messages
});

Vue.use(i18n);
