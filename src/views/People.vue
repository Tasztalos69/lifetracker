<template>
  <PageHeader
    title="Select a person:"
    is-subpage
    v-bind="headerProps"
  ></PageHeader>
</template>

<script>
import { defineComponent } from "vue";
import PageHeader from "@/components/PageHeader";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "People",
  components: {
    PageHeader
  },
  computed: {
    ...mapGetters(["selectedPerson"]),
    headerProps() {
      // If selectedPerson exists, the user is an existing / returning user,
      // so they should see a back button
      // If not, the user shouldn't be able to go back to the login page
      const isReturningUser = !!this.selectedPerson;
      return {
        "disable-back-button": !isReturningUser
      };
    }
  }
});
</script>

<style scoped></style>
