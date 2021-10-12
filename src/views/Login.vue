<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10 col-lg-8 col-xl-8 col-12 mx-auto">
        <div class="card-custom-1 mt-4 text-center border-success">
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
            <div class="my-4 row d-flex justify-content-center">
              <change-theme />
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
  </div>
</template>

<script>
import ChangeTheme from "@/components/layout/ChangeTheme";
import { mapMutations } from "vuex";
export default {
  name: "LoginView",
  data() {
    return {
      user: "",
      users: [],
    };
  },
  components: { ChangeTheme },
  methods: {
    ...mapMutations("game", ["SET_USERS"]),
    onClickNext() {
      this.SET_USERS(
        this.users.map((item, id) => ({ name: item, points: 0, id: id + 1 }))
      );
      this.$router.push("/game");
    },
    addUser() {
      this.users.push(this.user);
      this.user = "";
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
