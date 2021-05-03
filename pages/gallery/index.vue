<template>
  <div>
    藍子ちゃんエピソードのギャラリーです。スライダーをいじってカードの大きさを変えたり、ドラッグアンドドロップで順番を入れ替える事ができます。
    <div class="block">
      <span class="demonstration">カード幅</span>
      <el-slider v-model="width" @change="$redrawVueMasonry()" />
    </div>
    <div class="block">
      <span class="demonstration">カード高さ</span>
      <el-slider v-model="height" @change="$redrawVueMasonry()" />
    </div>
    <div v-masonry transition-duration="0.3s" item-selector=".item">
      <draggable tag="span" @end="$redrawVueMasonry()">
        <span v-masonry-tile class="item" v-for="(jpName, epName, index) in episodesENJP" :key="index">
          <div class="card-interval">
            <el-card ref="card" :body-style="{ padding: '0px', height: height + 'rem', width: width + 'rem' }" class="card relative">
              <el-image
                style="height: 100%; width: 100%;"
                :src="`/${epName}.jpg`"
                fit="contain" />
            </el-card>
          </div>
        </span>
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
    const episodesENJP = episode.episodesENJP
    const width = 24
    const height = 24
    return {
      episodesENJP,
      width,
      height
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
