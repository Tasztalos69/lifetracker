<template>
  <div id="keypad-wrapper">
    <div id="keypad">
      <div class="display" v-cloak>
        <transition name="fade3ms">
          <h3 v-if="keypad.error">
            <fa :icon="['fas', 'exclamation-triangle']" />{{ keypad.error }}
          </h3>
        </transition>
        <input
          v-focus
          v-if="!isMobile"
          v-model="keypad.value"
          :maxlength="keypad.maxLength"
          :placeholder="keypad.placeholder"
          @keypress.enter="$store.dispatch('editor/save')"
        />
        <div class="value-display" v-else>
          <h2 v-if="showValue">{{ keypad.value }}</h2>
          <p v-else>{{ keypad.placeholder }}</p>
        </div>
        <fa :icon="['fas', 'backspace']" @click="delOne" />
      </div>
      <button class="n7">7</button>
      <button class="n9">9</button>
      <button class="n8">8</button>
      <button class="n4">4</button>
      <button class="n5">5</button>
      <button class="n6">6</button>
      <button class="n1">1</button>
      <button class="n2">2</button>
      <button class="n3">3</button>
      <button class="n0">0</button>
      <button class="delimiter">{{ keypad.delimiter }}</button>
      <button class="save" @click="$store.dispatch('editor/save')">
        <fa :icon="['fas', 'check']" />
      </button>
    </div>
    <div class="current-display">
      <h3>Editing</h3>
      <p>
        {{
          keypad.ref
            .map(r => (isNaN(+r) ? camelCaseToSentenceCase(r) : r + 1))
            .join('/')
        }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import isEmpty from 'lodash/isEmpty';
import camelCaseToSentenceCase from '@/utils/camelCaseToSentenceCase';
import isMobile from '@/utils/isMobile';

export default defineComponent({
  name: 'EditorKeypad',
  computed: {
    ...mapGetters('keypad', {
      keypad: 'all',
    }),
    isMobile,
    showValue(): boolean {
      return !isEmpty(this.keypad.value);
    },
  },
  methods: {
    ...mapMutations({ add: 'keypad/add' }),
    camelCaseToSentenceCase,
    delOne() {
      this.keypad.value = this.keypad.value.slice(0, -1);
    },
  },
  directives: {
    focus: {
      mounted: function(el) {
        el.focus();
      },
    },
  },
  mounted() {
    // Assign grid areas to elements in keypad
    const keypad = document.querySelector('#keypad');
    if (!keypad) return;
    const keys = (keypad.childNodes as unknown) as HTMLDivElement[];
    keys.forEach(key => {
      const HTMLKey: HTMLDivElement = key;
      HTMLKey.style.gridArea = HTMLKey.classList[0];
      const classList = [...HTMLKey.classList];
      const banned = ['display', 'save'];
      if (classList.some(c => banned.includes(c))) return;

      HTMLKey.addEventListener('click', () => {
        if (
          classList.includes('delimiter') &&
          (
            this.keypad.value.match(new RegExp(this.keypad.delimiter, 'g')) ||
            []
          ).length === this.keypad.delimiterCount
        )
          return;
        if (this.keypad.value.length >= this.keypad.maxLength) return;
        this.add(HTMLKey.textContent);
      });
    });
  },
});
</script>

<style scoped lang="scss">
@use '../scss/variables' as *;

#keypad-wrapper {
  display: flex;

  &.keypad-enter-active,
  &.keypad-leave-active {
    transition: all 0.3s ease-in-out;
  }

  &.keypad-enter-from,
  &.keypad-leave-to {
    top: 200px;
    opacity: 0;
  }
}

#keypad {
  position: relative;
  width: 280px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 20px 20px;
  grid-template-areas:
    'display display display'
    'n7 n8 n9'
    'n4 n5 n6'
    'n1 n2 n3'
    'n0 delimiter save';
  border: 5px solid var(--accent);
  padding: 20px;
  border-radius: 30px;
  background: $bg;

  .display {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 3rem;
    }

    p {
      font-size: 2.5rem;
      font-style: italic;
    }

    input {
      font-weight: 600;
      border: none;
      font-size: 2.5rem;
      width: 80%;

      &::placeholder {
        font-weight: 300;
        font-style: italic;
      }
    }

    h3 {
      position: absolute;
      top: 15px;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      color: lighten($err, 10%);

      svg {
        margin-right: 10px;
      }
    }
  }

  button {
    height: 80px;
    width: 80px;
    font-family: 'Roboto', sans-serif;
    border-radius: 20px;
    background: $bg;
    border: 4px solid var(--accent);
    color: var(--accent);
    font-weight: 700;
    font-size: 1.5rem;
  }

  .save {
    background: var(--accent);
    color: $bg;
  }
}

.current-display {
  margin-top: 30px;
  margin-left: 15px;

  h3 {
    text-transform: uppercase;
    font-size: 1.5rem;
  }

  p {
    font-size: 1.1rem;
    text-transform: uppercase;
    white-space: nowrap;
  }
}
</style>
