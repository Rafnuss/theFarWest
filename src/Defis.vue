<template>
  <div>
    <b-modal id="modal-defis" scrollable title="Les défis de Mady" size="lg" hide-footer centered>
      <p>
        Suivez ma liste de coches avec ces 10 premiers défis reçus - quand je les aurai tous cochés, à moi de vous en
        donner un !
      </p>
      <b-table
        hover
        small
        responsive
        :fields="[
          { key: 'done', label: '', class: 'text-center' },
          { key: 'name', label: 'Défi' },
          { key: 'diff', label: 'Difficulté', class: 'text-center' },
        ]"
        :items="defis"
      >
        <template #cell(done)="d">
          <template v-if="d.done">
            <b-icon icon="check-square" variant="success" />
          </template>
          <template v-else>
            <b-icon icon="square" />
          </template>
        </template>
        <template #cell(name)="d"> {{ d.index + 1 }}. {{ d.value }}</template>
        <template #cell(diff)="d">
          <b-icon icon="binoculars-fill" :variant="d.value == 1 ? 'success' : d.value == 2 ? 'warning' : 'danger'" />
        </template>
      </b-table>
      <b-carousel controls indicators background="#ababab" style="text-shadow: 1px 1px 2px #333" :interval="0">
        <b-carousel-slide
          v-for="(d, i) in defis.filter((d) => d.done)"
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
          diff: 1,
        },
        {
          name: "Run two miles",
          done: false,
          src: "https://drive.google.com/uc?export=view&id=1eOBqVU_2FhTNpIuLqSDhar8HEVcm_U0A",
          diff: 2,
        },
        {
          name: "draw apicture",
          done: true,
          src: "https://drive.google.com/uc?export=view&id=1Q1W75BogCuFzGd5WETvTuzG-ZwfN1nau",
          diff: 3,
        },
      ],
    };
  },
};
</script>
