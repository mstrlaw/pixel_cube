<template>
  <div
    :class="connStatus"
    class="status-wrapper"
  >
    <div
      v-if="isConnected"
    >
      <div
        class="toggle-wrapper"
        v-tooltip="{
          content: `<small>${ isRegistering ? 'Click to stop registering' : 'Click to start registering your time' }</small>`, 
          placement: 'left',
          html: true,
        }"
      >
        <input
          :checked="isRegistering ? true : false"
          class="toggle toggle-light"
          id="cb1"
          type="checkbox"
          @change="toggleRegistering"
        />
        <label
          class="toggle-btn"
          for="cb1"
        />
      </div>
    </div>
    <div class="status">
      <div
        v-if="!isConnected && !hasError"
        class="loader"
      ><span>loading</span></div>
      <Alert v-else-if="hasError" />
      <Check v-else />
      <span class="label">
        {{ connStatus }}
        <router-link
          v-if="hasError"
          to="settings"
          >
            View Settings
          </router-link>
      </span>
    </div>
  </div>  
</template>

<script>
  import Check from 'vue-material-design-icons/Check.vue'
  import Alert from 'vue-material-design-icons/Alert.vue'

  export default {
    name: 'ConnectionController',
    components: {
      Check,
      Alert
    },
    created() {
      this.$store.dispatch('setConnStatus', 'idle')
      this.$store.dispatch('setRegistering', false)
      this.$store.dispatch('setBodySide', 0)
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
      },
    }
  }
</script>
