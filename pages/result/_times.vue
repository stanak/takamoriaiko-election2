<template>
  <div v-if="times == 1">
    <LegacyResult />
  </div>
  <div v-else>
    <div v-if="inTerm()">
      {{ inTermMessage() }}
    </div>
  </div>
</template>

<script>
import settings from '@/assets/javascripts/settings.js'

export default {
  components: {
    LegacyResult: () => import('@/components/result/LegacyResult')
  },
  asyncData ({ app, params }) {
    const times = params.times
    const start = settings.schedule[times - 1].start
    const end = settings.schedule[times - 1].end
    return {
      times,
      start,
      end
    }
  },
  methods: {
    inTerm () {
      const now = new Date()
      return this.start < now && now < this.end
    },
    inTermMessage () {
      const sYear = this.start.getFullYear()
      const sMonth = this.start.getMonth() + 1
      const sDate = this.start.getDate()
      const eYear = this.end.getFullYear()
      const eMonth = this.end.getMonth() + 1
      const eDate = this.end.getDate()
      return `開催日時：${sYear}年${sMonth}月${sDate}日～${eYear}年${eMonth}月${eDate}日`
    }
  }
}
</script>

<style scoped>
</style>
