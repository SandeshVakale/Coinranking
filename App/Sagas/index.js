import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */
//
// import { StartupTypes } from '../Redux/StartupRedux'
// import { GithubTypes } from '../Redux/GithubRedux'
import { CurrenciesTypes } from '../Redux/CurrenciesRedux'
import { CoinTypes } from '../Redux/CoinRedux'
import { CoinsTypes } from '../Redux/CoinsRedux'
import { ExchangesTypes } from '../Redux/ExchangesRedux'
import { MarketsTypes } from '../Redux/MarketsRedux'
import { MarketTypes } from '../Redux/MarketRedux'
import { OverviewTypes } from '../Redux/OverviewRedux'

/* ------------- Sagas ------------- */
//
// import { startup } from './StartupSagas'
// import { getUserAvatar } from './GithubSagas'
import { getCurrencies } from './CurrenciesSagas'
import { getCoin } from './CoinSagas'
import { getCoins } from './CoinsSagas'
import { getExchanges } from './ExchangesSagas'
import { getMarkets } from './MarketsSagas'
import { getMarket } from './MarketSagas'
import { getOverview } from './OverviewSagas'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    // takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(CurrenciesTypes.CURRENCIES_REQUEST, getCurrencies, api),
    takeLatest(CoinTypes.COIN_REQUEST, getCoin, api),
    takeLatest(CoinsTypes.COINS_REQUEST, getCoins, api),
    takeLatest(ExchangesTypes.EXCHANGES_REQUEST, getExchanges, api),
    takeLatest(MarketsTypes.MARKETS_REQUEST, getMarkets, api),
    takeLatest(MarketTypes.MARKET_REQUEST, getMarket, api),
    takeLatest(OverviewTypes.OVERVIEW_REQUEST, getOverview, api)
  ])
}
