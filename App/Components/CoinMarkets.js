import React, { useEffect } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import styles from './Styles/CoinMarketsStyle'
import PropTypes from 'prop-types'
import CoinMarketsActions from '../Redux/CoinMarketsRedux'
import { connect } from 'react-redux'
import { Colors } from '../Themes'
import Error from './Error'
import _ from 'lodash'
import { ListItem } from 'react-native-elements'
import { BarIndicator } from 'react-native-indicators'

const CoinMarkets = (props) => {
  const { uuid, name, getCoinMarkets, refCurrencyUuid, orderDirection, coinMarkets } = props
  const keyExtractor = (item, index) => index.toString()
  useEffect(() => {
    getCoinMarkets(uuid, refCurrencyUuid.data.uuid, orderDirection.data.value)
  }, [ refCurrencyUuid, orderDirection ])

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionText, {color: Colors.charcoal, fontSize: 24}]}>{name} exchange - List of markets</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Settings')} >
        <Text style={[styles.sectionText, { color: Colors.charcoal, marginTop: -30 }]} >Currency {refCurrencyUuid.data.name} | Order {orderDirection.data.name}</Text>
      </TouchableOpacity>
      <Error data={coinMarkets} onPress={() => getCoinMarkets(uuid, refCurrencyUuid.data.uuid, orderDirection.data.value)}/>
      {coinMarkets.fetching === false && coinMarkets.error === null
        ? <FlatList
          keyExtractor={keyExtractor}
          data={_.get(coinMarkets, 'payload.data.markets')}
          renderItem={(item) => <ListItem onPress={() => props.navigation.navigate('MarketDetails', {uuid: item.item.uuid, name: `${item.item.baseSymbol}/${item.item.quoteSymbol}`})} containerStyle={{ backgroundColor: Colors.transparent, underlayColor: Colors.transparent }} title={`${item.item.baseSymbol}/${item.item.quoteSymbol}`} subtitle={item.item.exchangeName} leftAvatar={{ source: _.get(item, 'item.exchangeIconUrl') && { uri: _.get(item, 'item.exchangeIconUrl').replace(/\.(svg)($|\?)/, '.png$2') } }} bottomDivider
            chevron badge={{ value: `${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.ceil(_.get(item, 'item.price'), 2)}` }} />}
        /> : <BarIndicator color={Colors.facebook} style={styles.activity} />}
    </View>
  )
}

CoinMarkets.propTypes = {
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    refCurrencyUuid: state.uuid,
    orderDirection: state.orderDirection,
    coinMarkets: state.coinMarkets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCoinMarkets: (uuid, referenceCurrencyUuid, orderDirection) => dispatch(CoinMarketsActions.coinMarketsRequest(uuid, referenceCurrencyUuid, orderDirection))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinMarkets)
