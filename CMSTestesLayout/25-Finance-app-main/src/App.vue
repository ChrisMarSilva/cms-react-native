<template>
  <div id="app">
    <div class="hidden md:block lg:block">
      <div id="nav">
        <Navbar />
        <SubNavBanner />
      </div>
      <router-view />
      <Footer />
    </div>
    <div class="md:hidden lg:hidden">
      <section class="text-gray-600 body-font">
        <div
          class="container mx-auto flex px-5 py-24 items-center justify-center flex-col"
        >
          <lottie
            :options="defaultOptions"
            :height="250"
            :width="250"
            v-on:animCreated="handleAnimation"
          />
          <div class="text-center lg:w-2/3 w-full">
            <h1
              class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900"
            >
              We are Currently Under Manitanance On Mobile Devices.
            </h1>
            <p class="mb-8 leading-relaxed">
              Sorry for the inconvenience. Please check us on Desktop devices.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import SubNavBanner from "@/components/Navbar/SubNavBanner.vue";
import Footer from "./components/Footer/Footer.vue";
import animationData from "@/assets/animations/under-construction.json";

export default {
  name: "App",
  data() {
    return {
      defaultOptions: { animationData: animationData, loop: true },
    };
  },
  components: {
    Navbar,
    SubNavBanner,
    Footer,
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
<style>
body::-webkit-scrollbar {
  display: none;
}
</style>
