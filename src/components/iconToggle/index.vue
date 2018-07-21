<template>
  <div class="Icontools" @click="toggleClick" :class="{'is-active':isActive}">
    <i class="fa" :class="IconclassName"></i>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    },
    IconclassName: {
      type: String,
      default: 'fa-home'
    }
  }
}
</script>

<style scoped>
  .Icontools {
    display: inline-block;
    cursor: pointer;
    width:20px;
    height:20px;
    transform: rotate(90deg);
    transition: .4s;
    transform-origin: 50% 50%;
  }
  .Icontools.is-active {
    transform: rotate(0deg);
  }
</style>
