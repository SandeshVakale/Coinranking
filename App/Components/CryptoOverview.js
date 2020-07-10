import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { View, Text, ScrollView, Dimensions, Linking } from 'react-native'
import { connect } from 'react-redux'
import { Image, Icon, ListItem, Button, Card } from 'react-native-elements'
import _ from 'lodash'
import { BarIndicator } from 'react-native-indicators'
import CoinActions from '../Redux/CoinRedux'
import styles from './Styles/CryptoOverviewStyle'
import { Colors, Fonts } from '../Themes'
import Error from './Error'
import { LineChart, YAxis, Grid, PieChart } from 'react-native-svg-charts'
import HTML from 'react-native-render-html'
import TimePeriodActions from '../Redux/TimePeriodRedux'

const CryptoOverview = (props) => {
  const { uuid, getCoin, refCurrencyUuid, timePeriod, coin } = props
  useEffect(() => {
    getCoin(uuid, refCurrencyUuid.data.uuid, timePeriod.data.value)
  }, [refCurrencyUuid, timePeriod])
  const toNumbers = arr => arr.map(Number)
  return (
    <ScrollView style={styles.container}>
      <Error data={coin} />
      {coin.fetching === false && coin.error === null
        ? <View style={{ flexDirection: 'column' }}>
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
          <Text style={[styles.sectionText, {color: Colors.charcoal}]}>Period {timePeriod.data.name} | Currency {refCurrencyUuid.data.name}</Text>
          <View style={[styles.graphContainer, {shadowColor: _.get(coin, 'payload.data.coin.color') || Colors.facebook}]}>
            <YAxis
              style={{ marginHorizontal: 5 }}
              data={_.get(coin, 'payload.data.coin.sparkline')}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{
                fill: _.get(coin, 'payload.data.coin.color') || Colors.facebook,
                fontSize: 10
              }}
              numberOfTicks={10}
              formatLabel={(value) => `${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.ceil(value, 2)}`}
          />
            <LineChart
              style={{ flex: 1 }}
              data={toNumbers(_.get(coin, 'payload.data.coin.sparkline'))}
              svg={{ stroke: _.get(coin, 'payload.data.coin.color') || Colors.facebook }}
              contentInset={{ top: 20, bottom: 20 }}
              animate
          >
              <Grid />
            </LineChart>
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
          <HTML
            tagsStyles={{ h3: { textAlign: 'center', fontStyle: 'italic', fontSize: 20, paddingVertical: 10, color: _.get(coin, 'payload.data.coin.color') || Colors.facebook },
              p: styles.text}}
            containerStyle={{ margin: 10, paddingTop: 20 }}
            html={_.get(coin, 'payload.data.coin.description')}
            imagesMaxWidth={Dimensions.get('window').width} />
          {_.get(coin, 'payload.data.coin.links').length > 0 && <Card title={'Project links'}>
            {_.get(coin, 'payload.data.coin.links').map((item, index) => <ListItem
              key={index}
              onPress={() => Linking.openURL(item.url)}
              title={item.name}
              subtitle={item.type}
              bottomDivider
            />)
          }
          </Card>}
          {coin.payload.data.coin.supply.supply && <Card title={'Supply information'}>
            <PieChart data={[
              {
                key: 1,
                value: coin.payload.data.coin.supply.circulating,
                svg: { fill: coin.payload.data.coin.color || Colors.facebook },
                arc: { outerRadius: '130%', cornerRadius: 10 }
              },
              {
                key: 2,
                value: coin.payload.data.coin.supply.supply,
                svg: { fill: Colors.facebook }
              }]} style={{ height: 200 }}
              outerRadius={'70%'}
              innerRadius={10} />
            <View >
              <ListItem
                title={'Circulating Supply'}
                subtitle={_.get(coin, 'payload.data.coin.supply.circulating')}
                bottomDivider
              />
              <ListItem
                title={'Total Supply'}
                subtitle={_.get(coin, 'payload.data.coin.supply.supply')}
                bottomDivider
              />
              <ListItem
                title={'Available in Percentage'}
                subtitle={((parseInt(_.get(coin, 'payload.data.coin.supply.circulating')) / parseInt(_.get(coin, 'payload.data.coin.supply.supply'))) * 100) + '%'}
                bottomDivider
              />
            </View>
          </Card>}
          <Card title={'Value statistics'}>
            <ListItem
              title={'Price to BTC'}
              subtitle={_.get(coin, 'payload.data.coin.btcPrice')}
              bottomDivider
            />
            <ListItem
              title={'Market cap'}
              subtitle={`${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.get(coin, 'payload.data.coin.marketCap')}`}
              bottomDivider
            />
            <ListItem
              title={'Rank'}
              subtitle={_.get(coin, 'payload.data.coin.rank')}
              bottomDivider
            />
            <ListItem
              title={'24h Volume'}
              subtitle={_.get(coin, 'payload.data.coin.24hVolume')}
              bottomDivider
            />
            <ListItem
              title={'All-Time high'}
              subtitle={`${refCurrencyUuid.data.sign || refCurrencyUuid.data.symbol} ${_.get(coin, 'payload.data.coin.allTimeHigh.price')}`}
              bottomDivider
            />
          </Card>
          {coin.payload.data.coin.websiteUrl && <Button
            style={{ marginVertical: 20, width: '90%', alignSelf: 'center' }}
            title={_.get(coin, 'payload.data.coin.websiteUrl')}
            type='outline'
          />}
        </View> : <BarIndicator color={Colors.facebook} style={styles.activity} />}
    </ScrollView>
  )
}

CryptoOverview.propTypes = {
  uuid: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    refCurrencyUuid: state.uuid,
    timePeriod: state.timePeriod,
    coin: state.coin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCoin: (uuid, referenceCurrencyUuid, timePeriod) => dispatch(CoinActions.coinRequest(uuid, referenceCurrencyUuid, timePeriod)),
    setTimePeriod: (item) => dispatch(TimePeriodActions.timePeriodRequest(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoOverview)
