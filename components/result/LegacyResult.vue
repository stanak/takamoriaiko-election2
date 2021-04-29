<template>
  <div v-if="!isEnd">
    {{ showDate() }}に発表！好きな藍子ちゃんに奮ってご投票ください！
  </div>
  <div v-else>
    <div class="font-bold text-xl">
      藍子ちゃん総選挙20{{ times - 1 + 20 }}結果<br>
      開催期間 {{ inTermMessage() }}
    </div>
    <br>
    このときは一人5票のみが与えられ、1エピソードには1票まで、最大5エピソード投票できました。<br>
    総投票数{{ allVoteList.length }}票でした。みなさん投票ありがとうございました♪

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

// [epName1, epName2, epName1, ...]
const getAllVote = async (app, times) => {
  let ret = []
  try {
    const querySnapshot = await app.$firebase.firestore().collection('election').where('times', '==', times).get()
    querySnapshot.forEach((doc) => {
      ret = ret.concat(doc.data().voted)
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

// { epName: 10 }
const getCounter = (restrictedEpisodes, allVoteList) => {
  const counter = {}
  for (const ep of restrictedEpisodes) {
    counter[ep] = 0
  }
  for (const ep of allVoteList) {
    counter[ep] += 1
  }
  return counter
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
      times: 1,
      allVoteList: [],
      counter: {},
      ranking: {},
      restrictedSortedEpisodes: [],
      start: new Date(),
      end: new Date(),
      episodesENJP: episode.episodesENJP
    }
  },
  computed: {
    isEnd () {
      const now = new Date()
      const end = settings.schedule[this.times - 1].end
      return now > end
    }
  },
  async created () {
    this.time = 1 // 固定値
    this.start = settings.schedule[this.times - 1].start
    this.end = settings.schedule[this.times - 1].end
    const episodes = episode.episodes
    const restrictedEpisodes = getRestrictedEpisodes(episodes, this.end)
    this.allVoteList = await getAllVote(this, this.times)
    this.counter = getCounter(restrictedEpisodes, this.allVoteList)
    this.restrictedSortedEpisodes = getRestrictedSortedEpisodes(restrictedEpisodes, this.counter)
    this.ranking = getRanking(this.restrictedSortedEpisodes, this.counter)
  },
  methods: {
    showDate () {
      const date = settings.schedule[this.times - 1].end
      return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + date.getHours() + '時'
    },
    top3Num () {
      return this.restrictedSortedEpisodes.filter((ep) => { return this.ranking[ep] in [1, 2, 3] })
    },
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
