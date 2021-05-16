// @flow
import React, { Component } from 'react'
import {
  StyleSheet, View, Dimensions, ScrollView, Text
} from 'react-native'
import { LineChart } from 'react-native-svg-charts'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Colors, Fonts } from '../Themes'
import AppBar from '../Components/AppBar'
import { Icon, Image } from 'react-native-elements'
import { BarIndicator } from 'react-native-indicators'
import * as shape from 'd3-shape'
import { Line } from 'react-native-svg'
import moment from 'moment'
const height = 400
const { width } = Dimensions.get('window')
const cursorRadius = 10
const labelWidth = 150
class DetailGraph extends Component {
  state = {
    data: _.get(this.props.coinHistory, 'payload.data.history'),
    tooltipX: null,
    tooltipY: null,
    tooltipIndex: null
  };

  render () {
    const { data, tooltipX, tooltipY, tooltipIndex } = this.state
    const Tooltip = ({
      x,
      tooltipX,
      index
    }) => {
      return (
        <Line
          key={index}
          strokeDasharray='5, 5'
          y1={'0%'}
          y2={'100%'}
          x1={x(tooltipX)}
          x2={x(tooltipX)}
          stroke={'gray'}
        />
      )
    }
    const toNumbers = arr => arr.map(Number)
    const { coin, refCurrencyUuid, timePeriod } = this.props
    const contentInset = { top: 10, bottom: 7 }
    const ChartPoints = ({ x }) =>
      data.map((item, index) => (
        <Line
          key={index}
          y1={'0%'}
          y2={'100%'}
          x1={x(item.timestamp)}
          x2={x(item.timestamp)}
          stroke={'transparent'}
          fill='transparent'
          onPressIn={() =>
            this.setState({
              tooltipX: item.timestamp,
              tooltipY: item.price,
              tooltipIndex: index
            })
          }
          onPressOut={() =>
            this.setState({
              tooltipX: null,
              tooltipY: null,
              tooltipIndex: null
            })
          }
        />
      ))
    return (
      <View style={styles.root}>
        <AppBar title={_.get(coin, 'payload.data.coin.name', '')} onPressLeft={() => this.props.navigation.goBack()} iconLeft={'chevron-left'} />
        <ScrollView contentContainerStyle={styles.container}>
          {tooltipX && <View style={[styles.textContainer, { zIndex: 5, top: 5, left: 10, position: 'absolute' }]} >
            <View>
              <Text style={[Fonts.style.h4, styles.textMain]}>{refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} {_.ceil(tooltipY, 2)}</Text>
              <Text style={[Fonts.type.base, styles.textSub]}>{moment.unix(tooltipX).format('MMM DD YYYY, HH:MM')}</Text>
            </View>
          </View>}
          <LineChart
            style={{ height: 400 }}
            data={data}
            svg={{
              strokeWidth: 2,
              stroke: _.get(coin, 'payload.data.coin.color') || Colors.facebook }}
            contentInset={contentInset}
            curve={shape.curveNatural}
            xAccessor={({ item }) => item.timestamp}
            yAccessor={({ item }) => parseFloat(item.price)}
           >
            <ChartPoints color='transparent' />
            {tooltipX && <Tooltip
              tooltipX={tooltipX}
              tooltipY={tooltipY}
              color='#003F5A'
              index={tooltipIndex}
              dataLength={data.length}
            />}
          </LineChart>
          <View style={{ justifyContent: 'center', alignItems: 'center' }} >
            <Image
              placeholderStyle={{ backgroundColor: Colors.transparent }}
              source={_.get(coin, 'payload.data.coin.iconUrl') && { uri: _.get(coin, 'payload.data.coin.iconUrl').replace(/\.(svg)($|\?)/, '.png$2') }}
              style={{ width: 60,
                height: 80,
                marginTop: 10,
                shadowColor: _.get(coin, 'payload.data.coin.color') || Colors.facebook,
                resizeMode: 'contain',
                shadowOffset: {
                  width: 2,
                  height: 5
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.84 }}
              PlaceholderContent={<BarIndicator color={_.get(coin, 'payload.data.coin.color')} style={{ backgroundColor: Colors.transparent }} />}
            />
            <Text style={{fontSize: 30, fontWeight: 'bold', color: Colors.charcoal}}>{refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} {_.ceil(_.get(coin, 'payload.data.coin.price'), 2)}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon size={24} style={{ paddingHorizontal: 10 }} name={Math.sign(_.get(coin, 'payload.data.coin.change')) === 1 ? 'trending-up-sharp' : 'trending-down-sharp'} color={Math.sign(_.get(coin, 'payload.data.coin.change')) === 1 ? 'green' : Colors.error} type={'ionicon'} />
              <Text style={{color: Math.sign(_.get(coin, 'payload.data.coin.change')) === 1 ? 'green' : Colors.error, fontSize: 18}} >{_.ceil(_.get(coin, 'payload.data.coin.change'), 2)}%</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'space-around', flexDirection: 'row' }} >
            <View style={styles.textContainer} >
              <Text style={[Fonts.style.h4, styles.textMain]}>{_.ceil(_.get(coin, 'payload.data.coin.change'), 2)}%</Text>
              <Text style={[Fonts.type.base, styles.textSub]}>{timePeriod.data.name} change</Text>
            </View>
            <View style={styles.textContainer} >
              <Text style={[Fonts.style.h4, styles.textMain]}>{_.ceil(_.max(toNumbers(_.get(coin, 'payload.data.coin.sparkline', []))), 2)}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Icon name={'arrow-up-right'} size={16} type={'feather'} color={Colors.charcoal} />
                <Text style={[Fonts.type.base, styles.textSub]}>{timePeriod.data.name} Highest</Text>
              </View>
            </View>
            <View style={styles.textContainer} >
              <Text style={[Fonts.style.h4, styles.textMain]}>{_.ceil(_.min(toNumbers(_.get(coin, 'payload.data.coin.sparkline', []))), 2)}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Icon name={'arrow-down-right'} size={16} type={'feather'} color={Colors.charcoal} />
                <Text style={[Fonts.type.base, styles.textSub]}>{timePeriod.data.name} Lowest</Text>
              </View>
            </View>
          </View>
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 10
  },
  container: {
    flex: 1,
    paddingTop: 60,
    height,
    width
  },
  cursor: {
    width: cursorRadius * 2,
    height: cursorRadius * 2,
    borderRadius: cursorRadius,
    borderWidth: 3,
    backgroundColor: 'white'
  },
  label: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: labelWidth,
    padding: 10,
    borderRadius: cursorRadius,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255, 0.8)'
  },
  textContainer: {flexDirection: 'column', alignItems: 'center'},
  textMain: {fontWeight: 'bold', color: Colors.charcoal},
  textSub: {fontWeight: 'bold', color: Colors.charcoal},
  text: {
    fontFamily: 'Avenir-Book',
    fontSize: 14,
    paddingVertical: 20,
    marginVertical: 5,
    textAlign: 'center',
    color: Colors.charcoal,
    marginTop: 14,
    marginBottom: 14
  }
})

const mapStateToProps = (state) => {
  return {
    coinHistory: state.coinHistory,
    coin: state.coin,
    refCurrencyUuid: state.uuid,
    timePeriod: state.timePeriod
  }
}

const mapDispatchToProps = (dispach) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailGraph)
