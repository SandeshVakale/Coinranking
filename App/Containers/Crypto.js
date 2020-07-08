import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { SearchBar, Icon } from 'react-native-elements'
import AppBar from '../Components/AppBar'
import Error from '../Components/Error'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import CoinsActions from '../Redux/CoinsRedux'

// Styles
import styles from './Styles/CryptoStyle'
import { Colors } from '../Themes'

const Crypto = (props) => {
  const { getCoins, refCurrencyUuid, timePeriod, orderBy, orderDirection, coins } = props
  useEffect(() => {
    getCoins(refCurrencyUuid.data.uuid, timePeriod.data.value, orderBy.data.value, orderDirection.data.value)
  }, [ refCurrencyUuid, timePeriod, orderBy, orderDirection ])

  const [search, setSearch] = useState('')
  return (
    <View style={styles.container}>
      <AppBar title={'Cryptocurrencies'} onPressRight={() => props.navigation.navigate('Settings')} onPressLeft={() => props.navigation.navigate('Search')} iconRight={'settings'} iconLeft={'search'} />
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
