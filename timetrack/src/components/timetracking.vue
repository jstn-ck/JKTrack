<template>
  <div class="timetrack">
    <Note/>
    <div class="container">
      <div class="projects">
        <ActiveProjects/>
      </div>
    </div>
  </div>
</template>

<script>

import ActiveProjects from "@/components/active-projects.vue"
import Note from "@/components/note.vue"

export default {
  components: {
    ActiveProjects,
    Note
  }
};
</script>

<style lang="scss" scoped>
.timetrack {
  display: flex;

  .projects {
    margin: 20px 20px 0 0;
  }
}

</style>
