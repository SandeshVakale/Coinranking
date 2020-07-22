import React, {useEffect, useState} from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import CoinHistoryActions from '../Redux/CoinHistoryRedux'

// Styles
import styles from './Styles/DetailGraphStyle'
import _ from 'lodash'
import { Colors } from '../Themes'
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import Error from '../Components/Error'
import { BarIndicator } from 'react-native-indicators'
import moment from 'moment'
import { Circle, Text, G, Rect } from 'react-native-svg'
// import { Tooltip } from 'react-native-elements'

const Tooltip = ({
  refCurrencyUuid,
  x,
  y,
  tooltipX,
  tooltipY,
  color,
  index,
  dataLength
}) => {
  let xAxis = 4
  if (dataLength > 4) {
    if (index < 2) {
      xAxis = 35
    } else if (index > dataLength - 2) {
      xAxis = -20
    } else {
      xAxis = 4
    }
  }

  return (
    <G x={x(tooltipX) - 40} y={y(tooltipY)} transform='rotate(90, 32.5, 32.5)'>
      <G y={tooltipY > 9 ? 20 : -29} x={xAxis}>
        <Rect x={-2} y={0} height={60} width={130} stroke={color} fill='white' ry={20} rx={20} />
        <Rect x={-2} y={0} height={60} width={130} fill={color} ry={20} rx={20} />
        <Rect x={10} y={0} height={22} width={tooltipY > 9 ? 12 : 10} fill={color} />
        <Text x={6} y={20} stroke='#fff'>
          {moment.unix(tooltipY).format('MM/DD/YYYY HH:mm')}
        </Text>
        <Text x={6} y={50} stroke='#fff'>
          {`${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.ceil(tooltipX, 6)}`}
        </Text>
      </G>
    </G>
  )
}

const DetailGraph = (props) => {
  const [tooltip, setTooltip] = useState({})
  const { uuid } = props.navigation.state.params
  const { refCurrencyUuid, timePeriod, getCoinHistory, coinHistory, coin } = props
  // console.log('props', tooltip)
  useEffect(() => {
    getCoinHistory(uuid, refCurrencyUuid.data.uuid, timePeriod.data.value)
  }, [refCurrencyUuid, timePeriod])

  const Decorator = ({ x, y, data }) => {
    return data.map((value, index) => (
      <Circle
        key={index}
        cx={x(value.price)}
        cy={y(value.timestamp)}
        r={4}
        stroke={Colors.transparent}
        fill={Colors.transparent}
        onPress={() =>
            setTooltip({
              tooltipX: value.price,
              tooltipY: value.timestamp,
              tooltipIndex: index
            })}
      />
    ))
  }

  return (
    <View style={styles.container}>
      <Error data={coinHistory} onPress={() => getCoinHistory(uuid, refCurrencyUuid.data.uuid, timePeriod.data.value)} />
      {coinHistory.fetching === false && coinHistory.error === null
        ? <View style={{flex: 1}}>
          <XAxis
            style={{ marginTop: 20,
              marginLeft: 30,
              height: 70,
              shadowOffset: {
                width: 5,
                height: 15
              },
              shadowOpacity: 0.7,
              shadowRadius: 3.84,
              elevation: 20 }}
            data={_.get(coinHistory, 'payload.data.history')}
            contentInset={{ top: 20, bottom: 20 }}
            xAccessor={({ item }) => item.price}
            svg={{
              fill: _.get(coin, 'payload.data.coin.color') || Colors.facebook,
              fontSize: 10,
              rotation: 90,
              originY: 30,
              y: 5
            }}
            numberOfTicks={4}
            formatLabel={(value) => `${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.ceil(value, 3)}`}
           />
          <View style={styles.graphContainer}>
            <YAxis
              style={{ marginHorizontal: 5 }}
              data={_.get(coinHistory, 'payload.data.history')}
              contentInset={{ top: 20, bottom: 20 }}
              yAccessor={({ item }) => item.timestamp}
              svg={{
                fill: _.get(coin, 'payload.data.coin.color') || Colors.facebook,
                fontSize: 10,
                rotation: 60,
                originX: 30,
                x: 5
              }}
              numberOfTicks={10}
              formatLabel={(value) => timePeriod.data.value === '24h' ? moment.unix(value).format('HH:mm') : moment.unix(value).format('MM/DD/YYYY')}
        />
            <LineChart
              style={{ flex: 1 }}
              data={_.get(coinHistory, 'payload.data.history')}
              svg={{ stroke: _.get(coin, 'payload.data.coin.color') || Colors.facebook }}
              yAccessor={({ item }) => item.timestamp}
              xAccessor={({ item }) => item.price}
              contentInset={{ top: 20, bottom: 20 }}
              animate
        >
              <Grid direction={Grid.Direction.VERTICAL} />
              <Decorator data={_.get(coinHistory, 'payload.data.history')} />
              {tooltip && tooltip.tooltipX && <Tooltip
                tooltipX={tooltip.tooltipX}
                tooltipY={tooltip.tooltipY}
                color={_.get(coin, 'payload.data.coin.color') || Colors.facebook}
                index={tooltip.tooltipIndex}
                dataLength={_.get(coinHistory, 'payload.data.history').length}
                refCurrencyUuid={refCurrencyUuid}
              />}
            </LineChart>
          </View>
        </View> : <BarIndicator color={Colors.facebook} style={styles.activity} />}
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    refCurrencyUuid: state.uuid,
    timePeriod: state.timePeriod,
    coinHistory: state.coinHistory,
    coin: state.coin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCoinHistory: (uuid, referenceCurrencyUuid, timePeriod) => dispatch(CoinHistoryActions.coinHistoryRequest(uuid, referenceCurrencyUuid, timePeriod))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailGraph)
