<template>
  <transition name="fade5ms">
    <div id="popup" v-if="!!currentPopup">
      <div class="left">
        <fa class="icon" :icon="['fas', currentPopup.type]"></fa>
        <p>
          {{ currentPopup.text }}
        </p>
      </div>
      <fa class="close" :icon="['fas', 'times']" @click="clearFirstPopup"></fa>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "PopupWrapper",
  computed: {
    ...mapGetters(["currentPopup"])
  },
  methods: mapActions(["clearFirstPopup"])
});
</script>

<style scoped lang="scss">
@use "../scss/variables" as *;

#popup {
  padding: 0 20px;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: $bg;
  border: 4px solid var(--accent);
  width: calc(60% - 40px);
  height: 3rem;
  transition: all 0.5s ease-in-out;

  .left {
    display: flex;

    .icon {
      width: 1.4rem;
      height: 1.4rem;
    }

    .fa-exclamation-triangle {
      color: $warn;
    }

    .fa-exclamation-circle {
      color: $err;
    }

    p {
      margin-left: 10px;
      font-size: 1.2rem;
      font-weight: 600;
    }
  }

  .close {
    height: 1.6rem;
    width: 1.6rem;
    cursor: pointer;
  }
}
</style>
