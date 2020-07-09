import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { SearchBar, Icon } from 'react-native-elements'
import { SearchableFlatList } from "react-native-searchable-list"
import AppBar from '../Components/AppBar'
import Error from '../Components/Error'
import CoinCard from '../Components/CoinCard'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import CoinsActions from '../Redux/CoinsRedux'

// Styles
import styles from './Styles/CryptoStyle'
import { Colors } from '../Themes'
import { BarIndicator } from 'react-native-indicators'

const Crypto = (props) => {
  const { getCoins, refCurrencyUuid, timePeriod, orderBy, orderDirection, coins } = props
  useEffect(() => {
    getCoins(refCurrencyUuid.data.uuid, timePeriod.data.value, orderBy.data.value, orderDirection.data.value)
  }, [ refCurrencyUuid, timePeriod, orderBy, orderDirection ])

  const keyExtractor = (item, index) => index.toString()
  const [search, setSearch] = useState('')
  console.log('search', search)
  return (
    <View style={styles.container}>
      <AppBar title={'Cryptocurrencies'} onPressRight={() => props.navigation.navigate('Settings')} onPressLeft={() => props.navigation.navigate('Search')} iconRight={'settings'} iconLeft={'search'} />
      <Text style={[styles.sectionText, { color: Colors.charcoal }]} >{refCurrencyUuid.data.name} | {timePeriod.data.name} | {orderBy.data.name} | {orderDirection.data.name} </Text>
      <SearchBar
        placeholder='Quick Search'
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
      <Error data={coins} onPress={() => getCoins(refCurrencyUuid.data.uuid, timePeriod.data.value, orderBy.data.value, orderDirection.data.value)} />
      {coins.fetching === false && coins.error === null
        ? <SearchableFlatList
          searchAttribute={'name'}
          keyExtractor={keyExtractor}
          searchTerm={search}
          data={coins.payload.data.coins}
          renderItem={(item) => <CoinCard data={item} />}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
        /> : <BarIndicator color={Colors.facebook} style={styles.activity} />}
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    refCurrencyUuid: state.uuid,
    timePeriod: state.timePeriod,
    orderBy: state.orderBy,
    orderDirection: state.orderDirection,
    coins: state.coins
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCoins: (referenceCurrencyUuid, timePeriod, orderBy, orderDirection) => dispatch(CoinsActions.coinsRequest(referenceCurrencyUuid, timePeriod, orderBy, orderDirection))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Crypto)
