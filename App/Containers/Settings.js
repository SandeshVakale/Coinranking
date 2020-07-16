import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import TimePeriodActions from '../Redux/TimePeriodRedux'
import OrderDirectinRedux from '../Redux/OrderDirectionRedux'

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
    const { uuid, setTimePeriod, timePeriod, setOrderDirection, orderDirection } = this.props

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
        title: 'Order By',
        icon: 'format-list-numbered',
        onPress: () => this.props.navigation.navigate('SettingsOrderBy')
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
    orderDirection: state.orderDirection
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTimePeriod: (item) => dispatch(TimePeriodActions.timePeriodRequest(item)),
    setOrderDirection: (item) => dispatch(OrderDirectinRedux.orderDirectionRequest(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
