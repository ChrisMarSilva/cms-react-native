<template>
  <div class="relative">
    <div class="grid p-10 grid-cols-1 md:grid-cols-3 place-items-center">
      <div
        class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center"
      >
        <div
          class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
        >
          <h1
            class="title-font sm:text-4xl text-4xl mb-4 font-medium text-indigo-900"
          >
            Our Products
          </h1>
          <p class="mb-8 leading-relaxed text-md text-gray-600 font-medium">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage hot chicken authentic tumeric truffaut
            hexagon try-hard chambray.
          </p>
          <p class="mb-8 leading-relaxed text-md text-gray-800 font-semibold">
            Fast and Reliable Way To Check Your Credit Score.
          </p>
          <p class="mb-2 leading-relaxed text-md text-gray-900 font-semibold">
            Our Best Products
          </p>
          <div class="flex justify-center">
            <div class="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
          </div>
        </div>
      </div>
      <div class="p-4 w-96 mr-36">
        <div class="flex rounded-lg h-full bg-white p-8 flex-col border-2 border-gray-200 shadow-xl">
          <div class="flex items-center mb-3">
            <div
              class="w-12 h-12 mr-3 inline-flex items-center justify-center rounded-full  text-white flex-shrink-0"
            >
              <img :src="`/img/${cardImg}`" class="w-16 h-16" />
            </div>
            <h2 class="text-gray-900 text-lg title-font font-medium">
              {{cardTitle}}
            </h2>
          </div>
          <div class="flex-grow">
            <p class="leading-relaxed text-base">
              Blue bottle crucifix vinyl post-ironic four dollar toast vegan
              taxidermy. Gastropub indxgo juice poutine.
            </p>
            <a class="mt-3 text-indigo-500 inline-flex items-center"
              >Learn More
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div>
        <div class="grid grid-cols-3 place-items-center gap-10">
          <div
            @mouseover="handleContentChange('Credit Card','credit-card.svg')"
            class="bg-white w-32 h-32 rounded-2xl border-2 shadow-xl border-gray-200 cursor-pointer"
          >
            <div class="flex-column space-y-2 py-3">
              <img
                src="/img/credit-card.svg"
                alt=""
                class="h-14 w-14 mx-auto"
              />
              <div class="text-center pt-4 font-medium">Credit Card</div>
            </div>
          </div>
          <div class="flex-column space-y-6">
            <div
              @mouseover="handleContentChange('Health Care','healthcare.svg')"
              class="bg-white w-32 h-32 rounded-2xl border-2 shadow-xl border-gray-200 cursor-pointer"
            >
              <div class="flex-column space-y-2 py-3">
                <img
                  src="/img/healthcare.svg"
                  alt=""
                  class="h-14 w-14 mx-auto"
                />
                <div class="text-center pt-4 font-medium">Health Care</div>
              </div>
            </div>
            <!-- <div class="container bg-gray-200 w-32 h-32">
              <div class="overlay bg-red-500 w-32 h-32">
                this is hovered text
              </div>
            </div> -->
            <div
              @mouseover="handleContentChange('Personal Loan','personalloan.png')"
              class="bg-white w-32 h-32 rounded-2xl border-2 shadow-xl border-gray-200 cursor-pointer"
            >
              <div class="flex-column space-y-2 py-3">
                <img
                  src="/img/personalloan.png"
                  alt=""
                  class="h-14 w-14 mx-auto"
                />
                <div class="text-center pt-0 font-medium">
                  Personal <br />Loan
                </div>
              </div>
            </div>
            <div
              @mouseover="handleContentChange('Home Loan','homeloan.png')"
              class="bg-white w-32 h-32 rounded-2xl border-2 shadow-xl border-gray-200 cursor-pointer"
            >
              <div class="flex-column space-y-2 py-3">
                <img src="/img/homeloan.png" alt="" class="h-14 w-14 mx-auto" />
                <div class="text-center pt-4 font-medium">Home Loan</div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex-column space-y-6">
              <div
                @mouseover="handleContentChange('Life Insurance','lifeinsurance.png')"
                class="bg-white w-32 h-32 rounded-2xl border-2 shadow-xl border-gray-200 cursor-pointer"
              >
                <div class="flex-column space-y-2 py-3">
                  <img
                    src="/img/lifeinsurance.png"
                    alt=""
                    class="h-14 w-14 mx-auto"
                  />
                  <div class="text-center pt-0 font-medium">
                    Life <br />Insurance
                  </div>
                </div>
              </div>
              <div
                @mouseover="handleContentChange('Savings Account','savings.png')"
                class="bg-white w-32 h-32 rounded-2xl border-2 shadow-xl border-gray-200 cursor-pointer"
              >
                <div class="flex-column space-y-2 py-3">
                  <img
                    src="/img/savings.png"
                    alt=""
                    class="h-14 w-14 mx-auto"
                  />
                  <div class="text-center pt-0 font-medium">
                    Savings <br />Account
                  </div>
                </div>
              </div>
              <div
                @mouseover="handleContentChange('Mutual Funds','homeloan.png')"
                class="bg-white w-32 h-32 rounded-2xl border-2 shadow-xl border-gray-200 cursor-pointer"
              >
                <div class="flex-column space-y-2 py-3">
                  <img
                    src="/img/homeloan.png"
                    alt=""
                    class="h-14 w-14 mx-auto"
                  />
                  <div class="text-center pt-4 font-medium">Mutual Funds</div>
                </div>
              </div>
              <div
                @mouseover="handleContentChange('Demat Account','growth.png')"
                class="bg-white w-32 h-32 rounded-2xl border-2 shadow-xl border-gray-200 cursor-pointer"
              >
                <div class="flex-column space-y-2 py-3">
                  <img src="/img/growth.png" alt="" class="h-14 w-14 mx-auto" />
                  <div class="text-center pt-4 font-medium">Demat Account</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img
      style="z-index: -1; height: 600px; width: 700px"
      src="/img/rightbluewave.png"
      class="absolute top-0 right-0"
    />
  </div>
</template>
<script>
export default {
  name: "Products",
  data () {
    return {
      cardTitle: 'Health Care',
      cardImg: 'healthcare.svg'
    }
  },
  methods:{
    handleContentChange(title,img){
      this.cardTitle = title;
      this.cardImg = img;
    }
  }
};
</script>
<style scoped>
.container {
  position: relative;
  width: 100%;
}
.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ccc;
  overflow: hidden;
  width: 100%;
  height: 0;
  transition: 0.3s linear;
}

.container:hover .overlay {
  height: 100%;
}
</style>
