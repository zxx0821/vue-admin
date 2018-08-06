<template>
    <div>
      <h2>弹出框显示,表头显示顺序固定</h2>
      <fixedHeader/>
      <h2>表头显示顺序固定(优化后的方法)</h2>
      <tableHeader/>
      <h2>表头按鼠标点击的顺序添加</h2>
      <unfixedHeader/>
    </div>
</template>

<script>
  import fixedHeader from './fiixedHeader'
  import tableHeader from './tableHeader'
  import unfixedHeader from './unfixedHeader'
export default {
   name: 'index',
  components: {
    fixedHeader,
    tableHeader,
    unfixedHeader
  }
}
</script>

<style scoped>

</style>
