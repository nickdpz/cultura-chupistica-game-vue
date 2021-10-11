<template>
  <footer class="footer text-center w-100 py-3">
    <span>
      &copy; Derechos reservedos
      <a href="https://limpo.com.co/" target="_blank" rel="noopener">nickdpz</a>
      @ {{ new Date().getFullYear() }}
    </span>
  </footer>
</template>

<script>
export default {
  props: {
    aditionalClass: {
      type: String,
      default: () => "",
    },
  },
};
</script>
