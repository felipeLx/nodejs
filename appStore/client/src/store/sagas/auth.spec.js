import test from 'tape';
import { put, call } from 'redux-saga/effects'

import { loginUserSaga, delayAsync } from './auth'
import * as actions from '../actions/index';

test('Login Saga test', (assert) => {
  const gen = loginUserSaga();

  assert.deepEqual(
      gen.next().value,
      call(delayAsync, 2000),
      //login should return a Promise that will resolve after 3 sec
  )

  assert.deepEqual(
      gen.next().value,
      put({type: actions.authStart()})
  )

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  )

  assert.end()
});