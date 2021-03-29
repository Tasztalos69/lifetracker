<template>
  <PageHeader title="dashboard" />
  <div id="dashboard-links">
    <DashboardCard icon="far/eye" target="see" bottom-text="the food log" />
    <DashboardCard
      elevated
      icon="far/plus-square"
      target="add"
      bottom-text="a meal i had"
    />
    <DashboardCard
      elevated
      icon="fas/list"
      target="manage"
      bottom-text="food categories"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import DashboardCard from "@/components/DashboardCard.vue";

export default defineComponent({
  name: "Dashboard",
  components: { DashboardCard, PageHeader }
});
</script>

<style scoped lang="scss">
#dashboard-links {
  position: relative;
  display: flex;
  width: 90vw;
  height: 70vh;
  margin-top: 10vh;
  margin-left: 5vw;
  flex-direction: row;
  justify-content: space-around;
}
</style>
