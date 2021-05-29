<template>
  <div class="row">
    <section id="s-food">
      <h3>Food</h3>
      <div id="existing-meals">
        <div
          class="existing-meal"
          v-for="meal in meals.sort((a, b) => a.time > b.time)"
          :key="meal.time"
        >
          <h2>{{ meal.time }}</h2>
          <p>{{ meal.foods.length }}db</p>
          <h3>
            {{
              meal.foods.reduce(
                (acc, cur) =>
                  (acc += isNaN(cur.amount) ? 0 : parseInt(cur.amount)),
                0,
              )
            }}g
          </h3>
        </div>
      </div>
      <div class="new-meal" v-if="showNewMeal">
        <div class="time">
          <h4>Time</h4>
          <h6>{{ newMeal.time }}</h6>
          <button
            @click="
              init({
                placeholder: '08:00',
                delimiter: ':',
                delimiterCount: 1,
                ref: ['newMeal', 'time'],
                maxLength: 5,
                value: newMeal.time,
              })
            "
          >
            Edit
          </button>
        </div>
        <div class="foods-wrapper">
          <div class="foods">
            <div class="type-selector">
              <h4>Type</h4>
              <div
                class="food-editor"
                v-for="(food, i) in newFood"
                :key="food.id"
              >
                <button
                  class="dropdown-toggle hollow"
                  @click="toggleDropdown(i)"
                >
                  <span :class="{ placeholder: !foodType(newFood[i].typeId) }">
                    {{
                      (foodType(newFood[i].typeId) &&
                        foodType(newFood[i].typeId).name) ||
                        'Choose...'
                    }}
                  </span>
                  <fa :icon="['fas', 'chevron-down']" />
                </button>
                <div class="dropdown" v-if="newFood[i].showDropdown">
                  <ul v-if="!selectedCategoryExists(i)">
                    <li
                      v-for="category in foodCategories"
                      :key="category.id"
                      @click="setSelectedCategory({ id: category.id, i })"
                    >
                      <fa :icon="category.icon" class="category-icon" />
                      <p>{{ category.name }}</p>
                    </li>
                  </ul>
                  <ul v-if="selectedCategoryExists(i)">
                    <li
                      class="button-back"
                      @click="setSelectedCategory({ id: '', i })"
                    >
                      <fa
                        :icon="['fas', 'chevron-left']"
                        class="category-icon"
                      />
                      <p>Back</p>
                    </li>
                    <li
                      v-for="type in typesInCategory(i)"
                      :key="type.id"
                      @click="setSelectedType({ id: type.id, i })"
                    >
                      <fa
                        :icon="['fas', 'long-arrow-alt-right']"
                        class="category-icon"
                      />
                      <p>{{ type.name }}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="amount-selector">
              <h4>Amount</h4>
              <div
                class="amount-editor"
                v-for="(food, i) in newFood"
                :key="food.id"
              >
                <h6 class="amount-display">{{ newFood[i].amount }}g</h6>
                <button
                  @click="
                    init({
                      placeholder: '100',
                      delimiter: null,
                      delimiterCount: 0,
                      ref: ['newFood', i, 'amount'],
                      maxLength: 4,
                      value: newFood[i].amount,
                    })
                  "
                >
                  edit
                </button>
                <button class="delete-food" @click="removeNewFood(i)">
                  <fa :icon="['fas', 'times']" />
                </button>
              </div>
            </div>
          </div>
          <button class="plus hollow add-food" @click="addNewFood">
            <fa :icon="['fas', 'plus']" />
          </button>
        </div>
        <button class="meal-confirm hollow" @click="confirmNewMeal">
          <fa :icon="['fas', 'check']" />
        </button>
      </div>
      <button
        class="plus add-new-meal hollow"
        v-if="!showNewMeal"
        @click="toggleShowNewMeal"
      >
        <fa :icon="['fas', 'plus']" />
      </button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import isEmpty from 'lodash/isEmpty';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { FoodType, Nullable } from '@/types/firestore';

export default defineComponent({
  name: 'EditorRowFood',
  computed: {
    ...mapGetters(['foodCategories', 'foodTypes', 'foodType']),
    ...mapGetters('editor', [
      'meals',
      'newMeal',
      'showNewMeal',
      'newFood',
      'date',
    ]),
  },

  methods: {
    ...mapMutations({ init: 'keypad/init', discard: 'keypad/discard' }),
    ...mapMutations('editor', [
      'toggleDropdown',
      'toggleShowNewMeal',
      'addNewFood',
      'setSelectedCategory',
      'setSelectedType',
    ]),
    ...mapActions('editor', ['confirmNewMeal', 'removeNewFood']),
    isEmpty,
    selectedCategoryExists(index: number): boolean {
      return !isEmpty(this.newFood[index].selectedCategory);
    },
    typesInCategory(index: number): Nullable<FoodType[]> {
      if (!this.selectedCategoryExists) return null;
      return this.foodTypes(this.newFood[index].selectedCategory);
    },
  },
  async created() {
    await this.$store.dispatch('fetchFoodCategoriesAndTypes');
  },
});
</script>

<style scoped lang="scss">
@use '../scss/variables' as *;

#s-food {
  #existing-meals {
    width: 80%;
    margin-left: 10%;

    .existing-meal {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      margin: 10px 0;

      &:not(:last-of-type) {
        border-bottom: 2px dashed rgba($disabled, 0.4);
      }
    }
  }

  .add-new-meal {
    width: 100% !important;
  }

  .new-meal {
    margin-top: 40px;
    display: flex;

    h4 {
      margin-bottom: 20px;
    }

    h6 {
      margin-bottom: 10px;
    }

    .time {
      width: 25%;

      h6 {
        height: calc(1rem + 30px);
        margin-bottom: 10px;
        vertical-align: middle;
        line-height: 2.5rem;
      }
    }

    .foods-wrapper {
      width: calc(68% - 0px);
      padding-right: 50px;

      .foods {
        display: flex;
        justify-content: space-between;
        //margin-bottom: 10px;

        .food-editor {
          position: relative;

          .dropdown-toggle {
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 10px;
            padding-right: 10px;
            width: 200px;

            span {
              font-weight: 700;

              &.placeholder {
                font-weight: 400;
                color: $disabled;
                font-style: italic;
              }
            }
          }

          .dropdown {
            position: absolute;
            bottom: 0;
            transform: translateY(calc(100% - 3px));
            min-width: calc(200px - 6px);
            border: 3px solid var(--accent);
            z-index: 1000;
            background: $bg;

            ul {
              list-style: none;

              li {
                $li-vpadding: 12px;

                cursor: pointer;
                padding-left: 10px;
                padding-right: 10px;
                padding-top: $li-vpadding;
                white-space: nowrap;

                &:last-of-type {
                  padding-bottom: $li-vpadding;
                }

                * {
                  display: inline-block;
                }

                .category-icon {
                  font-size: 1rem;
                  margin-right: 10px;
                }

                p {
                  font-size: 1.2rem;
                  white-space: nowrap;
                }
              }

              .button-back {
                font-weight: 600;
              }
            }
          }
        }

        .amount-editor {
          display: flex;
          margin-bottom: 10px;
          justify-content: flex-end;
          align-items: center;

          .amount-display {
            margin-right: 20px;
            margin-bottom: 0;
          }

          .delete-food {
            background: none;
            color: var(--accent);
            padding: 0;
            font-size: 2rem;
            vertical-align: middle;
            margin-left: 20px;
          }
        }
      }

      .add-food {
        width: 100% !important;
      }
    }

    .meal-confirm {
      width: 7%;
      padding: 0;
      margin-bottom: 60px;
    }
  }
}
</style>
