<template>
  <div id="app">
    <AppLayout
      :tasks="tasks"
      :filters="filters"
    />
  </div>
</template>
<script>
import AppLayout from '@/layouts/AppLayout';
import tasks from '@/static/tasks.json';
import { normalizeTask } from '@/common/helpers';

export default {
  name: 'App',
  components: {
    AppLayout
  },
  data() {
    return {
      tasks: tasks.map(task => normalizeTask(task)),
      filters: {
        search: '',
        users: [],
        statuses: []
      }
    };
  },
  computed: {
    filteredTasks() {
      const filtersAreEmpty = Object.values(this.filters)
        .every(value => !value.length);
      if (filtersAreEmpty) {
        return this.tasks;
      }

      const searchFilter = task => task.title
        .toLowerCase()
        .includes(this.filters.search.toLowerCase().trim());

      const usersFilter = task => this.filters.users
        .some(userId => userId === task.userId);

      const statusesFilter = task => this.filters.statuses
        .some(el => el === task.status || el === task.timeStatus);

      return this.tasks.filter(task => {
        let result = {
          search: searchFilter,
          users: usersFilter,
          statuses: statusesFilter
        };
        return Object.entries(result)
          .every(([key, callback]) =>
            !this.filters[key].length || callback(task));
      });
    }
  }
};
</script>

<style lang="scss">
  @import '~@/assets/scss/app';
</style>
