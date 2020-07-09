import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import _ from 'lodash'
import { LineChart } from 'react-native-svg-charts'
import styles from './Styles/CoinCardStyle'
import { Colors } from '../Themes'
import { connect } from 'react-redux'

const CoinCard = (props) => {
  const { item } = props.data
  const { uuid } = props
  const toNumbers = arr => arr.map(Number)
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'column', justifyContent: 'space-around' }} >
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
            <Text style={{ fontWeight: 'bold', color: Colors.charcoal, fontSize: 20 }} >{uuid.data.sign || uuid.data.symbol} {_.ceil(item.price, 2)}</Text>
            <Text style={{color: Math.sign(item.change) === 1 ? 'green' : Colors.error, textAlign: 'right'}} >{_.ceil(item.change, 2)}%</Text>
          </View>
        </View>
        <LineChart
          style={{ height: 100 }}
          data={toNumbers(item.sparkline)}
          svg={{ stroke: item.color ? item.color : Colors.facebook }}
          contentInset={{ top: 20, bottom: 20 }}
          animate
        />
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
