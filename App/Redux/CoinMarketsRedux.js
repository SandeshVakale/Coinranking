import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  coinMarketsRequest: ['uuid', 'referenceCurrencyUuid', 'orderDirection'],
  coinMarketsSuccess: ['payload'],
  coinMarketsFailure: ['payload']
})

export const CoinMarketsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const CoinMarketsSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: true, payload })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COIN_MARKETS_REQUEST]: request,
  [Types.COIN_MARKETS_SUCCESS]: success,
  [Types.COIN_MARKETS_FAILURE]: failure
})
