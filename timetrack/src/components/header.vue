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
	}
}

</style>
