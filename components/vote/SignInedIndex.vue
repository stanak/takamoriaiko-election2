<template>
  <div v-masonry transition-duration="0.3s" item-selector=".item">
    <div v-masonry-tile class="item" v-for="(jpName, epName, index) in episodesENJP" :key="index">
      <nuxt-link :to="`/vote/${times}/${epName}`">
        <div class="card-interval">
          <el-card :body-style="{ padding: '0px' }" class="card relative w-xs">
            <el-image
              style="height: 12rem; width: 100%;"
              :src="`/${epName}.jpg`"
              fit="contain" />
            <div class="card-text-interval">
              <div class="card-text">
                <div v-if="epName in vote" class="absolute lower-right text-lg">
                  <i class="el-icon-star-off"></i>
                  {{ vote[epName] }}
                </div>
                {{jpName}}
              </div>
            </div>
          </el-card>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import episode from '@/assets/javascripts/episode'

export default {
  data ({ params }) {
    return {
      vote: {},
      episodesENJP: episode.episodesENJP
    }
  },
  props: {
    times: Number
  },
  async mounted () {
    const vote = await this.$getFirestore(this, 'vote', this.times)
    this.vote = vote ? vote.targets : {}
  }
}
</script>

<style scoped>
.card {
  height: 16rem;
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
