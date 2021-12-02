const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

initializeApp();

const db = getFirestore();

// users컬렉션 생성
const docRef = db
  .collection('users')
  .doc('alovelace');

await docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});

// users컬렉션에서 다른 값 추가 
const aTuringRef = db
  .collection('users')
  .doc('aturing');

await aTuringRef.set({
  'first': 'Alan',
  'middle': 'Mathison',
  'last': 'Turing',
  'born': 1912
});


// 데이터 읽기 
const snapshot = await
db.collection('users')
  .get()
snapshot.forEach(doc => {
  console.log(doc.id, '=>', doc.data());
})


// 문서 설정 
const data = {
  name: 'Alan',
  age: 31,
  favoriteColor: 'red',
}


// .add(data) === .doc().set(data)
const res = await
db.collection('users')
  // .doc('documentID_2039482903')
  .add(data)
// .set(data);

// const cityRef =
//   db.collection('cities')
//     .doc('SF');

// const res = await
// cityRef.set({
//   capital: true
// }, { merge: true });


// update timestamp
// Create a document reference
const docRef = db.collection('objects').doc('some-id');
// Update the timestamp field with the value from the server
const res = await docRef.update({
  timestamp: FieldValue.serverTimestamp()
})


// update with DOT notation
const initialData = {
  name: 'Alan',
  age: 31,
  favorite: {
    color: 'red',
    food: 'pizza',
  }
}
const res = await db.collection('users').doc('Alan').update({
  age: 29,
  'favorite.color': 'blue'
})


// Array update (arrayUnion, arrayRemove)
const washingtonRef = db.collection('cities').doc('DC');
const unionRes = await washingtonRef.update({
  regions: FieldValue.arrayUnion('greater-virginia')
})
const removeRes = await washingtonRef.update({
  regions: FieldValue.arrayRemove('greater-virginia')
})


// Transaction
// Initialize document
const cityRef = db.collection('cities').doc('SF');
await cityRef.set({
  name: 'San Francisco',
  state: 'CA',
  country: 'USA',
  capital: false,
  population: 860000
});
try {
  await db.runTransaction(async (t) => {
    const doc = await t.get(cityRef);

    // Add one person to the city population.
    // Note: this could be done without a transaction
    //       by updating the population using FieldValue.increment()
    const newPopulation = doc.data().population + 1;
    t.update(cityRef, { population: newPopulation });
  });

  console.log('Transaction success!');
} catch (e) {
  console.log('Transaction failure:', e);
}