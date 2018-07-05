<template>
    <div class="model-content">

    </div>
</template>

<script>
    export default {
        name: "model",
      props: {
        className: {
          type: String,
          default: 'model'
        },
        id: {
          type: String,
          default: 'model'
        },
        width: {
          type: String,
          default: '200px'
        },
        height: {
          type: String,
          default: '200px'
        }
      },
    }
</script>

<style scoped>

</style>
