<template>
  <div>
    <div>
      <h4>按钮</h4>

      <w-button
        @click="test"
        type="default"
      >按钮</w-button>
      <w-button type="primary">按钮</w-button>
      <w-button
        type="success"
        size="small"
      >按钮</w-button>
      <w-button
        type="danger"
        size="mini"
      >按钮</w-button>
      <w-button type="warning">按钮</w-button>
    </div>

    <div>
      <h4>多选框</h4>
      <w-checkbox></w-checkbox>
    </div>
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
