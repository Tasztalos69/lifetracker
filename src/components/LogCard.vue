<template>
  <div class="log-card">
    <fa
      v-if="isContentManager"
      :icon="['far', 'times-circle']"
      class="btn-delete"
      @click="delCard"
    />
    <div class="date-container">
      <h2 class="date">{{ dateDisplay }}</h2>
    </div>
    <section
      class="dropdown-toggle"
      :class="{ active: day.meals.length > 0, dropped: isOpen }"
      @click="toggleDropdown"
    >
      <fa :icon="['fas', 'angle-double-down']" />
    </section>
    <section class="sleep">
      <span class="toggle-separator" />
      <h3>sleep</h3>
      <div class="sleep-flexbox">
        <div class="sleep-times">
          <p>{{ day.sleep.start || '?' }}</p>
          <p>{{ day.sleep.end || '?' }}</p>
        </div>
        <span class="bracket" v-if="day.sleep.duration" />
        <h4>{{ day.sleep.duration?.replace(':', 'h').concat('m') || '' }}</h4>
      </div>
    </section>
    <section class="food">
      <h3>food</h3>
      <p>
        {{ day.meals.length }}db
        <fa :icon="['fas', 'long-arrow-alt-right']" />
        <strong>{{ totalAmount }}</strong>
      </p>
    </section>
    <section class="supplement">
      <h3>supplement</h3>
      <p v-for="(sup, index) in supplementTypes" :key="sup.id">
        {{ sup.name }}
        <span>
          {{
            isNaN(day.supplements[index])
              ? 0 + sup.unit
              : day.supplements[index] * sup.step + sup.unit
          }}</span
        >
      </p>
    </section>
    <section class="drink">
      <h3>drink</h3>
      <p>{{ day.drink }}l</p>
    </section>
    <ul class="food-list" v-if="isOpen">
      <li v-for="(m, i) in day.meals" :key="i">
        <h4>{{ m.time }}</h4>
        <p>{{ m.foods.map(f => foodType(f.typeId).name || '?').join(', ') }}</p>
        <p>{{ m.foods.map(f => f.amount + 'g').join(', ') }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Day, SupplementType } from '@/types/firestore';
import isEmpty from 'lodash/isEmpty';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  name: 'LogCard',
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    day: {
      type: Object as () => Day,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['foodType']),
    ...mapGetters('auth', ['isContentManager']),
    supplementTypes(): SupplementType[] {
      return this.$store.getters.supplementTypes;
    },
    totalAmount(): string {
      if (isEmpty(this.day.meals)) return '0g';
      let total = 0;
      this.day.meals.forEach(m =>
        m.foods.forEach(f => (total += isNaN(f.amount) ? 0 : Number(f.amount))),
      );
      return total + 'g';
    },
    dateDisplay(): string {
      return this.day.date.replaceAll('-', '.').concat('.');
    },
  },
  methods: {
    ...mapActions(['fetchSupplementTypes', 'setModal']),
    ...mapActions('log', ['deleteDay']),
    toggleDropdown(): void {
      if (this.day.meals.length > 0) this.isOpen = !this.isOpen;
    },
    delCard(): void {
      this.setModal({
        title: `Delete ${this.dateDisplay}?`,
        description: 'This cannot be undone.',
        okBtn: 'delete',
        closeBtn: 'cancel',
        callback: () => {
          this.deleteDay(this.day.id);
        },
      });
    },
  },
  created() {
    this.fetchSupplementTypes();
  },
});
</script>

<style scoped lang="scss">
@use '../scss/variables' as *;

.log-card {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  border: 3pt solid var(--accent);
  border-radius: 10px;
  margin-bottom: 40px;
  padding: 10px 10px 20px;
  align-items: stretch;
  justify-content: space-between;
  background: $bg;
  box-shadow: 0 3px 17px 2px rgba(#000, 0.3);
  transition: 0.2s all ease-in-out;

  * {
    transition: 0.2s all ease-in-out;
  }

  .btn-delete {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 2rem;
    z-index: 10;
    cursor: pointer;
  }

  .date-container {
    position: relative;
    flex-basis: 100%;
    margin-bottom: 20px;
    margin-left: 10px;

    .date {
      position: relative;
      width: min-content;
      font-weight: 700;

      &:after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2pt;
        background: var(--accent);
      }
    }
  }

  section {
    flex-grow: 1;

    &:not(.dropdown-toggle) {
      padding: 0 20px;
      border-left: 2px dashed darken($disabled, 30%);
    }
  }

  .dropdown-toggle {
    align-self: center;
    flex-grow: 0;
    margin-left: 0;
    color: $disabled;
    padding-right: 20px;
    padding-left: 10px;

    svg {
      font-size: 3rem;
      transform: scaleY(1);
    }

    &.active {
      color: var(--accent);

      svg {
        cursor: pointer;
      }
    }

    &.dropped svg {
      transform: scaleY(-1);
    }
  }

  h3 {
    text-transform: uppercase;
    margin-bottom: 10px;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
  }

  .sleep {
    position: relative;
    border-left: none !important;

    .toggle-separator {
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      width: 2pt;
      height: 100%;
      background: var(--accent);
      border-radius: 10000px;
    }

    .sleep-flexbox {
      display: flex;
      align-items: center;

      .sleep-times {
        align-self: flex-start;
        font-weight: 300;
      }

      .bracket {
        display: block;
        width: 3rem;
        height: 3rem;
        border: 2px solid var(--accent);
        border-radius: 11px;
        clip-path: inset(0 0 0 2.3rem);
        transform: translateX(-2.4rem);
        margin-right: -2rem;
      }

      h4 {
        font-weight: 500;
        font-size: 1.2rem;
      }
    }
  }

  .food p {
    vertical-align: middle;
    font-weight: 300;

    svg {
      font-size: 1.5rem;
      margin: 0 10px;
    }

    strong {
      font-weight: 500;
    }
  }

  .supplement p {
    font-weight: 300;
    text-transform: capitalize;
    font-size: 1.1rem;

    &:not(:first-of-type) {
      line-height: 1.8rem;
    }

    span {
      font-weight: 500;
    }
  }

  .drink p {
    font-weight: 500;
  }

  .food-list {
    margin-top: 10px;
    border-top: 2px dashed darken($disabled, 30%);
    flex-basis: 100%;
    list-style: none;

    li {
      margin-top: 10px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      h4 {
        width: 20%;
        font-weight: 500;
        font-size: 1.3rem;
      }

      p {
        text-transform: capitalize;
        width: 40%;
        font-weight: 300;
        font-size: 1.2rem;
      }
    }
  }
}
</style>
