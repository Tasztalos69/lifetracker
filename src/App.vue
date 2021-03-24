<template>
  <!--    <router-link to="/about">About</router-link>-->
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  created: function() {
    console.log("App component created");
    this.$store.dispatch("load").then(() => {
      console.log(this.isLoggedIn);
      if (!this.isLoggedIn) this.$router.push("/login");
    });
  },
  computed: mapGetters(["isLoggedIn", "user"])
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300&family=Roboto:wght@300;500&display=swap");

$bg: #fff;

* {
  margin: 0;
  padding: 0;
  font-family: "Raleway", sans-serif;
}

:root {
  --accent: #000;
}

*::selection,
*::-moz-selection {
  color: $bg;
  background: var(--accent);
}

*:focus,
*:active,
*:active:focus {
  outline: none;
}

button {
  background: var(--accent);
  color: $bg;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  padding: 10px 25px;

  &.rounded {
    background: $bg;
    color: var(--accent);
    border-radius: 40px;
    border: 3px solid var(--accent);
    box-shadow: 0 0 22px 4px rgba(0, 0, 0, 0.4);
  }
}

span.number {
  font-family: "Roboto", sans-serif;
}
</style>
