import { createAppContainer } from 'react-navigation'
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
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  ExchangeDetails: { screen: ExchangeDetails },
  MarketDetails: { screen: MarketDetails },
  CryptoDetail: { screen: CryptoDetail },
  Search: { screen: Search },
  Settings: { screen: Settings },
  Exchanges: { screen: Exchanges },
  Markets: { screen: Markets },
  Crypto: { screen: Crypto },
  SplashScreen: { screen: SplashScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'SplashScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
