<template>
  <main>
    <div class="container">
      <div class="col-md-10 col-lg-8 col-xl-8 col-12 mx-auto mt-4">
        <div class="mt-4 text-center">
          <div class="card-header">
            <h1 class="h3 text-success">
              Ingresa los nombres de los jugadores
            </h1>
          </div>

          <div class="card-body">
            <div class="d-flex">
              <div class="col-8">
                <vs-input
                  id="user"
                  v-model="user"
                  type="text"
                  name="user"
                  label-placeholder="Nombre"
                  state="success"
                  class="input-theme border-custom"
                  aria-label="Usuario"
                  icon-after
                  @keyup.enter="addUser"
                >
                  <template #icon> 🐵 </template>
                </vs-input>
              </div>
              <vs-button
                :disabled="!users.length"
                block
                @click="onClickNext"
                class="col-4"
              >
                Siguiente
              </vs-button>
            </div>
            <div class="col-12 my-4 d-flex justify-content-center">
              <vs-radio v-model="mode" val="1">
                Tema nuevo cuando se corcha a alguien
              </vs-radio>
              <vs-radio success v-model="mode" val="2">
                Tema nuevo por ronda
              </vs-radio>
            </div>
            <div class="my-4 row d-flex justify-content-center">
              <change-theme />
              <change-sound />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4" v-for="(us, i) in users" :key="i">
            <div
              class="badge my-2 mx-2 w-100"
              :class="i % 2 ? 'badge-success' : 'badge-primary'"
            >
              <h2 class="w-100 text-center">
                {{ us }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer text-center w-100 py-3">
      <router-link to="/game">Jugadores pasados</router-link>
    </footer>
  </main>
</template>

<script>
import ChangeTheme from "@/components/layout/ChangeTheme";
import ChangeSound from "@/components/layout/ChangeSound";

import { mapMutations } from "vuex";
export default {
  name: "LoginView",
  data() {
    return {
      user: "",
      users: [],
      mode: 1,
    };
  },
  watch: {
    mode(value) {
      this.SET_MODE(Number(value));
    },
  },
  components: { ChangeTheme, ChangeSound },
  methods: {
    ...mapMutations("game", ["SET_USERS", "SET_MODE"]),
    onClickNext() {
      this.SET_USERS(
        this.users.map((item, id) => ({ name: item, points: 0, id: id + 1 }))
      );
      this.$router.push("/game");
    },
    addUser() {
      if (this.user !== "") {
        this.users.push(this.user);
        this.user = "";
      }
    },
  },
};
</script>

<style>
.form-control,
.list-group-item {
  color: inherit !important;
  background-color: inherit !important;
}
</style>
