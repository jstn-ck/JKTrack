<template>
	<span class="clock" v-text="day+'.' + month+'/' + hours+':' + minutes+':' + seconds" key="componentKey"></span>
</template>

<script>
export default {
  data(){
    return {
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
      if(t < 10) {
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
}
</script>
<style lang="scss" scoped>
.clock{
	display: inline-block;
	position: absolute;
  right: 10px;
  bottom: 10px;
	margin-left: auto;
	font-size: 28px;
}
</style>