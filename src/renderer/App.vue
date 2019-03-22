<template>
  <div id="app">
    <div
      :class="connStatus"
      class="status-wrapper"
    >
      <div
        v-if="isConnected"
      >
        <a
          href="#"
          v-text="isRegistering ? 'Stop tracking' : 'Start tracking'"
          class="register-cta"
          @click.prevent="toggleRegistering"
        />

      </div>
      <div class="status">
        <div
          v-if="!isConnected && !hasError"
          class="loader"
        ><span>loading</span></div>
        <Alert v-else-if="hasError" />
        <Check v-else />
        <span class="label">{{ connStatus }}</span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Check from 'vue-material-design-icons/Check.vue'
  import Alert from 'vue-material-design-icons/Alert.vue'

  export default {
    name: 'PixelCube',
    components: {
      Check,
      Alert
    },
    mounted() {
      this.$store.dispatch('setConnStatus', 'idle')
      this.$store.dispatch('setRegistering', false)
    },
    computed: {
      isRegistering() {
        return this.$store.getters.isRegistering
      },
      connStatus() {
        return this.$store.getters.connStatus
      },
      isConnected() {
        return this.connStatus === 'connected'
      },
      hasError() {
        return this.connStatus === 'error'
      }
    },
    methods: {
      toggleRegistering() {
        this.$store.dispatch('toggleRegistering')
      }
    }
  }
</script>

<style lang="scss">
  $green: #4CAF50;
  $red: #F44336;
  $yellow: #FDCF1A;
  $gray: #607D8B;
  $gray-light: #B0BEC5;
  $gray-lightest: #ECEFF1;

  .status-wrapper{
    position: fixed;
    display: flex;
    align-items: center;
    top: 15px;
    right: 15px;
    transform: translateX(0);
    z-index: 100;
    transition: transform .5s;

    .register-cta{
      margin-right: 15px;
    }

    &.idle{
      .loader {
        display: none;
      }
    }

    &.disconnected{
      .loader{
        border-left-color: $gray-light;
        border-bottom-color: $gray-light;
      }
    }
    &.connecting{
      .loader{
        border-left-color: $yellow;
        border-bottom-color: $yellow;
      }
    }
    &.connected{
      .loader {
        display: none;
      }
      transform: translateX(150px);
      transition: transform .5s;
      transition-delay: 1s;
    }
    &.error{
      transform: translateX(150px);
      transition: transform .5s;
      transition-delay: 1s;
      background: $red;
      .material-design-icon{
        line-height: 0;
        &.check-alert{
          color: $red;
        }
      }
    }
    
    .status{
      display: flex;
      align-items: center;
      padding: 10px 15px;
      background: #EEE;
      background: $gray-lightest;
      max-width: 110px;
      border-radius: 4px;

      .material-design-icon{
        line-height: 0;
        &.check-icon{
          color: $green;
        }
      }

    }
  }

  .loader {
    margin-right: 10px;
    color: transparent;
    display: block;
    border: 2px solid #dbdbdb;
    border-radius: 290486px;
    border-right-color: transparent;
    border-top-color: transparent;
    content: "";
    height: 1em;
    position: relative;
    width: 1em;
    animation: spinAround 500ms infinite linear;
    -webkit-animation: spinAround 500ms infinite linear;
  }

  @-webkit-keyframes spinAround {
    from {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(359deg);
              transform: rotate(359deg);
    }
  }
  @keyframes spinAround {
    from {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(359deg);
              transform: rotate(359deg);
    }
  }
</style>
