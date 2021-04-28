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
    <SignInedIndex :times="times" />
  </div>
</template>

<script>
import settings from '@/assets/javascripts/settings'
import { mapGetters } from 'vuex'

export default {
  components: {
    SignInedIndex: () => import('@/components/vote/SignInedIndex')
  },
  asyncData ({ params }) {
    const times = Number(params.times)
    const nowTimes = Number(settings.times)
    const start = settings.schedule[nowTimes - 1].start
    const end = settings.schedule[nowTimes - 1].end
    return {
      times,
      nowTimes,
      start,
      end
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
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
