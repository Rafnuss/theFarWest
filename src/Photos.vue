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
  <b-col v-show="photos.length > 0" style="height: 200px" class="pt-2">
    <b-card no-body class="bg-dark h-100 p-1" ref="resizeContainer">
      <!--slides-per-view="4"-->
      <swiper-container
        :slides-per-view="slidesPerView"
        grab-cursor="true"
        space-between="0"
        free-mode="true"
        scrollbar="true"
        class="h-100 w-100"
      >
        <swiper-slide v-for="p in photos" :key="p.uid" class="d-flex justify-content-center">
          <a
            :href="
              'https://photos.google.com/share/AF1QipOLgdj0ER3a_cn65K57LMusJT3LgR497ja65WUBSjo-Dl2DSAZdSSFtyzaGUKuDwg/photo/' +
              p.uid
            "
            target="_blank"
          >
            <b-img-lazy class="h-100" :src="p.url" />
          </a>
        </swiper-slide>
        <swiper-slide>
          <div class="h-100 d-flex justify-content-center align-items-center bg-light">
            <a href="https://photos.app.goo.gl/VPdgZR1rM6jrhfr57" target="_blank">See more on google album... </a>
          </div>
        </swiper-slide>
      </swiper-container>
    </b-card>
  </b-col>
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
      observer: null,
      slidesPerView: 4,
    };
  },
  methods: {
    openModal(link) {
      this.modal_link = link + "=w1920-h1080";
      this.$refs["modal"].show();
    },
    async loadPhotos() {
      const response = await fetch("https://farwest-photos.raphaelnussbaumer.com/");
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const json = await response.json();
      if (json != null) {
        //this.photos = json;
        this.photos = [
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
          return { url: "photos/" + e };
        });
        return true;
      } else {
        return false;
      }
    },
    handleResize(entries) {
      const w = entries[0].contentRect.width;
      const h = entries[0].contentRect.height;
      this.slidesPerView = Math.floor(((w / h) * 3) / 4);
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
  mounted() {
    this.observer = new ResizeObserver(this.handleResize);
    this.observer.observe(this.$refs.resizeContainer);
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
};
</script>
