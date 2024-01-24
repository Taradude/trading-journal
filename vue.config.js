const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/design/colors.scss";
        @import "@/design/typography.scss";
        @import "@/design/default.scss";
          `,
      },
    },
  },
})
