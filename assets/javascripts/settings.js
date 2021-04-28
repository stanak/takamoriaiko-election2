// timesを増やすことで各回の選挙ページが生成され、期間も設定するといい感じになる。
export default {
  times: 2,
  schedule: [
    {
      start: new Date(2020, 3, 29),
      end: new Date(2020, 4, 11)
    },
    {
      start: new Date(2021, 3, 28),
      end: new Date(2021, 4, 15, 19)
    }
  ]
}
