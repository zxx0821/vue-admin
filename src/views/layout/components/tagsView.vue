<template>
    <div class="tags-container">
      <ScrollPane class="tags-wrapper" ref="scrollPane">
        <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)"
                     :to="tag" :key="tag.path" @contextmenu.prevent.native="openMenu(tag,$event)">
          {{tag.title}}
          <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
        </router-link>
      </ScrollPane>
      <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
        <li @click="closeSelectedTag(selectedTag)">1</li>
        <li @click="closeOthersTags">2</li>
        <li @click="closeAllTags">3</li>
      </ul>
    </div>
</template>

<script>
import ScrollPane from '../../../components/ScrollPane/index'
export default {
  name: "tagsView",
  data () {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    }
  },
  computed: {
    visitedViews () {
      return []
    }
  },
  methods: {
    isActive (route) {

    },
    openMenu () {

    },
    closeSelectedTag () {

    },
    closeOthersTags () {

    },
    closeAllTags (){

    }
  },
  components: {
    ScrollPane
  }
}
</script>

<style scoped>

</style>
