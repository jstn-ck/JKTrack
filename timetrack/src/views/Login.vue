<template>
	<div class="login-form">
		<div class="login">
			<h1>Login</h1>
			<div class="login-group">
				<input v-on:keyup.enter="login" v-model="name" type="text" placeholder="Name">
				<router-link to="/Timetrack"><button ref="loginbtn" class="login-btn">Login</button></router-link>
			</div>
		</div>
	</div>
	<router-view></router-view>
</template>

<script>
export default {
data () {
    return {
		name: ''
    }
  },
  mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
    }
  },
  watch: {
    name(newName) {
      localStorage.name = newName;
    }
  },

  methods: {
	login: function() {
		const lgBtn = this.$refs.loginbtn;
		lgBtn.click();
	}
  }
};
</script>

<style scoped lang="scss">

.login-form {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 30vh;

	.login {
		font-size: 30px;

		h1 {
			position: relative;
			margin: 10px 0;
			margin-bottom: 0;
			padding: 0;
			border-bottom: 1px solid $grey;
		}
	}

	.login-group {
		position: relative;
		display: block;
		transition: 0.3s ease;

		input {
			outline: none;
			border: none;
			transition: 0.3s ease;
			position: relative;
			padding-bottom: 2px;
			line-height: 20px;
			font-size: 17px;

			&:focus {
				box-shadow: 0px 1px 0px 0px $lightblue;
			}
		}

		.login-btn {
			position: absolute;
			display: block;
			outline: 0;
			border: 0;
			cursor: pointer;
			padding: 10px 20px;
			right: 0;
			margin-top: 20px;
			transition: 0.3s ease;

			&:hover {
				background-color: #e1e2e3;
			}
		}
	}
}
</style>
