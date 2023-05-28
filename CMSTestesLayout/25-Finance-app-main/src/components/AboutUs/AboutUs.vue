<template>
  <section class="text-gray-600 body-font relative">
    <div
      class="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center"
    >
      <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
        <lottie
          :options="defaultOptions"
          :height="540"
          :width="540"
          v-on:animCreated="handleAnimation"
        />
      </div>
      <div
        class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center"
      >
        <h1
          class="title-font sm:text-4xl text-4xl mb-4 font-bold text-indigo-900"
        >
          About Us
        </h1>
        <p class="mb-8 leading-relaxed font-medium">
          Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
          plant cold-pressed tacos poke beard tote bag. Heirloom echo park
          mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon
          try-hard chambray.
        </p>
        <div class="flex justify-center">
          <button
            class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Know More
          </button>
        </div>
      </div>
    </div>
    <img src="/img/leftbluewaves.png" class="absolute -bottom-1 left-0" style="z-index:-1;width:550px;height:550px" />
  </section>
</template>
<script>
import animationData from "@/assets/animations/team.json";
export default {
  name: "AboutUs",
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
</style>