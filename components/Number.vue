<template>
  <a href="" class="number-button" :class="{ hidden : !val }" @click.prevent="$emit('click', $event.target.val)">
    {{ val }}
  </a>
</template>

<script>
  export default {
    name: 'Number',
    props: ['val']
  }
</script>

<style lang="scss">
  .number-button {
    height: 3em;
    outline: 1px solid #aaa;
    font-size: 2rem;
    background: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-weight: bold;
    transition: .2s linear;
    background: #E4C4FF;
    box-shadow: 1px 1px 3px #000;
    
    &.disabled {
      background: #F5E9FF;
      cursor: default;
    }
  }
</style>