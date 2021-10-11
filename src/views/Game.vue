<template>
  <div class="home">
    <Chronometer />
  </div>
</template>

<script>
import Chronometer from "@/components/utils/Chronometer.vue";
import { mapState } from "vuex";

export default {
  name: "Game",
  components: {
    Chronometer,
  },
  computed: { ...mapState("game", ["users", "themes"]) },
};
</script>
