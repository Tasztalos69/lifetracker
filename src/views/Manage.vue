<template>
  <PageHeader is-subpage title="manage" title-icon="fas/list" />
  <div id="manager">
    <section>
      <h2 class="section-title">Categories</h2>
      <div
        v-for="c in foodCategories"
        :key="c.id"
        class="category-card"
        @click="selectedFoodCategory = c.id"
      >
        <fa :icon="c.icon" class="category-icon" />
        <p>{{ c.name }}</p>
      </div>
    </section>
    <span class="separator" />
    <section id="food-types">
      <h2 class="section-title">Food Types</h2>
      <transition-group name="fade2ms">
        <ul v-if="!isEmpty(selectedFoodCategory)">
          <li
            class="food-type"
            v-for="ft in foodTypes(selectedFoodCategory)"
            :key="ft"
          >
            <p>{{ ft.name }}</p>
            <fa :icon="['fas', 'times']" class="close-btn" />
          </li>
          <li id="add-food-type">
            <button
              v-if="!newTypeInput"
              class="hollow"
              @click="newTypeInput = true"
            >
              <fa :icon="['fas', 'plus']" />
            </button>
            <form v-else @click.prevent="addNewFoodType(newTypeName)">
              <input
                type="text"
                v-model="newTypeName"
                placeholder="Enter a name..."
              />
              <button type="submit" class="hollow">
                <fa :icon="['fas', 'check']" />
              </button>
            </form>
          </li>
        </ul>
        <p v-else class="select-category-placeholder">
          Select a category to display food types.
        </p>
      </transition-group>
    </section>
    <span class="separator" />
    <section>
      <h2 class="section-title">Supplement Types</h2>
      <div class="subsection">
        <div class="supplement-row table-header">
          <h4>Name</h4>
          <h4>Unit</h4>
          <h4>Step</h4>
          <span />
        </div>
        <div class="supplement-row" v-for="s in supplementTypes" :key="s.id">
          <p>{{ s.name }}</p>
          <p>{{ s.unit }}</p>
          <p>{{ s.step }}</p>
          <fa :icon="['fas', 'times']" />
        </div>
      </div>
      <h2 class="section-title">Person targets</h2>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageHeader from '@/components/PageHeader.vue';
import { mapActions, mapGetters } from 'vuex';
import isEmpty from 'lodash/isEmpty';

export default defineComponent({
  name: 'Manage',
  components: { PageHeader },
  data() {
    return {
      selectedFoodCategory: '',
      newTypeInput: false,
      newTypeName: '',
    };
  },
  computed: {
    ...mapGetters(['foodCategories', 'foodTypes', 'supplementTypes']),
  },
  methods: {
    ...mapActions(['fetchFoodCategoriesAndTypes', 'fetchSupplementTypes']),
    isEmpty,
  },
  mounted() {
    this.fetchFoodCategoriesAndTypes();
    this.fetchSupplementTypes();
  },
});
</script>

<style scoped lang="scss">
@use '../scss/variables' as *;

#manager {
  position: relative;
  width: 90%;
  min-height: 70vh;
  display: flex;
  justify-content: space-between;
  margin-left: 5%;
  margin-top: 50px;

  .hollow {
    color: var(--accent);
    background: $bg;
    border: 3px solid var(--accent);
  }

  section {
    width: 30%;
    min-height: 100%;

    h2 {
      text-transform: uppercase;
      font-size: 1.8rem;
      margin-bottom: 30px;
    }
  }

  .category-card {
    display: flex;
    align-items: center;
    margin: 20px 0;
    cursor: pointer;

    .category-icon {
      font-size: 1.8rem;
      margin-right: 10px;
    }

    p {
      font-size: 1.2rem;
      text-transform: uppercase;
      font-weight: 500;
    }
  }

  #food-types {
    .select-category-placeholder {
      font-weight: 300;
      font-style: italic;
    }

    ul {
      position: relative;
      list-style: none;

      li {
        margin: 10px 0;
      }

      .food-type {
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          text-transform: uppercase;
          font-weight: 500;
        }

        .close-btn {
          font-size: 1.8rem;
        }
      }

      #add-food-type {
        button {
          width: 100%;
          padding: 5px 0;
        }

        form {
          display: flex;
          justify-content: stretch;
          align-items: center;

          input {
            flex-grow: 1;
            border: none;
            border-bottom: 2px solid var(--accent);
            margin-right: 20px;
            padding: 5px 5px 5px 0;
            font-size: 1rem;
            font-weight: 500;
          }

          button {
            padding: 0;
            border: none;
            font-size: 1.5rem;
            width: 20px;
          }
        }
      }
    }
  }

  .separator {
    display: block;
    width: 2px;
    align-self: stretch;
    border-right: 2px dashed $disabled;
  }
}
</style>
