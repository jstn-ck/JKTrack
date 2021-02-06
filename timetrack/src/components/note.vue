<template>
	<div class="note">
		<h4 class="note-title">Notizen</h4>
		<div class="note-tabs">
			<ul class="tablist">
				<li v-for="note in notes" :key="note.id" @click="() => activateNote(note.id)" :class="{active: note.id === activeId}" class="tab">{{ note.title }}</li>
			</ul>
			<button @click="addNote" class="new-note-tab"></button>
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

export default {
data () {
		return {
			notes: [],
			activeId: null
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
		addNote() {
			let id = uuidv4();
			this.notes.push({
				title: "Test",
				id: id,
				content: ''
			})
			this.activateNote(id)
			this.saveNote();
		},
		activateNote(id) {
			this.activeId = id;
		},
		handleChange($event) {
			this.activeNote.content = $event.target.value;
			this.saveNote();
			console.log(this.notes)
		},
		saveNote() {
			const parsed = JSON.stringify(this.notes);
			localStorage.setItem('notes', parsed);
		}
	}
};
</script>
<style scoped lang="scss">
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

			.tab {
				display: inline-block;
				cursor: pointer;
				transition: 0.3s ease;

				&.active {
					color: green;
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
