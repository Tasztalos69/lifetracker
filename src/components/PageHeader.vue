<template>
  <div id="page-header">
    <div class="today-display" v-if="!isSubpage"></div>
    <div class="placeholder" v-if="disableBackButton"></div>
    <button
      class="rounded button-back"
      v-if="isSubpage && !disableBackButton"
      @click="goBack"
    >
      <fa :icon="['fas', 'chevron-left']"></fa>
    </button>
    <h2><fa v-if="titleIcon" :icon="titleIcon.split('/')"></fa>{{ title }}</h2>
    <div class="placeholder" v-if="isSubpage"></div>
    <div class="nav-buttons" v-if="!isSubpage">
      <button class="rounded" @click="goTo('/people')">
        <fa :icon="['fas', 'users']"></fa>
      </button>
      <button class="rounded" @click="goTo('/settings')">
        <fa :icon="['fas', 'cog']"></fa>
      </button>
      <button class="rounded" @click="logOut">
        <fa :icon="['fas', 'sign-out-alt']"></fa>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import isEmpty from "lodash/isEmpty";
import { mapActions } from "vuex";

export default defineComponent({
  name: "PageHeader",
  props: {
    title: {
      type: String,
      required: true,
      validator: v => !isEmpty(v)
    },
    titleIcon: {
      type: String,
      default: undefined,
      validator: v => v.split("/").length === 2
    },
    isSubpage: {
      type: Boolean,
      default: false
    },
    disableBackButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions("auth", ["logOut"]),
    goBack() {
      this.$router.back();
    },
    goTo(path) {
      this.$router.push(path);
    }
  }
});
</script>

<style scoped lang="scss">
@use "../scss/variables" as *;

#page-header {
  display: flex;
  flex-direction: row;
  $headerPadding: 20px;
  width: calc(100% - #{$headerPadding} * 2);
  justify-content: space-between;
  align-items: center;
  padding: $headerPadding;

  h2 {
    font-size: 3rem;
    font-weight: 700;
    text-transform: uppercase;
    svg {
      margin-right: 10px;
    }
  }

  button svg {
    width: 60%;
    height: 60%;
  }

  .button-back svg {
    margin-left: -5px;
  }

  .nav-buttons {
    button:not(:last-child) {
      margin-right: 20px;
    }
  }

  .placeholder {
    width: $roundedButtonSize;
  }
}
</style>
