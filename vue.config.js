module.exports = {
  publicPath: "/cultura-chupistica/",
  lintOnSave: false,
  transpileDependencies: ["vuex-persist"],
  pwa: {
    name: "Cultura Chupistica App",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/registerServiceWorker.js",
    },
    manifestOptions: {
      name: "Cultura Chupistica App",
      short_name: "Cultura Chupistica",
      start_url: ".",
      display: "standalone",
      theme_color: "#ff0",
    },
  },
};
