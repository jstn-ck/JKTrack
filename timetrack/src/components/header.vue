<template>
	<header>
		<h1>User: {{ name }}</h1>
    <div class="nav">
      <ul>
        <li>Timetracking</li>
        <li>History</li>
      </ul>
    </div>
		<Clock/>
	</header>
</template>
<script>

import Clock from "@/components/clock.vue"

export default {
data(){
	return {
		name: localStorage.name,
	};
},
components: {
	Clock
	}
};
</script>

<style scoped lang="scss">
header {
	position: relative;
	padding: 0 10px;
	height: 90px;
	display: flex;
	justify-content: space-between;
	border-bottom: 2px solid $grey;

	h1 {
		font-size: 65px;
	}

  .nav {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;

    ul {
      display: block;
      list-style: none;

      li {
        display: inline-block;
        padding: 0.3em;
        cursor: pointer;
      }
    }
  }
}

</style>
