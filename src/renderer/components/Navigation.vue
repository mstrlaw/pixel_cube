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
      <a 
        href="#"
        class="nav-link"
      >
        <Settings />
      </a>
    </nav>
  </div>
</template>

<script>
  import Cube from "vue-material-design-icons/Cube.vue"
  import ChartLine from "vue-material-design-icons/ChartLine.vue"
  import Settings from "vue-material-design-icons/Settings.vue"

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
    background: #CCC;

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
        background: #DEDEDE;
        border-bottom: 1px solid #CCC;

        &:hover{
          background: lighten(#DEDEDE, 5%);
        }
      }
    }

  }
</style>
