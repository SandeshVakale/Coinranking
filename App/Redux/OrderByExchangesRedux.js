import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  orderByExchangesRequest: ['data']
})

export const OrderByExchangesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {
    name: '24h Volume',
    value: '24hVolume'
  }
})

/* ------------- Selectors ------------- */

export const OrderByExchangesSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ data })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDER_BY_EXCHANGES_REQUEST]: request
})
