<template>
  <PageHeader is-subpage title="see" title-icon="far/eye"></PageHeader>
</template>

<script>
import { defineComponent } from "vue";
import PageHeader from "@/components/PageHeader";

export default defineComponent({
  name: "Dashboard",

  components: { PageHeader }
});
</script>

<style scoped></style>
