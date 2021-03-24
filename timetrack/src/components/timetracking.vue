<template>
	<transition name="leaveAnim">
	<div v-if="isLoading" class="loading-screen"><div class="lines"></div></div>
	</transition>
  <div class="timetrack">
		<div class="overlay">
			<div class="overlay-window task">
				<button class="close-overlay"></button>
				<h3>Neuer Task :</h3>
				<input v-model="taskTitle" class="tab-title" type="text" placeholder="Titel">
				<hr class="divider"/>
				<button @click="addTask" class="addTask btn">Hinzufügen</button>
			</div>
		</div>
    <Note/>
    <div class="container">
				<div @mouseenter="animate" class="topbar plusAnim">
					<div @click="openTaskWindow" class="new">
						<h2>Neuer Task</h2>
						<div @mouseenter="animate" class="new-task"></div></div>
				</div>
      <div class="projects">
				<div class="task" v-for="task in tasks" :key="task.id">
					<h3 class="task-title">{{ task.title }}</h3>
          <hr class="divider"/>
					<div v-bind="timer" class="timer">{{ task.hours }}:{{ task.minutes }}:{{ task.seconds }}</div>
          <div class="timer-options">
            <button @click="startTimer" class="start-timer btn">s</button>
            <button @click="pauseTimer" class="pause-timer btn">p</button>
            <button @click="endTimer" class="end-timer btn">e</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Note from "@/components/note.vue"
import { v4 as uuidv4 } from 'uuid';
const ov = document.getElementsByClassName('overlay');
const ovClose = document.getElementsByClassName('close-overlay');
const ovW = document.getElementsByClassName('overlay-window');

export default {
	data() {
		return {
			isLoading: true,
			tasks: [],
			activeId: null,
			taskTitle: '',
		}
	},
  components: {
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
		},
		openTaskWindow() {
			ov[0].classList.add('active');
			ovClose[0].addEventListener("click", function() {
				ov[0].classList.remove('active');
			})
		},
		addTask() {
			if(!this.taskTitle.replace(/\s/g,"") == "") {
				let id = uuidv4();
					this.tasks.push({
						title: this.taskTitle,
						id: id,
						minutes: 0,
						hours: 0,
						seconds: 0,
					})
				ov[0].classList.remove('active');
				this.saveTask();
			}
		},
		saveTask() {
			const parsed = JSON.stringify(this.tasks);
			localStorage.setItem('tasks', parsed);
		},
		startTimer() {
			setTimeout(function() {
				this.tasks.hours++;
			}, 1);
		},
		pauseTimer() {
			return;
		},
		endTimer() {
			return;
		},
	},

	computed: {
		timer() {
			var hours = 0;
			var minutes = 0;
			var seconds = 0;

			return seconds+hours+minutes;
		}
	},

	mounted() {
		setTimeout(() => {
			this.isLoading = false
		}, 1250)
		if (localStorage.getItem('tasks')) {
			try {
				this.tasks = JSON.parse(localStorage.getItem('tasks'));
			} catch(e) {
				localStorage.removeItem('tasks');
			}
		}
	},
};
</script>

<style lang="scss" scoped>
.leaveAnim-enter-active, .leaveAnim-leave-active {
	transition: opacity .5s;
}
.leaveAnim-enter, .leaveAnim-leave-to {
	opacity: 0;
}

.timer {
	position: relative;
	display: block;
	color: black;
	min-height: 30px;
}

.timetrack {
	.overlay {
		.overlay-window {
			min-width: 600px;
			min-height: 500px;

			.addTask {
				position: absolute;
				display: block;
				background-color: $lightblue;
				color: $white;;
				width: 100%;
				bottom: -12px;
				padding: 20px;
				left: 0;
				font-weight: 600;
				border-bottom-left-radius: 30px;
				border-bottom-right-radius: 30px;

				&:hover {
					background-color: lighten($lightblue, 10);
					}
			}

			.divider {
				position: relative;
				display: block;
				margin: 50px 0 20px;
			}

			&::before {
				background-color: $gradient-color;
				background: $gradient;
			}

			.close-overlay{
				position: absolute;
				display: block;
				width: 20px;
				top: 15px;
				right: 15px;
				height: 20px;
				outline: 0;
				border: 0;
				border-radius: 50%;
				background-color: #cc473d;
				z-index: 999999999;
				cursor: pointer;

				&::before,&::after {
					content:'';
					position: absolute;
					top: 50%;
					transform: translate(-50%, -50%) rotate(45deg);
					left: 50%;
					display: block;
					background-color: black;
					width: 10px;
					opacity: 0.4;
					height: 2px;
				}
				&::after {
					transform: translate(-50%, -50%) rotate(135deg);
				}
	}
	}
}
}

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
	align-items: center;
	justify-content: center;

	.lines {
		position: relative;
		display: block;
		width: 50%;
		height: 20%;

		&::before,&::after {
			content: '';
			position: absolute;
			background-color: $lightblue;
			width: 50px;
			height: 7px;
			opacity: 0;
			right: 0;
			top: 50px;
			animation: lineAnimR 1.4s ease-in-out;
			transition: opacity 0.2s ease;
		}
		&::after {
			left: 0;
			opacity: 0;
			top: 65px;
			transition: opacity 0.2s ease;
			animation: lineAnimL 1.4s ease-in-out;
		}

		@keyframes lineAnimL {
			0% {
				left: 0;
				opacity: 1;
			}
			50% {
				left: 50%;
				opacity: 1;
			}
			100% {
				left: 100%;
			}
		}
		@keyframes lineAnimR {
			0% {
				right: 0;
				opacity: 1;
			}
			50% {
				right: 50%;
				opacity: 1;
			}
			100% {
				right: 100%;
			}
		}
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
		background-color: rgb(208,208,208);
		background: linear-gradient(90deg, rgba(208,208,208,1) 0%, rgba(121,149,168,1) 74%, rgba(121,149,168,1) 100%);
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

		.new {
			cursor: pointer;
			position: relative;
			display: flex;
			width: 400px;
			height: 80px;
			align-items: center;
			justify-content: center;
		}

		.new-task {
			position: relative;
			display: flex;
			margin: -5px 45px 0 40px;
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
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;

		.task {
      position: relative;
			max-width: 400px;
			min-height: 300px;
			height: 100%;
			margin: 0.5em 1.3em;
			width: 100%;
			flex: 1 1 50%;
			border: 3px solid $main;
			padding: 1.3em;

			.divider {
				margin-top: 50px;
			}

			.timer-options {
				display: flex;
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
			}

        .start-timer,.pause-timer,.end-timer {
          position: relative;
          bottom: 0;
          display: inline-block;
          width: 100%;
        }
        .start-timer {
          background-color: #6097b5;

          &:hover {
            background-color: lighten(#6097b5, 15px);
          }
        }
        .pause-timer {
          background-color: #52829c;

          &:hover {
            background-color: lighten(#52829c, 15px);
          }
        }
        .end-timer {
          background-color: #446c82;
          margin-left: 30px;

          &:hover {
            background-color: lighten(#446c82, 15px);
          }
        }

			h3 {
				font-size: 34px;
				word-break: break-word;
			}
		}
  }
}

</style>
