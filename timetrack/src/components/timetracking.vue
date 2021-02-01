<template>
  <div class="timetrack">
    <h1>Hallo, {{ name }}</h1>
    <span class="clock" v-text="hours+':' + minutes+':' + seconds"></span>
    <hr class="divider">
      <div class="active-projects">
        <ActiveProjects/>
      </div>
  </div>
</template>

<script>

import ActiveProjects from "@/components/active-projects.vue"

export default {
  data(){
    return {
      name: localStorage.name,

      hours: 0,
      minutes: 0,
      seconds: 0
    };
  },

  beforeMount() {
    this.$options.timer = window.setTimeout(this.updateTime, 1000);
  },

  beforeUnmount() {
    window.clearTimeout(this.$options.timer);
  },

  methods: {
    updateTime() {
      const date = new Date();
      this.hours = date.getHours();
      this.minutes = date.getMinutes();
      this.seconds = date.getSeconds();
      this.$options.timer = window.setTimeout(this.updateTime, 1000);
    }
  },

  components: {
    ActiveProjects
  }
}
</script>

<style lang="scss" scoped>
.timetrack {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  h1,.clock {
    font-size: 55px;
  }

  .active-projects {
    padding: 20px;
    margin: 10px 5px;
  }

  .clock{
    display: inline-block;
    position: relative;
    margin-left: auto;
  }
}

</style>
