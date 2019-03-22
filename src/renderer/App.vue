<template>
  <div id="app">
    <div
      :class="connStatus"
      class="status-wrapper"
    >
      <div
        v-if="isConnected"
      >
        <div
          class="toggle-wrapper"
          v-tooltip="{
            content: `<small>${ isRegistering ? 'Click to stop registering' : 'Click to start registering your time' }</small>`, 
            placement: 'left',
            html: true,
          }"
        >
          <input
            :checked="isRegistering ? true : false"
            class="toggle toggle-light"
            id="cb1"
            type="checkbox"
            @change="toggleRegistering"
          />
          <label
            class="toggle-btn"
            for="cb1"
          />
        </div>
      </div>
      <div class="status">
        <div
          v-if="!isConnected && !hasError"
          class="loader"
        ><span>loading</span></div>
        <Alert v-else-if="hasError" />
        <Check v-else />
        <span class="label">{{ connStatus }}</span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Check from 'vue-material-design-icons/Check.vue'
  import Alert from 'vue-material-design-icons/Alert.vue'

  export default {
    name: 'PixelCube',
    components: {
      Check,
      Alert
    },
    mounted() {
      this.$store.dispatch('setConnStatus', 'idle')
      this.$store.dispatch('setRegistering', false)
    },
    computed: {
      isRegistering() {
        return this.$store.getters.isRegistering
      },
      connStatus() {
        return this.$store.getters.connStatus
      },
      isConnected() {
        return this.connStatus === 'connected'
      },
      hasError() {
        return this.connStatus === 'error'
      }
    },
    methods: {
      toggleRegistering() {
        this.$store.dispatch('toggleRegistering')
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
      transform: translateX(150px);
      transition: transform .5s;
      transition-delay: 1s;
      background: $red;
      .material-design-icon{
        line-height: 0;
        &.check-alert{
          color: $red;
        }
      }
    }
    
    .status{
      display: flex;
      align-items: center;
      padding: 10px 15px;
      background: #EEE;
      background: $gray-lightest;
      max-width: 110px;
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
