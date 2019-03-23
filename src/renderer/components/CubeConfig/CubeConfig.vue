<template>
  <div class="config-wrapper">
    <div class="header">
      <h3 class="headline">Cube setup</h3>
      <HelpCircleOutline
        v-tooltip="{
          content: `<div><p><small>Here you can setup what each side of the cube means to you: a project, a task, a client, etc.<br><br>To change a name, simply type in what you want.<br>You can also define whether or not a cube's side should be considered productive or unproductive time.</small></p></div>`, 
          placement: 'top',
          html: true,
        }"
      />
    </div>
    <CubeConfigRow
      v-for="side in cubeConfig"
      :key="side.id"
      :data="side"
      :active-side="currentSide"
    />
  </div>  
</template>

<script>
  import HelpCircleOutline from 'vue-material-design-icons/HelpCircleOutline.vue'
  import CubeConfigRow from './CubeConfigRow'

  export default {
    name: 'CubeConfig',
    components: {
      CubeConfigRow,
      HelpCircleOutline
    },
    computed: {
      currentSide() {
        return this.$store.getters.bodySide
      },
      cubeConfig() {
        return this.$store.getters.cubeConfig
      },
    }
  }
</script>

<style lang="scss">
  $gray:          #607D8B;
  $gray-light:    #B0BEC5;
  $gray-lightest: #ECEFF1;

  .config-wrapper{
    display: block;
    width: 70%;
    margin: 0 auto;

    .header{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 10px;

      > * {
        color: #607D8B;
      }

      .headline{
        margin: 0 5px 0 0;
      }
    }

  }
</style>
