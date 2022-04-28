<template>
  <div id="app">
    <div class="upload-file">
      <label for="file">Sube imagenes</label>
      <input @change="upload" type="file" ref="file" id="file" multiple />
    </div>
    <hr />
    <PhotoGallery :photos="photos" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import PhotoGallery from "./components/PhotoGallery.vue";

const photos = ref([]);
const file = ref();

function upload() {
  for (let archivo of file.value.files) {
    const reader = new FileReader();
    reader.onload = ({ target }) => {
      photos.value.push(target.result);
    };
    reader.readAsDataURL(archivo);
  }
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.upload-file {
  label {
    cursor: pointer;
    display: inline-block;
    width: 300px;
    padding: 14px;
    background-color: #41b883;
    color: white;
    border-radius: 14px;
    box-shadow: 2px 2px 2px black;

    &:hover {
      background-color: #35495e;
    }
  }

  input {
    display: none;
  }
}
</style>
