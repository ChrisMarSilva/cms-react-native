<template>
  <div class="relative">
    <Primary />
    <Secondary />
    <InfoBars />
    <img
      style="z-index: -1"
      src="/img/wave.png"
      class="absolute -top-5 right-0"
    />
  </div>
</template>
<script>
import { Primary, Secondary, InfoBars } from "./components";

export default {
  components: { Primary, Secondary, InfoBars },
  name: "Home",
};
</script>
<style scoped></style>
