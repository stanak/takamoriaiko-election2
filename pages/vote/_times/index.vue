<template>
  <div v-if="isEnd()" class="position-center">
    藍子ちゃん総選挙20{{ times - 1 + 20 }}は終了しました。<br>
    投票ありがとうございました！
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
    return {
      times
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
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
