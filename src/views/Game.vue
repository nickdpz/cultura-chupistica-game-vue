<template>
  <div class="home h-100">
    <div class="row h-100">
      <div
        class="
          col-lg-3 col-xl-3 col-12
          h-lg-100 h-xl-100
          border-right border-primary
          d-flex
          flex-column
          justify-content-center
        "
      >
        <div class="d-flex justify-content-between">
          <h2 class="mt-5">Puntaje</h2>
          <h5 class="my-2 text-warning">
            {{
              mode === 1
                ? "Tema nuevo cuando se corcha a alguien"
                : "Tema nuevo por ronda"
            }}
          </h5>
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
      <div class="col-xl-8 col-lg-8 col-12 h-100">
        <div
          class="
            content-main-game
            d-flex
            flex-column
            align-items-center
            justify-content-around
            h-100
            my-2
          "
          v-if="startedProcess"
        >
          <small>
            A petición de
            {{ userOrderById.find(item => item.id == currentUserTheme).name }}
          </small>
          <h3 class="">{{ currentTheme }}</h3>
          <div class="d-flex">
            <h3>Vas tu&nbsp;</h3>
            <h3 class="text-success">
              {{ userOrderById.find(item => item.id == currentUserRound).name }}
            </h3>
          </div>
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
          {{ userOrderById.find(item => item.id === currentUserTheme).name }} 🔥
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
        {{ userNameShop }}
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
    ...mapState("game", ["users", "themes", "mode"]),
    ...mapState("control", ["activeSound"]),
  },
  mounted() {
    this.userOrderByPoints = this.users;
    this.userOrderById = this.users;
  },
  data: () => ({
    userOrderByPoints: [{ name: "", id: 1, points: 0 }],
    userOrderById: [{ name: "", id: 1, points: 0 }],
    currentUserTheme: 1,
    currentUserRound: 1,
    activeSelectTheme: false,
    startedProcess: false,
    timerSelect: null,
    timeSelect: 0,
    activeCardSelect: 0,
    mainTheme: ["Thema 1", "Thema 2", "Thema 3"],
    currentTheme: "",
    activeShop: false,
    activeGameOver: false,
    clockSoundInstance: null,
    userNameShop: "",
  }),
  methods: {
    reset() {
      this.userOrderByPoints = this.users.map(item => ({ ...item, points: 0 }));
      this.userOrderById = this.users;
      this.currentUserRound = 1;
      this.currentUserTheme = 1;
      this.activeCardSelect = 0;
      this.activeShop = false;
      this.activeSelectTheme = false;
      this.startedProcess = false;
    },
    startProcess() {
      this.startedProcess = true;
      this.selectTheme();
      this.continueUserRound();
    },
    selectTheme() {
      this.activeSelectTheme = true;
      this.timeSelect = 0;
      if (this.activeSound) {
        const sound = this.$sounds.get("theme");
        sound.volume(0.2);
        sound.play();
      }
      this.timerSelect = setInterval(() => {
        this.timeSelect += 1;
        if (this.activeCardSelect === 3) {
          this.activeCardSelect = 1;
        } else {
          this.activeCardSelect += 1;
        }
        if (this.timeSelect === 12) {
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
      this.activeSelectTheme = false;
    },
    generateRandomThemes() {
      const i = Number(Math.random() * (this.themes.length - 1)).toFixed(0);
      return this.themes[i];
    },
    nextUser(points) {
      const i = this.userOrderById.findIndex(
        item => item.id === this.currentUserRound
      );
      this.userOrderById[i].points = this.userOrderById[i].points + points;
      this.userOrderByPoints = this.userOrderById.sort(
        (a, b) => b.points - a.points
      );
      this.continueUserTheme(points);
      this.continueUserRound();
    },
    closeShop() {
      this.activeSelectTheme = true;
      this.selectTheme();
    },
    continueUserRound() {
      if (this.activeSound) {
        const sound = this.$sounds.get("next");
        sound.volume(0.2);
        sound.play();
      }
      if (this.userOrderById.length > this.currentUserRound) {
        this.currentUserRound += 1;
      } else {
        this.currentUserRound = 1;
      }
    },
    continueUserTheme(points) {
      if (
        (this.mode === 2 && this.currentUserTheme === this.currentUserRound) ||
        (this.mode === 1 && points === 0)
      ) {
        if (this.mode === 1) {
          this.userNameShop = this.users.find(
            item => item.id === this.currentUserRound
          ).name;
        } else if (this.mode === 2) {
          this.userNameShop = this.userOrderByPoints.at(-1).name;
        }
        if (this.userOrderById.length > this.currentUserTheme) {
          this.currentUserTheme += 1;
        } else {
          this.currentUserTheme = 1;
        }
        this.currentUserRound = Number(this.currentUserTheme);
        this.activeShop = true;
        if (this.activeSound) {
          const sound = this.$sounds.get("beer");
          sound.volume(0.2);
          sound.play();
        }
      }
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
