<template>
  <div class="row row-3">
    <section id="s-supplement">
      <h3>Supplement</h3>
      <div
        class="supplement-row"
        v-for="(sup, index) in supplementTypes"
        :key="sup.id"
      >
        <p>{{ sup.name }}</p>
        <h6>{{ supplements[index] * sup.step + sup.unit }}</h6>
        <button class="plus" @click="changeSupplement(index, 1)">
          <fa :icon="['fas', 'plus']" />
        </button>
        <button class="plus" @click="changeSupplement(index, -1)">
          <fa :icon="['fas', 'minus']" />
        </button>
      </div>
    </section>
    <section id="s-drink">
      <div class="col">
        <h3>Drink</h3>
        <div class="drink-content">
          <button class="plus drink">
            <fa :icon="['fas', 'minus']" />
          </button>
          <button class="plus drink">
            0.5L<fa :icon="['fas', 'minus']" />
          </button>
        </div>
        <div class="col">
          <div class="water-container">
            <div class="water" />
            <!-- TODO Implement person drink goal -->
          </div>
          <h6>{{ drink }}L</h6>
        </div>
        <div class="col">
          <button class="plus drink">
            <fa :icon="['fas', 'plus']" />
          </button>
          <button class="plus drink"><fa :icon="['fas', 'plus']" />0.5L</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { SupplementDrinkRow } from "@/types/editor";

export default defineComponent({
  name: "EditorRowSupplementDrink",
  computed: mapGetters(["supplementTypes"]),
  data(): SupplementDrinkRow {
    return {
      supplements: [], // TODO Fill to correct number
      drink: 0
    };
  },
  methods: {
    changeSupplement(id: number, prefix: number) {
      if (prefix !== 1 && prefix !== -1) throw Error("Invalid prefix");
      if (this.supplements[id] === 0 && prefix === -1) return;
      this.supplements[id] += prefix;
      //  TODO Write to DB
    }
  },
  async created() {
    await this.$store.dispatch("fetchSupplementTypes");
    this.supplements = new Array(this.supplementTypes.length).fill(0); // TODO Fill with actual server data
  }
});
</script>

<style scoped></style>
