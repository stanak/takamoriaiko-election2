<template>
  <div>
    <div class="font-bold text-xl">
      藍子ちゃん総選挙20{{ times - 1 + 20 }}結果<br>
      開催期間 {{ inTermMessage() }}
    </div>
    <br>
    総投票数{{ getVoteNum() }}票でした。みなさん投票ありがとうございました♪

    <div class="text-center">
      <Podium :ranking="ranking" :counter="counter" :sorted-episodes="restrictedSortedEpisodes" />
      <div v-masonry transition-duration="0.3s" item-selector=".item">
        <div v-masonry-tile v-for="(epName, index) in restrictedSortedEpisodes.slice(3)" :key="index" class="item">
          <div class="padding-xs">
            <el-card :body-style="{ padding: '0px' }" class="mini-card relative">
              <div class="absolute upper-left font-bold">{{ ranking[epName] }}位</div>
              <div class="absolute lower-right">{{ counter[epName] }}票</div>
              <el-image
                style="height: 6rem; width: 100%;"
                :src="`/${epName}.jpg`"
                fit="contain"
                :alt="epName"
              />
              <div class="padding-x-m">
                <div class="font-bold text-sm margin-b-xs">
                  {{episodesENJP[epName]}}
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import episode from '@/assets/javascripts/episode'
import settings from '@/assets/javascripts/settings'

const getCounter = async (app, times, restrictedEpisodes) => {
  const ret = {}
  for (const epName of restrictedEpisodes) {
    ret[epName] = 0
  }
  try {
    const querySnapshot = await app.$firebase.firestore().collection('vote').where('times', '==', times).get()
    querySnapshot.forEach((doc) => {
      const vote = doc.data().targets

      for (const epName of Object.keys(vote)) {
        ret[epName] += vote[epName]
      }
    })
  } catch (error) {
    console.log(error)
  }
  return ret
}

const getRestrictedEpisodes = (episodes, endDate) => {
  return episodes.filter((data) => {
    return data.date <= endDate
  }).map((data) => {
    return data.name
  })
}

const getRestrictedSortedEpisodes = (restrictedEpisodes, counter) => {
  return restrictedEpisodes.sort((a, b) => {
    return counter[b] - counter[a]
  })
}

// { epName: 1 }
const getRanking = (restrictedSortedEpisodes, counter) => {
  let nowRank = 1
  let skipIndex = 1
  const ranking = {}
  for (const [index, epName] of restrictedSortedEpisodes.entries()) {
    if (index === 0) {
      ranking[epName] = nowRank
    } else {
      const now = epName
      const before = restrictedSortedEpisodes[index - 1]
      if (counter[now] === counter[before]) {
        skipIndex += 1
        ranking[epName] = nowRank
      } else {
        nowRank += skipIndex
        ranking[epName] = nowRank
        skipIndex = 1
      }
    }
  }
  return ranking
}

export default {
  components: {
    Podium: () => import('@/components/result/Podium')
  },
  data () {
    return {
      times: settings.times,
      counter: {},
      ranking: {},
      restrictedSortedEpisodes: [],
      start: new Date(),
      end: new Date(),
      episodesENJP: episode.episodesENJP
    }
  },
  async created () {
    this.start = settings.schedule[this.times - 1].start
    this.end = settings.schedule[this.times - 1].end
    const episodes = episode.episodes
    const restrictedEpisodes = getRestrictedEpisodes(episodes, this.end)
    this.counter = await getCounter(this, this.times, restrictedEpisodes)
    this.restrictedSortedEpisodes = getRestrictedSortedEpisodes(restrictedEpisodes, this.counter)
    this.ranking = getRanking(this.restrictedSortedEpisodes, this.counter)
  },
  methods: {
    inTermMessage () {
      const sYear = this.start.getFullYear()
      const sMonth = this.start.getMonth() + 1
      const sDate = this.start.getDate()
      const sHour = this.start.getHours()
      const eYear = this.end.getFullYear()
      const eMonth = this.end.getMonth() + 1
      const eDate = this.end.getDate()
      const eHour = this.end.getHours()
      return `${sYear}年${sMonth}月${sDate}日${sHour}時～${eYear}年${eMonth}月${eDate}日${eHour}時`
    },
    getVoteNum () {
      return Object.entries(this.counter).reduce((a, b) => { return a + b[1] }, 0)
    }
  }
}
</script>

<style scoped>
.padding-xs {
  padding: 0.5rem;
}
.w-xs {
  width: 24rem;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.mini-card {
  height: 8rem;
  width: 16rem;
  overflow:hidden;
}
.font-bold {
  font-weight: 700;
}
.lower-right {
  right: 0.5rem;
  bottom: 0.5rem;
}
.upper-left {
  left: 0.5rem;
  top: 0.5rem;
}
.padding-x-m {
  padding-right: 1.5rem;
  padding-left: 1.5rem;
}
.margin-b-xs {
  margin-bottom: 0.5rem;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.text-center {
  text-align: center;
}

</style>
