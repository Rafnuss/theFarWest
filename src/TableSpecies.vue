<template>
  <div>
    <p>
      Ce tableau liste toutes les espèces des US excluant Hawai et Alaska. Les pourcentages affichés correspondent à la
      fréquence d'observation de l'espèce dans la région sur les checklists eBird. Vu que la plupart des checklists sont
      soumises à proximité des villes, certaines espèces localisées dans des lieux reclus peuvent apparaître comme rares
      alors que, si on la cherche dans le bon habitat, elle n'est pas très difficile à trouver.
    </p>
    <b-button v-b-toggle.collapse-1 variant="primary" size="sm" class="mb-2">Ajuster les filtres d'affichage</b-button>
    <b-collapse id="collapse-1" class="mb-2">
      <b-card class="bg-light">
        <b-form @submit="onSubmit">
          <b-row>
            <b-col>
              <b-form-group label="Filtre par status USA">
                <b-form-checkbox-group v-model="tickSelected" stacked>
                  <b-form-checkbox value="before"
                    >Observé aux US avant le trip <b-icon icon="check-square"
                  /></b-form-checkbox>
                  <b-form-checkbox value="trip"
                    >Observé pendant le trip <b-icon icon="check-square" variant="success"
                  /></b-form-checkbox>
                  <b-form-checkbox value="remain"
                    >Reste à voir pendant le trip <b-icon icon="square"
                  /></b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Autres filtres">
                <b-form-checkbox v-model="exclureLifer">
                  <span v-b-tooltip.hover="'Ne pas inclure les espèces déjà observées en dehors des USA'">
                    Exclure lifer</span
                  >
                </b-form-checkbox>

                <b-form-checkbox v-model="onlyTarget">
                  <span v-b-tooltip.hover="'Exclure les espèces très rares que nous ne chercherons pas activement.'"
                    >Inclure seulement les cibles</span
                  ></b-form-checkbox
                >
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Filtrer par nom (anglais)">
                <b-form-input v-model="filterCommonName" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-button type="submit" variant="primary" size="sm" class="mx-auto">
            Mettre à jour <b-icon icon="check" v-if="update" animation="fade" />
          </b-button>
        </b-form>
      </b-card>
    </b-collapse>
    <b-table
      hover
      small
      responsive
      sticky-header
      :fields="[
        { key: 'tick', label: '', class: 'text-center' },
        { key: 'common_name', label: 'Nom commun' },
        ...regions.map((r) => {
          return { key: r.region, label: r.name };
        }),
      ]"
      :items="species_list_show"
    >
      <template #cell(tick)="sp">
        {{ sp.index + 1 + " " }}
        <template v-if="sp.value == 'before'">
          <b-icon icon="check-square" />
        </template>
        <template v-else-if="sp.value == 'trip'">
          <b-icon icon="check-square" variant="success" />
        </template>
        <template v-else>
          <b-icon icon="square" />
        </template>
      </template>

      <template #cell(common_name)="sp">
        <b-link :href="'https://ebird.org/species/' + sp.item.species_code + '/' + sp.item.ebirdcode" target="_blank">
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
          <b-icon class="ml-1" icon="camera" />
        </b-link>
      </template>
      <template #cell()="sp">
        <b-icon
          icon="binoculars-fill"
          v-b-tooltip.hover="'Probabilité d\'observation régionale: ' + sp.value + '%'"
          :variant="sp.value > 3 ? 'success' : sp.value > 1 ? 'warning' : 'danger'"
        />
        {{ sp.value + "%" }}
      </template>
    </b-table>
  </div>
</template>

<script>
import species_list from "./assets/species_list.json";
export default {
  props: ["regions", "mode"],
  data() {
    return {
      species_list: species_list.map((sp) => {
        this.regions.forEach((r, i) => {
          sp[r.region] = sp.prob[i];
        });
        sp.tick = sp.US_lifer ? (sp.seen ? "trip" : "remain") : "before";
        sp.ebirdcode = "US";
        return sp;
      }),
      species_list_show: [],
      tickSelected: ["trip", "remain"],
      exclureLifer: true,
      onlyTarget: true,
      filterCommonName: "",
      update: false,
    };
  },
  methods: {
    onSubmit(event) {
      this.update = true;
      if (event) {
        event.preventDefault();
      }
      let t = species_list;
      if (this.exclureLifer) {
        t = t.filter((sp) => sp.world_lifer);
      }
      if (this.onlyTarget) {
        t = t.filter((sp) => sp.target);
      }
      t = t.filter((sp) => this.tickSelected.includes(sp.tick));
      t = t.filter((sp) => sp.common_name.toLowerCase().includes(this.filterCommonName.toLowerCase()));
      this.species_list_show = t;
      setTimeout(() => {
        this.update = false;
      }, 1500);
    },
  },
  created() {
    console.log(this.mode);
    if (this.mode == "list") {
      this.onlyTarget = false;
      this.exclureLifer = false;
      this.tickSelected = ["before", "trip"];
    }
    this.onSubmit();
  },
};
</script>
