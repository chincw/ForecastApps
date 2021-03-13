import { call, put, all, takeEvery } from 'redux-saga/effects';
import * as ducks from './ducks';
import * as api from './api';

function* getForecast(action) {
  try {
    const response = yield call(api.getForecastData, action.lat, action.long, action.units);
    yield put(ducks.getForecastSuccess(response));
  } catch (err) {
    yield put(ducks.getForecastFail(err));
  }
}
function* watchGetForecast() {
  yield takeEvery(ducks.GetForecastReq, getForecast);
}

function* getHourlyForecast(action) {
  try {
    const response = yield call(api.getForecastHourly, action.lat, action.long, action.units);
    yield put(ducks.getHourlySuccess(response));
  } catch (err) {
    yield put(ducks.getHourlyFail(err));
  }
}
function* watchGetHourlyForecast() {
  yield takeEvery(ducks.GetHourlyReq, getHourlyForecast);
}

export default function* storeSage() {
  yield all([watchGetForecast(), watchGetHourlyForecast()]);
}
