<template>
  <label
    class="w-checkbox"
    :class="{'is-checked': isChecked}"
  >
    {{isGroup}}
    <span
      class="w-checkbox__input"
      :class="{'is-checked': isChecked}"
    >
      <span class="w-checkbox__inner"></span>
      <input
        class="w-checkbox__original"
        type="checkbox"
        v-model="model"
        @change="changeHandel"
      >
    </span>
    <span class="w-checkbox__label">
      <slot></slot>

      <!-- <template v-if="!slots.default">{{label}}</template> -->
    </span>
  </label>
</template>

<script>
import Emitter from 'main/mixins/emitter.js';

export default {
  name: 'wCheckbox',
  componentName: 'wCheckbox',
  mixins: [Emitter],
  props: {
    value: {
      type: Boolean
    },
    label: {}
  },
  data() {
    return {
      selfModel: false,
      model: false
    };
  },
  computed: {
    // model: {
    //   get() {
    //     return this.value !== undefined ? this.value : this.selfModel;
    //   },
    //   set(val) {
    //     this.selfModel = val;
    //   }
    // },
    isChecked() {
      return this.model;
    },
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'wCheckboxGroup') {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    }
  },
  mounted() {
    this.model = this.value;
  },
  methods: {
    changeHandel(ev) {
      let value = ev.target.checked;
      this.model = value;
      this.$emit('input', value, ev);
    }

  }
};
</script>
