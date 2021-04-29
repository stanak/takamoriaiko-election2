export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'takamoriaiko-election',
    htmlAttrs: {
      lang: 'en'
    },
    titleTemplate: 'ゆるふわ党 - 高森藍子総選挙',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '毎日10票もらえて投票できるよ！あなたの好きな藍子に投票してね。' },
      { hid: 'og:image:width', property: 'og:image:width', content: '1920' },
      { hid: 'og:image:height', property: 'og:image:height', content: '1080' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'ゆるふわ党 - 高森藍子総選挙' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://takamoriaiko-election.web.app' },
      { hid: 'og:title', property: 'og:title', content: 'ゆるふわ党 - 高森藍子総選挙' },
      { hid: 'og:description', property: 'og:description', content: '毎日10票もらえて投票できるよ！あなたの好きな藍子に投票してね。' },
      { hid: 'og:image', property: 'og:image', content: 'https://takamoriaiko-election.web.app/tedukuri_no_siawase_ast.jpg' },
      { property: 'article:publisher', content: 'FacebookURL' },
      { property: 'fb:app_id', content: 'FacebookAppID' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@Twitter' }
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/firebase',
    '@/plugins/masonry',
    '@/plugins/persistedstate'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  },
  router: {
    middleware: ['authenticated']
  }
}
