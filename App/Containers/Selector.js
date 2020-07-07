import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SelectorStyle'
import AppBar from '../Components/AppBar'
import { ListItem } from 'react-native-elements'
import TimePeriodActions from '../Redux/TimePeriodRedux'

class Selector extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    const { list, onPressItem, itemName } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <AppBar title={'Select'} iconLeft={'chevron-left'} onPressLeft={() => this.props.navigation.goBack()} />
        {
          list.map((item, i) => (
            <ListItem
              key={i}
              title={item.name}
              bottomDivider
              checkmark={itemName === item.name}
              onPress={() => {
                onPressItem(item)
                this.props.navigation.goBack()
              }}
            />
          ))
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    timePeriod: state.timePeriod
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTimePeriod: () => dispatch(TimePeriodActions.timePeriodRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector)
