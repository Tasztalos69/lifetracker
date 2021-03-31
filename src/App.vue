<template>
  <router-view />
  <PopupWrapper />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";
import PopupWrapper from "./components/PopupWrapper.vue";

export default defineComponent({
  components: { PopupWrapper },
  computed: mapGetters(["db"]),
  created: function() {
    this.$store.commit("setDB", firebase.firestore());
    firebase.auth().onAuthStateChanged(user => {
      this.setUser({ user });
    });
  },
  methods: { ...mapActions("auth", ["setUser"]) }
});
</script>

<style lang="scss">
@use "scss/variables" as *;

@import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,600&family=Roboto:wght@300;500&display=swap");

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
  position: relative;
  background: var(--accent);
  color: $bg;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  padding: 10px 25px;

  &.rounded {
    background: $bg;
    color: var(--accent);
    border-radius: 20px;
    border: 5px solid var(--accent);
    box-shadow: 0 0 ($roundedButtonSize / 4) 4px rgba(0, 0, 0, 0.4);
    height: $roundedButtonSize;
    width: $roundedButtonSize;
    padding: 0;
  }
}

span.number {
  font-family: "Roboto", sans-serif;
}

.fade5ms-enter-active,
.fade5ms-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade3ms-enter-active,
.fade3ms-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade5ms-enter-from,
.fade5ms-leave-to,
.fade3ms-enter-from,
.fade3ms-leave-to {
  opacity: 0;
}
</style>
