<template>
  <div class="milestone">
    <h3>{{ date }}</h3>
    <h2>
      {{ mst.title }}
    </h2>
    <h3 class="placeholder">{{ date }}</h3>
    <fa
      v-if="isContentManager"
      :icon="['far', 'times-circle']"
      class="btn-delete"
      @click="delCard"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Milestone } from '@/types/firestore';
import { DateTime } from 'luxon';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  name: 'LogMilestone',
  props: {
    mst: {
      type: Object as () => Milestone,
      required: true,
    },
  },
  computed: {
    ...mapGetters('auth', ['isContentManager']),
    date() {
      if (isNaN(Number(this.mst.dateStamp)))
        throw EvalError('Invalid milestone dateStamp!');
      const date = DateTime.fromMillis(Number(this.mst.dateStamp));
      return date.toFormat('yyyy.MM.dd.');
    },
  },
  methods: {
    ...mapActions(['setModal']),
    ...mapActions('log', ['deleteMilestone']),
    delCard(): void {
      this.setModal({
        title: `Delete milestone ${this.date}?`,
        description: 'This cannot be undone.',
        okBtn: 'delete',
        closeBtn: 'cancel',
        callback: () => {
          this.deleteMilestone(this.mst.id);
        },
      });
    },
  },
});
</script>

<style scoped lang="scss">
@use '../scss/variables' as *;

.milestone {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  width: calc(100% - 7.5px);
  border: 3pt solid var(--accent);
  border-radius: 10px;
  margin-bottom: 40px;
  padding: 15px;
  align-items: center;
  justify-content: space-between;
  background: var(--accent);
  box-shadow: 0 3px 17px 2px rgba(#000, 0.3);
  transition: 0.2s all ease-in-out;
  color: $bg;

  h3 {
    position: relative;
    width: min-content;
    font-weight: 700;

    &.placeholder {
      color: var(--accent);
    }

    &:not(.placeholder):after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: $bg;
    }
  }

  h2 {
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 2px;
  }

  .btn-delete {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 2rem;
    z-index: 10;
    cursor: pointer;
  }
}
</style>
