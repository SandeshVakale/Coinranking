import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ExchangesActions from '../Redux/ExchangesRedux'

// Styles
import styles from './Styles/ExchangesStyle'
import AppBar from '../Components/AppBar'
import { SearchBar, Icon, ListItem } from 'react-native-elements'
import { SearchableFlatList } from 'react-native-searchable-list'
import { Colors } from '../Themes'
import { BarIndicator } from 'react-native-indicators'
import Error from '../Components/Error'

const Exchanges = (props) => {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  const keyExtractor = (item, index) => index.toString()
  const [search, setSearch] = useState('')
  const { getExchanges, exchanges, refCurrencyUuid, orderDirection, orderByExchanges } = props

  useEffect(() => {
    getExchanges(refCurrencyUuid.data.uuid, orderByExchanges.data.value, orderDirection.data.value)
  }, [ refCurrencyUuid, orderByExchanges, orderDirection ])

  return (
    <View style={styles.container}>
      <AppBar title={'Exchanges'} onPressRight={() => props.navigation.navigate('Settings')} onPressLeft={() => props.navigation.navigate('Search')} iconRight={'settings'} iconLeft={'search'} />
      <Error data={exchanges} onPress={() => getExchanges(refCurrencyUuid.data.uuid, orderByExchanges.data.value, orderDirection.data.value)} />
      {exchanges.fetching === false && exchanges.error === null
        ? <SearchableFlatList
          searchAttribute={'name'}
          keyExtractor={keyExtractor}
          searchTerm={search}
          data={_.get(exchanges, 'payload.data.exchanges')}
          renderItem={(item) => <ListItem containerStyle={{ backgroundColor: Colors.transparent }} title={item.item.name} subtitle={`${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.ceil(_.get(item, 'item.24hVolume'), 2)}`} leftAvatar={{ source: _.get(item, 'item.iconUrl') && { uri: _.get(item, 'item.iconUrl').replace(/\.(svg)($|\?)/, '.png$2') } }} bottomDivider
            chevron
            badge={{ value: `${_.ceil(_.get(item, 'item.marketShare'), 2)} %` }} />}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
          ListHeaderComponent={() => <View >
            <TouchableOpacity onPress={() => props.navigation.navigate('Settings')} >
              <Text style={[styles.sectionText, { color: Colors.charcoal }]} >{refCurrencyUuid.data.name} | {orderByExchanges.data.name} | {orderDirection.data.name} </Text>
            </TouchableOpacity>
            <SearchBar
              placeholder='Exchanges Search'
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
          </View>}
        /> : <BarIndicator color={Colors.facebook} style={styles.activity} />}
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    refCurrencyUuid: state.uuid,
    exchanges: state.exchanges,
    orderDirection: state.orderDirection,
    orderByExchanges: state.orderByExchanges
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExchanges: (referenceCurrencyUuid, orderBy, orderDirection) => dispatch(ExchangesActions.exchangesRequest(referenceCurrencyUuid, orderBy, orderDirection))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchanges)
