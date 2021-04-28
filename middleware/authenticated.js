export default async (context) => {
  const { route, redirect, store } = context
  const [, vote, times, epName] = route.fullPath.split('/')
  if (vote === '_vote') {
    redirect(`/vote/${times}/${epName}`)
  }
  await store.dispatch('user/onAuth')
}
