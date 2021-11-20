<template>
  <div class="column">
    <h2 class="column__name">
      <span v-if="!isInputShowed">
        {{ columnTitle }}
      </span>

      <input
        v-else
        ref="title"
        v-model="columnTitle"
        type="text"
        class="column__input"
        name="column_title"
      />

      <AppIcon
        v-if="!isInputShowed"
        class="icon--edit"
      />
      <AppIcon
        v-if="!isInputShowed && !columnTasks.length"
        class="icon--trash"
      />
    </h2>

    <div class="column__target-area">
      <TaskCard
        v-for="task in columnTasks"
        :key="task.id"
        :task="task"
        class="column__task"
      />
    </div>
  </div>
</template>

<script>
import TaskCard from '@/modules/tasks/components/TaskCard';
import AppIcon from '@/common/components/AppIcon';

export default {
  name: 'DeskColumn',
  components: {
    TaskCard,
    AppIcon
  },
  props: {
    column: {
      type: Object,
      required: true
    },
    tasks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      columnTitle: this.column.title,
      isInputShowed: false
    };
  },
  computed: {
    columnTasks() {
      return this.tasks
        .filter(task => task.columnId === this.column.id)
        .sort((a, b) => a.sortOrder - b.sortOrder);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/blocks/column.scss';
</style>
