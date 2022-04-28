import { computed, ref } from "vue";

export default {
  props: {
    photos: {
      type: Array,
      default: () => [],
    },
  },
  template: /* vue-html */ `
    <input type="number" v-model="imgColumn">
    <hr />
    <transition-group
      name="list"
      tag="div"
      class="gallery"
      :style="{ backgroundImage: 'url(' + highlighted + ')' }"
    >
      <transition-group
        v-for="(column, key) in photosColumns"
        :key="key"
        name="list"
        tag="div"
        class="column"
      >
        <img
          v-for="(photo, key) in column"
          :key="key"
          :src="photo"
          @click="highlight(photo)"
        />
      </transition-group>
    </transition-group>
  `,
  setup(props) {
    const highlighted = ref("");
    const imgColumn = ref(3);

    const photosColumns = computed(() => {
      return Array.from(
        {
          length: Math.ceil(props.photos.length / imgColumn.value),
        },
        (v, i) =>
          props.photos.slice(
            i * imgColumn.value,
            i * imgColumn.value + imgColumn.value
          )
      );
    });

    function highlight(photo) {
      highlighted.value = photo;
    }

    return {
      highlighted,
      imgColumn,
      photosColumns,
      highlight,
    };
  },
};
