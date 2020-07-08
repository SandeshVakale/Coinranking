import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  uuidRequest: ['data']
})

export const UuidTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {
    iconUrl: 'https://cdn.coinranking.com/fz3P5lsJY/eur.svg',
    name: 'Euro',
    sign: '€',
    symbol: 'EUR',
    type: 'fiat',
    uuid: '5k-_VTxqtCEI'
  }
})

/* ------------- Selectors ------------- */

export const UuidSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ data })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UUID_REQUEST]: request
})
