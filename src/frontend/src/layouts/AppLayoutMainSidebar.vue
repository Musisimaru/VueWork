<template>
  <AppDrop
    class="backlog"
    :class="{ 'backlog--hide': backlogIsHidden }"
    @drop="moveTask"
  >
    <button
      class="backlog__title"
      @click="backlogIsHidden = !backlogIsHidden"
    >
      <span>
        Бэклог
      </span>
    </button>
    <div class="backlog__content">
      <div class="backlog__scroll">
        <div class="backlog__collapse">
          <div class="backlog__user">
            <div class="backlog__account">
              <!-- // Благодаря прокси дев сервера мы берём /public изображения
              // с сервера, запущенного на порту 3000.
              // В этом случае мы выбрали user6.jpg в качестве заглушки. -->
              <img
                src="/public/user6.jpg"
                alt="Ваш аватар"
                width="32"
                height="32"
              />
              Игорь Пятин
            </div>

            <!-- // выводим количество задач в шаблоне -->
            <div class="backlog__counter">
              {{ sidebarTasks.length }}
            </div>
          </div>

          <!-- // в цикле выводим список задач -->
          <div class="backlog__target-area">
            <TaskCard
              v-for="task in sidebarTasks"
              :key="task.id"
              :task="task"
              class="backlog__task"
              @drop="moveTask($event, task)"
            />
          </div>
        </div>
      </div>
    </div>
  </AppDrop>
</template>
<script>
// Список задач, из которого достанем задачи для сайдбара.
import tasks from '@/static/tasks.json';
// Вспомогательные функции для нормализации задач и тегов задач.
import { normalizeTask, getTagsArrayFromString } from '@/common/helpers';
import AppDrop from '@/common/components/AppDrop';
import taskStatuses from '@/common/enums/taskStatuses';
import TaskCard from '@/modules/tasks/components/TaskCard';
import { addActive, getTargetColumnTasks } from '@/common/helpers';
import { cloneDeep } from 'lodash';

export default {
  name: 'AppLayoutMainSidebar',
  components: { TaskCard, AppDrop },
  props: {
    asks: {
      type: Array,
      required: true
    },
    filters: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      taskStatuses,
      backlogIsHidden: false
    };
  },
  computed: {
    // Выбираем только задачи без id колонки (у нас это именно задачи сайдбара).
    // Нормализуем список тегов.
    // Сортируем задачи по их порядку внутри колонки.
    sidebarTasks() {
      return this.tasks
        .filter(task => !task.columnId)
        .sort((a, b) => a.sortOrder - b.sortOrder);
    }
  },
  methods: {
    moveTask(active, toTask) {
      // Note: prevent update if task is not moving
      if (toTask && active.id === toTask.id) {
        return;
      }
      const toColumnId = this.column ? this.column.id : null;
      const targetColumnTasks = getTargetColumnTasks(toColumnId, this.tasks);
      const activeClone = cloneDeep({ ...active, columnId: toColumnId });
      const resultTasks = addActive(activeClone, toTask, targetColumnTasks);
      const tasksToUpdate = [];
      resultTasks.forEach((task, index) => {
        if (task.sortOrder !== index || task.id === active.id) {
          const newTask = cloneDeep({ ...task, sortOrder: index });
          tasksToUpdate.push(newTask);
        }
      });
      this.$emit('updateTasks', tasksToUpdate);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/task.scss";
@import "~@/assets/scss/blocks/backlog.scss";
</style>
