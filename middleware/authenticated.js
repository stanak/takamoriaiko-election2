export default async ({ app, route, redirect, store }) => {
  await store.dispatch('user/onAuth')
}
