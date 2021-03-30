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

<style scoped lang="scss"></style>
