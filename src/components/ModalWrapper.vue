<template>
  <transition name="fade3ms">
    <div id="modal-wrapper" v-if="!isEmpty(modal.title)">
      <div id="modal">
        <h1>{{ modal.title }}</h1>
        <p>{{ modal.description }}</p>
        <button class="close" @click="modalBtnHandler()">
          {{ modal.closeBtn }}
        </button>
        <button class="ok" @click="modalBtnHandler(true)">
          {{ modal.okBtn }}
        </button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import isEmpty from 'lodash/isEmpty';

export default defineComponent({
  name: 'ModalWrapper',
  computed: mapGetters({ modal: 'modal' }),
  methods: {
    isEmpty,
    ...mapActions(['modalBtnHandler']),
  },
});
</script>

<style lang="scss">
@use '../scss/variables' as *;

#modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($disabled, 0.5);

  #modal {
    padding: 30px 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: $bg;
    text-align: center;
    border: 6px solid var(--accent);

    h1 {
      text-transform: uppercase;
      font-weight: 700;
      font-size: 1.7rem;
    }

    p {
      margin: 10px 0 30px;
      font-weight: 300;
    }

    button {
      margin: 0 20px;
      border: 3px solid transparent;
      font-weight: 600;
      font-size: 1.1rem;

      &.close {
        background: none;
        border-color: var(--accent);
        color: var(--accent);
      }
    }
  }
}
</style>
