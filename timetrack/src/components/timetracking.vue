<template>
  <div class="timetrack">
    <h1>Hallo, {{ name }}</h1>
    <Clock/>
    <hr class="divider">
    <div class="container">
      <Note/>
      <div class="active-projects">
        <ActiveProjects/>
      </div>
    </div>
  </div>
</template>

<script>

import ActiveProjects from "@/components/active-projects.vue"
import Clock from "@/components/clock.vue"
import Note from "@/components/note.vue"

export default {
  data(){
    return {
      name: localStorage.name,

      hours: 0,
      minutes: 0,
      seconds: 0,
      month: '',
      day: '',
      //FastRender Clock
      componentKey: 0
    };
  },

  beforeCreate() {
    this.updateTime;
  },

  mounted() {
    this.$options.timer = window.setTimeout(this.updateTime, 1);
  },

  beforeUnmount() {
    window.clearTimeout(this.$options.timer);
  },

  methods: {
    updateTime() {
      function leadingZero(t) {
      if(t < 10) {
        return '0' + t;
      }
      else {
        return t;
      }
    }
      const date = new Date();
      const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember" ];
      this.hours = leadingZero(date.getHours());
      this.minutes = leadingZero(date.getMinutes());
      this.seconds = leadingZero(date.getSeconds());
      this.day = date.getDay();
      this.month = monthNames[date.getMonth()]; 
      this.$options.timer = window.setTimeout(this.updateTime, 1000);
    },

    forceRerender() {
      this.componentKey += 1;
      this.updateTime;
    }
  },

  components: {
    ActiveProjects,
    Clock,
    Note
  }
}
</script>

<style lang="scss" scoped>
.timetrack {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  h1 {
    font-size: 65px;
  }

  .active-projects {
    padding: 20px;
    margin: 10px 5px;
  }
}

</style>
