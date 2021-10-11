<template>
  <fragment>
    <vs-tooltip
      v-show="!notUser"
      v-model="showOptions"
      bottom
      shadow
      not-hover
      class="mx-2"
    >
      <vs-button circle icon size="xl" @click="showOptions = !showOptions">
        {{ role === "administrator" ? "🕵️‍♀️" : role === "support" ? "👨‍🔧" : "🙎‍♂️" }}
      </vs-button>
      <template #tooltip>
        <div class="autocomplete-items list-group text-left">
          <div class="m-2">
            🟢
            <button
              class="font-weight-bold btn-a mx-2"
              aria-label="Ir a inicio de app"
              @click="routePush('/app')"
            >
              App
            </button>
          </div>
          <div class="m-2">
            🔵
            <button
              class="font-weight-bold btn-a mx-2"
              aria-label="Ir a perfil"
              @click="routePush('/user/profile')"
            >
              Perfil
            </button>
          </div>

          <div class="m-2">
            🟣
            <button
              class="font-weight-bold btn-a mx-2"
              aria-label="cerrar sesión"
              @click="logout"
            >
              Salir
            </button>
          </div>
        </div>
      </template>
    </vs-tooltip>
    <div v-show="notUser">
      <div class="d-flex">
        <vs-button border>
          <router-link
            class="font-weight-bold"
            rel="Incia sesión"
            to="/login"
            aria-label="Ir a inicio de sesión"
          >
            Inicia Sesión
          </router-link>
        </vs-button>
      </div>
    </div>
  </fragment>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "OptionsUser",
  data: () => ({
    showOptions: false,
  }),
  computed: {
    ...mapState("auth", ["role"]),
    notUser() {
      return this.role === "";
    },
  },
  watch: {
    showOptions(val) {
      if (val) setTimeout(() => (this.showOptions = false), 40000);
    },
  },
  methods: {
    ...mapMutations("auth", ["CLEAR_AUTH"]),
    routePush(path) {
      this.showOptions = false;
      return this.$router.push(path);
    },
    async logout() {
      const response = await this.$swal({
        title: "Seguro que deseas salir",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#CF423C",
        cancelButtonColor: "#37a726",
        confirmButtonText: "Si",
      });
      if (response.isConfirmed) {
        this.CLEAR_AUTH();
        this.$router.push("/");
      }
    },
  },
};
</script>
