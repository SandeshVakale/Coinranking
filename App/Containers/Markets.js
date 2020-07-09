import React, { useState } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ExchangesStyle'
import AppBar from '../Components/AppBar'
import { Icon, SearchBar } from 'react-native-elements'
import { Colors } from '../Themes'
import Filter from '../Components/Filter'

const Markets = (props) => {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  const [search, setSearch] = useState('')

  return (
    <View style={styles.container}>
      <AppBar title={'Markets'} onPressRight={() => this.props.navigation.navigate('Settings')} onPressLeft={() => this.props.navigation.navigate('Search')} iconRight={'settings'} iconLeft={'search'} />
      <Filter {...props} />
      <SearchBar
        placeholder='Quick Search'
        onChangeText={setSearch}
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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Markets)
