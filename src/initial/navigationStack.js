// import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '@component/MainScreen';
import Details from '@component/Details';
import 'react-native-gesture-handler';
import * as React from 'react';
import { FONT_FAMILY, FONT } from '@stylesheet/styles';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRoutename={MainScreen}
        headerMode="screen"
        screenOptions={{
          headerStyle: {
            height: 100,
          },
          headerTitleStyle: {
            fontFamily: FONT_FAMILY.bold,
            fontSize: FONT.xxlarge,
          },
          headerBackTitle: 'Main',
        }}>
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
