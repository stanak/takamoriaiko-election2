const functions = require('firebase-functions')
import episode from '@/asset/javascript/episode'

const CONFIG = functions.config()
const app_domain = CONFIG.app.domain
//const app_domain = 'takamoriaiko-election.web.app'
const OGP_IMG_WIDTH = 1920
const OGP_IMG_HEIGHT = 1080

const func = functions.https.onRequest((req, res) => {
  const [, , epName, times] = req.path.split('/')
  const html = createHtml(epName, times)
  res.set('Cache-Control', 'public, max-age=600, s-maxage=600')
  res.status(200).end(html)
  return
});

const createHtml = (epName, times) => {
  const YEAR = 2020 - 1 + Number(times)
  const SITEURL = `https://${app_domain}`
  const PAGEURL = `${SITEURL}/detail/${epName}/${times}`
  const TITLE = `${episodes[epName]}に投票したよ | 藍子ちゃん総選挙${YEAR} ゆるふわ党`
  const DESCRIPTION = `毎日10票もらえて投票できるよ！あなたの好きな藍子に投票してね。`
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>${TITLE}</title>
    <meta property="og:title" content="${TITLE}">
    <meta property="og:image" content="${SITEURL}/static/voted.jpg">
    <meta property="og:image:width" content="${OGP_IMG_WIDTH}">
    <meta property="og:image:height" content="${OGP_IMG_HEIGHT}">
    <meta property="og:description" content="${DESCRIPTION}">
    <meta property="og:url" content="${PAGEURL}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${TITLE}">
    <meta name="twitter:site" content="${SITEURL}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${TITLE}">
    <meta name="twitter:image" content="${SITEURL}/static/voted.jpg">
    <meta name="twitter:description" content="${DESCRIPTION}">
    <meta name="twitter:creator" content="@_starnak" />
  </head>
  <body>
    <script type="text/javascript">window.location="/_detail/${epName}/${times}";</script>
  </body>
</html>
`
}

exports.voteshare = func
