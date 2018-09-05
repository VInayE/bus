
export const getSRPDataAPI = (searchParams) => {
   return Vue.http.get(`/busPWA/busview/ajax-search?src=""&dest=""&ddate=${searchParams.ddate}&tt=${searchParams.tt}&qty=${searchParams.qty}&srcStnCode=${searchParams.srcID}&destStnCode=${searchParams.destID}`) 
}
export const getReview = (searchParams) => {
   return Vue.http.get(`/busPWA/busview/getReviewView?superpnr=${searchParams.superPNR}&smid=${searchParams.smid}&tt=o`) 
}

export const getCancellationPolicy = (searchParams,busID) => {
   return Vue.http.get(`/busPWA/busview/getCancellationPolicy?src=${searchParams.src}&dest=${searchParams.dest}&dep=${searchParams.ddate}&bid=${busID}`) 
}

export const getSeatMapData = (searchParams) => {
   return Vue.http.post(`/busPWA/busview/getSeatMap?searchId=${searchParams.searchID}&busId=${searchParams.busID}&idProof=${searchParams.idProof}`) 
}

export const getPromoCode = (searchParams) => {
    Vue.http.headers.common['Content-Type'] = 'text/plain;charset=ISO-8859-1';
   return Vue.http.post(`/promo/partialValidate?promocode=${searchParams.promoCode}&superPnr=${searchParams.superPNR}&context=TRAVELLER`) 
}

export const getbookingDetails = (searchParams) => {
   return Vue.http.post(`/busPWA/busview/getBookingDetails/?superPnr=${searchParams.spnr}&uuid=${searchParams.uuid}`)
}

export const getConfirmation = (searchParams) => {
   return Vue.http.get(`/busPWA/busview/confirmationjson?ttid=${searchParams.ttid}&suc=${searchParams.suc}`) 
}

