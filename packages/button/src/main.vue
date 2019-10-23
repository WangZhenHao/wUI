<template>
  <button
    @click="clickHandle"
    class="w-button"
    :class="[
      'w-button--' + type,
      'w-button--' + size
    ]"
  >我是按钮</button>
</template>

<script>

export default {
  name: 'wButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    clickHandle(ev) {
      this.$emit('click', ev);
    }
  }
};
</script>
