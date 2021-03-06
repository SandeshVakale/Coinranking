import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import DetailGraph from '../Containers/DetailGraph'
import Overview from '../Containers/Overview'
import SettingsOrderBy from '../Containers/SettingsOrderBy'
import Selector from '../Containers/Selector'
import Currencies from '../Containers/Currencies'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ExchangeDetails from '../Containers/ExchangeDetails'
import MarketDetails from '../Containers/MarketDetails'
import CryptoDetail from '../Containers/CryptoDetail'
import Search from '../Containers/Search'
import Settings from '../Containers/Settings'
import Exchanges from '../Containers/Exchanges'
import Markets from '../Containers/Markets'
import Crypto from '../Containers/Crypto'
import SplashScreen from '../Containers/SplashScreen'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'
import { Colors } from '../Themes'
import React from 'react'

const TabNavigator = createBottomTabNavigator({
  Crypto: { screen: Crypto },
  Exchanges: { screen: Exchanges },
  Markets: { screen: Markets },
  Overview: { screen: Overview }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Crypto',
  tabBarOptions: {
    activeTintColor: Colors.facebook,
    showLabel: false,
    style: styles.appBottomBarStyle,
    safeAreaInset: { bottom: 'never', top: 'never' }
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state
      let iconName
      if (routeName === 'Crypto') {
        iconName = focused
          ? 'death-star'
          : 'death-star'
        // Sometimes we want to add badges to some icons.
        // You can check the implementation below.
      } else if (routeName === 'Markets') {
        iconName = focused ? 'chart-bubble' : 'chart-bubble'
      } else if (routeName === 'Exchanges') {
        iconName = focused ? 'chart-bar' : 'chart-bar'
      } else if (routeName === 'Overview') {
        iconName = focused ? 'earth' : 'earth'
      }

      // You can return any component that you like here!
      return <Icon name={iconName} size={35} color={tintColor} />
    }
  })
})

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  DetailGraph: { screen: DetailGraph },
  SettingsOrderBy: { screen: SettingsOrderBy },
  Selector: { screen: Selector },
  Currencies: { screen: Currencies },
  ExchangeDetails: { screen: ExchangeDetails },
  MarketDetails: { screen: MarketDetails },
  CryptoDetail: { screen: CryptoDetail },
  Search: { screen: Search },
  Settings: { screen: Settings },
  LaunchScreen: { screen: LaunchScreen },
  TabNavigator: { screen: TabNavigator }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'TabNavigator',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const SwitchNavigator = createSwitchNavigator({
  SplashScreen: { screen: SplashScreen },
  PrimaryNav: { screen: PrimaryNav }
}, {
  // Default config for all screens
  backBehavior: 'none',
  headerMode: 'none',
  initialRouteName: 'SplashScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(SwitchNavigator)
