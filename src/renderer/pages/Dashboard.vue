<template>
  <div id="dashboard">
    <div class="columns">
      <div class="column left">
        <Cube :current-side="currentSide" />
      </div>
      <div class="column right">
        <!--a
          href="#"
          @click.prevent="change"
        >Change</a-->
        <div class="config-wrapper">
          <CubeConfigRow
            v-for="side in cubeConfig"
            :key="side.id"
            :data="side"
            :active-side="currentSide"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Cube from '../components/Cube'
  import CubeConfigRow from '../components/CubeConfigRow'
  import bluetooth from 'node-bluetooth'

  export default {
    name: 'Dashboard',
    components: {
      Cube,
      CubeConfigRow
    },
    data() {
      return {
        device: null,
        interval: null,
        currentSide: 1,
        localConnection: null
      }
    },
    created() {
      console.log('created!')
      this.device = new bluetooth.DeviceINQ()
      setTimeout( () => {
        this.open()
      }, 1000)
    },
    computed: {
      cubeConfig() {
        return this.$store.getters.cubeConfig
      },
      counter() {
        return this.$store.getters.getState
      },
      isRegistering() {
        return this.$store.getters.isRegistering
      },
    },
    watch: {
      isRegistering() {
        if (this.isRegistering) {
          this.interval = setInterval( () => {
            this.$store.dispatch('increaseSideTime', this.currentSide)
            // console.log(this.currentSide)
          }, 500)
        } else {
          clearInterval(this.interval)
        }
      },
      currentSide() {
        this.$store.dispatch('setBodySide', this.currentSide)
      }
    },
    methods: {
      open () {
        this.device.listPairedDevices((devices) => {
          if (devices.length > 0) {
            devices.map( dev => {
              if (dev.name === 'HC-06') {
                this.connect(dev)
              }
            })
          }
        })
        // this.$electron.shell.openExternal(link)
      },
      change() {
        this.currentSide = Math.floor(Math.random() * 6) + 1
        this.$store.dispatch('setBodySide', this.currentSide)
      },
      connect(dev) {
        console.log('try to connect..')
        this.$store.dispatch('setConnStatus', 'connecting')
        bluetooth
          .connect(dev.address, dev.services[0].channel, (err, connection) => {
            if(err){
              this.$store.dispatch('setConnStatus', 'error')
              return console.error(err)
            } else {
              this.$store.dispatch('setConnStatus', 'connected')

              connection.write(new Buffer('k', 'utf-8'), (data, buffer) => {
                console.log('Cube: connected state')
              })

              connection.write(new Buffer('s', 'utf-8'), (data, buffer) => {
                console.log('Cube: get side')
              })

              connection.on('data', (buffer) => {
                let receivedSide = buffer.toString().trim()

                if (receivedSide.length > 0) {
                  console.log('change side')
                  this.currentSide = parseInt(receivedSide)
                  // if (this.isRegistering) {
                  // }
                }
              })

            }
          })
        
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
      &.left, &.right{
        width: 50%;
      }
      &.full{
        max-width: 80%;
        margin: 0 auto;
      }
    }
  }

  .config-wrapper{
    display: block;
    width: 80%;
  }
</style>
