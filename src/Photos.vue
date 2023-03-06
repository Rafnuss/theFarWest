<template>
  <b-container fluid class="p-4 bg-dark" style="overflow-y: hidden">
    <b-row class="flex-row flex-nowrap">
      <b-col v-for="s in slides" :key="s.image" md="2">
        <b-img-lazy @click.native="openModal(s.image)" thumbnail fluid :src="s.image" />
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
      slides: [
        {
          image: "https://placekitten.com/800/400",
          title: "Slide 1",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          image: "https://placekitten.com/800/401",
          title: "Slide 2",
          description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          image: "https://placekitten.com/800/402",
          title: "Slide 3",
          description:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          image: "https://placekitten.com/800/403",
          title: "Sligfjude 1",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          image: "https://placekitten.com/800/404",
          title: "Slidfgde 2",
          description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          image: "https://placekitten.com/800/405",
          title: "Slide fgj3",
          description:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          image: "https://placekitten.com/800/406",
          title: "Slidfgde 1",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          image: "https://placekitten.com/800/407",
          title: "Slitrzde 2",
          description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          image: "https://placekitten.com/800/408",
          title: "Slidewer 3",
          description:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
      ],
    };
  },
  methods: {
    openModal(link) {
      this.modal_link = link;
      this.$refs["modal"].show();
    },
  },
  mounted() {},
};
</script>

<style></style>
