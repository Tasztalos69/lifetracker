<template>
  <PageHeader
    title="Select a person:"
    is-subpage
    v-bind="headerProps"
  ></PageHeader>

  <h2 v-if="!!selectedPersonID">currently selected:</h2>
  <div class="selected-person" v-if="!!selectedPersonID"></div>
  <h2>Available people:</h2>
  <div class="available-people" v-if="availablePeople.length > 0">
    <div
      class="available-people-card"
      v-for="person in availablePeople"
      :key="person.id"
    >
      <h4>{{ person.name }}</h4>
      <p>
        days logged <span>{{ person.daysLogged }}</span>
      </p>
      <button @click="setSelectedPerson(person.id)">Select</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import PageHeader from "@/components/PageHeader";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "People",
  components: {
    PageHeader
  },
  computed: {
    ...mapGetters(["selectedPersonID", "availablePeople"]),
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
@use "../scss/variables" as *;

#page-header {
  margin-bottom: 50px;
}

h2 {
  text-transform: uppercase;
  margin: 20px 0 20px 50px;
}

.available-people {
  width: 70%;
  margin-left: 15%;
}

.available-people-card {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px;

  &:not(:last-of-type) {
    border-bottom: 3px dashed $disabled;
  }

  p {
    text-transform: uppercase;

    span {
      font-weight: 600;
    }
  }
}
</style>
