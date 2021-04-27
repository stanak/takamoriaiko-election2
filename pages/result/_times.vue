<template>
  <div v-if="times == 1">
    <LegacyResult />
  </div>
</template>

<script>
export default {
  components: {
    LegacyResult: () => import('@/components/result/LegacyResult')
  },
  asyncData ({ app, params }) {
    return {
      times: params.times
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
