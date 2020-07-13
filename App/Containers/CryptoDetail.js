import React from 'react'
import { Text, View, Dimensions } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import CryptoOverview from '../Components/CryptoOverview'
import CoinExchanges from '../Components/CoinExchanges'
import CoinMarkets from '../Components/CoinMarkets'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CryptoDetailStyle'
import AppBar from '../Components/AppBar'
import { Colors } from '../Themes'

const Overview = (props) => {
  return <CryptoOverview uuid={props.route.uuid} {...props.route} />
}

const Exchanges = (props) => {
  return <CoinExchanges uuid={props.route.uuid} name={props.route.name} {...props.route} />
}

const Markets = (props) => {
  return <CoinMarkets uuid={props.route.uuid} name={props.route.name} {...props.route} />
}

const CryptoDetail = (props) => {
  const { item } = props.navigation.state.params.item
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'overview', title: 'Overview', uuid: item.uuid, ...props },
    { key: 'exchanges', title: 'Exchanges', uuid: item.uuid, name: item.name, ...props },
    { key: 'markets', title: 'Markets', uuid: item.uuid, name: item.name, ...props }
  ])
  const renderScene = SceneMap({
    overview: Overview,
    exchanges: Exchanges,
    markets: Markets
  })

  const initialLayout = { width: Dimensions.get('window').width }

  return (
    <View style={styles.container}>
      <AppBar title={item.name} onPressRight={() => props.navigation.navigate('Settings')} onPressLeft={() => props.navigation.goBack()} iconRight={'settings'} iconLeft={'chevron-left'} />
      <TabView
        {...props}
        activeColor={Colors.coal}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: Colors.transparent }}
            pressColor={Colors.bloodOrange}
            indicatorStyle={{ backgroundColor: Colors.facebook }}
            renderLabel={({ route, focused }) => (
              <Text align='center' style={{ color: focused ? Colors.facebook : Colors.charcoal }} >{route.title}</Text>
            )}
          />
        )}
        initialLayout={initialLayout}
      />
    </View>
  )
}

export default CryptoDetail
