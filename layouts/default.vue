<template>
  <div>
    <el-menu
      mode="horizontal"
      background-color="#C5DD7F"
      text-color="#ffffff"
    >
      <el-menu-item index="1" class="inline">
        <nuxt-link to="/">
          <img src="/camera.ico">
          <span class="logo">
            ゆるふわ党
          </span>
        </nuxt-link>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          メニュー
        </template>
        <el-menu-item index="2-1">
          <nuxt-link to="/">
            TOP
          </nuxt-link>
        </el-menu-item>
        <el-menu-item v-for="index in Array.from(Array(times * 2), (v, k) => k)" :key="index" :index="`2-${index+2}`">
          <nuxt-link :to="((index + 1) % 2) ? toVoteList(index / 2 + 1) : toResult(index / 2 + 1)">
            {{ `第${parseInt((index / 2)+1)}回${((index % 2) == 0) ? "投票" : "結果"}` }}
          </nuxt-link>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        <a href="https://twitter.com/intent/tweet?screen_name=_starnak" target="_blank" rel="noopener noreferrer">お問い合わせ</a>
      </el-menu-item>
      <el-menu-item v-if="isSignedIn" index="4" @click="doSignOut()">
        ログアウト
      </el-menu-item>
    </el-menu>
    <Nuxt class="margin-top padding" />
  </div>
</template>

<script>
import settings from '@/assets/javascripts/settings'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      times: settings.times
    }
  },
  computed: {
    ...mapGetters({
      isSignedIn: 'user/isSignedIn'
    })
  },
  methods: {
    toVoteList (times) {
      return `/vote/${parseInt(times)}`
    },
    toResult (times) {
      return `/result/${parseInt(times)}`
    },
    ...mapActions('user', [
      'signOut'
    ]),
    async doSignOut () {
      await this.signOut()
    }
  }
}
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.inline {
  display: inline-block;
}
.logo {
  font-weight: bold;
  font-size: 1.5rem;
  padding-left: 0.5rem;
}
.margin-top {
  margin-top: 1rem;
}
.padding {
  padding: 1rem;
}
</style>
