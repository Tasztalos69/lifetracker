<template>
  <PageHeader is-subpage title="see" title-icon="far/eye" />
  <div id="see">
    <div id="day-filter">
      <div class="filter-heading">
        <h2>
          Date filters
        </h2>
        <button
          @click="clearRange"
          v-if="range.start && range.end"
          class="btn-clear"
        >
          <fa :icon="['far', 'times-circle']" />
          Clear
        </button>
      </div>
      <span class="separator" />
      <button class="hollow filter" @click="setMonth(0)">This month</button>
      <button class="hollow filter" @click="setMonth(-1)">
        Previous month
      </button>
      <v-date-picker
        is-range
        ref="calendar"
        color="gray"
        :first-day-of-week="2"
        :attributes="attrs"
        :model-config="modelConfig"
        v-model="range"
      />

      <span class="separator" />
      <h2>Milestones</h2>
      <button v-if="isContentManager" class="hollow">
        <fa :icon="['fas', 'plus']" />Add milestone
      </button>
    </div>
    <div id="day-list">
      <transition-group name="fade2ms">
        <p v-if="days.length === 0">No data for selected range 😔</p>
        <LogCard v-for="day in days" :day="day" :key="day.id" />
        <button
          @click="fetchDays()"
          :key="'btn'"
          v-if="!isListEnd && !range.start && !range.end"
          class="btn-load hollow"
        >
          <fa :icon="['fas', 'angle-double-down']" />
          <span>Load more</span>
        </button>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageHeader from '@/components/PageHeader.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { Day } from '@/types/firestore';
import LogCard from '@/components/LogCard.vue';

interface Data {
  range: {
    start: number | undefined;
    end: number | undefined;
  };
  [key: string]: any;
}

export default defineComponent({
  name: 'See',
  components: { LogCard, PageHeader },
  data(): Data {
    return {
      range: {
        start: undefined,
        end: undefined,
      },
      attrs: [
        {
          key: 'today',
          bar: 'gray',
          dates: new Date(),
        },
      ],
      modelConfig: {
        type: 'number',
      },
    };
  },
  computed: {
    ...mapGetters(['log/days']),
    ...mapGetters('log', ['isListEnd']),
    ...mapGetters('auth', ['isContentManager']),
    days(): Day[] {
      return (this['log/days'] as unknown) as Day[];
    },
  },
  methods: {
    ...mapActions('log', ['fetchDays', 'fetchRangeDays']),
    ...mapActions(['fetchFoodCategoriesAndTypes']),
    ...mapMutations('log', ['purgeDays']),
    setMonth(monthPrefix: number): void {
      const date = new Date();
      const firstDay = new Date(
        date.getFullYear(),
        date.getMonth() + monthPrefix,
        1,
      );
      const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + monthPrefix + 1,
        0,
      ).getTime();
      this.range = { start: firstDay.getTime(), end: lastDay };
      (this.$refs.calendar as any).move(firstDay);
    },
    clearRange(): void {
      this.range = {
        start: undefined,
        end: undefined,
      };
    },
  },
  watch: {
    range: {
      handler() {
        if (this.range.start && this.range.end) {
          this.fetchRangeDays(this.range);
        } else {
          this.fetchDays(true);
        }
      },
      deep: true,
    },
  },
  created() {
    this.purgeDays();
    this.fetchDays();
    this.fetchFoodCategoriesAndTypes();
  },
});
</script>

<style scoped lang="scss">
@use '../scss/variables' as *;

.hollow {
  color: var(--accent);
  background: $bg;
  border: 3px solid var(--accent);
}

#see {
  display: flex;
  position: relative;
  width: 95%;
  margin-left: 2.5%;
  margin-top: 100px;

  #day-filter {
    width: 25%;
    margin-right: 5%;

    h2 {
      font-size: 2rem;
    }

    .filter-heading {
      display: flex;
      align-items: center;

      .btn-clear {
        margin: 5px 0 0 10px;
        padding: 3px 8px;
        color: var(--accent);
        background: $bg;
        border: 2px solid var(--accent);
        border-radius: 1000px;
        font-weight: 700;
        font-size: 0.8rem;
        letter-spacing: -0.5px;
      }
    }

    button.filter {
      margin: 5px;
    }

    .vc-container {
      margin-top: 10px;
    }

    .separator {
      display: block;
      width: 100%;
      height: 4px;
      margin: 10px 0;
      background: var(--accent);
      border-radius: 1000px;
    }
  }

  #day-list {
    width: 65%;

    p {
      text-align: center;
      font-weight: 500;
      color: $disabled;
    }

    .btn-load {
      margin-left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;

      svg {
        margin-right: 5px;
        font-size: 1rem;
      }

      span {
        font-size: 0.9rem;
      }
    }
  }
}
</style>
