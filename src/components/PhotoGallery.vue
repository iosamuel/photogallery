<template>
  <div class="gallery" :style="{ backgroundImage: `url(${ highlighted })` }">
    <div class="column" v-for="(column, key) in photosColumns" :key="key">
      <img
        v-for="(photo, key) in column" :key="key"
        @click="highlight(photo)"
        :src="photo"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoGallery',
  props: ['photos'],
  data() {
    return {
      highlighted: '',
      imgColumn: 3,
    };
  },
  computed: {
    photosColumns() {
      return Array.from({
        length: Math.ceil(this.photos.length / this.imgColumn),
      }, (v, i) => this.photos.slice(i * this.imgColumn, i * this.imgColumn + this.imgColumn));
    },
  },
  methods: {
    highlight(photo) {
      this.highlighted = photo;
    },
  },
};
</script>

<style lang="scss" scoped>
  .gallery {
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    padding: 0 4px;

    ul {
      list-style-type: none;
      padding: 0;
      li {
        display: inline-block;
        margin: 0 10px;
      }
    }

    img {
      width: 50%;
    }
  }

  .column {
    flex: 25%;
    max-width: 25%;
    padding: 0 4px;
  }

  .column img {
    margin-top: 8px;
    vertical-align: middle;
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    .column {
      flex: 100%;
      max-width: 100%;
    }
  }
</style>
