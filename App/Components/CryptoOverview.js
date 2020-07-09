import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Image, Icon } from 'react-native-elements'
import _ from 'lodash'
import { BarIndicator } from 'react-native-indicators'
import CoinActions from '../Redux/CoinRedux'
import styles from './Styles/CryptoOverviewStyle'
import { Colors } from '../Themes'
import Error from './Error'
import { WebView } from 'react-native-webview'
import { LineChart, BarChart, YAxis } from 'react-native-svg-charts'

const CryptoOverview = (props) => {
  const { uuid, getCoin, refCurrencyUuid, timePeriod, coin } = props
  useEffect(() => {
    getCoin(uuid, refCurrencyUuid.data.uuid, timePeriod.data.value)
  }, [refCurrencyUuid, timePeriod])
  console.log('coin', coin)
  const fill = 'rgb(134, 65, 244)'
  return (
    <ScrollView style={styles.container}>
      <Error data={coin} />
      {coin.fetching === false && coin.error === null
        ? <View style={{ flexDirection: 'column' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }} >
            <Image
              placeholderStyle={{ backgroundColor: Colors.transparent }}
              source={coin.payload.data.coin.iconUrl && { uri: coin.payload.data.coin.iconUrl.replace(/\.(svg)($|\?)/, '.png$2') }}
              style={{ width: 60,
                height: 80,
                marginTop: 10,
                shadowColor: coin.payload.data.coin.color || Colors.facebook,
                resizeMode: 'contain',
                shadowOffset: {
                  width: 2,
                  height: 5
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.84 }}
              PlaceholderContent={<BarIndicator color={coin.payload.data.coin.color} style={{ backgroundColor: Colors.transparent }} />}
        />
            <Text style={{fontSize: 30, fontWeight: 'bold', color: Colors.charcoal}}>{refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} {_.ceil(coin.payload.data.coin.price, 2)}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon size={24} style={{ paddingHorizontal: 10 }} name={Math.sign(coin.payload.data.coin.change) === 1 ? 'trending-up-sharp' : 'trending-down-sharp'} color={Math.sign(coin.payload.data.coin.change) === 1 ? 'green' : Colors.error} type={'ionicon'} />
              <Text style={{color: Math.sign(coin.payload.data.coin.change) === 1 ? 'green' : Colors.error, fontSize: 18}} >{_.ceil(coin.payload.data.coin.change, 2)}%</Text>
            </View>
          </View>
          <View style={{ height: 300,
            flexDirection: 'row',
            shadowColor: coin.payload.data.coin.color || Colors.facebook,
            resizeMode: 'contain',
            shadowOffset: {
              width: 2,
              height: 5
            },
            shadowOpacity: 0.5,
            shadowRadius: 3.84 }}>
            <YAxis
              style={{ marginHorizontal: 5 }}
              data={coin.payload.data.coin.sparkline}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{
                fill: coin.payload.data.coin.color || Colors.facebook,
                fontSize: 10
              }}
              numberOfTicks={10}
              formatLabel={(value) => `${value}${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol}`}
          />
            <LineChart
              style={{ flex: 1 }}
              data={coin.payload.data.coin.sparkline}
              svg={{ stroke: coin.payload.data.coin.color || Colors.facebook }}
              contentInset={{ top: 20, bottom: 20 }}
              animate
          />
          </View>
          {/* <BarChart data={coin.payload.data.coin.sparkline} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }} /> */}
          <WebView
            style={{flex: 1, overflow: 'hidden'}}
            source={{ html: coin.payload.data.coin.description }} />
        </View> : <BarIndicator color={Colors.facebook} style={styles.activity} />}
    </ScrollView>
  )
}

CryptoOverview.propTypes = {
  uuid: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    refCurrencyUuid: state.uuid,
    timePeriod: state.timePeriod,
    coin: state.coin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCoin: (uuid, referenceCurrencyUuid, timePeriod) => dispatch(CoinActions.coinRequest(uuid, referenceCurrencyUuid, timePeriod))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoOverview)
