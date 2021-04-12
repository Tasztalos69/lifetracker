<template>
  <PageHeader title="add" title-icon="far/plus-square" is-subpage />
  <div id="editor">
    <EditorRowDateSleep :class="{ inactive: isEmpty(date) }" />
    <EditorRowFood :class="{ inactive: isEmpty(date) }" />
    <EditorRowSupplementDrink :class="{ inactive: isEmpty(date) }" />
  </div>
  <transition name="keypad">
    <EditorKeypad v-if="shouldDisplayKeypad" />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";
import isEmpty from "lodash/isEmpty";
import PageHeader from "@/components/PageHeader.vue";
import EditorRowDateSleep from "@/components/EditorRowDateSleep.vue";
import EditorRowFood from "@/components/EditorRowFood.vue";
import EditorRowSupplementDrink from "@/components/EditorRowSupplementDrink.vue";
import EditorKeypad from "@/components/EditorKeypad.vue";

export default defineComponent({
  name: "Add",
  computed: {
    ...mapGetters(["keypad/ref", "editor/date"]),
    date(): string {
      return this["editor/date"];
    },
    shouldDisplayKeypad(): boolean {
      return !isEmpty(this["keypad/ref"]);
    }
  },
  methods: {
    ...mapMutations("editor", ["setDayId", "replaceStateWithObject"]),
    isEmpty
  },
  components: {
    EditorKeypad,
    EditorRowSupplementDrink,
    EditorRowFood,
    EditorRowDateSleep,
    PageHeader
  },
  created() {
    this.setDayId(undefined);
    this.replaceStateWithObject({
      dayId: undefined,
      date: "",
      sleep: {
        start: "",
        end: ""
      },
      newMeal: {
        time: "",
        foods: []
      },
      showNewMeal: false,
      newFood: [],
      meals: [],
      supplements: [],
      drink: 0
    });
    this.$store.dispatch("fetchSupplementTypes");
    this.$store.dispatch("getAvailablePeople");
  }
});
</script>

<style scoped lang="scss">
@use "../scss/variables" as *;

#editor {
  position: relative;
  margin: 100px 0 100px 100px;
  display: flex;
  flex-direction: column;
  width: calc(60% - 60px);
  justify-content: stretch;

  .row:not(:last-of-type) {
    border-bottom: 2px dashed $disabled;
  }

  ::v-deep(.row) {
    width: 100%;
    display: flex;
    padding: 30px 0;

    section {
      padding: 0 30px;
      flex-grow: 1;

      &#s-sleep {
        flex-grow: 0;
      }

      &:not(:last-of-type) {
        border-right: 2px dashed $disabled;
      }
    }

    h3 {
      text-transform: uppercase;
      font-weight: 700;
      font-size: 1.5rem;
      margin-bottom: 20px;
    }

    h4 {
      text-transform: uppercase;
      font-weight: 600;
      font-size: 1.2rem;
    }

    h6 {
      font-weight: 700;
      font-size: 1.2rem;
      font-style: italic;
      text-indent: -0.8rem;

      &:before {
        content: " ";
        display: inline-block;
        width: 1rem;
      }
    }

    .hollow {
      color: var(--accent);
      background: $bg;
      border: 3px solid var(--accent);
    }

    .plus {
      width: 40px;
      height: 40px;
      padding: 0;
    }

    * {
      transition: 0.2s all ease-in-out;
    }

    &.inactive {
      section:not(#s-date) {
        color: $disabled;

        button {
          background: $disabled;
          color: $bg;
          cursor: default;
        }

        .hollow {
          color: $disabled;
          background: $bg;
          border: 3px solid $disabled;
        }

        .water-container {
          border: 3px solid $disabled;
          border-top: none;
        }
      }
    }
  }
}

#keypad-wrapper {
  position: fixed;
  top: 150px;
  right: 50px;
  width: 30%;
}
</style>
