import db from './db';

db.version(1).stores({
  test_cases: '++id,&title'
})

export interface ITestCase {
  id?: number,
  title: string;
  description: string;
}

function table(){
  return db.table<ITestCase>('test_cases');
}

export function newInstance(): ITestCase{
  return {
    title: '',
    description: ''
  };
}

export function create(testCase: ITestCase) {
  return table().add(testCase);
}

export function read(id: number) {
  return table().get(id);
}

export function update(testCase: ITestCase) {
  return table().update(testCase.id, testCase);
}

export function destroy(id: number) {
  return table().delete(id);
}

export function index(offset = 0, limit = 20) {
  return table().offset(offset).limit(limit).reverse().toArray();
}
