<template>
  <b-container fluid class="h-100 px-0">
    <b-row class="h-100 gx-0">
      <b-col class="h-100 d-flex flex-column">
        <b-button-group class="w-100">
          <b-button
            squared
            v-for="r in regions"
            :key="r.region"
            :style="{ 'background-color': r.color, 'border-color': r.color }"
            @click="activeRegion = r.region"
          >
            {{ r.name }}
          </b-button>
        </b-button-group>
        <l-map
          :bounds="[
            [26, -72],
            [50, -127],
          ]"
        >
          <l-tile-layer
            :url="'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=' + mapboxToken"
          />
          <l-polyline
            v-for="r in regions"
            :key="r.region"
            :lat-lngs="r.route"
            :color="r.color"
            :opacity="r.region == activeRegion ? 0.8 : 0.4"
            :weight="6"
          />
          <l-marker
            v-for="(h, i) in activeHighlights"
            :key="h.name"
            :lat-lng="[h.lat, h.lon]"
            :icon="getIcon(h, i + 1)"
          ></l-marker>
        </l-map>
      </b-col>
      <b-col class="h-100 d-flex flex-column col-xs-12 md-6 col-lg-4">
        <b-nav pills class="m-auto">
          <b-nav-item v-for="v in ['Plan', 'Live']" :key="v" @click="view = v" :active="view == v">
            {{ v }}
          </b-nav-item>
        </b-nav>
        <div class="overflow-auto">
          <b-col v-if="view == 'Live'"></b-col>
          <b-col v-if="view == 'Plan'">
            <b-card-group columns>
              <b-card
                v-for="(h, i) in activeHighlights"
                :key="h.name"
                :img-src="h.photo_url"
                img-right
                :title="i + 1 + '. ' + h.name"
              >
                <b-card-text v-html="h.text" />
              </b-card>
            </b-card-group>
          </b-col>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup>
import regionsJson from "./assets/regions.json";
</script>

<script>
import polyUtil from "polyline-encoded";
import { LMap, LTileLayer, LPolyline, LMarker } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LPolyline,
    LMarker,
  },
  data() {
    return {
      mapboxToken: "pk.eyJ1IjoicmFmbnVzcyIsImEiOiIzMVE1dnc0In0.3FNMKIlQ_afYktqki-6m0g",
      view: "Plan",
      activeRegion: "midwest",
      regions: regionsJson.map((r) => {
        r.route = polyUtil.decode(r.route);
        return r;
      }),
    };
  },
  methods: {
    getIcon(h, i) {
      return L.divIcon({
        className: "my-custom-icon",
        popupAnchor: [0, -34],
        iconAnchor: [12.5, 34],
        iconSize: [25, 34],
        html: `
        <?xml version="1.0" encoding="UTF-8"?><svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.66 33.31"><defs><style>.cls-1,.cls-2{fill:#fff;}#cls-3{fill:${h.color};}.cls-2{font-family:ArialMT, Arial;font-size:14.2px; fill:#fff;}</style></defs><g><path id="cls-3" d="M12.35,32.81c-.32,0-.8-.11-1.27-.66-2.97-3.44-5.33-6.7-7.21-9.96-1.43-2.49-2.36-4.61-2.91-6.66C.01,12.01,.54,8.71,2.52,5.74,4.22,3.21,6.6,1.55,9.6,.83c.42-.1,.86-.17,1.29-.23,.19-.03,.38-.06,.57-.09h1.67c.27,.03,.46,.06,.65,.09,.43,.06,.87,.13,1.29,.23,3.35,.83,5.92,2.79,7.64,5.83,.84,1.5,1.33,3.18,1.43,5.01,.15,2.57-.65,4.85-1.36,6.55-1.22,2.91-2.94,5.85-5.26,8.98-1.01,1.36-2.09,2.69-3.14,3.98l-.78,.97c-.45,.56-.93,.68-1.25,.68Z"/><path class="cls-1" d="M13.13,1c.61,.1,1.23,.17,1.83,.32,3.25,.8,5.69,2.69,7.32,5.59,.83,1.48,1.27,3.09,1.37,4.79,.13,2.23-.48,4.31-1.32,6.33-1.33,3.19-3.15,6.11-5.2,8.87-1.25,1.68-2.59,3.3-3.91,4.93-.27,.33-.57,.49-.87,.49s-.61-.16-.89-.49c-2.67-3.09-5.11-6.34-7.15-9.88-1.19-2.07-2.24-4.22-2.86-6.54-.9-3.35-.43-6.5,1.5-9.38,1.63-2.44,3.91-4.01,6.78-4.7,.6-.14,1.22-.21,1.83-.32h1.59m.08-1h-1.84c-.19,.05-.37,.07-.56,.1-.43,.07-.88,.13-1.33,.24C6.35,1.1,3.87,2.82,2.11,5.46,.04,8.56-.51,11.99,.48,15.66c.56,2.09,1.5,4.25,2.96,6.78,1.89,3.29,4.27,6.57,7.26,10.03,.6,.69,1.23,.84,1.65,.84,.61,0,1.19-.31,1.64-.86l.79-.97c1.05-1.29,2.13-2.62,3.15-3.99,2.35-3.16,4.09-6.13,5.32-9.08,.73-1.75,1.55-4.1,1.4-6.77-.11-1.9-.61-3.66-1.5-5.22-1.78-3.16-4.46-5.21-7.95-6.07-.45-.11-.9-.18-1.34-.24-.19-.03-.37-.06-.56-.09h-.08Z"/></g><text class="cls-2" transform="translate(8.39 18.5)"><tspan x="0" y="0">${i}</tspan></text></svg>`,
      });
    },
  },
  computed: {
    activeHighlights() {
      const r = this.regions.filter((r) => r.region == this.activeRegion)[0];
      return r.highlights
        .filter((h) => (h.keep == "1") | (h.keep == "true"))
        .map((h) => {
          h.color = r.color;
          return h;
        });
    },
  },
};
</script>
