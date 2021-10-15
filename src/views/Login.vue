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
              <div class="col-12">
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
                  @click-icon="addUser"
                >
                  <template #icon> 🐵 </template>
                </vs-input>
              </div>
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
          <div
            class="col-lg-4 col-xl-4 col-6"
            v-for="(us, i) in usersComponet"
            :key="i"
          >
            <div
              class="badge my-2 mx-2 w-100 d-flex justify-content-between"
              :class="i % 2 ? 'badge-success' : 'badge-primary'"
            >
              <h2 class="w-100 text-center">
                {{ us }}
              </h2>
              <vs-button transparent @click="removeUser(us)"> 🗑️ </vs-button>
            </div>
          </div>
        </div>

        <div class="mt-5 d-flex justify-content-center">
          <vs-button
            :disabled="!usersComponet.length"
            block
            @click="onClickNext"
            class="col-4"
          >
            Siguiente ✔️
          </vs-button>
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

import { mapMutations, mapState } from "vuex";
export default {
  name: "LoginView",
  data() {
    return {
      user: "",
      usersComponet: [],
      mode: 1,
    };
  },
  mounted() {
    this.usersComponet = this.users
      .filter(user => user.name !== "")
      .map(user => user.name);
  },
  computed: {
    ...mapState("game", ["users"]),
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
      if (this.usersComponet.length > 1) {
        this.$router.push("/game");
        this.SET_USERS(
          this.usersComponet.map((item, id) => ({
            name: item,
            points: 0,
            id: id + 1,
          }))
        );
      } else {
        this.$swal("Minimo dos usuarios");
      }
    },
    addUser() {
      const res = this.usersComponet.find(user => {
        return user === this.user;
      });
      if (this.user !== "" && !res) {
        this.usersComponet.push(this.user);
        this.user = "";
      } else {
        this.$swal("Ingrese un usuario valido");
      }
    },
    removeUser(name) {
      const res = this.usersComponet.findIndex(user => {
        return user === name;
      });
      this.usersComponet.splice(res, 1);
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
