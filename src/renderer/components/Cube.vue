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
        border: 1px solid #FFF;
        background: rgba(12, 20, 31, .7);
        transition: background 1s;

        .label {
          color: white;
          font-size: 3em;
          transition: text-shadow 1.5s;
          text-shadow:  0 0px 0 hsl(174, 5%, 80%),
                        0 0px 0 hsl(174, 5%, 75%),
                        0 0px 0 hsl(174, 5%, 70%),
                        0 0 0px rgba(0, 0, 0, 0),
                        0 0px 0px rgba(0, 0, 0, 0),
                        0 0px 0px rgba(0, 0, 0, 0),
                        0 0px 0px rgba(0, 0, 0, 0),
                        0 0px 0px rgba(0, 0, 0, 0),
                        0 0px 0px rgba(0, 0, 0, 0);
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
          background: rgba(12, 20, 31, .2);
          transition: background 1s;
          .label{
            transition: text-shadow 1.5s;
            text-shadow:  0 1px 0 hsl(174,5%,80%),
                          0 2px 0 hsl(174,5%,75%),
                          0 3px 0 hsl(174,5%,70%),
                          0 0 5px rgba(0,0,0,.05),
                          0 1px 3px rgba(0,0,0,.2),
                          0 3px 5px rgba(0,0,0,.2),
                          0 5px 10px rgba(0,0,0,.2),
                          0 10px 10px rgba(0,0,0,.2),
                          0 20px 20px rgba(0,0,0,.3);
          }
        }
      }    
    }

  }
</style>
