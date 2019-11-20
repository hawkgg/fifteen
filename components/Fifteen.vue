<template>
  <div class="fifteen-wrap">
    <div class="mb-4 d-flex align-items-center justify-content-center">
      <p class="stepsCount">Ходов: {{ stepsCount }}</p>
      <span class="timer">Время:&nbsp;<timer class="font-weight-bold"/></span>
      <button @click="restart" class="reset-button">Начать заново</button>
    </div>
    <transition-group class="fifteen" name="list" tag="div">
      <number @click="updateState(index)" v-for="(val, index) in state" :val="val" :key="val" :class="{ disabled: completed || !isPossible(emptyIndex, index) }"/>
    </transition-group>
    <p v-if="completed" class="text-center h3 mt-3">Вы выиграли!!</p>
  </div>
</template>

<script>
  import Number from './Number';
  import Timer from './Timer';
  import { mapState, mapActions } from 'vuex';

  const FIFTEEN = Array.from({length: 15}, (el, index) => index + 1);
  FIFTEEN.push(false);

  export default {
    name: 'Fifteen',
    components: {
      Timer,
      Number
    },
    data: function() {
      return {
        state: [],
        stepsCount: 0
      }
    },
    computed: {
      ...mapState([
        'time'
      ]),
      emptyIndex: function() {
        return this.state.indexOf(false)
      },
      completed: function() {
        return this.arraysEqual(FIFTEEN, this.state)
      },
      solvable: function() {
        let kDisorder = 0
        for (let i = 1; i < this.state.length - 1; i++) {
          for (let j = 0; j < i - 1; j++) {
            if (this.state[j] > this.state[i]) {
              kDisorder++
            }
          }
        }
        return !(kDisorder % 2)
      }
    },
    mounted() {
      this.state = [...FIFTEEN]
      
      for (let i = this.state.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [this.state[i], this.state[j]] = [this.state[j], this.state[i]]
      }
      if (!this.solvable) {
        this.shuffleState()
      }
    },
    methods: {
      ...mapActions('timer', ['reset']),
      shuffleState() {
        this.state.sort(() => Math.random() - 0.5)

        if (!this.solvable) {
          this.shuffleState()
        }
      },
      arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false

        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) return false
        }

        return true
      },
      updateState(index) {
        if (this.completed || !this.isPossible(this.emptyIndex, index)) return
        const updated = [...this.state]
        updated[this.state.indexOf(false)] = this.state[index]
        updated[index] = false
        this.state = updated
        this.stepsCount++
      },
      isPossible(emptyIndex, index) {
        return (emptyIndex % 4 !== 0 && emptyIndex - 1 === index) ||
               (emptyIndex % 4 !== 3 && emptyIndex + 1 === index) ||
                emptyIndex - 4 === index ||
                emptyIndex + 4 === index
      },
      restart() {
        this.shuffleState()
        this.stepsCount = 0
        this.reset()
      }
    },
  }
</script>

<style lang="scss">
  .fifteen-wrap {
    width: 25em;

    .fifteen {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 1px;
      border: 1px solid #aaa;
      background: #F5E9FF;
      box-shadow: inset 0 0 6px #333;
      overflow: hidden;
    }
    .timer {
      display: flex;
      align-items: center;
    }
    .stepsCount, .timer {
      background: #c4a483;
      padding: .4rem;
      border-radius: 5px;
    }
    .timer, .reset-button {
      margin-left: .5rem;   
    }
    .reset-button {
      box-shadow: none;
      cursor: pointer;
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: .5rem;
      background: #FF8B8B;
    }
  }
  .list-move {
    transition: transform 0.2s ease;
  }
</style>