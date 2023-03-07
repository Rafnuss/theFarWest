<template>
  <b-container fluid class="p-4 bg-dark" style="overflow-y: hidden">
    <b-row class="flex-row flex-nowrap">
      <b-col v-for="p in photos" :key="p.uid" md="2">
        <b-img-lazy @click.native="openModal(p.url)" thumbnail fluid :src="p.url + '=w1920-h1080'" />
      </b-col>
    </b-row>
    <b-modal ref="modal" hide-footer centered hide-header size="xl">
      <b-img :src="modal_link" />
    </b-modal>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      modal_link: "",
      photos: [],
    };
  },
  methods: {
    openModal(link) {
      this.modal_link = link;
      this.$refs["modal"].show();
    },
    async loadPhotos() {
      const response = await fetch("http://farwest-photos.raphaelnussbaumer.com/");
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const json = await response.json();
      if (json != null) {
        console.log(json);
        this.photos = json;
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    const maxTries = 3;
    let tries = 0;
    while (tries < maxTries) {
      let res = this.loadPhotos();
      //console.log(JSON.stringify(re, null, 2))
      if (res) {
        console.log(`Success after: ${tries}.`);
        tries = 1000;
      } else {
        tries++;
        console.log(`Error: ${tries}. Retrying...`);
      }
    }
  },
};
</script>

<style></style>
