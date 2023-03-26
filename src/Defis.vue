<template>
  <div>
    <b-modal id="modal-defis" scrollable title="Les défis de Mady" size="l" hide-footer centered>
      <p>
        Suivez ma liste de coches avec ces 10 premiers défis reçus - quand je les aurai tous cochés, à moi de vous en
        donner un !
      </p>
      <b-table
        hover
        small
        responsive
        :fields="[
          { key: 'index', label: '', class: 'text-center' },
          { key: 'done', label: '', class: 'text-center' },
          { key: 'name', label: 'Défi' },
        ]"
        :items="defis"
      >
        <template #cell(index)="data"> {{ data.index + 1 }}. </template>
        <template #cell(done)="d">
          <template v-if="d.done">
            <b-icon icon="check-square" variant="success" />
          </template>
          <template v-else>
            <b-icon icon="square" />
          </template>
        </template>
      </b-table>
      <h1>Les défis en Image</h1>
      <b-carousel
        v-model="slide"
        controls
        indicators
        background="#ababab"
        style="text-shadow: 1px 1px 2px #333"
        :interval="0"
      >
        <b-carousel-slide
          v-for="(d, i) in defis"
          :key="d.name"
          :caption="'Defi ' + (i + 1)"
          :text="d.name"
          :img-src="d.src"
        />
      </b-carousel>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defis: [
        {
          name: "Name a bird",
          done: false,
          src: "https://drive.google.com/uc?export=view&id=1oHkXd_poVr_WhujQnrqfPXlJje29RPtn",
        },
        {
          name: "Run two miles",
          done: false,
          src: "https://drive.google.com/uc?export=view&id=1eOBqVU_2FhTNpIuLqSDhar8HEVcm_U0A",
        },
        {
          name: "draw apicture",
          done: true,
          src: "https://drive.google.com/uc?export=view&id=1Q1W75BogCuFzGd5WETvTuzG-ZwfN1nau",
        },
      ],
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
};
</script>
