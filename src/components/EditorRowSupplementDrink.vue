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
        <h6>
          {{
            isNaN(supplements[index])
              ? 0 + sup.unit
              : supplements[index] * sup.step + sup.unit
          }}
        </h6>
        <div class="supplement-actions">
          <button
            class="plus hollow"
            @click="changeSupplement({ id: index, prefix: 1 })"
          >
            <fa :icon="['fas', 'plus']" />
          </button>
          <button
            class="plus hollow"
            @click="changeSupplement({ id: index, prefix: -1 })"
          >
            <fa :icon="['fas', 'minus']" />
          </button>
        </div>
      </div>
    </section>
    <section id="s-drink">
      <h3>Drink</h3>
      <div class="drink-content">
        <div class="col">
          <button class="plus hollow drink" @click="changeWater(-0.1)">
            <fa :icon="['fas', 'minus']" class="icon" />
          </button>
          <button class="plus hollow drink" @click="changeWater(-0.5)">
            0.5L<fa :icon="['fas', 'minus']" class="icon" />
          </button>
        </div>
        <div class="col">
          <div class="water-container">
            <div
              class="water"
              :style="{
                height: waterHeight + '%'
              }"
            />
            <transition name="fade3ms">
              <fa
                :icon="['fas', 'check']"
                class="water-checkmark"
                v-if="waterHeight === 100"
              />
            </transition>
          </div>
          <h6>{{ drink }}L</h6>
        </div>
        <div class="col">
          <button class="plus hollow drink" @click="changeWater(0.1)">
            <fa :icon="['fas', 'plus']" class="icon" />
          </button>
          <button class="plus hollow drink" @click="changeWater(0.5)">
            <fa :icon="['fas', 'plus']" class="icon" />0.5L
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "EditorRowSupplementDrink",
  computed: {
    ...mapGetters(["supplementTypes", "selectedPersonTargets"]),
    ...mapGetters("editor", ["drink", "supplements"]),
    waterHeight(): number {
      if (!this.selectedPersonTargets) return 0;
      return Math.min(
        (this.drink / this.selectedPersonTargets.drink) * 100,
        100
      );
    }
  },

  methods: mapActions("editor", ["changeSupplement", "changeWater"])
});
</script>

<style scoped lang="scss">
@use "../scss/variables" as *;
#s-supplement {
  .supplement-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;

    p {
      flex-grow: 0.4;
      text-transform: uppercase;
      font-size: 1.3rem;
    }

    button {
      margin-right: 5px;
    }
  }
}

#s-drink {
  flex-grow: 0 !important;
  .drink-content {
    display: flex;
    justify-content: center;

    .col {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      white-space: nowrap;

      button {
        margin: 5px 0;
        font-weight: 600;
      }

      button:nth-child(2) {
        padding-left: 10px;
        padding-right: 5px;
        width: auto;
        .icon {
          margin: 0 6px;
        }
      }

      &:nth-of-type(2) {
        margin: 0 20px;
        align-items: center;
        justify-content: end;
      }

      &:nth-of-type(3) {
        align-items: flex-start;
        button:nth-child(2) {
          padding-left: 5px;
          padding-right: 10px;
        }
      }

      .water-container {
        position: relative;
        width: 50px;
        flex-grow: 1;
        margin-top: 5px;
        border: 3px solid var(--accent);
        border-top: none;

        .water {
          position: absolute;
          bottom: 0;
          left: 0;
          background: $water;
          width: 100%;
          color: $bg;
          transition: 0.2s all ease-in-out;
        }

        .water-checkmark {
          color: $bg;
          z-index: 1001;
          position: absolute;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
