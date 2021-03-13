export const getForecastData = async (lat, long, units) => {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=${units}&appid=4e2be4eba3aab16766c37e95555fe5cc`,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(err => {
      throw err;
    });
};

export const getForecastHourly = async (lat, long, units) => {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=${units}&appid=4e2be4eba3aab16766c37e95555fe5cc`,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(err => {
      throw err;
    });
};
