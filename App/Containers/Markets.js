import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import MarketsActions from '../Redux/MarketsRedux'

// Styles
import _ from 'lodash'
import styles from './Styles/ExchangesStyle'
import AppBar from '../Components/AppBar'
import { Icon, SearchBar, ListItem } from 'react-native-elements'
import { Colors } from '../Themes'
import { SearchableFlatList } from 'react-native-searchable-list'
import Error from '../Components/Error'
import { BarIndicator } from 'react-native-indicators'

const Markets = (props) => {
  const [refreshing, setRefreshing] = useState(false)
  const { getMarkets, refCurrencyUuid, orderByMarkets, orderDirection, markets } = props
  useEffect(() => {
    getMarkets(refCurrencyUuid.data.uuid, orderByMarkets.data.value, orderDirection.data.value)
  }, [ refCurrencyUuid, orderByMarkets, orderDirection ])

  useEffect(() => {
    setRefreshing(false)
  }, [markets])
  const keyExtractor = (item, index) => index.toString()
  const [search, setSearch] = useState('')
  return (
    <View style={styles.container}>
      <AppBar title={'Markets'} onPressRight={() => props.navigation.navigate('Settings')} onPressLeft={() => props.navigation.navigate('Search')} iconRight={'settings'} iconLeft={'search'} />
      <TouchableOpacity onPress={() => props.navigation.navigate('Settings')} >
        <Text style={[styles.sectionText, { color: Colors.charcoal }]} >{refCurrencyUuid.data.name} | {orderByMarkets.data.name} | {orderDirection.data.name} </Text>
      </TouchableOpacity>
      <SearchBar
        placeholder='Markets Search'
        placeholderTextColor={Colors.charcoal}
        onChangeText={setSearch}
        value={search}
        platform={'android'}
        containerStyle={styles.searchBar}
        searchIcon={<Icon
          name='text-box-search'
          type='material-community'
          color={Colors.facebook}
          size={30}
        />}
        leftIconContainerStyle={{ paddingLeft: 10 }}
      />
      <Error data={markets} onPress={() => getMarkets(refCurrencyUuid.data.uuid, orderByMarkets.data.value, orderDirection.data.value)} />
      {markets.fetching === false && markets.error === null
        ? <SearchableFlatList
          searchAttribute={'exchange.name'}
          keyExtractor={keyExtractor}
          searchTerm={search}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true)
            getMarkets(refCurrencyUuid.data.uuid, orderByMarkets.data.value, orderDirection.data.value)
          }}
          data={_.get(markets, 'payload.data.markets', [])}
          renderItem={(item) => <ListItem onPress={() => props.navigation.navigate('MarketDetails', {uuid: item.item.uuid, name: `${item.item.base.symbol}/${item.item.quote.symbol}`})} containerStyle={{ backgroundColor: Colors.transparent, underlayColor: Colors.transparent }} title={`${item.item.base.symbol}/${item.item.quote.symbol}`} subtitle={item.item.exchange.name} leftAvatar={{ source: _.get(item, 'item.exchange.iconUrl') && { uri: _.get(item, 'item.exchange.iconUrl').replace(/\.(svg)($|\?)/, '.png$2') } }} bottomDivider
            chevron badge={{ value: `${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.ceil(_.get(item, 'item.price'), 2)}` }} />}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
        /> : <BarIndicator color={Colors.facebook} style={styles.activity} />}
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    refCurrencyUuid: state.uuid,
    timePeriod: state.timePeriod,
    orderByMarkets: state.orderByMarkets,
    orderDirection: state.orderDirection,
    markets: state.markets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMarkets: (referenceCurrencyUuid, orderBy, orderDirection) => dispatch(MarketsActions.marketsRequest(referenceCurrencyUuid, orderBy, orderDirection))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Markets)
