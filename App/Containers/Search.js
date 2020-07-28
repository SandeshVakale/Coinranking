import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import SearchSugeestionActions from '../Redux/SearchSuggestionsRedux'
import Error from '../Components/Error'
import _ from 'lodash'

// Styles
import styles from './Styles/ExchangesStyle'
import AppBar from '../Components/AppBar'
import { Card, Icon, ListItem, SearchBar } from 'react-native-elements'
import { Colors } from '../Themes'
import { BarIndicator } from 'react-native-indicators'

const Search = (props) => {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  const [search, setSearch] = useState('')

  const {getSearchResult, searchResult} = props
  useEffect(() => {
    getSearchResult()
  }, [])
  const getSearch = (item) => {
    setSearch(item)
    getSearchResult(item)
  }

  return (
    <View style={styles.container}>
      <AppBar title={'Search'} onPressRight={() => props.navigation.navigate('Settings')} onPressLeft={() => props.navigation.goBack()} iconRight={'settings'} iconLeft={'chevron-left'} />
      <Error data={searchResult} />
      <SearchBar
        placeholder='Deep Search'
        placeholderTextColor={Colors.charcoal}
        onChangeText={getSearch}
        value={search}
        platform={'android'}
        containerStyle={styles.searchBar}
        searchIcon={<Icon
          name='search'
          type='ionicon'
          color={Colors.facebook}
          size={30}
        />}
        leftIconContainerStyle={{ paddingLeft: 10 }}
      />
      {
        searchResult.fetching === false && searchResult.error === null ? <ScrollView style={{ marginBottom: 5 }}>
          <Card title={'Cryptocurrencies'}>
            {
              <FlatList data={_.get(searchResult, 'payload.data.coins')}
                renderItem={(item) => <ListItem title={item.item.name}
                  bottomDivider
                  chevron
                  onPress={() => props.navigation.navigate('CryptoDetail', {item})}
                  leftAvatar={{ source: _.get(item, 'item.iconUrl') && { uri: _.get(item, 'item.iconUrl').replace(/\.(svg)($|\?)/, '.png$2') } }} />} />
            }
          </Card>
          <Card title={'Exchanges'}>
            {
              <FlatList data={_.get(searchResult, 'payload.data.exchanges')}
                renderItem={(item) => <ListItem title={item.item.name}
                  bottomDivider
                  onPress={() => props.navigation.navigate('ExchangeDetails', {item})}
                  chevron
                  leftAvatar={{ source: _.get(item, 'item.iconUrl') && { uri: _.get(item, 'item.iconUrl').replace(/\.(svg)($|\?)/, '.png$2') } }} />} />
            }
          </Card>
          <Card title={'Markets'}>
            {
              <FlatList data={_.get(searchResult, 'payload.data.markets')}
                renderItem={(item) => <ListItem title={`${item.item.baseSymbol}/${item.item.quoteSymbol}`}
                  bottomDivider
                  chevron
                  onPress={() => props.navigation.navigate('MarketDetails', {uuid: item.item.uuid, name: `${item.item.baseSymbol}/${item.item.quoteSymbol}`})}
                  subtitle={item.item.exchangeName}
                  leftAvatar={{ source: _.get(item, 'item.exchangeIconUrl') && { uri: _.get(item, 'item.exchangeIconUrl').replace(/\.(svg)($|\?)/, '.png$2') } }} />} />
            }
          </Card>

        </ScrollView> : <BarIndicator color={Colors.facebook} style={styles.activity} />}
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    searchResult: state.searchResult
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchResult: (query) => dispatch(SearchSugeestionActions.searchSuggestionsRequest(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
