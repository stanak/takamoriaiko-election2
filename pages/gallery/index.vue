<template>
  <div>
    藍子ちゃんエピソードのギャラリーです。スライダーをいじってカードの大きさを変えたり、ドラッグアンドドロップで順番を入れ替える事ができます。
    <div class="block">
      <span class="demonstration">スケール</span>
      <el-slider v-model="scale" @change="$redrawVueMasonry()" />
    </div>
    <div v-masonry transition-duration="0.3s" item-selector=".item">
      <draggable v-model="episodeData" draggable=".item" @end="$redrawVueMasonry()">
        <el-card
          v-for="(data, index) in episodeData"
          :key="index"
          v-masonry-tile
          class="item"
          :body-style="{ padding: 0, height: 824 * scale * 0.01 + 'px', width: 'auto', overflow: 'hidden'}"
        >
          <el-image
            :src="data.src"
            :style="scaledStyle(scale, data.originWidth, data.originHeight)"
          />
        </el-card>
      </draggable>
    </div>
  </div>
</template>

<script>
import episode from '@/assets/javascripts/episode'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  asyncData ({ app, params }) {
    const scale = 20
    return {
      scale,
      episodeData: []
    }
  },
  created () {
    this.getEpisodeData()
    this.$redrawVueMasonry()
  },
  methods: {
    getEpisodeData () {
      const episodes = episode.episodes
      for (const data of episodes) {
        const img = new Image()
        img.src = `/${data.name}.jpg`
        img.onload = () => {
          const elem = {}
          elem.name = data.name
          elem.src = `/${elem.name}.jpg`
          this.episodeData.push(elem)
          elem.originWidth = img.width
          elem.originHeight = img.height
        }
      }
    },
    scaledStyle (scale, originWidth, originHeight) {
      return {
        width: originWidth * scale * 0.01 + 'px',
        height: originHeight * scale * 0.01 + 'px'
      }
    }
  }
}
</script>

<style scoped>
.card {
  overflow:hidden;
}
.card-interval {
  padding: 0.5rem;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.deploy-icon {
  position: absolute;
  height: 3rem;
  right: 0px;
  bottom: 0px;
}
.card-text-interval {
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.card-text {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.w-xs {
  width: 24rem;
}
.position-center {
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.lower-right {
  right: 0.5rem;
  bottom: 0.5rem;
}
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
</style>
