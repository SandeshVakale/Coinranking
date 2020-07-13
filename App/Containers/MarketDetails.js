import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import MarketAction from '../Redux/MarketRedux'

// Styles
import styles from './Styles/MarketDetailsStyle'
import AppBar from '../Components/AppBar'
import Error from '../Components/Error'
import { Image, Card, ListItem } from 'react-native-elements'
import { Colors } from '../Themes'
import _ from 'lodash'
import { BarIndicator } from 'react-native-indicators'
import { PieChart } from 'react-native-svg-charts'

const MarketDetails = (props) => {
  const { name, uuid } = props.navigation.state.params
  const { getMarket, refCurrencyUuid, market } = props
  useEffect(() => {
    getMarket(uuid, refCurrencyUuid.data.value)
  }, [refCurrencyUuid])
  return (
    <ScrollView style={styles.container}>
      <AppBar title={name} onPressRight={() => props.navigation.navigate('Settings')} onPressLeft={() => props.navigation.goBack()} iconRight={'settings'} iconLeft={'chevron-left'} />
      <Error data={market} onPress={() => getMarket(uuid, refCurrencyUuid.data.uuid)} />
      {market.fetching === false && market.error === null
        ? <View style={{ flexDirection: 'column' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }} >
            <Image
              placeholderStyle={{ backgroundColor: Colors.transparent }}
              source={_.get(market, 'payload.data.market.exchangeIconUrl') && { uri: _.get(market, 'payload.data.market.exchangeIconUrl').replace(/\.(svg)($|\?)/, '.png$2') }}
              style={{ width: 60,
                height: 80,
                marginTop: 10,
                shadowColor: Colors.charcoal,
                resizeMode: 'contain',
                shadowOffset: {
                  width: 2,
                  height: 5
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.84 }}
              PlaceholderContent={<BarIndicator color={Colors.facebook} style={{ backgroundColor: Colors.transparent }} />}
            />
            <Text style={[styles.sectionText, {color: Colors.charcoal}]}>{_.get(market, 'payload.data.market.exchangeName')}</Text>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: Colors.charcoal}}>{refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} {_.ceil(_.get(market, 'payload.data.market.price'), 2)}</Text>
            <Card title={`Market Share ${_.ceil(_.get(market, 'payload.data.market.marketShare'), 2)} %`} containerStyle={{ width: '90%' }}>
              <PieChart data={[
                {
                  key: 1,
                  value: _.ceil(_.get(market, 'payload.data.market.marketShare')),
                  svg: { fill: Colors.facebook },
                  arc: { outerRadius: '130%', cornerRadius: 10 }
                },
                {
                  key: 2,
                  value: 100 - _.ceil(_.get(market, 'payload.data.market.marketShare'), 2),
                  svg: { fill: Colors.cloud }
                }]} style={{ height: 200 }}
                outerRadius={'70%'}
                innerRadius={10} />
              <ListItem
                title={'Rank'}
                subtitle={_.get(market, 'payload.data.market.rank')}
                bottomDivider
                leftIcon={{ name: 'gesture-swipe-up', color: Colors.facebook, size: 30, type: 'material-community' }}
              />
              <ListItem
                title={'24h Volume'}
                subtitle={`${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.get(market, 'payload.data.market.24hVolume')}`}
                bottomDivider
                leftIcon={{ name: 'chart-bar-stacked', color: Colors.facebook, size: 30, type: 'material-community' }}
              />
            </Card>
          </View>
        </View> : <BarIndicator color={Colors.facebook} style={styles.activity} />}
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
  return {
    market: state.market,
    refCurrencyUuid: state.uuid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMarket: (uuid, referenceCurrencyUuid) => dispatch(MarketAction.marketRequest(uuid, referenceCurrencyUuid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketDetails)
