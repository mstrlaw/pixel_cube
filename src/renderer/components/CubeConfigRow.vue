<template>
  <div
    :class="{ 'active': activeSide === data.face }"
    class="cube-side"
  >
    <div class="number">
      {{ data.face }}
    </div>
    <input
      type="text"
      v-model="locaValue"
      class="label"
    >
    <div class="controls">
      <a
        href="#"
        @click.prevent="changeSideLabel"
      >
        <ContentSave />
      </a>
    </div>
    <div class="time">
      {{ formatTime(data.currentTime) }}
    </div>
  </div>
</template>

<script>
  import ContentSave from 'vue-material-design-icons/ContentSave.vue'
  import moment from 'moment'

  export default {
    name: 'CubeConfigRow',
    components: {
      ContentSave,
    },
    props: {
      data: {
        type: Object,
        default: () => {
          return {}
        }
      },
      activeSide: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        locaValue: this.$store.getters.cubeSideConfig(this.data.id)
      }
    },
    methods: {
      changeSideLabel() {
        this.$store.dispatch('setCubeLabel', { sideId: this.data.id, label: this.locaValue })
      },
      formatTime(time) {
        let t = moment.duration(time)

        if (t.asHours() >= 1) {
          return `${ Math.floor(t.hours()) }h  ${ t.minutes() }m  ${ Math.floor(t.seconds()) }s`
        } else if (t.asMinutes() >= 1) {
          return `${ t.minutes() }m  ${ Math.floor(t.seconds()) }s`
        } else if (t.asSeconds() >= 1) {
          return `${ Math.floor(t.seconds()) }s`
        } else {
          return `${ Math.floor(t.seconds()) }s`
        }

      }
    }
  }
</script>

<style lang="scss">
  .cube-side{
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    &.active{
      .number{
        background: rgba(234, 40, 46, 0.3);
      }
    }

    .number,
    .label,
    .time,
    .controls{
      height: 40px;
    }

    .number,
    .time,
    .controls{
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0 15px;
      border: 1px solid #DDD;
    }

    .number{
      font-size: 1.5em;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    .time{
      font-size: 1.2em;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    .controls{      
      border-right: 0;
      > * {
        color: #333;
      }
    }

    .label{
      font-size: 1.6em;
      border: none;
      border-top: 1px solid #DDD;
      border-bottom: 1px solid #DDD;
      padding: 0 15px;
      font-size: inherit;
    }
  }
</style>
