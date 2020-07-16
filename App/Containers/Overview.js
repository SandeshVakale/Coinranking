import React, { useEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Card, ListItem } from 'react-native-elements'
import _ from 'lodash'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import OverviewActions from '../Redux/OverviewRedux'
import Error from '../Components/Error'
// Styles
import styles from './Styles/OverviewStyle'
import AppBar from '../Components/AppBar'
import { Colors } from '../Themes'
import { BarIndicator } from 'react-native-indicators'

const Overview = (props) => {
  const {overview, refCurrencyUuid, getOverview} = props
  useEffect(() => {
    getOverview(refCurrencyUuid.data.value)
  }, [refCurrencyUuid])

  return (
    <View style={styles.container}>
      <AppBar title={'Overview'} onPressRight={() => props.navigation.navigate('Settings')} onPressLeft={() => props.navigation.navigate('Search')} iconRight={'settings'} iconLeft={'search'} />
      <Text style={[styles.sectionText, { color: Colors.charcoal, fontSize: 24 }]}>Crypto market overview & total market cap</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Settings')} >
        <Text style={[styles.sectionText, { color: Colors.charcoal, marginTop: -30 }]} >Currency {refCurrencyUuid.data.name} </Text>
      </TouchableOpacity>
      <Error data={overview} onPress={() => getOverview(refCurrencyUuid.data.value)} />
      {overview.fetching === false && overview.error === null
      ? <ScrollView><Card containerStyle={{ marginBottom: 100 }}>
        <ListItem title={'Crypto market cap'} bottomDivider subtitle={`${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.get(overview, 'payload.data.totalMarketCap')}`}
          leftIcon={{ name: 'chart-donut', color: Colors.facebook, size: 30, type: 'material-community' }} />
        <ListItem title={'24h volume'} bottomDivider subtitle={`${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.get(overview, 'payload.data.total24hVolume')}`}
          leftIcon={{ name: 'chart-bar-stacked', color: Colors.facebook, size: 30, type: 'material-community' }} />
        <ListItem title={'Cryptocurrencies'} bottomDivider subtitle={_.get(overview, 'payload.data.totalCoins')}
          leftIcon={{ name: 'death-star', color: Colors.facebook, size: 30, type: 'material-community' }} />
        <ListItem title={'Exchanges'} bottomDivider subtitle={_.get(overview, 'payload.data.totalExchanges')}
          leftIcon={{ name: 'chart-bar', color: Colors.facebook, size: 30, type: 'material-community' }} />
        <ListItem title={'Markets'} bottomDivider subtitle={_.get(overview, 'payload.data.totalMarkets')}
          leftIcon={{ name: 'chart-bubble', color: Colors.facebook, size: 30, type: 'material-community' }} />
      </Card></ScrollView> : <BarIndicator color={Colors.facebook} style={styles.activity} />}
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    overview: state.overview,
    refCurrencyUuid: state.uuid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOverview: (refCurrencyUuid) => dispatch(OverviewActions.overviewRequest(refCurrencyUuid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
