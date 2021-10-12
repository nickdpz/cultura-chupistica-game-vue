<template>
  <div class="d-flex container-timer">
    <div class="col-4 d-flex flex-column justify-content-center">
      <vs-button transparent class="my-2" @click="start">Inicio</vs-button>
      <vs-button transparent class="my-2" @click="stop">Detener</vs-button>
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
export default {
  name: "Chronometer",
  data() {
    return {
      elapsedTime: 0,
      timer: undefined,
      active: false,
    };
  },
  props: {
    initialCount: {
      type: Number,
      default: 15,
    },
  },
  computed: {
    formattedElapsedTime() {
      if (Number(this.elapsedTime) === this.initialCount) {
        this.stop();
        this.$emit("complete", 0);
      }
      return Number(this.initialCount - this.elapsedTime).toFixed(0);
    },
  },
  methods: {
    start() {
      this.active = true;
      this.timer = setInterval(() => {
        this.elapsedTime += 1;
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
      this.active = false;
      this.elapsedTime = 0;
    },
    reset() {
      clearInterval(this.timer);
      this.active = false;
      this.elapsedTime = 0;
      this.$emit("complete", this.initialCount - this.elapsedTime);
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
}
</style>
