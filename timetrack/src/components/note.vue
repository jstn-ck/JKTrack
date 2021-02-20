<template>
	<div class="note">
		<div :class="{open: isOpen}" class="note-settings">
			<button @click="openSettings" class="open-settings">s</button>
			<button @click="deleteNote" class="delete-note">Löschen</button>
		</div>
		<h4 class="note-title">Notizen</h4>
		<div class="note-tabs">
			<ul class="tablist">
				<li v-for="note in notes" :key="note.id" @click="() => activateNote(note.id)" :class="{active: note.id === activeId}" class="tab">{{ note.title }}</li>
			</ul>
			<button @click="limitTabs" class="new-note-tab"></button>
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
			tabCount: 0,
			isOpen: false,
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
			if(tabCount <= 6) {
				this.addNote();
				if(tabCount <= 6) {
					nbtn[0].classList.add('hidden');
				}
			} else {
				nbtn[0].classList.add('hidden');
			}
		},
		addNote() {
			let id = uuidv4();
			this.notes.push({
				title: "Test",
				id: id,
				content: ''
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
				nbtn[0].classList.remove('hidden');
			}
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
.note {
	position: relative;
	display: inline-block;
	width: 100%;
	max-width: 380px;
	height: 100%;
	border: 3px solid $main;
	padding: 20px;
	margin-top: 20px;
	overflow: hidden;
	box-shadow: $shadow;
	order: 1;

	.note-settings {
		display: inline-block;
		position: absolute;
		min-width: 20px;
		height: 30px;
		top: 30%;
		right: 0;
		border: 0;
		outline: 0;
		background-color: $white;
		z-index: 999;
		transition: 0.3s ease;

		.open-settings {
			position: absolute;
			background-color: $lightblue;
			top: 0;
			left: 0;
			min-width: 20px;
			color: $white;
			height: 28px;
			cursor: pointer;
		}

		.delete-note {
			margin-left: 50px;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			outline: 0;
			cursor: pointer;
			background-color: transparent;
			transition: 0.35s ease;
			border: 0;
			opacity: 0;

			&:hover {
				display: inline-block;
				color: red;
			}
		}

		&.open {
			min-width: 130px;
			max-height: 34px;
			border: 1px solid $lightblue;
			border-right: 0;

			.delete-note {
				opacity: 1;
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

			&:disabled {
				&::before,&::after {
					background-color: lightgrey;
				}
			}

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

			.tab {
				display: inline-block;
				cursor: pointer;
				transition: 0.3s ease;
				position: relative;

				&::before{
					transition: 0.3s ease;
					content: '';
					position: absolute;
					background-color: $lightblue;
					bottom: -18px;
					left: 0;
					width: 100%;
					height: 0;
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
