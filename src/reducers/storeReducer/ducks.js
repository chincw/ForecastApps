export const NAME = 'ForecastAPI';

export const GetForecastReq = 'ForecastAPI/GetForecastReq';
export const GetForecastSuccess = 'ForecastAPI/GetForecastSuccess';
export const GetForecastFail = 'ForecastAPI/GetForecastFail';

export const GetHourlyReq = 'ForecastAPI/GetHourlyReq';
export const GetHourlySuccess = 'ForecastAPI/GetHourlySuccess';
export const GetHourlyFail = 'ForecastAPI/GetHourlyFail';

export const getForecastRequest = (lat, long, units) => ({
  type: GetForecastReq,
  lat,
  long,
  units,
});

export const getForecastSuccess = data => ({
  type: GetForecastSuccess,
  data,
});

export const getForecastFail = err => ({
  type: GetForecastFail,
  err,
});

export const getHourlyRequest = (lat, long, units) => ({
  type: GetHourlyReq,
  lat,
  long,
  units,
});

export const getHourlySuccess = data => ({
  type: GetHourlySuccess,
  data,
});

export const getHourlyFail = err => ({
  type: GetHourlyFail,
  err,
});
