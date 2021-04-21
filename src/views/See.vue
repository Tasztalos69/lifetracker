<template>
  <PageHeader is-subpage title="see" title-icon="far/eye" />
  <div id="see">
    <div id="day-filter">
      <h2>Filter dates</h2>
      <button class="hollow">This month</button>
      <button class="hollow">Previous month</button>
      <span class="separator" />
      <div class="date-picker" />
      <span class="separator" />
      <h2>Milestones</h2>
      <button v-if="isContentManager" class="hollow">
        <fa :icon="['fas', 'plus']" />Add milestone
      </button>
    </div>
    <div id="day-list">
      <LogCard v-for="day in days" :day="day" :key="day.id" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Day } from "@/types/firestore";
import LogCard from "@/components/LogCard.vue";

export default defineComponent({
  name: "See",
  components: { LogCard, PageHeader },
  computed: {
    ...mapGetters(["log/days"]),
    ...mapGetters("auth", ["isContentManager"]),
    days() {
      return (this["log/days"] as unknown) as Day[];
    }
  },
  methods: {
    ...mapActions("log", ["fetchDays"]),
    ...mapActions(["fetchFoodCategoriesAndTypes"]),
    ...mapMutations("log", ["purgeDays"])
  },
  created() {
    this.purgeDays();
    this.fetchDays();
    this.fetchFoodCategoriesAndTypes();
  }
});
</script>

<style scoped lang="scss">
@use "../scss/variables" as *;
.hollow {
  color: var(--accent);
  background: $bg;
  border: 3px solid var(--accent);
}

#see {
  display: flex;
  position: relative;
  width: 95%;
  margin-left: 2.5%;
  margin-top: 100px;

  #day-filter {
    width: 30%;
  }

  #day-list {
    width: 65%;
  }
}
</style>
