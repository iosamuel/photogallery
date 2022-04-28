<template>
  <transition-group
    name="list"
    tag="div"
    class="gallery"
    :style="{ backgroundImage: `url(${highlighted})` }"
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
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  photos: {
    type: Array,
    default: () => [],
  },
});

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

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
