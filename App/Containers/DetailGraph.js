// @flow
import React, { Component } from 'react'
import {
  StyleSheet, View, Dimensions, Animated, TextInput, ScrollView, Text
} from 'react-native'
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg'
import * as path from 'svg-path-properties'
import * as shape from 'd3-shape'
import _ from 'lodash'
import moment from 'moment'

import {
  scaleTime,
  scaleLinear,
  scaleQuantile
} from 'd3-scale'
import { connect } from 'react-redux'
import { Colors, Fonts } from '../Themes'
import AppBar from '../Components/AppBar'
import { Icon, Image } from 'react-native-elements'
import { BarIndicator } from 'react-native-indicators'

// const {
//   Path, Defs, LinearGradient, Stop
// } = Svg
const d3 = {
  shape
}

const height = 400
const { width } = Dimensions.get('window')
const verticalPadding = 5
const cursorRadius = 10
const labelWidth = 150

class DetailGraph extends Component {
  cursor = React.createRef();

  label = React.createRef();

  label2 = React.createRef();

  state = {
    x: new Animated.Value(0)
  };
  data = _.get(this.props.coinHistory, 'payload.data.history')

  scaleX = scaleTime().domain([_.minBy(_.get(this.props.coinHistory, 'payload.data.history'), (o) => o.timestamp).timestamp, _.maxBy(_.get(this.props.coinHistory, 'payload.data.history'), (o) => o.timestamp).timestamp]).range([0, width])
  scaleY = scaleLinear().domain([_.minBy(_.get(this.props.coinHistory, 'payload.data.history'), (o) => o.price).price, _.maxBy(_.get(this.props.coinHistory, 'payload.data.history'), (o) => o.price).price]).range([height - verticalPadding, verticalPadding])
  scaleLabel = scaleQuantile().domain([_.minBy(_.get(this.props.coinHistory, 'payload.data.history'), (o) => o.price).price, _.maxBy(_.get(this.props.coinHistory, 'payload.data.history'), (o) => o.price).price]).range(_.map(_.get(this.props.coinHistory, 'payload.data.history'), 'price'))

  scaleLabel2 = scaleQuantile().domain([_.minBy(_.get(this.props.coinHistory, 'payload.data.history'), (o) => o.timestamp).timestamp, _.maxBy(_.get(this.props.coinHistory, 'payload.data.history'), (o) => o.timestamp).timestamp]).range(_.map(_.get(this.props.coinHistory, 'payload.data.history'), 'timestamp'))
  line = d3.shape.line()
    .x(d => this.scaleX(d.timestamp))
    .y(d => this.scaleY(d.price))
    .curve(d3.shape.curveBasis)(this.data)
  properties = path.svgPathProperties(this.line)
  lineLength = this.properties.getTotalLength()
  moveCursor (value) {
    const { refCurrencyUuid } = this.props
    const { x, y } = this.properties.getPointAtLength(this.lineLength - value)
    this.cursor.current.setNativeProps({ top: y - cursorRadius, left: x - cursorRadius })
    const label = this.scaleLabel(this.scaleY.invert(y))
    const label2 = this.scaleLabel2(this.scaleX.invert(x))
    this.label.current.setNativeProps({ text: `${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.ceil(label, 2)}` })
    this.label2.current.setNativeProps({ text: `${moment.unix(label2).format('MM/DD/YYYY HH:mm')}` })
  }

  componentDidMount () {
    this.state.x.addListener(({ value }) => this.moveCursor(value))
    this.moveCursor(0)
  }

  render () {
    const { x } = this.state
    const toNumbers = arr => arr.map(Number)
    const { coin, refCurrencyUuid, timePeriod } = this.props
    const translateX = x.interpolate({
      inputRange: [0, this.lineLength],
      outputRange: [width - labelWidth, 0],
      extrapolate: 'clamp'
    })
    return (
      <View style={styles.root}>
        <AppBar title={_.get(coin, 'payload.data.coin.name', '')} onPressLeft={() => this.props.navigation.goBack()} iconLeft={'chevron-left'} />
        <ScrollView contentContainerStyle={styles.container}>
          <Svg {...{ width, height }}>
            <Defs>
              <LinearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='gradient'>
                <Stop stopColor={_.get(coin, 'payload.data.coin.color') || Colors.facebook} offset='0%' />
                <Stop stopColor='#eef6fd' offset='80%' />
                <Stop stopColor='#FEFFFF' offset='100%' />
              </LinearGradient>
            </Defs>
            <Path d={this.line} fill='transparent' stroke={_.get(coin, 'payload.data.coin.color') || Colors.facebook} strokeWidth={5} />
            <Path d={`${this.line} L ${width} ${height} L 0 ${height}`} fill='url(#gradient)' />
            <View ref={this.cursor} style={[styles.cursor, {
              borderColor: _.get(coin, 'payload.data.coin.color') || Colors.facebook}]} />
          </Svg>
          <Animated.View style={[styles.label, { borderColor: _.get(coin, 'payload.data.coin.color') || Colors.facebook, transform: [{ translateX }] }]}>
            <TextInput style={{ paddingVertical: 0 }} ref={this.label} />
            <TextInput style={{ paddingVertical: 0 }} ref={this.label2} />
          </Animated.View>
          <Animated.ScrollView
            style={StyleSheet.absoluteFill}
            contentContainerStyle={{ width: this.lineLength * 2 }}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            bounces={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x }
                  }
                }
              ],
              { useNativeDriver: true }
            )}
            horizontal
          />
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
              <Icon size={24} style={{ paddingHorizontal: 10 }} name={Math.sign(coin.payload.data.coin.change) === 1 ? 'trending-up-sharp' : 'trending-down-sharp'} color={Math.sign(_.get(coin, 'payload.data.coin.change')) === 1 ? 'green' : Colors.error} type={'ionicon'} />
              <Text style={{color: Math.sign(_.get(coin, 'payload.data.coin.change')) === 1 ? 'green' : Colors.error, fontSize: 18}} >{_.ceil(_.get(coin, 'payload.data.coin.change'), 2)}%</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'space-around', flexDirection: 'row' }} >
            <View style={styles.textContainer} >
              <Text style={[Fonts.style.h4, styles.textMain]}>{_.ceil(_.get(coin, 'payload.data.coin.change'), 2)}%</Text>
              <Text style={[Fonts.type.base, styles.textSub]}>{timePeriod.data.name} change</Text>
            </View>
            <View style={styles.textContainer} >
              <Text style={[Fonts.style.h4, styles.textMain]}>{_.ceil(_.max(toNumbers(_.get(coin, 'payload.data.coin.sparkline'))), 2)}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Icon name={'arrow-up-right'} size={16} type={'feather'} color={Colors.charcoal} />
                <Text style={[Fonts.type.base, styles.textSub]}>{timePeriod.data.name} Highest</Text>
              </View>
            </View>
            <View style={styles.textContainer} >
              <Text style={[Fonts.style.h4, styles.textMain]}>{_.ceil(_.min(toNumbers(_.get(coin, 'payload.data.coin.sparkline'))), 2)}</Text>
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
    marginTop: 60,
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
    borderWidth: 3,
    backgroundColor: 'white'
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
