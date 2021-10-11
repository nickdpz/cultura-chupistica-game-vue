<template>
  <div class="d-block">
    <vs-navbar v-model="active" padding-scroll shadow center-collapsed>
      <template #left>
        <router-link to="/" class="mx-3" aria-label="Inicio"> 😆 </router-link>
      </template>
      <template #right>
        <change-theme />
        <options-user />
      </template>
    </vs-navbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ChangeTheme from "./ChangeTheme";

import OptionsUser from "./OptionsUser";
export default {
  name: "NavbarApp",
  components: { ChangeTheme, OptionsUser },
  data: () => ({
    active: true,
  }),
  computed: {
    ...mapState("control", ["activeSidebar"]),
  },
  methods: {},
};
</script>
