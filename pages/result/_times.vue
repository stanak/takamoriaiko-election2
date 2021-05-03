<template>
  <div v-if="times == 1">
    <div v-if="beforeTerm()">
      開催日時:{{ inTermMessage() }}
    </div>
    <div v-if="inTerm()">
      {{ showDate() }}に発表！好きな藍子ちゃんに奮ってご投票ください！
    </div>
    <div v-if="afterTerm()">
      <LegacyResult />
    </div>
  </div>
  <div v-else>
    <div v-if="beforeTerm()">
      開催日時:{{ inTermMessage() }}
    </div>
    <div v-else-if="inTerm()">
      {{ showDate() }}に発表！好きな藍子ちゃんに奮ってご投票ください！
    </div>
    <div v-else-if="afterTerm()">
      <Result />
    </div>
  </div>
</template>

<script>
import settings from '@/assets/javascripts/settings.js'

export default {
  components: {
    LegacyResult: () => import('@/components/result/LegacyResult'),
    Result: () => import('@/components/result/Result')
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
    beforeTerm () {
      const now = new Date()
      return this.start > now
    },
    inTerm () {
      const now = new Date()
      return this.start < now && now < this.end
    },
    afterTerm () {
      const now = new Date()
      return now > this.end
    },
    showDate () {
      const date = settings.schedule[this.times - 1].end
      return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + date.getHours() + '時'
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
</style>
