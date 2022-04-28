import { ref } from "vue";
import PhotoGallery from "./components/PhotoGallery.js";

export default {
  components: { PhotoGallery },
  template: /* vue-html */ `
    <div id="app">
      <div class="upload-file">
        <label for="file">Sube imagenes</label>
        <input @change="upload" type="file" ref="file" id="file" multiple />
      </div>
      <hr />
      <PhotoGallery :photos="photos" />
    </div>
  `,
  setup() {
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

    return {
      photos,
      file,
      upload,
    };
  },
};
