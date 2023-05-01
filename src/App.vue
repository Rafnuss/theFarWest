<template>
  <b-container fluid class="h-100 bg-light">
    <b-row class="h-100">
      <b-col class="h-100 col-xs-12 md-6 col-lg-4 d-flex flex-column py-2">
        <b-row>
          <b-col class="pb-2">
            <b-card class="w-100 p-2 d-flex flex-row flex-wrap align-items-center" no-body style="gap: 0.5rem">
              <b-img src="logo.svg" height="64px" class="mx-auto" />
              <div class="mx-auto" v-if="true">
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
              <!--<b-icon
                icon="chevron-left"
                @click="i_post = Math.max(i_post - 1, 0)"
                :class="i_post == 0 ? 'opacity-0' : 'cursor-pointer'"
              />-->
              <div class="w-100 px-2">
                <h2 class="flex-stretch mb-0 text-left">{{ posts[i_post].title }}</h2>
                <div class="d-flex justify-content-between align-items-center">
                  <!--
                  <b-icon icon="person-lines-fill"></b-icon>
                <b-icon icon="calendar-date-fill"></b-icon>
                -->
                  <small>
                    {{ posts[i_post].author }},
                    {{
                      posts[i_post].date.toLocaleString("FR", { weekday: "long" }) +
                      " " +
                      posts[i_post].date.getDate() +
                      " " +
                      posts[i_post].date.toLocaleString("FR", { month: "long" })
                    }}
                    <b-icon :icon="posts[i_post].weather"></b-icon>
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
                  </b-button>
                  <!--<b-button
                  class="ml-2"
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
                --></div>
              </div>
              <!--<b-icon
                icon="chevron-right"
                :class="(i_post == posts.length - 1 ? 'opacity-0' : 'cursor-pointer') + ' ml-auto'"
                @click="i_post = Math.min(i_post + 1, posts.length - 1)"
              />-->
            </div>
          </div>
          <b-card-body class="overflow-auto flex-grow-1">
            <template v-if="posts[i_post].content">
              <span v-html="posts[i_post].content"></span>

              <div v-if="posts[i_post].newsView">
                <template v-if="!newsView">
                  <p>
                    <a href="#" v-b-modal.modal-defis
                      >Merci pour tous les défis que vous m'avez donné pour m'occuper pendant ce voyage ! J'ai fait de
                      bons progrès mais je travaille encore sur quelques uns.
                    </a>
                  </p>
                  <h4>A mon tour de vous mettre au défi !</h4>
                  <p>
                    J'ai un message à vous communiquer, mais d'abord, il faut que vous appreniez à décoder mon language.
                    Associez le bon mot à chacune des mes expressions !
                  </p>
                  <b-list-group>
                    <b-list-group-item v-for="(e, i) in game" :key="e.audio">
                      <audio controls class="w-100">
                        <source :src="e.audio" />
                      </audio>
                      <b-form-select v-model="game_selected[i]" :options="game_options" size="sm"></b-form-select>
                    </b-list-group-item>
                  </b-list-group>
                  <b-button @click="checkNews" class="w-100 mt-2">Vérifier</b-button>
                  <b-button
                    @click="
                      newsView = true;
                      map.flyToBounds([
                        [32, -100],
                        [60, 7],
                      ]);
                    "
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
                        <source src="https://drive.google.com/uc?export=view&id=1PHVPpLkHw6koDrOJYYEbMH3G1NSmwlej" />
                      </audio>
                    </p>
                  </b-alert>
                </template>
              </div>
            </template>
            <template v-else>
              <b-card-text v-if="posts[i_post].subtitle">
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
            </template>
          </b-card-body>
          <b-card-footer class="w-100 p-0">
            <b-input-group>
              <template #prepend>
                <b-button
                  @click="
                    i_post = Math.max(i_post - 1, 0);
                    map.flyTo([posts[i_post].lat, posts[i_post].lon]);
                  "
                  variant="primary"
                >
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
                <b-button
                  @click="
                    i_post = Math.min(i_post + 1, posts.length - 1);
                    map.flyTo([posts[i_post].lat, posts[i_post].lon]);
                  "
                  variant="primary"
                >
                  <b-icon icon="chevron-right" />
                </b-button>
              </template>
            </b-input-group>
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
              <div class="d-flex align-items-center">
                <b-img :src="regions[i_region].region + '.png'" class="mr-2" style="height: 2rem" />
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
                <div v-if="(latestLifer[1] != '#N/A') | newsView">
                  <small> dernière addition: </small>
                  <b-link
                    v-if="newsView"
                    class="text-secondary"
                    href="https://photos.google.com/share/AF1QipMql-g36t6iaBhaX2Aa69fQnv-D2u1bB_qPr8WRTO3-fkxsElmDbV29ojUz-YQKrw/photo/AF1QipOVJPnms0L_2iJx9eJetenFfI65kBQrjjxgk_f_?key=clUydHJSdl9YeGhSTFduMEE2YURLOGtoUjVTaHZR"
                    target="_blank"
                  >
                    Mady Nuss
                  </b-link>
                  <b-link v-else class="text-secondary" @click="openSpeciesChecklist(latestLifer[2])">
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
              <div class="d-flex flex-column" v-if="true && !newsView">
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
                <a
                  @click="
                    TableSpeciesMode = 'target';
                    $bvModal.show('modal-full-list');
                  "
                  href="#"
                  class="text-secondary"
                  >Liste des cibles US</a
                >
                <b-modal
                  id="modal-full-list"
                  scrollable
                  title="Liste complète des cibles US"
                  size="xl"
                  hide-footer
                  class="h-100"
                  centered
                >
                  <TableSpecies :regions="regions" :mode="TableSpeciesMode" />
                </b-modal>

                <!-- <a
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
                  <div class="mr-2">Prévisions de migration</div>
                  <b-img src="birdcast.svg" class="h-16" />
                </a>-->
                <a
                  v-if="locations.length > 0"
                  :href="
                    'https://dashboard.birdcast.info/region/' +
                    regions.reduce((acc, r) => (acc = r.active ? r.ebirdcode : acc), '')
                  "
                  target="_blank"
                  class="d-flex align-items-baseline text-secondary"
                >
                  <div class="mr-2">Migration live</div>
                  <!--<b-img src="birdcast.svg" class="h-16" />-->
                </a>
                <a
                  :href="
                    'https://zoziologie.raphaelnussbaumer.com/global-rare-ebird/?mode=r&t=1&r=' +
                    regions[max_region].ebirdcode
                  "
                  target="_blank"
                  class="d-flex align-items-baseline text-secondary"
                  v-if="false"
                >
                  <div class="mr-2">Oiseaux rares</div>
                  <!--<b-img src="birdcast.svg" class="h-16" />-->
                </a>
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
                  :url="
                    'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=' + mapboxToken
                  "
                />
                <template v-if="!newsView">
                  <template v-if="(modeSelected == 'route') & (route.length > 0)">
                    <l-polyline
                      v-for="(r, i) in route"
                      :key="r.region"
                      :lat-lngs="r.route"
                      :color="r.color"
                      :opacity="i == i_region ? 0.8 : 0.4"
                      :weight="6"
                      @click="i_region = r.active ? i : i_region"
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
                      @click="selectedLocId = check.locId"
                    />
                  </template>
                  <l-polyline v-if="locations.length > 0" :lat-lngs="locations" color="black" :weight="1" />
                  <!--<l-polyline :lat-lngs="locations2" color="red" :weight="2" />-->
                  <template v-if="modeSelected == 'live' && posts != null">
                    <l-marker
                      v-for="(p, i) in posts"
                      :key="p.title"
                      :lat-lng="[p.lat, p.lon]"
                      :icon="getIcon(p, i + 1)"
                      @click="i_post = i"
                    >
                      <!--<l-tooltip>Cliquer pour afficher l'article</l-tooltip>-->
                    </l-marker>
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
                <l-image-overlay
                  url="./flight_baby.svg"
                  :bounds="[
                    [32, -100],
                    [60, 7],
                  ]"
                  v-if="newsView"
                />
              </l-map>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <Photos :newsView="newsView" />
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
import Defis from "./Defis.vue";
import posts_hard from "./assets/posts.js";
import locations_hard from "./assets/locations.js";

import polyUtil from "polyline-encoded";
import {
  LMap,
  LTileLayer,
  LTooltip,
  LPolyline,
  LMarker,
  LIcon,
  LCircleMarker,
  LLayerGroup,
  LControlLayers,
  LControl,
  LImageOverlay,
} from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTooltip,
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
    Defis,
    IconBase,
    LImageOverlay,
  },
  data() {
    return {
      live_tripreport_id: 112351,
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
      selectedLocId: null,
      posts: posts_hard,
      i_post: 0,
      locations: [],
      latestLifer: [],
      taxon: [],
      showChecklist: false,
      species_list: species_list,
      USliferCount: 0,
      USliferCountInterval: false,
      newsView: false,
      newsTry: 0,
      last_update: new Date(2023, 2, 28),
      game: [
        {
          name: "Viens Papa!",
          audio: "https://drive.google.com/uc?export=view&id=1urknXTcekfe7SdpKBKqGbxsAVrkjSZGv",
        },
        {
          name: "Clé",
          audio: "https://drive.google.com/uc?export=view&id=1o0NV0MqzelqJYbFFpOqo0RXiSS0kvz-S",
        },
        {
          name: "Avocat",
          audio: "https://drive.google.com/uc?export=view&id=1JBx6Fz4WPgXGIGlkoDNJuQo1z79xqhRb",
        },
        {
          name: "Tracteur",
          audio: "https://drive.google.com/uc?export=view&id=14hgXbRPsnYvuXGho4415hYcy6O8DwIIF",
        },
        /* {
          name: "Livre",
          audio: "https://drive.google.com/uc?export=view&id=1tIDngk-iZFxMC04PBDLg1JEmNkd4r2wV",
        },
       {
          name: "Raisin",
          audio: "https://drive.google.com/uc?export=view&id=1uMmHnvlB4N1Qi0kTrfXzuV2gxtTw0DQB",
        },*/
        {
          name: "Oiseau",
          audio: "https://drive.google.com/uc?export=view&id=1idFn9TcGHJm9-VZJHglzx7wDlXfSt2jt",
        },
        /*{
          name: "Avion",
          audio: "https://drive.google.com/uc?export=view&id=1-QCP8ma0gxA6TaGHYQ0DJXvUvthnS9h7",
        },*/
        {
          name: "Banane",
          audio: "https://drive.google.com/uc?export=view&id=1x0AWJS-VWUGwI9mdHMXzfPLLlJiD1fVy",
        },
        {
          name: "Jus",
          audio: "https://drive.google.com/uc?export=view&id=1CuHWfjTQkgP9X7YdYiDvPlY4PQ-bMZzr",
        },
      ],
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
        html: `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 33"><path fill="${color}" stroke="#ffffff" stroke-width="1px" d="m12.02,32.98c-.32,0-.81-.11-1.29-.67-3.01-3.51-5.41-6.84-7.31-10.17-1.45-2.54-2.39-4.71-2.95-6.8C-.5,11.74.04,8.37,2.05,5.34,3.77,2.76,6.19,1.06,9.23.33c.43-.1.87-.17,1.31-.23.19-.03.39-.06.58-.09h1.69c.27.03.47.06.66.09.44.06.88.13,1.31.23,3.4.85,6.01,2.85,7.75,5.95.85,1.53,1.35,3.25,1.45,5.12.15,2.62-.66,4.95-1.38,6.69-1.24,2.97-2.98,5.97-5.34,9.17-1.02,1.39-2.12,2.75-3.19,4.06l-.79.99c-.46.57-.94.69-1.27.69v-.02Z"/>
        <text x="50%" y="43%" fill="#ffff" dominant-baseline="middle" text-anchor="middle">${i}</text></svg>`, //${i}
      });
    },
    async loadLocations() {
      const response = await fetch("https://farwest-locations.raphaelnussbaumer.com/locations.csv");
      const text = await response.text();
      const rows = text.trim().split("\n");
      let locations = rows
        .map((row) => {
          const [lat, lon, time] = row.split(",");
          return { time: parseInt(time), lat: parseFloat(lat), lon: parseFloat(lon) };
        })
        .filter((row) => row.time > 1681932000);
      this.last_update = new Date(locations[locations.length - 1].time * 1000);
      locations = detectOutliers(locations, 2, 2);
      locations = locations.map((l) => [l.lat, l.lon]);
      locations = filterLatLngArray(locations, 1 / 111 / 100);
      this.locations = [...locations_hard, ...locations];
      this.map.setView(this.locations[this.locations.length - 1], 14);
    },
    async openSpeciesChecklist(spCode) {
      fetch(
        "https://tripreport.raphaelnussbaumer.com/tripreport-internal/v1/taxon-detail/" +
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
    post2region(i) {
      if (this.posts.length > 0) {
        return this.regions.find((r) => r.region == this.posts[i].region);
      } else {
        return {};
      }
    },
    checkNews() {
      if (this.game.every((g, i) => g.name == this.game_selected[i])) {
        this.newsView = true;
        this.map.flyToBounds([
          [32, -100],
          [60, 7],
        ]);
      } else {
        this.newsTry = this.newsTry + 1;
        this.newsView = false;
      }
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
    selectedChecklist() {
      return this.checklists.filter((c) => c.locId == this.selectedLocId);
    },
    jourNb() {
      const ref = this.newsView ? new Date("2023-09-21") : new Date("2023-03-28");
      return Math.floor((new Date() - ref) / (1000 * 60 * 60 * 24));
    },
  },
  created: function () {
    this.game_options = shuffle(this.game.map((g) => g.name));
    this.game_selected = shuffle(this.game.map((g) => g.name));

    this.loadLocations();

    // Checklsit
    fetch("https://tripreport.raphaelnussbaumer.com/tripreport-internal/v1/checklists/" + this.live_tripreport_id)
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
        this.posts = [
          ...this.posts,
          ...rows
            .filter((row) => row.length > 0)
            .map((row) => {
              let r = {
                title: row[1],
                text1: row[2],
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
              };
              r.dateISO = r.date.getMonth() + "-" + r.date.getDate() + "-" + r.date.getFullYear();
              return r;
            }),
        ].sort((a, b) => a.date - b.date);
        this.i_post = this.posts.length - 1;
      })
      .catch((error) => console.error(error));

    // Taxon
    fetch("https://tripreport.raphaelnussbaumer.com/tripreport-internal/v1/taxon-list/" + this.live_tripreport_id)
      .then((response) => response.json())
      .then((data) => {
        // Add new taxon from latest tripreport
        this.taxon = [
          ...past_taxon,
          ...data,
          {
            speciesCode: "spoowl",
            category: "species",
            commonName: "Spotted Owl",
            sciName: "Strix occidentalis",
            hideFlags: "S",
            numIndividuals: 3,
            numChecklists: 2,
            numPhotos: 0,
            numAudio: 0,
            numVideo: 0,
            isLifer: true,
            numMedia: 0,
          },
          {
            speciesCode: "gusgro",
            category: "species",
            commonName: "Gunnison Sage-Grouse",
            sciName: "Centrocercus minimus",
            hideFlags: "S",
            numIndividuals: 10,
            numChecklists: 1,
            numPhotos: 3,
            numAudio: 0,
            numVideo: 0,
            isLifer: true,
            isPhotoLifer: true,
            numMedia: 3,
          },
        ].reduce((acc, curr) => {
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
        //Lilac-crowned Parrot exotic in florida but P in california, but red-crown parrot is the opposite.
        //uslifercount = uslifercount;
        this.animateUSliferCount(uslifercount - 1);
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
  mounted() {
    this.map = this.$refs.map.mapObject;
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

function newsSize() {
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
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
</script>
