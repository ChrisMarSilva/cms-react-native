<template>
  <section class="text-gray-600 body-font">
    <div
      class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center"
    >
      <div
        class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
      >
        <h1
          class="title-font sm:text-4xl md:text-4xl mb-4 font-medium text-indigo-900"
        >
          Our Products
        </h1>
        <p class="mb-8 leading-relaxed text-lg font-medium">
          g try-hard pitchfork pour-over freegan heirloom neutra air
          plant cold-pressed tacos poke beard tote bag. Heirloom echo park
          mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon
          try-hard chambray.
        </p>
        <div class="flex flex-wrap">
          <button
            class="ml-0 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-sm"
          >
            CREDIT CARDS
          </button>
          <button
            class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-sm"
          >
            PERSONAL LOAN
          </button>
          <button
            class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-sm"
          >
            HOME LOAN
          </button>
          <button
            class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-sm"
          >
            LIFE INSURANCE
          </button>
          <button
            class="ml-0 mt-3 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-sm"
          >
            SAVINGS ACCOUNT
          </button>
          <button
            class="ml-4 mt-3 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-sm"
          >
            FIXED DEPOSITS
          </button>
          <button
            class="ml-4 mt-3 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-sm"
          >
            DIRECT MUTUAL FUNDS
          </button>
          <button
            class="ml-0 mt-3 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-sm"
          >
            FREE DEMAT ACCOUNT
          </button>
        </div>
      </div>
      <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <section
          class="text-gray-600 body-font rounded-3xl"
          style="background: #f1f5ff"
        >
          <div class="container px-5 py-0 mx-auto">
            <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
              <lottie
                :options="defaultOptions"
                :height="390"
                :width="390"
                v-on:animCreated="handleAnimation"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
    <SubProduct />
  </section>
</template>
<script>
import animationData from "@/assets/animations/team.json";
import SubProduct from "./SubProduct.vue";
export default {
  name: "OurProducts",
  data() {
    return {
      defaultOptions: { animationData: animationData, loop: true },
      animationSpeed: 1,
    };
  },
  components:{
      SubProduct
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
</style>