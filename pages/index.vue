<template>
  <div class="d-grid grid-center">
    <div class="wrapper">
      <p class="h1 mb-5 text-center">Поиграем в пятнашки?)</p> 
      <fifteen class="m-auto"/>
    </div>
  </div>
</template>

<script>
  import Fifteen from '~/components/Fifteen'

  export default {
    name: 'Index',
    components: {
      Fifteen
    }
  }
</script>

<style lang="scss">
  .wrapper {
    background: #E1BF9B;
    border-radius: 30px;
    padding: 50px;
    padding-top: 40px;
    color: #fff;
  }
</style>