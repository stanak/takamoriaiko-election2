const functions = require('firebase-functions')

const episodesENJP = {
  takamori_aiko: '高森藍子',
  takamori_aiko_ast: '高森藍子+',
  valentine: 'バレンタイン',
  valentine_ast: 'バレンタイン+',
  funwari_girl: 'ふんわりガール',
  funwari_girl_ast: 'ふんわりガール+',
  anniversary_yellow: 'アニバーサリーイエロー',
  anniversary_yellow_ast: 'アニバーサリーイエロー+',
  yuruhuwa_otome: 'ゆるふわ乙女',
  yuruhuwa_otome_ast: 'ゆるふわ乙女+',
  sinryoku_no_majo: '深緑の魔女',
  sinryoku_no_majo_ast: '深緑の魔女+',
  cd_debut: 'CDデビュー',
  cd_debut_ast: 'CDデビュー+',
  cinderella_dream: 'シンデレラドリーム',
  cinderella_dream_ast: 'シンデレラドリーム+',
  osanpo_biyori: 'おさんぽ日和',
  osanpo_biyori_ast: 'おさんぽ日和+',
  magokoro_present: 'まごころプレゼント',
  magokoro_present_ast: 'まごころプレゼント+',
  houkago_summer: '放課後サマー',
  houkago_summer_ast: '放課後サマー+',
  // takamori_aiko: '高森藍子',
  // takamori_aiko_ast: '高森藍子+',
  // yuruhuwa_otome: 'ゆるふわ乙女',
  // yuruhuwa_otome_ast: 'ゆるふわ乙女+',
  tedukuri_no_siawase: 'てづくりのしあわせ',
  tedukuri_no_siawase_ast: 'てづくりのしあわせ+',
  sinshun_girl: '新春ガール',
  sinshun_girl_ast: '新春ガール+',
  seizonhonnnou_valkyria: '生存本能ヴァルキュリア',
  seizonhonnnou_valkyria_ast: '生存本能ヴァルキュリア+',
  shunpu_no_bandit: '駿風のバンデット',
  shunpu_no_bandit_ast: '駿風のバンデット+',
  atatakana_ibasyo: 'あたたかな居場所',
  atatakana_ibasyo_ast: 'あたたかな居場所+',
  jounetsu_funfanfare: '情熱ファンファンファーレ',
  jounetsu_funfanfare_ast: '情熱ファンファンファーレ+',
  tiisana_tomodati: 'ちいさなともだち',
  tiisana_tomodati_ast: 'ちいさなともだち+',
  // sinryoku_no_majo: '深緑の魔女',
  // sinryoku_no_majo_ast: '深緑の魔女+',
  sirogane_no_utagoe: '白銀の歌声',
  sirogane_no_utagoe_ast: '白銀の歌声+',
  honwaka_hanayome: 'ほんわか花嫁',
  honwaka_hanayome_ast: 'ほんわか花嫁+',
  egao_no_reception: '笑顔のレセプション',
  egao_no_reception_ast: '笑顔のレセプション+',
  pokapoka_ecology: 'ぽかぽかエコロジー',
  pokapoka_ecology_ast: 'ぽかぽかエコロジー+',
  spice_paradise: 'スパイスパラダイス',
  spice_paradise_ast: 'スパイスパラダイス+',
  kasanaru_omoide: 'かさなる思い出',
  kasanaru_omoide_ast: 'かさなる思い出+',
  // tedukuri_no_siawase: 'てづくりのしあわせ',
  // tedukuri_no_siawase_ast: 'てづくりのしあわせ+',
  kokoroni_haruwo: 'こころに春を',
  kokoroni_haruwo_ast: 'こころに春を+',
  hohoemi_diary: 'ほほえみDiary',
  hohoemi_diary_ast: 'ほほえみDiary+',
  yasuragi_no_ondo: 'やすらぎの温度',
  yasuragi_no_ondo_ast: 'やすらぎの温度+',
  sparkle_star: 'スパークルスター',
  sparkle_star_ast: 'スパークルスター+'
  // atatakana_ibasyo: 'あたたかな居場所',
  // atatakana_ibasyo_ast: 'あたたかな居場所+',
}

const CONFIG = functions.config()
//const app_domain = CONFIG.app.domain
const app_domain = 'takamoriaiko-election.web.app'
const OGP_IMG_WIDTH = 1920
const OGP_IMG_HEIGHT = 1080

const func = functions.https.onRequest((req, res) => {
  console.log(req.path)
  const [, , times, epName] = req.path.split('/')
  console.log('times', times)
  const html = createHtml(epName, times)
  res.set('Cache-Control', 'public, max-age=600, s-maxage=600')
  res.status(200).end(html)
  return
});

const createHtml = (epName, times) => {
  const YEAR = 2020 - 1 + Number(times)
  const SITEURL = `https://${app_domain}`
  const PAGEURL = `${SITEURL}/vote/${times}/${epName}`
  const TITLE = `${episodesENJP[epName]}に投票したよ | 藍子ちゃん総選挙${YEAR} ゆるふわ党`
  const DESCRIPTION = `毎日10票もらえて投票できるよ！あなたの好きな藍子に投票してね。`
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>${TITLE}</title>
    <meta property="og:title" content="${TITLE}">
    <meta property="og:image" content="${SITEURL}/voted.jpg">
    <meta property="og:image:width" content="${OGP_IMG_WIDTH}">
    <meta property="og:image:height" content="${OGP_IMG_HEIGHT}">
    <meta property="og:description" content="${DESCRIPTION}">
    <meta property="og:url" content="${PAGEURL}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${TITLE}">
    <meta name="twitter:site" content="${SITEURL}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${TITLE}">
    <meta name="twitter:image" content="${SITEURL}/voted.jpg">
    <meta name="twitter:description" content="${DESCRIPTION}">
    <meta name="twitter:creator" content="@_starnak" />
  </head>
  <body>
    <script type="text/javascript">window.location="/_vote/${times}/${epName}";</script>
  </body>
</html>
`
}

exports.voteshare = func
