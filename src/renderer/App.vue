<template>
  <div id="app">
    <Navigation />
    <ConnectionController />
    <div
      :class="containerClass"
      class="container"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Navigation from './components/Navigation'
  import ConnectionController from './components/ConnectionController'

  export default {
    name: 'PixelCube',
    components: {
      Navigation,
      ConnectionController
    },
    computed: {
      containerClass() {
        let color = 'idle'

        switch (this.$store.getters.bodySide) {
          case 1:
            color = 'green'
            break

          case 2:
            color = 'blue'
            break

          case 3:
            color = 'yellow'
            break

          case 4:
            color = 'purple'
            break

          case 5:
            color = 'red'
            break

          case 6:
            color = 'cyan'
            break

        }
        return color
      }
    }
  }
</script>

<style lang="scss">
  $green:         #4CAF50;
  $red:           #F44336;
  $yellow:        #FDCF1A;
  $orange:        #EA282E;
  $gray:          #607D8B;
  $blue:          #00A6F1;
  $purple:        #673AB7;
  $gray-light:    #B0BEC5;
  $gray-lightest: #ECEFF1;

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

    &.green{
      &:before{
        background: rgba(76, 175, 80, .1); //#4CAF50; // Green
        transition: background .5s;
      }
    }
    &.blue{
      &:before{
        background: rgba(33, 150, 243, .1); //#2196F3; // Blue
        transition: background .5s;
      }
    }
    &.purple{
      &:before{
        background: rgba(103, 58, 183, .1); //#673AB7; // Purple
        transition: background .5s;
      }
    }
    &.cyan{
      &:before{
        background: rgba(0, 229, 255, .1); //Cyan
        transition: background .5s;
      }
    }
    &.red{
      &:before{
        background: rgba(244, 67, 54, .1); //#F44336; // Red
        transition: background .5s;
      }
    }
    &.yellow{
      &:before{
        background: rgba(255, 235, 59, .1); //#FFEB3B; // Yellow
        transition: background .5s;
      }
    }
  }

  .status-wrapper{
    position: fixed;
    display: flex;
    align-items: center;
    top: 15px;
    right: 15px;
    transform: translateX(0);
    z-index: 100;
    transition: transform .5s;

    .register-cta{
      margin-right: 15px;
    }

    &.idle{
      .loader {
        display: none;
      }
    }

    &.disconnected{
      .loader{
        border-left-color: $gray-light;
        border-bottom-color: $gray-light;
      }
    }
    &.connecting{
      .loader{
        border-left-color: $yellow;
        border-bottom-color: $yellow;
      }
    }
    &.connected{
      .loader {
        display: none;
      }
      transform: translateX(150px);
      transition: transform .5s;
      transition-delay: 1s;
    }
    &.error{
      // transform: translateX(150px);
      // transition: transform .5s;
      // transition-delay: 1s;
      // font-weight: bold;
      .material-design-icon{
        line-height: 0;
        &.alert-icon{
          color: $red;
          margin-right: 10px;
        }
      }
    }
    
    .status{
      display: flex;
      align-items: center;
      padding: 10px 15px;
      background: #EEE;
      background: $gray-lightest;
      max-width: 180px;
      border-radius: 4px;

      .material-design-icon{
        line-height: 0;
        &.check-icon{
          color: $green;
        }
      }

    }
  }
  
  /* TOGGLE */
  
  .toggle-wrapper{
    margin-right: 15px;
    padding-left: 5px;
  }

  .toggle {
    display: none;

    &.is-small{
      + .toggle-btn {
        width: 2em;
        height: 1.2em;
      }
    }
    
    &,
    &:after,
    &:before,
    & *,
    & *:after,
    & *:before,
    & + .toggle-btn {
      box-sizing: border-box;
      &::selection {
        background: none;
      }
    }
    
    + .toggle-btn {
      outline: 0;
      display: block;
      width: 4em;
      height: 2em;
      position: relative;
      cursor: pointer;
      user-select: none;
      background: lighten($orange, 30%);
      border-radius: 2em;
      padding: 2px;
      transition: all .4s ease;
  
      &:after,
      &:before {
        position: relative;
        display: block;
        content: "";
        width: 50%;
        height: 100%;
      }
      
      &:after {
        left: 0;
        border-radius: 50%;
        background: #fff;
        transition: all .2s ease;
      }
      
      &:before {
        display: none;
      }
    }
    
    &:checked + .toggle-btn:after {
      left: 50%;
    }

    &:checked + .toggle-btn {
      background: $green;
    }
  }

  /* BUTTON */
  .button {
    display: flex;
    border: none;
    color: #363636;
    cursor: pointer;
    justify-content: center;
    padding-bottom: calc(0.375em - 1px);
    padding-left: 0.75em;
    padding-right: 0.75em;
    padding-top: calc(0.375em - 1px);
    text-align: center;
    white-space: nowrap;
    box-shadow: none;
  }

  /* DROPDOWN */
  .dropdown {
    display: inline-flex;
    position: relative;
    vertical-align: top;
  }

  .dropdown.is-active .dropdown-menu, .dropdown.is-hoverable:hover .dropdown-menu {
    display: block;
  }

  .dropdown.is-right .dropdown-menu {
    left: auto;
    right: 0;
  }

  .dropdown.is-up .dropdown-menu {
    bottom: 100%;
    padding-bottom: 4px;
    padding-top: initial;
    top: auto;
  }

  .dropdown-menu {
    display: none;
    left: 0;
    min-width: 12rem;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    z-index: 20;
  }

  .dropdown-content {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    overflow: hidden;
  }

  .dropdown-item {
    color: #4a4a4a;
    display: block;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 0.375rem 1rem;
    position: relative;
    text-decoration: none;

    &.d-flex{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  a.dropdown-item,
  button.dropdown-item {
    padding-right: 3rem;
    text-align: left;
    white-space: nowrap;
    width: 100%;
  }

  a.dropdown-item:hover,
  button.dropdown-item:hover {
    background-color: whitesmoke;
    color: #0a0a0a;
  }

  a.dropdown-item.is-active,
  button.dropdown-item.is-active {
    background-color: #3273dc;
    color: #fff;
  }

  .dropdown-divider {
    background-color: #dbdbdb;
    border: none;
    display: block;
    height: 1px;
    margin: 0.5rem 0;
  }

  /* LOADER */

  .loader {
    margin-right: 10px;
    color: transparent;
    display: block;
    border: 2px solid #dbdbdb;
    border-radius: 290486px;
    border-right-color: transparent;
    border-top-color: transparent;
    content: "";
    height: 1em;
    position: relative;
    width: 1em;
    animation: spinAround 500ms infinite linear;
    -webkit-animation: spinAround 500ms infinite linear;
  }

  .tooltip {
    display: block !important;
    z-index: 10000;
    border-radius: .125rem;

    .tooltip-inner {
      background: #F6F9FC;
      color: #000;
      padding: .5em 1rem;
      font-size: 1.125em;
      border-radius: 4px;
      box-shadow: 0px 3px 6px rgba(0,0,0,0.16), 3px 0px 6px rgba(0,0,0,0.05);

      .list{
        padding-left: 15px;
      }
    }

    .tooltip-arrow {
      width: 0;
      height: 0;
      border-style: solid;
      position: absolute;
      margin: 5px;
      border-color: #F6F9FC;
      z-index: 1;

      &:before, &:after{
        content: '';
        display: block;
        width: 1px;
        height: 6px;
        background: #F6F9FC;
        position: absolute;
        transform: skew(-40deg);
      }

      &:after{
        transform: skew(40deg);
      }
    }

    &[x-placement^="top"] {
      margin-bottom: 5px;

      .tooltip-arrow {
        border-width: 5px 5px 0 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        bottom: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
        
        &:before, &:after{
          top: -5px;
          left: 2px;
          transform: skew(-40deg);
        }

        &:after{
          left: -3px;
          transform: skew(40deg);
        }
      }
    }

    &[x-placement^="bottom"] {
      margin-top: 5px;

      .tooltip-arrow {
        border-width: 0 5px 5px 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-top-color: transparent !important;
        top: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;

        &:before, &:after{
          top: -2px;
          left: 2px;
          transform: skew(40deg);
        }

        &:after{
          left: -3px;
          transform: skew(-40deg);
        }
      }
    }

    &[x-placement^="right"] {
      margin-left: 5px;

      .tooltip-arrow {
        border-width: 5px 5px 5px 0;
        border-left-color: transparent !important;
        border-top-color: transparent !important;
        border-bottom-color: transparent !important;
        left: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;

        &:before, &:after{
          top: 0px;
          left: 2px;
          transform: skew(40deg);
        }

        &:after{
          top: -6px;
          transform: skew(-40deg);
        }
      }
    }

    &[x-placement^="left"] {
      margin-right: 5px;

      .tooltip-arrow {
        border-width: 5px 0 5px 5px;
        border-top-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        right: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;

        &:before, &:after{
          top: 0px;
          left: -3px;
          transform: skew(-40deg);
        }

        &:after{
          top: -6px;
          transform: skew(40deg);
        }
      }
    }

    &.popover {
      $color: #f9f9f9;

      .popover-inner {
        background: $color;
        color: black;
        padding: 24px;
        border-radius: 5px;
        box-shadow: 0 5px 30px rgba(black, .1);
      }

      .popover-arrow {
        border-color: $color;
      }
    }

    &[aria-hidden='true'] {
      visibility: hidden;
      opacity: 0;
      transition: opacity .15s, visibility .15s;
    }

    &[aria-hidden='false'] {
      visibility: visible;
      opacity: 1;
      transition: opacity .15s;
    }
  }


  @-webkit-keyframes spinAround {
    from {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(359deg);
              transform: rotate(359deg);
    }
  }
  @keyframes spinAround {
    from {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(359deg);
              transform: rotate(359deg);
    }
  }
</style>
