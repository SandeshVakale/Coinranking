import React, { Component } from 'react'
import { View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'
import {
  BarIndicator
} from 'react-native-indicators'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SplashScreenStyle'
import { Colors } from '../Themes'

class SplashScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.groupContainer}>
          <Animatable.Text animation='slideInLeft' style={styles.title}>COINDATA</Animatable.Text>
          <Animatable.View style={styles.vLine} />
          <Animatable.Text animation='fadeInUp' style={styles.subTitle}>Coinranking V2</Animatable.Text>
        </View>
        <BarIndicator color={Colors.facebook} style={styles.activity} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
