<template>
  <div class="shadow border-radius-sw mx-2">
    <vs-switch
      v-model="activeSoundMode"
      :dark="!activeSoundMode"
      aria-label="Change Sound"
    >
      <template #circle>
        {{ activeSoundMode ? "🔊" : "🔈" }}
      </template>
    </vs-switch>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data: () => ({
    active: true,
    activeSoundMode: false,
  }),
  computed: {
    ...mapState("control", ["activeSound"]),
  },
  watch: {
    activeSoundMode(val) {
      this.UPDATED_ACTIVE_SOUND_MODE(val);
    },
  },
  beforeMount() {
    this.activeSoundMode = this.activeSound;
  },
  methods: {
    ...mapMutations("control", ["UPDATED_ACTIVE_SOUND_MODE"]),
  },
};
</script>

<style scoped>
.border-radius-sw {
  border-radius: 20px;
}
</style>
