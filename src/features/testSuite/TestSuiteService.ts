import db from '../../services/db';

db.version(1).stores({
  test_suites: '++id,&title'
})

export interface ITestSuite {
  id?: number,
  title: string;
  description: string;
}

function table(){
  return db.table<ITestSuite>('test_suites');
}

export function newInstance(): Promise<ITestSuite>{
  return new Promise((resolve) => {
    resolve({
      title: '',
      description: ''
    })
  });
}

export function create(testSuite: ITestSuite) {
  return table().add(testSuite);
}

export function read(id: number) {
  return table().get(id);
}

export function update(testSuite: ITestSuite) {
  return table().update(testSuite.id, testSuite);
}

export function destroy(id: number) {
  return table().delete(id);
}

export function index(offset = 0, limit = 20) {
  return table().offset(offset).limit(limit).reverse().toArray();
}
