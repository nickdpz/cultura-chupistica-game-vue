<template>
  <div class="d-flex container-timer">
    <div class="col-4 d-flex flex-column justify-content-center">
      <vs-button transparent class="my-2" @click="start" :disabled="active">
        Inicio
      </vs-button>
      <vs-button transparent class="my-2" @click="stop" :disabled="!active">
        Detener
      </vs-button>
    </div>
    <div class="col-4">
      <span class="timer text-center">{{ formattedElapsedTime }}</span>
    </div>
    <div class="col-4 d-flex align-items-center">
      <vs-button :disabled="!active" circle success @click="reset">
        <span class="h2"> ✔️ </span>
      </vs-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Chronometer",
  data() {
    return {
      elapsedTime: 0,
      timer: undefined,
      active: false,
      sound: null,
    };
  },
  props: {
    initialCount: {
      type: Number,
      default: 17,
    },
  },
  computed: {
    ...mapState("control", ["activeSound"]),
    formattedElapsedTime() {
      if (Number(this.elapsedTime) === this.initialCount) {
        this.reset();
      }
      return Number(this.initialCount - this.elapsedTime).toFixed(0);
    },
  },
  methods: {
    start() {
      this.active = true;
      if (this.activeSound) {
        this.sound = this.$sounds.get("clock");
        this.sound.volume(0.2);
        this.sound.play();
      }
      this.timer = setInterval(() => {
        this.elapsedTime += 1;
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
      this.active = false;
      if (this.sound) this.sound.stop();
    },
    reset() {
      clearInterval(this.timer);
      this.active = false;
      this.$emit("complete", this.initialCount - this.elapsedTime);
      this.elapsedTime = 0;
      if (this.sound) this.sound.stop();
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Share+Tech+Mono");
.timer {
  font-family: "Share Tech Mono", sans-serif;
  font-size: 5rem;
}
.container-timer {
  height: 7rem;
  width: 20rem;
  margin: 0rem 0 4rem 0;
}
</style>
