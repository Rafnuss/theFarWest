<template>
  <!--<b-container fluid class="bg-dark" style="overflow-y: hidden">
    <b-row class="flex-row flex-nowrap">
      <b-col v-for="p in photos" :key="p.uid" md="2">
        <b-img-lazy @click.native="openModal(p.url)" thumbnail fluid :src="p.url" style="max-height: 100%" />
      </b-col>
    </b-row>
    <b-modal ref="modal" hide-footer centered hide-header size="xl">
      <b-img :src="modal_link" />
    </b-modal>
  </b-container>-->
  <b-row class="bg-dark" style="height: 200px" v-if="(photos.length > 0) & false">
    <swiper-container
      slides-per-view="4"
      grab-cursor="true"
      space-between="10"
      free-mode="true"
      scrollbar="true"
      class="h-100"
    >
      <swiper-slide v-for="p in photos" :key="p.uid" class="d-flex justify-content-center">
        <b-img-lazy :src="p.url" />
      </swiper-slide>
    </swiper-container>
  </b-row>
</template>

<script>
import { register } from "swiper/element/bundle";
register();

import "swiper/css";

import "swiper/css/free-mode";
import "swiper/css/pagination";

export default {
  data() {
    return {
      modal_link: "",
      photos: [],
    };
  },
  methods: {
    openModal(link) {
      this.modal_link = link + "=w1920-h1080";
      this.$refs["modal"].show();
    },
    async loadPhotos() {
      const response = await fetch("http://farwest-photos.raphaelnussbaumer.com/");
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const json = await response.json();
      if (json != null) {
        this.photos = json;
        /* this.photos = [
          "PXL_20230122_135023845.jpg",
          "PXL_20230123_003245995.PORTRAIT.jpg",
          "PXL_20230212_174355161.jpg",
          "PXL_20230301_134654730.PORTRAIT.jpg",
          "PXL_20230122_161840068.jpg",
          "PXL_20230123_004238371.PORTRAIT.jpg",
          "PXL_20230218_135634997.PORTRAIT.jpg",
          "PXL_20230301_134658774.PORTRAIT.jpg",
          "PXL_20230123_003224393.jpg",
          "PXL_20230211_000205467.PORTRAIT.jpg",
          "PXL_20230218_142137347.jpg",
        ].map((e) => {
          return { url: "Photos-001/" + e };
        });*/
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
