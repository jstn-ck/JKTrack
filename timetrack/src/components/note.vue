<template>
	<div class="note">
		<h4 class="note-title">Notizen</h4>
		<div class="note-tabs">
			<ul class="tablist">
				<li v-for="(tab, index) in tabs"
						 :key="index" class="tab">Tab{{ tabcount }}</li>
			</ul>
			<button ref="newtab" @click="addtab" class="new-note-tab"></button>
		</div>
		<div class="form-container">
			<form autocomplete="off" class="note-form">
			<textarea v-model="notes" name="note-area" id="note-area">{{ notes }}</textarea>
		</form>
		</div>
	</div>
</template>
<script>
export default {
data () {
    return {
		notes: '',
		tabcount: 1,
		tab: ''
    }
  },
  mounted() {
    if (localStorage.notes) {
      	this.notes = localStorage.notes;
    }
    if (localStorage.tab) {
      	this.tab = localStorage.tab;
    }
  },
  watch: {
	notes(newNote) {
  		localStorage.notes = newNote;
	}
  },
  methods: {
	tabbing() {
		const tab = '';
		function addtab () {
			if (tab.value) {
				tab.value.push({
					content: tab.value
				});
				tab.value = '';
			}
		}
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