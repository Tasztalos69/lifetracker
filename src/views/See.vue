<template>
  <PageHeader is-subpage title="see" title-icon="far/eye" />
  <div id="see">
    <div id="day-filter">
      <div class="filter-heading">
        <h2>
          Date filters
        </h2>
        <transition name="fade2ms">
          <button
            @click="clearRange"
            v-if="range.start && range.end"
            class="btn-clear"
          >
            <fa :icon="['far', 'times-circle']" />
            Clear
          </button>
        </transition>
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
      <h2>Add Milestone</h2>
      <div class="milestone-editor" v-if="isContentManager">
        <form v-if="newMst.showForm" @submit.prevent="addMst">
          <label for="mst-date">Date</label>
          <input
            type="text"
            id="mst-date"
            v-model="newMst.date"
            placeholder="2020.01.01."
          />
          <label for="mst-title">Title</label>
          <input
            type="text"
            id="mst-title"
            v-model="newMst.title"
            placeholder="achieved supremacy"
          />
          <button type="submit">
            <fa :icon="['fas', 'check']" />
          </button>
        </form>
        <button
          v-else
          class="hollow add-milestone"
          @click="newMst.showForm = true"
        >
          <fa :icon="['fas', 'plus']" />Add milestone
        </button>
      </div>
    </div>
    <div id="day-list">
      <transition-group name="fade2ms">
        <p v-if="compoundData.length === 0">No data for selected range 😔</p>
        <div class="list-item" v-for="c in compoundData" :key="c.id">
          <LogCard v-if="c.type === 'day'" :day="c" />
          <LogMilestone v-else-if="c.type === 'milestone'" :mst="c" />
        </div>
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
import LogCard from '@/components/LogCard.vue';
import { CompoundLogData, PopupType } from '@/types/state';
import LogMilestone from '@/components/LogMilestone.vue';
import { DateTime } from 'luxon';
import isEmpty from 'lodash/isEmpty';

interface Data {
  range: {
    start: number | undefined;
    end: number | undefined;
  };
  newMst: {
    showForm: boolean;
    date: string;
    title: string;
  };
  [key: string]: any;
}

const inputDateToIsoString = (date: string): string => {
  return date.replaceAll('.', '-').replace(new RegExp('-' + '+$'), '');
};

const validateDate = (date: string): boolean => {
  const datePattern = /^(19|20)\d\d[.](0[1-9]|1[012])[.](0[1-9]|[12][0-9]|3[01])[.]$/;
  if (!datePattern.test(date)) return false;
  const dt = DateTime.fromISO(inputDateToIsoString(date));
  return dt.isValid;
};

export default defineComponent({
  name: 'See',
  components: { LogMilestone, LogCard, PageHeader },
  data(): Data {
    return {
      range: {
        start: undefined,
        end: undefined,
      },
      newMst: {
        showForm: false,
        date: '',
        title: '',
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
    ...mapGetters(['log/compound']),
    ...mapGetters('log', ['isListEnd']),
    ...mapGetters('auth', ['isContentManager']),
    compoundData(): CompoundLogData[] {
      return this['log/compound'];
    },
  },
  methods: {
    ...mapActions('log', ['fetchDays', 'fetchRangeDays', 'addMilestone']),
    ...mapActions(['fetchFoodCategoriesAndTypes', 'addPopup']),
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
    async addMst(): Promise<any> {
      const { date, title } = this.newMst;
      console.log(date, title);
      if (isEmpty(date) || isEmpty(title))
        return this.addPopup({
          text: 'Fields should not be empty.',
          type: PopupType.ERROR,
        });
      if (!validateDate(date))
        return this.addPopup({
          text: 'Invalid date!',
          type: PopupType.ERROR,
        });
      await this.addMilestone({
        title,
        dateStamp: DateTime.fromISO(inputDateToIsoString(date)).toMillis(),
      });
      this.newMst.date = '';
      this.newMst.title = '';
      this.newMst.showForm = false;
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

    .milestone-editor {
      form {
        label {
          display: block;
          font-weight: 700;
          margin-top: 20px;
          font-size: 1.1rem;
        }

        input {
          margin-top: 5px;
          display: block;
          border: none;
          border-bottom: 3px solid var(--accent);
          font-size: 1.1rem;
          background: none;

          &:last-of-type {
            display: inline;
          }
        }

        button {
          margin: 0 0 0 20px;
          padding: 0;
          background: none;
          border: none;
          color: var(--accent);
          font-size: 1.4rem;
        }
      }

      .add-milestone {
        margin-top: 10px;
      }
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
