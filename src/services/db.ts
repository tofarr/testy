import Dexie from 'dexie';

const db = new Dexie('Testy');

db.version(1).stores({
  test_cases: '++id,&title'
})

export default db;
