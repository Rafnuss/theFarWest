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
        <b-card v-if="modeSelected == 'live' && posts.length > 0" no-body class="flex-grow-1 overflow-hidden">
          <div class="card-header text-light px-0 bg-primary">
            <div class="d-flex justify-content-between align-items-center px-1">
              <div class="w-100 px-2">
                <h2 class="flex-stretch mb-0 text-left">{{ posts[i_post].title }}</h2>
                <div class="d-flex justify-content-between align-items-center">
                  <small>
                    {{ posts[i_post].author }},
                    {{
                      posts[i_post].date.toLocaleString("FR", { weekday: "long" }) +
                      " " +
                      posts[i_post].date.getDate() +
                      " " +
                      posts[i_post].date.toLocaleString("FR", { month: "long" })
                    }}
                    <b-icon v-if="posts[i_post].weather" :icon="posts[i_post].weather"></b-icon>
                  </small>
                  <b-button
                    variant="outline-light"
                    size="sm"
                    @click="map.flyTo([posts[i_post].lat, posts[i_post].lon], 12)"
                    v-b-tooltip.hover="'Voir sur la carte'"
                    :style="{ backgroundColor: post2region(i_post).color }"
                  >
                    <b-img :src="post2region(i_post).region + '.png'" class="mr-1" style="height: 1rem" />
                    {{ posts[i_post].location }}, {{ post2region(i_post).name }}
                  </b-button></div>
              </div>
            </div>
          </div>
          <b-card-body class="overflow-auto flex-grow-1">
            <span v-html="posts[i_post].content" />
            <div v-if="posts[i_post].newsView">
              <template v-if="!newsView">
                <p>
                  <a href="#" @click.prevent v-b-modal.modal-defis>
                    Merci pour tous les défis que vous m'avez donné pour m'occuper pendant ce voyage ! J'ai fait de bons
                    progrès mais je travaille encore sur quelques uns.
                  </a>
                </p>
                <h4>A mon tour de vous mettre au défi !</h4>
                <p>
                  J'ai un message à vous communiquer, mais d'abord, il faut que vous appreniez à décoder mon language.
                  Associez le bon mot à chacune des mes expressions !
                </p>
                <b-list-group>
                  <b-list-group-item v-for="(e, i) in game" :key="e.audio">
                    <audio controls preload="none" class="w-100">
                      <source :src="baseUrl + 'mots_mady/' + e.audio + '.mp3'" type="audio/mpeg" />
                    </audio>
                    <b-form-select v-model="game_selected[i]" :options="game_options" size="sm"></b-form-select>
                  </b-list-group-item>
                </b-list-group>
                <b-button @click="checkNews" class="w-100 mt-2">Vérifier</b-button>
                <b-button
                  @click="showNews"
                  variant="link"
                  class="mt-2 w-100"
                  size="sm"
                >
                  J'abandonne. Désolé Mady, je ne te comprends pas !
                </b-button>
                <b-alert show variant="danger" class="mt-2" v-if="newsTry > 0">
                  <h4 class="alert-heading">Nope ! Essai: {{ newsTry }}</h4>
                  <p>Pas tout à fait juste !</p>
                </b-alert>
              </template>
              <template v-else>
                <b-alert show variant="success">
                  <h4 class="alert-heading">Bravo !</h4>
                  <p>
                    Maintenant que vous arrivez à décoder mon language, je peux vous révéler une info scoop :
                    <audio controls class="w-100 mt-4">
                      <source :src="baseUrl + 'mots_mady/bebe_maman.mp3'" type="audio/mpeg" />
                    </audio>
                  </p>
                </b-alert>
              </template>
            </div>
          </b-card-body>
          <b-card-footer class="w-100 p-0">
            <b-input-group>
              <template #prepend>
                <b-button @click="goToPost(i_post - 1)" variant="primary" aria-label="Article précédent">
                  <b-icon icon="chevron-left" />
                </b-button>
              </template>
              <b-form-select
                v-model="i_post"
                :options="
                  posts.map((p, i) => {
                    return { value: i, text: i + 1 + '. ' + p.title };
                  })
                "
              />
              <template #append>
                <b-button @click="goToPost(i_post + 1)" variant="primary" aria-label="Article suivant">
                  <b-icon icon="chevron-right" />
                </b-button>
              </template>
            </b-input-group>
          </b-card-footer>
        </b-card>
        <b-card
          v-if="modeSelected == 'route' && regions[i_region] != null"
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
              <div class="d-flex align-items-center">
                <b-img :src="regions[i_region].region + '.png'" class="mr-2" style="height: 2rem" />
                <h2 class="cursor-pointer mb-0">{{ regions[i_region].name }}</h2>
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
                  v-if="sp.item.aba >= 3 && sp.item.aba <= 6"
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
                  v-if="sp.item.hasMedia || !sp.item.media_lifer"
                >
                  <b-icon class="ml-1" icon="camera" v-b-tooltip.hover="'Voir nos photos de cette espèces'" />
                </b-link>
              </template>
              <template #cell(prob_region)="sp">
                <b-icon
                  icon="binoculars-fill"
                  v-b-tooltip.hover="'Probabilité d\'observation régionale: ' + sp.value + '%'"
                  :variant="sp.value > 1 ? 'success' : sp.value > 0.5 ? 'warning' : 'danger'"
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
              <div class="d-flex flex-column justify-content-between">
                <div
                  class="bg-secondary text-white d-flex flex-column text-center align-self-start px-3 py-2 mb-2 rounded-bottom mx-auto"
                  style="margin-top: -0.5rem; box-shadow: 3px 3px 4px 2px rgba(0, 0, 0, 0.2)"
                >
                  <div>JOUR#</div>
                  <div class="d-flex flex-row mx-auto">
                    <div class="pokemon" style="font-size: 3rem">
                      {{ jourNb }}
                    </div>
                  </div>
                </div>
                <b-button variant="outline-secondary" size="sm" @click="i_post = 17">Le défi de Mady</b-button>
                <Defis />
              </div>
              <div class="d-flex flex-column text-center" style="min-width: 230px">
                <div style="font-size: 1.2rem">LIFER {{ newsView ? "" : "US" }}#</div>
                <div class="d-flex flex-row align-items-center justify-content-center">
                  <div class="d-flex mr-3">
                    <IconBase class="" name="pokeball" width="50" height="50" />
                  </div>
                  <div
                    class="pokemon cursor-pointer"
                    style="font-size: 6rem; line-height: 0.8"
                    @click="
                      TableSpeciesMode = 'list';
                      $bvModal.show('modal-full-list');
                    "
                  >
                    {{ newsView ? 1 : USliferCount }}
                  </div>
                </div>
                <div>
                  <small> dernière addition: </small>
                  <b-link
                    v-if="newsView"
                    class="text-secondary"
                    href="https://photos.google.com/share/AF1QipMql-g36t6iaBhaX2Aa69fQnv-D2u1bB_qPr8WRTO3-fkxsElmDbV29ojUz-YQKrw/photo/AF1QipOVJPnms0L_2iJx9eJetenFfI65kBQrjjxgk_f_?key=clUydHJSdl9YeGhSTFduMEE2YURLOGtoUjVTaHZR"
                    target="_blank"
                  >
                    Mady Nuss
                  </b-link>
                  <a href="https://ebird.org/checklist/S141822540#kirwar" target="_blank" class="text-secondary">
                    Kirtland's Warbler
                  </a>
                </div>
              </div>
              <div class="d-flex flex-column justify-content-around">
                <div class="d-flex flex-row align-items-center">
                  <IconBase name="pokedex-outline" width="40" height="40" />
                  <div class="d-flex flex-column justify-content-center px-2">
                    <h2 class="pokemon mb-0 mt-2" style="font-size: 2.3rem; line-height: 0.8">
                      {{ newsView ? newsSize()[1] : specieCount }}
                    </h2>
                    <span v-if="newsView">{{ newsSize()[0] }} </span>
                    <span v-else>Espèces pour le trip</span>
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center">
                  <IconBase name="count" width="40" height="40" />
                  <div class="d-flex flex-column justify-content-center px-2">
                    <h2 class="pokemon mb-0 mt-2" style="font-size: 2.3rem; line-height: 0.8">
                      {{ newsView ? 8 : numberWithSpaces(individualCount) }}
                    </h2>
                    <span v-if="newsView">Nombre de kicks </span>
                    <span v-else>Oiseaux comptés</span>
                  </div>
                </div>
              </div>
              <div class="d-flex flex-column" v-if="!newsView">
                <strong>EXPLORER D'AVANTAGE</strong>
                <a
                  class="text-secondary"
                  href="https://media.ebird.org/catalog?searchField=user&userId=USER497615&sort=rating_rank_desc&unconfirmed=incl&regionCode=US&beginMonth=4&endMonth=12&beginYear=2023&endYear=2023"
                  target="_blank"
                >
                  Photos d'oiseaux
                </a>
                <a
                  @click.prevent="
                    TableSpeciesMode = 'target';
                    $bvModal.show('modal-full-list');
                  "
                  href="#"
                  class="text-secondary"
                >
                  Liste des cibles US
                </a>
                <b-button size="sm" v-b-modal.modal-bilan>Bilan ornithologique</b-button>
              </div>
              <div class="d-flex flex-column" v-if="newsView">
                <strong>EXPLORER D'AVANTAGE</strong>
                <a
                  class="text-secondary"
                  href="https://naitreetgrandir.com/fr/grossesse/trimestre1/grossesse-developpement-foetus-embryon/"
                  target="_blank"
                  >Le B.A.BA du développement du foetus</a
                >
                <a
                  class="text-secondary"
                  href="https://www.paris-normandie.fr/id233568/article/2021-09-22/pourquoi-le-23-septembre-est-il-le-jour-de-lannee-ou-il-y-le-plus-de-naissances"
                  target="_blank"
                  >Une date de terme populaire</a
                >
                <a
                  class="text-secondary"
                  href="https://max.sudinfo.be/psycho-sexo/le-deuxieme-enfant-serait-le-plus-difficile-de-la-famille-selon-la-science"
                  target="_blank"
                  >Que dit la science sur le #2 ?</a
                >
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
                  :class="[r.active ? 'cursor-pointer' : 'cursor-not-allowed']"
                  v-b-tooltip.hover="r.active ? '' : 'Cette région sera débloquée quand nous y arriverons.'"
                  class="regions-button"
                  @click="i_region = r.active ? i : i_region"
                >
                  <b-img :src="r.region + '.png'" class="mr-2 h-16" />
                  {{ r.name }}
                </b-button>
              </b-button-group>
              <l-map ref="map" style="min-height: 300px">
                <l-control>
                  <b-button size="sm" class="w-100 mb-2 text-white" @click="map.fitBounds(locations)">
                    Zoomer sur le trajet
                  </b-button>
                  <b-container class="control control-ebird px-0">
                    <b-row>
                      <b-col class="text-center px-4 d-flex align-items-center">
                        <b-form-checkbox v-model="showChecklist" id="switch_1" switch />
                        <label for="switch_1" class="mb-0">Afficher les listes eBird</label>
                      </b-col>
                    </b-row>
                    <div v-if="showChecklist && selectedLocId">
                      <b-list-group flush>
                        <b-list-group-item class="d-flex py-2">
                          <b-icon icon="geo-alt-fill" class="mr-2" />
                          {{ selectedChecklist[0].loc.name }}
                        </b-list-group-item>
                        <b-list-group-item class="d-flex py-2">
                          <b-icon icon="clock-fill" class="mr-2" />
                          {{ selectedChecklist.map((c) => c.obsDt + (c.obsTime ? " " + c.obsTime : "")).join(", ") }}
                        </b-list-group-item>
                        <b-list-group-item class="d-flex py-2">
                          <IconBase name="bird" class="mr-2 h-16" />
                          {{ selectedChecklist.map((c) => c.numSpecies).join(", ") }}
                        </b-list-group-item>
                        <b-list-group-item class="d-flex py-2 flex-wrap">
                          <b-icon icon="card-checklist" class="mr-2" />
                          <b-link
                            v-for="c in selectedChecklist"
                            :key="c.subId"
                            :href="'https://ebird.org/checklist/' + c.subId"
                            target="_blank"
                            class="mr-2"
                          >
                            {{ c.subId }}
                          </b-link>
                        </b-list-group-item>
                      </b-list-group>
                    </div>
                  </b-container>
                </l-control>
                <l-control :position="'bottomleft'">
                  <b-container class="control px-2">
                    <small> Dernière MÀJ: {{ last_update.toLocaleString().slice(0, -3) }} </small>
                  </b-container>
                </l-control>
                <l-tile-layer
                  :key="tileLayer.url"
                  :url="tileLayer.url"
                  :attribution="tileLayer.attribution"
                  @tileerror="onTileError"
                />
                <template v-if="!newsView">
                  <template v-if="modeSelected == 'route' && route.length > 0">
                    <l-polyline
                      v-for="(r, i) in route"
                      :key="r.region"
                      :lat-lngs="r.route"
                      :color="r.color"
                      :opacity="i == i_region ? 0.9 : 0.5"
                      :weight="6"
                      @click="i_region = r.active ? i : i_region"
                    />
                  </template>
                  <template v-if="showChecklist">
                    <l-circle-marker
                      v-for="check in checklistMarkers"
                      :key="check.subId"
                      :lat-lng="[check.loc.lat, check.loc.lng]"
                      :weight="0"
                      fillColor="#4ca800"
                      :radius="5"
                      :fillOpacity="0.8"
                      @click="selectedLocId = check.locId"
                    />
                  </template>
                  <l-polyline v-if="locations.length > 0" :lat-lngs="locations" color="black" :weight="1" />
                  <template v-if="modeSelected == 'live' && posts != null">
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
                </template>
                <l-image-overlay url="flight_baby.svg" :bounds="newsBounds" v-if="newsView" />
              </l-map>
            </b-card>
          </b-col>
        </b-row>
        <b-row v-if="showPhotoSlider">
          <Photos :newsView="newsView" />
        </b-row>
      </b-col>
    </b-row>
    <b-modal id="modal-full-list" scrollable title="Liste complète des cibles US" size="xl" hide-footer centered>
      <TableSpecies :regions="regions" :mode="TableSpeciesMode" />
    </b-modal>
    <Modal />
  </b-container>
</template>
<script>
import L from "leaflet";
import polyUtil from "polyline-encoded";
import { LMap, LTileLayer, LPolyline, LMarker, LIcon, LCircleMarker, LControl, LImageOverlay } from "vue2-leaflet";

import TableSpecies from "./TableSpecies.vue";
import Modal from "./Modal.vue";
import Presentation from "./Presentation.vue";
import IconBase from "./IconBase.vue";
import Defis from "./Defis.vue";

import posts from "./assets/posts.js";
import locations_json from "./assets/locations.json";
import taxon from "./assets/taxon-list.json";
import species_list from "./assets/species_list.json";
import regions from "./assets/regions.json";

// GPS track of the trip, stored as an encoded polyline (precision 1e-5°).
const locations = polyUtil.decode(locations_json.polyline);
// Mapbox is the preferred basemap; if its tiles keep failing (token revoked, style retired...),
// fall back to OpenStreetMap so the map never stays blank.
const MAPBOX_TOKEN = "pk.eyJ1IjoicmFmbnVzcyIsImEiOiIzMVE1dnc0In0.3FNMKIlQ_afYktqki-6m0g";
const OSM_ATTRIBUTION =
  '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>';
const TILE_LAYERS = {
  mapbox: {
    url: "https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=" + MAPBOX_TOKEN,
    attribution:
      '© <a href="https://www.mapbox.com/about/maps/" target="_blank" rel="noopener">Mapbox</a> ' + OSM_ATTRIBUTION,
  },
  osm: {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: OSM_ATTRIBUTION,
  },
};
const MAX_TILE_ERRORS = 3;

const NEWS_BOUNDS = [
  [32, -100],
  [60, 7],
];
const nbActiveRegions = regions.filter((r) => r.active).length;
const taxonByCode = new Map(taxon.map((t) => [t.speciesCode, t]));

export default {
  components: {
    LMap,
    LTileLayer,
    LPolyline,
    LMarker,
    LIcon,
    LCircleMarker,
    LControl,
    LImageOverlay,
    // Only downloaded (together with Swiper) when the photo slider is shown.
    Photos: () => import("./Photos.vue"),
    TableSpecies,
    Modal,
    Presentation,
    Defis,
    IconBase,
  },
  data() {
    return {
      map: null,
      tileLayer: TILE_LAYERS.mapbox,
      tileErrors: 0,
      baseUrl: import.meta.env.BASE_URL,
      regions: regions,
      max_region: nbActiveRegions - 1,
      i_region: nbActiveRegions - 1,
      modeSelected: "live",
      modeOptions: [
        { text: "Suivez-nous live", value: "live" },
        { text: "Découvrez le parcours", value: "route" },
      ],
      // Route and checklists are only needed on demand, so they are loaded lazily.
      route: [],
      checklists: [],
      selectedLocId: null,
      posts: posts,
      i_post: posts.length - 1,
      locations: locations,
      taxon: taxon,
      showChecklist: false,
      species_list: species_list.map((sp) => {
        const t = taxonByCode.get(sp.species_code);
        sp.seen = t !== undefined;
        sp.hasMedia = t ? t.numMedia : 0;
        return sp;
      }),
      USliferCount: 0,
      USliferCountInterval: null,
      newsView: false,
      // Keep the slider component in code, but hidden by default to give map more room.
      showPhotoSlider: false,
      newsTry: 0,
      last_update: new Date(2023, 5, 20),
      game: [
        { name: "Viens Papa!", audio: "viens_papa" },
        { name: "Clé", audio: "clee" },
        { name: "Avocat", audio: "avocat" },
        { name: "Tracteur", audio: "tracteur" },
        { name: "Oiseau", audio: "oiseaux1" },
        { name: "Banane", audio: "banane" },
        { name: "Jus", audio: "jus" },
      ],
      newsBounds: NEWS_BOUNDS,
      game_options: [],
      game_selected: [],
      TableSpeciesMode: "target",
    };
  },
  methods: {
    getIcon(h, i) {
      const color = this.regions.find((r) => r.region == h.region).color;
      return L.divIcon({
        className: "my-custom-icon",
        popupAnchor: [0, -34],
        iconAnchor: [12.5, 34],
        iconSize: [25, 34],
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 33"><path fill="${color}" stroke="#ffffff" stroke-width="1px" d="m12.02,32.98c-.32,0-.81-.11-1.29-.67-3.01-3.51-5.41-6.84-7.31-10.17-1.45-2.54-2.39-4.71-2.95-6.8C-.5,11.74.04,8.37,2.05,5.34,3.77,2.76,6.19,1.06,9.23.33c.43-.1.87-.17,1.31-.23.19-.03.39-.06.58-.09h1.69c.27.03.47.06.66.09.44.06.88.13,1.31.23,3.4.85,6.01,2.85,7.75,5.95.85,1.53,1.35,3.25,1.45,5.12.15,2.62-.66,4.95-1.38,6.69-1.24,2.97-2.98,5.97-5.34,9.17-1.02,1.39-2.12,2.75-3.19,4.06l-.79.99c-.46.57-.94.69-1.27.69v-.02Z"/>
        <text x="50%" y="43%" fill="#ffff" dominant-baseline="middle" text-anchor="middle">${i}</text></svg>`,
      });
    },
    onTileError() {
      this.tileErrors += 1;
      if (this.tileErrors >= MAX_TILE_ERRORS && this.tileLayer !== TILE_LAYERS.osm) {
        this.tileLayer = TILE_LAYERS.osm;
      }
    },
    numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    animateUSliferCount(lifer) {
      clearInterval(this.USliferCountInterval);
      if (lifer == this.USliferCount) {
        return;
      }
      this.USliferCountInterval = window.setInterval(() => {
        if (this.USliferCount == lifer) {
          clearInterval(this.USliferCountInterval);
          return;
        }
        let change = (lifer - this.USliferCount) / 10;
        change = change >= 0 ? Math.ceil(change) : Math.floor(change);
        this.USliferCount = this.USliferCount + change;
      }, 30);
    },
    post2region(i) {
      if (this.posts.length > 0) {
        return this.regions.find((r) => r.region == this.posts[i].region);
      } else {
        return {};
      }
    },
    goToPost(i) {
      this.i_post = Math.min(Math.max(i, 0), this.posts.length - 1);
      this.map.flyTo([this.posts[this.i_post].lat, this.posts[this.i_post].lon]);
    },
    showNews() {
      this.newsView = true;
      this.map.flyToBounds(NEWS_BOUNDS);
    },
    checkNews() {
      if (this.game.every((g, i) => g.name == this.game_selected[i])) {
        this.showNews();
      } else {
        this.newsTry = this.newsTry + 1;
        this.newsView = false;
      }
    },
    newsSize() {
      const weeks = Math.floor((Date.now() - new Date("2022-12-18")) / (1000 * 60 * 60 * 24 * 7));
      if (weeks <= 4) {
        return ["poppy seed", "<1 cm"];
      } else if (weeks <= 8) {
        return ["Framboise", "1.6-2.5 cm"];
      } else if (weeks <= 12) {
        return ["Citron Vert", "5.4-6.8 cm"];
      } else if (weeks <= 16) {
        return ["Avocat", "10 cm"];
      } else if (weeks <= 20) {
        return ["Banane", "17 cm"];
      } else if (weeks <= 24) {
        return ["Maïs", "25 cm"];
      } else if (weeks <= 28) {
        return ["Aubergine", "36 cm"];
      } else if (weeks <= 32) {
        return ["Butternut", "43 cm"];
      } else if (weeks <= 36) {
        return ["Melon", "47 cm"];
      } else {
        return ["Pastèque", "49 cm"];
      }
    },
    async loadRoute() {
      if (this.route.length > 0) return;
      const { default: route_json } = await import("./assets/route.json");
      this.route = route_json.map((s) => ({
        region: s.region,
        route: polyUtil.decode(s.route),
        color: regions.find((r) => r.region == s.region).color,
      }));
    },
    async loadChecklists() {
      if (this.checklists.length > 0) return;
      const { default: checklists } = await import("./assets/checklists.json");
      this.checklists = checklists;
    },
  },
  computed: {
    specieCount() {
      return this.taxon.filter((t) => t.category == "species").length;
    },
    individualCount() {
      return this.taxon.reduce((acc, t) => acc + t.numIndividuals, 0);
    },
    species_list_table() {
      return this.species_list
        .filter((s) => s.target && s.region.includes(this.regions[this.i_region].region))
        .map((s) => {
          s.prob_region = s.prob[this.i_region];
          return s;
        });
    },
    checklistMarkers() {
      return this.checklists.filter((d) => d.loc.name != d.loc.subnational2Name);
    },
    selectedChecklist() {
      return this.checklists.filter((c) => c.locId == this.selectedLocId);
    },
    jourNb() {
      // Total number of days of the trip.
      return 83;
    },
  },
  created() {
    this.game_options = shuffle(this.game.map((g) => g.name));
    this.game_selected = shuffle(this.game.map((g) => g.name));

    const uslifercount = this.species_list.filter((sp) => (!sp.US_lifer || sp.seen) && sp.exotic != "X").length - 3;
    this.animateUSliferCount(uslifercount);
  },
  watch: {
    modeSelected(val) {
      if (val == "route") {
        this.loadRoute();
        this.map.fitBounds([
          [26, -72],
          [50, -127],
        ]);
      } else {
        this.map.setView(this.locations[this.locations.length - 1], 14);
      }
    },
    showChecklist(val) {
      if (val) this.loadChecklists();
    },
  },
  mounted() {
    this.map = this.$refs.map.mapObject;
    this.map.fitBounds(this.locations, { animate: false });
  },
  beforeDestroy() {
    clearInterval(this.USliferCountInterval);
  },
};

function shuffle(array) {
  // Fisher–Yates shuffle (in place).
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
</script>
