import * as types from '../../types'
import {setVuexKeys} from '@/storage/sessionStorage'

export const mutations = {
  [types.SET_BUS_SEARCH_PARMAS]: (state, payload) => {
    setVuexKeys(types.SET_BUS_SEARCH_PARMAS)
    sessionStorage.setItem(types.SET_BUS_SEARCH_PARMAS,JSON.stringify(payload))
    state.busSearchParams = payload
  },
  [types.SET_BUS_FARE_DETAILS]: (state, payload) => {
    state.busFareDetails = payload
  },
  [types.SET_BUS_SEAT_MAP_DATA]: (state, payload) => {
    state.busSeatMapData = payload
  },
  [types.SET_GST_FORM_DEATILS]: (state, payload) => {
    state.gst_details = payload
  },
	[types.SET_UPDATED_DATE]: (state, payload) => {
    state.updatedDate = payload
  },
    [types.SET_UPDATED_INDEX]: (state, payload) => {
    state.updatedIndex = payload
  }
}
