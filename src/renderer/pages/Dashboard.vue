<template>
  <div id="dashboard">
    <Navigation />
    <div class="container">
      <div class="columns">
        <div class="column">
          <Cube
            :current-side="currentSide"
          />
        </div>
        <div class="column">
          <button
            class="alt"
            @click.prevent="open"
          >Start</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Cube from '../components/Cube'
  import Navigation from '../components/Navigation'
  import bluetooth from 'node-bluetooth'

  export default {
    name: 'Dashboard',
    components: {
      Navigation,
      Cube
    },
    data() {
      return {
        device: null,
        currentSide: 1
      }
    },
    mounted() {
      console.log('mounted component')
      this.device = new bluetooth.DeviceINQ()
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
        console.log(dev)
        bluetooth.connect(dev.address, dev.services[0].channel, (err, connection) => {
            if(err){
              return console.error(err)
            } else {

              console.log('connected!')
              
              connection.on('data', (buffer) => {
                let receivedSide = buffer.toString().trim()

                if (receivedSide.length > 0) {
                  this.currentSide = parseInt(receivedSide)
                }
              })

            }
            // connection.write(new Buffer('Hello!', 'utf-8'), () => {
            //   console.log("wrote");
            // });
          })
        
      }
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  body, html{
    margin: 0;
    padding: 0;
  }

  .container{
    width: 80vw;
    height: 80vh;
    margin: 0 auto;
  }
</style>
