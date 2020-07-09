import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from './Styles/ErrorStyle'
import { Icon, Button } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import colors from '../Themes/Colors'

export default class Error extends Component {
  // // Prop type warnings
  static propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func
  }

  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    const { data, onPress } = this.props
    return (
      <View style={styles.container}>
        { data.error === true && data.payload && <Animatable.View animation='fadeInUp' style={styles.darkLabelContainer}>
          <Icon name={'error'} color={colors.facebook} size={80} type={'material-icon'} />
          <Text style={styles.sectionTitle}>{data.payload.status}</Text>
          <Text style={[styles.sectionText, { color: colors.error }]}>{(data.payload.data && data.payload.data.message) || data.payload.problem}</Text>
          <Button title={'Retry'} onPress={onPress} type={'outline'} />
        </Animatable.View> }
      </View>
    )
  }
}
