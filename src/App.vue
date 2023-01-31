<template>
  <div class="container-fluid h-100 px-0">
    <div class="row h-100 gx-0">
      <div class="col h-100">
        <l-map class="h-100" :zoom="0" :center="[0, 0]" :minZoom="3" :maxZoom="18" :zoomSnap="0.2">
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
          <l-marker v-for="h in activeHighlights" :key="h.name" :lat-lng="[h.lat, h.lon]"></l-marker>
        </l-map>
      </div>
      <div class="col h-100 d-flex flex-column col-xs-12 md-6 col-lg-4">
        <ul class="nav nav-pills nav-justified">
          <li class="nav-item" v-for="v in ['Plan', 'Live']" :key="v">
            <a class="nav-link" :class="view == v ? 'active' : ''" href="#" @click="view = v">{{ v }}</a>
          </li>
        </ul>
        <div class="overflow-auto">
          <div class="col" v-if="view == 'Live'"></div>
          <div class="col" v-if="view == 'Plan'">
            <div class="card mx-2 my-2" v-for="h in activeHighlights" :key="h.name">
              <img :src="h.phot_url" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">{{ h.name }}</h5>
                <p class="card-text" v-html="h.text"></p>
              </div>
              <div class="card-body">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  methods: {},
  computed: {
    activeHighlights() {
      return this.regions.filter((r) => r.region == this.activeRegion)[0].highlights;
    },
  },
};
</script>
