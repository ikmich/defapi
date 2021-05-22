import { store } from './common/util/store';

function test1() {
  const key = 'person';

  console.log({ data: store.get(key) });

  const result = store.save('person', {
    name: 'Mikhail',
    age: 24,
    percent: 56
  });

  console.log({ result });
}

function test2() {
  const key = 'foo';

  console.log({
    data: store.get(key)
  });
}

test1();
// test2();
