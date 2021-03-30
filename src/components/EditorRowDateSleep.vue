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
      date: "",
      sleep: {
        start: "",
        end: ""
      }
    };
  }
});
</script>

<style scoped></style>
