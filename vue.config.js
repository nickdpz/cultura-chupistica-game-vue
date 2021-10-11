module.exports = {
  lintOnSave: false,
  transpileDependencies: ["vuex-persist"],
  pwa: {
    name: "Titin App",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/registerServiceWorker.js",
    },
    manifestOptions: {
      name: "Titin App",
      short_name: "Titin",
      start_url: ".",
      display: "standalone",
      theme_color: "#ff0",
    },
  },
};
