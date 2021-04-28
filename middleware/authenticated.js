export default async ({ app, route, redirect, store }) => {
  const [, vote, times, epName] = route.fullPath.split('/')
  if (vote === '_vote') {
    console.log(times, epName)
    redirect(`/vote/${times}/${epName}`)
  }
  await store.dispatch('user/onAuth')
}
