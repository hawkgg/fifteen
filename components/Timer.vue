<template>
    <span>{{ getTime }}</span>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'Timer',
    
    computed: {
      ...mapState('timer', ['time']),

      getTime () {
        let time = this.time / 60
        let minutes = parseInt(time)
        let secondes = Math.round((time - minutes) * 60)

        return minutes.toString().padStart(2, 0) + ":" + secondes.toString().padStart(2, 0)
      }
    },

    methods: {
      ...mapActions('timer', ['start'])
    },

    mounted() {
      this.start()
    }
  }
</script>