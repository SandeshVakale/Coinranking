import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  coinHistoryRequest: ['uuid', 'referenceCurrencyUuid', 'timePeriod'],
  coinHistorySuccess: ['payload'],
  coinHistoryFailure: ['payload']
})

export const CoinHistoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const CoinHistorySelectors = {
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
  [Types.COIN_HISTORY_REQUEST]: request,
  [Types.COIN_HISTORY_SUCCESS]: success,
  [Types.COIN_HISTORY_FAILURE]: failure
})
