module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/scss/_variables.scss";
        @import "@/scss/_breakpoints.scss";
        @import "@/scss/_fonts.scss";
        `
      }
    }
  }
};