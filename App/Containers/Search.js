import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import AppBar from '../Components/AppBar'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SearchStyle'
import { Icon, SearchBar } from 'react-native-elements'
import { Colors } from '../Themes'

class Search extends Component {
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
        <AppBar title={'Search'} iconLeft={'chevron-left'} onPressLeft={() => this.props.navigation.goBack()} />
        <SearchBar
          placeholder='Deep Search'
          onChangeText={this.updateSearch}
          value={search}
          platform={'android'}
          containerStyle={styles.searchBar}
          searchIcon={<Icon
            name='search'
            type='ionicon'
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)
