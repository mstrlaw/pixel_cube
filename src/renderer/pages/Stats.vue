<template>
  <div id="dashboard">
    <div class="container">
      <div class="columns">
        <div class="column">
          <LineChart />
        </div>
        <div class="column">
          <button
            class="alt"
            @click.prevent="open"
          >Hello?</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import LineChart from '../components/LineChart'
  import bluetooth from 'node-bluetooth'

  export default {
    name: 'Dashboard',
    components: {
      LineChart
    },
    data() {
      return {
        device: null
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
                console.log(buffer)
                console.log('received message:', parseInt(buffer.toString()))
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
