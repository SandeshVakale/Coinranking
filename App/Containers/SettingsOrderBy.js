import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import OrderByActions from '../Redux/OrderByRedux'
import OrderByExchangesActions from '../Redux/OrderByExchangesRedux'
import OrderByMarketsAtions from '../Redux/OrderByMarketsRedux'

// Styles
import styles from './Styles/SettingsStyle'
import AppBar from '../Components/AppBar'
import { Colors } from '../Themes'

class SettingsOrderBy extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    const { setOrderByMarkets, orderByMark, orderBy, setOrderBy, orderByExch, setOrderByExchanges } = this.props

    const orderByCoins = [
      {
        name: 'Price',
        value: 'price'
      },
      {
        name: 'Market Cap',
        value: 'marketCap'
      },
      {
        name: 'Change',
        value: 'change'
      }
    ]

    const orderByMarkets = [
      {
        name: 'Price',
        value: 'price'
      },
      {
        name: '24h Volume',
        value: '24hVolume'
      }
    ]

    const orderByExhanges = [
      {
        name: '24h Volume',
        value: '24hVolume'
      },
      {
        name: 'Markets',
        value: 'numberOfMarkets'
      },
      {
        name: 'Last Ticker',
        value: 'lastTickerCreatedAt'
      }
    ]

    const list = [
      {
        title: 'Crypto',
        icon: 'death-star',
        subtitle: orderBy.data.name,
        onPress: () => this.props.navigation.navigate('Selector', {list: orderByCoins, onPressItem: setOrderBy, itemName: orderBy.data.name})
      },
      {
        title: 'Exchanges',
        icon: 'chart-bar',
        subtitle: orderByExch.data.name,
        onPress: () => this.props.navigation.navigate('Selector', {list: orderByExhanges, onPressItem: setOrderByExchanges, itemName: orderByExch.data.name})
      },
      {
        title: 'Markets',
        icon: 'chart-bubble',
        subtitle: orderByMark.data.name,
        onPress: () => this.props.navigation.navigate('Selector', {list: orderByMarkets, onPressItem: setOrderByMarkets, itemName: orderByMark.data.name})
      }
    ]
    return (
      <View style={styles.container}>
        <AppBar title={'Order Settings'} iconLeft={'chevron-left'} onPressLeft={() => this.props.navigation.goBack()} />
        {
          list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              subtitle={item.subtitle}
              leftIcon={{ name: item.icon, color: Colors.facebook, size: 30, type: 'material-community' }}
              bottomDivider
              chevron
              onPress={item.onPress}
            />
          ))
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orderBy: state.orderBy,
    orderByExch: state.orderByExchanges,
    orderByMark: state.orderByMarkets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOrderBy: (item) => dispatch(OrderByActions.orderByRequest(item)),
    setOrderByExchanges: (item) => dispatch(OrderByExchangesActions.orderByExchangesRequest(item)),
    setOrderByMarkets: (item) => dispatch(OrderByMarketsAtions.orderByMarketsRequest(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsOrderBy)
