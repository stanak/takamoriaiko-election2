<template>
  <div>
    <Card
      v-for="(epName, index) in rankGroup(1)"
      :key="`first-${index}`"
      crown-img="/rank1.png"
      :vote-count="counter[epName]"
      :ep-img="`/${epName}.jpg`"
      :ep-name="episodesENJP[epName]"
    /><br>
    <Card
      v-for="(epName, index) in rankGroup(2)"
      :key="`second-${index}`"
      crown-img="/rank2.png"
      :vote-count="counter[epName]"
      :ep-img="`/${epName}.jpg`"
      :ep-name="episodesENJP[epName]"
    />
    <Card
      v-for="(epName, index) in rankGroup(3)"
      :key="`third-${index}`"
      crown-img="/rank3.png"
      :vote-count="counter[epName]"
      :ep-img="`/${epName}.jpg`"
      :ep-name="episodesENJP[epName]"
    />
  </div>
</template>

<script>
import episode from '@/assets/javascripts/episode'

export default {
  components: {
    Card: () => import('@/components/result/Card')
  },
  props: {
    ranking: {
      type: Object,
      required: true
    },
    counter: {
      type: Object,
      required: true
    },
    sortedEpisodes: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      episodesENJP: episode.episodesENJP
    }
  },
  methods: {
    rankGroup (rank) {
      return this.sortedEpisodes.filter((ep) => { return this.ranking[ep] === rank })
    }
  }
}
</script>

<style scoped>
</style>
