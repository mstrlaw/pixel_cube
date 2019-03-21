<template>
  <div class="nav-wrapper">
    <nav role="navigation">
      <router-link
        to="/"
        class="nav-link"
      >
        <Cube />
      </router-link>
      <router-link
        to="/stats"
        class="nav-link"
      >
        <ChartLine />
      </router-link>
      <router-link
        to="/settings"
        class="nav-link"
      >
        <Settings />
      </router-link>
    </nav>
  </div>
</template>

<script>
  import Cube from 'vue-material-design-icons/Cube.vue'
  import ChartLine from 'vue-material-design-icons/ChartLine.vue'
  import Settings from 'vue-material-design-icons/Settings.vue'

  export default {
    name: 'Navigation',
    components: {
      Cube,
      ChartLine,
      Settings
    }
  }
</script>

<style lang="scss">
  .nav-wrapper{
    position: fixed;
    top: 0;
    height: 100vh;
    background: #F6F9FC;
    border-right: 1px solid darken(#F6F9FC, 10%);

    nav{
      position: relative;
      height: auto;

      .nav-link{
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 25px;
        padding: 15px;
        color: #0E0E0E;
        background: darken(#F6F9FC, 2%);
        transition: background .2s;

        &:hover{
          background: darken(#F6F9FC, 10%);
          transition: background .2s;
        }
      }
    }

  }
</style>
