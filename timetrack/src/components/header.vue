<template>
	<header>
		<h1>User: {{ name }}</h1>
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

		&::before,&::after {
			content: '';
			position: relative;
			display: inline-block;
			width: 4px;
			top: 0;
			right: 0;
			height: 14px;
			background-color: $main;
		}

		&::after {
			width: 14px;
			height: 4px;
			transform: translate3d(-6px, 6px, 0px);
		}
	}
}

</style>
