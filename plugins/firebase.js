import Firebase from 'firebase'
import setting from '@/assets/javascripts/settings'

const firebaseConfig = {
  apiKey: 'AIzaSyAkeQiEK3t4FjELkSmh5EX6vbc3-UcwbcU',
  authDomain: 'takamoriaiko-election.firebaseapp.com',
  databaseURL: 'https://takamoriaiko-election.firebaseio.com',
  projectId: 'takamoriaiko-election',
  storageBucket: 'takamoriaiko-election.appspot.com',
  messagingSenderId: '118521704873',
  appId: '1:118521704873:web:8129e790771716784254b8',
  measurementId: 'G-F2P79969BT'
}

// Initialize firebase
if (!Firebase.apps.length) {
  Firebase.initializeApp(firebaseConfig)
  Firebase.auth().setPersistence(Firebase.auth.Auth.Persistence.LOCAL)
  Firebase.analytics()
}

const twitterSignIn = async (app) => {
  const provider = new Firebase.auth.TwitterAuthProvider()
  return await Firebase.auth().signInWithRedirect(provider)
}

const twitterSignOut = async () => {
  await Firebase.auth().signOut()
}

const checkLoginBonus = async (twitterIdStr) => {
  const now = new Date()
  const times = setting.times
  const start = setting.schedule[times - 1].start
  const end = setting.schedule[times - 1].end
  const querySnapshot = await Firebase.firestore().collection('timestamp').where('times', '==', times).where('twitter_id_str', '==', twitterIdStr).get()
  const queryNum = querySnapshot.docs.length
  // 該当なしはデータ作成
  if (queryNum === 0) {
    await Firebase.firestore().collection('timestamp').add({
      times,
      twitter_id_str: twitterIdStr,
      last_time: now
    })
    return true
  }
  // 該当あればlast_timeをnowに更新
  const doc = querySnapshot.docs[queryNum - 1]
  const lastTime = doc.data().last_time.toDate()
  await Firebase.firestore().collection('timestamp').doc(doc.id).update({ last_time: now })
  // 今が選挙期間内で日が変わってたらtrue, それ以外false
  if (start < now && now < end) {
    const isAnotherDay = ((now.getDate() - lastTime.getDate()) !== 0) || ((now.getMonth() - lastTime.getMonth()) !== 0)
    return isAnotherDay
  }
  return false
}

const increaseVotingTicket = async (twitterIdStr) => {
  const times = setting.times
  await Firebase.firestore().collection('ticket').where('times', '==', times).where('twitter_id_str', '==', twitterIdStr).get().then(async (querySnapshot) => {
    const queryNum = querySnapshot.docs.length
    // 該当なしはデータ作成
    if (queryNum === 0) {
      await Firebase.firestore().collection('ticket').add({
        times,
        twitter_id_str: twitterIdStr,
        number: 10
      })
      return
    }
    const doc = querySnapshot.docs[queryNum - 1]
    const number = doc.data().number + 10
    await Firebase.firestore().collection('ticket').doc(doc.id).update({ number })
  })
}

const getFirestore = async (context, collection, times) => {
  const { app } = context
  const store = app ? app.store : context.$store
  const querySnapshot = await Firebase.firestore().collection(collection).where('times', '==', times).where('twitter_id_str', '==', store.getters['user/twitterIdStr']).get()
  const queryNum = querySnapshot.docs.length
  // なかったらnullを返す
  if (queryNum === 0) {
    return null
  }
  // あったら最後にヒットしたデータを返す(1つの前提)
  const doc = querySnapshot.docs[queryNum - 1]
  return doc.data()
}

const addFirestore = async (collection, newData) => {
  await Firebase.firestore().collection(collection).add(newData)
  return newData
}

const updateFirestore = async (context, collection, times, updateData) => {
  const { app } = context
  const store = app ? app.store : context.$store
  const querySnapshot = await Firebase.firestore().collection(collection).where('times', '==', times).where('twitter_id_str', '==', store.getters['user/twitterIdStr']).get()
  const queryNum = querySnapshot.docs.length
  // なかったらnullを返す
  if (queryNum === 0) {
    return null
  }
  // あったらupdateして最後にヒットしたデータを返す(1つの前提)
  let doc = querySnapshot.docs[queryNum - 1]
  await Firebase.firestore().collection(collection).doc(doc.id).update(updateData)
  doc = await Firebase.firestore().collection(collection).doc(doc.id).get()
  return doc.data()
}

export default ({ app }, inject) => {
  inject('twitterSignIn', twitterSignIn)
  inject('twitterSignOut', twitterSignOut)
  inject('firebase', Firebase)
  inject('checkLoginBonus', checkLoginBonus)
  inject('increaseVotingTicket', increaseVotingTicket)
  inject('getFirestore', getFirestore)
  inject('addFirestore', addFirestore)
  inject('updateFirestore', updateFirestore)
}
