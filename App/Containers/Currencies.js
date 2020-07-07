import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import CurrenciesActions from '../Redux/CurrenciesRedux'
import UuidActions from '../Redux/UuidRedux'

// Styles
import styles from './Styles/CurrenciesStyle'
import AppBar from '../Components/AppBar'
import { Colors } from '../Themes'
import { BarIndicator } from 'react-native-indicators'
import Error from '../Components/Error'

class Currencies extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  componentDidMount () {
    const { getCurrencies } = this.props
    getCurrencies()
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => {
    const { setUuid, uuid } = this.props
    return (
      <ListItem
        title={item.name}
        subtitle={item.symbol}
        leftAvatar={!!item.iconUrl && { source: { uri: item.iconUrl.replace(/\.(svg)($|\?)/, '.png$2') } }}
        bottomDivider
        checkmark={uuid.data && uuid.data.uuid === item.uuid}
        onPress={() => {
          setUuid(item)
          this.props.navigation.goBack()
        }}
    />
    )
  }
  render () {
    const { currency } = this.props
    return (
      <View style={styles.container}>
        <AppBar title={'Currencies'} iconLeft={'chevron-left'} onPressLeft={() => this.props.navigation.goBack()} />
        <Error data={currency} />
        {currency.fetching === false && currency.error === null
          ? <FlatList
            keyExtractor={this.keyExtractor}
            data={currency.payload.data.currencies}
            renderItem={this.renderItem}
        /> : <BarIndicator color={Colors.facebook} style={styles.activity} />}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    uuid: state.uuid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrencies: () => dispatch(CurrenciesActions.currenciesRequest()),
    setUuid: (item) => dispatch(UuidActions.uuidRequest(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Currencies)
