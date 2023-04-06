<template>
  <b-col class="pt-2" style="height: 200px">
    <b-card no-body class="bg-photo h-100 p-1" ref="resizeContainer">
      <!--slides-per-view="4"-->
      <swiper-container
        :slides-per-view="slidesPerView"
        grab-cursor="true"
        space-between="0"
        free-mode="true"
        scrollbar="true"
        class="h-100 w-100"
      >
        <swiper-slide v-for="(p, i) in photos" :key="p.uid" class="d-flex justify-content-center">
          <template v-if="i < 10">
            <b-img class="h-100 cursor-pointer" :src="p.url" @click="openModal(i)" />
          </template>
          <template v-else>
            <b-img-lazy class="h-100 cursor-pointer" :src="p.url" @click="openModal(i)" />
          </template>
        </swiper-slide>
        <!-- <swiper-slide>
          <div class="h-100 d-flex justify-content-center align-items-center bg-light">
            <a href="https://photos.app.goo.gl/VPdgZR1rM6jrhfr57" target="_blank">See more photos... </a>
          </div>
        </swiper-slide>-->
      </swiper-container>
      <div id="see-all-photos" class="bg-photo px-2" v-if="!newsView">
        <a href="https://photos.app.goo.gl/VPdgZR1rM6jrhfr57" target="_blank">See all photos </a>
      </div>
      <b-modal ref="modal" hide-footer centered hide-header scrollable size="xl">
        <div class="w-100 h-100 d-flex justify-content-center align-items-center" v-if="photos.length > 0">
          <b-icon
            icon="caret-left-fill"
            scale="3"
            class="mr-2 cursor-pointer"
            @click="i_photo = Math.max(i_photo - 1, 0)"
            v-if="i_photo != 0"
          />
          <b-img :src="photos[i_photo].url + '=w1920-h1080'" fluid class="h-100" />
          <b-icon
            icon="caret-right-fill"
            scale="3"
            class="ml-2 cursor-pointer"
            @click="i_photo = Math.min(i_photo + 1, photos.length - 1)"
            v-if="i_photo != photos.length - 1"
          />
        </div>
      </b-modal>
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
  props: ["newsView"],
  data() {
    return {
      modal_link: "",
      photos_google: [],
      photos_news: [{ url: "https://drive.google.com/uc?export=view&id=1yxmKzYhO-R8l9mZo7yQpcnApPsLM8KTB" }],

      observer: null,
      slidesPerView: 4,
      i_photo: 0,
    };
  },
  methods: {
    openModal(i_new) {
      this.i_photo = i_new;
      this.$refs["modal"].show();
    },
    async loadPhotos() {
      const response = await fetch("https://farwest-photos.raphaelnussbaumer.com/");
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const json = await response.json();
      if (json != null) {
        this.photos_google = json;
        /*this.photos = [
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
        });*/
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
  computed: {
    photos() {
      if (this.newsView) {
        return this.photos_news;
      } else {
        return this.photos_google;
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
        tries = maxTries;
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
<style scoped>
#see-all-photos {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 99;
  opacity: 80%;
}
</style>
