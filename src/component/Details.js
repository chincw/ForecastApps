import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Card, Space } from '@element';
import { THEME } from '@stylesheet/styles';
import * as ducks from '@reducers/storeReducer/ducks';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';

const isArrayEmpty = data => !data || data.length === 0;

const LoadingInd = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#39D2D4" />
  </View>
);

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      filteredList: [],
    };
  }

  componentDidMount() {
    const { getHourlyData } = this.props;
    const { params } = this.props.route.params || {};

    getHourlyData(params.lat, params.long, 'metric');
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      hourlyForecast,
      hourlyForecast: { hourlyData, isFetching },
    } = nextProps;
    const { params } = this.props.route.params || {};
    const formatter = new Date(params.date * 1000);
    const selectedDate = moment(formatter).format('YYYY MM DD');
    let filteredList = [];

    if (hourlyForecast && hourlyForecast !== this.props.hourlyForecast) {
      if (hourlyData) {
        if (!isArrayEmpty(hourlyData.list)) {
          filteredList = hourlyData.list.filter(item => {
            const formatDate = moment(item.dt_txt).format('YYYY MM DD');
            if (selectedDate === formatDate) {
              return item;
            }
          });
        }
      }
      this.setState({ filteredList, isFetching });
    }
  }

  keyExtractor = (item, index) => index.toString();

  separator = () => <Space value={0.5} />;

  renderList = ({ item, index }) => {
    const { dt_txt, main, wind, weather } = item;
    return (
      <View>
        <Card>
          <View style={THEME.rowContainer}>
            <View style={[THEME.flex1, THEME.justifyCenter]}>
              <Icon name="cloud" size={50} color="#000000" />
            </View>
            <View style={THEME.flex3}>
              <Text style={[THEME.fontBold, THEME.fontXlarge]}>{main.temp + ' ºC'}</Text>
              <Space value={0.5} />
              {!isArrayEmpty(weather) &&
                weather.map((dataItem, dataIndex) => (
                  <View key={dataIndex}>
                    <Text style={[THEME.fontThin, THEME.small]}>{dataItem.description}</Text>
                  </View>
                ))}
              <Space value={0.5} />
              <Text style={[THEME.fontThin]}>{`Min ${main.temp_min} ºC - Max ${main.temp_max}`}</Text>
              <Space value={0.5} />
              <Text>{dt_txt}</Text>
              <Space value={0.5} />
              <Text>{`Wind: ${wind.speed} mph`}</Text>
            </View>
          </View>
        </Card>
      </View>
    );
  };

  render() {
    const { filteredList, isFetching } = this.state;
    return (
      <View style={THEME.container}>
        {isFetching && <LoadingInd />}
        <FlatList
          keyExtractor={this.keyExtractor}
          renderItem={this.renderList}
          data={filteredList}
          ItemSeparatorComponent={this.separator}
          ListEmptyComponent={() => (
            <View>
              <Text style={[THEME.fontXlarge, THEME.textAlignCenter, THEME.fontLight]}>No Data</Text>
            </View>
          )}
        />
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

// export default Details;
const mapStateToProps = store => ({
  hourlyForecast: store[ducks.NAME].weatherReducer,
});
const mapDispatchToProps = {
  getHourlyData: ducks.getHourlyRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Details);
