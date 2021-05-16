export default async (context) => {
  const { route, redirect, store } = context
  const [, vote, times, epName] = route.fullPath.split('/')
  if (vote === '_vote') {
    redirect(`/vote/${times}/${epName}`)
  }
  if (await context.$checkLoginBonus(store)) {
    await context.$increaseVotingTicket(store)
    const redirectUri = route.fullPath
    redirect(`/login_bonus?redirect_uri=${redirectUri}`)
  }
  await store.dispatch('user/onAuth')
}
