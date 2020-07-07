import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

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
    const { uuid } = this.props

    const list = [
      {
        title: 'Time Period',
        icon: 'av-timer',
        subtitle: 'Day',
        onPress: () => this.props.navigation.navigate('Selector')
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
        subtitle: 'Market Cap',
        onPress: () => this.props.navigation.navigate('Selector')
      },
      {
        title: 'Order Direction',
        icon: 'format-line-spacing',
        subtitle: 'ASC',
        onPress: () => this.props.navigation.navigate('Selector')
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
    uuid: state.uuid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
