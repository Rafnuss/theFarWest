import Vue from "vue";
import App from "./App.vue";

// Register only the BootstrapVue plugins and icons actually used, instead of the full library
// (the full icon set alone is >1 MB of JavaScript).
import {
  AlertPlugin,
  BadgePlugin,
  ButtonGroupPlugin,
  ButtonPlugin,
  CardPlugin,
  CarouselPlugin,
  CollapsePlugin,
  FormCheckboxPlugin,
  FormGroupPlugin,
  FormInputPlugin,
  FormPlugin,
  FormRadioPlugin,
  FormSelectPlugin,
  ImagePlugin,
  InputGroupPlugin,
  LayoutPlugin,
  LinkPlugin,
  ListGroupPlugin,
  ModalPlugin,
  TablePlugin,
  TooltipPlugin,
  BIcon,
  BIconBinocularsFill,
  BIconCamera,
  BIconCardChecklist,
  BIconCaretLeftFill,
  BIconCaretRightFill,
  BIconCheck,
  BIconCheckSquare,
  BIconChevronLeft,
  BIconChevronRight,
  BIconClockFill,
  BIconCloudFill,
  BIconCloudRainHeavyFill,
  BIconGeoAltFill,
  BIconSquare,
  BIconSunFill,
  BIconTornado,
} from "bootstrap-vue";

import "./main.scss";
import "leaflet/dist/leaflet.css";

[
  AlertPlugin,
  BadgePlugin,
  ButtonGroupPlugin,
  ButtonPlugin,
  CardPlugin,
  CarouselPlugin,
  CollapsePlugin,
  FormCheckboxPlugin,
  FormGroupPlugin,
  FormInputPlugin,
  FormPlugin,
  FormRadioPlugin,
  FormSelectPlugin,
  ImagePlugin,
  InputGroupPlugin,
  LayoutPlugin,
  LinkPlugin,
  ListGroupPlugin,
  ModalPlugin,
  TablePlugin,
  TooltipPlugin,
].forEach((plugin) => Vue.use(plugin));

// <b-icon icon="foo-bar"> resolves to the globally registered BIconFooBar component.
Object.entries({
  BIcon,
  BIconBinocularsFill,
  BIconCamera,
  BIconCardChecklist,
  BIconCaretLeftFill,
  BIconCaretRightFill,
  BIconCheck,
  BIconCheckSquare,
  BIconChevronLeft,
  BIconChevronRight,
  BIconClockFill,
  BIconCloudFill,
  BIconCloudRainHeavyFill,
  BIconGeoAltFill,
  BIconSquare,
  BIconSunFill,
  BIconTornado,
}).forEach(([name, component]) => Vue.component(name, component));

new Vue({
  render: (h) => h(App),
}).$mount("#app");
