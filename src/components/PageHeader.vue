<template>
  <div id="page-header">
    <div class="today-display" v-if="!isSubpage && meals">
      <p>
        {{
          (sleep.duration && sleep.duration.replace(":", "h").concat("m")) ||
            "-"
        }}
      </p>
      <p class="amount">{{ totalAmount }}</p>
      <p>{{ drink }}L</p>
    </div>
    <div class="placeholder" v-if="disableBackButton" />
    <button
      class="rounded button-back"
      v-if="isSubpage && !disableBackButton"
      @click="goBack"
    >
      <fa :icon="['fas', 'chevron-left']" />
    </button>
    <h2><fa v-if="titleIcon" :icon="titleIcon.split('/')" />{{ title }}</h2>
    <div class="placeholder" v-if="isSubpage" />
    <div class="nav-buttons" v-if="!isSubpage">
      <button class="rounded" @click="goTo('/people')">
        <fa :icon="['fas', 'users']" />
      </button>
      <button class="rounded" @click="goTo('/settings')">
        <fa :icon="['fas', 'cog']" />
      </button>
      <button class="rounded" @click="logOut">
        <fa :icon="['fas', 'sign-out-alt']" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import isEmpty from "lodash/isEmpty";
import { mapActions, mapGetters } from "vuex";
import { DateTime } from "luxon";
import { Meal } from "@/types/firestore";

export default defineComponent({
  name: "PageHeader",
  computed: {
    ...mapGetters("editor", ["meals", "sleep", "drink"]),
    totalAmount(): string {
      if (isEmpty(this.meals)) return "-";
      let total = 0;
      (this.meals as Meal[]).forEach(m =>
        m.foods.forEach(f => (total += isNaN(f.amount) ? 0 : Number(f.amount)))
      );
      return total + "g";
    }
  },
  props: {
    title: {
      type: String,
      required: true,
      validator: v => !isEmpty(v)
    },
    titleIcon: {
      type: String,
      default: undefined,
      validator: (v: string) => v.split("/").length === 2
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
    ...mapActions("editor", ["setDate"]),
    goBack() {
      this.$router.back();
    },
    goTo(path: string) {
      this.$router.push(path);
    }
  },
  mounted() {
    if (!this.isSubpage) {
      this.setDate(DateTime.now().toISODate());
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

  .today-display {
    display: flex;
    border: 4px solid var(--accent);
    border-radius: 20px;
    padding: 15px 20px;
    background: $bg;
    box-shadow: 0 0 20px 1px rgba(#000, 0.5);

    p {
      padding: 0 10px;
      font-size: 1.4rem;

      &.amount {
        font-weight: 600;
      }

      &:not(:last-of-type) {
        border-right: 1pt solid var(--accent);
      }
    }
  }

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
