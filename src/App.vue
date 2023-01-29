<script setup>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import region_geojson from "./assets/region.json";
</script>

<template>
  <div class="container-fluid h-100 px-0">
    <div class="row h-100 gx-0">
      <div class="col h-100">
        <div id="mapContainer" class="h-100"></div>
      </div>
      <div class="col col-xs-12 md-6 col-lg-4">{{ hoveredStateId }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accessToken: "pk.eyJ1IjoicmFmbnVzcyIsImEiOiIzMVE1dnc0In0.3FNMKIlQ_afYktqki-6m0g",
      map: null,
      hoveredStateId: null,
    };
  },
  methods: {},
  async mounted() {
    mapboxgl.accessToken = this.accessToken;

    this.map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      bounds: turf.bbox(region_geojson),
      projection: "globe",
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    await this.map.once("style.load");
    this.map.setFog({});
    this.map.addSource("mapbox-dem", {
      type: "raster-dem",
      url: "mapbox://mapbox.terrain-rgb",
    });
    this.map.setTerrain({
      source: "mapbox-dem",
      exaggeration: 5,
    });
    this.map.addSource("region_geojson", {
      type: "geojson",
      promoteId: "region",
      data: region_geojson,
    });
    this.map.addLayer({
      id: "region_geojson",
      type: "fill",
      source: "region_geojson", // reference the data source
      layout: {},
      paint: {
        "fill-color": "#0080ff", // blue color fill
        "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.5],
      },
    });

    this.map.on("mousemove", "region_geojson", (e) => {
      if (e.features.length > 0) {
        if (this.hoveredStateId !== null) {
          this.map.setFeatureState({ source: "region_geojson", id: this.hoveredStateId }, { hover: false });
        }
        this.hoveredStateId = e.features[0].id;
        this.map.setFeatureState({ source: "region_geojson", id: this.hoveredStateId }, { hover: true });
      }
    });
    this.map.on("mouseleave", "region_geojson", () => {
      if (this.hoveredStateId !== null) {
        this.map.setFeatureState({ source: "region_geojson", id: this.hoveredStateId }, { hover: false });
      }
      this.hoveredStateId = null;
    });
  },
};
</script>
