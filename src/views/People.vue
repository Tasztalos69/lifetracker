<template>
  <PageHeader title="Select a person:" is-subpage v-bind="headerProps" />

  <h2 v-if="!!selectedPersonData">currently selected:</h2>
  <transition name="fade3ms">
    <div class="selected-person" v-if="!!selectedPersonData">
      <PeopleCard :person="selectedPersonData" is-selected />
    </div>
  </transition>
  <h2>Available people:</h2>
  <transition name="fade3ms">
    <div class="available-people" v-if="availablePeople.length > 0">
      <PeopleCard
        v-for="person in availablePeople"
        :key="person.id"
        :person="person"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import { mapActions, mapGetters } from "vuex";
import PeopleCard from "@/components/PeopleCard.vue";

export default defineComponent({
  name: "People",
  components: {
    PeopleCard,
    PageHeader
  },
  computed: {
    ...mapGetters([
      "selectedPersonID",
      "availablePeople",
      "selectedPersonData"
    ]),
    headerProps() {
      // If selectedPerson exists, the user is an existing / returning user,
      // so they should see a back button
      // If not, the user shouldn't be able to go back to the login page
      const isReturningUser = !!this.selectedPersonID;
      return {
        "disable-back-button": !isReturningUser
      };
    }
  },
  methods: mapActions(["setSelectedPerson"]),
  created() {
    this.$store.dispatch("getAvailablePeople");
  }
});
</script>

<style scoped lang="scss">
#page-header {
  margin-bottom: 50px;
}

h2 {
  text-transform: uppercase;
  margin: 40px 0 20px 50px;
}

.available-people,
.selected-person {
  width: calc(70% - 160px);
  margin-left: 15%;
}
</style>
