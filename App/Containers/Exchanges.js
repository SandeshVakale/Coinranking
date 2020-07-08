import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ExchangesStyle'
import AppBar from '../Components/AppBar'
import { Icon, SearchBar } from 'react-native-elements'
import { Colors } from '../Themes'

class Exchanges extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  state = {
    search: ''
  };

  updateSearch = (search) => {
    this.setState({ search })
  };

  render () {
    const { search } = this.state
    return (
      <View style={styles.container}>
        <AppBar title={'Exchanges'} onPressRight={() => this.props.navigation.navigate('Settings')} onPressLeft={() => this.props.navigation.navigate('Search')} iconRight={'settings'} iconLeft={'search'} />
        <SearchBar
          placeholder='Quick Search'
          onChangeText={this.updateSearch}
          value={search}
          platform={'android'}
          containerStyle={styles.searchBar}
          searchIcon={<Icon
            name='text-box-search'
            type='material-community'
            color={Colors.facebook}
            size={30}
          />}
          leftIconContainerStyle={{ paddingLeft: 10 }}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Exchanges)
