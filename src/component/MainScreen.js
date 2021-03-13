import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Header, Card, Space } from '@element';
import { THEME } from '@stylesheet/styles';
import * as ducks from '@reducers/storeReducer/ducks';
import Geolocation from 'react-native-geolocation-service';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import { locationPermission, checkLocationPermission } from '../commonFunction/GetPermission';
import SystemSetting from 'react-native-system-setting';

const isArrayEmpty = data => !data || data.length === 0;

const LoadingInd = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#39D2D4" />
  </View>
);

class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      currentWeatherData: {},
      dailyWeatherData: [],
      dateTime: '',
      lat: '',
      long: '',
    };
  }

  async componentDidMount() {
    const { getForecastData } = this.props;
    let permissionGranted = false;

    if (Platform.OS === 'ios') {
      permissionGranted = await locationPermission();
    } else if (Platform.OS === 'android') {
      permissionGranted = await checkLocationPermission();
    }

    if (permissionGranted) {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({ lat: position.coords.latitude, long: position.coords.longitude });
          getForecastData(position.coords.latitude, position.coords.longitude, 'metric');
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } else {
      this.setState({ lat: '3.140853', long: '101.693207' });
      //default: kelvin, metric: Celsius, imperial: Fahrenheit
      getForecastData('3.140853', '101.693207', 'metric');
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      responseData,
      responseData: { weatherData, currentWeatherData, dailyWeatherData, isFetching },
    } = nextProps;
    let date = '';

    if (responseData && responseData !== this.props.responseData) {
      if (currentWeatherData) date = new Date(currentWeatherData.dt * 1000);
      this.setState({ currentWeatherData, dailyWeatherData, isFetching, dateTime: date });
    }
  }

  keyExtractor = (item, index) => index.toString();

  separator = () => <Space value={0.5} />;

  navigate = params => () => {
    this.props.navigation.navigate('Details', { params });
  };

  renderList = ({ item, index }) => {
    const { temp, weather, dt } = item || {};
    const dateTime = new Date(dt * 1000);

    return (
      <View key={index}>
        <Card onPress={this.navigate({ date: item.dt, lat: this.state.lat, long: this.state.long })}>
          <View style={THEME.rowContainer}>
            <View style={[THEME.flex1, THEME.justifyCenter]}>
              <Icon name="cloud" size={50} color="#000000" />
            </View>
            <View style={THEME.flex3}>
              <Text style={[THEME.fontBold, THEME.fontXlarge]}>{temp.day + ' ºC'}</Text>
              {!isArrayEmpty(weather) &&
                weather.map((dataItem, dataIndex) => (
                  <View key={dataIndex}>
                    <Text style={[THEME.fontThin, THEME.small]}>{dataItem.description}</Text>
                  </View>
                ))}
              <Text>{`${moment(dateTime).format('MMM DD')}`}</Text>
            </View>
            <View style={[THEME.flex1, THEME.flexEnd, THEME.justifyCenter]}>
              <Icon name="arrow-right-circle" size={25} color="#000000" />
            </View>
          </View>
        </Card>
      </View>
    );
  };

  render() {
    const { currentWeatherData, dailyWeatherData, isFetching, dateTime } = this.state;

    return (
      <View style={THEME.container}>
        <Header title="Forecast App" />
        {isFetching && <LoadingInd />}
        {!isArrayEmpty(currentWeatherData) && (
          <Card>
            <View style={THEME.rowContainer}>
              <View style={[THEME.flex1, THEME.justifyCenter]}>
                <Icon name="cloud" size={50} color="#000000" />
              </View>
              <View style={THEME.flex3}>
                <Text style={[THEME.fontBold, THEME.fontXlarge]}>{currentWeatherData.temp + ' ºC'}</Text>
                <Space value={1} />
                {!isArrayEmpty(currentWeatherData.weather) &&
                  currentWeatherData.weather.map((item, index) => (
                    <View key={index}>
                      <Text style={[THEME.fontThin, THEME.small]}>{item.description}</Text>
                    </View>
                  ))}
                <Space value={0.5} />
                <Text>{`${moment(dateTime).format('MMM DD hh:mm')}`}</Text>
              </View>
            </View>
          </Card>
        )}

        <Space value={5} />
        {!isArrayEmpty(dailyWeatherData) && (
          <FlatList
            keyExtractor={this.keyExtractor}
            renderItem={this.renderList}
            data={dailyWeatherData}
            ItemSeparatorComponent={this.separator}
            ListEmptyComponent={() => {
              return <View />;
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});

const mapStateToProps = store => ({
  responseData: store[ducks.NAME].weatherReducer,
});
const mapDispatchToProps = {
  getForecastData: ducks.getForecastRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
// export default MainScreen;
