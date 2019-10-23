import db from '../../services/db';


db.version(1).stores({
  test_steps: '++id,&title,testCaseId'
})

export interface ITestStep {
  id?: number,
  testCaseId?: number,
  title: string;
  description: string;
}

function table(){
  return db.table<ITestStep>('test_steps');
}

export function newInstance(): Promise<ITestStep>{
  return new Promise((resolve) => {
    resolve({
      title: '',
      description: '',
    });
  });
}

export function create(testStep: ITestStep) {
  return new Promise<ITestStep>((resolve,reject) => {
    table().add(testStep).then((id) => {
      resolve({
        ...testStep,
        id
      });
    }, reject);
  });
}

export function read(id: number) {
  return table().get(id);
}

export function update(testStep: ITestStep) {
  return table().update(testStep.id, testStep);
}

export function destroy(id: number) {
  return table().delete(id);
}

export function list({ testCaseId = 0, offset = 0, limit = 20}) {
  let collection: any = table();
  if(testCaseId){
    collection = collection.where('testCaseId').equals(testCaseId);
  }
  return collection.offset(offset).limit(limit).toArray();
}
