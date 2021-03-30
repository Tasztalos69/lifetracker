<template>
  <div class="available-people-card" :class="{ selected: isSelected }">
    <h4>{{ person.name }}</h4>
    <p>
      days logged <span>{{ person.daysLogged }}</span>
    </p>
    <button @click="setSelectedPerson(person.id)" v-if="!isSelected">
      Select
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { mapActions, mapGetters } from "vuex";
import { Person } from "@/types/firestore";

export default defineComponent({
  name: "PeopleCard",
  computed: mapGetters(["availablePeople"]),
  methods: mapActions(["setSelectedPerson"]),

  props: {
    person: {
      type: Object as PropType<Person>
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: false
    }
  }
});
</script>

<style scoped lang="scss">
@use "../scss/variables" as *;

.available-people-card {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 80px;

  &.selected {
    padding: 30px 80px;
    border: 5px solid var(--accent);
    border-radius: 20px;
    box-shadow: 0 0 20px 5px rgba(#000, 0.5);
  }

  * {
    text-align: center;
  }

  &:not(:last-of-type) {
    border-bottom: 3px dashed $disabled;
  }

  h4 {
    font-size: 1.3rem;
    text-transform: uppercase;
  }

  p {
    text-align: left;
    text-transform: uppercase;

    span {
      font-weight: 600;
    }
  }
}
</style>
