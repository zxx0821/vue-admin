<template>
    <div>

    </div>
</template>

<script>
export default {
  name: "index",
  data () {
    return {}
  },
  computed: {
    errorLog () {
      return this.$store.getters.errorLogs
    }
  }
}
</script>

<style scoped>

</style>
