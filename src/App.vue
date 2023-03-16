<template>
  <b-container fluid class="h-100 bg-light">
    <b-row class="h-100">
      <b-col class="h-100 col-xs-12 md-6 col-lg-8 d-flex flex-column pr-0">
        <b-row>
          <b-col class="py-2">
            <b-card class="w-100 p-2 d-flex flex-row bg-beige andy flex-wrap" no-body>
              <b-img src="pikachu.png" height="100%;" />
              <div><b-img src="title.svg" height="100%;" /></div>
              <div class="d-flex align-items-center"><b-img src="pokeball.png" height="50%;" /></div>
              <div class="d-flex flex-column text-center pl-3">
                <div style="font-size: 1.2rem">LIFER#</div>
                <div class="life-count pokemon">{{ liferCount }}</div>
                <div>
                  <b-link variant="outline-primary" @click="openSpeciesChecklist(latestLifer[2])">
                    {{ latestLifer[1] }}
                  </b-link>
                </div>
              </div>
              <div class="d-flex flex-column text-center pl-3">
                <div class="h-50 align-items-center">
                  <b-img src="pokedex.png" height="50%;" />
                  {{ specieCount }}
                  espèce au compteur
                </div>
                <div class="h-50 align-items-center">
                  {{ formatNumber(individualCount) }}
                  Oiseaux comptés
                </div>
              </div>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="flex-grow-1">
          <b-col class="flex-grow-1">
            <b-card class="w-100 h-100" no-body>
              <l-map
                :bounds="[
                  [26, -72],
                  [50, -127],
                ]"
                ref="map"
              >
                <l-control>
                  <b-container class="control-ebird px-0">
                    <b-row>
                      <b-col class="text-center px-4">
                        <b-checkbox v-model="showChecklist" switch> Show eBird checklists </b-checkbox>
                      </b-col>
                    </b-row>
                    <div v-if="showChecklist && selectedChecklist.loc">
                      <b-list-group flush>
                        <b-list-group-item class="d-flex py-2">
                          <v-icon name="map-marker-alt" class="mr-2" />
                          {{ selectedChecklist.loc.name }}
                        </b-list-group-item>
                        <b-list-group-item class="d-flex py-2">
                          <b-icon icon="clock-fill" class="mr-2" />
                          {{ selectedChecklist.obsDt }}
                          {{ selectedChecklist.obsTime }}
                        </b-list-group-item>
                        <b-list-group-item class="d-flex py-2">
                          <v-icon name="dove" class="mr-2" />
                          {{ selectedChecklist.numSpecies }}
                        </b-list-group-item>
                        <b-list-group-item class="d-flex py-2">
                          <v-icon name="list-alt" class="mr-2" />
                          <b-link :href="'https://ebird.org/checklist/' + selectedChecklist.subId">
                            {{ selectedChecklist.subId }}
                          </b-link>
                        </b-list-group-item>
                      </b-list-group>
                    </div>
                  </b-container>
                </l-control>
                <l-tile-layer
                  :url="
                    'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=' + mapboxToken
                  "
                />
                <l-polyline
                  v-for="r in regions"
                  :key="r.region"
                  :lat-lngs="r.route"
                  :color="r.color"
                  :opacity="r.region == activeRegion ? 0.8 : 0.4"
                  :weight="6"
                />
                <template v-if="showChecklist">
                  <l-circle-marker
                    v-for="check in checklists"
                    :key="check.subID"
                    :lat-lng="[check.loc.lat, check.loc.lng]"
                    :weight="0"
                    fillColor="#4ca800"
                    :radius="5"
                    :fillOpacity="0.8"
                    @click="selectedChecklist = check"
                  />
                </template>
                <!--<l-marker
                v-for="(h, i) in activeHighlights"
                :key="h.name"
                :lat-lng="[h.lat, h.lon]"
                :icon="getIcon(h, i + 1)"
              ></l-marker>-->
                <l-polyline :lat-lngs="locations" color="black" :weight="1" />
                <!--<l-polyline :lat-lngs="locations2" color="red" :weight="2" />-->
                <l-marker
                  v-for="(p, i) in posts"
                  :key="p.title"
                  :lat-lng="[p.lat, p.lon]"
                  :icon="getIcon(p, i + 1)"
                  @click="i_post = i"
                />
                <l-marker
                  v-if="locations.length > 0 && locations[locations.length - 1]"
                  :lat-lng="locations[locations.length - 1]"
                  :zIndexOffset="100"
                  @click="map.flyTo(locations[locations.length - 1], 14)"
                >
                  <l-icon icon-url="/logo.svg" :icon-size="[104, 40]" :icon-anchor="[52, 20]" />
                </l-marker>
              </l-map>
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
            </b-card>
          </b-col>
        </b-row>
        <b-row class="py-2" v-if="false">
          <Photos />
        </b-row>
      </b-col>
      <b-col class="h-100 col-xs-12 md-6 col-lg-4 py-2">
        <b-card v-if="posts[i_post]" no-body class="h-100">
          <div
            class="card-header text-light"
            :style="{ backgroundColor: regions.find((r) => r.region == posts[i_post].region).color }"
          >
            <div class="d-flex py-2">
              <b-icon
                icon="chevron-left"
                @click="i_post = Math.max(i_post - 1, 0)"
                class="cursor-pointer"
                :disabled="i_post == 0"
              />
              <h1 class="cursor-pointer">{{ posts[i_post].title }}</h1>
              <b-icon
                icon="chevron-right"
                class="cursor-pointer"
                @click="i_post = Math.min(i_post + 1, posts.length - 1)"
                :disabled="i_post == posts.length"
              />
            </div>
            <div class="d-flex justify-content-between">
              <div><b-icon icon="person-lines-fill"></b-icon> {{ posts[i_post].author }}</div>
              <div><b-icon icon="calendar-date-fill"></b-icon> {{ posts[i_post].date }}</div>
              <div>
                <b-icon icon="geo-alt-fill"></b-icon>
                {{ posts[i_post].location }}
              </div>
              <div>
                <b-icon :icon="posts[i_post].weather"></b-icon>
              </div>
            </div>
          </div>
          <b-card-body class="overflow-auto">
            <b-card-text>
              <h4>{{ posts[i_post].subtitle }}</h4>
            </b-card-text>
            <b-card-text>
              {{ posts[i_post].text1 }}
            </b-card-text>
            <b-card-img :src="posts[i_post].photo1"></b-card-img>
            <b-card-text>
              {{ posts[i_post].text2 }}
            </b-card-text>
            <b-card-img :src="posts[i_post].photo2"></b-card-img>
            <b-card-text>
              {{ posts[i_post].text3 }}
            </b-card-text>
            <b-card-img :src="posts[i_post].photo3"></b-card-img>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script setup>
import regionsJson from "./assets/regions.json";
import past_checklists from "./assets/checklists.json";
import past_taxon from "./assets/taxon-list.json";
</script>

<script>
const google_api_key = "AIzaSyCaVWdIpSvq8BoF7PvEK4oY3LByPYTQ2Xs";
const live_tripreport_id = 86087;

import polyUtil from "polyline-encoded";
import {
  LMap,
  LTileLayer,
  LPolyline,
  LMarker,
  LIcon,
  LCircleMarker,
  LLayerGroup,
  LControlLayers,
  LControl,
} from "vue2-leaflet";
import Photos from "./Photos.vue";

export default {
  components: {
    LMap,
    LTileLayer,
    LPolyline,
    LMarker,
    LIcon,
    Photos,
    LCircleMarker,
    LLayerGroup,
    LControlLayers,
    LControl,
  },
  data() {
    return {
      mapboxToken: "pk.eyJ1IjoicmFmbnVzcyIsImEiOiIzMVE1dnc0In0.3FNMKIlQ_afYktqki-6m0g",
      map: null,
      activeRegion: "midwest",
      regions: regionsJson.map((r) => {
        r.route = polyUtil.decode(r.route);
        return r;
      }),
      checklists: [],
      posts: [],
      i_post: 0,
      selectedChecklist: {},
      locations: [],
      locations2: [],
      latestLifer: "",
      taxon: [],
      showChecklist: false,
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
    async loadLocations() {
      const response = await fetch("http://farwest-locations.raphaelnussbaumer.com/locations.csv");
      const text = await response.text();
      const rows = text.trim().split("\n");
      let locations = rows.map((row) => {
        const [lat, lon, time] = row.split(",");
        return { time: parseInt(time), lat: parseFloat(lat), lon: parseFloat(lon) };
      });
      this.locations2 = locations.map((l) => [l.lat, l.lon]);
      locations = detectOutliers(locations, 2, 2);
      locations = locations.map((l) => [l.lat, l.lon]);
      locations = filterLatLngArray(locations, 1 / 111 / 100);
      this.locations = locations;
    },
    async openSpeciesChecklist(spCode) {
      const response = await fetch(
        "http://tripreport.raphaelnussbaumer.com/tripreport-internal/v1/taxon-detail/" +
          live_tripreport_id +
          "/" +
          spCode
      );
      const json = await response.json();
      const check = json.checklists.reduce((acc, current) => {
        return current.obsDt < acc.obsDt ? current : acc;
      }, json.checklists[0]);

      const url = "https://ebird.org/checklist/" + check.subId + "#" + spCode;
      window.open(url, "_blank");
    },
    formatNumber(num) {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
      } else {
        return num.toString();
      }
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
    liferCount() {
      try {
        return this.taxon.filter((t) => t.isLifer & (t.category == "species")).length;
      } catch (error) {
        return null;
      }
    },
    specieCount() {
      try {
        return this.taxon.filter((t) => t.category == "species").length;
      } catch (error) {
        return null;
      }
    },
    individualCount() {
      try {
        return this.taxon.reduce((acc, t) => acc + t.numIndividuals, 0);
      } catch (error) {
        return null;
      }
    },
  },
  created: function () {
    this.loadLocations();

    // Checklsit
    fetch("http://tripreport.raphaelnussbaumer.com/tripreport-internal/v1/checklists/" + live_tripreport_id)
      .then((response) => response.json())
      .then((data) => {
        this.checklists = [...past_checklists, ...data];
      })
      .catch((error) => console.error(error));

    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/12VqL_Epf2l6NnHHQM3Osd_3nh0h61bPvD66uCSsPAXg/values/A1:Z100?key=" +
        google_api_key
    )
      .then((response) => response.json())
      .then((data) => {
        const rows = data.values.slice(1);

        this.posts = rows
          .map((row) => {
            return {
              title: row[1],
              text1: row[2],
              cover: row[3] ? row[3].replace("open?", "uc?export=view&") : "",
              date: row[4],
              lon: parseFloat(row[5].split(", ")[1]) || null,
              lat: parseFloat(row[5].split(", ")[0]) || null,
              author: row[6],
              photo1: row[7] ? row[7].replace("open?", "uc?export=view&") : "",
              photo3: row[8] ? row[8].replace("open?", "uc?export=view&") : "",
              text2: row[9],
              weather: row[10],
              subtitle: row[11],
              text3: row[12],
              photo2: row[13] ? row[13].replace("open?", "uc?export=view&") : "",
              location: row[14],
              region: row[15],
            };
          })
          .sort((a, b) => a.date - b.date);
      })
      .catch((error) => console.error(error));

    // Taxon
    fetch("http://tripreport.raphaelnussbaumer.com/tripreport-internal/v1/taxon-list/" + live_tripreport_id)
      .then((response) => response.json())
      .then((data) => {
        this.taxon = [...past_taxon, ...data].reduce((acc, curr) => {
          const foundIndex = acc.findIndex((item) => item.speciesCode === curr.speciesCode);
          if (foundIndex !== -1) {
            acc[foundIndex].numIndividuals += curr.numIndividuals;
            acc[foundIndex].numChecklists += curr.numChecklists;
            acc[foundIndex].numPhotos += curr.numPhotos;
            acc[foundIndex].numAudio += curr.numAudio;
            acc[foundIndex].numVideo += curr.numVideo;
            acc[foundIndex].numMedia += curr.numMedia;
            acc[foundIndex].isLifer = acc[foundIndex].isLifer || curr.isLifer;
          } else {
            acc.push(curr);
          }
          return acc;
        }, []);
      })
      .catch((error) => console.error(error));

    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/1tJUNjqhX6L7bXPapc1VMyymRk9KbMjARpWB24J2tbK4/values/Sheet3!A1:C1?key=" +
        google_api_key
    )
      .then((response) => response.json())
      .then((data) => {
        this.latestLifer = data.values[0];
      })
      .catch((error) => console.error(error));
  },
  mounted() {
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject; // work as expected
    });
  },
};

function detectOutliers(data, halfWindowSize, threshold) {
  // Create an empty array to store the outliers
  const outliers = [];

  // Loop through the data points
  for (let i = halfWindowSize; i < data.length - halfWindowSize - 1; i++) {
    // Get the current window of data
    const window = data.slice(i - halfWindowSize, i + halfWindowSize);

    // Check that the temporal is the same
    const arr = window.map((d) => d.time);
    const differences = arr.slice(1).map((currentValue, index) => currentValue - arr[index]);
    if (Math.max(...differences) - Math.min(...differences) > 5) {
      continue;
    }

    // Calculate the median latitude and longitude
    const latitudes = window.map((d) => d.lat);
    const longitudes = window.map((d) => d.lon);
    const medianLatitude = median(latitudes);
    const medianLongitude = median(longitudes);

    // Calculate the median absolute deviation (MAD) for latitude and longitude
    const latDeviations = latitudes.map((d) => Math.abs(d - medianLatitude));
    const longDeviations = longitudes.map((d) => Math.abs(d - medianLongitude));
    const latMAD = median(latDeviations);
    const longMAD = median(longDeviations);

    // Calculate the upper and lower bounds for latitude and longitude
    const upperLatBound = medianLatitude + threshold * latMAD;
    const lowerLatBound = medianLatitude - threshold * latMAD;
    const upperLongBound = medianLongitude + threshold * longMAD;
    const lowerLongBound = medianLongitude - threshold * longMAD;

    // Check if any points in the window fall outside the bounds
    if (
      data[i].lat > upperLatBound ||
      data[i].lat < lowerLatBound ||
      data[i].lon > upperLongBound ||
      data[i].lon < lowerLongBound
    ) {
      outliers.push(i);
    }
  }

  return data.filter((x, id) => {
    return !outliers.includes(id);
  });
}

function median(values) {
  values.sort((a, b) => a - b);
  const half = Math.floor(values.length / 2);
  if (values.length % 2 === 0) {
    return (values[half - 1] + values[half]) / 2;
  } else {
    return values[half];
  }
}

function filterLatLngArray(array, threshold) {
  return array.reduce((accumulator, currentValue, currentIndex, array) => {
    if (currentIndex === 0 || currentIndex === array.length - 1) {
      accumulator.push(currentValue);
    } else {
      let prevLatLng = array[currentIndex - 1];
      let nextLatLng = array[currentIndex + 1];
      let prevDistance = getDistanceFromLatLng(prevLatLng[0], prevLatLng[1], currentValue[0], currentValue[1]);
      let nextDistance = getDistanceFromLatLng(currentValue[0], currentValue[1], nextLatLng[0], nextLatLng[1]);

      if (prevDistance > threshold || nextDistance > threshold) {
        let prevnextDistance = getDistanceFromLatLng(prevLatLng[0], prevLatLng[1], nextLatLng[0], nextLatLng[1]);
        if (2 * prevnextDistance > prevDistance || 2 * prevnextDistance > nextDistance) {
          accumulator.push(currentValue);
        }
      }
    }
    return accumulator;
  }, []);
}

function getDistanceFromLatLng(lat1, lng1, lat2, lng2) {
  // Calculation of distance between two latitude-longitude pairs
  // You can use any formula here, for example Haversine formula
  // This example uses the Pythagorean theorem approximation
  let distance = Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lng2 - lng1, 2));
  return distance;
}
</script>
