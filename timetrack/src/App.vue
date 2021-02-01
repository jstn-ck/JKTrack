<template>
  <div class="main">
    <Login></Login>
    <Timetrack></Timetrack>
  </div>
    <router-view/>
</template>

<style>
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
  overflow: hidden;
  margin: 0;
  padding: 15px;
}

.main {
  position: relative;
  display: block;
}

.divider {
  position: relative;
  display: block;
  width: 100%;
  border-bottom: 1px solid $grey;
}
</style>
