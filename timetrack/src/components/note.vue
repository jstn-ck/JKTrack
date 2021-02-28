<template>
	<div class="note">
		<div class="overlay">
			<div class="overlay-window">
				<h3>Titel Wählen:</h3>
				<input class="tab-title" type="text" placeholder="Titel">
				<button class="save-tab btn">Hinzufügen</button>
			</div>
		</div>
		<div :class="{open: isOpen}" class="note-settings">
			<button @click="openSettings" class="open-settings"></button>
			<button @click="deleteNote" class="delete-note">Löschen</button>
			<button @click="deleteAll" class="delete-all">Alles Löschen</button>
		</div>
		<h4 class="note-title">Notizen</h4>
		<div class="note-tabs">
			<ul class="tablist">
				<li v-for="note in notes" :key="note.id" @click="() => activateNote(note.id)" :class="{active: note.id === activeId}" class="tab">{{ note.title }}</li>
			</ul>
			<button @click="limitTabs" :class="{hidden: hidden}" class="new-note-tab"></button>
		</div>
		<div class="form-container">
			<form autocomplete="off" class="note-form">
			<textarea :value="activeNote?.content" name="note-area" @input="$event => handleChange($event)" id="note-area"></textarea>
		</form>
		</div>
	</div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';

var nbtn = document.getElementsByClassName("new-note-tab");

export default {
data () {
		return {
			notes: [],
			activeId: null,
			isOpen: false,
			hidden: false,
		}
},

	computed: {
		activeNote() {
			return this.notes.find(note => note.id === this.activeId);
		}
	},

	mounted() {
		if (localStorage.getItem('notes')) {
			try {
				this.notes = JSON.parse(localStorage.getItem('notes'));
				this.activeId = this.notes[0].id;
			} catch(e) {
				localStorage.removeItem('notes');
			}
		}
	},

	methods: {
		limitTabs() {
			var tabCount = Object.keys(this.notes).length
			if(tabCount <= 9) {
				this.addNote();
				if(tabCount >= 9) {
					this.hidden = true;
				}
			} else {
				this.hidden = true;
			}
		},
		addNote() {
			let id = uuidv4();
			this.notes.push({
				title: "Tab",
				id: id,
				content: '',
			})
			this.activateNote(id);
			this.saveNote();
		},
		deleteNote() {
			this.isOpen = false;

			if(this.activeNote !== undefined) {
				const noteIndex = this.notes.indexOf(this.activeNote);
				this.notes.splice(noteIndex, 1);
				this.saveNote();
				this.hidden = false;
			}
		},

		deleteAll() {
			this.isOpen = false;
			nbtn[0].classList.remove('hidden');
			const parsed = JSON.stringify(this.notes);
			localStorage.removeItem('notes', parsed);
			this.notes = [];
			this.saveNote();
		},

		activateNote(id) {
			this.activeId = id;
		},
		handleChange($event) {
			this.activeNote.content = $event.target.value;
			this.saveNote();
		},
		saveNote() {
			const parsed = JSON.stringify(this.notes);
			localStorage.setItem('notes', parsed);
		},

		openSettings() {
			this.isOpen = !this.isOpen;
		}
	}
};
</script>

<style scoped lang="scss">
button {
	border: 0;
	outline: 0;
}

.hidden {
	display: none !important;
}

.overlay {
	position: fixed;
	height: 100vh;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba($main, 0.19);
	z-index: 9999;
	visibility: hidden;
	opacity: 0;

	.overlay-window {
		display: block;
		position: relative;
		min-width: 500px;
		min-height: 400px;
		padding: calc(1.5rem + 45px) 15px;
		background-color: $white;
		border-radius: 15px;
		box-shadow: 3px 3px 0 3px $lightblue;

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

.note {
	position: relative;
	display: inline-block;
	width: 100%;
	max-width: 450px;
	height: 100%;
	border: 3px solid $main;
	padding: 20px;
	margin-top: 20px;
	overflow: hidden;
	box-shadow: $shadow;
	order: 1;
	transition: 0.3s ease;

	.note-settings {
		display: inline-block;
		position: absolute;
		min-width: 20px;
		height: 35px;
		top: 30%;
		right: 0;
		border: 0;
		outline: 0;
		background-color: $lightblue;
		z-index: 999;
		transition: 0.3s ease;

		.open-settings {
			position: absolute;
			background-color: $lightblue;
			top: 0;
			left: 0;
			min-width: 22px;
			color: $white;
			height: 33px;
			cursor: pointer;
			background-image: url("../../src/assets/trash.svg");
			background-repeat: no-repeat;
			background-size: 80%;
			background-position: center center;
		}

		.delete-note,.delete-all {
			margin-left: 30px;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			outline: 0;
			cursor: pointer;
			background-color: transparent;
			transition: 0.35s ease;
			color: $white;
			border: 0;
			display: none;
			opacity: 0;

			&:hover {
				display: inline-block;
				color: lightcoral;
			}
		}

		.delete-all {
			position: absolute;
			right: 8px;

		}

		&.open {
			min-width: 200px;
			max-height: 34px;
			border: 1px solid $lightblue;
			border-right: 0;

			.open-settings {
				border-right: 1px solid $white;
			}

			.delete-note,.delete-all {
				opacity: 1;
				display: inline-block;
			}
		}
	}

	.form-container {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
	}

	.note-tabs {
		font-size: 14px;
		display: inline-block;
		margin-left: 0.4rem;
		position: relative;

		.new-note-tab {
			display: inline-block;
			position: absolute;
			width: 20px;
			height: 20px;
			top: 2px;
			border: 0;
			outline: 0;
			cursor: pointer;
			background-color: #fff;

			&::before,&::after {
				content: '';
				position: absolute;
				width: 2px;
				top: 0;
				height: 14px;
				background-color: $second;
			}

			&::after {
				width: 14px;
				height: 2px;
				transform: translate3d(-6px, 6px, 0px);
			}
		}

		ul.tablist {
			display: inline-block;
			list-style: none;
			position: relative;

			.tab {
				cursor: pointer;
				transition: 0.3s ease;
				position: relative;
				width: 30px;

				&::before{
					transition: 0.3s ease;
					content: '';
					position: absolute;
					background-color: $lightblue;
					bottom: -18px;
					left: 0;
					width: 100%;
					height: 1px;
					z-index: -1;
				}

				&.active {
					color: $white;
					font-weight: 600;

					&::before {
						height: 40px;
						box-shadow: 50px 50px 0px -30px $lightblue;
					}

					&:hover {
						color: $white;
					}
				}

				&:hover {
					color: lighten($grey,0.4);
				}
			}

			li {
				display: inline-block;
				padding: 0 0.2rem;
				cursor: pointer;
			}
		}
	}

	h4.note-title {
		display: inline-block;
		padding-right: 0.4rem;
		border-right: 1px solid $grey;
	}

	textarea {
		resize: none;
		position: relative;
		display: inline-block;
		width: 100%;
		height: 450px;
		box-sizing: border-box;
		border: 0;
		outline: 0;
		margin-top: 10px;
		padding-top: 15px;
		border-top: 2px solid $lightblue;
		font-size: 20px;
		text-decoration: none;
	}
}
</style>
