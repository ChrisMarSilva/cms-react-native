<template>
  <div class="p-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-20 place-items-center">
      <div class="relative">
        <div class="productInfo productInfo1 text-gray-600">
          <div class="absolute capitalize font-semibold top-4 left-6">
            Credit cards
          </div>
          From 50+ options, choose a card matching your lifestyle & needs
        </div>
        <div class="absolute top-10 -right-10">
          <img src="/img/credit.svg" alt="" width="150px" />
        </div>
      </div>
      <div class="relative">
        <div class="productInfo productInfo2">
          <div class="absolute top-4 left-6">
            HEADING
          </div>
          slanted div text nad uashuia ioa asdasd asda dasdada adada ada d
          <div class="absolute bottom-4">
            Learn more --->
          </div>
        </div>

        <div class="absolute top-10 -right-10">
          <img src="/img/credit.svg" alt="" width="150px" />
        </div>
      </div>
      <div class="relative">
        <div class="productInfo productInfo3">
          slanted div text nad uashuia ioa asdasd asda dasdada adada ada d
        </div>
        <div class="absolute top-10 -right-10">
          <img src="/img/credit.svg" alt="" width="150px" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Testimonials",
};
</script>
<style scoped>
.productInfo {
  position: relative;
  border-radius: 30px;
  color: #494973;
  /* display: inline-block; */
  padding: 4em 8em 4em 1em;
  overflow: hidden;
  width: 300px;
}
.productInfo1::after {
  content: "";
  position: absolute;
  top: 0;
  border-radius: 40px;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f0faf9;
  -webkit-transform-origin: 100% 0;
  -ms-transform-origin: 100% 0;
  transform-origin: 100% 0;
  -webkit-transform: skew(30deg);
  -ms-transform: skew(30deg);
  transform: skew(-20deg);
  z-index: -1;
}
.productInfo2::after {
  content: "";
  position: absolute;
  top: 0;
  border-radius: 40px;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f6f0fc;
  -webkit-transform-origin: 100% 0;
  -ms-transform-origin: 100% 0;
  transform-origin: 100% 0;
  -webkit-transform: skew(30deg);
  -ms-transform: skew(30deg);
  transform: skew(-20deg);
  z-index: -1;
}
.productInfo3::after {
  content: "";
  position: absolute;
  top: 0;
  border-radius: 40px;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffeff9;
  -webkit-transform-origin: 100% 0;
  -ms-transform-origin: 100% 0;
  transform-origin: 100% 0;
  -webkit-transform: skew(30deg);
  -ms-transform: skew(30deg);
  transform: skew(-20deg);
  z-index: -1;
}
</style>