<template>
  <div class="main">
    <Login/>
    <Timetrack/>
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
}

.divider {
  position: relative;
  display: block;
  width: 100%;
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

  &:hover {
    background-color: #e1e2e3;
  }
}
</style>
