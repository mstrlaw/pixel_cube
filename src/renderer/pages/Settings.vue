<template>
  <div id="settings">
    <div class="columns">
      <div class="column full">
        <div class="panel">
          <h4>Bluetooth</h4>
          <small>Available devices</small>
          <table class="table is-narrow is-striped is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(device, index) in devices"
                :key="index"
              >
                <td>{{ device.name }}</td>
                <td>{{ device.address }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel">
          <h4>About</h4>
          <p>Visit project page at 
            <a
              href="#"
              @click.prevent="visitWebsite"
            >pixelcube.xyz</a>
          </p>
        </div>
        <div class="panel">
          <h4>System Info</h4>
          <div class="items">
            <div class="item">
              <div class="name">Vue.js:</div>
              <div class="value">{{ vue }}</div>
            </div>
            <div class="item">
              <div class="name">Electron:</div>
              <div class="value">{{ electron }}</div>
            </div>
            <div class="item">
              <div class="name">Node:</div>
              <div class="value">{{ node }}</div>
            </div>
            <div class="item">
              <div class="name">Platform:</div>
              <div class="value">{{ platform }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Settings',
    data () {
      return {
        electron: process.versions.electron,
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version,
        devices: []
      }
    },
    mounted() {
      this.$store.getters.bluetoothDevice.listPairedDevices(( devices ) => {
        this.devices = devices
      })
    },
    methods: {
      visitWebsite() {
        this.$electron.shell.openExternal('https://www.google.com')
      }
    }
  }
</script>

<style lang="scss">
  $gray:          #607D8B;
  $gray-light:    #B0BEC5;
  $gray-lightest: #ECEFF1;

  .panel{
    background: lighten($gray-lightest, 5%);
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 25px;
    width: 100%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items {
    margin-top: 8px;
    display: flex;

    .item {
      display: flex;
      margin-bottom: 6px;
      width: 25%;

      .name {
        color: #6a6a6a;
        margin-right: 6px;
      }

      .value {
        color: #35495e;
        font-weight: bold;
      }
    }
  }

  
</style>
