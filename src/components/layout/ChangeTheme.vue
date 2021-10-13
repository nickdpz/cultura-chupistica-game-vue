<template>
  <div class="shadow border-radius-sw mx-2">
    <vs-switch
      v-model="activeDarkMode"
      :dark="!activeDarkMode"
      aria-label="Change Theme"
    >
      <template #circle>
        {{ activeDarkMode ? "🌛" : "🌞" }}
      </template>
    </vs-switch>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data: () => ({
    active: true,
    activeDarkMode: false,
  }),
  computed: {
    ...mapState("control", ["activeDark"]),
  },
  watch: {
    activeDarkMode(val) {
      this.UPDATED_ACTIVE_DARK_MODE(val);
      this.changeColorMode(val);
    },
  },
  beforeMount() {
    this.activeDarkMode = this.activeDark;
    this.changeColorMode(this.activeDark);
  },
  methods: {
    ...mapMutations("control", ["UPDATED_ACTIVE_DARK_MODE"]),
    changeColorMode(val) {
      let theme_toggler = document
        .querySelector("#father")
        .classList.toggle("dark-mode");
      console.log(theme_toggler);
      this.$vs.setColor("background", val ? "#01071d" : "#f3f5f4");
      this.$vs.setColor("primary", val ? "#37a726" : "#253c99");
      this.$vs.setColor("text", val ? "#f3f5f4" : "#2C3E50");
    },
  },
};
</script>

<style scoped>
.border-radius-sw {
  border-radius: 20px;
}
</style>
