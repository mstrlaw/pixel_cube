<template>
  <div class="total-badge">
    <div class="label-wrapper total">
      <span class="value">
        {{ formatTime(total) }}
      </span>
      <span class="label">Total Time</span>
    </div>
    <span class="label-wrapper">
      <span
        :class="productivityClass"
        class="value productivity-label"
      >
        {{ productivityRatio }}%
      </span>
      <span class="label">Productivity</span>
    </span>
  </div>  
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'TotalStats',
    data() {
      return {
        total: 0,
        totalProductive: 0,
      }
    },
    mounted() {
      this.total = 0
      this.crunchTime()
    },
    computed: {
      cubeConfig() {
        return this.$store.getters.cubeConfig
      },
      productivityRatio() {
        return this.totalProductive > 0 ? Math.round(this.totalProductive * 100 / this.total * 10) / 10 : 0
      },
      productivityClass() {
        let className = 'gray'
        
        if (this.productivityRatio > 0 && this.productivityRatio < 25) {
          className = 'red'

        } else if (this.productivityRatio >= 25 && this.productivityRatio < 50) {
          className = 'orange'

        } else if (this.productivityRatio >= 50 && this.productivityRatio < 70) {
          className = 'yellow'

        } else if (this.productivityRatio >= 70) {
          className = 'green'
        }
        return className
      }
    },
    watch: {
      cubeConfig() {
        this.crunchTime()
      }
    },
    methods: {
      crunchTime() {
        let total = 0
        let productive = 0

        this.cubeConfig.map( side => {
          total += side.currentTime

          if (side.isProductive) {
            productive += side.currentTime
          }
        })

        this.total = total
        this.totalProductive = productive
        
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
          return `0`
        }
      }
    }
  }
</script>

<style lang="scss">
  $gray:          #607D8B;
  $gray-light:    #B0BEC5;
  $gray-lightest: #ECEFF1;

  .total-badge{
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    top: 10vh;
    right: 15px;

    .label-wrapper{
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      &.total{
        margin-bottom: 15px;
        .value{
          font-size: 2.6em;
          
        }
      }

      .value{
        line-height: .8em;
        font-weight: bold;
        color: darken($gray, 5%);
      }
      .label{
        font-size: 80%;
        color: $gray;
      }
    }

    .productivity-label{
      &.gray{
        color: #607D8B;
      }
      &.red{
        color: #a30000;
      }
      &.orange{
        color: #ffab00;
      }
      &.yellow{
        color: #ffea00;
      }
      &.green{
        color: #00c853;
      }
    }

  }
</style>
