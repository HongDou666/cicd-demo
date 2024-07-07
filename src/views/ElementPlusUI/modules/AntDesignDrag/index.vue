<template>
  <div>AntDesignDrag</div>

  <div class="custom_carbon_emission_target_plan_curve">
    <div class="l">
      <AntDTree></AntDTree>
    </div>
    <div class="drag r" :draggable="true">
      <AntDTable></AntDTable>
    </div>
  </div>
</template>

<script setup lang="ts" name="AntDesignDrag">
import AntDTree from './AntDTree.vue'
import AntDTable from './AntDTable.vue'
</script>

<style scoped>
.custom_carbon_emission_target_plan_curve {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}

.l,
.r {
  overflow-y: auto;
  width: 45%;
  height: 400px;
  border: 1px solid red;
}

.s {
  width: 70px;
  height: 70px;
  background: #f60;
}
</style>
