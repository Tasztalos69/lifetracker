<template>
  <div class="dashboard-card" :class="{ active }" @click="goTo('/' + target)">
    <div class="content">
      <fa v-if="icon" :icon="icon.split('/')" />
      <p>I want to</p>
      <h3>{{ target }}</h3>
      <p>{{ bottomText }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'DashboardCard',
  props: {
    elevated: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      required: true,
      validator: (v: string) => v.split('/').length === 2,
    },
    target: {
      type: String,
      required: true,
    },
    bottomText: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('auth', ['isContentManager']),
    active: function(): boolean {
      return !this.elevated || this.isContentManager;
    },
  },
  methods: {
    goTo(path: string) {
      this.active && this.$router.push(path);
    },
  },
});
</script>

<style scoped lang="scss">
@use '../scss/variables' as *;

.dashboard-card {
  position: relative;
  height: 100%;
  width: calc(30% - 3.5px);
  background: $bg;
  border-radius: 50px;
  border: 7px solid $disabled;
  box-shadow: 0 0 25px 4px rgba($disabled, 0.6);

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: $disabled;

    svg {
      font-size: 4rem;
      margin-bottom: 5vh;
    }

    p {
      text-transform: uppercase;
      font-size: 1.2rem;
      font-weight: 500;
    }

    h3 {
      font-size: 2.6rem;
      font-weight: 700;
      text-transform: uppercase;
    }
  }

  &.active {
    cursor: pointer;
    border: 7px solid var(--accent);
    box-shadow: 0 0 25px 4px rgba(#000, 0.6);

    .content {
      color: var(--accent);
    }
  }
}
</style>
