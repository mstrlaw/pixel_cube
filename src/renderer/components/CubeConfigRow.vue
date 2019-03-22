<template>
  <div
    :class="[ data.id ,{ 'active': activeSide === data.face } ]"
    class="cube-side"
  >
    <div class="number" >
      {{ data.face }}
    </div>
    
    <div class="input-wrapper">
      <input
        type="text"
        v-model="locaValue"
        class="label"
        @focus="showSave"
        @blur="hideSave"
      >
      <div class="controls">
        <a
          v-if="showSaveLabel"
          href="#"
          @click.prevent="changeSideLabel"
        >
          <ContentSave />
        </a>
      </div>

    </div>
    <div class="time">
      {{ formatTime(data.currentTime) }}
    </div>
    <div class="options">
      <ConfigDropdown :data="data" />
    </div>
  </div>
</template>

<script>
  import ConfigDropdown from './ConfigDropdown'
  import ContentSave from 'vue-material-design-icons/ContentSave.vue'
  import moment from 'moment'

  export default {
    name: 'CubeConfigRow',
    components: {
      ContentSave,
      ConfigDropdown
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
        locaValue: this.$store.getters.cubeSideConfig(this.data.id),
        showSaveLabel: false
      }
    },
    methods: {
      showSave(){
        this.showSaveLabel = true
      },
      hideSave(){
        setTimeout( () => {
          this.showSaveLabel = false
        }, 250)
      },
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

    &.side-1{
      .number{
        background: rgba(76, 175, 80, .2); //#4CAF50; // Green
      }
    }
    &.side-2{
      .number{
        background: rgba(244, 67, 54, .2); //#F44336; // Red
      }
    }
    &.side-3{
      .number{
        background: rgba(255, 235, 59, .2); //#FFEB3B; // Yellow
      }
    }
    &.side-4{
      .number{
        background: rgba(255, 152, 0, .2); //#FF9800; // Orange
      }
    }
    &.side-5{
      .number{
        background: rgba(33, 150, 243, .2); //#2196F3; // Blue
      }
    }
    &.side-6{
      .number{
        background: rgba(103, 58, 183, .2); //#673AB7; // Purple
      }
    }

    &.active{
      .number{
        transition: background .5s, color .5s;
      }
      &.side-1{
        .number{
          background: rgba(76, 175, 80, .8); //#4CAF50; // Green
          color: white;
        }
      }
      &.side-2{
        .number{
          background: rgba(244, 67, 54, .8); //#F44336; // Red
        }
      }
      &.side-3{
        .number{
          background: rgba(255, 235, 59, .8); //#FFEB3B; // Yellow
        }
      }
      &.side-4{
        .number{
          background: rgba(255, 152, 0, .8); //#FF9800; // Orange
        }
      }
      &.side-5{
        .number{
          background: rgba(33, 150, 243, .8); //#2196F3; // Blue
        }
      }
      &.side-6{
        .number{
          background: rgba(103, 58, 183, .8); //#673AB7; // Purple
          color: white;
        }
      }
    }

    &:hover{
      .options{
        opacity: 1;
        transition: opacity .1s;
      }
    }

    .number,
    .label,
    .time,
    .controls,
    .options{
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
      transition: background .5s;
    }

    .input-wrapper{
      position: relative;
      
      .controls{
        position: absolute;
        display: flex;
        align-items: center;
        line-height: 0;
        border: none;
        top: 0;
        right: 0;
        > * {
          color: #333;
        }
      }
    }

    .time{
      width: 100px;
      font-size: 1.2em;
      border-top: 1px solid #DDD;
      border-bottom: 1px solid #DDD;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    .options{
      font-size: 1.2em;
      opacity: 0;
      transition: opacity .5s;
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
