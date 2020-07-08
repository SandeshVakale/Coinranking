import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import _ from 'lodash'
import styles from './Styles/CoinCardStyle'
import { Colors } from '../Themes'
import { connect } from 'react-redux'

const CoinCard = (props) => {
  // // Prop type warnings
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  const { item } = props.data
  const { uuid } = props
  console.log(uuid)
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }} >
        <View style={{ flexDirection: 'row' }} >
          <Image style={{ height: 40, width: 40, resizeMode: 'contain', marginHorizontal: 10 }} source={{
            uri: item.iconUrl.replace(/\.(svg)($|\?)/, '.png$2')
          }} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontWeight: 'bold', color: Colors.charcoal, fontSize: 20 }} >{item.name}</Text>
            <Text style={{color: Colors.charcoal}} >{item.symbol}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'column' }} >
          <Text style={{ fontWeight: 'bold', color: Colors.charcoal, fontSize: 20 }} >{uuid.data.sign} {_.ceil(item.price, 2)}</Text>
          <Text style={{color: Math.sign(item.change) === 1 ? 'green' : Colors.error, textAlign: 'right'}} >{_.ceil(item.change, 2)}%</Text>
        </View>
      </View>
    </View>
  )
}

CoinCard.propTypes = {
  data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    uuid: state.uuid,
    timePeriod: state.timePeriod
  }
}
export default connect(mapStateToProps, null)(CoinCard)
