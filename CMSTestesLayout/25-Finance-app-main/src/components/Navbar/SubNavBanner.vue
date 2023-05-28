<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div style="z-index: 99999"  class="bg-indigo-600 pt-14 ml-12">
    <div class="mx-auto py-0 px-0 sm:px-6 lg:px-0">
      <div class="flex items-center justify-center flex-wrap">
        <div class="w-0 flex-1 flex items-center">
          <!-- <span class="flex p-2 rounded-lg bg-indigo-800">
            <svg
              class="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
          </span> -->
          <p class="ml-0 font-medium text-white truncate w-full">
            <span class="hidden md:inline">
              <infinite-slide-bar>
                <div class="flex">
                  <div class="w-4 h-4 mt-5 mb-0 p-0 mr-8 vert-move">
                    <img src="/img/rupee.png" id="loading" class="" />
                  </div>
                  <div class="mr-4 pt-1">
                    <lottie
                      :options="defaultOptions"
                      :height="33"
                      :width="33  "
                      v-on:animCreated="handleAnimation"
                    />
                  </div>
                  <small class="text-white mt-2"
                    >Big news! We're excited to announce a brand new
                    product.</small
                  >
                </div>
              </infinite-slide-bar>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import animationData from "@/assets/animations/man-running.json";
export default {
  name: "SubNavBanner",
  data() {
    return {
      defaultOptions: { animationData: animationData, loop: true },
      animationSpeed: 1,
    };
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    stop: function () {
      this.anim.stop();
    },
    play: function () {
      this.anim.play();
    },
    pause: function () {
      this.anim.pause();
    },
    onSpeedChange: function () {
      this.anim.setSpeed(this.animationSpeed);
    },
  },
};
</script>
<style scoped>
#loading {
  -webkit-animation: rotation 2s infinite linear;
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(359deg);
  }
  to {
    -webkit-transform: rotate(0deg);
  }
}
.vert-move {
  -webkit-animation: mover 1s infinite alternate;
  animation: mover 0.7s infinite alternate;
}
.vert-move {
  -webkit-animation: mover 1s infinite alternate;
  animation: mover 0.7s infinite alternate;
}
@-webkit-keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-8px);
  }
}
@keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-8px);
  }
}
</style>