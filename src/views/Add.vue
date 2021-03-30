<template>
  <PageHeader title="add" title-icon="far/plus-square" is-subpage />
  <div id="editor">
    <div class="row row-1">
      <section id="s-date">
        <h3>Date</h3>
        <h6>{{ date }}</h6>
        <button>Today</button>
        <button>Yesterday</button>
        <button>edit</button>
      </section>
      <section id="s-sleep">
        <h3>Sleep</h3>
        <div>
          <h4>start</h4>
          <h6>{{ sleep.start }}</h6>
          <button>Edit</button>
        </div>
        <div>
          <h4>end</h4>
          <h6>{{ sleep.end }}</h6>
          <button>Edit</button>
        </div>
      </section>
    </div>
    <div class="row row-2">
      <section id="s-food">
        <div class="existing-foods" v-for="meal in meals" :key="meal.time">
          <!-- TODO List existing foods -->
        </div>
        <div class="new-food">
          <div class="time">
            <h4>Time</h4>
            <h6>{{ newMeal.time }}</h6>
            <button>Edit</button>
          </div>
          <div class="type">
            <h4>Type</h4>
            <button class="dropdown" @click="toggleDropdown">
              {{
                (foodType(newFood.typeId) && foodType(newFood.typeId).name) ||
                  "Choose..."
              }}
              <fa :icon="['fas', 'chevron-down']" />
            </button>
            <div class="dropdown">
              <ul v-if="newFood.showDropdown && !selectedCategoryExists">
                <li
                  v-for="category in foodCategories"
                  :key="category.id"
                  @click="setSelectedCategory(category.id)"
                >
                  <fa :icon="category.icon" />{{ category.name }}
                </li>
              </ul>
              <ul v-if="newFood.showDropdown && selectedCategoryExists">
                <li
                  v-for="type in typesInCategory"
                  :key="type.id"
                  @click="setSelectedType(type.id)"
                >
                  {{ type.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="row row-3">
      <section id="s-supplement">
        <div
          class="supplement-row"
          v-for="(sup, index) in supplementTypes"
          :key="sup.id"
        >
          <h2>{{ sup.name }} {{ supplements[index] }}</h2>
        </div>
      </section>
      <section id="s-drink" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import { Day, Food, FoodType, Meal, Nullable } from "@/types/firestore";
import { mapGetters } from "vuex";
import isEmpty from "lodash/isEmpty";

interface State extends Day {
  newMeal: Meal;
  newFood: NewFood;
}

interface NewFood extends Partial<Food> {
  showDropdown: boolean;
  selectedCategory: string;
}

export default defineComponent({
  name: "Add",
  components: { PageHeader },
  computed: {
    ...mapGetters([
      "selectedPersonID",
      "supplementTypes",
      "foodCategories",
      "foodTypes",
      "foodType"
    ]),
    selectedCategoryExists(): boolean {
      return !isEmpty(this.newFood.selectedCategory);
    },
    typesInCategory(): Nullable<FoodType[]> {
      console.log(this.selectedCategoryExists);
      if (!this.selectedCategoryExists) return null;
      return this.foodTypes(this.newFood.selectedCategory);
    }
  },
  data(): State {
    return {
      personId: "",
      date: "",
      sleep: {
        start: "",
        end: ""
      },
      meals: [],
      newMeal: {
        time: "",
        foods: []
      },
      newFood: {
        showDropdown: false,
        selectedCategory: ""
      },
      supplements: [], // TODO Fill to correct number
      drink: 0
    };
  },
  methods: {
    toggleDropdown() {
      this.newFood.showDropdown = !this.newFood.showDropdown;
    },
    setSelectedCategory(id: string): void {
      this.newFood.selectedCategory = id;
    },
    setSelectedType(id: string): void {
      this.newFood.typeId = id;
      this.toggleDropdown();
    }
  },
  async created() {
    await this.$store.dispatch("fetchSupplementTypes");
    this.supplements = new Array(this.supplementTypes.length).fill(0); // TODO Fill with actual server data
    await this.$store.dispatch("fetchFoodCategoriesAndTypes");
  }
});
</script>

<style scoped lang="scss"></style>
