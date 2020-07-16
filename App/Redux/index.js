import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  currency: require('./CurrenciesRedux').reducer,
  uuid: require('./UuidRedux').reducer,
  timePeriod: require('./TimePeriodRedux').reducer,
  orderBy: require('./OrderByRedux').reducer,
  orderDirection: require('./OrderDirectionRedux').reducer,
  coin: require('./CoinRedux').reducer,
  coins: require('./CoinsRedux').reducer,
  exchanges: require('./ExchangesRedux').reducer,
  orderByExchanges: require('./OrderByExchangesRedux').reducer,
  markets: require('./MarketsRedux').reducer,
  orderByMarkets: require('./OrderByMarketsRedux').reducer,
  market: require('./MarketRedux').reducer,
  overview: require('./OverviewRedux').reducer,
  coinExchanges: require('./CoinExchangesRedux').reducer,
  coinMarkets: require('./CoinMarketsRedux').reducer,
  searchResult: require('./SearchSuggestionsRedux').reducer,
  exchange: require('./ExchangeRedux').reducer,
  exchangeCoins: require('./ExchangeCoinsRedux').reducer,
  exchangeMarkets: require('./ExchangeMarketsRedux').reducer
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas)
      })
    })
  }

  return store
}
