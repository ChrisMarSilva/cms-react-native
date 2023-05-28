<template>
  <section class="text-gray-600 body-font mt-4">
    <div
      class="container mx-auto flex px-5 py-2 md:flex-row flex-col items-center "
    >
      <div
        class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
      >
        <!-- <h1
          style="
            background: linear-gradient(to right, #f7971e, #ffd200);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          "
          class="title-font tracking-tight font-extrabold text-5xl mb-2 font-medium relative"
        >
          <p class="skeleton-box">Lead a comfortable life!</p>
        </h1> -->
        <!-- <h1
          class="title-font tracking-tight font-extrabold text-2xl mb-4 font-medium text-gray-500"
        >
          We take care of your finances.
        </h1> -->
        <!-- <div class="mt-8">
          <button
            class="inline-flex h-12 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg relative"
          >
            <p class="skeleton-box">Get Your Credit Score</p>
            <span>
              <svg
                class="w-6 h-6 mt-1 ml-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
                <path
                  fill-rule="evenodd"
                  d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
          <br />
          <div class="mb-8 leading-relaxed tracking-tight font-semibold mt-0">
            <div class="flex">
              <lottie
                :options="defaultOptions3"
                :height="90"
                :width="90"
                v-on:animCreated="handleAnimation"
              />
              <span class="tracking-tight font-bold text-lg mt-8">4,50,00,000+</span>
              <span class="mt-8"> have got their Credit Scores for FREE!</span>
            </div>
          </div>
        </div> -->
      </div>
      <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <div class="">
          <lottie
            :options="defaultOptions"
            :height="270"
            :width="270"
            v-on:animCreated="handleAnimation"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import animationData from "@/assets/animations/empreendedor-cor.json";
import animationData2 from "@/assets/animations/speedometer.json";
import animationData3 from "@/assets/animations/award.json";
export default {
  name: "Primary",
  data() {
    return {
      defaultOptions: { animationData: animationData, loop: true },
      defaultOptions2: { animationData: animationData2, loop: true },
      defaultOptions3: { animationData: animationData3, loop: true },
      animationSpeed: 1,
    };
  },
  mounted() {},
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
:root {
  --animate-duration: 1000ms;
  --animate-delay: 2s;
}
.skeleton-box {
  overflow: hidden;
  background-color: transparent;
}
.skeleton-box::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-transform: translateX(-100%);
  -ms-transform: translateX(-100%);
  transform: translateX(-100%);
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, rgba(255, 255, 255, 0)),
    color-stop(20%, rgba(255, 255, 255, 0.2)),
    color-stop(60%, rgba(255, 255, 255, 0.5)),
    to(rgba(255, 255, 255, 0))
  );
  background-image: -o-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  -webkit-animation: shimmer 3s infinite;
  animation: shimmer 3s infinite;
  content: "";
}
@-webkit-keyframes shimmer {
  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}
@keyframes shimmer {
  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
}
</style>