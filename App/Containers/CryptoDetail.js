import React from 'react'
import { Text, View, Dimensions } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import CryptoOverview from '../Components/CryptoOverview'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CryptoDetailStyle'
import AppBar from '../Components/AppBar'
import { Colors } from '../Themes'

const Overview = (props) => {
  return <CryptoOverview uuid={props.route.uuid} />
}

const Exchanges = () => (
  <View style={[styles.scene]} />
)

const Markets = () => (
  <View style={[styles.scene]} />
)

const CryptoDetail = (props) => {
  const { item } = props.navigation.state.params.item
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'overview', title: 'Overview', uuid: item.uuid },
    { key: 'exchanges', title: 'Exchanges', uuid: item.uuid },
    { key: 'markets', title: 'Markets', uuid: item.uuid }
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
