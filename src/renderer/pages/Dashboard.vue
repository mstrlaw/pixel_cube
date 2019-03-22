<template>
  <div id="dashboard">
    <Navigation />
    <div class="container">
      <div class="columns">
        <div class="column left">
          <Cube :current-side="currentSide" />
        </div>
        <div class="column right">
          <div class="config-wrapper">
            <CubeConfigRow
              v-for="side in cubeConfig"
              :key="side.id"
              :data="side"
              :active-side="currentSide"
            />
          </div>
          <!--button
            class="alt"
            @click.prevent="open"
          >Start</button-->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Cube from '../components/Cube'
  import CubeConfigRow from '../components/CubeConfigRow'
  import Navigation from '../components/Navigation'
  import bluetooth from 'node-bluetooth'

  export default {
    name: 'Dashboard',
    components: {
      Navigation,
      Cube,
      CubeConfigRow
    },
    data() {
      return {
        device: null,
        interval: null,
        currentSide: 1,
      }
    },
    mounted() {
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

              connection.write(new Buffer('s', 'utf-8'), (data, buffer) => {
                console.log('wrote')
              })

              connection.on('data', (buffer) => {
                let receivedSide = buffer.toString().trim()

                if (receivedSide.length > 0) {
                  if (this.isRegistering) {
                    console.log('change side')
                    this.currentSide = parseInt(receivedSide)
                  }
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

  .container{
    margin: 0 auto;
    padding-left: 55px;
    &:before{
      content: "";
      position: fixed;
      width: 100%;
      height: 120vh;
      top: 10vh;
      -webkit-transform: skewY(12deg);
      transform: skewY(12deg);
      
      background-color: #F6F9FC;
      z-index: -20;
      transition: background .5s;
    }

    &.side-1{
      &:before{
        background: rgba(76, 175, 80, .2); //#4CAF50; // Green
        transition: background .5s;
      }
    }
    &.side-2{
      &:before{
        background: rgba(244, 67, 54, .2); //#F44336; // Red
        transition: background .5s;
      }
    }
    &.side-3{
      &:before{
        background: rgba(255, 235, 59, .2); //#FFEB3B; // Yellow
        transition: background .5s;
      }
    }
    &.side-4{
      &:before{
        background: rgba(255, 152, 0, .2); //#FF9800; // Orange
        transition: background .5s;
      }
    }
    &.side-5{
      &:before{
        background: rgba(33, 150, 243, .2); //#2196F3; // Blue
        transition: background .5s;
      }
    }
    &.side-6{
      &:before{
        background: rgba(103, 58, 183, .2); //#673AB7; // Purple
        transition: background .5s;
      }
    }
  }

  .columns{
    display: flex;
    align-items: flex-start;
    .column{
      position: relative;
      width: 50%;
      height: 100vh;
      display: flex;
      align-items: center;
      &.left{
      }
      &.right{
      }
    }
  }

  .config-wrapper{
    display: block;
    width: 80%;
  }
</style>
