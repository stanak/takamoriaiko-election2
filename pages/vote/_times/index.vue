<template>
  <div v-if="isEnd()" class="position-center">
    藍子ちゃん総選挙20{{ times - 1 + 20 }}は終了しました。<br>
    投票ありがとうございました！
    結果は<nuxt-link :to="`/result/${times}`">こちらをクリック</nuxt-link>で確認できます。
    <div v-if="inTerm()">
      現在開催中の投票画面へは<nuxt-link :to="`/vote/${nowTimes}`">こちらをクリック</nuxt-link>で移動できます。
    </div>
  </div>
  <div v-else class="text-center">
    現在の総投票数は{{ getVoteNum() }}です！
    <SignInedIndex :times="times" />
  </div>
</template>

<script>
import settings from '@/assets/javascripts/settings'
import episode from '@/assets/javascripts/episode'
import { mapGetters } from 'vuex'

const getCounter = async (app, times, episodes) => {
  const ret = {}
  for (const epName of episodes) {
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

export default {
  components: {
    SignInedIndex: () => import('@/components/vote/SignInedIndex')
  },
  async asyncData ({ app, params }) {
    const times = Number(params.times)
    const nowTimes = Number(settings.times)
    const start = settings.schedule[nowTimes - 1].start
    const end = settings.schedule[nowTimes - 1].end
    const episodes = episode.episodes.map((epData) => { return epData.name })
    const counter = await getCounter(app, times, episodes)
    console.log(episodes)
    console.log(counter)
    return {
      times,
      nowTimes,
      start,
      end,
      counter
    }
  },
  computed: {
    ...mapGetters({
      isSignedIn: 'user/isSignedIn'
    })
  },
  methods: {
    isEnd () {
      const now = new Date()
      const end = settings.schedule[this.times - 1].end
      return now > end
    },
    inTerm () {
      const now = new Date()
      return this.start < now && now < this.end
    },
    getVoteNum () {
      return Object.entries(this.counter).reduce((a, b) => { return a + b[1] }, 0)
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
