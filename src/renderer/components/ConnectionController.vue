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
        <a
          v-if="hasError"
          href="#"
          @click.prevent="attemptReconnect"
        >Retry</a>
        <!--router-link
          v-if="hasError"
          to="settings"
          >
            View Settings
          </router-link-->
      </span>
    </div>
  </div>  
</template>

<script>
  import Check from 'vue-material-design-icons/Check.vue'
  import Alert from 'vue-material-design-icons/Alert.vue'

  import bluetooth from 'node-bluetooth'

  export default {
    name: 'ConnectionController',
    components: {
      Check,
      Alert
    },
    data() {
      return {
        device: null,
        interval: null,
        localConnection: null,
        localCurrentSide: 0
      }
    },
    created() {
      this.$store.dispatch('setConnStatus', 'idle')
      this.$store.dispatch('setRegistering', false)
      this.$store.dispatch('setBodySide', 0)

      this.device = new bluetooth.DeviceINQ()
      this.$store.dispatch('setBluetoothDevice', this.device)
      
      setTimeout( () => {
        this.findCube()
      }, 1000)

    },
    computed: {
      isRegistering() {
        return this.$store.getters.isRegistering
      },
      connStatus() {
        return this.$store.getters.connStatus
      },
      bluetoothName() {
        return this.$store.getters.bluetoothName
      },
      isConnected() {
        return this.connStatus === 'connected'
      },
      hasError() {
        return this.connStatus === 'error'
      }
    },
    watch: {
      isRegistering() {
        if (this.isRegistering) {
          this.interval = setInterval( () => {
            
            //  We ask the cube for it's current side each 500ms. We also update the side each
            this.localConnection.write(new Buffer('s', 'utf-8'), (data, buffer) => {})
            
            this.$store.dispatch('increaseSideTime', this.localCurrentSide)

          }, 500)
        } else {
          clearInterval(this.interval)
        }
      }
    },
    methods: {
      toggleRegistering() {
        this.$store.dispatch('toggleRegistering')
      },
      attemptReconnect() {
        this.device = new bluetooth.DeviceINQ()
        this.$store.dispatch('setBluetoothDevice', this.device)
        this.$store.dispatch('setConnStatus', 'idle')
        this.findCube()
      },
      findCube () {
        this.device.listPairedDevices((devices) => {
          if (devices.length > 0) {
            
            devices.map( dev => {
              if (dev.name === this.bluetoothName) {
                this.connectBluetooth(dev)
              }
            })

          }
        })
      },
      connectBluetooth(dev) {
        this.$store.dispatch('setConnStatus', 'connecting')

        bluetooth
          .connect(dev.address, dev.services[0].channel, (err, connection) => {
            if(err){
              this.$store.dispatch('setConnStatus', 'error')
              console.error(err)
              console.error(err.message)
            } else {

              this.localConnection = connection

              this.$store.dispatch('setConnStatus', 'connected')

              //  Notify cube that we connected
              connection.write(new Buffer('k', 'utf-8'), (data, buffer) => {
                console.log('[CONN]: updated cube state')
              })

              //  Get current cube state to update our UX
              connection.write(new Buffer('s', 'utf-8'), (data, buffer) => {
                console.log('[CONN]: requested cube side')
              })

              //  Process incoming data from cube
              connection.on('data', this.updateActiveSide)

            }
          })
      },
      updateActiveSide(buffer) {
        let receivedSide = buffer.toString().trim()

        if (receivedSide.length > 0) {
          this.localCurrentSide = parseInt(receivedSide)
          this.$store.dispatch('setBodySide', this.localCurrentSide)
        }
      }
    }
  }
</script>
