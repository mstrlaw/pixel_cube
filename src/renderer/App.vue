<template>
  <div id="app">
    <div class="status-wrapper">
      <div
        :class="connStatus"
        class="status"
      >
        <div
          v-if="isConnected"
        >
          <a
            href="#"
            v-text="isRegistering ? 'stop' : 'start'"
            @click.prevent="toggleRegistering"
          />

        </div>
        {{ connStatus }}
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'pixelscube',
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
  .status-wrapper{
    position: fixed;
    top: 15px;
    right: 15px;
    z-index: 100;
    
    .status{
      padding: 10px 15px;
      background: #EEE;
      border-radius: 4px;
      background: lightgray;

      &.idle{
        background: lightgray;
      }

      &.disconnected{
        background: gray;
      }
      &.connecting{
        background: blue;
      }
      &.connected{
        background: green;
      }
      &.error{
        background: red;
      }
    }
  }
</style>
