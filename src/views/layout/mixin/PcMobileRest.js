import store from '../../../vuex/index'
const {body} = document
const WIDTH = 1024
const RATIO = 3
export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        this.$store.dispatch('CLOSE_SIDEBAR', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isMobile()
    if(isMobile) {
      this.$store.dispatch('TOGGLE_DEVICE', 'mobile')
      this.$store.dispatch('CLOSE_SIDEBAR', { withoutAnimation: true })
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler () {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        this.$store.dispatch('TOGGLE_DEVICE', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          this.$store.dispatch('CLOSE_SIDEBAR', { withoutAnimation: true })
        }
      }
    }
  }
}
