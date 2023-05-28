<template>
  <section class="text-gray-600 body-font">
    <div class="px-0 py-20 mx-auto">
      <div class="flex flex-wrap">
        <div class="p-4 pr-2 pl-0 md:w-1/2 w-full">
          <div class="h-full bg-indigo-500 p-8 pt-0 pb-0 pr-0 rounded">
            <section class="text-gray-600 body-font">
              <div
                class="container mx-auto flex px-5 py-0 md:flex-row flex-col items-center"
              >
                <div
                  class="flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
                >
                  <h1
                    class="title-font sm:text-4xl md:text-3xl mb-4 font-medium text-white"
                  >
                    01 Credit Card
                  </h1>
                  <p class="mb-0 leading-relaxed text-md font-bold text-white">
                    Copper mug try-hard pitchfork pour-over freegan heirloom
                  </p>
                </div>
                <div class="mt-2">
                  <lottie
                    :options="defaultOptions"
                    :height="200"
                    :width="200"
                    v-on:animCreated="handleAnimation"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
        <div class="p-4 pl-2 pr-0 md:w-1/2 w-full">
          <div class="h-full bg-indigo-600 p-8 pt-0 pb-0 pr-0 rounded shadow-lg">
            <section class="text-gray-600 body-font">
              <div
                class="container mx-auto flex px-5 py-0 md:flex-row flex-col items-center"
              >
                <div
                  class="flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
                >
                  <h1
                    class="title-font sm:text-4xl md:text-3xl mb-4 font-medium text-white"
                  >
                    02 Credit Card
                  </h1>
                  <p class="mb-0 leading-relaxed text-md font-bold text-white">
                    Copper mug try-hard pitchfork pour-over freegan heirloom
                  </p>
                </div>
                <div class="mt-2">
                  <lottie
                    :options="defaultOptions2"
                    :height="200"
                    :width="200"
                    v-on:animCreated="handleAnimation"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import animationData from "@/assets/animations/hand-shake-business-deal.json";
import animationData2 from "@/assets/animations/creative-time.json";
export default {
  name: "InfoBars",
  data() {
    return {
      defaultOptions: { animationData: animationData, loop: true },
      defaultOptions2: { animationData: animationData2, loop: true },
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