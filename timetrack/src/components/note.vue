<template>
	<div class="note">
		<h4 class="note-title">Notizen</h4>
		<div class="note-toolbar">
			<ul>
				<li>Test1</li>
				<li>test2</li>
			</ul>
		</div>

		<form autocomplete="off" class="note-form">
			<textarea v-model="notes" name="note-area" id="note-area">{{ notes }}</textarea>
		</form>
		
	</div>
</template>
<script>
export default {
data () {
    return {
		notes: ''
    }
  },
  mounted() {
    if (localStorage.notes) {
      	this.notes = localStorage.notes;
    }
  },
  	watch: {
   		notes(newNote) {
      		localStorage.notes = newNote;
    	}
  	}
};
</script>
<style scoped lang="scss">
.note {
	position: fixed;
	float: left;
	display: inline-block;
	width: 100%;
	max-width: 380px;
	height: 100%;
	max-height: 500px;
	border: 5px solid $main;
	padding: 20px;
	left: 30px;
	top: 140px;
	overflow: hidden;

	.note-toolbar {
		font-size: 14px;
		display: inline-block;
		margin-left: 0.4rem;

		ul {
			display: block;

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
		border-top: 1px solid $grey;
		font-size: 20px;
		text-decoration: none;
	}
}
</style>