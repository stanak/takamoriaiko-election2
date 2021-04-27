import settings from '@/assets/javascripts/settings'

const initialAllVote = () => {
  const timesEpisodeCount = Array.from(Array(settings.times), (v, k) => [k + 1, {}])
  return Object.fromEntries(timesEpisodeCount)
}

const loginBonus = async (app, twitterIdStr, redirect) => {
  const router = app.$router
  if (await app.$checkLoginBonus(twitterIdStr)) {
    await app.$increaseVotingTicket(twitterIdStr)
    const redirectUri = router.fullPath
    router.push(`/login_bonus?redirect_uri=${redirectUri}`)
  }
}

export const state = () => ({
  isSignedIn: false,
  twitterIdStr: null,
  twitterScreenName: null,
  allVote: initialAllVote(),
  ticketNum: 0
})

export const mutations = {
  setSignInState (state, isSignedIn) {
    state.isSignedIn = isSignedIn
  },
  setTwitterIdStr (state, twitterIdStr) {
    state.twitterIdStr = twitterIdStr
  },
  setTwitterScreenName (state, twitterScreenName) {
    state.twitterScreenName = twitterScreenName
  },
  setVote (state, { times, vote }) {
    state.allVote[times] = vote
  },
  setTicketNum (state, num) {
    state.ticketNum = num
  }
}

export const actions = {
  async signIn () {
    const user = await this.$twitterSignIn()
    return user
  },
  async signOut ({ commit }) {
    await this.$twitterSignOut()
    commit('setSignInState', false)
  },
  updateVote ({ commit }, { times, vote }) {
    commit('setVote', { times, vote })
  },
  updateTicketNum ({ commit }, ticketNum) {
    commit('setTicketNum', ticketNum)
  },
  onAuth (context) {
    const { commit } = context
    this.$firebase.auth().onAuthStateChanged(async (user) => {
      const userInfo = await this.$firebase.auth().getRedirectResult()
      if (userInfo.user) {
        const twitterIdStr = userInfo.additionalUserInfo.profile.id_str
        const twitterScreenName = userInfo.additionalUserInfo.profile.screen_name
        await loginBonus(this, twitterIdStr)
        commit('setSignInState', true)
        commit('setTwitterIdStr', twitterIdStr)
        commit('setTwitterScreenName', twitterScreenName)
      }
      if (user) {
        commit('setSignInState', true)
        const twitterIdStr = user.providerData[0].uid
        await loginBonus(this, twitterIdStr)
      }
    })
  }
}

export const getters = {
  isSignedIn: (state) => {
    return state.isSignedIn
  },
  twitterIdStr: (state) => {
    return state.twitterIdStr
  },
  twitterScreenName: (state) => {
    return state.twitterScreenName
  },
  allVote: (state) => {
    return state.allVote
  },
  ticketNum: (state) => {
    return state.ticketNum
  }
}
