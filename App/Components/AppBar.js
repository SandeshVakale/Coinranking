import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Feather'
import NavigationBar from 'react-native-navbar'
import { Colors } from '../Themes'

export default class AppBar extends Component {
  // Prop type warnings
  static propTypes = {
    title: PropTypes.string,
    onPressRight: PropTypes.func,
    onPressLeft: PropTypes.func,
    iconLeft: PropTypes.string,
    iconRight: PropTypes.string
  }

  render () {
    const { title, onPressRight, onPressLeft, iconLeft, iconRight } = this.props
    const titleConfig = {
      title: title || ''
    }
    return (
      <NavigationBar
        title={titleConfig}
        rightButton={iconRight && <Icon style={{ padding: 5 }} name={iconRight} size={30} color={Colors.facebook} onPress={onPressRight} />}
        leftButton={iconLeft && <Icon style={{ padding: 5 }} name={iconLeft} size={30} color={Colors.facebook} onPress={onPressLeft} />}
        />
    )
  }
}
