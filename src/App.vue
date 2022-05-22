<template>
  <div>
    <nav>
      <router-link to="/">Autoture</router-link> |
      <router-link to="/client">Client</router-link> |
      <router-link to="/freelancer">Freelancer</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap");

#app {
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: #000;
  scroll-behavior: smooth;
}

#logo {
  font-size: 36px;
  color: #fff;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
