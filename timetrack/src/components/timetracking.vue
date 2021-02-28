<template>
	<div v-if="isLoading" class="loading-screen"><div class="lines"></div></div>
  <div class="timetrack">
    <Note/>
    <div class="container">
			<div @mouseenter="animate" class="topbar plusAnim"><h2>Neuer Task</h2><div @mouseenter="animate" class="new-task"></div></div>
      <div class="projects">
        <ActiveProjects/>
      </div>
    </div>
  </div>
</template>

<script>
import ActiveProjects from "@/components/tasks.vue"
import Note from "@/components/note.vue"

export default {
	data() {
		return {
			isLoading: true,
		}
	},
  components: {
    ActiveProjects,
    Note
  },
	methods: {
		animate() {
			const plusAnim = document.getElementsByClassName("plusAnim");
			if(plusAnim) {
				plusAnim[0].addEventListener('animationend', function(e) {
					plusAnim[0].classList.remove('animated');
				});
				plusAnim[0].classList.add('animated');
			}
		}
	},

	mounted() {
		setTimeout(() => {
			this.isLoading = false
		}, 2000)
	}
};
</script>

<style lang="scss" scoped>
.loading-screen {
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	height: 100vh;
	z-index: 9999969;
	width: 100%;
	background-color: $white;
	transition: 0.3s ease;

	.lines {
		/*TO DO*/
	}
}
.timetrack {
  display: flex;

	.topbar {
		position: relative;
		display: flex;
		height: 120px;
		width: calc(100% - 20px);
		margin-top: 20px;
		background-color: $lightblue;
		border-top: 3px solid $main;
		border-left: 3px solid $main;
		border-right: 3px solid $main;
		padding: 0 30px;
		justify-content: flex-end;
		align-items: center;

		&:hover {
			h2 {
				&::before {
					width: 100%;
				}
			}
		}

		&.animated {
			.new-task {
				&::after {
					animation: plusAnimW 800ms ease-in-out;
				}
				&::before {
					animation: plusAnimH 800ms ease-in-out;
				}
			}
		}

		.new-task {
			position: relative;
			display: flex;
			margin: 0 45px 0 40px;
			height: 40px;
			width: 40px;
			justify-content: center;
			align-items: center;
			cursor: pointer;

			&::before,&::after {
				content: '';
				position: absolute;
				display: block;
				background-color: $white;
			}

			@keyframes plusAnimH {
				0% {bottom:0; height: 40px}
				50% {bottom:0; height: 0}
				100% {top:0;height: 40px}
			}
			@keyframes plusAnimW {
				0% {right:0; width: 40px}
				50% {right:0; width: 0}
				100% {left:0;width: 40px}
			}

			&::before {
				width: 4px;
				height: 40px;
			}

			&::after {
				width: 40px;
				height: 4px;
				transform: translate3d(0, -1px, 0);
			}
		}

		h2 {
			position: relative;
			display: inline-block;
			font-size: 37px;
			color: $white;
			cursor: pointer;

			&::before {
				content: '';
				position: absolute;
				bottom: -5px;
				height: 3px;
				background-color: $white;
				width: 0;
				left: 0;
				transition: width 0.7s ease;
			}
		}
	}

  .projects {
    margin: 0 20px 0 0;
		min-height: 500px;
		border: 3px solid $main;
		padding: 30px;
  }
}

</style>
