import React, { useEffect } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import styles from './Styles/ExchangeCoinsStyle'
import PropTypes from 'prop-types'
import ExchangeCoinsActions from '../Redux/ExchangeCoinsRedux'
import { connect } from 'react-redux'
import { Colors } from '../Themes'
import Error from './Error'
import _ from 'lodash'
import { ListItem } from 'react-native-elements'
import { BarIndicator } from 'react-native-indicators'

const ExchangeCoins = (props) => {
  const { uuid, name, getExchangeCoins, refCurrencyUuid, orderDirection, exchangeCoins } = props
  useEffect(() => {
    getExchangeCoins(uuid, refCurrencyUuid.data.uuid, orderDirection.data.value)
  }, [ refCurrencyUuid, orderDirection, uuid, name ])
  const keyExtractor = (item, index) => index.toString()
  return (
    <View style={styles.container}>
      <Text style={[styles.sectionText, {color: Colors.charcoal, fontSize: 24}]}>{name} exchanges Cryptocurrencies and listings</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Settings')} >
        <Text style={[styles.sectionText, { color: Colors.charcoal, marginTop: -30 }]} >Currency {refCurrencyUuid.data.name} | Order {orderDirection.data.name}</Text>
      </TouchableOpacity>
      <Error data={exchangeCoins} onPress={() => getExchangeCoins(uuid, refCurrencyUuid.data.uuid, orderDirection.data.value)} />
      {exchangeCoins.fetching === false && exchangeCoins.error === null
        ? <FlatList data={_.get(exchangeCoins, 'payload.data.coins')}
          keyExtractor={keyExtractor}
          renderItem={(item) => <ListItem containerStyle={{ backgroundColor: Colors.transparent }} title={item.item.name} subtitle={item.item.symbol} badge={{value: `${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.ceil(_.get(item, 'item.price'), 2)}`}} leftAvatar={{ source: _.get(item, 'item.iconUrl') && { uri: _.get(item, 'item.iconUrl').replace(/\.(svg)($|\?)/, '.png$2') } }}
            bottomDivider
            onPress={() => props.navigation.navigate('CryptoDetail', {item})}
            chevron />} /> : <BarIndicator color={Colors.facebook} style={styles.activity} />}
    </View>
  )
}

ExchangeCoins.propTypes = {
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    refCurrencyUuid: state.uuid,
    orderDirection: state.orderDirection,
    exchangeCoins: state.exchangeCoins
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExchangeCoins: (uuid, referenceCurrencyUuid, orderDirection) => dispatch(ExchangeCoinsActions.exchangeCoinsRequest(uuid, referenceCurrencyUuid, orderDirection))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeCoins)
