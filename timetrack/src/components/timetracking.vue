<template>
  <div class="timetrack">
    <Note/>
    <div class="container">
      <div class="active-projects">
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
  flex-wrap: wrap;
  justify-content: center;

  .active-projects {
    padding: 20px;
    margin: 10px 5px;
  }
}

</style>
