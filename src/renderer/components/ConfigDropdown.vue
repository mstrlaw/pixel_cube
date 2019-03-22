<template>
  <div
    class="dropdown is-right is-hoverable"
  >
    <div class="dropdown-trigger">
      <a
        href="#"
        class="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        @click.prevent="toggleDropdown"
      >
        <Settings />
      </a>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a
          href="#"
          class="dropdown-item"
          @click.prevent="clearTime"
        >
          Clear time
        </a>
        <hr class="dropdown-divider">
          <div class="dropdown-item d-flex">
            <div class="toggle-wrapper">
              <input
                :id="`cb-${ data.id }`"
                :checked="isProductive ? true : false"
                class="toggle is-small"
                type="checkbox"
                @change.prevent="setProductiveSide"
              />
              <label
                class="toggle-btn"
                :for="`cb-${ data.id }`"
              />
            </div>
            <span>Is productive </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Settings from 'vue-material-design-icons/Settings.vue'

  export default {
    name: 'ConfigDropdown',
    components: {
      Settings,
    },
    props: {
      data: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        isActive: false,
        isProductive: false,
      }
    },
    methods: {
      toggleDropdown() {
        this.isActive = !this.isActive
      },
      clearTime() {
        this.$store.dispatch('resetCubeTime', this.data.id)
      },
      setProductiveSide() {

      },
    }
  }
</script>
