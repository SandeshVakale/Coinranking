import React, { useEffect } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, ScrollView, Linking } from 'react-native'
import styles from './Styles/ExchangeOverviewStyle'
import ExchangeActions from '../Redux/ExchangeRedux'
import { connect } from 'react-redux'
import Error from './Error'
import { Card, Image, ListItem, Button } from 'react-native-elements'
import { Colors } from '../Themes'
import _ from 'lodash'
import { BarIndicator } from 'react-native-indicators'
import { PieChart } from 'react-native-svg-charts'

const ExchangeOverview = (props) => {
  const {refCurrencyUuid, exchange, getExchange, uuid} = props
  useEffect(() => {
    getExchange(uuid, refCurrencyUuid.data.uuid)
  }, [refCurrencyUuid])
  return (
    <ScrollView style={styles.container}>
      <Error data={exchange} onPress={() => getExchange(uuid, refCurrencyUuid.data.uuid)} />
      {exchange.fetching === false && exchange.error === null
        ? <View style={{ flexDirection: 'column' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }} >
            <Image
              placeholderStyle={{ backgroundColor: Colors.transparent }}
              source={_.get(exchange, 'payload.data.exchange.iconUrl') && { uri: _.get(exchange, 'payload.data.exchange.iconUrl').replace(/\.(svg)($|\?)/, '.png$2') }}
              style={{ width: 60,
                height: 80,
                marginTop: 10,
                shadowColor: Colors.charcoal,
                resizeMode: 'contain',
                shadowOffset: {
                  width: 2,
                  height: 5
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.84 }}
              PlaceholderContent={<BarIndicator color={Colors.facebook} style={{ backgroundColor: Colors.transparent }} />}
            />

            <Text style={[styles.sectionText, {color: Colors.charcoal}]}>{_.get(exchange, 'payload.data.exchange.description')}</Text>
            <Card title={`Market Share ${_.ceil(_.get(exchange, 'payload.data.exchange.marketShare'), 2)} %`} containerStyle={{ width: '90%' }}>
              <PieChart data={[
                {
                  key: 1,
                  value: _.ceil(_.get(exchange, 'payload.data.exchange.marketShare')),
                  svg: { fill: Colors.facebook },
                  arc: { outerRadius: '130%', cornerRadius: 10 }
                },
                {
                  key: 2,
                  value: 100 - _.ceil(_.get(exchange, 'payload.data.exchange.marketShare'), 2),
                  svg: { fill: Colors.cloud }
                }]} style={{ height: 200 }}
                outerRadius={'70%'}
                innerRadius={10} />
              <ListItem
                title={'Rank'}
                subtitle={_.get(exchange, 'payload.data.exchange.rank')}
                bottomDivider
                leftIcon={{ name: 'gesture-swipe-up', color: Colors.facebook, size: 30, type: 'material-community' }}
              />
              <ListItem
                title={'24h Volume'}
                subtitle={`${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.ceil(_.get(exchange, 'payload.data.exchange.24hVolume'), 5)}`}
                bottomDivider
                leftIcon={{ name: 'chart-bar-stacked', color: Colors.facebook, size: 30, type: 'material-community' }}
              />
              <ListItem
                title={'Number of Coins'}
                subtitle={_.get(exchange, 'payload.data.exchange.numberOfCoins')}
                bottomDivider
                leftIcon={{ name: 'death-star', color: Colors.facebook, size: 30, type: 'material-community' }}
              />
              <ListItem
                title={'Number of Markets'}
                subtitle={_.get(exchange, 'payload.data.exchange.numberOfMarkets')}
                bottomDivider
                leftIcon={{ name: 'chart-bubble', color: Colors.facebook, size: 30, type: 'material-community' }}
              />
            </Card>
          </View>
          {_.get(exchange, 'payload.data.exchange.websiteUrl') && <Button type={'outline'} containerStyle={{ marginVertical: 20, width: '90%', alignSelf: 'center' }} title={'Visit Website'}
            onPress={() => Linking.openURL(_.get(exchange, 'payload.data.exchange.websiteUrl'))} />}
        </View> : <BarIndicator color={Colors.facebook} style={styles.activity} />}
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
  return {
    refCurrencyUuid: state.uuid,
    exchange: state.exchange
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExchange: (uuid, referenceCurrencyUuid) => dispatch(ExchangeActions.exchangeRequest(uuid, referenceCurrencyUuid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeOverview)
