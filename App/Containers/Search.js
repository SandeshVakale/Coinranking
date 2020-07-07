import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import AppBar from '../Components/AppBar'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SearchStyle'

class Search extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <View style={styles.container}>
        <AppBar iconLeft={'chevron-left'} onPressLeft={() => this.props.navigation.goBack()} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)
