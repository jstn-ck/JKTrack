<template>
  <div class="main">
    <Login/>
    <Timetrack/>
    <History/>
  </div>
    <router-view/>
</template>
<script>

export default {
  name: 'App'
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,body {
  display: block;
  position: relative;
  font-size: 18px;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 15px;
}

.main {
  position: relative;
  display: block;
}

.container {
	position: relative;
	display: block;
	max-width: 1250px;
	width: 100%;
	height: 100%;
}

.divider {
	position: relative;
	display: block;
	width: 100%;
}

.overlay {
	position: fixed;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba($main, 0.4);
	z-index: 9999;
	visibility: hidden;
	opacity: 0;
	transition: opacity 0.5s ease;
	pointer-events: none;

	@keyframes popup{
		0%{
			transform: scale(0.5);
		}
		100%{
			transform: scale(1);
		}
	}

	&.active {
		visibility: visible;
		opacity: 1;
		pointer-events: all;

		.overlay-window {
			animation: popup 0.5s ease;
		}
	}

	.overlay-window {
		display: block;
		position: relative;
		min-width: 500px;
		min-height: 400px;
		padding: calc(1.5rem + 45px) 15px;
		background-color: $white;
		border-radius: 15px;

		.save-tab {
			position: relative;
			display: block;
			background-color: $lightblue;
			color: $white;
			max-width: 100%;
			margin-left: auto;
			transition: 0.3s ease;

			&:hover {
				background-color: lighten($lightblue, 10);
			}
		}

		input.tab-title {
			border: 1px solid rgba($lightblue, 0.2);
			outline: 0;
			padding: 15px 10px;
			width: 100%;
			font-size: 27px;
			transition: 0.2s ease-in;

			&:focus {
				border: 1px solid rgba($lightblue, 1);
			}
		}

		h3 {
			color: $main;
			padding: 10px 0;
		}

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 45px;
			background-color: $lightblue;
			z-index: 99999;
			border-top-left-radius: 15px;
			border-top-right-radius: 15px;
		}
	}
}

.btn {
	position: relative;
	display: block;
	outline: 0;
	border: 0;
	cursor: pointer;
	padding: 10px 20px;
	right: 0;
	margin-top: 20px;
	transition: 0.3s ease;
	background-color: $lightblue;
	color: $white;

  &:hover {
    background-color: #e1e2e3;
  }
}
</style>
