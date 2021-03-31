<template>
  <div class="row row-2">
    <section id="s-food">
      <h3>Food</h3>
      <div class="existing-meals" v-for="meal in meals" :key="meal.time">
        <!-- TODO List existing foods -->
      </div>
      <div class="new-meal" v-if="showNewMeal">
        <div class="time">
          <h4>Time</h4>
          <h6>{{ newMeal.time }}</h6>
          <button>Edit</button>
        </div>
        <div class="foods">
          <h4>Type</h4>
          <h4>Amount</h4>
          <div class="food-editor" v-for="(food, i) in newFood" :key="food.id">
            <button class="dropdown" @click="toggleDropdown(i)">
              {{
                (foodType(newFood[i].typeId) &&
                  foodType(newFood[i].typeId).name) ||
                  "Choose..."
              }}
              <fa :icon="['fas', 'chevron-down']" />
            </button>
            <div class="dropdown">
              <ul v-if="newFood[i].showDropdown && !selectedCategoryExists(i)">
                <li
                  v-for="category in foodCategories"
                  :key="category.id"
                  @click="setSelectedCategory(category.id, i)"
                >
                  <fa :icon="category.icon" />{{ category.name }}
                </li>
              </ul>
              <ul v-if="newFood.showDropdown && selectedCategoryExists(i)">
                <li
                  v-for="type in typesInCategory"
                  :key="type.id"
                  @click="setSelectedType(type.id, i)"
                >
                  {{ type.name }}
                </li>
              </ul>
            </div>
            {{ newFood.amount }}
            <button>edit</button>
          </div>
          <button class="plus" @click="addNewFood">
            <fa :icon="['fas', 'plus']" />
          </button>
        </div>
        <button class="meal-confirm">
          <fa :icon="['fas', 'check']" />
        </button>
      </div>
      <button class="plus" v-if="!showNewMeal" @click="toggleShowNewMeal">
        <fa :icon="['fas', 'plus']" />
      </button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import isEmpty from "lodash/isEmpty";
import { mapGetters } from "vuex";
import { FoodType, Nullable } from "@/types/firestore";
import { FoodRow } from "@/types/editor";

export default defineComponent({
  name: "EditorRowFood",
  computed: {
    ...mapGetters(["foodCategories", "foodTypes", "foodType"]),
    typesInCategory(index: number): Nullable<FoodType[]> {
      console.log(this.selectedCategoryExists);
      if (!this.selectedCategoryExists) return null;
      return this.foodTypes(this.newFood[index].selectedCategory);
    }
  },
  data(): FoodRow {
    return {
      meals: [],
      newMeal: {
        time: ""
      },
      showNewMeal: false,
      newFood: [
        {
          showDropdown: false,
          selectedCategory: ""
        }
      ]
    };
  },
  methods: {
    toggleDropdown(i: number) {
      this.newFood[i].showDropdown = !this.newFood[i].showDropdown;
    },
    selectedCategoryExists(index: number): boolean {
      return !isEmpty(this.newFood[index].selectedCategory);
    },
    toggleShowNewMeal() {
      this.showNewMeal = !this.showNewMeal;
    },
    addNewFood() {
      this.newFood.push({
        showDropdown: false,
        selectedCategory: ""
      });
    },
    setSelectedCategory(id: string, i: number): void {
      this.newFood[i].selectedCategory = id;
    },
    setSelectedType(id: string, i: number): void {
      this.newFood[i].typeId = id;
      this.newFood[i].selectedCategory = "";
      this.toggleDropdown(i);
    }
  },
  async created() {
    await this.$store.dispatch("fetchFoodCategoriesAndTypes");
  }
});
</script>

<style scoped></style>
