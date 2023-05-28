<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-2 mt-8  mx-auto">
      <div class="flex flex-wrap -m-4 text-center">
        <div class="p-2 md:w-1/5 sm:w-1/2 w-full cursor-pointer" @click="goTo('credit-card')">
          <div
            class="border-2 border-gray-200 px-4 py-2 rounded-lg "
            style="box-shadow: 0 15px 20px rgb(76, 215, 184, 0.3)"
          >
            <div>
              <lottie
                :options="defaultOptions"
                :height="100"
                :width="220"
                v-on:animCreated="handleAnimation"
              />
            </div>
            <p class="leading-relaxed font-bold">Credit Card</p>
          </div>
        </div>
        <div class="p-2 md:w-1/5 sm:w-1/2 w-full cursor-pointer" @click="goTo('home-loan')">
          <div
            class="border-2 border-gray-200 px-4 py-2 rounded-lg"
            style="box-shadow: 0 15px 20px rgb(76, 215, 184, 0.3)"
          >
            <div>
              <lottie
                :options="defaultOptions2"
                :height="100"
                :width="220"
                v-on:animCreated="handleAnimation"
              />
            </div>
            <p class="leading-relaxed font-bold">Home Loan</p>
          </div>
        </div>
        <div class="p-2 md:w-1/5 sm:w-1/2 w-full cursor-pointer" @click="goTo('personal-loan')">
          <div
            class="border-2 border-gray-200 px-4 py-2 rounded-lg"
            style="box-shadow: 0 15px 20px rgb(76, 215, 184, 0.3)"
          >
            <div>
              <lottie
                :options="defaultOptions3"
                :height="100"
                :width="220"
                v-on:animCreated="handleAnimation"
              />
            </div>
            <p class="leading-relaxed font-bold">Personal Loan</p>
          </div>
        </div>
        <div class="p-2 md:w-1/5 sm:w-1/2 w-full cursor-pointer" @click="goTo('demat-account')">
          <div
            class="border-2 bg-white border-gray-200 px-4 py-2 rounded-lg"
            style="box-shadow: 0 15px 20px rgb(76, 215, 184, 0.3)"
          >
            <div>
              <lottie
                :options="defaultOptions4"
                :height="100"
                :width="220"
                v-on:animCreated="handleAnimation"
              />
            </div>
            <p class="leading-relaxed font-bold">Demat</p>
          </div>
        </div>
        <div class="p-2 md:w-1/5 sm:w-1/2 w-full cursor-pointer" @click="goTo('saving-account')">
          <div
            class="border-2 bg-white border-gray-200 px-4 py-2 rounded-lg"
            style="box-shadow: 0 15px 20px rgb(76, 215, 184, 0.3)"
          >
            <div style="z-index: 9999">
              <lottie
                :options="defaultOptions6"
                :height="100"
                :width="220"
                v-on:animCreated="handleAnimation"
              />
            </div>
            <p class="leading-relaxed font-bold">Saving Account</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import animationData from "@/assets/animations/cards-payment.json";
import animationData2 from "@/assets/animations/home2.json";
import animationData3 from "@/assets/animations/money.json";
import animationData4 from "@/assets/animations/office-boy-and-girl.json";
import animationData6 from "@/assets/animations/latest-mobile-plus-website-savings.json";
export default {
  name: "Secondary",
  data() {
    return {
      defaultOptions: { animationData: animationData, loop: true },
      defaultOptions2: { animationData: animationData2, loop: true },
      defaultOptions3: { animationData: animationData3, loop: true },
      defaultOptions4: { animationData: animationData4, loop: true },
      defaultOptions6: { animationData: animationData6, loop: true },
      animationSpeed: 1,
    };
  },
  methods: {
    goTo(routeLink){
      this.$router.push({path:routeLink})
    },
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