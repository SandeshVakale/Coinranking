import React, { useEffect, useState } from 'react'
import { Text, Image, View } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import NftsActions from '../Redux/NftsRedux'

// Styles
import styles from './Styles/NftsStyle'
import AppBar from '../Components/AppBar'
import Video from 'react-native-video'
import { SearchBar, Icon } from 'react-native-elements'
import { SearchableFlatList } from 'react-native-searchable-list'
import { Colors, Images } from '../Themes'
import { BarIndicator } from 'react-native-indicators'
import Error from '../Components/Error'
import moment from 'moment'

const renderItem = (item) => (
  <View style={styles.listItemContainer}>
    <Text style={[styles.sectionText, { color: Colors.charcoal, fontWeight: 'bold', height: 10 }]}>{item.item.dappName}</Text>
    {item.item.video ? <Video source={{uri: item.item.video}}
      repeat
      muted
      style={{
        width: '100%',
        resizeMode: 'contain',
        height: 200
      }} />
    : <Image source={{ uri: item.item.image }} defaultSource={Images.logo} style={{
      width: '100%',
      resizeMode: 'contain',
      height: 200
    }} />}
    <Text style={[styles.subtitle, { color: Colors.charcoal, fontWeight: 'bold' }]}>
      {item.item.name} #{item.item.tokenId}
    </Text>
    <Text style={[styles.darkLabel, { color: Colors.charcoal, fontWeight: 'bold' }]}>
      $ {_.ceil(item.item.priceInDollar, 2)}
    </Text>
    <Text style={[styles.darkLabel, { color: Colors.charcoal, fontWeight: 'bold' }]}>
      {moment.unix(item.item.auctionCreatedAt).fromNow()}
    </Text>
  </View>
)

const Nfts = (props) => {
  const keyExtractor = (item, index) => index.toString()
  const [search, setSearch] = useState('')
  const { nfts, getNFTs } = props

  useEffect(() => {
    getNFTs()
  }, [])

  return (
    <View style={styles.container}>
      <AppBar title={'NFTs'} onPressRight={() => props.navigation.navigate('Settings')} onPressLeft={() => props.navigation.navigate('Search')} iconRight={'settings'} iconLeft={'search'} />
      <SearchBar
        placeholder='Exchanges Search'
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
      <Error data={nfts} onPress={() => getNFTs()} />
      {nfts.fetching === false && nfts.error === null
        ? <SearchableFlatList
          searchAttribute={'dappName'}
          keyExtractor={keyExtractor}
          searchTerm={search}
          data={_.get(nfts, 'payload.data.nfts', [])}
          renderItem={(item) => renderItem(item)}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
        /> : <BarIndicator color={Colors.facebook} style={styles.activity} />}
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    nfts: state.nfts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNFTs: () => dispatch(NftsActions.nftsRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nfts)
