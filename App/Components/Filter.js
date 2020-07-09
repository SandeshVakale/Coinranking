import React from 'react'
// import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native'
import styles from './Styles/FilterStyle'
import { Colors } from '../Themes'
import { connect } from 'react-redux'

const Filter = (props) => {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  const { refCurrencyUuid, timePeriod, orderDirection, orderBy } = props
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('Settings')} >
      <Text style={[styles.sectionText, { color: Colors.charcoal }]} >{refCurrencyUuid.data.name} | {timePeriod.data.name} | {orderBy.data.name} | {orderDirection.data.name} </Text>
    </TouchableOpacity>
  )
}

const mapStateToProps = (state) => {
  return {
    refCurrencyUuid: state.uuid,
    timePeriod: state.timePeriod,
    orderBy: state.orderBy,
    orderDirection: state.orderDirection
  }
}

export default connect(mapStateToProps, null)(Filter)
