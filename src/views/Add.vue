<template>
  <PageHeader title="add" title-icon="far/plus-square" is-subpage />
  <div id="editor">
    <EditorRowDateSleep />
    <EditorRowFood />
    <EditorRowSupplementDrink />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import EditorRowDateSleep from "@/components/EditorRowDateSleep.vue";
import EditorRowFood from "@/components/EditorRowFood.vue";
import EditorRowSupplementDrink from "@/components/EditorRowSupplementDrink.vue";

export default defineComponent({
  name: "Add",
  components: {
    EditorRowSupplementDrink,
    EditorRowFood,
    EditorRowDateSleep,
    PageHeader
  }
});
</script>

<style scoped lang="scss">
@use "../scss/variables" as *;

#editor {
  position: relative;
  margin-top: 100px;
  margin-left: 100px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  width: calc(60% - 60px);
  justify-content: stretch;

  .row:not(:last-of-type) {
    border-bottom: 2px dashed $disabled;
  }

  .row::v-deep {
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
  }
}
</style>
