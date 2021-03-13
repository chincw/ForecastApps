# ForecastApps
Check forecast with your location

# Screen shot

## Android
![Screenshot_1615655700](https://user-images.githubusercontent.com/57609872/111038273-0c6c8780-8463-11eb-8ffe-8afafe6fbfb9.png)
![Screenshot_1615655713](https://user-images.githubusercontent.com/57609872/111038281-11c9d200-8463-11eb-819c-ea1482f53d99.png)
## IOS
![Simulator Screen Shot - iPhone 11 - 2021-03-14 at 01 15 44](https://user-images.githubusercontent.com/57609872/111038286-17bfb300-8463-11eb-8448-a964483289a4.png)
![Simulator Screen Shot - iPhone 11 - 2021-03-14 at 01 15 48](https://user-images.githubusercontent.com/57609872/111038288-1a220d00-8463-11eb-90c7-bb0dac4bebd2.png)

# Development ENV
* Visual studio code
* Android studio (4.0.1)
* Xcode (11.3)

# Potential error
## Error: Unable to resolve module `./YellowBoxImageSource` from `node_modules/react-native/Libraries/YellowBox/UI/YellowBoxInspectorHeader.js`

### Solution
run: `react-native start reset-cache`
after that run the project `react-native run-ios / npm run ios`
