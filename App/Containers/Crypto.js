import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { SearchBar, Icon } from 'react-native-elements'
import { SearchableFlatList } from 'react-native-searchable-list'
import { BarIndicator } from 'react-native-indicators'
import AppBar from '../Components/AppBar'
import Error from '../Components/Error'
import CoinCard from '../Components/CoinCard'
import Filter from '../Components/Filter'
import _ from 'lodash'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import CoinsActions from '../Redux/CoinsRedux'

// Styles
import styles from './Styles/CryptoStyle'
import { Colors } from '../Themes'

const Crypto = (props) => {
  const [refreshing, setRefreshing] = useState(false)
  const { getCoins, refCurrencyUuid, timePeriod, orderBy, orderDirection, coins } = props
  useEffect(() => {
    getCoins(refCurrencyUuid.data.uuid, timePeriod.data.value, orderBy.data.value, orderDirection.data.value)
  }, [ refCurrencyUuid, timePeriod, orderBy, orderDirection ])

  useEffect(() => {
    setRefreshing(false)
  }, [coins])

  const keyExtractor = (item, index) => index.toString()
  const [search, setSearch] = useState('')
  return (
    <View style={styles.container}>
      <AppBar title={'Cryptocurrencies'} onPressRight={() => props.navigation.navigate('Settings')} onPressLeft={() => props.navigation.navigate('Search')} iconRight={'settings'} iconLeft={'search'} />
      <Filter {...props} />
      <SearchBar
        placeholder='Crypto Search'
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
      <Error data={coins} onPress={() => getCoins(refCurrencyUuid.data.uuid, timePeriod.data.value, orderBy.data.value, orderDirection.data.value)} />
      {coins.fetching === false && coins.error === null
        ? <SearchableFlatList
          searchAttribute={'name'}
          keyExtractor={keyExtractor}
          searchTerm={search}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true)
            getCoins(refCurrencyUuid.data.uuid, timePeriod.data.value, orderBy.data.value, orderDirection.data.value)
          }
          }
          data={_.get(coins, 'payload.data.coins', [])}
          renderItem={(item) => <CoinCard data={item} onPress={() => props.navigation.navigate('CryptoDetail', {item})} />}
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
