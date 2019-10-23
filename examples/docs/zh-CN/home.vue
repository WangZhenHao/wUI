<template>
  <div>
    <h4>按钮</h4>

    <w-button
      @click="test"
      type="default"
    ></w-button>
    <w-button type="primary"></w-button>
    <w-button
      type="success"
      size="small"
    ></w-button>
    <w-button
      type="danger"
      size="mini"
    ></w-button>
    <w-button type="warning"></w-button>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    test() {
      alert(1);
    }
  }
};
</script>
<style>
</style>
