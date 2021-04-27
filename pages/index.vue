<template>
  <div class="text-left">
    <div class="image-center">
      <nuxt-link to="/menu">
        <img class="top-image" src="@/static/tedukuri_no_siawase_ast.jpg" alt="top-image">
      </nuxt-link>
    </div>
    <div class="text-center margin-top">
      <nuxt-link to="/menu">
        <el-button class="guide-button" type="primary" round>投票ページへ</el-button>
      </nuxt-link>
      <el-button class="guide-button" type="primary" disabled round>ダイマ一覧・作成へ</el-button>
    </div>
    <p>THE iDOLM@STER: Cinderella Girlsに登場するキャラクター高森藍子のファンサイトです。本家総選挙の時期に、高森藍子オンリーの総選挙を行います。</p>
    <p>投票結果の閲覧は誰でも可能で、投票に参加するにはTwitterアカウントが必要です。読み取り権限のみで、勝手にツイートしたりすることはありません。</p>
    <p>期間内に毎日10票ログインボーナスが発生します。日が変わった時、ログイン状態でページ遷移を行うとログインボーナスページに移動します。</p>
    <p>投票後、どの藍子に投票したかツイートすることができます。皆でイチオシの藍子を共有しよう！</p>

    <h2>関連リンク</h2>
    <ul>
      <li>
        藍子の情報ならこちら:<a href="https://seesaawiki.jp/aiko_takamori" target="_blank" rel="noopener noreferrer">高森藍子Wiki</a>
      </li>
      <li>
        みんなでわいわい:<a href="https://discord.gg/MXJf8t8" target="_blank" rel="noopener noreferrer">Discordサーバ「あいこーど」</a>
      </li>
      <li>
        イベント終了前に教えてくれる高森藍子Bot:<a href="https://twitter.com/takamoreminder" target="_blank" rel="noopener noreferrer">@takamoreminder</a>
      </li>
    </ul>

    <h2>管理者・問合せ先情報</h2>
    <a href="https://twitter.com/_starnak" target="_blank" rel="noopener noreferrer">@_starnak</a>

    <h2>更新</h2>
    <ul>
      2021
      <li>
        全面的にソースコードを書き換えてリニューアルしました。ダイマ機能は一時凍結。票の取得方法が毎日のログインで行われるようになりました。
      </li>
    </ul>

    <ul>
      2020
      <li>
        5/11: 投票結果ページを実装しました。投票ありがとうございました！
      </li>
      <li>
        4/27:[重要]ダイマ共有のURLが少し変わりました。ダイマ作成時、複数のエピソードタグがつけられるようになりました。ダイマ作成への導線が、右上のハンバーガーメニューとダイマ一覧から遷移するように変わりました。
      </li>
      <li>
        4/11:全ダイマ一覧ページができました。
      </li>
    </ul>

    <h2>プライバシーポリシー</h2>
    <p>本Webアプリでは、サービスのご利用状況を把握するために、アプリの利用状況データを収集するツールとしてGoogleAnalyticsを利用しています。Google Analyticsは、cookieを使用し、個人を特定する情報を含むことなく、利用状況を収集します。GoogleAnalyticsにより収集されたデータはGoogleプライバシーポリシーに基づいて管理されます。</p>
    <ul>
      <li>
        <a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer">利用規約</a>
      </li>
      <li>
        <a href="https://policies.google.com/privacy?hl=ja" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>
      </li>
    </ul>
  </div>
</template>

<script>
</script>

<style scoped>
.margin-top {
  margin-top: 1rem;
}
.text-left {
  margin-left: 5rem;
  margin-right: 5rem;
  text-align: left;
}
.text-center {
  text-align: center;
}
.image-center {
  margin-top: -1rem;
  margin-bottom: -1rem;
  text-align: center;
}
.top-image {
  display: inline-block;
  max-width: 100%;
  height: auto;
  @media (min-width: 640px) {
    height: 16rem;
  }
}
.guide-button {
  margin: 1rem;
  font-weight: 700;
  padding: 0.5rem;
}
body h1 {
  font-size: 2em;
  margin: .67em 0;
}
body h1,
body h2 {
  padding-bottom: .3em;
  border-bottom: 1px solid #eaecef;
}
body h1,
body h2 {
  font-weight: 600;
}
body h2 {
  font-size: 24px;
}
body h1,
body h2
{
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

</style>
