import React, { useEffect } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import _ from 'lodash'
import styles from './Styles/CoinExchangesStyle'
import { Colors } from '../Themes'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CoinExchangesActions from '../Redux/CoinExchangesRedux'
import Error from './Error'
import { BarIndicator } from 'react-native-indicators'

const CoinExchanges = (props) => {
  const { uuid, name, getCoinExchanges, refCurrencyUuid, orderDirection, coinExchanges } = props

  useEffect(() => {
    getCoinExchanges(uuid, refCurrencyUuid.data.uuid, orderDirection.data.value)
  }, [ refCurrencyUuid, orderDirection ])
  const keyExtractor = (item, index) => index.toString()
  return (
    <View style={styles.container}>
      <Text style={[styles.sectionText, {color: Colors.charcoal, fontSize: 24}]}>{name} exchanges list and rates</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Settings')} >
        <Text style={[styles.sectionText, { color: Colors.charcoal, marginTop: -30 }]} >Currency {refCurrencyUuid.data.name} | Order {orderDirection.data.name}</Text>
      </TouchableOpacity>
      <Error data={coinExchanges} onPress={() => getCoinExchanges(uuid, refCurrencyUuid.data.uuid, orderDirection.data.value)} />
      {coinExchanges.fetching === false && coinExchanges.error === null
        ? <FlatList data={_.get(coinExchanges, 'payload.data.exchanges')}
          keyExtractor={keyExtractor}
          renderItem={(item) => <ListItem containerStyle={{ backgroundColor: Colors.transparent }} title={item.item.name} subtitle={`${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.ceil(_.get(item, 'item.price'), 5)}`} leftAvatar={{ source: _.get(item, 'item.iconUrl') && { uri: _.get(item, 'item.iconUrl').replace(/\.(svg)($|\?)/, '.png$2') } }}
            bottomDivider
            onPress={() => props.navigation.navigate('ExchangeDetails', {item})}
            chevron />} /> : <BarIndicator color={Colors.facebook} style={styles.activity} />}
    </View>
  )
}

CoinExchanges.propTypes = {
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    refCurrencyUuid: state.uuid,
    orderDirection: state.orderDirection,
    coinExchanges: state.coinExchanges
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCoinExchanges: (uuid, referenceCurrencyUuid, orderDirection) => dispatch(CoinExchangesActions.coinExchangesRequest(uuid, referenceCurrencyUuid, orderDirection))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinExchanges)
