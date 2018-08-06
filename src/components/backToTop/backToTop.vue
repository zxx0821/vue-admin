<template>
  <transition :name="transitionName">
    <div class="back-to-ceiling" @click="backToTop" v-show="visible" :style="customStyle">
      <div class="back-to-inner">
        <i class="fa" :class="backIcon" :style="customIconStyle"></i>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'BackToTop',
    props: {
      backIcon: {
        type: String,
        default: 'fa-arrow-up'
      },
      customIconStyle: {
        type: Object,
        default: function () {
          return {
            'font-size': '20px',
            color: '#9aaabf'
          }
        }
      },
      visibilityHeight: {
        type: Number,
        default: 400
      },
      backPosition: {
        type: Number,
        default: 0
      },
      customStyle: {
        type: Object,
        default: function() {
          return {
            right: '30px',
            bottom: '30px',
            width: '30px',
            height: '30px',
            'border-radius': '4px',
            'line-height': '30px',
            background: '#e7eaf1'
          }
        }
      },
      transitionName: {
        type: String,
        default: 'fade'
      }
    },
    data() {
      return {
        visible: false,
        interval: null
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll)
      if (this.interval) {
        clearInterval(this.interval)
      }
    },
    methods: {
      /**
       *backToTop显示
       */
      handleScroll() {
        this.visible = window.pageYOffset > this.visibilityHeight
      },
      /**
       * 返回到顶部
       */
      backToTop() {
        const start = window.pageYOffset
        let i = 0
        this.interval = setInterval(() => {
          const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500))
          if (next <= this.backPosition) {
            window.scrollTo(0, this.backPosition)
            clearInterval(this.interval)
          } else {
            window.scrollTo(0, next)
          }
          i++
        }, 16.7)
      },
      /**
       * 运动曲线
       * @param t
       * @param b
       * @param c
       * @param d
       * @returns {*}
       */
      easeInOutQuad(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b
        return -c / 2 * ((--t) * (t - 2) - 1) + b
      }
    }
  }
</script>

<style scoped>
  .back-to-ceiling {
    position: fixed;
    display: inline-block;
    text-align: center;
    cursor: pointer;
  }

  .back-to-ceiling:hover {
    background: #d5dbe7;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0
  }

  .back-to-ceiling .Icon {
    fill: #9aaabf;
    background: none;
  }
</style>
