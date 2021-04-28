<template>
  <div>
    <div class="position-center">
      <el-card class="w-xs overflow-hidden relative">
        <el-image
          style="height: 16rem; width: 100%;"
          :src="`/${epName}.jpg`"
          fit="contain"
        />
        <div class="card-text-interval">
          <div class="card-text">
            <span class="vote-num">{{ (epName in vote) ? vote[epName] : 0 }}票投票済み</span>
            {{ episodesENJP[epName] }}
          </div>
        </div>
      </el-card>
    </div>
    <div v-if="isLimit(vote)" class="position-center-text">
      投票上限です。<br>ログインボーナスで投票券を増やすか、リセットで再び投票できます。
    </div>
    <div v-else class="position-center-text">
      <el-form :inline="true">
        <el-form-item label="投票券枚数">
          <el-input-number v-model="voteNum" :min="1" :max="remainingTicketNum(vote)" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round class="button-design" @click="handleVote()">
            投票する
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="position-center-text">
      残り持ち票{{ remainingTicketNum(vote) }}
    </div>
    <div class="position-center-text">
      <a :href="twitterShareURL()" target="_blank" rel="noopener noreferrer">
        <el-button round type="primary">
          ツイート
        </el-button>
      </a>
    </div>
    <div class="top-padding position-center-text">
      <el-button round type="warning" @click="handleClearVote()">
        投票リセット
      </el-button>
    </div>
  </div>
</template>

<script>
import episode from '@/assets/javascripts/episode'
import { mapGetters } from 'vuex'

const countVote = (obj) => {
  Object.entries(obj).reduce((a, b) => { return a + b[1] }, 0)
}

export default {
  data () {
    return {
      times: 0,
      ticketNum: 0,
      vote: {},
      voteNum: 1,
      epName: '',
      episodesENJP: episode.episodesENJP
    }
  },
  computed: {
    ...mapGetters({
      isSignedIn: 'user/isSignedIn',
      twitterIdStr: 'user/twitterIdStr'
    }),
    remainingTicketNum () {
      return function (vote) {
        const countVote = Object.entries(vote).reduce((a, b) => { return a + b[1] }, 0)
        return this.ticketNum - countVote
      }
    },
    isLimit () {
      return function (vote) {
        const countVote = Object.entries(vote).reduce((a, b) => { return a + b[1] }, 0)
        return this.ticketNum <= countVote
      }
    }
  },
  async created () {
    this.epName = this.$route.params.epName
    this.times = Number(this.$route.params.times)

    const vote = await this.$getFirestore(this, 'vote', this.times)
    if (vote === null) {
      await this.initializeVote()
    }
    this.vote = vote ? vote.targets : {}
    const ticketData = await this.$getFirestore(this, 'ticket', this.times)
    this.ticketNum = ticketData ? ticketData.number : 0
  },
  methods: {
    handleVote () {
      this.$confirm(`${this.episodesENJP[this.epName]}に${this.voteNum}票投票しますか？`, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'info'
      }).then(async () => {
        try {
          await this.updateVote()
          await this.$message({
            type: 'success',
            message: '投票成功。'
          })
        } catch (e) {
          await this.$message({
            type: 'danger',
            message: `投票失敗。${e}`
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'キャンセルしました。'
        })
      })
    },
    async updateVote () {
      const voteData = await this.$getFirestore(this, 'vote', this.times)
      const newVote = voteData.targets
      const ticketData = await this.$getFirestore(this, 'ticket', this.times)
      const ticketNum = ticketData.number
      if (!this.voteNum || (typeof this.voteNum) !== 'number') {
        throw new Error('入力値が不正です')
      }
      if (this.voteNum > ticketNum) {
        throw new Error('投票数が投票券総数より多いです')
      }
      if ((countVote(this.vote) + this.voteNum) > ticketNum) {
        throw new Error('総投票数が投票券総数より多いです')
      }
      if (this.epName in newVote) {
        newVote[this.epName] += this.voteNum
      } else {
        newVote[this.epName] = this.voteNum
      }
      try {
        const updated = await this.$updateFirestore(this, 'vote', this.times, { targets: newVote })
        this.newVote = updated.targets
        this.vote = newVote
      } catch (e) {
        await this.$message({
          type: 'danger',
          message: `投票更新失敗${e}`
        })
      }
    },
    handleClearVote () {
      this.$confirm(`${this.episodesENJP[this.epName]}の投票をリセットしますか？`, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        try {
          await this.clearVote()
          await this.$message({
            type: 'success',
            message: 'リセット成功。'
          })
        } catch (e) {
          await this.$message({
            type: 'danger',
            message: `リセット失敗。${e}`
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'キャンセルしました。'
        })
      })
    },
    async initializeVote () {
      const newVote = { [this.epName]: 0 }

      const newData = {
        times: this.times,
        twitter_id_str: this.$store.getters['user/twitterIdStr'],
        targets: newVote
      }
      try {
        await this.$addFirestore('vote', newData)
        this.vote = newVote
      } catch (e) {
        await this.$message({
          type: 'danger',
          message: `初期投票失敗${e}`
        })
      }
    },
    async clearVote () {
      const data = await this.$getFirestore(this, 'vote', this.times)
      if (!data) {
        const newVote = {
          times: this.times,
          twitter_id_str: this.$store.getters['user/twitterIdStr'],
          targets: {}
        }
        await this.$addFirestore('vote', newVote)
        return
      }
      const targets = data.targets
      targets[this.epName] = 0
      const updated = await this.$updateFirestore(this, 'vote', this.times, { targets })
      this.vote = updated.targets
    },
    twitterShareURL () {
      const encodedText = encodeURIComponent(`${this.episodesENJP[this.epName]}に投票しました！\n皆も好きな藍子に投票しよう！\n#藍子ちゃん総選挙${2020 + this.times - 1}\n#第${9 - 1 + this.times}回シンデレラガール総選挙\n`)
      return `http://twitter.com/share?text=${encodedText}&url=${encodeURIComponent(location.href)}`
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
.vote-num {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
}
.relative {
  position: relative;
}
</style>
