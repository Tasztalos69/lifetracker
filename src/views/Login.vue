<template>
  <h1>lifetracker by bmk</h1>
  <button @click="loginWithGoogle">login</button>
</template>

<script>
import { defineComponent } from "vue";
import { Auth } from "aws-amplify";
import { mapActions } from "vuex";

export default defineComponent({
  name: "Login",
  methods: mapActions(["loginWithGoogle"])
});
</script>

<style scoped>
h1 {
  text-transform: uppercase;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 800;
  font-size: 3rem;
  text-align: center;
}

button {
  position: absolute;
  bottom: 35%;
  left: 50%;
  transform: translate(-50%, 50%);
  font-size: 1.4rem;
  font-weight: 400;
  padding: 15px 80px;
}
</style>
