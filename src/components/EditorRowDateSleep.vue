<template>
  <div class="row">
    <section id="s-date">
      <h3>Date</h3>
      <h6>{{ dateDisplay }}</h6>
      <button @click="setToday">
        Today
      </button>
      <button @click="setYesterday">
        Yesterday
      </button>
      <button
        @click="
          init({
            placeholder: '2000.01.01.',
            delimiter: '.',
            delimiterCount: 3,
            ref: ['date'],
            maxLength: 11,
            value: dateDisplay
          })
        "
      >
        edit
      </button>
    </section>
    <section id="s-sleep">
      <h3>Sleep</h3>
      <div class="sleep-times">
        <div>
          <h4>start</h4>
          <h6>{{ sleep.start }}</h6>
          <button
            @click="
              init({
                placeholder: '08:00',
                delimiter: ':',
                delimiterCount: 1,
                ref: ['sleep', 'start'],
                maxLength: 5,
                value: sleep.start
              })
            "
          >
            Edit
          </button>
        </div>
        <div>
          <h4>end</h4>
          <h6>{{ sleep.end }}</h6>
          <button
            @click="
              init({
                placeholder: '08:00',
                delimiter: ':',
                delimiterCount: 1,
                ref: ['sleep', 'end'],
                maxLength: 5,
                value: sleep.end
              })
            "
          >
            Edit
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import isEmpty from "lodash/isEmpty";
import { DateTime } from "luxon";

export default defineComponent({
  name: "EditorRowDateSleep",
  computed: {
    ...mapGetters("editor", ["date", "sleep"]),
    ...mapGetters("keypad", ["ref"]),
    dateDisplay(): string {
      if (!this.date || isEmpty(this.date)) return "";
      return this.date.replaceAll("-", ".").concat(".");
    }
  },
  methods: {
    ...mapMutations({ init: "keypad/init", discard: "keypad/discard" }),
    ...mapActions({ setDate: "editor/setDate" }),
    isEmpty,
    setToday() {
      if (this.ref[0] === "date") this.discard();
      this.setDate(DateTime.now().toISODate());
    },
    setYesterday() {
      if (this.ref[0] === "date") this.discard();
      this.setDate(
        DateTime.now()
          .minus({ days: 1 })
          .toISODate()
      );
    }
  }
});
</script>

<style scoped lang="scss">
#s-date {
  h6 {
    margin-top: calc(1.2rem + 10px + 1.2rem + 5px);
    margin-bottom: 20px;
  }

  button {
    margin: 0 20px;

    &:first-of-type {
      margin-left: 0;
    }
  }
}

#s-sleep {
  .sleep-times {
    display: flex;

    h4 {
      margin-bottom: 10px;
    }

    h6 {
      margin-bottom: 20px;
    }

    div:first-child {
      margin-right: 100px;
    }
  }
}
</style>
