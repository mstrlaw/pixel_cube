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
        placeholder="No label"
        @focus="showSave"
        @blur="changeSideLabel"
      >
    </div>
    <div class="time">
      {{ formatTime(data.currentTime) }}
    </div>
    <div class="options">
      <a
        href="#"
        @click.prevent="clearTime"
      >
        <BackupRestore
          v-tooltip="{
            content: `<small>Reset time</small>`, 
            placement: 'top',
            html: true,
          }"
        />
      </a>

      <div
        class="toggle-wrapper"
        v-tooltip="{
          content: `<small>Change this activity's productivity</small>`, 
          placement: 'top',
          html: true,
        }"
      >
        <input
          :id="`cb-${ data.id }`"
          :checked="data.isProductive ? true : false"
          class="toggle is-small"
          type="checkbox"
          @change.prevent="setProductiveSide"
        />
        <label
          class="toggle-btn"
          :for="`cb-${ data.id }`"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import BackupRestore from 'vue-material-design-icons/BackupRestore.vue'
  import moment from 'moment'

  export default {
    name: 'CubeConfigRow',
    components: {
      BackupRestore,
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
      clearTime() {
        this.$store.dispatch('resetCubeTime', this.data.id)
      },
      setProductiveSide() {
        this.$store.dispatch('setCubeProductivity', { sideId: this.data.id, value: !this.data.isProductive })
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
          return '-'
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
        color: #BBB;
        background: rgba(76, 175, 80, .2); //#4CAF50; // Green
      }
    }
    &.side-2{
      .number{
        background: rgba(33, 150, 243, .2); //#2196F3; // Blue
        
      }
    }
    &.side-3{
      .number{
        background: rgba(255, 235, 59, .2); //#FFEB3B; // Yellow
      }
    }
    &.side-4{
      .number{
        background: rgba(103, 58, 183, .2); //#673AB7; // Purple
      }
    }
    &.side-5{
      .number{
        background: rgba(244, 67, 54, .2); //#F44336; // Red
      }
    }
    &.side-6{
      .number{
        background: rgba(0, 229, 255, .2); //Cyan
      }
    }

    &.active{
      .number{
        color: #000;
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
          background: rgba(33, 150, 243, .8); //#2196F3; // Blue
          
        }
      }
      &.side-3{
        .number{
          background: rgba(255, 235, 59, .8); //#FFEB3B; // Yellow
        }
      }
      &.side-4{
        .number{
          background: rgba(103, 58, 183, .8); //#673AB7; // Purple
          color: white;
        }
      }
      &.side-5{
        .number{
          background: rgba(244, 67, 54, .8); //#F44336; // Red
          color: white;
        }
      }
      &.side-6{
        .number{
          background: rgba(0, 229, 255, .8); //Cyan
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
    .options{
      height: 40px;
    }

    .number,
    .time{
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0 15px;
      border: 1px solid #DDD;
    }

    .number{
      color: #BBB;
      font-size: 1.5em;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      transition: background .5s, color .5s;
    }

    .time{
      width: 100px;
      font-size: 1.2em;
      border-top: 1px solid #DDD;
      border-bottom: 1px solid #DDD;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      background: #F6F9FC;
    }

    .options{
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 1.2em;
      margin-left: 15px;
      opacity: 0;
      transition: opacity .5s;
      a {
        color: #333;
        line-height: 0;
        padding: 2px;
        border-radius: 50%;
        transition: background .5s;
        &:hover{
          background: #EEE;
          transition: background .5s;
        }
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
