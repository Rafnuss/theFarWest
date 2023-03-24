<template>
  <b-container fluid class="h-100 bg-light">
    <b-row class="h-100">
      <b-col class="h-100 col-xs-12 md-6 col-lg-4 d-flex flex-column py-2">
        <b-row>
          <b-col class="pb-2">
            <b-card class="w-100 p-2 d-flex flex-row flex-wrap align-items-center" no-body style="gap: 0.5rem">
              <b-img src="logo.svg" height="64px" class="mx-auto" />
              <div class="mx-auto">
                <b-form-radio-group
                  class="bg-light"
                  v-model="modeSelected"
                  :options="modeOptions"
                  button-variant="outline-primary"
                  buttons
                  size="sm"
                />
              </div>
            </b-card>
          </b-col>
        </b-row>
        <b-card v-if="modeSelected == 'live'" no-body class="flex-grow-1 overflow-hidden">
          <div class="card-header text-light px-0 bg-primary">
            <div class="d-flex justify-content-between align-items-center px-1">
              <b-icon
                icon="chevron-left"
                @click="i_post = Math.max(i_post - 1, 0)"
                :class="i_post == 0 ? 'opacity-0' : 'cursor-pointer'"
              />
              <div class="w-100 px-2">
                <h2 class="flex-stretch mb-0 text-left">{{ posts[i_post].title }}</h2>
                <div class="d-flex justify-content-between align-items-center">
                  <!--
                  <b-icon icon="person-lines-fill"></b-icon>
                <b-icon icon="calendar-date-fill"></b-icon>
                -->
                  <small>
                    par {{ posts[i_post].author }},
                    {{
                      posts[i_post].date.toLocaleString("FR", { weekday: "long" }) +
                      " " +
                      posts[i_post].date.getDate() +
                      " " +
                      posts[i_post].date.toLocaleString("FR", { month: "long" })
                    }}
                  </small>
                  <b-button
                    variant="outline-light"
                    size="sm"
                    @click="map.flyTo([posts[i_post].lat, posts[i_post].lon], 12)"
                    v-b-tooltip.hover="'Voir sur la carte'"
                  >
                    <b-icon icon="geo-alt-fill"></b-icon>
                    {{ posts[i_post].location }}
                  </b-button>
                </div>
              </div>
              <b-icon
                icon="chevron-right"
                :class="(i_post == posts.length - 1 ? 'opacity-0' : 'cursor-pointer') + ' ml-auto'"
                @click="i_post = Math.min(i_post + 1, posts.length - 1)"
              />
            </div>
          </div>
          <b-card-body class="overflow-auto flex-grow-1">
            <b-card-text>
              <h4>{{ posts[i_post].subtitle }}</h4>
            </b-card-text>
            <b-card-text>
              {{ posts[i_post].text1 }}
            </b-card-text>
            <b-card-img v-if="posts[i_post].photo1" :src="posts[i_post].photo1" class="mb-1"></b-card-img>
            <b-card-text>
              {{ posts[i_post].text2 }}
            </b-card-text>
            <b-card-img v-if="posts[i_post].photo2" :src="posts[i_post].photo2" class="mb-1"></b-card-img>
            <b-card-text>
              {{ posts[i_post].text3 }}
            </b-card-text>
            <b-card-img v-if="posts[i_post].photo3" :src="posts[i_post].photo3" class="mb-1"></b-card-img>
          </b-card-body>
          <b-card-footer class="d-flex justify-content-between align-items-center bg-primary text-white">
            <div>
              <b-icon :icon="posts[i_post].weather"></b-icon>
            </div>
            <b-button
              size="sm"
              variant="outline-light"
              :href="
                'https://dashboard.birdcast.info/region/' + posts[i_post].ebirdcode + '?night=' + posts[i_post].dateISO
              "
              target="_blank"
              v-b-tooltip.hover="'Conditions de migration observées par les radars météo'"
            >
              <b-img src="birdcast.svg" class="h-16" />
            </b-button>
          </b-card-footer>
        </b-card>
        <b-card
          v-if="(modeSelected == 'route') & (regions[i_region] != null)"
          no-body
          class="flex-grow-1 overflow-hidden"
        >
          <div class="card-header text-light" :style="{ backgroundColor: regions[i_region].color }">
            <div class="d-flex justify-content-between align-items-center py-2">
              <b-icon
                icon="chevron-left"
                @click="i_region = Math.max(i_region - 1, 0)"
                :class="i_region == 0 ? 'opacity-0' : 'cursor-pointer'"
              />
              <div class="d-flex">
                <b-img :src="regions[i_region].region + '.png'" class="mr-2" style="height: 2.5rem" />
                <h1 class="cursor-pointer mb-0">{{ regions[i_region].name }}</h1>
              </div>
              <b-icon
                icon="chevron-right"
                :class="i_region == max_region ? 'opacity-0' : 'cursor-pointer'"
                @click="i_region = Math.min(i_region + 1, max_region)"
              />
            </div>
          </div>
          <b-card-body class="overflow-auto flex-grow-1">
            <Presentation :region="regions[i_region].region" />
            <h3>Espèces cibles</h3>
            <b-table
              hover
              small
              responsive
              :fields="[
                { key: 'seen', label: '', class: 'text-center' },
                { key: 'common_name', label: 'Nom commun', sortable: true },
                { key: 'prob_region', label: 'Difficulté', sortable: true, class: 'text-center' },
              ]"
              :items="species_list_table"
            >
              <template #cell(seen)="sp">
                <template v-if="sp.value">
                  <b-icon icon="check-square" variant="success" />
                </template>
                <template v-else>
                  <b-icon icon="square" />
                </template>
              </template>

              <template #cell(common_name)="sp">
                <b-link
                  :href="'https://ebird.org/species/' + sp.item.species_code + '/' + regions[i_region].ebirdcode"
                  target="_blank"
                >
                  {{ sp.value }}
                </b-link>
                <template v-if="sp.item.exotic.length > 0">
                  <b-img :src="'exotic_' + sp.item.exotic + '.png'" class="h-16" v-b-modal.modal-exotic />
                </template>
                <b-badge
                  v-if="(sp.item.aba >= 3) & (sp.item.aba <= 6)"
                  :class="'ml-2 font-weight-normal bg-aba-' + sp.item.aba"
                  v-b-modal.modal-aba
                >
                  ABA-{{ sp.item.aba }}
                </b-badge>
                <b-link
                  :href="
                    'https://media.ebird.org/catalog?taxonCode=' +
                    sp.item.species_code +
                    '&sort=rating_rank_desc&userId=USER497615'
                  "
                  target="_blank"
                  v-if="sp.item.hasMedia | !sp.item.media_lifer"
                >
                  <b-icon class="ml-1" icon="camera" v-b-tooltip.hover="'Voir nos photos de cette espèces'" />
                </b-link>
              </template>
              <template #cell(prob_region)="sp">
                <b-icon
                  icon="binoculars-fill"
                  v-b-tooltip.hover="'Probabilité d\'observation régionale: ' + sp.value + '%'"
                  :variant="sp.value > 3 ? 'success' : sp.value > 1 ? 'warning' : 'danger'"
                />
              </template>
            </b-table>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col class="h-100 col-xs-12 md-6 col-lg-8 d-flex flex-column py-2">
        <b-row>
          <b-col class="pb-2">
            <b-card class="w-100 p-2 d-flex flex-row justify-content-around bg-primary flex-wrap text-light" no-body>
              <div
                class="bg-secondary text-white d-flex flex-column text-center align-self-start px-3 py-2 rounded-bottom"
                style="margin-top: -0.5rem; box-shadow: 3px 3px 4px 2px rgba(0, 0, 0, 0.2)"
              >
                <div>JOUR#</div>
                <div class="d-flex flex-row">
                  <div class="pokemon" style="font-size: 3rem">
                    {{ Math.floor((new Date() - new Date("2023-03-29")) / (1000 * 60 * 60 * 24)) }}
                  </div>
                </div>
              </div>
              <div class="d-flex flex-column text-center">
                <div style="font-size: 1.2rem">LIFER US#</div>
                <div class="d-flex flex-row align-items-center">
                  <div class="d-flex mr-3">
                    <IconBase class="" name="pokeball" width="50" height="50" />
                  </div>
                  <div class="pokemon" style="font-size: 6rem; line-height: 0.8">{{ USliferCount }}</div>
                </div>
                <div>
                  <small> dernière addition: </small>
                  <b-link class="text-secondary" @click="openSpeciesChecklist(latestLifer[2])">
                    {{ latestLifer[1] }}
                  </b-link>
                </div>
              </div>
              <div class="d-flex flex-column justify-content-around">
                <!--<div class="align-items-center">
                  {{ liferCount() }}
                  Lifer#
                </div>-->
                <div class="d-flex flex-row align-items-center">
                  <IconBase name="pokedex-outline" width="40" height="40" />
                  <div class="d-flex flex-column justify-content-center px-2">
                    <h2 class="pokemon mb-0 mt-2" style="font-size: 2.3rem; line-height: 0.8">{{ specieCount }}</h2>
                    Espèces pour le trip
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center">
                  <IconBase name="count" width="40" height="40" />
                  <div class="d-flex flex-column justify-content-center px-2">
                    <h2 class="pokemon mb-0 mt-2" style="font-size: 2.3rem; line-height: 0.8">
                      {{ numberWithSpaces(individualCount) }}
                    </h2>
                    Oiseaux comptés
                  </div>
                </div>
              </div>
              <div class="d-flex flex-column">
                <strong>EXPLORER D'AVANTAGE</strong>
                <a class="text-secondary" :href="'https://ebird.org/tripreport/' + live_tripreport_id" target="_blank">
                  eBird Trip Report
                </a>
                <a
                  class="text-secondary"
                  href="https://media.ebird.org/catalog?searchField=user&userId=USER497615&sort=rating_rank_desc&unconfirmed=incl&regionCode=US&beginMonth=4&endMonth=12&beginYear=2023&endYear=2023"
                  target="_blank"
                >
                  Photos d'oiseaux
                </a>
                <a v-b-modal.modal-full-list href="#" class="text-secondary">Liste cibles US</a>
                <b-modal id="modal-full-list" scrollable title="Full Target Species List" size="xl" hide-footer>
                  <TableSpecies :regions="regions" />
                </b-modal>
                <a
                  v-if="locations.length > 0"
                  :href="
                    'https://alert.birdcast.info/?latLng=' +
                    locations[locations.length - 1][0] +
                    ',' +
                    locations[locations.length - 1][1] +
                    '&locName=Exactly%20where%20Améline,%20Mady%20and%20Raphaël%20are!'
                  "
                  target="_blank"
                  class="d-flex align-items-baseline text-secondary"
                >
                  <div class="mr-2">Prévision de migration</div>
                  <!--<b-img src="birdcast.svg" class="h-16" />-->
                </a>
              </div>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="flex-grow-1">
          <b-col class="flex-grow-1">
            <b-card class="w-100 h-100" no-body>
              <b-button-group class="w-100 text-light" v-if="modeSelected == 'route'">
                <b-button
                  variant="outline-light"
                  squared
                  v-for="(r, i) in regions"
                  :key="r.region"
                  :style="{ 'background-color': r.color, 'border-color': r.color }"
                  :class="[i == i_region ? '' : 'opacity-50', r.active ? 'cursor-pointer' : 'cursor-not-allowed']"
                  @click="i_region = i"
                  :disabled="!r.active"
                >
                  <b-img :src="r.region + '.png'" class="mr-2 h-16" />
                  {{ r.name }}
                </b-button>
              </b-button-group>
              <l-map ref="map" style="min-height: 300px">
                <l-control>
                  <b-container class="control-ebird px-0">
                    <b-row>
                      <b-col class="text-center px-4 d-flex align-items-center">
                        <b-form-checkbox v-model="showChecklist" id="switch_1" switch />
                        <label for="switch_1" class="mb-0">Afficher les listes eBird</label>
                      </b-col>
                    </b-row>
                    <div v-if="showChecklist && selectedChecklist.loc">
                      <b-list-group flush>
                        <b-list-group-item class="d-flex py-2">
                          <b-icon icon="geo-alt-fill" class="mr-2" />
                          {{ selectedChecklist.loc.name }}
                        </b-list-group-item>
                        <b-list-group-item class="d-flex py-2">
                          <b-icon icon="clock-fill" class="mr-2" />
                          {{ selectedChecklist.obsDt }}
                          {{ selectedChecklist.obsTime }}
                        </b-list-group-item>
                        <b-list-group-item class="d-flex py-2">
                          <b-img src="bird-checklist.png" class="mr-2 h-16" />
                          {{ selectedChecklist.numSpecies }}
                        </b-list-group-item>
                        <b-list-group-item class="d-flex py-2">
                          <b-icon icon="card-checklist" class="mr-2" />
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
                <template v-if="(modeSelected == 'route') & (route.length > 0)">
                  <l-polyline
                    v-for="(r, i) in route"
                    :key="r.region"
                    :lat-lngs="r.route"
                    :color="r.color"
                    :opacity="i == i_region ? 0.8 : 0.4"
                    :weight="6"
                    @click="i_region = i"
                  />
                </template>
                <template v-if="showChecklist">
                  <l-circle-marker
                    v-for="check in checklists.filter((d) => d.loc.name != d.loc.subnational2Name)"
                    :key="check.subID"
                    :lat-lng="[check.loc.lat, check.loc.lng]"
                    :weight="0"
                    fillColor="#4ca800"
                    :radius="5"
                    :fillOpacity="0.8"
                    @click="selectedChecklist = check"
                  />
                </template>
                <l-polyline v-if="locations.length > 0" :lat-lngs="locations" color="black" :weight="1" />
                <!--<l-polyline :lat-lngs="locations2" color="red" :weight="2" />-->
                <template v-if="modeSelected == 'live'">
                  <l-marker
                    v-for="(p, i) in posts"
                    :key="p.title"
                    :lat-lng="[p.lat, p.lon]"
                    :icon="getIcon(p, i + 1)"
                    @click="i_post = i"
                  />
                </template>
                <l-marker
                  v-if="locations.length > 0 && locations[locations.length - 1]"
                  :lat-lng="locations[locations.length - 1]"
                  :zIndexOffset="100"
                  @click="map.flyTo(locations[locations.length - 1], 14)"
                >
                  <l-icon :icon-anchor="[35, 35]">
                    <IconBase class="text-dark" name="car" width="70" height="70" />
                  </l-icon>
                </l-marker>
              </l-map>
            </b-card>
          </b-col>
        </b-row>
        <b-row v-if="true">
          <Photos />
        </b-row>
      </b-col>
    </b-row>
    <Modal />
  </b-container>
</template>
<script setup>
import route_json from "./assets/route.json";
import past_checklists from "./assets/checklists.json";
import past_taxon from "./assets/taxon-list.json";
import species_list from "./assets/species_list.json";
import regions from "./assets/regions.json";
</script>

<script>
import Photos from "./Photos.vue";
import TableSpecies from "./TableSpecies.vue";
import Modal from "./Modal.vue";
import Presentation from "./Presentation.vue";
import IconBase from "./IconBase.vue";

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
    TableSpecies,
    Modal,
    Presentation,
    IconBase,
  },
  data() {
    return {
      live_tripreport_id: 114024,
      google_api_key: "AIzaSyCaVWdIpSvq8BoF7PvEK4oY3LByPYTQ2Xs",
      mapboxToken: "pk.eyJ1IjoicmFmbnVzcyIsImEiOiIzMVE1dnc0In0.3FNMKIlQ_afYktqki-6m0g",
      map: null,
      regions: regions,
      max_region: regions.reduce((acc, r) => (r.active ? acc + 1 : acc), 0) - 1,
      i_region: regions.reduce((acc, r) => (r.active ? acc + 1 : acc), 0) - 1,
      modeSelected: "live",
      modeOptions: [
        { text: "Suivez-nous live", value: "live" },
        { text: "Découvrez le parcours", value: "route" },
      ],
      route: route_json.map((s) => {
        s.route = polyUtil.decode(s.route);
        s.color = regions.find((r) => r.region == s.region).color;
        return s;
      }),
      checklists: [],
      selectedChecklist: {},
      posts: [
        {
          title: "",
          text1: "",
          cover: "",
          date: new Date(),
          lon: 0,
          lat: 0,
          author: "",
          photo1: "",
          photo3: "",
          text2: "",
          weather: "",
          subtitle: "",
          text3: "",
          photo2: "",
          location: "",
          region: "",
          color: regions[0].color,
          ebirdcode: "",
        },
      ],
      i_post: 0,
      locations: [],
      locations2: [],
      latestLifer: "",
      taxon: [],
      showChecklist: false,
      species_list: species_list,
      USliferCount: 0,
      USliferCountInterval: false,
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
      this.map.setView(locations[locations.length - 1], 14);
    },
    async openSpeciesChecklist(spCode) {
      fetch(
        "http://tripreport.raphaelnussbaumer.com/tripreport-internal/v1/taxon-detail/" +
          this.live_tripreport_id +
          "/" +
          spCode
      )
        .then((response) => response.json())
        .then((json) => {
          const check = json.checklists.reduce((acc, current) => {
            return current.obsDt < acc.obsDt ? current : acc;
          }, json.checklists[0]);
          const url = "https://ebird.org/checklist/" + check.subId + "#" + spCode;
          window.open(url, "_blank");
        })
        .catch((error) => console.error(error));
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
    numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    liferCount() {
      return 1839 + this.taxon.filter((t) => t.isLifer & (t.category == "species")).length;
    },
    animateUSliferCount(lifer) {
      clearInterval(this.USliferCountInterval);
      if (lifer == this.USliferCount) {
        return;
      }
      this.USliferCountInterval = window.setInterval(
        function () {
          if (this.USliferCount != lifer) {
            var change = (lifer - this.USliferCount) / 10;
            change = change >= 0 ? Math.ceil(change) : Math.floor(change);
            this.USliferCount = this.USliferCount + change;
          }
        }.bind(this),
        30
      );
    },
  },
  computed: {
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
    species_list_table() {
      return this.species_list
        .filter((s) => s.target && s.region.includes(this.regions[this.i_region].region))
        .map((s) => {
          s.prob_region = s.prob[this.i_region];
          return s;
        });
    },
  },
  created: function () {
    this.loadLocations();

    // Checklsit
    fetch("http://tripreport.raphaelnussbaumer.com/tripreport-internal/v1/checklists/" + this.live_tripreport_id)
      .then((response) => response.json())
      .then((data) => {
        this.checklists = [...past_checklists, ...data];
      })
      .catch((error) => console.error(error));

    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/12VqL_Epf2l6NnHHQM3Osd_3nh0h61bPvD66uCSsPAXg/values/A1:Z100?key=" +
        this.google_api_key
    )
      .then((response) => response.json())
      .then((data) => {
        const rows = data.values.slice(1);
        this.posts = rows
          .map((row) => {
            let r = {
              title: row[1],
              text1: row[2],
              cover: row[3] ? row[3].replace("open?", "uc?export=view&") : "",
              date: new Date(row[4].split("/")[2], row[4].split("/")[1] - 1, row[4].split("/")[0]),
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
              color: this.regions.find((r) => r.region == row[15]).color,
              color2: this.regions.find((r) => r.region == row[15]).color2,
              ebirdcode: this.regions.find((r) => r.region == row[15]).ebirdcode,
            };
            r.dateISO = r.date.getMonth() + "-" + r.date.getDate() + "-" + r.date.getFullYear();
            return r;
          })
          .sort((a, b) => a.date - b.date);
        this.i_post = this.posts.length - 1;
      })
      .catch((error) => console.error(error));

    // Taxon
    fetch("http://tripreport.raphaelnussbaumer.com/tripreport-internal/v1/taxon-list/" + this.live_tripreport_id)
      .then((response) => response.json())
      .then((data) => {
        // Add new taxon from latest tripreport
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
        const spcode = this.taxon.map((t) => t.speciesCode);
        const spmedia = this.taxon.map((t) => t.numMedia);
        this.species_list = this.species_list.map((sp) => {
          const id = spcode.findIndex((s) => s == sp.species_code);
          sp.seen = id > 0;
          sp.hasMedia = sp.seen ? spmedia[id] : 0;
          return sp;
        });
        let uslifercount = this.species_list.filter((sp) => (!sp.US_lifer | sp.seen) & (sp.exotic != "X")).length;
        //Lilac-crowned Parrot exotic in florida but P in california
        uslifercount = uslifercount - 2;
        this.animateUSliferCount(uslifercount);
      })
      .catch((error) => console.error(error));

    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/1tJUNjqhX6L7bXPapc1VMyymRk9KbMjARpWB24J2tbK4/values/Sheet3!A1:C1?key=" +
        this.google_api_key
    )
      .then((response) => response.json())
      .then((data) => {
        this.latestLifer = data.values[0];
      })
      .catch((error) => console.error(error));
  },
  mounted() {
    /*this.$nextTick(() => {
      this.map = this.$refs.map.mapObject; // work as expected
    });*/
    this.map = this.$refs.map.mapObject; // work as expected
  },
  watch: {
    modeSelected(val) {
      if (val == "route") {
        this.map.fitBounds([
          [26, -72],
          [50, -127],
        ]);
      } else {
        this.map.setView(this.locations[this.locations.length - 1], 14);
      }
    },
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
