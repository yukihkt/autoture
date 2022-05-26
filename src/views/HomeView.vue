<template>
  <div class="home">
    <!-- welcome div-->
    <div>
      <div id="title">
        <p class="header">
          Securing payments for <span class="violet">Freelancers</span>
        </p>
        <p class="midyellow">
          Fuss-free transactions to put your mind at ease.
        </p>
        <row>
          <a href="">
            <img class="ddicon" src="../assets/app_store.svg">
          </a>
          <a href="">
            <img class="ddicon" src="../assets/gg_play.svg">
          </a>
        </row>
      </div>
      <div id="features" v-for="(feature, id) in features" :key="id">
          <p class="feature">{{ feature }}</p>
          <div class="backg"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Typewriter from "typewriter-vue";

export default {
  name: "HomeView",
  data: () => ({
    replace: [
      { from: "Freelancers", to: "Clients" },
      { from: "Clients", to: "Freelancers" },
    ],
    features: [
      "Fast & Secure",
      "Transparent & Efficient",
      "Low Commission Fees",
    ],
  }),
};
</script>

<style scoped>
.header {
  font-weight: 700;
  font-size: 55px;
  line-height: 70px;
  max-width: 600px;
  margin: 7vw auto -0.5vw;
}

.ddicon {
  width: 120px;
  margin: auto 10px;
}

#features {
  position: absolute;
  width: 350px;
  height: 250px;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  align-content: center;
}

.backg {
  border: 1px solid transparent;
  border-radius: 25px;
  background: rgb(255, 255, 255);
  opacity: 19%;
  width: 320px;
  height: 180px;
}
</style>