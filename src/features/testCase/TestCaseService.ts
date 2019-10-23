import db from '../../services/db';


db.version(1).stores({
  test_cases: '++id,&title,testSuiteId'
})

export interface ITestCase {
  id?: number,
  testSuiteId?: number,
  title: string;
  description: string;
}

function table(){
  return db.table<ITestCase>('test_cases');
}

export function newInstance(): Promise<ITestCase>{
  return new Promise((resolve) => {
    resolve({
      title: '',
      description: '',
    });
  });
}

export function create(testCase: ITestCase) {
  return new Promise<ITestCase>((resolve,reject) => {
    table().add(testCase).then((id) => {
      resolve({
        ...testCase,
        id
      });
    }, reject);
  });
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

export function list({ testSuiteId = 0, offset = 0, limit = 20}) {
  let collection: any = table();
  if(testSuiteId){
    collection = collection.where('testSuiteId').equals(testSuiteId);
  }
  return collection.offset(offset).limit(limit).toArray();
}
