<template>
	<header>
		<h1>User: {{ name }}</h1>
    <div class="nav">
      <ul>
        <li><router-link to="/Timetrack">Timetracking</router-link></li>
        <li><router-link to="/History">History</router-link></li>
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
		margin: auto auto 20px;

    ul {
      display: block;
      list-style: none;
			text-decoration: none;

      li {
        display: inline-block;
        cursor: pointer;
				margin-right: 10px;

				a {
					color: #fff;
					text-decoration: none;
					padding: 0.7em;
					background-color: $lightblue;

					&.is-active {
						background-color: darken($lightblue, 25px);
					}
				}
      }
    }
  }
}

</style>
