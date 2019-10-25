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
      <w-checkbox-group v-model="checkbox">
        <w-checkbox>复选框1</w-checkbox>
        <w-checkbox>复选框2</w-checkbox>
      </w-checkbox-group>

      <w-button
        @click="test"
        type="primary"
        size="small"
      >按钮</w-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      test1: false,
      test2: true,
      checkbox: []
    };
  },
  methods: {
    test() {
      console.log(this.test1, this.test2);
    }
  }
};
</script>
<style>
</style>
