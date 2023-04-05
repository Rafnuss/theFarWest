<template>
  <div>
    <b-modal id="modal-defis" scrollable title="Les défis de Mady (aka Taty)" size="lg" hide-footer centered>
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
        <template #cell(name)="d"> {{ d.index + 1 }}. <span v-html="d.value"></span></template>
        <template #cell(diff)="d">
          <b-icon icon="binoculars-fill" :variant="d.value == 1 ? 'success' : d.value == 2 ? 'warning' : 'danger'" />
        </template>
      </b-table>
      <b-carousel
        controls
        indicators
        background="#ababab"
        style="text-shadow: 1px 1px 2px #333"
        :interval="0"
        v-if="false"
      >
        <b-carousel-slide
          v-for="(d, i) in defis.filter((d) => d.done)"
          :key="d.name"
          :caption="'Defi ' + (i + 1)"
          :text="d.name"
          :img-src="d.src"
        />
      </b-carousel>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSeposcoqcu7mKpzoE4phDZxLwHmq39UHPzbnLFjHkrnovJnpw/viewform?usp=sf_link"
        target="_blank"
        class="btn w-100 mb-2 text-white btn-secondary"
        >Ajoutez un défi à Taty!</a
      >
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defis: [
        {
          name: "Prendre une photo sur un gros tracteur John Deere",
          done: false,
          src: "",
          diff: 2,
        },
        {
          name: "Collecter un maximum de containers à frites McDo (soit en commander, soit les ramasser dans la nature)",
          done: false,
          src: "",
          diff: 2,
        },
        {
          name: "Ecouter <i>Histoires pour les oreilles</i>",
          done: false,
          src: "",
          diff: 1,
        },
        {
          name: "Écouter en boucle <i>Jésus est le rocher de ma vie</i> jusqu’à connaître les paroles",
          done: false,
          src: "",
          diff: 1,
        },
        {
          name: "Compléter : <i> tape tape petites ..., tourne, tourne petit ..., vole vole petit ..., nage nage petit ... dans l'eau !</i>",
          done: false,
          src: "",
          diff: 3,
        },
        {
          name: "Faire une journée de woofing ou prier et/ou dormir dans un monastère",
          done: false,
          src: "",
          diff: 3,
        },
      ],
    };
  },
};
</script>
