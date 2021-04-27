<template>
  <div>
    <div v-for="(epNamePair, epIndex) in separatedListBy(2).slice(0, times)" :key="epIndex" class="deploy-center">
      <div v-for="(epName, epAround) in epNamePair" :key="epName">
        <nuxt-link :to="((epAround + 1) % 2) ? toVoteList(epIndex+1) : toResult(epIndex+1)">
          <div class="xs-padding">
            <el-card class="w-xs relative">
              <img class="deploy-icon" src="/click.svg">
              <img class="deploy-img" :src="`/${epName}.jpg`" :alt="epName">
              <div class="xs-padding">
                <div class="guide-text">
                  第{{ epIndex+1 }}回{{ ((epAround + 1) % 2 ? '投票' : '結果') }}へ
                </div>
              </div>
            </el-card>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import episode from '@/assets/javascripts/episode'
import settings from '@/assets/javascripts/settings'

export default {
  data () {
    return {
      times: settings.times
    }
  },
  methods: {
    // nつずつ（主に特訓前と特訓後の2つずつ並んだ）のリストを作る
    separatedListBy (n) {
      const res = []
      const epNames = episode.episodes.map(ep => ep.name)
      let index = 0
      while (index < epNames.length) {
        res.push(epNames.slice(index, index + n))
        index += n
      }
      return res
    },
    toVoteList (times) {
      return `/vote/${times}`
    },
    toResult (times) {
      return `/result/${times}`
    }
  }
}
</script>

<style scoped>
.guide-text {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  margin: 0.5rem;
}
.deploy-img {
  object-fit: contain;
  height: 12rem;
  width: 100%;
}
.deploy-icon {
  position: absolute;
  height: 3rem;
  right: 0px;
  bottom: 0px;
}
.relative {
  position: relative;
}
.xs-padding {
  padding: 0.5rem
}
.deploy-center {
  display: block;
}
@media (min-width: 640px) {
  .deploy-center {
    display: flex;
    justify-content: center;
  }
}
.w-xs {
  width: 24rem;
}
</style>
