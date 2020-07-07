import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { SearchBar, Icon } from 'react-native-elements'
import AppBar from '../Components/AppBar'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CryptoStyle'
import { Colors } from '../Themes'

class Crypto extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}

  state = {
    search: ''
  };

  updateSearch = (search) => {
    this.setState({ search })
  };
  // }

  render () {
    const { search } = this.state
    return (
      <View style={styles.container}>
        <AppBar title={'Cryptocurrencies'} onPressRight={() => this.props.navigation.navigate('Settings')} onPressLeft={() => this.props.navigation.navigate('Search')} iconRight={'settings'} iconLeft={'search'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Crypto)
