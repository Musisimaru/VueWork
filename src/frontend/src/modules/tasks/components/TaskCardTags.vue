<template>
  <ul class="task__tags">
    <li
      v-for="(tag, index) in tagsArray"
      :key="index"
    >
      <span class="task__tag">
        {{ tag }}
      </span>
    </li>
  </ul>
</template>

<script>

import { getTagsArrayFromString } from '@/common/helpers';

export default {
  name: 'TaskCardTags',
  props: {
    tags: {
      type: String,
      required: true
    }
  },
  computed: {
    tagsArray() {
      return getTagsArrayFromString(this.tags);
    }
  }
};

</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/blocks/task.scss';
</style>
