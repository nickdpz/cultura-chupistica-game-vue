<template>
  <div class="home h-100">
    <div class="row h-100">
      <div
        class="
          col-3
          h-100
          border-right border-primary
          d-flex
          flex-column
          justify-content-center
        "
      >
        <div class="d-flex justify-content-between">
          <h2 class="mt-5">Puntaje</h2>
          <div class="d-flex align-items-end">
            <vs-button transparent @click="reset">🔃</vs-button>
          </div>
        </div>
        <table class="table table-bordered text-base">
          <thead>
            <tr>
              <th scope="col">Usuario</th>
              <th scope="col">Puntos</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(u, i) in userOrderByPoints"
              :key="i"
              :class="
                !((i + 1) % 3)
                  ? 'bg-primary'
                  : !((i + 1) % 2)
                  ? 'bg-success'
                  : 'bg-danger'
              "
            >
              <td class="w-25 font-weight-bold">{{ u.points }}</td>
              <td class="font-weight-bold">{{ u.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-8 h-100">
        <div
          class="
            content-main-game
            d-flex
            flex-column
            align-items-center
            justify-content-around
            h-100
          "
          v-if="startedProcess"
        >
          <small>
            A petición de
            {{ userOrderById.find(item => item.id == userTheme).name }}
          </small>
          <h3 class="">{{ currentTheme }} Seleccionado por</h3>
          <h3>
            Vas tu {{ userOrderById.find(item => item.id == currentUser).name }}
          </h3>
          <Chronometer @complete="nextUser" />
        </div>
        <div
          class="
            content-start-button
            h-100
            d-flex
            justify-content-center
            align-items-center
          "
          v-else
        >
          <vs-button circle icon success flat @click="startProcess">
            <div class="d-flex align-items-center flex-column px-2">
              <span class="h1"> ✨</span>
              <span class="h1"> ✨ 🚀 ✨ </span>
              <span class="h1"> ✨</span>
            </div>
          </vs-button>
        </div>
      </div>
    </div>
    <vs-dialog not-close overflow-hidden auto-width v-model="activeSelectTheme">
      <template #header>
        <h1 class="mt-4 text-warning text-center">
          Selecciona
          {{ userOrderById.find(item => item.id === userTheme).name }} 🔥
        </h1>
      </template>
      <div class="w-50vh h-30vh container">
        <div class="h-75 d-flex justify-content-around align-items-center">
          <button
            :disabled="activeCardSelect !== 0"
            class="
              card-custom-2
              text-white
              border border-dark
              rounded
              bg-primary
              d-flex
              justify-content-center
              align-items-center
              mx-2
            "
            :class="activeCardSelect === 1 ? 'activate-animation' : ''"
            @click="choiceTheme(0)"
          >
            <span class="h1" v-if="activeCardSelect">
              {{ activeCardSelect === 1 ? "🙉" : "🙈" }}
            </span>
            <span v-else class="h4">{{ mainTheme[0] }}</span>
          </button>
          <button
            :disabled="activeCardSelect !== 0"
            class="
              card-custom-2
              text-white
              border border-dark
              rounded
              bg-success
              d-flex
              justify-content-center
              align-items-center
              mx-2
            "
            :class="activeCardSelect === 2 ? 'activate-animation' : ''"
            @click="choiceTheme(1)"
          >
            <span class="h1" v-if="activeCardSelect">
              {{ activeCardSelect === 2 ? "🙉" : "🙈" }}
            </span>
            <span v-else class="h4">{{ mainTheme[1] }}</span>
          </button>
          <button
            :disabled="activeCardSelect !== 0"
            class="
              card-custom-2
              text-white
              border border-dark
              rounded
              bg-danger
              d-flex
              justify-content-center
              align-items-center
              mx-2
            "
            :class="activeCardSelect === 3 ? 'activate-animation' : ''"
            @click="choiceTheme(2)"
          >
            <span class="h1" v-if="activeCardSelect">
              {{ activeCardSelect === 3 ? "🙉" : "🙈" }}
            </span>
            <span v-else class="h4">{{ mainTheme[2] }}</span>
          </button>
        </div>
      </div>
    </vs-dialog>
    <vs-dialog blur v-model="activeShop" @close="closeShop">
      <h1>
        {{ this.userOrderByPoints.at(-1).name }}
      </h1>
      <img
        src="https://c.tenor.com/l5IT_IveuyYAAAAd/beer-meet.gif"
        alt="Toma"
      />
    </vs-dialog>
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
  computed: {
    ...mapState("game", ["users", "themes"]),
  },
  mounted() {
    this.userOrderByPoints = this.users;
    this.userOrderById = this.users;
  },
  data: () => ({
    userOrderByPoints: [{ name: "", id: 1, points: 0 }],
    userOrderById: [{ name: "", id: 1, points: 0 }],
    userTheme: 1,
    currentUser: 1,
    activeSelectTheme: false,
    startedProcess: false,
    timerSelect: null,
    timeSelect: 0,
    activeCardSelect: 0,
    mainTheme: ["Thema 1", "Thema 2", "Thema 3"],
    currentTheme: "",
    activeShop: false,
    activeGameOver: false,
  }),
  methods: {
    reset() {
      this.userOrderByPoints = this.users.map(item => ({ ...item, points: 0 }));
      this.userOrderById = this.users;
      this.currentUser = 1;
      this.userTheme = 1;
      this.activeCardSelect = 0;
      this.activeShop = false;
      this.activeSelectTheme = false;
      this.startedProcess = false;
    },
    startProcess() {
      this.startedProcess = true;
      this.selectTheme();
    },
    selectTheme() {
      this.activeSelectTheme = true;
      this.timeSelect = 0;
      this.timerSelect = setInterval(() => {
        this.timeSelect += 1;
        if (this.activeCardSelect === 3) {
          this.activeCardSelect = 1;
        } else {
          this.activeCardSelect += 1;
        }
        if (this.timeSelect === 15) {
          this.activeCardSelect = 0;
          this.mainTheme[0] = this.generateRandomThemes();
          this.mainTheme[1] = this.generateRandomThemes();
          this.mainTheme[2] = this.generateRandomThemes();
          clearInterval(this.timerSelect);
        }
      }, 250);
    },
    choiceTheme(itemTheme) {
      this.currentTheme = this.mainTheme[itemTheme];
      this.currentUser = this.continueUser(this.currentUser);
      this.activeSelectTheme = false;
    },
    generateRandomThemes() {
      const i = Number(Math.random() * (this.themes.length - 1)).toFixed(0);
      return this.themes[i];
    },
    nextUser(points) {
      const i = this.userOrderById.findIndex(
        item => item.id === this.currentUser
      );
      this.userOrderById[i].points = this.userOrderById[i].points + points;
      this.userOrderByPoints = this.userOrderById.sort(
        (a, b) => b.points - a.points
      );
      this.currentUser = this.continueUser(this.currentUser, this.userTheme);
    },
    closeShop() {
      this.activeSelectTheme = true;
      this.selectTheme();
    },
    continueUser(count, theme) {
      if (theme && count === theme) {
        this.activeShop = true;
        if (this.userOrderById.length > this.userTheme) {
          this.userTheme += 1;
        } else {
          this.userTheme = 1;
        }
      }
      if (this.userOrderById.length > count) {
        count += 1;
      } else {
        count = 1;
      }
      return count;
    },
  },
};
</script>

<style>
.h-100vh {
  height: 100vh;
}

.w-80vw {
  width: 80vw;
}

.h-30vh {
  height: 30vh;
}

.w-50vw {
  width: 50vw;
}

.card-custom-2 {
  height: 8rem;
  width: 12rem;
  box-shadow: 0.5px 5px 20px 0px rgba(0, 0, 0, var(--vs-shadow-opacity));
  transform: scale(1);
  transition: 0.1s transform;
}

.card-custom-2.activate-animation {
  transform: scale(1.2);
  border: 10px;
}
</style>
