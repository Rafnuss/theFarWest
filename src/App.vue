<script setup>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import polyUtil from "polyline-encoded";
import regions from "./assets/regions.json";
</script>

<template>
  <div class="container-fluid h-100 px-0">
    <div class="row h-100 gx-0">
      <div class="col h-100">
        <l-map class="h-100" :zoom="0" :center="[0, 0]" :minZoom="3" :maxZoom="18" :zoomSnap="0.2">
          <l-tile-layer
            :url="'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=' + mapboxToken"
          />
          <l-polyline v-for="r in regions" :key="r.region" :lat-lngs="r.route" />
        </l-map>
      </div>
      <div class="col col-xs-12 md-6 col-lg-4">
        <ul class="nav nav-pills nav-justified">
          <li class="nav-item" v-for="v in ['Plan', 'Live']" :key="v">
            <a class="nav-link" :class="view == v ? 'active' : ''" href="#" @click="view = v">{{ v }}</a>
          </li>
        </ul>
        <div class="row">
          <div class="col" v-if="view == 'Live'">
            <div class="card">
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
              </div>
              <div class="card-body">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
              </div>
            </div>
          </div>
          <div class="col" v-if="view == 'Plan'"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LPolyline } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LPolyline,
  },
  data() {
    return {
      mapboxToken: "pk.eyJ1IjoicmFmbnVzcyIsImEiOiIzMVE1dnc0In0.3FNMKIlQ_afYktqki-6m0g",
      view: "Plan",
      zoom: 10,
      regions: regions.map((r) => {
        if (r.route) {
          r.route = polyUtil.decode(r.route);
          return r;
        }
      }),
    };
  },
  methods: {},
};
</script>
