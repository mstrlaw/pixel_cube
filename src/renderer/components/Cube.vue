<template>
  <div
    :class="sideClass"
    class="cube-wrapper"
  >
    <figure class="cube">
      <div
        v-for="side in sides"
        :key="side.id"
        :class="['side', { 'active-side': sideClass === side.class }, side.class]"
      >
        <div class="label">{{ side.label }}</div>
      </div>
    </figure>
  </div>
</template>

<script>
  export default {
    name: 'Cube',
    data() {
      return {
        sides: [
          {
            id: 1,
            class: 'front',
            label: '1',
          },
          {
            id: 4,
            class: 'left',
            label: '4',
          },
          {
            id: 2,
            class: 'right',
            label: '2',
          },
          {
            id: 6,
            class: 'top',
            label: '6',
          },
          {
            id: 5,
            class: 'bottom',
            label: '5',
          },
          {
            id: 3,
            class: 'back',
            label: '3',
          },
        ],
        sideClass: 'front'
      }
    },
    props: {
      currentSide: {
        type: Number,
        default: 1
      }
    },
    watch: {
      currentSide() {
        switch (this.currentSide) {
          case 1:
            this.sideClass = 'front'
            break

          case 2:
            this.sideClass = 'right'
            break

          case 3:
            this.sideClass = 'back'
            break

          case 4:
            this.sideClass = 'left'
            break

          case 5:
            this.sideClass = 'bottom'
            break

          case 6:
            this.sideClass = 'top'
            break 

        }
      }
    },
    methods: {
      change(side){
        this.sideClass = side
      }
    }
  }
</script>

<style lang="scss">
  $yellow: #FDCF1A;
  $orange: #EA282E;

  .cube-wrapper {
    width: 300px;
    height: 300px;
    margin: 60px auto;
    -webkit-perspective: 1100px;
    -webkit-perspective-origin: -50% -50%;
    // float: left;

    &.front {
      .cube {
        transform: translateZ(-150px) rotateY(0);
        -webkit-transform: translateZ(-150px) rotateY(0);
      }
    }
    &.left {
      .cube {
        transform: translateZ(-150px) rotateY(90deg);
        -webkit-transform: translateZ(-150px) rotateY(90deg);
      }
    }
    &.right {
      .cube {
        transform: translateZ(-150px) rotateY(-90deg);
        -webkit-transform: translateZ(-150px) rotateY(-90deg);
      }
    }
    &.top {
      .cube {
        transform: translateZ(-150px) rotateX(-90deg);
        -webkit-transform: translateZ(-150px) rotateX(-90deg);
      }
    }
    &.bottom {
      .cube {
        transform: translateZ(-150px) rotateX(90deg);
        -webkit-transform: translateZ(-150px) rotateX(90deg);
      }
    }
    &.back {
      .cube {
        transform: translateZ(-150px) rotateY(180deg);
        -webkit-transform: translateZ(-150px) rotateY(180deg);
      }
    }

    .cube {
      -webkit-transform-style: preserve-3d;
      -webkit-transform: translateZ(-150px);
      left: 15%;
      position: relative;
      margin: 0;
      width: 300px;
      height: 300px;
      transition: 1s;
      -webkit-transition: 1s;

      .side {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 300px;
        height: 300px;
        border: 1px solid #777;
        background: rgba(246, 249, 252, 1);
        transition: background 1s;

        .label {
          color: rgba(0, 0, 0, .1);
          font-size: 8em;
          text-shadow: 0 0px 0px rgba(0, 0, 0, 0);
          padding: 0 50px;
          background: rgba(234, 40, 46, 0);
          border-radius: 50%;
          transition: text-shadow .5s, color .5s, background .5s;
        }

        &.front {
          transform: translateZ(150px);
          -webkit-transform: translateZ(150px);
        }

        &.left {
          transform: rotateY(-90deg) translateZ(150px);
          -webkit-transform: rotateY(-90deg) translateZ(150px);
        }

        &.right {
          transform: rotateY(90deg) translateZ(150px);
          -webkit-transform: rotateY(90deg) translateZ(150px);
        }

        &.top {
          transform: rotateX(90deg) translateZ(150px);
          -webkit-transform: rotateX(90deg) translateZ(150px);
        }

        &.bottom {
          transform: rotateX(-90deg) translateZ(150px);
          -webkit-transform: rotateX(-90deg) translateZ(150px);
        }

        &.back {
          -webkit-transform: rotateY(180deg) translateZ(150px);
        }

        &.active-side{
          transition: background 1s;

          &.front{
            background: rgba(76, 175, 80, .8); //#4CAF50; // Green
          }
          &.right{
            background: rgba(244, 67, 54, .8); //#F44336; // Red
          }
          &.left{
            background: rgba(255, 152, 0, .8); //#FF9800; // Orange
          }
          &.top{
            background: rgba(103, 58, 183, .8); //#673AB7; // Purple
          }
          &.bottom{
            background: rgba(33, 150, 243, .8); //#2196F3; // Blue
          }
          &.back{
            background: rgba(255, 235, 59, .8); //#FFEB3B; // Yellow
          }

          .label {
            color: rgba(255, 255, 255, 1);
            // background: rgba(234, 40, 46, 1);
            text-shadow:  0 3px 10px rgba(0, 0, 0, .4);
            transition: text-shadow 1.5s, color .5s, background .5s;
          }
        }
      }    
    }

  }
</style>
