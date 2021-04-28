
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
  twitterScreenName: null
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
        return
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
  }
}
