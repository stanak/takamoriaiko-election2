<template>
  <div v-if="isSignedIn">
    <SignInedVote />
  </div>
  <div v-else>
    <div class="position-center">
      <el-card :body-style="{ padding: '0px' }" class="w-xs overflow-hidden">
        <el-image
          style="height: 16rem; width: 100%;"
          :src="`/${epName}.jpg`"
          fit="contain"
        />
        <div class="card-text-interval">
          <div class="card-text">
            {{ episodesENJP[epName] }}
          </div>
        </div>
      </el-card>
    </div>

    <div class="position-center-text">
      <el-button type="primary" round class="button-design" @click="doSignIn">
        ログインして投票
      </el-button>
      </nuxt-link>
    </div>
    <div class="top-padding position-center-text">
      <nuxt-link :to="`/vote/${times}`">
        <el-button round>
          投票候補一覧へ戻る
        </el-button>
      </nuxt-link>
    </div>

  </div>
</template>

<script>
import episode from '@/assets/javascripts/episode'
import { mapGetters, mapActions } from 'vuex'

// 全取得チケット数から全投票済みチケット数の合算を引いた残りチケット数
export default {
  components: {
    SignInedVote: () => import('@/components/vote/SignInedVote')
  },
  asyncData (context) {
    const { params } = context
    const times = Number(params.times)
    const epName = params.epName
    const episodesENJP = episode.episodesENJP

    return {
      times,
      epName,
      episodesENJP
    }
  },
  computed: {
    ...mapGetters({
      isSignedIn: 'user/isSignedIn'
    })
  },
  methods: {
    ...mapActions('user', [
      'signIn'
    ]),
    async doSignIn () {
      await this.signIn()
    }
  }
}
</script>

<style scoped>
.top-padding {
  padding-top: 1rem;
}
.position-center {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  justify-content: center;
  display: flex;
}
.overflow-hidden {
  overflow:hidden;
}
.card-text {
  text-align: center;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.card-text-interval {
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.w-xs {
  width: 24rem;
}
.position-center-text {
  text-align: center;
}
.button-design {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}
</style>
