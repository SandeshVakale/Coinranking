import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import TimePeriodActions from '../Redux/TimePeriodRedux'
import OrderByActions from '../Redux/OrderByRedux'
import OrderDirectinRedux from '../Redux/OrderDirectionRedux'
import OrderByExchangesActions from '../Redux/OrderByExchangesRedux'
import OrderByMarketsAtions from '../Redux/OrderByMarketsRedux'

// Styles
import styles from './Styles/SettingsStyle'
import AppBar from '../Components/AppBar'
import { Colors } from '../Themes'

class Settings extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    const { uuid, setOrderByMarkets, orderByMark, setTimePeriod, timePeriod, orderBy, setOrderDirection, orderDirection, setOrderBy, orderByExch, setOrderByExchanges } = this.props

    const timePeriodData = [
      {
        name: 'Day',
        value: '24h'
      },
      {
        name: 'Week',
        value: '7d'
      },
      {
        name: 'Month',
        value: '30d'
      },
      {
        name: 'Year',
        value: '1y'
      },
      {
        name: 'All',
        value: '5y'
      }
    ]

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

    const orderDirectionData = [
      {
        name: 'Descending',
        value: 'desc'
      },
      {
        name: 'Ascending',
        value: 'asc'
      }
    ]

    const list = [
      {
        title: 'Time Period',
        icon: 'av-timer',
        subtitle: timePeriod.data.name,
        onPress: () => this.props.navigation.navigate('Selector', {list: timePeriodData, onPressItem: setTimePeriod, itemName: timePeriod.data.name})
      },
      {
        title: 'Currency',
        icon: 'euro-symbol',
        subtitle: uuid.data && uuid.data.symbol,
        onPress: () => this.props.navigation.navigate('Currencies')
      },
      {
        title: 'Order By Crypto',
        icon: 'format-list-numbered',
        subtitle: orderBy.data.name,
        onPress: () => this.props.navigation.navigate('Selector', {list: orderByCoins, onPressItem: setOrderBy, itemName: orderBy.data.name})
      },
      {
        title: 'Order By Exchanges',
        icon: 'format-list-numbered',
        subtitle: orderByExch.data.name,
        onPress: () => this.props.navigation.navigate('Selector', {list: orderByExhanges, onPressItem: setOrderByExchanges, itemName: orderByExch.data.name})
      },
      {
        title: 'Order By Markets',
        icon: 'format-list-numbered',
        subtitle: orderByMark.data.name,
        onPress: () => this.props.navigation.navigate('Selector', {list: orderByMarkets, onPressItem: setOrderByMarkets, itemName: orderByMark.data.name})
      },
      {
        title: 'Order Direction',
        icon: 'format-line-spacing',
        subtitle: orderDirection.data.name,
        onPress: () => this.props.navigation.navigate('Selector', {list: orderDirectionData, onPressItem: setOrderDirection, itemName: orderDirection.data.name})
      }
    ]
    return (
      <View style={styles.container}>
        <AppBar title={'Settings'} iconLeft={'chevron-left'} onPressLeft={() => this.props.navigation.goBack()} />
        {
          list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              subtitle={item.subtitle}
              leftIcon={{ name: item.icon, color: Colors.facebook, size: 30 }}
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
    uuid: state.uuid,
    timePeriod: state.timePeriod,
    orderBy: state.orderBy,
    orderDirection: state.orderDirection,
    orderByExch: state.orderByExchanges,
    orderByMark: state.orderByMarkets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTimePeriod: (item) => dispatch(TimePeriodActions.timePeriodRequest(item)),
    setOrderBy: (item) => dispatch(OrderByActions.orderByRequest(item)),
    setOrderDirection: (item) => dispatch(OrderDirectinRedux.orderDirectionRequest(item)),
    setOrderByExchanges: (item) => dispatch(OrderByExchangesActions.orderByExchangesRequest(item)),
    setOrderByMarkets: (item) => dispatch(OrderByMarketsAtions.orderByMarketsRequest(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
