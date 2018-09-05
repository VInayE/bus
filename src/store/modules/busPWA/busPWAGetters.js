import * as types from '../../types'

export const getters = {
  [types.GET_BUS_SEARCH_PARMAS]: state => {
    state.busSearchParams = state.busSearchParams ? state.busSearchParams : null
    return state.busSearchParams
  },
    [types.GET_BUS_FARE_DETAILS]: state => {
    return state.busFareDetails
  },
     [types.GET_BUS_SEAT_MAP_DATA]: state => {
    return state.busSeatMapData
  },
   [types.GET_USER_INFO]: state => {
    state.userInfo = state.userInfo && state.userInfo !== {} ? state.userInfo : {}
    return state.userInfo
  },
	[types.GET_UPDATED_DATE]: state => {
    state.updatedDate = state.updatedDate && state.updatedDate !== {} ? state.updatedDate : {}
    return state.updatedDate
  },
    [types.GET_UPDATED_INDEX]: state => {
   // state.updatedIndex = state.updatedIndex && state.updatedIndex !== {} ? state.updatedIndex : {}
    return state.updatedIndex
  },
  [types.GET_GST_DETAILS]: state => {
    return state.gst_details
  }
}

