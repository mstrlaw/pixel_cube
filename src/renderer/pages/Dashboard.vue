<template>
  <div id="dashboard">
    <div class="columns">
      <div class="column left">
        <Cube :current-side="currentSide" />
      </div>
      <div class="column right">
        <TotalStats />
        <!--a
          href="#"
          @click.prevent="change"
        >Change</a-->
        <CubeConfig />
      </div>
    </div>
  </div>
</template>

<script>
  import Cube from '../components/Cube'
  import TotalStats from '../components/TotalStats'
  import CubeConfig from '../components/CubeConfig/CubeConfig'

  export default {
    name: 'Dashboard',
    components: {
      Cube,
      TotalStats,
      CubeConfig
    },
    computed: {
      counter() {
        return this.$store.getters.getState
      },
      isRegistering() {
        return this.$store.getters.isRegistering
      },
      currentSide() {
        return this.$store.getters.bodySide
      }
    },
    watch: {
      currentSide() {
        this.$store.dispatch('setBodySide', this.currentSide)
      }
    },
    methods: {
      change() {
        this.$store.dispatch('setBodySide', Math.floor(Math.random() * 6) + 1)
      }
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');

  body, html{
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
  }

  .columns{
    display: flex;
    align-items: flex-start;

    .column{
      position: relative;
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;

      &.left{
        width: 40vw;
      }
      &.right {
        width: 60vw; 
      }

      &.full {
        flex-direction: column;
        align-items: flex-start;
        max-width: 80%;
        margin: 15vh auto 0;
      }
    }
  }
</style>
