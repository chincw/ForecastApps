import { combineReducers } from 'redux';
import * as ducks from './ducks';

const initialState = {
  weatherData: null,
  hourlyData: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case ducks.GetForecastReq:
    case ducks.GetHourlyReq:
      return {
        ...state,
        isFetching: true,
      };
    case ducks.GetForecastSuccess:
      return {
        ...state,
        isFetching: false,
        weatherData: action.data,
        currentWeatherData: action.data.current,
        dailyWeatherData: action.data.daily,
      };
    case ducks.GetHourlySuccess:
      return {
        ...state,
        isFetching: false,
        hourlyData: action.data,
      };
    case ducks.GetForecastFail:
    case ducks.GetHourlyFail:
      return {
        ...state,
        isFetching: false,
        errorMsg: action.err,
      };
    default:
      return state;
  }
};

export default combineReducers({
  weatherReducer,
});
