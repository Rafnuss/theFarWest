<script setup>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import polyUtil from "polyline-encoded";

import regions from "./assets/regions.json";
</script>

<template>
  <div class="container-fluid h-100 px-0">
    <div class="row h-100 gx-0">
      <div class="col h-100">
        <div id="mapContainer" class="h-100"></div>
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
export default {
  data() {
    return {
      accessToken: "pk.eyJ1IjoicmFmbnVzcyIsImEiOiIzMVE1dnc0In0.3FNMKIlQ_afYktqki-6m0g",
      map: null,
      hoveredStateId: null,
      view: "Plan",
    };
  },
  methods: {},
  async mounted() {
    mapboxgl.accessToken = this.accessToken;

    let map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      bounds: [-180, -90, 180, 90], //turf.bbox(region_geojson),
      projection: "globe",
    });
    map.addControl(new mapboxgl.NavigationControl());

    await map.once("style.load");
    map.setFog({});
    map.addSource("mapbox-dem", {
      type: "raster-dem",
      url: "mapbox://mapbox.terrain-rgb",
    });
    map.setTerrain({
      source: "mapbox-dem",
      exaggeration: 5,
    });

    regions.forEach((r) => {
      if (r.route) {
        console.log(polyUtil.decode(r.route));
        map.addSource("route-" + r.region, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: polyUtil.decode(r.route).map((c) => [c[1], c[0]]),
                },
              },
            ],
          },
        });
        map.addLayer({
          id: "route-" + r.region,
          type: "line",
          source: "route-" + r.region,
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#ed6498",
            "line-width": 5,
            "line-opacity": 0.8,
          },
        });
      }

      r.highlights.forEach((h) => {
        new mapboxgl.Marker({
          color: r.color,
        })
          .setLngLat([h.lat, h.lon])
          .addTo(map);
      });
    });

    /*map.addSource("region_geojson", {
      type: "geojson",
      promoteId: "region",
      data: region_geojson,
    });
    map.addLayer({
      id: "region_geojson",
      type: "fill",
      source: "region_geojson",
      layout: {},
      paint: {
        "fill-color": "#0080ff",
        "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.5],
      },
    });

    map.on("mousemove", "region_geojson", (e) => {
      if (e.features.length > 0) {
        if (this.hoveredStateId !== null) {
          map.setFeatureState({ source: "region_geojson", id: this.hoveredStateId }, { hover: false });
        }
        this.hoveredStateId = e.features[0].id;
        map.setFeatureState({ source: "region_geojson", id: this.hoveredStateId }, { hover: true });
      }
    });
    map.on("mouseleave", "region_geojson", () => {
      if (this.hoveredStateId !== null) {
        map.setFeatureState({ source: "region_geojson", id: this.hoveredStateId }, { hover: false });
      }
      this.hoveredStateId = null;
    });
*/
    const size = 150;
    const pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

      // When the layer is added to the map,
      // get the rendering context for the map canvas.
      onAdd: function () {
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext("2d");
      },

      // Call once before every frame where the icon will be used.
      render: function () {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const context = this.context;

        // Draw the outer circle.
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
        context.fill();

        // Draw the inner circle.
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 100, 100, 1)";
        context.strokeStyle = "white";
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // Update this image's data with data from the canvas.
        this.data = context.getImageData(0, 0, this.width, this.height).data;

        // Continuously repaint the map, resulting
        // in the smooth animation of the dot.
        map.triggerRepaint();

        // Return `true` to let the map know that the image was updated.
        return true;
      },
    };

    map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

    map.addSource("dot-point", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-76.450331, 42.472841], // icon position [lng, lat]
            },
          },
        ],
      },
    });
    map.addLayer({
      id: "layer-with-pulsing-dot",
      type: "symbol",
      source: "dot-point",
      layout: {
        "icon-image": "pulsing-dot",
      },
    });
  },
};
</script>
