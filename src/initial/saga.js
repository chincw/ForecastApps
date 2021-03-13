// common
import Storage from '@reducers/storeReducer';
import { all, fork } from 'redux-saga/effects';

export default function* root() {
  yield all([fork(Storage.saga)]);
}
