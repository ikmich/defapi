import { store } from '../common/util/store';
import * as os from 'os';

function test1() {
  const key = 'person';

  console.log({ data: store.get(key) });

  const result = store.save('person', {
    name: 'Mikhail',
    age: 24,
    percent: 56
  });

  console.log({ result });

  console.log({
    'get result': store.get('person')
  });
}

function test2() {
  const key = 'foo';

  console.log({
    data: store.get(key)
  });
}

console.log({ tmpDir: os.tmpdir() });

test1();
// test2();
