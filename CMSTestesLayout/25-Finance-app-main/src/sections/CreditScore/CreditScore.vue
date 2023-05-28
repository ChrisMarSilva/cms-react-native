<template>
  <div>
    <section
      class="text-gray-600 body-font relative h-screen"
      v-view.once="onceHandler"
    >
      <div class="container px-24 py-16 mx-auto" :key="rerender">
        <div class="flex flex-col text-center w-full mb-20">
          <h1
            class="sm:text-3xl md:text-4xl font-medium title-font mb-4 text-indigo-900"
          >
            Get your latest Credit Score, FREE
          </h1>
          <p class="lg:w-2/3 font-bold mx-auto leading-relaxed text-base">
            One powerful number that puts you in control
          </p>
        </div>
        <div class="flex flex-wrap -m-4 text-center cursor-pointer">
          <div
            class="p-2 md:w-1/5 sm:w-1/2 w-full border-2 bg-white border-gray-200 shadow-xl rounded-lg"
            v-show="firstIconFlag"
          >
            <div class="px-2 py-6 rounded-lg">
              <lottie
                :options="defaultOptions2"
                :height="150"
                :width="150"
                v-on:animCreated="handleAnimation"
              />
              <p class="leading-relaxed text-md font-medium">
                Check Your Credit Score At Your Home Confort.
              </p>
            </div>
          </div>
          <div
            class="p-2 md:w-1/5 sm:w-1/2 w-full border-2 border-gray-200 shadow-xl rounded-lg"
            v-show="secondIconFlag"
          >
            <div class="px-2 py-6 rounded-lg">
              <lottie
                :options="defaultOptions3"
                :height="150"
                :width="150"
                v-on:animCreated="handleAnimation"
              />
              <p class="leading-relaxed text-md font-medium">
                Increase chances of application approval.
              </p>
            </div>
          </div>
          <div
            class="p-2 md:w-1/5 sm:w-1/2 w-full border-2 border-gray-200 shadow-xl rounded-lg"
            v-show="thirdIconFlag"
          >
            <div class="px-2 py-6 rounded-lg">
              <lottie
                :options="defaultOptions4"
                :height="150"
                :width="150"
                v-on:animCreated="handleAnimation"
              />
              <p class="leading-relaxed text-md font-medium">
                Take charge of your finances.
              </p>
            </div>
          </div>
          <div
            class="p-2 md:w-1/5 sm:w-1/2 w-full border-2 border-gray-200 shadow-xl rounded-lg"
            v-show="fourIconFlag"
          >
            <div class="px-2 py-6 rounded-lg">
              <lottie
                :options="defaultOptions5"
                :height="150"
                :width="150"
                v-on:animCreated="handleAnimation"
              />
              <p class="leading-relaxed text-md font-medium">Get The Best Offers For You.</p>
            </div>
          </div>
          <div
            class="p-2 md:w-1/5 sm:w-1/2 w-full border-2 border-gray-200 shadow-xl rounded-lg"
            v-show="fiveIconFlag"
          >
            <div class="px-2 py-6 rounded-lg">
              <lottie
                :options="defaultOptions6"
                :height="150"
                :width="150"
                v-on:animCreated="handleAnimation"
              />
              <p class="leading-relaxed text-md font-medium">
                Get Your Score Now.
              </p>
              <button
                class="inline-flex text-white mt-2 bg-pink-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Check Now
              </button>
            </div>
          </div>
        </div>
        <div
          class="absolute top-52 left-0 w-full transition duration-500 ease-in-out"
          :key="rerender + 1"
          v-show="showanimation"
        >
          <infinite-slide-bar direction="reverse">
            <lottie
              style="margin: 0px !important; margin-left: -194px !important"
              :options="defaultOptions"
              :height="270"
              :width="270"
              v-on:animCreated="handleAnimation"
            />
          </infinite-slide-bar>
        </div>
      </div>
      <img
        style="z-index: -1"
        src="/img/leftwave.png"
        class="absolute top-0 -left-10"
      />
    </section>
  </div>
</template>
<script>
import animationData from "@/assets/animations/lf30_editor_njww9vij.json";
import animationData2 from "@/assets/animations/web-specialist.json";
import animationData3 from "@/assets/animations/human-resources-approval-animation.json";
import animationData4 from "@/assets/animations/teaching-or-instructing.json";
import animationData5 from "@/assets/animations/sending-email.json";
import animationData6 from "@/assets/animations/dance-party.json";
export default {
  name: "CreditScore",
  data() {
    return {
      rerender: 0,
      showanimation: true,
      defaultOptions: { animationData: animationData, loop: true },
      defaultOptions2: { animationData: animationData2, loop: true },
      defaultOptions3: { animationData: animationData3, loop: true },
      defaultOptions4: { animationData: animationData4, loop: true },
      defaultOptions5: { animationData: animationData5, loop: true },
      defaultOptions6: { animationData: animationData6, loop: true },
      animationSpeed: 1,
      firstIconFlag: false,
      secondIconFlag: false,
      thirdIconFlag: false,
      fourIconFlag: false,
      fiveIconFlag: false,
    };
  },
  methods: {
    onceHandler() {
      console.log("Hello...");
      this.rerender += 1;
      setTimeout(() => {
        this.firstIconFlag = true;
      }, 4000);
      setTimeout(() => {
        this.secondIconFlag = true;
      }, 6000);
      setTimeout(() => {
        this.thirdIconFlag = true;
      }, 8000);
      setTimeout(() => {
        this.fourIconFlag = true;
      }, 10000);
      setTimeout(() => {
        this.fiveIconFlag = true;
      }, 12000);
      setTimeout(() => {
        this.showanimation = false;
        // this.firstIconFlag = true;
      }, 12000);
    },
    handleAnimation: function(anim) {
      this.anim = anim;
    },
    stop: function() {
      this.anim.stop();
    },
    play: function() {
      this.anim.play();
    },
    pause: function() {
      this.anim.pause();
    },
    onSpeedChange: function() {
      this.anim.setSpeed(this.animationSpeed);
    },
  },
};
</script>
<style scoped></style>
