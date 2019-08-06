import Vue from "vue";
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vuetify, {
  VApp, // required
  VNavigationDrawer,
  VFooter,
  VToolbar,
  VToolbarTitle,
  VToolbarSideIcon,
  VFadeTransition,
  VSpacer,
  VIcon,
  VBtn,
  VSwitch,
  VSelect
} from "vuetify/lib";
import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
//import "./stylus/main.styl";

Vue.use(Vuetify, {
  components: {
    VApp, // required
    VNavigationDrawer,
    VFooter,
    VToolbar,
    VToolbarTitle,
    VToolbarSideIcon,
    VFadeTransition,
    VSpacer,
    VIcon,
    VBtn,
    VSwitch,
    VSelect
  }
});
