import { PermissionsAndroid, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const locationPermission = async () => {
  try {
    await Geolocation.requestAuthorization('always');
    return true;
  } catch (err) {
    return false;
  }
};

export const checkLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      Alert.alert('', 'Please Turn On Location', [
        {
          text: 'Later',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
      return false;
    }
  } catch (err) {
    return false;
  }
};
