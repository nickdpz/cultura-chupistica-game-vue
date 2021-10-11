<template>
  <main class="h-100 mb-5 pt-5">
    <navbar-app />
    <div class="container mt-5 pt-4">
      <router-view></router-view>
    </div>
    <footer-app />
  </main>
</template>

<script>
import FooterApp from "@/components/layout/FooterApp.vue";
import NavbarApp from "@/components/layout/NavbarApp.vue";
export default {
  name: "LayoutApp",
  components: {
    FooterApp,
    NavbarApp,
  },
};
</script>
