import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MarketDetailsStyle'
import AppBar from '../Components/AppBar'
import Error from '../Components/Error'

const MarketDetails = (props) => {
  const { name, uuid } = props.navigation.state.params
  return (
    <View style={styles.container}>
      <AppBar title={name} onPressRight={() => props.navigation.navigate('Settings')} onPressLeft={() => props.navigation.goBack()} iconRight={'settings'} iconLeft={'chevron-left'} />

    </View>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketDetails)
