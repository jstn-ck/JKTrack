<template>
	<span class="clock" v-text="dayName+' ' + day+'.' + month+'/' + hours+':' + minutes+':' + seconds"></span>
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
			dayName: '',
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
      const dayNames = ["So","Mo", "Di", "Mi", "Do", "Fr", "Sa"];
      const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember" ];
      this.hours = leadingZero(date.getHours());
      this.minutes = leadingZero(date.getMinutes());
      this.seconds = leadingZero(date.getSeconds());
      this.day = date.getDate();
			this.dayName = dayNames[date.getDay()];
      this.month = monthNames[date.getMonth()];
      this.$options.timer = window.setTimeout(this.updateTime, 1000);
    },
  },
}
</script>
<style lang="scss" scoped>
.clock{
	display: inline-block;
	position: relative;
	margin-top: auto;
	right: 10px;
	bottom: 10px;
	margin-left: auto;
	font-size: 28px;
}
</style>
