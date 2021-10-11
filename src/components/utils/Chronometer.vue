<template>
  <div class="d-flex container-timer">
    <div class="col-6">
      <soan class="timer text-center">{{ formattedElapsedTime }}</soan>
    </div>
    <div class="col-6 d-flex flex-column justify-content-center">
      <vs-button transparent class="my-2" @click="start">Inicio</vs-button>
      <vs-button transparent class="my-2" @click="stop">Detener</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      elapsedTime: 0,
      timer: undefined,
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
      }
      return Number(this.initialCount - this.elapsedTime).toFixed(0);
    },
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1;
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
    reset() {
      clearInterval(this.timer);
      this.elapsedTime = 0;
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
  width: 14rem;
}
</style>
