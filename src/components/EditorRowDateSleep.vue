<template>
  <div class="row">
    <section id="s-date">
      <h3>Date</h3>
      <h6>{{ date }}</h6>
      <button>Today</button>
      <button>Yesterday</button>
      <button>edit</button>
    </section>
    <section id="s-sleep">
      <h3>Sleep</h3>
      <div class="sleep-times">
        <div>
          <h4>start</h4>
          <h6>{{ sleep.start }}</h6>
          <button>Edit</button>
        </div>
        <div>
          <h4>end</h4>
          <h6>{{ sleep.end }}</h6>
          <button>Edit</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DateSleepRow } from "@/types/editor";

export default defineComponent({
  name: "EditorRowDateSleep",
  data(): DateSleepRow {
    return {
      date: "2003. 04. 30.",
      sleep: {
        start: "8:00",
        end: "10:00"
      }
    };
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
