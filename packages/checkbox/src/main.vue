<template>
  <label
    class="w-checkbox"
    :class="{'is-checked': isChecked}"
  >
    <span
      class="w-checkbox__input"
      :class="{'is-checked': isChecked}"
    >
      <span class="w-checkbox__inner"></span>
      <input
        class="w-checkbox__original"
        type="checkbox"
        v-model="model"
        :value="label"
        @change="changeHandel"
      >
    </span>
    <span class="w-checkbox__label">
      <slot></slot>
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
      selfModel: false
    };
  },
  computed: {
    // 这个model其实就是相当于group的v-model是 一个数组类型的数据
    model: {
      get() {
        return this.isGroup ? this.store : this.value;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('wCheckboxGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
        }
      }
    },
    isChecked() {
      if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
        // eslint-disabled
      } else if (Object.prototype.toString.call(this.model) === '[object Boolean]') {
        return this.model;
      }
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
    },
    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    }
  },
  mounted() {

  },
  methods: {
    changeHandel(ev) {
      this.$emit('change', ev.target.checked, ev);
      if (this.isGroup) {
        this.dispatch('wCheckboxGroup', 'change', [this._checkboxGroup.value]);
      }
    }

  }
};
</script>
